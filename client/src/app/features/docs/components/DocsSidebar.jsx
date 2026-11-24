import { useState } from 'react';
import { ListTree, ChevronDown, ChevronUp, Clock } from 'lucide-react';

export default function DocsSidebar({ sections, activeStepId, onSelectStep }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = (id) => {
    onSelectStep(id);
    setMobileOpen(false);
  };

  const isOverviewActive = activeStepId === 'overview';

  return (
    <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-4 self-start">
      <div className="comic-panel bg-[#FCF9F4] p-4">
        {/* Header */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="w-full flex items-center justify-between lg:cursor-default"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EAB32E] border-2 border-[#1C1917] flex items-center justify-center">
              <ListTree className="w-4 h-4 text-[#1C1917]" />
            </div>
            <span className="font-display text-sm uppercase tracking-wide">
              SETUP ROADMAP
            </span>
          </div>
          <span className="lg:hidden p-1">
            {mobileOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </span>
        </button>

        {/* Navigation Items */}
        <div
          className={`${
            mobileOpen ? 'block' : 'hidden'
          } lg:block mt-3.5 pt-3.5 border-t-2 border-[#1C1917]/15 space-y-5`}
        >
          {/* ၀၀ Overview Link */}
          <div>
            <button
              type="button"
              onClick={() => handleClick('overview')}
              className={`w-full text-left px-2.5 py-2 rounded-xl border-2 text-xs sm:text-[13px] transition-all flex items-center gap-2.5 cursor-pointer ${
                isOverviewActive
                  ? 'bg-[#EAB32E] border-[#1C1917] text-[#1C1917] font-bold shadow-[2px_2px_0px_#1C1917]'
                  : 'border-transparent hover:border-[#1C1917]/35 hover:bg-[#F5EFE6] text-[#1C1917]/85 font-medium'
              }`}
            >
              <span
                className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                  isOverviewActive
                    ? 'bg-[#1C1917] text-[#EAB32E]'
                    : 'bg-[#F5EFE6] border border-[#1C1917]/30 text-[#1C1917]'
                }`}
              >
                ၀၀
              </span>
              <span className="leading-snug">FCM မိတ်ဆက်နှင့် 3D Flow</span>
            </button>
          </div>

          {/* Setup Step Groups */}
          {sections.map((group) => (
            <div key={group.groupId} className="space-y-2.5">
              <div
                className={`inline-block px-3 py-1 rounded-full border-2 border-[#1C1917] text-xs font-bold leading-normal ${group.badgeColor}`}
              >
                {group.groupTitle}
              </div>

              {group.comingSoon ? (
                <div className="px-3 py-2.5 rounded-xl border-2 border-dashed border-[#1C1917]/35 bg-[#F5EFE6]/70 flex items-center gap-2 text-xs font-mono font-bold text-[#1C1917]/70">
                  <Clock className="w-3.5 h-3.5 text-[#F26D21] shrink-0" />
                  <span>COMING SOON...</span>
                </div>
              ) : (
                <ul className="space-y-1.5">
                  {group.steps.map((step) => {
                    const isActive = activeStepId === step.id;
                    return (
                      <li key={step.id}>
                        <button
                          type="button"
                          onClick={() => handleClick(step.id)}
                          className={`w-full text-left px-2.5 py-2 rounded-xl border-2 text-xs sm:text-[13px] transition-all flex items-center gap-2.5 cursor-pointer ${
                            isActive
                              ? 'bg-[#EAB32E] border-[#1C1917] text-[#1C1917] font-bold shadow-[2px_2px_0px_#1C1917]'
                              : 'border-transparent hover:border-[#1C1917]/35 hover:bg-[#F5EFE6] text-[#1C1917]/85 font-medium'
                          }`}
                        >
                          <span
                            className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                              isActive
                                ? 'bg-[#1C1917] text-[#EAB32E]'
                                : 'bg-[#F5EFE6] border border-[#1C1917]/30 text-[#1C1917]'
                            }`}
                          >
                            {step.number}
                          </span>
                          <span className="leading-snug">{step.title}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}