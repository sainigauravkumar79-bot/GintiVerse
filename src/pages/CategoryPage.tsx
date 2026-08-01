import { useParams, Navigate, Link } from "react-router-dom";
import { getCategory, categories } from "@/registry/categories";
import { getToolsByCategory } from "@/registry/tools";
import { ToolCard3D } from "@/components/ToolCard3D";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useSEO } from "@/seo/useSEO";
import { generateBreadcrumbSchema } from "@/seo/schema";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const category = getCategory(categoryId ?? "");

  useSEO({
    title: category?.name ?? "Category",
    description: category?.description ?? "",
    path: category?.path ?? "",
    jsonLd: category ? generateBreadcrumbSchema([{ name: "Home", path: "/" }, { name: category.name, path: category.path }]) : undefined,
  });

  if (!category) return <Navigate to="/tools" replace />;
  const toolsInCategory = getToolsByCategory(category.id);
  const otherCategories = categories.filter((c) => c.id !== category.id);

  return (
    <div className="container-px mx-auto max-w-7xl py-10 sm:py-16">
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: category.name, path: category.path }]} />
      <h1 className="text-3xl font-semibold text-ink sm:text-4xl">{category.name}</h1>
      <p className="mt-2 max-w-xl text-mist">{category.description}</p>

      {toolsInCategory.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {toolsInCategory.map((tool, i) => (
            <ToolCard3D key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-mist">More tools in this category are on the way.</p>
      )}

      <div className="mt-16">
        <h2 className="text-lg font-semibold text-ink">Other categories</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {otherCategories.map((c) => (
            <Link key={c.id} to={c.path} className="rounded-pill border border-line px-4 py-2 text-sm text-ink/70 transition hover:border-accent hover:text-accent">
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
