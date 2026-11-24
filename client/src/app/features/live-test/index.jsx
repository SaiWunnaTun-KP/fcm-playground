import { Link } from 'react-router-dom';
import { Zap, BookOpen, ArrowUpRight, BellRing, ShieldCheck, Radio } from 'lucide-react';

export default function LiveTestPage() {
  return (
    <div className="comic-panel bg-[#FCF9F4] comic-halftone p-5 sm:p-10">
      <div className="max-w-2xl mx-auto bg-[#FCF9F4] border-2 border-[#1C1917] rounded-2xl p-6 sm:p-8 text-center space-y-5">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 comic-pill bg-[#F26D21] text-[#FCF9F4] px-4 py-1 text-xs font-mono font-bold">
          <Zap className="w-3.5 h-3.5" />
          <span>INTERACTIVE LAB // COMING SOON</span>
        </div>

        {/* Display Headline */}
        <h1 className="font-display text-3xl sm:text-5xl uppercase tracking-tight leading-tight">
          LIVE TESTER
          <br />
          <span className="text-[#4C9F98]">COMING SOON.</span>
        </h1>

        <p className="text-sm sm:text-base text-[#1C1917]/85 leading-relaxed">
          Firebase Console ထဲ ဝင်စရာမလိုဘဲ ဒီနေရာကနေ Notification တွေ တိုက်ရိုက်ပို့ပြီး
          စမ်းသပ်နိုင်မယ့် Live Testing Lab ကို မကြာမီ ဖွင့်လှစ်ပေးပါမည်။
        </p>

        {/* Upcoming Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className="comic-pill bg-[#EAB32E] px-3 py-1 text-xs font-bold flex items-center gap-1.5">
            <BellRing className="w-3.5 h-3.5" />
            <span>Single & Topic Push</span>
          </span>
          <span className="comic-pill bg-[#7EA6E8] px-3 py-1 text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Dry-Run Validator</span>
          </span>
          <span className="comic-pill bg-[#F28EB2] px-3 py-1 text-xs font-bold flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5" />
            <span>Live Delivery Diagnostics</span>
          </span>
        </div>

        {/* Back to Docs CTA */}
        <div className="pt-3 flex justify-center">
          <Link
            to="/docs"
            className="comic-btn bg-[#EAB32E] text-[#1C1917] px-5 py-3 font-bold text-sm sm:text-base inline-flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            <span>Client Side Setup Docs ဖတ်ရှုရန်</span>
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}