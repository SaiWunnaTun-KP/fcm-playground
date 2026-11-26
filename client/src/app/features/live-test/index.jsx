import { useState, useEffect, useRef } from 'react';
import { Zap } from 'lucide-react';
import {
  isWebConfigComplete,
  validateServiceAccountText,
  loadSavedLabState,
  saveCredentialsToStorage,
  clearCredentialsFromStorage,
  saveTopicsToStorage,
  saveActivitiesToStorage,
} from './utils/configParser';
import {
  connectBrowserToFcm,
  disconnectBrowserFromFcm,
} from './utils/firebaseClient';
import {
  sendFcmNotification,
  validateFcmNotification,
  subscribeTopicApi,
  unsubscribeTopicApi,
} from './utils/fcmApi';

import SetupStepperBar from './components/SetupStepperBar';
import ProjectConfigDrawer from './components/ProjectConfigDrawer';
import NotificationComposer from './components/NotificationComposer';
import BrowserConnectionCard from './components/BrowserConnectionCard';
import TopicManagerCard from './components/TopicManagerCard';
import ActivityLogCard from './components/ActivityLogCard';
import InAppComicToast from './components/InAppComicToast';

export default function LiveTestPage() {
  const initial = loadSavedLabState();

  const [webConfig, setWebConfig] = useState(initial.webConfig);
  const [vapidKey, setVapidKey] = useState(initial.vapidKey);
  const [serviceAccountText, setServiceAccountText] = useState(initial.serviceAccountText);
  const [topics, setTopics] = useState(initial.topics);
  const [activities, setActivities] = useState(initial.activities);

  const webConfigured = isWebConfigComplete(webConfig, vapidKey);
  const adminCheck = validateServiceAccountText(serviceAccountText);

  const [isDrawerOpen, setIsDrawerOpen] = useState(!webConfigured || !adminCheck.valid);
  const [browserToken, setBrowserToken] = useState('');
  const [permissionStatus, setPermissionStatus] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState('');

  const [isSending, setIsSending] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isTopicBusy, setIsTopicBusy] = useState(false);
  const [lastApiResult, setLastApiResult] = useState(null);
  const [selectedTopicForCompose, setSelectedTopicForCompose] = useState('');
  const [toast, setToast] = useState(null);

  const unsubscribeRef = useRef(null);

  useEffect(() => {
    return () => {
      if (typeof unsubscribeRef.current === 'function') {
        unsubscribeRef.current();
      }
    };
  }, []);

  const appendActivity = (entry) => {
    setActivities((prev) => {
      const updated = [{ id: `${Date.now()}-${Math.random()}`, ...entry }, ...prev];
      saveActivitiesToStorage(updated);
      return updated;
    });
  };

  const handleForegroundIncoming = (payload) => {
    const title =
      payload?.notification?.title || payload?.data?.title || 'Foreground Message';
    const body =
      payload?.notification?.body ||
      payload?.data?.body ||
      JSON.stringify(payload?.data || {});

    setToast({ title, body });
    setTimeout(() => setToast(null), 5500);

    appendActivity({
      direction: 'received',
      status: 'success',
      title,
      body,
      timestamp: new Date().toISOString(),
    });
  };

  const handleSaveConfig = ({ webConfig: nextWeb, vapidKey: nextVapid, serviceAccountText: nextAdmin }) => {
    setWebConfig(nextWeb);
    setVapidKey(nextVapid);
    setServiceAccountText(nextAdmin);
    saveCredentialsToStorage({
      webConfig: nextWeb,
      vapidKey: nextVapid,
      serviceAccountText: nextAdmin,
    });
    setLastApiResult(null);
  };

  const handleClearConfig = async () => {
    await disconnectBrowserFromFcm();
    setBrowserToken('');
    setWebConfig({
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
    });
    setVapidKey('');
    setServiceAccountText('');
    clearCredentialsFromStorage();
  };

  const handleConnectBrowser = async () => {
    setIsConnecting(true);
    setConnectionError('');

    try {
      if (typeof unsubscribeRef.current === 'function') {
        unsubscribeRef.current();
      }

      const result = await connectBrowserToFcm({
        webConfig,
        vapidKey,
        onForegroundMessage: handleForegroundIncoming,
      });

      setBrowserToken(result.token);
      setPermissionStatus(result.permission);
      unsubscribeRef.current = result.unsubscribe;
    } catch (err) {
      setConnectionError(err?.message || 'Browser ချိတ်ဆက်မှု မအောင်မြင်ပါ။');
      if (typeof Notification !== 'undefined') {
        setPermissionStatus(Notification.permission);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnectBrowser = async () => {
    if (typeof unsubscribeRef.current === 'function') {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }
    await disconnectBrowserFromFcm();
    setBrowserToken('');
  };

  const handleSendOrValidate = async (composerPayload, dryRun) => {
    if (dryRun) setIsValidating(true);
    else setIsSending(true);
    setLastApiResult(null);

    const requestBody = {
      ...composerPayload,
      serviceAccount: adminCheck.parsed,
    };

    const res = dryRun
      ? await validateFcmNotification(requestBody)
      : await sendFcmNotification(requestBody);

    setLastApiResult(res);

    appendActivity({
      direction: 'sent',
      dryRun,
      status: res.success ? 'success' : 'error',
      title: res.success
        ? composerPayload.notification?.title || `Target: ${composerPayload.targetType}`
        : res.error?.title || 'Send Failed',
      body: res.success
        ? composerPayload.notification?.body || `Message ID: ${res.messageId}`
        : res.error?.explanation || '',
      timestamp: new Date().toISOString(),
    });

    if (dryRun) setIsValidating(false);
    else setIsSending(false);
  };

  const handleSubscribeTopic = async (topic) => {
    setIsTopicBusy(true);
    const res = await subscribeTopicApi({
      serviceAccount: adminCheck.parsed,
      tokens: [browserToken],
      topic,
    });
    setIsTopicBusy(false);

    if (res.success) {
      const updated = Array.from(new Set([...topics, topic]));
      setTopics(updated);
      saveTopicsToStorage(updated);
      appendActivity({
        direction: 'sent',
        status: 'success',
        title: `Subscribed to #${topic}`,
        body: 'Topic subscription အောင်မြင်ပါသည်။',
        timestamp: new Date().toISOString(),
      });
    } else {
      setLastApiResult(res);
    }
  };

  const handleUnsubscribeTopic = async (topic) => {
    setIsTopicBusy(true);
    const res = await unsubscribeTopicApi({
      serviceAccount: adminCheck.parsed,
      tokens: [browserToken],
      topic,
    });
    setIsTopicBusy(false);

    if (res.success) {
      const updated = topics.filter((t) => t !== topic);
      setTopics(updated);
      saveTopicsToStorage(updated);
    } else {
      setLastApiResult(res);
    }
  };

  const projectMismatch =
    webConfigured &&
    adminCheck.valid &&
    webConfig.projectId.trim() !== adminCheck.projectId.trim();

  return (
    <div className="w-full space-y-4 sm:space-y-5">
      {/* Top Banner */}
      <div className="comic-panel bg-[#FCF9F4] p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="comic-pill bg-[#F26D21] text-[#FCF9F4] px-3 py-0.5 text-[11px] sm:text-xs font-mono font-bold inline-flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>INTERACTIVE FCM LAB</span>
          </span>
          <h1 className="font-display text-2xl sm:text-4xl uppercase tracking-tight mt-2">
            FCM LIVE TESTER
          </h1>
          <p className="text-xs sm:text-base text-[#1C1917]/80 mt-1">
            Firebase Console ထဲ ဝင်စရာမလိုဘဲ Push Notification များ ပေးပို့စမ်းသပ်ခြင်းနှင့် Payload
            စစ်ဆေးခြင်း
          </p>
        </div>
      </div>

      {/* 3-Step Setup Bar */}
      <SetupStepperBar
        isWebConfigured={webConfigured}
        isBrowserConnected={Boolean(browserToken)}
        isAdminConfigured={adminCheck.valid}
        projectId={webConfig.projectId}
        projectMismatch={projectMismatch}
        isDrawerOpen={isDrawerOpen}
        onToggleDrawer={() => setIsDrawerOpen((prev) => !prev)}
      />

      {/* Collapsible Config Form */}
      {isDrawerOpen && (
        <ProjectConfigDrawer
          webConfig={webConfig}
          vapidKey={vapidKey}
          serviceAccountText={serviceAccountText}
          onSaveConfig={handleSaveConfig}
          onClearConfig={handleClearConfig}
        />
      )}

      {/* Main 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left 7 Columns: Notification Composer */}
        <div className="lg:col-span-7 min-w-0">
          <NotificationComposer
            browserToken={browserToken}
            isAdminConfigured={adminCheck.valid}
            selectedTopicFromSidebar={selectedTopicForCompose}
            onSend={(payload) => handleSendOrValidate(payload, false)}
            onValidate={(payload) => handleSendOrValidate(payload, true)}
            isSending={isSending}
            isValidating={isValidating}
            lastApiResult={lastApiResult}
          />
        </div>

        {/* Right 5 Columns: Browser Connection, Topics & Activity Log */}
        <div className="lg:col-span-5 min-w-0 space-y-5">
          <BrowserConnectionCard
            isWebConfigured={webConfigured}
            browserToken={browserToken}
            permissionStatus={permissionStatus}
            isConnecting={isConnecting}
            connectionError={connectionError}
            onConnect={handleConnectBrowser}
            onDisconnect={handleDisconnectBrowser}
          />

          <TopicManagerCard
            topics={topics}
            canManageTopics={adminCheck.valid && Boolean(browserToken)}
            isBusy={isTopicBusy}
            onSubscribe={handleSubscribeTopic}
            onUnsubscribe={handleUnsubscribeTopic}
            onQuickSelectTopic={(topic) => setSelectedTopicForCompose(topic)}
          />

          <ActivityLogCard
            activities={activities}
            onClear={() => {
              setActivities([]);
              saveActivitiesToStorage([]);
            }}
          />
        </div>
      </div>

      {/* Foreground In-App Comic Toast */}
      <InAppComicToast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}