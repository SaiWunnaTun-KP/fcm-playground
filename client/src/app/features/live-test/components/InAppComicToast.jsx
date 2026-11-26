import { BellRing, X } from 'lucide-react';

export default function InAppComicToast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-sm animate-bounce">
      <div className="comic-panel bg-[#EAB32E] p-3.5 shadow-[4px_4px_0px_#1C1917] flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#F26D21] border-2 border-[#1C1917] flex items-center justify-center text-[#FCF9F4] shrink-0">
          <BellRing className="w-5 h-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-[#1C1917] text-[#FCF9F4] px-2 py-0.5 rounded-full">
              FOREGROUND PUSH!
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-0.5 hover:bg-[#1C1917]/10 rounded cursor-pointer"
            >
              <X className="w-4 h-4 text-[#1C1917]" />
            </button>
          </div>

          <h4 className="font-bold text-sm text-[#1C1917] mt-1 truncate">
            {toast.title || 'New Notification'}
          </h4>
          {toast.body && (
            <p className="text-xs text-[#1C1917]/90 line-clamp-2 mt-0.5">{toast.body}</p>
          )}
        </div>
      </div>
    </div>
  );
}