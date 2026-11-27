export function translateFcmError(error) {
  const code = error?.code || 'unknown-error';
  const rawMessage = error?.message || 'အမည်မသိ အမှားတစ်ခု ဖြစ်ပွားပါသည်။';

  if (
    rawMessage.includes('cloudmessaging.topicSubscriptions') ||
    rawMessage.includes('topicSubscriptions.create') ||
    rawMessage.includes('topicSubscriptions.delete')
  ) {
    return {
      code: 'messaging/topic-permission-denied',
      title: 'Topic စီမံခန့်ခွဲခွင့် (IAM Permission) မရှိသေးပါ',
      explanation:
        'Service Account တွင် Topic Subscribe/Unsubscribe ပြုလုပ်ရန် cloudmessaging.topicSubscriptions Permission မပါဝင်သေးပါ။',
      suggestion:
        'Google Cloud Console > IAM & Admin > IAM ထဲသို့သွားပြီး firebase-adminsdk Service Account ကို "Firebase Cloud Messaging Admin" Role ထပ်ပေါင်းထည့်ပေးပါ။',
      rawMessage,
    };
  }

  if (
    code === 'messaging/third-party-permission-denied' ||
    rawMessage.includes('THIRD_PARTY_PERMISSION_DENIED')
  ) {
    return {
      code: 'messaging/third-party-permission-denied',
      title: 'Web Push Permission ငြင်းပယ်ခံရပါသည် (403)',
      explanation:
        'Client ဘက်မှ Token ထုတ်စဉ်က သုံးခဲ့သော Firebase Project သို့မဟုတ် VAPID Key နှင့် Server ဘက်မှ Service Account JSON မကိုက်ညီပါ။',
      suggestion:
        'Client Config နှင့် Service Account ၏ Project ID တူညီကြောင်း စစ်ဆေးပြီး Browser ရှိ Service Worker အဟောင်းကို Unregister လုပ်ကာ Token အသစ် ပြန်ထုတ်ပါ။',
      rawMessage,
    };
  }

  if (
    code === 'messaging/registration-token-not-registered' ||
    code === 'messaging/invalid-registration-token' ||
    (code === 'messaging/invalid-argument' &&
      rawMessage.toLowerCase().includes('registration token'))
  ) {
    return {
      code,
      title: 'FCM Token မှားယွင်းနေပါသည် (သို့မဟုတ်) သက်တမ်းကုန်သွားပါပြီ',
      explanation:
        'ထည့်သွင်းထားသော FCM Registration Token သည် ပုံစံမမှန်ကန်ခြင်း သို့မဟုတ် Browser မှ Unregister ဖြစ်သွားခြင်း ဖြစ်နိုင်ပါသည်။',
      suggestion:
        'Browser Connection အကွက်မှ Token အသစ် ပြန်ထုတ်ယူပြီး ထပ်မံစမ်းသပ်ပါ။',
      rawMessage,
    };
  }

  if (code === 'messaging/mismatched-credential') {
    return {
      code,
      title: 'Project Credential မကိုက်ညီပါ (SenderId Mismatch)',
      explanation:
        'FCM Token ထုတ်ထားသည့် Firebase Project နှင့် ယခုထည့်ထားသော Service Account JSON ဖိုင်သည် တခြား Project စီ ဖြစ်နေပါသည်။',
      suggestion:
        'Firebase Project တစ်ခုတည်းမှ ရယူထားသော Web Config နှင့် Service Account JSON ကိုသာ တွဲသုံးပါ။',
      rawMessage,
    };
  }

  if (code === 'app/invalid-credential' || code === 'app/missing-credential') {
    return {
      code,
      title: 'Service Account JSON ဖိုင် မမှန်ကန်ပါ',
      explanation: rawMessage,
      suggestion:
        'Firebase Console > Project Settings > Service Accounts မှ Private Key အသစ် ပြန်ထုတ်ပြီး Upload တင်ပါ။',
      rawMessage,
    };
  }

  if (code === 'messaging/invalid-payload' || code === 'messaging/invalid-argument') {
    return {
      code,
      title: 'Message Payload ပုံစံ မမှန်ကန်ပါ',
      explanation:
        'ပေးပို့လိုက်သော JSON Payload သို့မဟုတ် Custom Data အချက်အလက်များ မှားယွင်းနေပါသည်။',
      suggestion:
        'Custom Data ထဲရှိ Key နှင့် Value အားလုံးသည် စာသား (String) ဖြစ်ကြောင်း ပြန်လည်စစ်ဆေးပါ။',
      rawMessage,
    };
  }

  return {
    code,
    title: 'FCM Request မအောင်မြင်ပါ',
    explanation: rawMessage,
    suggestion:
      'ထည့်သွင်းထားသော Token, Topic နှင့် Service Account အချက်အလက်များ မှန်ကန်မှု ရှိ/မရှိ ပြန်လည်စစ်ဆေးပါ။',
    rawMessage,
  };
}