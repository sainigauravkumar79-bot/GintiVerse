import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { getToolBySlug, getToolById } from "@/registry/tools";
import { getCategory } from "@/registry/categories";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ToolCard3D } from "@/components/ToolCard3D";
import { useSEO } from "@/seo/useSEO";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { generateBreadcrumbSchema, generateFAQSchema, generateWebApplicationSchema } from "@/seo/schema";
import { Star } from "lucide-react";
import { HealthDisclaimer } from "@/components/HealthDisclaimer"; // if you added this

export default function ToolPage() {
  const params = useParams();
  const slug = "/" + (params["*"] ?? "");
  const tool = getToolBySlug(slug);
  const [recent, setRecent] = useLocalStorage<string[]>("gintiverse-recent", []);
  const [favorites, setFavorites] = useLocalStorage<string[]>("gintiverse-favorites", []);

  useEffect(() => {
    if (tool) setRecent((prev) => [tool.id, ...prev.filter((id) => id !== tool.id)].slice(0, 8));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tool?.id]);

  const category = tool ? getCategory(tool.category) : undefined;

  useSEO({
    title: tool?.name ?? "Tool not found",
    description: tool?.description ?? "",
    path: tool?.slug ?? "",
    jsonLd: tool
      ? [
          generateBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: category?.name ?? "", path: category?.path ?? "" },
            { name: tool.name, path: tool.slug },
          ]),
          generateWebApplicationSchema(tool),
          ...(tool.faq ? [generateFAQSchema(tool.faq)] : []),
        ]
      : undefined,
  });

  if (!tool) return <Navigate to="/tools" replace />;

  const Component = tool.component;
  const related = tool.relatedTools.map(getToolById).filter((t): t is NonNullable<typeof t> => !!t);
  const isFavorite = favorites.includes(tool.id);

  return (
    <div className="container-px mx-auto max-w-4xl py-10 sm:py-16">
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: category?.name ?? "", path: category?.path ?? "" }, { name: tool.name, path: tool.slug }]} />

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-ink sm:text-4xl">{tool.name}</h1>
          <p className="mt-2 max-w-xl text-mist">{tool.longDescription}</p>
        </div>
        <button
          onClick={() =>
            setFavorites(isFavorite ? favorites.filter((id) => id !== tool.id) : [...favorites, tool.id])
          }
          aria-pressed={isFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="shrink-0 rounded-full border border-line p-2.5 text-mist transition hover:text-accent"
        >
          <Star size={18} fill={isFavorite ? "currentColor" : "none"} className={isFavorite ? "text-accent" : ""} />
        </button>
      </div>

      <div className="mt-8">
        {tool.isHealthTool && <HealthDisclaimer />}
        <Component />
      </div>

      {tool.examples && tool.examples.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">Example calculations</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {tool.examples.map((ex, i) => (
              <div key={i} className="rounded-card border border-line p-4">
                <p className="text-sm text-mist">{ex.input}</p>
                <p className="mt-1 font-display text-lg font-semibold text-ink">{ex.output}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {tool.faq && tool.faq.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">Frequently asked questions</h2>
          <div className="mt-4 space-y-4">
            {tool.faq.map((f, i) => (
              <div key={i} className="border-b border-line pb-4">
                <p className="font-medium text-ink">{f.question}</p>
                <p className="mt-1 text-sm text-mist">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">Related tools</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {related.map((t, i) => (
              <ToolCard3D key={t.id} tool={t} _index={i} />
            ))}
          </div>
        </section>
      )}

      <p className="mt-10 text-xs text-mist">
        Recently viewed on this device — <Link to="/tools" className="text-accent">see all tools</Link>.
        {recent.length > 0 && ` (${recent.length} in your history)`}
      </p>
    </div>
  );
}
