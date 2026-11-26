import { History, Trash2, ArrowUpRight, ArrowDownLeft, AlertCircle } from 'lucide-react';

export default function ActivityLogCard({ activities, onClear }) {
  return (
    <div className="comic-panel bg-[#FCF9F4] p-4 sm:p-5 space-y-3.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
          <History className="w-4 h-4 text-[#4C9F98]" />
          <span>Recent Activity</span>
          <span className="comic-pill bg-[#F5EFE6] px-2 py-0.5 text-xs font-mono">
            {activities.length}
          </span>
        </div>

        {activities.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-bold text-[#1C1917]/70 hover:text-[#F26D21] inline-flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {activities.length === 0 ? (
        <div className="border-2 border-dashed border-[#1C1917]/25 rounded-xl p-5 text-center space-y-1 bg-[#F5EFE6]/50">
          <p className="text-xs font-bold text-[#1C1917]/80">မှတ်တမ်း မရှိသေးပါ</p>
          <p className="text-[11px] text-[#1C1917]/65">
            Notification ပေးပို့မှုများနှင့် လက်ခံရရှိမှုများ ဤနေရာတွင် ပေါ်လာပါမည်။
          </p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
          {activities.map((item) => {
            const isReceived = item.direction === 'received';
            const isError = item.status === 'error';

            return (
              <div
                key={item.id}
                className={`border-2 border-[#1C1917] rounded-xl p-3 space-y-1 text-xs ${
                  isError
                    ? 'bg-[#F28EB2]/25'
                    : isReceived
                    ? 'bg-[#4C9F98]/20'
                    : 'bg-[#F5EFE6]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 font-mono font-bold text-[11px]">
                    {isError ? (
                      <>
                        <AlertCircle className="w-3.5 h-3.5 text-[#F26D21]" />
                        <span>ERROR</span>
                      </>
                    ) : isReceived ? (
                      <>
                        <ArrowDownLeft className="w-3.5 h-3.5 text-[#4C9F98]" />
                        <span>FOREGROUND RECEIVED</span>
                      </>
                    ) : (
                      <>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#F26D21]" />
                        <span>{item.dryRun ? 'DRY-RUN VALIDATED' : 'SENT'}</span>
                      </>
                    )}
                  </span>

                  <span className="font-mono text-[10px] text-[#1C1917]/65">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <div className="font-bold text-[#1C1917] truncate">{item.title}</div>
                {item.body && (
                  <div className="text-[#1C1917]/80 line-clamp-2">{item.body}</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}