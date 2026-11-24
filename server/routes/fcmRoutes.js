import express from 'express';
import { withTemporaryFirebaseApp } from '../utils/firebaseHelper.js';

const router = express.Router();

/**
 * Firebase Error Code များအပေါ် မူတည်၍ မြန်မာလို ရှင်းလင်းချက် ထုတ်ပေးခြင်း
 */
function getErrorHint(errorCode = '') {
  const hints = {
    'messaging/invalid-argument':
      'ပို့လိုက်သော Token၊ Topic သို့မဟုတ် Payload format မှားယွင်းနေပါသည်။ (ဥပမာ - Webpush link သည် https:// ဖြင့် စရပါမည်)',
    'messaging/registration-token-not-registered':
      'ဤ Installation ID / Token သည် သက်တမ်းကုန်သွားပြီ သို့မဟုတ် Browser မှ Site data ဖျက်လိုက်သောကြောင့် ပျက်သွားပါပြီ။ ID အသစ် ပြန်ထုတ်ပါ။',
    'messaging/mismatched-credential':
      'Frontend မှ Firebase Config နှင့် Backend မှ Service Account JSON တို့သည် Project တစ်ခုတည်း မဟုတ်ဘဲ ကွဲလွဲနေပါသည်။',
    'app/invalid-credential':
      'Service Account JSON ဖိုင်ထဲမှ private_key သို့မဟုတ် client_email မှားယွင်းနေပါသည်။ Key အသစ် ပြန်ထုတ်ကြည့်ပါ။',
  };

  return (
    hints[errorCode] ||
    'Firebase Server မှ ငြင်းပယ်လိုက်ပါသည်။ Raw error details ကို စစ်ဆေးကြည့်ပါ။'
  );
}

// 1. Server အခြေအနေ စစ်ဆေးရန်
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'FCM Express Server is running!',
  });
});

// 2. Notification ပို့ရန် (Single Token သို့မဟုတ် Topic + Dry Run စစ်ဆေးခြင်း)
router.post('/send', async (req, res) => {
  const {
    serviceAccount,
    targetType = 'token', // 'token' သို့မဟုတ် 'topic'
    targetValue,
    notification = {},
    data = {},
    webpushLink = '',
    dryRun = false,
  } = req.body;

  if (!targetValue || !targetValue.trim()) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'MISSING_TARGET',
        message: 'Target Token (Installation ID) သို့မဟုတ် Topic နာမည် ထည့်သွင်းရန် လိုအပ်ပါသည်။',
      },
    });
  }

  // FCM Message Object တည်ဆောက်ခြင်း
  const message = {};

  if (targetType === 'topic') {
    message.topic = targetValue.trim();
  } else {
    message.token = targetValue.trim();
  }

  // Notification Title, Body နှင့် Image ထည့်သွင်းခြင်း
  if (notification.title || notification.body || notification.imageUrl) {
    message.notification = {};
    if (notification.title) message.notification.title = notification.title;
    if (notification.body) message.notification.body = notification.body;
    if (notification.imageUrl) message.notification.imageUrl = notification.imageUrl;
  }

  // Custom Data Payload ထည့်သွင်းခြင်း (FCM စည်းမျဉ်းအရ value အားလုံး String ဖြစ်ရမည်)
  if (data && typeof data === 'object' && Object.keys(data).length > 0) {
    const stringifiedData = {};
    for (const [key, value] of Object.entries(data)) {
      if (key.trim()) {
        stringifiedData[key.trim()] = String(value);
      }
    }
    if (Object.keys(stringifiedData).length > 0) {
      message.data = stringifiedData;
    }
  }

  // Click Action Link ထည့်သွင်းခြင်း
  if (webpushLink && webpushLink.trim()) {
    message.webpush = {
      fcm_options: {
        link: webpushLink.trim(),
      },
    };
  }

  try {
    const messageId = await withTemporaryFirebaseApp(serviceAccount, async (messaging) => {
      // dryRun === true ဖြစ်ပါက တကယ်မပို့ဘဲ Format နှင့် Token မှန်/မမှန်သာ စစ်ဆေးပေးမည်
      return await messaging.send(message, Boolean(dryRun));
    });

    return res.json({
      success: true,
      dryRun: Boolean(dryRun),
      messageId,
      sentPayload: message,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    const errorCode = err.code || err.errorInfo?.code || 'UNKNOWN_ERROR';
    const errorMessage = err.message || 'Notification ပို့ရာတွင် အမှားအယွင်း ဖြစ်ပွားပါသည်။';

    return res.status(400).json({
      success: false,
      dryRun: Boolean(dryRun),
      sentPayload: message,
      error: {
        code: errorCode,
        message: errorMessage,
        hint: getErrorHint(errorCode),
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// 3. Topic သို့ Subscribe / Unsubscribe လုပ်ရန်
router.post('/topic', async (req, res) => {
  const { serviceAccount, action = 'subscribe', token, topic } = req.body;

  if (!token || !topic) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'MISSING_PARAMS',
        message: 'Installation ID (token) နှင့် Topic နာမည် နှစ်ခုလုံး လိုအပ်ပါသည်။',
      },
    });
  }

  const tokens = Array.isArray(token) ? token : [token.trim()];
  const cleanTopic = topic.trim();

  try {
    const result = await withTemporaryFirebaseApp(serviceAccount, async (messaging) => {
      if (action === 'unsubscribe') {
        return await messaging.unsubscribeFromTopic(tokens, cleanTopic);
      }
      return await messaging.subscribeToTopic(tokens, cleanTopic);
    });

    return res.json({
      success: true,
      action,
      topic: cleanTopic,
      result,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    const errorCode = err.code || err.errorInfo?.code || 'TOPIC_ERROR';
    return res.status(400).json({
      success: false,
      error: {
        code: errorCode,
        message: err.message,
        hint: getErrorHint(errorCode),
      },
    });
  }
});

export default router;