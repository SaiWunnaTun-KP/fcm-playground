import { useState } from 'react';
import { ListTree, ChevronDown, ChevronUp } from 'lucide-react';

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
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#EAB32E] border-2 border-[#1C1917] flex items-center justify-center">
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
          } lg:block mt-4 pt-3 border-t-2 border-[#1C1917]/15 space-y-5`}
        >
          {/* 00 Overview Link */}
          <div>
            <button
              type="button"
              onClick={() => handleClick('overview')}
              className={`w-full text-left px-3 py-2 rounded-xl border-2 text-xs sm:text-[13px] font-medium transition-all flex items-start gap-2.5 cursor-pointer ${
                isOverviewActive
                  ? 'bg-[#EAB32E] border-[#1C1917] text-[#1C1917] font-bold shadow-[2px_2px_0px_#1C1917]'
                  : 'border-transparent hover:border-[#1C1917]/40 hover:bg-[#F5EFE6] text-[#1C1917]/80'
              }`}
            >
              <span
                className={`font-mono text-[11px] px-1.5 py-0.5 rounded border border-[#1C1917] shrink-0 mt-0.5 ${
                  isOverviewActive ? 'bg-[#FCF9F4]' : 'bg-[#F5EFE6]'
                }`}
              >
                00
              </span>
              <span className="leading-snug">FCM မိတ်ဆက်နှင့် 3D Flow</span>
            </button>
          </div>

          {/* Setup Step Groups */}
          {sections.map((group) => (
            <div key={group.groupId} className="space-y-2">
              <div
                className={`inline-block px-2.5 py-0.5 rounded-full border-2 border-[#1C1917] text-[11px] font-bold ${group.badgeColor}`}
              >
                {group.groupTitle}
              </div>

              <ul className="space-y-1.5">
                {group.steps.map((step) => {
                  const isActive = activeStepId === step.id;
                  return (
                    <li key={step.id}>
                      <button
                        type="button"
                        onClick={() => handleClick(step.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl border-2 text-xs sm:text-[13px] font-medium transition-all flex items-start gap-2.5 cursor-pointer ${
                          isActive
                            ? 'bg-[#EAB32E] border-[#1C1917] text-[#1C1917] font-bold shadow-[2px_2px_0px_#1C1917]'
                            : 'border-transparent hover:border-[#1C1917]/40 hover:bg-[#F5EFE6] text-[#1C1917]/80'
                        }`}
                      >
                        <span
                          className={`font-mono text-[11px] px-1.5 py-0.5 rounded border border-[#1C1917] shrink-0 mt-0.5 ${
                            isActive ? 'bg-[#FCF9F4]' : 'bg-[#F5EFE6]'
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
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}