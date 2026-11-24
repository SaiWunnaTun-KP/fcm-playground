import { ExternalLink, Globe, Layers, MonitorPlay, EyeOff } from 'lucide-react';
import FcmFlowDiagram3D from './FcmFlowDiagram3D';

const PLATFORMS = [
  { name: 'iOS+', active: false },
  { name: 'Android', active: false },
  { name: 'Web (Browser)', active: true },
  { name: 'Flutter', active: false },
  { name: 'Unity', active: false },
  { name: 'C++', active: false },
];

export default function DocsOverview() {
  return (
    <article
      id="overview"
      className="scroll-mt-5 comic-panel bg-[#FCF9F4] p-5 sm:p-7 space-y-6"
    >
      {/* Header + Official Docs Button */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-2">
          <span className="comic-pill bg-[#EAB32E] px-3 py-0.5 text-xs font-mono font-bold">
            ၀၀ // FCM မိတ်ဆက်
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold leading-snug text-[#1C1917]">
            Firebase Cloud Messaging (FCM) ဆိုတာဘာလဲ?
          </h2>
        </div>

        <a
          href="https://firebase.google.com/docs/cloud-messaging"
          target="_blank"
          rel="noopener noreferrer"
          className="comic-btn bg-[#FCF9F4] hover:bg-[#EAB32E] text-[#1C1917] px-4 py-2 text-xs sm:text-sm font-bold flex items-center gap-2 shrink-0 self-start"
        >
          <span>Official Documentation ဖတ်ရန်</span>
          <ExternalLink className="w-4 h-4 shrink-0" />
        </a>
      </div>

      {/* What is FCM Explanation */}
      <p className="text-sm sm:text-base text-[#1C1917]/90 leading-[1.85] bg-[#F5EFE6] border-2 border-[#1C1917] rounded-xl p-4 sm:p-5">
        <strong>Firebase Cloud Messaging (FCM)</strong> ဆိုသည်မှာ Google Firebase မှ အခမဲ့ပေးထားသော
        Cross-Platform Messaging စနစ်တစ်ခု ဖြစ်ပါသည်။ မိမိ၏ Backend Server မှတစ်ဆင့် အသုံးပြုသူများ၏
        ဖုန်း သို့မဟုတ် Web Browser များဆီသို့ အချိန်နှင့်တစ်ပြေးညီ <strong>Push Notification</strong> များနှင့်
        Data Message များကို ယုံကြည်စိတ်ချစွာ ပေးပို့နိုင်ရန် အသုံးပြုပါသည်။
      </p>

      {/* Supported Platforms & Web Scope Note */}
      <div className="border-2 border-[#1C1917] rounded-xl p-4 sm:p-5 bg-[#FCF9F4] space-y-3.5">
        <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
          <Layers className="w-5 h-5 text-[#F26D21]" />
          <span>အသုံးပြုနိုင်သော Platform များနှင့် ဤလမ်းညွှန်၏ အဓိကဦးတည်ချက်</span>
        </div>

        {/* Platform Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {PLATFORMS.map((platform) => (
            <span
              key={platform.name}
              className={`px-3.5 py-1 rounded-full border-2 border-[#1C1917] text-xs sm:text-sm font-mono font-bold flex items-center gap-1.5 ${platform.active
                  ? 'bg-[#4C9F98] text-[#FCF9F4] shadow-[2px_2px_0px_#1C1917]'
                  : 'bg-[#F5EFE6] text-[#1C1917]/75'
                }`}
            >
              {platform.active && <Globe className="w-3.5 h-3.5" />}
              <span>{platform.name}</span>
            </span>
          ))}
        </div>

        <p className="text-sm sm:text-base text-[#1C1917]/85 leading-[2.5]">
          FCM ကို <strong>iOS+၊ Android၊ Web၊ Flutter၊ Unity နှင့် C++</strong> တို့လို Platform
          အစုံအလင်မှာ ထည့်သွင်းအသုံးပြုနိုင်ပါသည်။ သို့သော် ဤလမ်းညွှန်နှင့် Playground တွင်{' '}
          <span className="bg-[#EAB32E]/60 px-1.5 py-0.5 rounded font-bold">
            Web (Browser) တွင် အသုံးပြုသည့် နည်းလမ်း
          </span>{' '}
          နှင့် Node.js Admin SDK ချိတ်ဆက်ပုံကိုသာ အဓိကထား အသေးစိတ် ရှင်းပြပေးသွားပါမည်။
        </p>
      </div>

      {/* 3D Isometric Interactive Demo Flow */}
      <div className="space-y-2.5">
        <h3 className="font-bold text-base sm:text-lg">
          FCM Message ပေးပို့မှု စီးဆင်းပုံ (Interactive 3D Flow)
        </h3>
        <FcmFlowDiagram3D />
      </div>

      {/* Foreground vs Background Quick Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-2 border-[#1C1917] rounded-xl p-4 bg-[#7EA6E8]/20 space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
            <MonitorPlay className="w-4 h-4 text-[#1C1917]" />
            <span>Foreground (Website ဖွင့်ထားစဉ်)</span>
          </div>
          <p className="text-xs sm:text-sm text-[#1C1917]/85 leading-relaxed">
            User က ကိုယ့် Website Tab ကို လက်ရှိကြည့်နေချိန်တွင် ဝင်လာသော Notification ဖြစ်ပြီး
            React App ထဲမှ <code className="font-mono font-bold">onMessage()</code> ဖြင့် တိုက်ရိုက်ဖမ်းယူပါသည်။
          </p>
        </div>

        <div className="border-2 border-[#1C1917] rounded-xl p-4 bg-[#F28EB2]/25 space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
            <EyeOff className="w-4 h-4 text-[#1C1917]" />
            <span>Background (Tab ပိတ်ထားစဉ်)</span>
          </div>
          <p className="text-xs sm:text-sm text-[#1C1917]/85 leading-relaxed">
            Website Tab ကို ပိတ်ထားချိန် (Browser ဖွင့်ထားသရွေ့) ဝင်လာသော Notification ဖြစ်ပြီး{' '}
            <code className="font-mono font-bold">firebase-messaging-sw.js</code> Service Worker မှ ဖမ်းယူပြသပေးပါသည်။
          </p>
        </div>
      </div>
    </article>
  );
}