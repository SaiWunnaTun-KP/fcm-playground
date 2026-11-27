importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging-compat.js');

function getConfigFromUrl() {
  try {
    const url = new URL(self.location.href);
    const encoded = url.searchParams.get('config');
    if (!encoded) return null;
    return JSON.parse(decodeURIComponent(encoded));
  } catch (err) {
    console.error('[SW] Failed to parse firebase config from URL:', err);
    return null;
  }
}

const dynamicConfig = getConfigFromUrl();

if (dynamicConfig && dynamicConfig.apiKey && dynamicConfig.projectId) {
  firebase.initializeApp(dynamicConfig);
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    const title = payload?.notification?.title || payload?.data?.title || 'FCM Playground';
    const options = {
      body: payload?.notification?.body || payload?.data?.body || 'New background message received.',
      icon: payload?.notification?.image || '/favicon.png',
      data: payload?.data || {},
    };

    self.registration.showNotification(title, options);
  });
}