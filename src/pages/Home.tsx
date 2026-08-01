import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { ToolCard3D } from "@/components/ToolCard3D";
import { IconRenderer } from "@/components/IconRenderer";
import { tools } from "@/registry/tools";
import { categories } from "@/registry/categories";
import { useSEO } from "@/seo/useSEO";
import { generateOrganizationSchema } from "@/seo/schema";

const WHY_GINTIVERSE = [
  { title: "Fast", body: "Every calculation runs instantly in your browser." },
  { title: "Free", body: "No paywalls, no trial limits, no fine print." },
  { title: "No signup", body: "Open a tool and use it. Nothing to create." },
  { title: "Private", body: "Your inputs never leave your device." },
];

export default function Home() {
  useSEO({
    title: "Every calculation, conversion and everyday utility",
    description: "GintiVerse is a free, fast, no-signup collection of calculators, converters and generators for everyday life and work.",
    path: "/",
    jsonLd: generateOrganizationSchema(),
  });

  const popular = tools.slice(0, 8);

  return (
    <div>
      <Hero />

      <section className="container-px mx-auto max-w-7xl py-16">
        <h2 className="text-2xl font-semibold text-ink sm:text-3xl">Popular tools</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((tool, i) => (
            <ToolCard3D key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-panel py-16">
        <div className="container-px mx-auto max-w-7xl">
          <h2 className="text-2xl font-semibold text-ink sm:text-3xl">Browse by category</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link to={cat.path} className="glass-surface block rounded-card p-6 transition hover:shadow-glass-hover">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <IconRenderer name={categoryIcon(cat.id)} size={20} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">{cat.name}</h3>
                  <p className="mt-1.5 text-sm text-mist">{cat.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-16">
        <h2 className="text-2xl font-semibold text-ink sm:text-3xl">Why GintiVerse</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {WHY_GINTIVERSE.map((item) => (
            <div key={item.title} className="rounded-card border border-line p-5">
              <p className="font-display text-lg font-semibold text-ink">{item.title}</p>
              <p className="mt-1 text-sm text-mist">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function categoryIcon(id: string) {
  const map: Record<string, string> = {
    calculators: "calculator",
    finance: "landmark",
    "date-time": "clock",
    converters: "ruler",
    health: "heart-pulse",
    "developer-tools": "code",
    generators: "sparkles",
  };
  return map[id] ?? "calculator";
}
