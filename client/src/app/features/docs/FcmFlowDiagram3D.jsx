import { useState, useEffect } from 'react';
import { Play, RotateCcw, Send, Pause } from 'lucide-react';

const FLOW_STEPS = [
  {
    step: 0,
    label: 'READY',
    title: 'အသင့်အနေအထား (Idle)',
    description:
      'Express Server မှ Admin SDK ကို အသုံးပြု၍ Notification ပို့ရန် အသင့်ဖြစ်နေပါသည်။ "Send Demo Push" ကို နှိပ်ကြည့်ပါ။',
  },
  {
    step: 1,
    label: 'HOP 01',
    title: '၁။ Server မှ Google FCM ဆီသို့ ပို့လွှတ်ခြင်း',
    description:
      'Express Server (firebase-admin) က Service Account Key ဖြင့် အတည်ပြုပြီး Target Token / Topic နှင့် Message Payload ကို Google FCM Backend ဆီ လှမ်းပို့ပါသည်။',
  },
  {
    step: 2,
    label: 'HOP 02',
    title: '၂။ Google FCM မှ စစ်ဆေးပြီး Browser ဆီ လမ်းကြောင်းပေးခြင်း',
    description:
      'Google FCM Server က Token မှန်/မမှန် စစ်ဆေးပြီး သက်ဆိုင်ရာ User ၏ Browser (Push Service) ဆီသို့ Message ကို ထပ်ဆင့် ပို့ဆောင်ပေးပါသည်။',
  },
  {
    step: 3,
    label: 'DELIVERED',
    title: '၃။ Client Browser တွင် Notification လက်ခံရရှိခြင်း',
    description:
      'App ဖွင့်ထားလျှင် onMessage() မှ ဖမ်းယူပြီး၊ Tab ပိတ်ထားလျှင် Service Worker (onBackgroundMessage) မှ ဖမ်းယူ၍ မျက်နှာပြင်ပေါ်တွင် Banner ပြသပေးပါသည်။',
  },
];

