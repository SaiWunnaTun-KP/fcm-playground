import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowUpRight, Lightbulb, AlertTriangle } from 'lucide-react';
import { DOC_SECTIONS } from './data/docsData';
import DocsOverview from './components/DocsOverview';
import DocsSidebar from './components/DocsSidebar';
import CodeBlock from './components/CodeBlock';

export default function DocsPage() {
  const allSectionIds = ['overview', ...DOC_SECTIONS.flatMap((g) => g.steps.map((s) => s.id))];
  const [activeStepId, setActiveStepId] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 170;
      let currentId = 'overview';

      for (const id of allSectionIds) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= scrollPosition) {
          currentId = id;
        }
      }

      setActiveStepId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectStep = (id) => {
    setActiveStepId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Intro Banner */}
      <div className="comic-panel bg-[#FCF9F4] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          {/* <span className="comic-pill bg-[#EAB32E] px-3 py-0.5 text-xs font-mono font-bold">
            STEP-BY-STEP GUIDE
          </span> */}
          <h1 className="font-display text-2xl sm:text-4xl uppercase tracking-tight mt-2">
            FCM SETUP DOCUMENTATION
          </h1>
          <p className="text-sm sm:text-base text-[#1C1917]/80 mt-1">
            Client Side (Browser) နှင့် Server Side (Admin SDK) တို့ကို အဆင့် (၆) ဆင့်ဖြင့် ချိတ်ဆက်ပြင်ဆင်ပုံ
          </p>
        </div>

        <Link
          to="/live-test"
          className="comic-btn bg-[#F26D21] text-[#FCF9F4] px-4 py-2.5 text-sm font-bold flex items-center gap-2 self-start sm:self-center shrink-0"
        >
          <Zap className="w-4 h-4" />
          <span>Live Test သွားရန်</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Main 2-Column Layout: Sticky Sidebar + Content */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        <DocsSidebar
          sections={DOC_SECTIONS}
          activeStepId={activeStepId}
          onSelectStep={handleSelectStep}
        />

        {/* Right Content Area */}
        <div className="flex-1 min-w-0 space-y-8">
          {/* 00. FCM Overview + 3D Isometric Flow Demo */}
          <DocsOverview />

          {/* Setup Step Groups */}
          {DOC_SECTIONS.map((group) => (
            <section key={group.groupId} className="space-y-4">
              <div className="comic-panel bg-[#1C1917] text-[#FCF9F4] px-5 py-3 flex items-center justify-between">
                <h2 className="font-bold text-base sm:text-lg">{group.groupTitle}</h2>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border border-[#FCF9F4]/30 ${group.badgeColor}`}
                >
                  {group.steps.length} STEPS
                </span>
              </div>

              {group.steps.map((step) => (
                <article
                  key={step.id}
                  id={step.id}
                  className="scroll-mt-5 comic-panel bg-[#FCF9F4] p-5 sm:p-6 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-display text-sm sm:text-base bg-[#EAB32E] border-2 border-[#1C1917] rounded-xl px-3 py-1 shrink-0">
                      STEP {step.number}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold leading-snug pt-0.5">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-[#1C1917]/90 leading-relaxed bg-[#F5EFE6] border-2 border-[#1C1917]/20 rounded-xl p-3.5">
                    {step.summary}
                  </p>

                  <ul className="space-y-2.5 pl-1">
                    {step.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm sm:text-base leading-relaxed"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#F26D21] border border-[#1C1917] mt-2.5 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {step.code && <CodeBlock fileName={step.codeFile} code={step.code} />}

                  {step.tip && (
                    <div className="bg-[#7EA6E8]/25 border-2 border-[#1C1917] rounded-xl p-3.5 flex items-start gap-3 text-sm">
                      <Lightbulb className="w-5 h-5 text-[#1C1917] shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{step.tip}</p>
                    </div>
                  )}

                  {step.warning && (
                    <div className="bg-[#F28EB2]/35 border-2 border-[#1C1917] rounded-xl p-3.5 flex items-start gap-3 text-sm font-medium">
                      <AlertTriangle className="w-5 h-5 text-[#F26D21] shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{step.warning}</p>
                    </div>
                  )}
                </article>
              ))}
            </section>
          ))}

          {/* Bottom Completion CTA */}
          <div className="comic-panel bg-[#4C9F98] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-[#FCF9F4] space-y-1">
              <h3 className="text-xl font-bold">အဆင့် (၆) ဆင့်လုံး ပြင်ဆင်ပြီးပြီလား?</h3>
              <p className="text-sm text-[#FCF9F4]/90">
                ရရှိလာသော firebaseConfig၊ VAPID Key နှင့် Service Account JSON တို့ဖြင့် Live Test စမ်းသပ်နိုင်ပါပြီ။
              </p>
            </div>
            <Link
              to="/live-test"
              className="comic-btn bg-[#EAB32E] text-[#1C1917] px-5 py-3 font-bold text-sm sm:text-base flex items-center gap-2 shrink-0 self-start sm:self-center"
            >
              <Zap className="w-5 h-5" />
              <span>Live Test စမ်းရန်</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}