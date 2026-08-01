import { Breadcrumb } from "@/components/Breadcrumb";
import { useSEO } from "@/seo/useSEO";
import type { ReactNode } from "react";

export function StaticPage({ title, path, children }: { title: string; path: string; children: ReactNode }) {
  useSEO({ title, description: `${title} for GintiVerse.`, path });
  return (
    <div className="container-px mx-auto max-w-2xl py-10 sm:py-16">
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: title, path }]} />
      <h1 className="text-3xl font-semibold text-ink">{title}</h1>
      <div className="prose prose-sm mt-6 max-w-none text-ink/80 [&>p]:mb-4 [&>p]:leading-relaxed">{children}</div>
    </div>
  );
}
