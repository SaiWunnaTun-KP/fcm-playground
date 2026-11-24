export const DOC_SECTIONS = [
  {
    groupId: 'client',
    groupTitle: 'အပိုင်း (၁) — Client Side Setup',
    badgeColor: 'bg-[#4C9F98] text-[#FCF9F4]',
    steps: [
      {
        id: 'step-1',
        number: '၀၁',
        title: 'Create A Firebase Project',
        summary:
          'FCM ကို အသုံးပြုနိုင်ရန် Firebase Console တွင် ကိုယ်ပိုင် Project အသစ်တစ်ခု အရင်ဆုံး ဖန်တီးရပါမည်။',
        bullets: [
          {
            subNumber: '၁.၁',
            text: 'ပထမဆုံး Firebase Console သို့ သွားပါ — ',
            linkText: 'https://console.firebase.google.com',
            linkUrl: 'https://console.firebase.google.com',
          },
          {
            subNumber: '၁.၂',
            text: '"Create a Firebase project" ခလုတ်ကို နှိပ်ပြီး Project နာမည်ပေးကာ Screen ပေါ်တွင် ပြထားသည့်အတိုင်း တစ်ဆင့်ချင်း ဆက်လုပ်သွားပါ။ (Google Analytics ကို ဖွင့်ထားသည်ဖြစ်စေ၊ ပိတ်ထားသည်ဖြစ်စေ ရပါသည်)',
          },
          {
            subNumber: '၁.၃',
            text: 'နောက်ဆုံးတွင် "Your Firebase project is ready" စာသား ပေါ်လာပြီး Continue ခလုတ် မြင်ရပါက Project ဆောက်ခြင်း အောင်မြင်ပါပြီ။',
          },
        ],
        image: {
          src: '/images/step-1-ready.png',
          alt: 'Your Firebase project is ready confirmation screen',
          caption: 'ပုံ (၁.၁) — Firebase Project ဖန်တီးမှု အောင်မြင်သွားသည့် မြင်ကွင်း',
        },
      },
      {
        id: 'step-2',
        number: '၀၂',
        title: 'Install the SDK and Initialize Firebase',
        summary:
          'မိမိစက်ထဲတွင် Web Project တစ်ခု တည်ဆောက်ပြီး Firebase Console မှ Web App ချိတ်ဆက်ကာ Firebase SDK ကို စတင် Initialize လုပ်ရမည့် အဆင့်ဖြစ်ပါသည်။',
        bullets: [
          {
            subNumber: '၂.၁',
            text: 'မိမိစက်ထဲတွင် Web Project အသစ်တစ်ခု အရင်ဆုံး တည်ဆောက်ပါ။ (ဥပမာ - Vite ဖြင့် React Project ဆောက်ခြင်း)',
            command: 'npm create vite@latest my-fcm-app -- --template react && cd my-fcm-app',
          },
          {
            subNumber: '၂.၂',
            text: 'Firebase Console ထဲရှိ ကိုယ်ဆောက်ထားသော Project ထဲဝင်ပါ။ ဘယ်ဘက်အပေါ် ဂီယာပုံ (Project Settings) ထဲသွားပြီး အောက်ဘက်သို့ Scroll ဆွဲပါ။ "Your apps" Section တွင် Web Icon (</>) ကို နှိပ်၍ App nickname တစ်ခုပေးကာ Register app ခလုတ်ကို နှိပ်ပါ။',
          },
          {
            subNumber: '၂.၃',
            text: 'Web Project ၏ Terminal ထဲတွင် အောက်ပါ Command ကို Run ပြီး Firebase SDK ကို ထည့်သွင်းပါ။',
            command: 'npm install firebase',
          },
          {
            subNumber: '၂.၄',
            text: 'Firebase Console တွင် ပြထားသော "Add Firebase SDK" အဆင့်မှ ကုဒ်အကုန်လုံး (import statements များနှင့် firebaseConfig object အပါအဝင်) ကို Copy ကူးယူထားပါ။',
          },
          {
            subNumber: '၂.၅',
            text: 'Web Project ၏ src/ ဖိုဒါအောက်တွင် firebase.js အမည်ဖြင့် ဖိုင်တစ်ခုဆောက်ပြီး Console မှ Copy ကူးလာသော ကုဒ်အကုန်လုံးကို ထည့်သွင်း Save လုပ်ပါ။',
            codeFile: 'src/firebase.js',
            code: `import { initializeApp } from 'firebase/app';

// Console မှ Copy ကူးလာသော မိမိ၏ Firebase configuration ဖြင့် အစားထိုးပါ
const firebaseConfig = {
  apiKey: "AIzaSyYourApiKeyHere...",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);`,
          },
        ],
        tip: 'Firebase Console တွင် "Add Firebase SDK" အဆင့်ပြီးနောက် "Install Firebase CLI" နှင့် "Deploy to Firebase Hosting" အဆင့်များကို ဆက်လက်ပြသထားသော်လည်း ယခုစမ်းသပ်မှုအတွက် မလုပ်ဘဲ ကျော်သွားနိုင်ပါသည်။ "Continue to console" ခလုတ်ကို တိုက်ရိုက်နှိပ်လိုက်ပါ။',
      },
      {
        id: 'step-3',
        number: '၀၃',
        title: 'Setup Service Worker, VAPID Key & Get Token',
        summary:
          'Web Browser မှ Notification လက်ခံနိုင်ရန် VAPID Key ထုတ်ယူခြင်း၊ Background Service Worker ဖိုင် တည်ဆောက်ခြင်းနှင့် User ထံမှ Permission တောင်း၍ FCM Registration Token ရယူခြင်း အဆင့်ဖြစ်ပါသည်။',
        bullets: [
          {
            subNumber: '၃.၁',
            text: 'Firebase Console ၏ Project Settings > Cloud Messaging tab သို့ သွားပါ။ အောက်ဘက်ရှိ "Web configuration" အောက်တွင် Generate key pair ခလုတ်ကို နှိပ်ပြီး ထွက်လာသော Public VAPID Key ကို Copy ကူးထားပါ။',
          },
          {
            subNumber: '၃.၂',
            text: 'Project အပြင်ဆုံးရှိ public/ ဖိုဒါအောက်တွင် firebase-messaging-sw.js အမည်ဖြင့် ဖိုင်တစ်ဖိုင် ဆောက်ပြီး မိမိ၏ firebaseConfig တန်ဖိုးများ ထည့်သွင်းပါ။ (ဖိုင်နာမည် စာလုံးပေါင်း အတိအကျ ဖြစ်ရပါမည်)',
            codeFile: 'public/firebase-messaging-sw.js',
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

// Website Tab ပိတ်ထားချိန် (သို့မဟုတ်) Minimize လုပ်ထားချိန် ဝင်လာသော Noti များကို ဖမ်းယူခြင်း
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Background message received:', payload);
});`,
            tips: [
              {
                title: 'ဘာကြောင့် importScripts() ကိုပဲ သုံးရတာလဲ?',
                text: 'Vite သည် src/ ဖိုဒါအောက်ရှိ ဖိုင်များကိုသာ Bundle လုပ်ပေးပြီး public/ ဖိုဒါထဲမှ ဖိုင်များကို Browser ဆီ တိုက်ရိုက်ပို့ပေးပါသည်။ ထို့ကြောင့် firebase-messaging-sw.js ထဲတွင် import { initializeApp } from "firebase/app" ဟု ရေးပါက Browser က မသိဘဲ Error တက်မည်ဖြစ်၍ importScripts() ဖြင့် Firebase Compat SDK ကို ခေါ်သုံးရခြင်း ဖြစ်ပါသည်။',
              },
              {
                title: "unsupported MIME type ('text/html') Error ဖြေရှင်းနည်း",
                text: 'firebase-messaging-sw.js ဖိုင်ကို src/ ဖိုဒါထဲ မှားထည့်မိလျှင် (သို့မဟုတ်) ဖိုင်နာမည် စာလုံးပေါင်းမှားနေလျှင် Vite Dev Server က ဖိုင်ရှာမတွေ့ဘဲ index.html ကို ပြန်ပို့ပေးသောကြောင့် ဤ Error တက်တတ်ပါသည်။ ဖိုင်ကို public/firebase-messaging-sw.js တွင် ထားပြီး Browser Address Bar ၌ http://localhost:5173/firebase-messaging-sw.js ဟု ရိုက်ဖွင့်ကြည့်ပါက မိမိရေးထားသော JavaScript ကုဒ်များ တန်းပေါ်လာမှသာ နေရာမှန်ကန်ပါသည်။',
              },
            ],
          },
          {
            subNumber: '၃.၃',
            text: 'src/firebase.js ဖိုင်ကို ပြန်ဖွင့်ပြီး Permission တောင်း၍ Token ထုတ်ပေးမည့် requestNotificationToken() function နှင့် Foreground Noti နားထောင်မည့် onMessage() listener ကို ထည့်သွင်းပါ။',
            codeFile: 'src/firebase.js',
            code: `import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  // Step 2 မှ မိမိ၏ Firebase configuration များ
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 1. User ထံမှ Permission တောင်းပြီး FCM Token ထုတ်ယူခြင်း
export async function requestNotificationToken() {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('Notification permission ခွင့်မပြုပါ။');
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: 'YOUR_GENERATED_VAPID_KEY_HERE', // အဆင့် (၃.၁) မှ VAPID Key ထည့်ပါ
    });

    console.log('FCM Registration Token:', token);
    return token;
  } catch (error) {
    console.error('Token ထုတ်ယူရာတွင် အမှားဖြစ်ပွားပါသည်:', error);
    return null;
  }
}

// 2. Website ဖွင့်ထားဆဲ (Foreground) အချိန် ဝင်လာသော Noti များကို ဖမ်းယူခြင်း
onMessage(messaging, (payload) => {
  console.log('Foreground message received:', payload);
});`,
            tips: [
              {
                title: 'Foreground နှင့် Background Notification ကွာခြားချက်',
                text: 'Website Tab ကို ဖွင့်ကြည့်နေစဉ် (Foreground) Noti လှမ်းပို့ပါက System Banner Popup အလိုအလျောက် မတက်ဘဲ src/firebase.js ထဲရှိ onMessage() console တွင်သာ ဝင်လာပါမည်။ တခြား Tab ပြောင်းထားချိန် သို့မဟုတ် Browser ကို Minimize ချထားချိန် (Background) မှသာ Service Worker က ဖမ်းယူပြီး စက်ထောင့်တွင် System Notification Popup ပြသပေးပါမည်။',
              },
            ],
          },
          {
            subNumber: '၃.၄',
            text: 'src/App.jsx တွင် ခလုတ်တစ်ခုထည့်ပြီး Browser မှ "Allow" နှိပ်၍ မိမိစက်၏ FCM Registration Token ကို ထုတ်ယူစမ်းသပ်ပါ။',
            codeFile: 'src/App.jsx',
            code: `import { useState } from 'react';
import { requestNotificationToken } from './firebase';

export default function App() {
  const [token, setToken] = useState('');

  const handleGetToken = async () => {
    const fcmToken = await requestNotificationToken();
    if (fcmToken) {
      setToken(fcmToken);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '20px' }}>
      <button onClick={handleGetToken} style={{ padding: '12px 24px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
        Enable Notifications & Get Token
      </button>

      {token && (
        <div style={{ maxWidth: '560px', wordBreak: 'break-all', textAlign: 'center' }}>
          <p><strong>FCM Registration Token:</strong></p>
          <code>{token}</code>
        </div>
      )}
    </div>
  );
}`,
          },
        ],
      },
      {
        id: 'step-4',
        number: '၀၄',
        title: 'Send a Test Notification from Firebase Console',
        summary:
          'Backend Server မရေးရသေးခင် မိမိ၏ Client Side Setup (Service Worker နှင့် FCM Token) မှန်ကန်စွာ အလုပ်လုပ်ခြင်း ရှိ/မရှိ စစ်ဆေးနိုင်ရန် Firebase Console မှတစ်ဆင့် စမ်းသပ် Notification လှမ်းပို့ကြည့်ပါမည်။',
        bullets: [
          {
            subNumber: '၄.၁',
            text: 'Step 3 တွင် ထုတ်ယူရရှိထားသော မိမိ Browser ၏ FCM Registration Token စာသားအရှည်ကို Copy ကူးထားပါ။',
          },
          {
            subNumber: '၄.၂',
            text: 'Firebase Console ထဲရှိ မိမိ Project ၏ ဘယ်ဘက် Sidebar တွင် DevOps & Engagement ကို နှိပ်ပြီး အောက်မှ Messaging ကို ရွေးချယ်ပါ။',
          },
          {
            subNumber: '၄.၃',
            text: 'အလယ်တွင် ပေါ်လာသော Create your first campaign (Campaign ရှိပြီးသားဖြစ်ပါက New campaign) ကို နှိပ်ပြီး Firebase Notification messages ကို ရွေးကာ Create ကို နှိပ်ပါ။',
          },
          {
            subNumber: '၄.၄',
            text: 'Notification title (ဥပမာ - Hello FCM!) နှင့် Notification text (ဥပမာ - Client side setup အောင်မြင်ပါပြီ) တို့ကို ရိုက်ထည့်ပါ။',
          },
          {
            subNumber: '၄.၅',
            text: 'ညာဘက်ခြမ်း Device Preview အောက်ရှိ Send test message ခလုတ်ကို နှိပ်ပါ။ ပေါ်လာသော Box ထဲရှိ Add an FCM registration token အကွက်တွင် Copy ကူးလာသော Token ကို Paste ချ၍ "+" ခလုတ်ကို နှိပ်ပြီးနောက် Test ခလုတ်ကို နှိပ်လိုက်ပါ။',
            tips: [
              {
                title: 'စမ်းပို့ချိန် စစ်ဆေးကြည့်ရမည့် အခြေအနေ (၂) မျိုး',
                text: 'Test ခလုတ်နှိပ်ချိန်တွင် Firebase Console Tab ၌ ရှိနေပါက (သို့မဟုတ် Browser ကို Minimize ချထားပါက) Background Service Worker က အလုပ်လုပ်ပြီး စက်ထောင့်တွင် System Notification Popup တက်လာပါမည်။ React App Tab ကို တိုက်ရိုက်ဖွင့်ကြည့်နေချိန် (Foreground) ဖြစ်ပါက Browser Console (F12) ထဲတွင် Foreground message received: ဟူ၍ Data ဝင်လာသည်ကို မြင်ရပါမည်။',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    groupId: 'server',
    groupTitle: 'အပိုင်း (၂) — Server Side Setup',
    badgeColor: 'bg-[#F26D21] text-[#FCF9F4]',
    comingSoon: true,
    comingSoonDesc:
      'Node.js (Express) Server တွင် Firebase Admin SDK ချိတ်ဆက်ပြီး Service Account Key ဖြင့် Notification နှင့် Topic များ ပေးပို့ပုံ အဆင့်ဆင့်ကို မကြာမီ ဆက်လက်ထည့်သွင်းပေးပါမည်။',
    steps: [],
  },
];