import { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const FLOW_STEPS = [
  {
    step: 1,
    title: '၁။ Server မှ Google FCM ဆီသို့ ပို့လွှတ်ခြင်း',
    description:
      'Express Server (firebase-admin) က Service Account Key ဖြင့် အတည်ပြုပြီး Target Token / Topic နှင့် Message Payload ကို Google FCM Backend ဆီ လှမ်းပို့ပါသည်။',
  },
  {
    step: 2,
    title: '၂။ Google FCM မှ စစ်ဆေးပြီး Browser ဆီ လမ်းကြောင်းပေးခြင်း',
    description:
      'Google FCM Server က Token မှန်/မမှန် စစ်ဆေးပြီး သက်ဆိုင်ရာ User ၏ Browser (Push Service) ဆီသို့ Message ကို ထပ်ဆင့် ပို့ဆောင်ပေးပါသည်။',
  },
  {
    step: 3,
    title: '၃။ Client Browser တွင် Notification လက်ခံရရှိခြင်း',
    description:
      'App ဖွင့်ထားလျှင် onMessage() မှ ဖမ်းယူပြီး၊ Tab ပိတ်ထားလျှင် Service Worker (onBackgroundMessage) မှ ဖမ်းယူ၍ မျက်နှာပြင်ပေါ်တွင် Banner ပြသပေးပါသည်။',
  },
];

export default function FcmFlowDiagram3D() {
  const [flowState, setFlowState] = useState({ step: 1, progress: 0 });
  const [isPlaying, setIsPlaying] = useState(true);

  const { step: activeStep, progress } = flowState;

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setFlowState((prev) => {
        if (prev.progress >= 100) {
          const nextStep = prev.step >= 3 ? 1 : prev.step + 1;
          return { step: nextStep, progress: 0 };
        }
        return { step: prev.step, progress: prev.progress + 4 };
      });
    }, 65);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSelectStep = (stepNum) => {
    setIsPlaying(false);
    setFlowState({ step: stepNum, progress: 100 });
  };

  const p1 = progress / 100;
  const packet1X = 198 + (356 - 198) * p1;
  const packet1Y = 152 + (202 - 152) * p1;

  const packet2X = 484 + (642 - 484) * p1;
  const packet2Y = 202 + (152 - 202) * p1;

  const currentInfo =
    FLOW_STEPS.find((item) => item.step === activeStep) || FLOW_STEPS[0];

  return (
    <div className="w-full max-w-full border-2 border-[#1C1917] rounded-2xl overflow-hidden bg-[#1C1917] text-[#FCF9F4]">
      {/* Top Control Header */}
      <div className="bg-[#292524] border-b-2 border-[#1C1917] px-3.5 sm:px-4 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2">
        <span className="px-3 py-1 rounded-full bg-[#EAB32E] text-[#1C1917] text-xs sm:text-sm font-bold">
          Message ဖြတ်သန်းစီးဆင်းပုံ နမူနာ
        </span>

        <button
          type="button"
          onClick={() => setIsPlaying((prev) => !prev)}
          className="px-3 py-1 rounded-full text-xs font-mono font-bold border border-[#FCF9F4]/30 bg-[#1C1917] hover:bg-[#FCF9F4]/15 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-[#EAB32E]" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-[#4C9F98]" />
              <span>Auto Play</span>
            </>
          )}
        </button>
      </div>

      {/* 2.5D Isometric Vector Canvas */}
      <div className="relative w-full bg-[#181615] overflow-hidden">
        <svg
          viewBox="0 0 840 330"
          className="w-full h-auto block select-none"
          role="img"
          aria-label="3D Isometric diagram showing FCM message delivery from Express Server to Google FCM and Client Browser"
        >
          <defs>
            <pattern
              id="isoGrid"
              width="48"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 48 12 L 24 24 L 0 12 Z"
                fill="none"
                stroke="#FCF9F4"
                strokeOpacity="0.06"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <rect width="840" height="330" fill="url(#isoGrid)" />

          {/* Track 1: Express Server -> Google FCM */}
          <line
            x1="198"
            y1="152"
            x2="356"
            y2="202"
            stroke={activeStep === 1 ? '#F26D21' : '#78716C'}
            strokeWidth={activeStep === 1 ? '4' : '2.5'}
            strokeDasharray="7 6"
          />

          {/* Track 2: Google FCM -> Client Browser */}
          <line
            x1="484"
            y1="202"
            x2="642"
            y2="152"
            stroke={activeStep === 2 ? '#EAB32E' : '#78716C'}
            strokeWidth={activeStep === 2 ? '4' : '2.5'}
            strokeDasharray="7 6"
          />

          {/* NODE 1: EXPRESS SERVER */}
          <g onClick={() => handleSelectStep(1)} className="cursor-pointer">
            <polygon
              points="140,178 206,145 140,112 74,145"
              fill="#000000"
              opacity="0.45"
              transform="translate(0, 32)"
            />
            <polygon
              points="82,126 140,155 140,203 82,174"
              fill="#3A827C"
              stroke="#1C1917"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <polygon
              points="140,155 198,126 198,174 140,203"
              fill="#2B635E"
              stroke="#1C1917"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <polygon
              points="140,97 198,126 140,155 82,126"
              fill={activeStep === 1 ? '#5EC2B9' : '#4C9F98'}
              stroke="#1C1917"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <line
              x1="94"
              y1="146"
              x2="128"
              y2="163"
              stroke="#FCF9F4"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="94"
              y1="158"
              x2="128"
              y2="175"
              stroke="#FCF9F4"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <text
              x="140"
              y="131"
              textAnchor="middle"
              fill="#1C1917"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="bold"
              fontSize="14"
            >
              {'{ API }'}
            </text>

            <rect
              x="54"
              y="222"
              width="172"
              height="32"
              rx="16"
              fill={activeStep === 1 ? '#4C9F98' : '#292524'}
              stroke="#FCF9F4"
              strokeOpacity="0.4"
              strokeWidth="1.5"
            />
            <text
              x="140"
              y="243"
              textAnchor="middle"
              fill="#FCF9F4"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="bold"
              fontSize="13"
            >
              1. EXPRESS SERVER
            </text>
          </g>

          {/* NODE 2: GOOGLE FCM BACKEND */}
          <g onClick={() => handleSelectStep(2)} className="cursor-pointer">
            <polygon
              points="420,228 492,192 420,156 348,192"
              fill="#000000"
              opacity="0.45"
              transform="translate(0, 34)"
            />
            <polygon
              points="356,176 420,208 420,256 356,224"
              fill="#C99318"
              stroke="#1C1917"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <polygon
              points="420,208 484,176 484,224 420,256"
              fill="#A6760E"
              stroke="#1C1917"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <polygon
              points="420,144 484,176 420,208 356,176"
              fill={activeStep === 2 ? '#FACC15' : '#EAB32E'}
              stroke="#1C1917"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <text
              x="420"
              y="181"
              textAnchor="middle"
              fill="#1C1917"
              fontFamily="Archivo Black, sans-serif"
              fontSize="14"
            >
              FCM HUB
            </text>

            <rect
              x="330"
              y="275"
              width="180"
              height="32"
              rx="16"
              fill={activeStep === 2 ? '#EAB32E' : '#292524'}
              stroke="#FCF9F4"
              strokeOpacity="0.4"
              strokeWidth="1.5"
            />
            <text
              x="420"
              y="296"
              textAnchor="middle"
              fill={activeStep === 2 ? '#1C1917' : '#FCF9F4'}
              fontFamily="JetBrains Mono, monospace"
              fontWeight="bold"
              fontSize="13"
            >
              2. GOOGLE FCM CLOUD
            </text>
          </g>

          {/* NODE 3: CLIENT BROWSER */}
          <g onClick={() => handleSelectStep(3)} className="cursor-pointer">
            <polygon
              points="700,178 766,145 700,112 634,145"
              fill="#000000"
              opacity="0.45"
              transform="translate(0, 32)"
            />
            <polygon
              points="642,126 700,155 700,203 642,174"
              fill="#5D87CC"
              stroke="#1C1917"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <polygon
              points="700,155 758,126 758,174 700,203"
              fill="#466BA8"
              stroke="#1C1917"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <polygon
              points="700,97 758,126 700,155 642,126"
              fill={activeStep === 3 ? '#93B8F5' : '#7EA6E8'}
              stroke="#1C1917"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <circle cx="686" cy="122" r="3" fill="#F26D21" />
            <circle cx="696" cy="127" r="3" fill="#EAB32E" />
            <circle cx="706" cy="132" r="3" fill="#4C9F98" />

            {/* Pop-up Notification Toast */}
            {activeStep === 3 && (
              <g>
                <rect
                  x="612"
                  y="28"
                  width="176"
                  height="48"
                  rx="10"
                  fill="#F26D21"
                  stroke="#FCF9F4"
                  strokeWidth="2"
                />
                <polygon
                  points="694,76 706,76 700,86"
                  fill="#F26D21"
                  stroke="#FCF9F4"
                  strokeWidth="1.5"
                />
                <text
                  x="700"
                  y="49"
                  textAnchor="middle"
                  fill="#FCF9F4"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="bold"
                  fontSize="12"
                >
                  NEW PUSH NOTI!
                </text>
                <text
                  x="700"
                  y="66"
                  textAnchor="middle"
                  fill="#FCF9F4"
                  fontFamily="Noto Sans Myanmar, sans-serif"
                  fontSize="11"
                >
                  Banner တက်လာပါပြီ
                </text>
              </g>
            )}

            <rect
              x="614"
              y="222"
              width="172"
              height="32"
              rx="16"
              fill={activeStep === 3 ? '#7EA6E8' : '#292524'}
              stroke="#FCF9F4"
              strokeOpacity="0.4"
              strokeWidth="1.5"
            />
            <text
              x="700"
              y="243"
              textAnchor="middle"
              fill={activeStep === 3 ? '#1C1917' : '#FCF9F4'}
              fontFamily="JetBrains Mono, monospace"
              fontWeight="bold"
              fontSize="13"
            >
              3. CLIENT BROWSER
            </text>
          </g>

          {/* ANIMATED TRAVELING PACKETS */}
          {activeStep === 1 && (
            <g>
              <circle cx={packet1X} cy={packet1Y} r="12" fill="#F26D21" opacity="0.35" />
              <circle
                cx={packet1X}
                cy={packet1Y}
                r="7"
                fill="#F26D21"
                stroke="#FCF9F4"
                strokeWidth="2"
              />
            </g>
          )}

          {activeStep === 2 && (
            <g>
              <circle cx={packet2X} cy={packet2Y} r="12" fill="#EAB32E" opacity="0.35" />
              <circle
                cx={packet2X}
                cy={packet2Y}
                r="7"
                fill="#EAB32E"
                stroke="#1C1917"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Bottom Step Switcher & Live Narration */}
      <div className="bg-[#292524] border-t-2 border-[#1C1917] p-3.5 sm:p-5 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleSelectStep(num)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold border transition-colors cursor-pointer ${
                activeStep === num
                  ? 'bg-[#EAB32E] text-[#1C1917] border-[#1C1917]'
                  : 'bg-[#1C1917] text-[#FCF9F4]/75 border-[#FCF9F4]/20 hover:border-[#FCF9F4]/50'
              }`}
            >
              STEP 0{num}
            </button>
          ))}
        </div>

        <div className="space-y-1">
          <h4 className="font-bold text-sm sm:text-base text-[#EAB32E]">
            {currentInfo.title}
          </h4>
          <p className="text-xs sm:text-sm text-[#F5EFE6]/90 leading-relaxed">
            {currentInfo.description}
          </p>
        </div>
      </div>
    </div>
  );
}