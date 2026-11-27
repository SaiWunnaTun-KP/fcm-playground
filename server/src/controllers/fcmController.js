import { withEphemeralMessaging } from '../utils/firebaseSession.js';
import { translateFcmError } from '../utils/errorTranslator.js';

function sanitizeDataPayload(rawData) {
  if (!rawData || typeof rawData !== 'object' || Array.isArray(rawData)) {
    return undefined;
  }

  const entries = Object.entries(rawData);
  if (entries.length === 0) return undefined;

  const sanitized = {};
  for (const [key, value] of entries) {
    if (!key.trim()) continue;
    sanitized[key.trim()] =
      typeof value === 'string' ? value : JSON.stringify(value);
  }

  return Object.keys(sanitized).length > 0 ? sanitized : undefined;
}

function buildFcmMessage(body) {
  const {
    targetType = 'token',
    token,
    topic,
    messageType = 'notification',
    notification,
    data,
    rawPayload,
  } = body;

  // 1. Target သတ်မှတ်ခြင်း (Single Token သို့မဟုတ် Topic)
  const target = {};
  if (targetType === 'topic') {
    const cleanTopic = String(topic || '')
      .trim()
      .replace(/^\/topics\//, '');
    if (!cleanTopic) {
      const err = new Error('ပေးပို့မည့် Topic နာမည် ထည့်သွင်းပေးပါ။');
      err.code = 'messaging/invalid-argument';
      throw err;
    }
    target.topic = cleanTopic;
  } else {
    const cleanToken = String(token || '').trim();
    if (!cleanToken) {
      const err = new Error('ပေးပို့မည့် FCM Registration Token ထည့်သွင်းပေးပါ။');
      err.code = 'messaging/invalid-registration-token';
      throw err;
    }
    target.token = cleanToken;
  }

  // 2. JSON Payload Editor မှ တိုက်ရိုက်ပို့လာလျှင်
  if (rawPayload && typeof rawPayload === 'object') {
    const { token: _t, topic: _tp, condition: _c, ...restPayload } = rawPayload;
    const message = { ...target, ...restPayload };
    if (message.data) {
      message.data = sanitizeDataPayload(message.data);
    }
    return message;
  }

  // 3. Visual Editor မှ ပို့လာလျှင်
  const message = { ...target };

  if (messageType === 'notification' || messageType === 'both') {
    const title = String(notification?.title || '').trim();
    const msgBody = String(notification?.body || '').trim();
    const imageUrl = String(notification?.imageUrl || '').trim();

    if (!title && !msgBody) {
      const err = new Error('Notification Title သို့မဟုတ် Message စာသား ထည့်သွင်းပေးပါ။');
      err.code = 'messaging/invalid-payload';
      throw err;
    }

    message.notification = {
      ...(title && { title }),
      ...(msgBody && { body: msgBody }),
      ...(imageUrl && { imageUrl }),
    };
  }

  if (messageType === 'data' || messageType === 'both') {
    const sanitizedData = sanitizeDataPayload(data);
    if (messageType === 'data' && !sanitizedData) {
      const err = new Error('Data-only message အတွက် Custom Data JSON ထည့်သွင်းပေးပါ။');
      err.code = 'messaging/invalid-payload';
      throw err;
    }
    if (sanitizedData) {
      message.data = sanitizedData;
    }
  }

  return message;
}

export async function handleSendMessage(req, res, { dryRun = false } = {}) {
  try {
    const { serviceAccount } = req.body;
    const message = buildFcmMessage(req.body);

    const result = await withEphemeralMessaging(
      serviceAccount,
      async (messaging, projectId) => {
        const messageId = await messaging.send(message, dryRun);
        return { messageId, projectId };
      }
    );

    return res.status(200).json({
      success: true,
      dryRun,
      projectId: result.projectId,
      messageId: result.messageId,
      sentPayload: message,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const translated = translateFcmError(error);
    return res.status(400).json({
      success: false,
      dryRun,
      error: translated,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function handleTopicSubscription(req, res, action = 'subscribe') {
  try {
    const { serviceAccount, tokens, topic } = req.body;

    const cleanTopic = String(topic || '')
      .trim()
      .replace(/^\/topics\//, '');
    if (!cleanTopic) {
      const err = new Error('Topic နာမည် ထည့်သွင်းပေးပါ။');
      err.code = 'messaging/invalid-argument';
      throw err;
    }

    const tokenList = (Array.isArray(tokens) ? tokens : [tokens])
      .map((t) => String(t || '').trim())
      .filter(Boolean);

    if (tokenList.length === 0) {
      const err = new Error('Topic ချိတ်ဆက်ရန် Browser Token အနည်းဆုံးတစ်ခု လိုအပ်ပါသည်။');
      err.code = 'messaging/invalid-registration-token';
      throw err;
    }

    const response = await withEphemeralMessaging(
      serviceAccount,
      async (messaging) => {
        if (action === 'unsubscribe') {
          return await messaging.unsubscribeFromTopic(tokenList, cleanTopic);
        }
        return await messaging.subscribeToTopic(tokenList, cleanTopic);
      }
    );

    if (response.failureCount > 0 && response.errors?.length > 0) {
      const firstErr = response.errors[0].error;
      return res.status(400).json({
        success: false,
        topic: cleanTopic,
        action,
        error: translateFcmError(firstErr),
      });
    }

    return res.status(200).json({
      success: true,
      topic: cleanTopic,
      action,
      successCount: response.successCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      action,
      error: translateFcmError(error),
    });
  }
}