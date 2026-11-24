import { useState } from 'react';
import { Copy, Check, FileCode2 } from 'lucide-react';

export default function CodeBlock({ fileName, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="w-full max-w-full border-2 border-[#1C1917] rounded-xl overflow-hidden bg-[#1C1917] text-[#FCF9F4] mt-3.5">
      {/* Top Bar */}
      <div className="bg-[#292524] border-b-2 border-[#1C1917] px-3.5 sm:px-4 py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-mono text-[#EAB32E] min-w-0">
          <FileCode2 className="w-4 h-4 shrink-0" />
          <span className="truncate">{fileName}</span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-mono font-bold border border-[#FCF9F4]/30 bg-[#1C1917] hover:bg-[#EAB32E] hover:text-[#1C1917] hover:border-[#1C1917] transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#4C9F98]" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <pre className="w-full max-w-full p-3.5 sm:p-4 text-xs sm:text-[13px] font-mono leading-relaxed overflow-x-auto text-[#F5EFE6]">
        <code>{code}</code>
      </pre>
    </div>
  );
}