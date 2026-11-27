import { CheckCircle2, Settings2, ChevronDown, ChevronUp, ShieldAlert } from 'lucide-react';

export default function SetupStepperBar({
  isWebConfigured,
  isBrowserConnected,
  isAdminConfigured,
  projectId,
  projectMismatch,
  isDrawerOpen,
  onToggleDrawer,
}) {
  const steps = [
    {
      num: '၀၁',
      label: 'Web & Admin Config',
      sub: isWebConfigured
        ? `${projectId}${isAdminConfigured ? ' + Admin SDK' : ' (Admin လိုအပ်)'}`
        : 'Firebase Config ထည့်ရန်',
      done: isWebConfigured && isAdminConfigured,
      partial: isWebConfigured && !isAdminConfigured,
    },
    {
      num: '၀၂',
      label: 'Browser Token',
      sub: isBrowserConnected ? 'Token ချိတ်ဆက်ပြီးပါပြီ' : 'Permission & Token ယူရန်',
      done: isBrowserConnected,
      partial: false,
    },
    {
      num: '၀၃',
      label: 'Ready to Send',
      sub:
        isAdminConfigured && isBrowserConnected
          ? 'Live Test စမ်းပို့နိုင်ပါပြီ'
          : 'အဆင့် (၁) နှင့် (၂) ပြည့်စုံရန်လို',
      done: isAdminConfigured && isBrowserConnected,
      partial: false,
    },
  ];

  return (
    <div className="comic-panel bg-[#FCF9F4] p-3.5 sm:p-5 space-y-3">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* 3-Step Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 flex-1">
          {steps.map((step) => (
            <div
              key={step.num}
              className={`border-2 border-[#1C1917] rounded-xl px-3 py-2 flex items-center gap-2.5 transition-colors ${
                step.done
                  ? 'bg-[#4C9F98]/20'
                  : step.partial
                  ? 'bg-[#EAB32E]/25'
                  : 'bg-[#F5EFE6]'
              }`}
            >
              <span
                className={`w-7 h-7 rounded-full border-2 border-[#1C1917] text-xs font-bold flex items-center justify-center shrink-0 ${
                  step.done
                    ? 'bg-[#4C9F98] text-[#FCF9F4]'
                    : step.partial
                    ? 'bg-[#EAB32E] text-[#1C1917]'
                    : 'bg-[#1C1917] text-[#FCF9F4]'
                }`}
              >
                {step.done ? <CheckCircle2 className="w-4 h-4" /> : step.num}
              </span>

              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-[#1C1917] truncate">
                  {step.label}
                </div>
                <div className="text-[11px] text-[#1C1917]/75 truncate">{step.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Setup Drawer Button */}
        <button
          type="button"
          onClick={onToggleDrawer}
          className="comic-btn bg-[#EAB32E] text-[#1C1917] px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shrink-0"
        >
          <Settings2 className="w-4 h-4 shrink-0" />
          <span>{isDrawerOpen ? 'Config ပိတ်ရန်' : 'Project Config ပြင်ရန်'}</span>
          {isDrawerOpen ? (
            <ChevronUp className="w-4 h-4 shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 shrink-0" />
          )}
        </button>
      </div>

      {/* Project ID Mismatch Warning */}
      {projectMismatch && (
        <div className="bg-[#F28EB2]/35 border-2 border-[#1C1917] rounded-xl px-3.5 py-2.5 flex items-start gap-2.5 text-xs sm:text-sm font-medium">
          <ShieldAlert className="w-4 h-4 text-[#F26D21] shrink-0 mt-0.5" />
          <p>
            <strong>သတိပြုရန် — Project ID မတူညီပါ:</strong> Web Config နှင့် Service Account JSON
            တို့သည် မတူညီသော Firebase Project များ ဖြစ်နေပါသည်။ Project တစ်ခုတည်းမှ Key များကိုသာ
            တွဲသုံးပါ။
          </p>
        </div>
      )}
    </div>
  );
}