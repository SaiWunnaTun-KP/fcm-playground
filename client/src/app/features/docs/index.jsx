import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  ArrowUpRight,
  Lightbulb,
  AlertTriangle,
  ExternalLink,
  Terminal,
  Copy,
  Check,
} from 'lucide-react';
import { DOC_SECTIONS } from './data/docsData';
import DocsOverview from './components/DocsOverview';
import DocsSidebar from './components/DocsSidebar';
import CodeBlock from './components/CodeBlock';

function TipBox({ title, text, className = '' }) {
  return (
    <div
      className={`bg-[#7EA6E8]/25 border-2 border-[#1C1917] rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm ${className}`}
    >
      <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-[#1C1917] shrink-0 mt-0.5" />
      <p className="leading-relaxed min-w-0 break-words">
        {title && <strong className="font-bold">{title} — </strong>}
        <span>{text}</span>
      </p>
    </div>
  );
}

function CommandSnippet({ command }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy command:', err);
    }
  };

  return (
    <div className="mt-2.5 w-full max-w-full border-2 border-[#1C1917] rounded-xl bg-[#1C1917] text-[#FCF9F4] px-3 sm:px-3.5 py-2.5 flex items-center justify-between gap-2.5 overflow-hidden">
      <div className="flex items-center gap-2 flex-1 min-w-0 font-mono text-xs sm:text-[13px] overflow-x-auto">
        <Terminal className="w-4 h-4 text-[#EAB32E] shrink-0" />
        <code className="whitespace-nowrap text-[#F5EFE6]">{command}</code>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold border border-[#FCF9F4]/30 bg-[#292524] hover:bg-[#EAB32E] hover:text-[#1C1917] hover:border-[#1C1917] transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-[#4C9F98]" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}

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
    <div className="w-full space-y-4 sm:space-y-5">
      {/* Top Intro Banner */}
      <div className="comic-panel bg-[#FCF9F4] p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <span className="comic-pill bg-[#EAB32E] px-3 py-0.5 text-[11px] sm:text-xs font-mono font-bold">
            STEP-BY-STEP GUIDE
          </span>
          <h1 className="font-display text-xl sm:text-3xl lg:text-4xl uppercase tracking-tight mt-2 break-words">
            FCM SETUP DOCUMENTATION
          </h1>
          <p className="text-sm sm:text-base text-[#1C1917]/80 mt-1">
            Client Side (Browser) နှင့် Server Side (Admin SDK) တို့ကို အဆင့်ဆင့် ချိတ်ဆက်ပြင်ဆင်ပုံ
          </p>
        </div>

        <Link
          to="/live-test"
          className="comic-btn bg-[#F26D21] text-[#FCF9F4] px-4 py-2.5 text-sm font-bold flex items-center justify-center gap-2 w-full sm:w-auto shrink-0"
        >
          <Zap className="w-4 h-4 shrink-0" />
          <span>Live Test သွားရန်</span>
          <ArrowUpRight className="w-4 h-4 shrink-0" />
        </Link>
      </div>

      {/* Main 2-Column Layout: Sticky Sidebar + Content */}
      <div className="w-full flex flex-col lg:flex-row gap-5 lg:items-start">
        <DocsSidebar
          sections={DOC_SECTIONS}
          activeStepId={activeStepId}
          onSelectStep={handleSelectStep}
        />

        {/* Right Content Area */}
        <div className="w-full flex-1 min-w-0 space-y-6 sm:space-y-8">
          <DocsOverview />

          {DOC_SECTIONS.map((group) => (
            <section key={group.groupId} className="w-full space-y-4">
              <div className="comic-panel bg-[#1C1917] text-[#FCF9F4] px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-bold text-sm sm:text-lg">{group.groupTitle}</h2>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-mono font-bold border border-[#FCF9F4]/30 ${group.badgeColor}`}
                >
                  {group.comingSoon ? 'COMING SOON' : `${group.steps.length} STEPS`}
                </span>
              </div>

              {group.comingSoon ? (
                <div className="comic-panel bg-[#FCF9F4] comic-halftone p-4 sm:p-8">
                  <div className="bg-[#FCF9F4] border-2 border-[#1C1917] rounded-2xl p-5 sm:p-6 text-center max-w-xl mx-auto space-y-3">
                    <span className="comic-pill bg-[#EAB32E] px-3.5 py-1 text-xs font-mono font-bold inline-block">
                      WORK IN PROGRESS
                    </span>
                    <h3 className="font-display text-xl sm:text-3xl uppercase tracking-tight">
                      COMING SOON
                    </h3>
                    <p className="text-sm sm:text-base text-[#1C1917]/80 leading-relaxed">
                      {group.comingSoonDesc}
                    </p>
                  </div>
                </div>
              ) : (
                group.steps.map((step) => (
                  <article
                    key={step.id}
                    id={step.id}
                    className="scroll-mt-5 w-full comic-panel bg-[#FCF9F4] p-4 sm:p-6 space-y-4 overflow-hidden"
                  >
                    {/* Step Header */}
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pb-1">
                      <div className="inline-flex items-center gap-2 bg-[#EAB32E] border-2 border-[#1C1917] rounded-xl px-2.5 sm:px-3 py-1 shadow-[2px_2px_0px_#1C1917] shrink-0">
                        <span className="text-xs sm:text-sm font-bold text-[#1C1917] leading-normal">
                          အဆင့်
                        </span>
                        <span className="bg-[#1C1917] text-[#FCF9F4] text-xs sm:text-sm font-bold px-2 py-0.5 rounded-lg leading-normal">
                          {step.number}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-xl font-extrabold text-[#1C1917] leading-snug">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-[#1C1917]/90 leading-relaxed bg-[#F5EFE6] border-2 border-[#1C1917]/20 rounded-xl p-3 sm:p-3.5">
                      {step.summary}
                    </p>

                    {/* Sub-steps List */}
                    <ol className="space-y-5 min-w-0">
                      {step.bullets.map((bullet, idx) => {
                        const isObject = typeof bullet === 'object';
                        const text = isObject ? bullet.text : bullet;
                        const badgeLabel = isObject && bullet.subNumber ? bullet.subNumber : idx + 1;

                        return (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 sm:gap-3 text-sm sm:text-base min-w-0"
                          >
                            <span className="px-2 py-0.5 min-w-[2.1rem] rounded-full bg-[#F26D21] text-[#FCF9F4] border-2 border-[#1C1917] text-xs font-bold text-center shrink-0 mt-0.5">
                              {badgeLabel}
                            </span>

                            <div className="flex-1 min-w-0 pt-0.5">
                              <p className="leading-relaxed break-words">
                                <span>{text}</span>
                                {isObject && bullet.linkUrl && (
                                  <a
                                    href={bullet.linkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 font-mono text-xs sm:text-sm font-bold text-[#1C1917] bg-[#EAB32E]/60 hover:bg-[#EAB32E] px-2 py-0.5 rounded border border-[#1C1917] transition-colors break-all max-w-full mt-1 sm:mt-0"
                                  >
                                    <span>{bullet.linkText || bullet.linkUrl}</span>
                                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                                  </a>
                                )}
                              </p>

                              {isObject && bullet.command && (
                                <CommandSnippet command={bullet.command} />
                              )}

                              {isObject && bullet.code && (
                                <CodeBlock fileName={bullet.codeFile} code={bullet.code} />
                              )}

                              {isObject && bullet.tips && bullet.tips.length > 0 && (
                                <div className="mt-3 space-y-2.5">
                                  {bullet.tips.map((tipItem, tipIdx) => (
                                    <TipBox
                                      key={tipIdx}
                                      title={tipItem.title}
                                      text={tipItem.text}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ol>

                    {/* Retro-Comic Browser Frame for Screenshot */}
                    {step.image && (
                      <figure className="mt-4 w-full max-w-xl mx-auto border-2 border-[#1C1917] rounded-xl overflow-hidden bg-[#1C1917]">
                        <div className="bg-[#292524] border-b-2 border-[#1C1917] px-3.5 py-2 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#F26D21] border border-[#1C1917]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#EAB32E] border border-[#1C1917]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#4C9F98] border border-[#1C1917]" />
                          </div>
                          <span className="font-mono text-[10px] sm:text-[11px] text-[#F5EFE6]/70 truncate">
                            console.firebase.google.com
                          </span>
                          <div className="w-6 sm:w-8" />
                        </div>

                        <img
                          src={step.image.src}
                          alt={step.image.alt}
                          className="w-full h-auto block object-cover"
                        />

                        {step.image.caption && (
                          <figcaption className="bg-[#F5EFE6] text-[#1C1917] border-t-2 border-[#1C1917] px-3.5 py-2 text-xs sm:text-sm font-medium text-center">
                            {step.image.caption}
                          </figcaption>
                        )}
                      </figure>
                    )}

                    {step.code && <CodeBlock fileName={step.codeFile} code={step.code} />}

                    {step.tip && <TipBox text={step.tip} />}

                    {step.warning && (
                      <div className="bg-[#F28EB2]/35 border-2 border-[#1C1917] rounded-xl p-3.5 flex items-start gap-3 text-xs sm:text-sm font-medium">
                        <AlertTriangle className="w-5 h-5 text-[#F26D21] shrink-0 mt-0.5" />
                        <p className="leading-relaxed">{step.warning}</p>
                      </div>
                    )}
                  </article>
                ))
              )}
            </section>
          ))}

          {/* Bottom Completion CTA */}
          <div className="comic-panel bg-[#4C9F98] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-[#FCF9F4] space-y-1">
              <h3 className="text-lg sm:text-xl font-bold">အဆင့်အားလုံး ပြင်ဆင်ပြီးပြီလား?</h3>
              <p className="text-xs sm:text-sm text-[#FCF9F4]/90">
                ရရှိလာသော firebaseConfig၊ VAPID Key နှင့် Service Account JSON တို့ဖြင့် Live Test စမ်းသပ်နိုင်ပါပြီ။
              </p>
            </div>
            <Link
              to="/live-test"
              className="comic-btn bg-[#EAB32E] text-[#1C1917] px-5 py-3 font-bold text-sm sm:text-base flex items-center justify-center gap-2 w-full sm:w-auto shrink-0"
            >
              <Zap className="w-5 h-5 shrink-0" />
              <span>Live Test စမ်းရန်</span>
              <ArrowUpRight className="w-5 h-5 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}