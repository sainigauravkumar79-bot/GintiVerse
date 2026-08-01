import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, RotateCcw, Share2 } from "lucide-react";
import { useState } from "react";
import type { ToolResult } from "@/registry/types";

interface ResultCardProps {
  result: ToolResult | null;
  onReset?: () => void;
}

/** Displays a calculation result with a cinematic reveal and copy/share/reset actions. */
export function ResultCard({ result, onReset }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard API unavailable — fail silently, the value is still visible.
    }
  }

  async function handleShare() {
    if (!result) return;
    const shareData = { title: "GintiVerse result", text: `${result.label}: ${result.value}`, url: location.href };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled the share sheet — no action needed.
      }
    } else {
      await handleCopy();
    }
  }

  return (
    <AnimatePresence mode="wait">
      {result && (
        <motion.div
          key={result.value}
          initial={{ opacity: 0, y: 14, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="glass-surface rounded-card p-6 sm:p-8"
          role="status"
        >
          <p className="text-sm font-medium uppercase tracking-wide text-mist">{result.label}</p>
          <p className="mt-1 font-display text-4xl font-semibold text-ink sm:text-5xl">{result.value}</p>

          {result.breakdown && result.breakdown.length > 0 && (
            <ul className="mt-4 space-y-1 border-t border-line pt-4">
              {result.breakdown.map((line, i) => (
                <li key={i} className="text-sm text-ink/70">
                  {line}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied" : "Copy result"}
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
            >
              <Share2 size={16} />
              Share
            </button>
            {onReset && (
              <button
                onClick={onReset}
                className="inline-flex items-center gap-1.5 rounded-pill px-4 py-2 text-sm font-medium text-mist transition hover:text-ink"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
