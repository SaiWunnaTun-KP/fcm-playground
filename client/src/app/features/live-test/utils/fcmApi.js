const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api/fcm';

async function postJson(endpoint, body) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: {
        code: 'network/server-unreachable',
        title: 'Backend Server နှင့် ချိတ်ဆက်၍ မရပါ',
        explanation:
          'Express Server (http://localhost:5000) ကို ဖွင့်ထားခြင်း ရှိ/မရှိ စစ်ဆေးပါ။',
        suggestion:
          'Terminal တွင် server/ ဖိုဒါအောက်၌ npm run dev ဖြင့် Server ကို အရင် Run ထားပေးပါ။',
        rawMessage: err?.message || 'Failed to fetch',
      },
    };
  }
}

export function sendFcmNotification(payload) {
  return postJson('/send', payload);
}

export function validateFcmNotification(payload) {
  return postJson('/validate', payload);
}

export function subscribeTopicApi({ serviceAccount, tokens, topic }) {
  return postJson('/topics/subscribe', { serviceAccount, tokens, topic });
}

export function unsubscribeTopicApi({ serviceAccount, tokens, topic }) {
  return postJson('/topics/unsubscribe', { serviceAccount, tokens, topic });
}