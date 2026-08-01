// Generates public/sitemap.xml from the tool + category registry.
// Run automatically via `npm run build` (see package.json "prebuild"),
// or manually with: node scripts/generate-sitemap.mjs
//
// This file is intentionally plain Node (no ts-node) so it needs zero
// extra build tooling. It re-implements just enough of the registry shape
// to read src/registry/tools.ts and categories.ts — if you move those
// files, update the paths below.

import { writeFileSync } from "node:fs";
import { categories } from "../src/registry/categories.ts";
import { tools } from "../src/registry/tools.ts";

const SITE_URL = "https://gintiverse.com";
const today = new Date().toISOString().split("T")[0];

const staticPaths = ["/", "/tools", "/about", "/contact", "/privacy", "/terms", "/disclaimer"];
const categoryPaths = categories.map((c) => c.path);
const toolPaths = tools.map((t) => t.slug);

const urls = [...staticPaths, ...categoryPaths, ...toolPaths];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>
`;

writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml);
console.log(`sitemap.xml written with ${urls.length} URLs`);
