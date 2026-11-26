import { initializeApp, cert, deleteApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

export function parseServiceAccount(rawInput) {
  if (!rawInput) {
    const err = new Error('Service Account JSON ဖိုင် ထည့်သွင်းပေးပါ။');
    err.code = 'app/missing-credential';
    throw err;
  }

  let parsed = rawInput;
  if (typeof rawInput === 'string') {
    try {
      parsed = JSON.parse(rawInput);
    } catch {
      const err = new Error('Service Account JSON ပုံစံ မမှန်ကန်ပါ (Invalid JSON)။');
      err.code = 'app/invalid-credential';
      throw err;
    }
  }

  if (
    typeof parsed !== 'object' ||
    !parsed.project_id ||
    !parsed.client_email ||
    !parsed.private_key
  ) {
    const err = new Error(
      'Service Account JSON ထဲတွင် project_id, client_email သို့မဟုတ် private_key မပြည့်စုံပါ။'
    );
    err.code = 'app/invalid-credential';
    throw err;
  }

  return {
    ...parsed,
    private_key: parsed.private_key.replace(/\\n/g, '\n'),
  };
}

export async function withEphemeralMessaging(rawServiceAccount, callback) {
  const serviceAccount = parseServiceAccount(rawServiceAccount);
  const appName = `fcm-lab-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const tempApp = initializeApp(
    {
      credential: cert(serviceAccount),
    },
    appName
  );

  try {
    const messaging = getMessaging(tempApp);
    return await callback(messaging, serviceAccount.project_id);
  } finally {
    await deleteApp(tempApp).catch(() => {});
  }
}