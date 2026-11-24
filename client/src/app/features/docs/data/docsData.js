export const DOC_SECTIONS = [
  {
    groupId: 'client',
    groupTitle: 'အပိုင်း (၁) — Client Side Setup',
    badgeColor: 'bg-[#4C9F98] text-[#FCF9F4]',
    steps: [
      {
        id: 'step-1',
        number: '01',
        title: 'Firebase Project နှင့် Web App ဖန်တီးခြင်း',
        summary:
          'Firebase Console တွင် Project အသစ်ဆောက်ပြီး Frontend မှ ချိတ်ဆက်အသုံးပြုမည့် firebaseConfig Object ကို ရယူရပါမည်။',
        bullets: [
          'Firebase Console (console.firebase.google.com) ထဲဝင်ပြီး Create a project နှိပ်၍ Project အသစ်တစ်ခု ဆောက်ပါ။',
          'Project Overview စာမျက်နှာတွင် Web Icon (</>) ကို နှိပ်ပြီး App nickname ပေးကာ Register app လုပ်ပါ။',
          'ထွက်ပေါ်လာသော firebaseConfig object (apiKey, projectId, messagingSenderId, appId စသည်) ကို ကူးယူသိမ်းဆည်းထားပါ။',
        ],
        codeFile: 'firebaseConfig.js (နမူနာ)',
        codeLang: 'javascript',
        code: `const firebaseConfig = {
  apiKey: "AIzaSyYourApiKeyHere...",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};`,
      },
      {
        id: 'step-2',
        number: '02',
        title: 'Web Push Certificate (VAPID Key) ထုတ်ယူခြင်း',
        summary:
          'Web Browser များဆီ Push Notification ပို့နိုင်ရန် Firebase မှ Web Push Certificate (VAPID Key) တစ်ခု ထုတ်ယူရပါမည်။',
        bullets: [
          'Firebase Console ဘယ်ဘက်အပေါ်ရှိ ဂီယာပုံ (Project Settings) ကို နှိပ်ပါ။',
          'Cloud Messaging tab သို့ ပြောင်းပြီး အောက်ဘက်ရှိ Web configuration အပိုင်းကို ရှာပါ။',
          'Web Push certificates အောက်တွင် Generate key pair ခလုတ်ကို နှိပ်ပါ။',
          'ထွက်လာသော Key pair စာသားအရှည် (Public VAPID Key) ကို Copy ကူးထားပါ။',
        ],
        tip: 'ဤ VAPID Key ကို Live Test စာမျက်နှာ၏ Client Configuration အကွက်တွင် ထည့်သွင်းပြီး Token ထုတ်ယူရပါမည်။',
      },
      {
        id: 'step-3',
        number: '03',
        title: 'Service Worker (firebase-messaging-sw.js) တည်ဆောက်ခြင်း',
        summary:
          'Website Tab ကို ပိတ်ထားချိန် (သို့မဟုတ်) Minimize လုပ်ထားချိန်တွင် ဝင်လာသော Background Notification များကို ဖမ်းယူပြသနိုင်ရန် Service Worker ဖိုင် မဖြစ်မနေ လိုအပ်ပါသည်။',
        bullets: [
          'React / Vite Project ၏ public/ ဖိုဒါအောက်တွင် firebase-messaging-sw.js အမည်ဖြင့် ဖိုင်တစ်ဖိုင် ဆောက်ပါ။ (ဖိုင်နာမည် အတိအကျ ဖြစ်ရပါမည်)',
          'Service Worker သည် Browser ၏ သီးခြား Thread တွင် အလုပ်လုပ်သောကြောင့် importScripts ဖြင့် Firebase Compat SDK ကို ခေါ်သုံးရပါမည်။',
        ],
        codeFile: 'public/firebase-messaging-sw.js',
        codeLang: 'javascript',
        code: `importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
});

const messaging = firebase.messaging();

// Tab ပိတ်ထားချိန် Background မှ Notification ဝင်လာလျှင် အလုပ်လုပ်မည့်အပိုင်း
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

  const notificationTitle = payload.notification?.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/vite.svg'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});`,
        tip: 'Live Test စာမျက်နှာတွင် စမ်းသပ်သည့်အခါ၌မူ ကိုယ်တိုင် ဖိုင်ပြင်စရာမလိုဘဲ UI မှ ရိုက်ထည့်လိုက်သော Config ကို URL Query မှတစ်ဆင့် Service Worker ဆီ အလိုအလျောက် ပို့ပေးပါမည်။',
      },
      {
        id: 'step-4',
        number: '04',
        title: 'Frontend တွင် Permission တောင်းပြီး FCM Token ရယူခြင်း',
        summary:
          'React App ထဲတွင် Firebase SDK သွင်းပြီး User ထံမှ Notification ခွင့်ပြုချက် တောင်းခံကာ Device Token ထုတ်ယူရပါမည်။',
        bullets: [
          'Client ဖိုဒါထဲတွင် npm install firebase ဖြင့် SDK ထည့်သွင်းပါ။',
          'Notification.requestPermission() ဖြင့် Browser ခွင့်ပြုချက် တောင်းခံပြီး "granted" ဖြစ်ပါက getToken() ဖြင့် FCM Registration Token ကို ရယူပါ။',
          'App ဖွင့်ထားဆဲ (Foreground) အချိန်တွင် ဝင်လာမည့် Notification များကို ဖမ်းယူရန် onMessage() listener ကို ထည့်သွင်းပါ။',
        ],
        codeFile: 'src/firebase.js',
        codeLang: 'javascript',
        code: `import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 1. Permission တောင်းပြီး FCM Token ထုတ်ယူခြင်း
export async function requestFcmToken(vapidKey) {
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    throw new Error('Notification permission ငြင်းပယ်ခံရပါသည်။');
  }

  const token = await getToken(messaging, { vapidKey });
  console.log('FCM Registration Token:', token);
  return token;
}

// 2. App ဖွင့်ထားစဉ် (Foreground) ဝင်လာသော Noti များကို နားထောင်ခြင်း
onMessage(messaging, (payload) => {
  console.log('Foreground message received:', payload);
});`,
      },
    ],
  },
  {
    groupId: 'admin',
    groupTitle: 'အပိုင်း (၂) — Admin SDK Setup (Server)',
    badgeColor: 'bg-[#F26D21] text-[#FCF9F4]',
    steps: [
      {
        id: 'step-5',
        number: '05',
        title: 'Service Account Private Key (JSON) ထုတ်ယူခြင်း',
        summary:
          'Backend Server မှ Firebase ဆီ Full Admin အခွင့်အာဏာဖြင့် ချိတ်ဆက်ပြီး Notification လှမ်းပို့နိုင်ရန် Service Account Credential ဖိုင် လိုအပ်ပါသည်။',
        bullets: [
          'Firebase Console ၏ Project Settings > Service accounts tab သို့ သွားပါ။',
          'Firebase Admin SDK အောက်တွင် Node.js ကို ရွေးထားပြီး Generate new private key ခလုတ်ကို နှိပ်ပါ။',
          'စက်ထဲသို့ Download ကျလာသော .json ဖိုင်ကို serviceAccountKey.json ဟု အမည်ပြောင်းထားပါ။',
        ],
        warning:
          'လုံခြုံရေး သတိပြုရန် — ဤ JSON ဖိုင်ထဲတွင် Server လျှို့ဝှက် Private Key ပါဝင်သောကြောင့် GitHub ကဲ့သို့ Public နေရာများသို့ လုံးဝ မတင်မိစေရန် .gitignore ထဲတွင် မဖြစ်မနေ ထည့်ထားပါ။',
      },
      {
        id: 'step-6',
        number: '06',
        title: 'Node.js Server တွင် firebase-admin ချိတ်ဆက်ပေးပို့ခြင်း',
        summary:
          'Backend Server တွင် firebase-admin package ကို အသုံးပြု၍ Client Token (သို့မဟုတ်) Topic တစ်ခုဆီသို့ Notification စတင်ပေးပို့နိုင်ပါပြီ။',
        bullets: [
          'Server ဖိုဒါထဲတွင် npm install firebase-admin ကို ထည့်သွင်းပါ။',
          'initializeApp({ credential: cert(serviceAccount) }) ဖြင့် Admin SDK ကို စတင်ချိတ်ဆက်ပါ။',
          'getMessaging().send(message) ကို ခေါ်သုံးပြီး သက်ဆိုင်ရာ Token သို့မဟုတ် Topic ဆီသို့ Message လှမ်းပို့ပါ။',
        ],
        codeFile: 'server/send.js',
        codeLang: 'javascript',
        code: `import { initializeApp, cert } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import serviceAccount from './serviceAccountKey.json' with { type: 'json' };

// 1. Firebase Admin SDK ကို Initialize လုပ်ခြင်း
initializeApp({
  credential: cert(serviceAccount),
});

// 2. Client ဘက်မှ ရရှိထားသော FCM Token (သို့မဟုတ် Topic) ဖြင့် ပို့ခြင်း
const message = {
  notification: {
    title: 'Hello from Express Server!',
    body: 'Firebase Admin SDK မှ အောင်မြင်စွာ ပို့လိုက်ပါပြီ။',
  },
  token: 'YOUR_CLIENT_FCM_TOKEN',
};

getMessaging()
  .send(message)
  .then((response) => {
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.error('Error sending message:', error);
  });`,
      },
    ],
  },
];