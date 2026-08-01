import { useMemo, useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const sentences = text.trim() ? (text.match(/[.!?]+(?=\s|$)/g) ?? []).length || 1 : 0;
    return { words, chars, charsNoSpaces, sentences };
  }, [text]);

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here…"
        rows={8}
        className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-base text-ink shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Words", value: stats.words },
          { label: "Characters", value: stats.chars },
          { label: "No spaces", value: stats.charsNoSpaces },
          { label: "Sentences", value: stats.sentences },
        ].map((s) => (
          <div key={s.label} className="glass-surface rounded-card p-4 text-center">
            <p className="font-display text-2xl font-semibold text-ink">{s.value}</p>
            <p className="text-xs text-mist">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
