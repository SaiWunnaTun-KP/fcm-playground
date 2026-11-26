import { useState } from 'react';
import {
  Send,
  ShieldCheck,
  Code2,
  BellRing,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Eye,
} from 'lucide-react';
import LiveCodeGenerator from './LiveCodeGenerator';

export default function NotificationComposer({
  browserToken,
  isAdminConfigured,
  selectedTopicFromSidebar,
  onSend,
  onValidate,
  isSending,
  isValidating,
  lastApiResult,
}) {
  const [editorMode, setEditorMode] = useState('visual'); // 'visual' | 'json'
  const [targetType, setTargetType] = useState('browser'); // 'browser' | 'customToken' | 'topic'
  const [customToken, setCustomToken] = useState('');
  const [topicName, setTopicName] = useState('');
  const [messageType, setMessageType] = useState('both'); // 'notification' | 'data' | 'both'

  const [title, setTitle] = useState('Hello from FCM Playground!');
  const [body, setBody] = useState('Push Notification စနစ် အောင်မြင်စွာ အလုပ်လုပ်နေပါပြီ။');
  const [imageUrl, setImageUrl] = useState('');
  const [customDataText, setCustomDataText] = useState(
    '{\n  "screen": "orders",\n  "orderId": "ORD-2026"\n}'
  );

  const [rawJsonText, setRawJsonText] = useState(
    JSON.stringify(
      {
        notification: {
          title: 'Hello from FCM Playground!',
          body: 'Custom JSON Payload ဖြင့် ပေးပို့စမ်းသပ်ခြင်း',
        },
        data: {
          source: 'json-editor',
        },
      },
      null,
      2
    )
  );

  const [localValidationErr, setLocalValidationErr] = useState('');
  const [showCodeGenerator, setShowCodeGenerator] = useState(false);

  // Sync quick-clicked topic from sidebar
  const effectiveTopic = selectedTopicFromSidebar || topicName;

  const buildRequestPayload = () => {
    setLocalValidationErr('');

    const resolvedTargetType = targetType === 'topic' ? 'topic' : 'token';
    const resolvedToken =
      targetType === 'browser' ? browserToken : customToken.trim();

    if (resolvedTargetType === 'token' && !resolvedToken) {
      setLocalValidationErr(
        targetType === 'browser'
          ? 'ညာဘက်အကွက်တွင် Browser Connection အရင်ချိတ်ဆက်ပြီး Token ရယူပါ (သို့မဟုတ် Custom Token ပြောင်းရွေးပါ)။'
          : 'ပေးပို့မည့် Custom FCM Token ထည့်သွင်းပေးပါ။'
      );
      return null;
    }

    if (resolvedTargetType === 'topic' && !effectiveTopic.trim()) {
      setLocalValidationErr('ပေးပို့မည့် Topic နာမည် ထည့်သွင်းပေးပါ။');
      return null;
    }

    if (editorMode === 'json') {
      try {
        const parsedRaw = JSON.parse(rawJsonText);
        return {
          targetType: resolvedTargetType,
          token: resolvedToken,
          topic: effectiveTopic.trim(),
          rawPayload: parsedRaw,
        };
      } catch {
        setLocalValidationErr('JSON Payload format မှားယွင်းနေပါသည်။ Bracket နှင့် Quote များ ပြန်စစ်ပါ။');
        return null;
      }
    }

    let parsedData = undefined;
    if (messageType === 'data' || messageType === 'both') {
      if (customDataText.trim()) {
        try {
          parsedData = JSON.parse(customDataText);
        } catch {
          setLocalValidationErr('Custom Data JSON format မှားယွင်းနေပါသည်။');
          return null;
        }
      }
    }

    return {
      targetType: resolvedTargetType,
      token: resolvedToken,
      topic: effectiveTopic.trim(),
      messageType,
      notification: {
        title,
        body,
        imageUrl,
      },
      data: parsedData,
    };
  };

  const handleAction = (mode) => {
    const payload = buildRequestPayload();
    if (!payload) return;

    if (mode === 'validate') {
      onValidate(payload);
    } else {
      onSend(payload);
    }
  };

  // Current preview object for LiveCodeGenerator
  const previewCodePayload = {
    targetType: targetType === 'topic' ? 'topic' : 'token',
    token: targetType === 'browser' ? browserToken : customToken,
    topic: effectiveTopic,
    messageType,
    notification: { title, body, imageUrl },
    data: (() => {
      try {
        return JSON.parse(customDataText);
      } catch {
        return undefined;
      }
    })(),
  };

  return (
    <div className="comic-panel bg-[#FCF9F4] p-4 sm:p-6 space-y-5">
      {/* Header + Visual/JSON Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="comic-pill bg-[#F26D21] text-[#FCF9F4] px-3 py-0.5 text-[11px] font-mono font-bold">
            COMPOSE MESSAGE
          </span>
          <h2 className="text-lg sm:text-2xl font-bold mt-1.5">
            Notification ပေးပို့စမ်းသပ်ရန်
          </h2>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="inline-flex rounded-full border-2 border-[#1C1917] bg-[#F5EFE6] p-1">
          <button
            type="button"
            onClick={() => setEditorMode('visual')}
            className={`px-3.5 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              editorMode === 'visual'
                ? 'bg-[#EAB32E] text-[#1C1917] border border-[#1C1917]'
                : 'text-[#1C1917]/75 hover:text-[#1C1917]'
            }`}
          >
            Visual Editor
          </button>
          <button
            type="button"
            onClick={() => setEditorMode('json')}
            className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold transition-colors cursor-pointer ${
              editorMode === 'json'
                ? 'bg-[#EAB32E] text-[#1C1917] border border-[#1C1917]'
                : 'text-[#1C1917]/75 hover:text-[#1C1917]'
            }`}
          >
            {'JSON Payload { }'}
          </button>
        </div>
      </div>

      {/* Step 1: Audience Selector */}
      <div className="border-2 border-[#1C1917] rounded-xl p-3.5 sm:p-4 bg-[#F5EFE6]/70 space-y-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
          <span className="w-6 h-6 rounded-full bg-[#1C1917] text-[#EAB32E] text-xs flex items-center justify-center">
            ၁
          </span>
          <span>ပေးပို့မည့် ပစ်မှတ် (Target Audience) ရွေးချယ်ပါ</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { id: 'browser', label: 'This Browser (လက်ရှိစက်)' },
            { id: 'customToken', label: 'Custom FCM Token' },
            { id: 'topic', label: 'Topic Broadcast' },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setTargetType(opt.id)}
              className={`px-3 py-2 rounded-xl border-2 text-xs font-bold text-left transition-all cursor-pointer ${
                targetType === opt.id
                  ? 'bg-[#EAB32E] border-[#1C1917] text-[#1C1917] shadow-[2px_2px_0px_#1C1917]'
                  : 'bg-[#FCF9F4] border-[#1C1917]/30 hover:border-[#1C1917]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {targetType === 'customToken' && (
          <input
            type="text"
            value={customToken}
            onChange={(e) => setCustomToken(e.target.value)}
            placeholder="တခြား Device / Browser မှ FCM Registration Token ကို Paste ချပါ..."
            className="comic-input w-full px-3 py-2 font-mono text-xs"
          />
        )}

        {targetType === 'topic' && (
          <input
            type="text"
            value={effectiveTopic}
            onChange={(e) => setTopicName(e.target.value)}
            placeholder="ဥပမာ - promotions သို့မဟုတ် news-updates"
            className="comic-input w-full px-3 py-2 font-mono text-xs"
          />
        )}
      </div>

      {/* Step 2: Message Content */}
      {editorMode === 'visual' ? (
        <div className="border-2 border-[#1C1917] rounded-xl p-3.5 sm:p-4 bg-[#F5EFE6]/70 space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
              <span className="w-6 h-6 rounded-full bg-[#1C1917] text-[#EAB32E] text-xs flex items-center justify-center">
                ၂
              </span>
              <span>Notification အကြောင်းအရာ ရေးသားပါ</span>
            </div>

            <select
              value={messageType}
              onChange={(e) => setMessageType(e.target.value)}
              className="comic-input px-2.5 py-1 text-xs font-bold cursor-pointer"
            >
              <option value="both">Notification + Data</option>
              <option value="notification">Notification Only</option>
              <option value="data">Data Only (Silent)</option>
            </select>
          </div>

          {(messageType === 'notification' || messageType === 'both') && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">Notification Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ခေါင်းစဉ် ရိုက်ထည့်ပါ..."
                  className="comic-input w-full px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Message Body *</label>
                <textarea
                  rows={2}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Notification စာကိုယ် ရိုက်ထည့်ပါ..."
                  className="comic-input w-full px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">
                  Image URL <span className="font-normal text-[#1C1917]/60">(Optional)</span>
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/banner.png"
                  className="comic-input w-full px-3 py-2 font-mono text-xs"
                />
              </div>
            </div>
          )}

          {(messageType === 'data' || messageType === 'both') && (
            <div>
              <label className="block text-xs font-bold mb-1 font-mono">
                Custom Data JSON (Key-Value Strings)
              </label>
              <textarea
                rows={4}
                value={customDataText}
                onChange={(e) => setCustomDataText(e.target.value)}
                className="comic-input w-full p-2.5 font-mono text-xs"
              />
            </div>
          )}

          {/* Live OS Banner Preview */}
          {(messageType === 'notification' || messageType === 'both') && (
            <div className="pt-1 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#1C1917]/70">
                <Eye className="w-3.5 h-3.5" />
                <span>LIVE NOTIFICATION PREVIEW</span>
              </div>
              <div className="bg-[#1C1917] text-[#FCF9F4] border-2 border-[#1C1917] rounded-xl p-3 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#F26D21] border border-[#FCF9F4]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <BellRing className="w-4 h-4 text-[#FCF9F4]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase text-[#EAB32E]">
                      FCM PLAYGROUND • now
                    </span>
                  </div>
                  <div className="font-bold text-sm truncate">
                    {title || 'Notification Title'}
                  </div>
                  <div className="text-xs text-[#F5EFE6]/85 line-clamp-2">
                    {body || 'Notification message preview...'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="border-2 border-[#1C1917] rounded-xl p-3.5 sm:p-4 bg-[#F5EFE6]/70 space-y-2">
          <label className="block text-xs font-mono font-bold">
            Raw FCM Message Object (notification, data, webpush, android...)
          </label>
          <textarea
            rows={10}
            value={rawJsonText}
            onChange={(e) => setRawJsonText(e.target.value)}
            className="comic-input w-full p-3 font-mono text-xs"
          />
        </div>
      )}

      {/* Local Validation Error */}
      {localValidationErr && (
        <div className="bg-[#F28EB2]/35 border-2 border-[#1C1917] rounded-xl p-3 flex items-start gap-2.5 text-xs sm:text-sm font-medium">
          <AlertTriangle className="w-4 h-4 text-[#F26D21] shrink-0 mt-0.5" />
          <p>{localValidationErr}</p>
        </div>
      )}

      {/* Backend API Result / Burmese Error Explanation */}
      {lastApiResult && (
        <div
          className={`border-2 border-[#1C1917] rounded-xl p-3.5 space-y-1.5 text-xs sm:text-sm ${
            lastApiResult.success ? 'bg-[#4C9F98]/20' : 'bg-[#F28EB2]/35'
          }`}
        >
          {lastApiResult.success ? (
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#4C9F98] shrink-0 mt-0.5" />
              <div className="min-w-0 space-y-1">
                <div className="font-bold text-[#1C1917]">
                  {lastApiResult.dryRun
                    ? 'Dry-Run Validation အောင်မြင်ပါသည်! (Payload နှင့် Token မှန်ကန်ပါသည်)'
                    : 'Notification ပေးပို့မှု အောင်မြင်ပါသည်!'}
                </div>
                <div className="font-mono text-[11px] text-[#1C1917]/80 break-all">
                  Message ID: {lastApiResult.messageId}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-[#F26D21] shrink-0 mt-0.5" />
              <div className="min-w-0 space-y-1">
                <div className="font-bold text-[#1C1917]">
                  {lastApiResult.error?.title || 'ပေးပို့မှု မအောင်မြင်ပါ'}
                </div>
                <p className="text-[#1C1917]/90">{lastApiResult.error?.explanation}</p>
                {lastApiResult.error?.suggestion && (
                  <p className="text-xs font-medium bg-[#FCF9F4] border border-[#1C1917]/30 rounded-lg p-2">
                    <strong>ဖြေရှင်းရန်:</strong> {lastApiResult.error.suggestion}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={() => setShowCodeGenerator((prev) => !prev)}
          className="comic-btn bg-[#FCF9F4] hover:bg-[#7EA6E8]/30 px-3.5 py-2 text-xs font-mono font-bold flex items-center gap-1.5"
        >
          <Code2 className="w-4 h-4 text-[#F26D21]" />
          <span>{showCodeGenerator ? 'Hide Node.js Code' : 'Node.js Code ထုတ်ကြည့်ရန်'}</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            type="button"
            disabled={!isAdminConfigured || isValidating || isSending}
            onClick={() => handleAction('validate')}
            className="comic-btn bg-[#EAB32E] text-[#1C1917] px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isValidating ? 'Checking...' : 'Validate (Dry-Run)'}</span>
          </button>

          <button
            type="button"
            disabled={!isAdminConfigured || isSending || isValidating}
            onClick={() => handleAction('send')}
            className="comic-btn bg-[#F26D21] text-[#FCF9F4] px-5 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{isSending ? 'Sending...' : 'Send Notification'}</span>
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {!isAdminConfigured && (
        <p className="text-xs text-[#F26D21] font-medium text-right">
          * Validate နှင့် Send ခလုတ်များ သုံးနိုင်ရန် အပေါ်ရှိ Project Config ထဲတွင် Service Account JSON
          အရင်ထည့်ပါ။
        </p>
      )}

      {/* Collapsible Live Node.js Code Generator */}
      {showCodeGenerator && <LiveCodeGenerator payload={previewCodePayload} />}
    </div>
  );
}