export default function FcmFlowDiagram3D() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 100 along current hop

  // Auto-play animation loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((current) => (current >= 3 ? 1 : current + 1));
          return 0;
        }
        return prev + 4;
      });
    }, 65);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleTriggerDemo = () => {
    setActiveStep(1);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleSelectStep = (stepNum) => {
    setIsPlaying(false);
    setActiveStep(stepNum);
    setProgress(100);
  };

  // Hop 1 Line: Express Server (198, 152) -> Google FCM (356, 202)
  const p1 = progress / 100;
  const packet1X = 198 + (356 - 198) * p1;
  const packet1Y = 152 + (202 - 152) * p1;

  // Hop 2 Line: Google FCM (484, 202) -> Client Browser (642, 152)
  const packet2X = 484 + (642 - 484) * p1;
  const packet2Y = 202 + (152 - 202) * p1;

  const currentInfo = FLOW_STEPS[activeStep] || FLOW_STEPS[0];

  return (
    <div className="border-2 border-[#1C1917] rounded-2xl overflow-hidden bg-[#1C1917] text-[#FCF9F4]">
      {/* Top Control Header */}
      <div className="bg-[#292524] border-b-2 border-[#1C1917] px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#EAB32E] text-[#1C1917] font-mono text-xs font-bold">
            3D ARCHITECTURE DEMO
          </span>
          <span className="text-xs sm:text-sm font-medium text-[#F5EFE6]/90">
            Message ဖြတ်သန်းစီးဆင်းပုံ နမူနာ
          </span>
        </div>

        {/* Interactive Demo Buttons */}
        <div className="flex items-center gap-2">
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

          <button
            type="button"
            onClick={handleTriggerDemo}
            className="px-3.5 py-1 rounded-full text-xs font-mono font-bold border border-[#1C1917] bg-[#F26D21] text-[#FCF9F4] hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {activeStep === 3 && !isPlaying ? (
              <>
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Flow</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Send Demo Push</span>
              </>
            )}
          </button>
        </div>
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
            {/* Isometric Diamond Grid Pattern */}
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

          {/* Background Isometric Grid */}
          <rect width="840" height="330" fill="url(#isoGrid)" />

          {/* ================= CONNECTION TRACKS ================= */}
          {/* Track 1: Express Server -> Google FCM */}
          <line
            x1="198"
            y1="152"
            x2="356"
            y2="202"
            stroke={activeStep === 1 ? '#F26D21' : '#78716C'}
            strokeWidth={activeStep === 1 ? '3.5' : '2.5'}
            strokeDasharray="7 6"
          />

          {/* Track 2: Google FCM -> Client Browser */}
          <line
            x1="484"
            y1="202"
            x2="642"
            y2="152"
            stroke={activeStep === 2 ? '#EAB32E' : '#78716C'}
            strokeWidth={activeStep === 2 ? '3.5' : '2.5'}
            strokeDasharray="7 6"
          />

          {/* ================= NODE 1: EXPRESS SERVER (3D CUBE) ================= */}
          <g
            onClick={() => handleSelectStep(1)}
            className="cursor-pointer transition-transform"
          >
            {/* Ground Shadow */}
            <polygon
              points="140,178 206,145 140,112 74,145"
              fill="#000000"
              opacity="0.45"
              transform="translate(0, 32)"
            />
            {/* Left Face */}
            <polygon
              points="82,126 140,155 140,203 82,174"
              fill="#3A827C"
              stroke="#1C1917"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Right Face */}
            <polygon
              points="140,155 198,126 198,174 140,203"
              fill="#2B635E"
              stroke="#1C1917"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Top Face */}
            <polygon
              points="140,97 198,126 140,155 82,126"
              fill={activeStep === 1 ? '#5EC2B9' : '#4C9F98'}
              stroke="#1C1917"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Isometric Server Rack Slots on Left Face */}
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
            {/* Top Face Code Symbol */}
            <text
              x="140"
              y="131"
              textAnchor="middle"
              fill="#1C1917"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="bold"
              fontSize="13"
            >
              {'{ API }'}
            </text>

            {/* Label Pill */}
            <rect
              x="66"
              y="222"
              width="148"
              height="28"
              rx="14"
              fill={activeStep === 1 ? '#4C9F98' : '#292524'}
              stroke="#FCF9F4"
              strokeOpacity="0.4"
              strokeWidth="1.5"
            />
            <text
              x="140"
              y="240"
              textAnchor="middle"
              fill="#FCF9F4"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="bold"
              fontSize="11"
            >
              1. EXPRESS SERVER
            </text>
          </g>

          {/* ================= NODE 2: GOOGLE FCM BACKEND (3D HUB) ================= */}
          <g
            onClick={() => handleSelectStep(2)}
            className="cursor-pointer"
          >
            {/* Ground Shadow */}
            <polygon
              points="420,228 492,192 420,156 348,192"
              fill="#000000"
              opacity="0.45"
              transform="translate(0, 34)"
            />
            {/* Left Face */}
            <polygon
              points="356,176 420,208 420,256 356,224"
              fill="#C99318"
              stroke="#1C1917"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Right Face */}
            <polygon
              points="420,208 484,176 484,224 420,256"
              fill="#A6760E"
              stroke="#1C1917"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Top Face */}
            <polygon
              points="420,144 484,176 420,208 356,176"
              fill={activeStep === 2 ? '#FACC15' : '#EAB32E'}
              stroke="#1C1917"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Center Cloud/Bolt Icon on Top Face */}
            <text
              x="420"
              y="181"
              textAnchor="middle"
              fill="#1C1917"
              fontFamily="Archivo Black, sans-serif"
              fontSize="13"
            >
              FCM HUB
            </text>

            {/* Label Pill */}
            <rect
              x="342"
              y="275"
              width="156"
              height="28"
              rx="14"
              fill={activeStep === 2 ? '#EAB32E' : '#292524'}
              stroke="#FCF9F4"
              strokeOpacity="0.4"
              strokeWidth="1.5"
            />
            <text
              x="420"
              y="293"
              textAnchor="middle"
              fill={activeStep === 2 ? '#1C1917' : '#FCF9F4'}
              fontFamily="JetBrains Mono, monospace"
              fontWeight="bold"
              fontSize="11"
            >
              2. GOOGLE FCM CLOUD
            </text>
          </g>

          {/* ================= NODE 3: CLIENT BROWSER (3D BLOCK) ================= */}
          <g
            onClick={() => handleSelectStep(3)}
            className="cursor-pointer"
          >
            {/* Ground Shadow */}
            <polygon
              points="700,178 766,145 700,112 634,145"
              fill="#000000"
              opacity="0.45"
              transform="translate(0, 32)"
            />
            {/* Left Face */}
            <polygon
              points="642,126 700,155 700,203 642,174"
              fill="#5D87CC"
              stroke="#1C1917"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Right Face */}
            <polygon
              points="700,155 758,126 758,174 700,203"
              fill="#466BA8"
              stroke="#1C1917"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Top Face */}
            <polygon
              points="700,97 758,126 700,155 642,126"
              fill={activeStep === 3 ? '#93B8F5' : '#7EA6E8'}
              stroke="#1C1917"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Browser Window Dots on Top Face */}
            <circle cx="686" cy="122" r="3" fill="#F26D21" />
            <circle cx="696" cy="127" r="3" fill="#EAB32E" />
            <circle cx="706" cy="132" r="3" fill="#4C9F98" />

            {/* Pop-up Notification Toast above Browser when Step 3 is Active */}
            {activeStep === 3 && (
              <g>
                <rect
                  x="622"
                  y="32"
                  width="156"
                  height="44"
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
                  y="51"
                  textAnchor="middle"
                  fill="#FCF9F4"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="bold"
                  fontSize="11"
                >
                  NEW PUSH NOTI!
                </text>
                <text
                  x="700"
                  y="66"
                  textAnchor="middle"
                  fill="#FCF9F4"
                  fontFamily="Noto Sans Myanmar, sans-serif"
                  fontSize="10"
                >
                  Banner တက်လာပါပြီ
                </text>
              </g>
            )}

            {/* Label Pill */}
            <rect
              x="626"
              y="222"
              width="148"
              height="28"
              rx="14"
              fill={activeStep === 3 ? '#7EA6E8' : '#292524'}
              stroke="#FCF9F4"
              strokeOpacity="0.4"
              strokeWidth="1.5"
            />
            <text
              x="700"
              y="240"
              textAnchor="middle"
              fill={activeStep === 3 ? '#1C1917' : '#FCF9F4'}
              fontFamily="JetBrains Mono, monospace"
              fontWeight="bold"
              fontSize="11"
            >
              3. CLIENT BROWSER
            </text>
          </g>

          {/* ================= ANIMATED TRAVELING PACKETS ================= */}
          {activeStep === 1 && (
            <g>
              <circle
                cx={packet1X}
                cy={packet1Y}
                r="11"
                fill="#F26D21"
                opacity="0.35"
              />
              <circle
                cx={packet1X}
                cy={packet1Y}
                r="6.5"
                fill="#F26D21"
                stroke="#FCF9F4"
                strokeWidth="2"
              />
            </g>
          )}

          {activeStep === 2 && (
            <g>
              <circle
                cx={packet2X}
                cy={packet2Y}
                r="11"
                fill="#EAB32E"
                opacity="0.35"
              />
              <circle
                cx={packet2X}
                cy={packet2Y}
                r="6.5"
                fill="#EAB32E"
                stroke="#1C1917"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Bottom Step Switcher & Live Narration */}
      <div className="bg-[#292524] border-t-2 border-[#1C1917] p-4 sm:p-5 space-y-3">
        {/* Clickable Step Tabs */}
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

        {/* Live Explanation Text */}
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