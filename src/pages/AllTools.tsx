import { useMemo, useState } from "react";
import { tools } from "@/registry/tools";
import { categories } from "@/registry/categories";
import { ToolCard3D } from "@/components/ToolCard3D";
import { SearchBar } from "@/components/SearchBar";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useSEO } from "@/seo/useSEO";

export default function AllTools() {
  useSEO({
    title: "All Tools",
    description: "Browse every calculator, converter and generator on GintiVerse.",
    path: "/tools",
  });

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [favorites] = useLocalStorage<string[]>("gintiverse-favorites", []);
  const [recent] = useLocalStorage<string[]>("gintiverse-recent", []);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = tools;
    if (activeCategory) list = list.filter((t) => t.category === activeCategory);
    if (showFavoritesOnly) list = list.filter((t) => favorites.includes(t.id));
    return list;
  }, [activeCategory, showFavoritesOnly, favorites]);

  const recentTools = recent.map((id) => tools.find((t) => t.id === id)).filter((t): t is NonNullable<typeof t> => !!t);

  return (
    <div className="container-px mx-auto max-w-7xl py-10 sm:py-16">
      <h1 className="text-3xl font-semibold text-ink sm:text-4xl">All Tools</h1>
      <p className="mt-2 max-w-xl text-mist">Every calculator, converter and generator, in one place.</p>

      <div className="mt-6 max-w-xl">
        <SearchBar />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`rounded-pill px-4 py-2 text-sm font-medium transition ${!activeCategory ? "bg-accent text-white" : "border border-line text-ink/70"}`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`rounded-pill px-4 py-2 text-sm font-medium transition ${activeCategory === c.id ? "bg-accent text-white" : "border border-line text-ink/70"}`}
          >
            {c.name}
          </button>
        ))}
        <button
          onClick={() => setShowFavoritesOnly((v) => !v)}
          className={`rounded-pill px-4 py-2 text-sm font-medium transition ${showFavoritesOnly ? "bg-accent text-white" : "border border-line text-ink/70"}`}
        >
          ★ Favorites
        </button>
      </div>

      {recentTools.length > 0 && !activeCategory && !showFavoritesOnly && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-ink">Recently used</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentTools.map((t, i) => (
              <ToolCard3D key={t.id} tool={t} index={i} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((tool, i) => (
            <ToolCard3D key={tool.id} tool={tool} index={i} />
          ))}
        </div>
        {filtered.length === 0 && <p className="mt-6 text-mist">No tools match these filters yet.</p>}
      </section>
    </div>
  );
}
