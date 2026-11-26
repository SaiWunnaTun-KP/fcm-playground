import { initializeApp, getApps, deleteApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const PLAYGROUND_APP_NAME = 'fcm-live-test-client';

export async function connectBrowserToFcm({ webConfig, vapidKey, onForegroundMessage }) {
  if (!('Notification' in window) || !('serviceWorker' in navigator)) {
    throw new Error('ဤ Browser သည် Web Push Notification ကို မပံ့ပိုးပါ။');
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    throw new Error(
      'Notification Permission ခွင့်မပြုထားပါ။ Browser Address Bar ဘေးရှိ Lock/Settings အိုင်ကွန်မှ Notifications ကို Allow ပြောင်းပေးပါ။'
    );
  }

  const cleanConfig = {
    apiKey: webConfig.apiKey.trim(),
    authDomain: webConfig.authDomain?.trim() || `${webConfig.projectId.trim()}.firebaseapp.com`,
    projectId: webConfig.projectId.trim(),
    storageBucket: webConfig.storageBucket?.trim() || `${webConfig.projectId.trim()}.firebasestorage.app`,
    messagingSenderId: webConfig.messagingSenderId.trim(),
    appId: webConfig.appId.trim(),
  };

  // Unregister old playground SW registrations first so updated config takes effect cleanly
  const existingRegs = await navigator.serviceWorker.getRegistrations();
  for (const reg of existingRegs) {
    if (reg.active?.scriptURL?.includes('firebase-messaging-sw.js')) {
      await reg.unregister();
    }
  }

  const swUrl = `/firebase-messaging-sw.js?config=${encodeURIComponent(
    JSON.stringify(cleanConfig)
  )}`;
  const registration = await navigator.serviceWorker.register(swUrl);
  await navigator.serviceWorker.ready;

  // Recreate named Firebase client instance cleanly
  const existingApp = getApps().find((app) => app.name === PLAYGROUND_APP_NAME);
  if (existingApp) {
    await deleteApp(existingApp);
  }

  const clientApp = initializeApp(cleanConfig, PLAYGROUND_APP_NAME);
  const messaging = getMessaging(clientApp);

  const token = await getToken(messaging, {
    vapidKey: vapidKey.trim(),
    serviceWorkerRegistration: registration,
  });

  if (!token) {
    throw new Error('FCM Registration Token ထုတ်ယူ၍ မရပါ။ VAPID Key ကို ပြန်လည်စစ်ဆေးပါ။');
  }

  const unsubscribe = onMessage(messaging, (payload) => {
    if (typeof onForegroundMessage === 'function') {
      onForegroundMessage(payload);
    }
  });

  return { token, permission, unsubscribe };
}

export async function disconnectBrowserFromFcm() {
  if ('serviceWorker' in navigator) {
    const existingRegs = await navigator.serviceWorker.getRegistrations();
    for (const reg of existingRegs) {
      if (reg.active?.scriptURL?.includes('firebase-messaging-sw.js')) {
        await reg.unregister();
      }
    }
  }

  const existingApp = getApps().find((app) => app.name === PLAYGROUND_APP_NAME);
  if (existingApp) {
    await deleteApp(existingApp);
  }
}