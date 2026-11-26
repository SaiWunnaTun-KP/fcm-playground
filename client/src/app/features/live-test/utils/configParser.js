const STORAGE_KEYS = {
  WEB_CONFIG: 'fcm_playground_web_config',
  VAPID_KEY: 'fcm_playground_vapid_key',
  SERVICE_ACCOUNT: 'fcm_playground_service_account',
  TOPICS: 'fcm_playground_topics',
  ACTIVITIES: 'fcm_playground_activities',
};

export const EMPTY_WEB_CONFIG = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

const CONFIG_FIELDS = [
  'apiKey',
  'authDomain',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId',
];

export function parseFirebaseConfigSnippet(rawText) {
  if (!rawText || typeof rawText !== 'string') return null;

  const extracted = {};
  let foundCount = 0;

  for (const key of CONFIG_FIELDS) {
    const regex = new RegExp(`["']?${key}["']?\\s*:\\s*["']([^"']+)["']`);
    const match = rawText.match(regex);
    if (match && match[1]) {
      extracted[key] = match[1].trim();
      foundCount += 1;
    }
  }

  return foundCount > 0 ? extracted : null;
}

export function isWebConfigComplete(webConfig, vapidKey) {
  if (!webConfig || !vapidKey?.trim()) return false;
  return Boolean(
    webConfig.apiKey?.trim() &&
      webConfig.projectId?.trim() &&
      webConfig.messagingSenderId?.trim() &&
      webConfig.appId?.trim()
  );
}

export function validateServiceAccountText(rawJsonText) {
  if (!rawJsonText?.trim()) {
    return { valid: false, parsed: null, projectId: '' };
  }
  try {
    const parsed = JSON.parse(rawJsonText);
    const valid = Boolean(
      parsed &&
        typeof parsed === 'object' &&
        parsed.project_id &&
        parsed.client_email &&
        parsed.private_key
    );
    return {
      valid,
      parsed: valid ? parsed : null,
      projectId: parsed?.project_id || '',
    };
  } catch {
    return { valid: false, parsed: null, projectId: '' };
  }
}

export function loadSavedLabState() {
  try {
    const webConfig = JSON.parse(localStorage.getItem(STORAGE_KEYS.WEB_CONFIG) || 'null');
    const vapidKey = localStorage.getItem(STORAGE_KEYS.VAPID_KEY) || '';
    const serviceAccountText = localStorage.getItem(STORAGE_KEYS.SERVICE_ACCOUNT) || '';
    const topics = JSON.parse(localStorage.getItem(STORAGE_KEYS.TOPICS) || '[]');
    const activities = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITIES) || '[]');

    return {
      webConfig: { ...EMPTY_WEB_CONFIG, ...(webConfig || {}) },
      vapidKey,
      serviceAccountText,
      topics: Array.isArray(topics) ? topics : [],
      activities: Array.isArray(activities) ? activities : [],
    };
  } catch {
    return {
      webConfig: { ...EMPTY_WEB_CONFIG },
      vapidKey: '',
      serviceAccountText: '',
      topics: [],
      activities: [],
    };
  }
}

export function saveCredentialsToStorage({ webConfig, vapidKey, serviceAccountText }) {
  localStorage.setItem(STORAGE_KEYS.WEB_CONFIG, JSON.stringify(webConfig));
  localStorage.setItem(STORAGE_KEYS.VAPID_KEY, vapidKey);
  if (serviceAccountText) {
    localStorage.setItem(STORAGE_KEYS.SERVICE_ACCOUNT, serviceAccountText);
  } else {
    localStorage.removeItem(STORAGE_KEYS.SERVICE_ACCOUNT);
  }
}

export function clearCredentialsFromStorage() {
  localStorage.removeItem(STORAGE_KEYS.WEB_CONFIG);
  localStorage.removeItem(STORAGE_KEYS.VAPID_KEY);
  localStorage.removeItem(STORAGE_KEYS.SERVICE_ACCOUNT);
}

export function saveTopicsToStorage(topics) {
  localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(topics));
}

export function saveActivitiesToStorage(activities) {
  localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities.slice(0, 30)));
}