import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { searchTools } from "@/lib/search";
import { IconRenderer } from "./IconRenderer";

const ROTATING_EXAMPLES = [
  "Calculate 18% of 850",
  "How many days until my birthday?",
  "Convert 5 feet to centimeters",
  "Calculate EMI for 500000",
  "15% of 750",
];

export function SearchBar({ large = false }: { large?: boolean }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setPlaceholderIndex((i) => (i + 1) % ROTATING_EXAMPLES.length), 3200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const results = query.trim() ? searchTools(query) : [];

  function go(slug: string) {
    setOpen(false);
    setQuery("");
    navigate(slug);
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={`glass-surface flex items-center gap-3 rounded-pill px-5 ${large ? "py-4 sm:py-5" : "py-3"}`}
      >
        <Search size={large ? 22 : 18} className="shrink-0 text-mist" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && results[0]) go(results[0].tool.slug);
          }}
          placeholder={ROTATING_EXAMPLES[placeholderIndex]}
          aria-label="Search for a calculator, converter or tool"
          className={`w-full bg-transparent outline-none placeholder:text-mist ${large ? "text-lg sm:text-xl" : "text-sm"}`}
        />
      </div>

      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="glass-surface absolute z-20 mt-2 w-full overflow-hidden rounded-card p-2"
            role="listbox"
          >
            {results.map((r) => (
              <li key={r.tool.id}>
                <button
                  onClick={() => go(r.tool.slug)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-accent-soft"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <IconRenderer name={r.tool.icon} size={16} />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-ink">{r.tool.name}</span>
                    {r.interpreted && <span className="block text-xs text-accent">{r.interpreted}</span>}
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
