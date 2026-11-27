import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Upload,
  CheckCircle2,
  Trash2,
  ExternalLink,
  KeyRound,
  FileJson,
  Save,
} from 'lucide-react';
import {
  parseFirebaseConfigSnippet,
  validateServiceAccountText,
} from '../utils/configParser';

export default function ProjectConfigDrawer({
  webConfig,
  vapidKey,
  serviceAccountText,
  onSaveConfig,
  onClearConfig,
}) {
  const [localWeb, setLocalWeb] = useState(webConfig);
  const [localVapid, setLocalVapid] = useState(vapidKey);
  const [localAdminJson, setLocalAdminJson] = useState(serviceAccountText);
  const [smartPasteText, setSmartPasteText] = useState('');
  const [parseFeedback, setParseFeedback] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  const fileInputRef = useRef(null);

  const adminValidation = validateServiceAccountText(localAdminJson);

  const handleSmartPaste = (text) => {
    setSmartPasteText(text);
    const parsed = parseFirebaseConfigSnippet(text);
    if (parsed) {
      setLocalWeb((prev) => ({ ...prev, ...parsed }));
      setParseFeedback('Config အချက်အလက်များကို အလိုအလျောက် ဖြည့်သွင်းပြီးပါပြီ!');
    } else if (text.trim()) {
      setParseFeedback('firebaseConfig format မတွေ့ရှိပါ။ အောက်ပါအကွက်များတွင် တိုက်ရိုက်ဖြည့်နိုင်ပါသည်။');
    } else {
      setParseFeedback('');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = String(event.target?.result || '');
      setLocalAdminJson(content);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveConfig({
      webConfig: localWeb,
      vapidKey: localVapid,
      serviceAccountText: localAdminJson,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleResetAll = () => {
    const empty = {
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
    };
    setLocalWeb(empty);
    setLocalVapid('');
    setLocalAdminJson('');
    setSmartPasteText('');
    setParseFeedback('');
    onClearConfig();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="comic-panel bg-[#FCF9F4] p-4 sm:p-6 space-y-5 border-t-4 border-t-[#EAB32E]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Column: Web App Config + VAPID Key */}
        <div className="border-2 border-[#1C1917] rounded-2xl p-4 sm:p-5 bg-[#F5EFE6]/60 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
              <KeyRound className="w-4 h-4 text-[#F26D21]" />
              <span>၁။ Firebase Web Config & VAPID Key</span>
            </div>
            <Link
              to="/docs#step-2"
              className="text-xs font-bold text-[#1C1917] underline hover:text-[#F26D21] inline-flex items-center gap-1"
            >
              <span>အဆင့် ၀၂ ကြည့်ရန်</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {/* Smart Config Paste Box */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold flex items-center gap-1.5 text-[#1C1917]/85">
              <Sparkles className="w-3.5 h-3.5 text-[#F26D21]" />
              <span>Smart Paste (firebaseConfig Object တစ်ခုလုံး ကူးထည့်ရန်)</span>
            </label>
            <textarea
              rows={3}
              value={smartPasteText}
              onChange={(e) => handleSmartPaste(e.target.value)}
              placeholder={`const firebaseConfig = {\n  apiKey: "AIzaSy...",\n  projectId: "my-app",\n  ...\n};`}
              className="comic-input w-full p-2.5 font-mono text-xs"
            />
            {parseFeedback && (
              <p className="text-xs font-medium text-[#4C9F98]">{parseFeedback}</p>
            )}
          </div>

          {/* Individual Web Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold mb-1">API Key *</label>
              <input
                type="text"
                required
                value={localWeb.apiKey}
                onChange={(e) => setLocalWeb({ ...localWeb, apiKey: e.target.value })}
                placeholder="AIzaSy..."
                className="comic-input w-full px-3 py-2 font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Project ID *</label>
              <input
                type="text"
                required
                value={localWeb.projectId}
                onChange={(e) => setLocalWeb({ ...localWeb, projectId: e.target.value })}
                placeholder="your-project-id"
                className="comic-input w-full px-3 py-2 font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Messaging Sender ID *</label>
              <input
                type="text"
                required
                value={localWeb.messagingSenderId}
                onChange={(e) =>
                  setLocalWeb({ ...localWeb, messagingSenderId: e.target.value })
                }
                placeholder="123456789012"
                className="comic-input w-full px-3 py-2 font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">App ID *</label>
              <input
                type="text"
                required
                value={localWeb.appId}
                onChange={(e) => setLocalWeb({ ...localWeb, appId: e.target.value })}
                placeholder="1:123456:web:abcdef"
                className="comic-input w-full px-3 py-2 font-mono text-xs"
              />
            </div>
          </div>

          {/* VAPID Key */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold">Web Push VAPID Key *</label>
              <Link
                to="/docs#step-3"
                className="text-[11px] font-bold text-[#1C1917]/75 hover:text-[#F26D21] inline-flex items-center gap-1"
              >
                <span>အဆင့် ၀၃ ကြည့်ရန်</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <input
              type="text"
              required
              value={localVapid}
              onChange={(e) => setLocalVapid(e.target.value)}
              placeholder="BEl62iUYgUivxIkv69yViEuiBIa..."
              className="comic-input w-full px-3 py-2 font-mono text-xs"
            />
          </div>
        </div>

        {/* Right Column: Service Account JSON */}
        <div className="border-2 border-[#1C1917] rounded-2xl p-4 sm:p-5 bg-[#F5EFE6]/60 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
                <FileJson className="w-4 h-4 text-[#4C9F98]" />
                <span>၂။ Admin SDK Service Account JSON</span>
              </div>
              <Link
                to="/docs#server-step-2"
                className="text-xs font-bold text-[#1C1917] underline hover:text-[#F26D21] inline-flex items-center gap-1"
              >
                <span>Server အဆင့် ၀၂ ကြည့်ရန်</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <p className="text-xs text-[#1C1917]/80 leading-relaxed">
              Server မှ Notification ပေးပို့နိုင်ရန် Firebase Console မှ ထုတ်ယူထားသော{' '}
              <code className="font-mono font-bold">serviceAccountKey.json</code> ဖိုင်ကို Upload
              တင်ပါ (သို့မဟုတ်) အောက်တွင် Paste ချပါ။
            </p>

            {/* Upload Dropzone Button */}
            <div className="flex flex-wrap items-center gap-2.5">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="comic-btn bg-[#FCF9F4] hover:bg-[#EAB32E] px-3.5 py-2 text-xs font-bold flex items-center gap-2"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>JSON ဖိုင်ရွေးရန် (.json)</span>
              </button>

              {adminValidation.valid && (
                <span className="comic-pill bg-[#4C9F98] text-[#FCF9F4] px-3 py-1 text-xs font-mono font-bold inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Valid ({adminValidation.projectId})</span>
                </span>
              )}
            </div>

            <textarea
              rows={7}
              value={localAdminJson}
              onChange={(e) => setLocalAdminJson(e.target.value)}
              placeholder={`{\n  "type": "service_account",\n  "project_id": "your-project-id",\n  "private_key": "-----BEGIN PRIVATE KEY-----...",\n  "client_email": "firebase-adminsdk-..."\n}`}
              className="comic-input w-full p-2.5 font-mono text-xs"
            />
          </div>

          <p className="text-[11px] text-[#1C1917]/70 leading-relaxed">
            * လုံခြုံရေးအရ Private Key ကို သင့် Browser LocalStorage ထဲတွင်သာ သိမ်းဆည်းထားပြီး
            Server Database ပေါ်တွင် လုံးဝသိမ်းဆည်းခြင်း မရှိပါ။
          </p>
        </div>
      </div>

      {/* Bottom Save / Clear Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={handleResetAll}
          className="px-3.5 py-2 rounded-full border-2 border-[#1C1917]/40 hover:border-[#1C1917] hover:bg-[#F28EB2]/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Saved Config များ ဖျက်ရန်</span>
        </button>

        <div className="flex items-center gap-3">
          {savedNotice && (
            <span className="text-xs font-bold text-[#4C9F98]">သိမ်းဆည်းပြီးပါပြီ!</span>
          )}
          <button
            type="submit"
            className="comic-btn bg-[#4C9F98] text-[#FCF9F4] px-5 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save & Apply Config</span>
          </button>
        </div>
      </div>
    </form>
  );
}