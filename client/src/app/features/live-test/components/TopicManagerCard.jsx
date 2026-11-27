import { useState } from 'react';
import { Hash, Plus, X } from 'lucide-react';

export default function TopicManagerCard({
  topics,
  canManageTopics,
  isBusy,
  onSubscribe,
  onUnsubscribe,
  onQuickSelectTopic,
}) {
  const [topicInput, setTopicInput] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    const cleaned = topicInput.trim().replace(/^\/topics\//, '');
    if (!cleaned) return;
    onSubscribe(cleaned);
    setTopicInput('');
  };

  return (
    <div className="comic-panel bg-[#FCF9F4] p-4 sm:p-5 space-y-3.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
          <Hash className="w-4 h-4 text-[#F26D21]" />
          <span>Topic Subscriptions</span>
        </div>
        <span className="comic-pill bg-[#EAB32E] px-2.5 py-0.5 text-xs font-mono font-bold">
          {topics.length}
        </span>
      </div>

      <p className="text-xs text-[#1C1917]/80 leading-relaxed">
        လက်ရှိ Browser Token ကို Topic တစ်ခုခုသို့ Subscribe လုပ်ပြီး Broadcast ပို့စမ်းသပ်နိုင်ပါသည်။
      </p>

      <form onSubmit={handleAdd} className="flex items-center gap-2">
        <input
          type="text"
          disabled={!canManageTopics || isBusy}
          value={topicInput}
          onChange={(e) => setTopicInput(e.target.value)}
          placeholder="e.g. product-updates"
          className="comic-input flex-1 min-w-0 px-3 py-2 font-mono text-xs"
        />
        <button
          type="submit"
          disabled={!canManageTopics || isBusy || !topicInput.trim()}
          className="comic-btn bg-[#EAB32E] text-[#1C1917] px-3.5 py-2 text-xs font-bold flex items-center gap-1 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Subscribe</span>
        </button>
      </form>

      {!canManageTopics && (
        <p className="text-[11px] text-[#1C1917]/65">
          * Topic ချိတ်ဆက်ရန် Service Account JSON နှင့် Browser Token နှစ်ခုလုံး လိုအပ်ပါသည်။
        </p>
      )}

      {topics.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {topics.map((topic) => (
            <div
              key={topic}
              className="inline-flex items-center gap-1.5 bg-[#7EA6E8]/30 border-2 border-[#1C1917] rounded-full px-3 py-1 text-xs font-mono font-bold"
            >
              <button
                type="button"
                onClick={() => onQuickSelectTopic(topic)}
                title="Compose တွင် ဤ Topic ကို ရွေးရန်"
                className="hover:underline cursor-pointer"
              >
                #{topic}
              </button>
              <button
                type="button"
                disabled={isBusy}
                onClick={() => onUnsubscribe(topic)}
                title="Unsubscribe လုပ်ရန်"
                className="hover:text-[#F26D21] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}