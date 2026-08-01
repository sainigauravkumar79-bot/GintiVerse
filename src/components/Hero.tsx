import { motion } from "framer-motion";
import { SearchBar } from "./SearchBar";
import { IconRenderer } from "./IconRenderer";
import { categories } from "@/registry/categories";

// Fixed positions around the central sphere, tuned by eye — not random,
// so the orbit reads as deliberate rather than scattered.
const ORBIT: { icon: string; top: string; left: string; delay: number }[] = [
  { icon: "calculator", top: "6%", left: "12%", delay: 0 },
  { icon: "ruler", top: "14%", left: "78%", delay: 0.4 },
  { icon: "landmark", top: "62%", left: "84%", delay: 0.8 },
  { icon: "clock", top: "78%", left: "18%", delay: 1.2 },
  { icon: "heart-pulse", top: "40%", left: "4%", delay: 1.6 },
  { icon: "code", top: "50%", left: "92%", delay: 2.0 },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24">
      {/* Central 3D orb — pure CSS, no Three.js needed for this ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accent-bright/25 via-accent/10 to-transparent blur-3xl"
      />

      <div className="container-px relative mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl font-semibold leading-[1.1] text-ink sm:text-6xl"
        >
          Everything you need.
          <br />
          One smart utility platform.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-5 max-w-xl text-lg text-mist"
        >
          Calculate, convert, compare and generate — instantly, in your browser, with no signup.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-2xl"
        >
          <SearchBar large />
        </motion.div>
      </div>

      {/* Floating category chips — hidden on small screens to avoid clutter/perf cost */}
      <div className="relative mx-auto mt-16 hidden h-64 max-w-5xl md:block" aria-hidden>
        {ORBIT.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + item.delay * 0.15 }}
            className="glass-surface absolute flex h-14 w-14 animate-float items-center justify-center rounded-2xl text-accent"
            style={{ top: item.top, left: item.left, animationDelay: `${item.delay}s` }}
          >
            <IconRenderer name={item.icon} size={22} />
          </motion.div>
        ))}
      </div>

      <span className="sr-only">Tool categories: {categories.map((c) => c.name).join(", ")}</span>
    </section>
  );
}
