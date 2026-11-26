import { useState } from 'react';
import { Wifi, WifiOff, Copy, Check, RefreshCw, BellRing } from 'lucide-react';

export default function BrowserConnectionCard({
  isWebConfigured,
  browserToken,
  permissionStatus,
  isConnecting,
  connectionError,
  onConnect,
  onDisconnect,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyToken = async () => {
    if (!browserToken) return;
    try {
      await navigator.clipboard.writeText(browserToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy token:', err);
    }
  };

  return (
    <div className="comic-panel bg-[#FCF9F4] p-4 sm:p-5 space-y-3.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
          {browserToken ? (
            <Wifi className="w-4 h-4 text-[#4C9F98]" />
          ) : (
            <WifiOff className="w-4 h-4 text-[#F26D21]" />
          )}
          <span>Browser Connection</span>
        </div>

        <span
          className={`px-2.5 py-0.5 rounded-full border border-[#1C1917] text-[11px] font-mono font-bold ${
            permissionStatus === 'granted'
              ? 'bg-[#4C9F98] text-[#FCF9F4]'
              : permissionStatus === 'denied'
              ? 'bg-[#F28EB2] text-[#1C1917]'
              : 'bg-[#EAB32E] text-[#1C1917]'
          }`}
        >
          Permission: {permissionStatus}
        </span>
      </div>

      <p className="text-xs text-[#1C1917]/80 leading-relaxed">
        လက်ရှိ Browser ဆီသို့ Push Notification လက်ခံနိုင်ရန် Service Worker ချိတ်ဆက်ပြီး FCM Token
        ထုတ်ယူပါ။
      </p>

      {browserToken ? (
        <div className="space-y-2.5">
          <div className="bg-[#F5EFE6] border-2 border-[#1C1917] rounded-xl p-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono font-bold text-[#1C1917]/70">
                FCM REGISTRATION TOKEN
              </span>
              <button
                type="button"
                onClick={handleCopyToken}
                className="text-xs font-mono font-bold text-[#1C1917] hover:text-[#F26D21] inline-flex items-center gap-1 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#4C9F98]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <p className="font-mono text-[11px] break-all text-[#1C1917]/90 line-clamp-3">
              {browserToken}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isConnecting}
              onClick={onConnect}
              className="comic-btn flex-1 bg-[#EAB32E] text-[#1C1917] px-3 py-2 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isConnecting ? 'animate-spin' : ''}`} />
              <span>Refresh Token</span>
            </button>

            <button
              type="button"
              onClick={onDisconnect}
              className="px-3 py-2 rounded-full border-2 border-[#1C1917]/40 hover:border-[#1C1917] text-xs font-bold cursor-pointer"
            >
              Reset SW
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={!isWebConfigured || isConnecting}
          onClick={onConnect}
          className="comic-btn w-full bg-[#4C9F98] text-[#FCF9F4] px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
        >
          <BellRing className="w-4 h-4" />
          <span>
            {isConnecting ? 'Connecting Browser...' : 'Enable Notifications & Get Token'}
          </span>
        </button>
      )}

      {!isWebConfigured && (
        <p className="text-[11px] text-[#F26D21] font-medium">
          * အပေါ်ရှိ Project Config ထဲတွင် Web Config နှင့် VAPID Key အရင်ဖြည့်ပါ။
        </p>
      )}

      {connectionError && (
        <div className="bg-[#F28EB2]/35 border border-[#1C1917] rounded-xl p-2.5 text-xs font-medium text-[#1C1917]">
          {connectionError}
        </div>
      )}
    </div>
  );
}