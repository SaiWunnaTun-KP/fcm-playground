import crypto from 'node:crypto';
import { initializeApp, cert, deleteApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

/**
 * Service Account JSON ဖိုင် မှန်/မမှန် အခြေခံ စစ်ဆေးခြင်း
 */
function validateServiceAccount(serviceAccount) {
  if (!serviceAccount || typeof serviceAccount !== 'object') {
    throw new Error('Invalid Service Account: JSON object တစ်ခု ဖြစ်ရပါမည်။');
  }

  const requiredFields = ['project_id', 'private_key', 'client_email'];
  const missingFields = requiredFields.filter((field) => !serviceAccount[field]);

  if (missingFields.length > 0) {
    throw new Error(
      `Invalid Service Account: လိုအပ်သော field များ မပါဝင်ပါ (${missingFields.join(', ')})`
    );
  }
}

/**
 * Request တစ်ခုချင်းစီအတွက် ယာယီ Firebase App ဆောက်ပြီး လုပ်ငန်းပြီးဆုံးပါက ချက်ချင်းပြန်ဖျက်ပေးသည့် Wrapper
 */
export async function withTemporaryFirebaseApp(serviceAccount, callback) {
  validateServiceAccount(serviceAccount);

  const uniqueAppName = `fcm-temp-${crypto.randomUUID()}`;
  const tempApp = initializeApp(
    {
      credential: cert(serviceAccount),
    },
    uniqueAppName
  );

  try {
    const messaging = getMessaging(tempApp);
    return await callback(messaging);
  } finally {
    // Success ဖြစ်သည်ဖြစ်စေ၊ Error တက်သည်ဖြစ်စေ Memory ပေါ်မှ ယာယီ App ကို အမြဲပြန်ဖျက်မည်
    await deleteApp(tempApp);
  }
}