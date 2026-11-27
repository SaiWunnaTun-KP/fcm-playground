import { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export default function LiveCodeGenerator({ payload }) {
  const [copied, setCopied] = useState(false);

  const buildNodeSnippet = () => {
    const messageObj = {};

    if (payload.targetType === 'topic') {
      messageObj.topic = payload.topic || 'your-topic-name';
    } else {
      messageObj.token = payload.token || 'TARGET_FCM_REGISTRATION_TOKEN';
    }

    if (
      (payload.messageType === 'notification' || payload.messageType === 'both') &&
      payload.notification
    ) {
      messageObj.notification = {
        title: payload.notification.title || 'Hello!',
        body: payload.notification.body || 'Notification message',
        ...(payload.notification.imageUrl && { imageUrl: payload.notification.imageUrl }),
      };
    }

    if (
      (payload.messageType === 'data' || payload.messageType === 'both') &&
      payload.data &&
      Object.keys(payload.data).length > 0
    ) {
      const stringifiedData = {};
      for (const [k, v] of Object.entries(payload.data)) {
        stringifiedData[k] = typeof v === 'string' ? v : JSON.stringify(v);
      }
      messageObj.data = stringifiedData;
    }

    return `import { readFileSync } from 'fs';
import { initializeApp, cert } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

const serviceAccount = JSON.parse(readFileSync('./serviceAccountKey.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });

const message = ${JSON.stringify(messageObj, null, 2)};

const response = await getMessaging().send(message);
console.log('Successfully sent message:', response);`;
  };

  const generatedCode = buildNodeSnippet();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <div className="border-2 border-[#1C1917] rounded-xl overflow-hidden bg-[#1C1917] text-[#FCF9F4]">
      <div className="bg-[#292524] border-b-2 border-[#1C1917] px-3.5 py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-mono text-[#EAB32E]">
          <Terminal className="w-4 h-4 shrink-0" />
          <span>AUTO-GENERATED NODE.JS SERVER CODE</span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold border border-[#FCF9F4]/30 bg-[#1C1917] hover:bg-[#EAB32E] hover:text-[#1C1917] transition-colors flex items-center gap-1 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-[#4C9F98]" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      <pre className="p-3.5 text-xs font-mono leading-relaxed overflow-x-auto text-[#F5EFE6]">
        <code>{generatedCode}</code>
      </pre>
    </div>
  );
}