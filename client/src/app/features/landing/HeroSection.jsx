import { Link } from 'react-router-dom';
import { BookOpen, Zap, ArrowUpRight, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="space-y-4 sm:space-y-5">
      {/* Top Comic Frame: Headline + Hanging Signboard + Description */}
      <div className="comic-panel bg-[#FCF9F4] p-5 sm:p-7 relative overflow-hidden">
        {/* Top Row: Big Headline + Top-Right Hanging Signboard */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-[64px] tracking-tight leading-[1.03] uppercase text-[#1C1917] pt-1">
            FIREBASE PUSH
            <br />
            <span className="text-[#F26D21]">PLAYGROUND.</span>
          </h1>

          {/* Hanging Rectangular Signboard (ထောင့်မှာ ချိတ်ဆွဲထားသော ဆိုင်းဘုတ်ပုံစံ) */}
          <div className="self-start md:self-auto shrink-0 flex flex-col items-center md:-mt-3 md:mr-2 select-none">
            {/* Nail / Pin */}
            <div className="w-3.5 h-3.5 rounded-full bg-[#EAB32E] border-2 border-[#1C1917] z-10" />

            {/* Hanging Strings (V-shape wires) */}
            <svg
              width="120"
              height="22"
              viewBox="0 0 120 22"
              className="-mt-1 overflow-visible"
              aria-hidden="true"
            >
              <line
                x1="60"
                y1="0"
                x2="18"
                y2="22"
                stroke="#1C1917"
                strokeWidth="2"
              />
              <line
                x1="60"
                y1="0"
                x2="102"
                y2="22"
                stroke="#1C1917"
                strokeWidth="2"
              />
            </svg>

            {/* Rectangular Signboard */}
            <div className="bg-[#4C9F98] border-2 border-[#1C1917] rounded-xl px-4 py-2.5 shadow-[3px_3px_0px_#1C1917] -rotate-2 text-center">
              <div className="flex items-center justify-center gap-1 text-[#EAB32E] mb-0.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FCF9F4]">
                  NO CONSOLE NEEDED!
                </span>
              </div>
              <div className="bg-[#EAB32E] text-[#1C1917] border-2 border-[#1C1917] rounded-md px-2.5 py-0.5 font-display text-xs sm:text-sm tracking-wide uppercase">
                LIVE TEST
              </div>
            </div>
          </div>
        </div>

        {/* Description Box directly under Headline */}
        <div className="mt-5 sm:mt-6 bg-[#F5EFE6] border-2 border-[#1C1917] rounded-xl p-4 sm:p-5 flex items-start gap-3.5">
          <div className="w-2 self-stretch rounded-full bg-[#F26D21] shrink-0" />
          <p className="text-base sm:text-lg text-[#1C1917] font-medium leading-[1.85]">
            Web App တွေမှာ Push Notification စနစ် ထည့်သွင်းပုံကို မြန်မာလို တစ်ဆင့်ချင်း
            လေ့လာနိုင်သလို၊ Firebase Console ထဲ ဝင်စရာမလိုဘဲ ဒီ Web Interface ကနေတစ်ဆင့်
            Notification တွေ တိုက်ရိုက်ပို့ပြီး ရောက်/မရောက် အခြေအနေနဲ့ Payload ပုံစံတွေကိုပါ
            တစ်ခါတည်း စစ်ဆေးကြည့်ရှုနိုင်ပါတယ်။
          </p>
        </div>
      </div>

      {/* Bottom Action Bento Grid: 2 Conditional User Paths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {/* Path 1: Set Up မလုပ်ရသေးသူများအတွက် */}
        <div className="comic-panel bg-[#FCF9F4] p-5 sm:p-6 flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 comic-pill bg-[#EAB32E] px-3 py-0.5 text-xs font-mono font-bold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>STEP 01 // FIRST TIME?</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917]">
              Set Up မလုပ်ရသေးဘူးလား?
            </h2>
            <p className="text-sm sm:text-base text-[#1C1917]/80 leading-relaxed">
              Firebase Project ဆောက်တာကနေ VAPID Key နဲ့ Service Account JSON ယူတဲ့အထိ
              အဆင့်ဆင့် လမ်းညွှန်ကို အရင်ဖတ်ရှုပြီး ပြင်ဆင်နိုင်ပါတယ်။
            </p>
          </div>

          <Link
            to="/docs"
            className="comic-btn w-full bg-[#EAB32E] text-[#1C1917] px-5 py-3 font-bold text-base flex items-center justify-between"
          >
            <span className="flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 shrink-0" />
              <span>Docs ကြည့်ရန်</span>
            </span>
            <ArrowUpRight className="w-5 h-5 shrink-0" />
          </Link>
        </div>

        {/* Path 2: Set Up လုပ်ပြီးသူများအတွက် */}
        <div className="comic-panel bg-[#4C9F98] p-5 sm:p-6 flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 comic-pill bg-[#FCF9F4] px-3 py-0.5 text-xs font-mono font-bold text-[#1C1917]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#4C9F98]" />
              <span>STEP 02 // READY TO TEST?</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#FCF9F4]">
              Set Up လုပ်ပြီးပြီလား?
            </h2>
            <p className="text-sm sm:text-base text-[#FCF9F4]/95 leading-relaxed">
              Firebase Config နဲ့ Service Account JSON အဆင်သင့်ဖြစ်ပြီဆိုရင်
              Notification တွေ လက်တွေ့ပို့ပြီး ရလဒ်ကို တိုက်ရိုက်စမ်းသပ်နိုင်ပါပြီ။
            </p>
          </div>

          <Link
            to="/live-test"
            className="comic-btn w-full bg-[#F26D21] text-[#FCF9F4] px-5 py-3 font-bold text-base flex items-center justify-between"
          >
            <span className="flex items-center gap-2.5">
              <Zap className="w-5 h-5 shrink-0" />
              <span>Live Test စမ်းရန်</span>
            </span>
            <ArrowUpRight className="w-5 h-5 shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}