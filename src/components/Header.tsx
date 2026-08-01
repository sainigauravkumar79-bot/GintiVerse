import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { categories } from "@/registry/categories";
import { useTheme } from "@/hooks/useTheme";

const NAV_LINKS = [
  { label: "Calculators", path: "/calculators" },
  { label: "Converters", path: "/converters" },
  { label: "Finance", path: "/finance" },
  { label: "Date & Time", path: "/date-time" },
  { label: "Health", path: "/health" },
  { label: "Developer", path: "/developer-tools" },
  { label: "All Tools", path: "/tools" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/80 backdrop-blur-glass">
      <div className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight text-ink">
          GINTIVERSE
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `rounded-pill px-3.5 py-2 text-sm font-medium transition ${
                  isActive ? "bg-accent-soft text-accent" : "text-ink/70 hover:text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDark(!dark)}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-line text-ink/70 transition hover:text-ink sm:flex"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink/70 lg:hidden"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-ink/30 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 right-0 z-50 w-[82%] max-w-sm bg-white p-6 shadow-glass-lg lg:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-semibold">Menu</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-full p-2 text-ink/70">
                  <X size={20} />
                </button>
              </div>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    to={c.path}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-base font-medium text-ink transition hover:bg-accent-soft"
                  >
                    {c.name}
                  </Link>
                ))}
                <Link to="/tools" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-base font-medium text-accent">
                  All Tools
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
