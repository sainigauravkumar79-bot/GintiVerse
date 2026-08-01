import { tools } from "@/registry/tools";
import type { ToolMeta } from "@/registry/types";

/**
 * Smart search / intent detection.
 *
 * Two-stage approach, entirely local:
 *  1. Pattern matchers recognize a handful of common natural-language
 *     shapes ("15% of 750", "5 feet to cm", "days between X and Y") and
 *     return a specific interpreted query alongside the matching tool.
 *  2. Falls back to weighted keyword/alias scoring across the registry so
 *     any other query still returns a ranked, relevant tool list.
 *
 * This is intentionally dependency-free so it works instantly and offline.
 * To add AI-assisted search later, call an API first and fall back to
 * `searchTools` when it's unavailable — the return shape here can stay the
 * same.
 */

export interface SearchMatch {
  tool: ToolMeta;
  score: number;
  /** If a pattern matcher fired, a human-readable interpretation of the query */
  interpreted?: string;
}

interface PatternRule {
  regex: RegExp;
  toolId: string;
  interpret: (m: RegExpMatchArray) => string;
}

const PATTERNS: PatternRule[] = [
  {
    regex: /(\d+(?:\.\d+)?)\s*%\s*(?:of)?\s*(\d+(?:\.\d+)?)/i,
    toolId: "percentage",
    interpret: (m) => `${m[1]}% of ${m[2]}`,
  },
  {
    regex: /(\d+(?:\.\d+)?)\s*(feet|foot|ft|inch(?:es)?|in|cm|centimeters?|m|meters?|km|mi|miles?|yd|yards?)\s*(?:to|in)\s*(feet|foot|ft|inch(?:es)?|in|cm|centimeters?|m|meters?|km|mi|miles?|yd|yards?)/i,
    toolId: "length-converter",
    interpret: (m) => `${m[1]} ${m[2]} to ${m[3]}`,
  },
  {
    regex: /days?\s*between\s*(.+?)\s*(?:and|to)\s*(.+)/i,
    toolId: "date-difference",
    interpret: (m) => `Days between ${m[1]} and ${m[2]}`,
  },
  {
    regex: /age\s*(?:from|since|for)\s*(.+)/i,
    toolId: "age",
    interpret: (m) => `Age from ${m[1]}`,
  },
  {
    regex: /\b(bmi|body mass index)\b/i,
    toolId: "bmi",
    interpret: () => "BMI calculator",
  },
  {
    regex: /(loan|emi).*(\d+)/i,
    toolId: "emi",
    interpret: (m) => `Loan calculation for ${m[2]}`,
  },
  {
    regex: /tip\s*(?:on|for)?\s*(\d+(?:\.\d+)?)/i,
    toolId: "tip",
    interpret: (m) => `Tip on ${m[1]}`,
  },
  {
    regex: /(\d+(?:\.\d+)?)\s*%\s*(?:off|discount)/i,
    toolId: "discount",
    interpret: (m) => `${m[1]}% off`,
  },
  {
    regex: /(strong|random|new)?\s*password/i,
    toolId: "password-generator",
    interpret: () => "Generate a password",
  },
  {
    regex: /(word|character)\s*count/i,
    toolId: "word-counter",
    interpret: () => "Count words and characters",
  },
];

function keywordScore(query: string, tool: ToolMeta): number {
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  let score = 0;
  if (tool.name.toLowerCase() === q) score += 100;
  if (tool.name.toLowerCase().includes(q)) score += 40;
  for (const kw of tool.keywords) {
    if (kw === q) score += 60;
    else if (q.includes(kw) || kw.includes(q)) score += 20;
  }
  if (tool.category.replace("-", " ").includes(q)) score += 10;
  return score;
}

/** Run pattern matchers first; if one fires, it wins outright. */
export function detectIntent(query: string): SearchMatch | null {
  for (const rule of PATTERNS) {
    const m = query.match(rule.regex);
    if (m) {
      const tool = tools.find((t) => t.id === rule.toolId);
      if (tool) return { tool, score: 1000, interpreted: rule.interpret(m) };
    }
  }
  return null;
}

/** Full ranked search across the registry, used for the live results list. */
export function searchTools(query: string, limit = 8): SearchMatch[] {
  const intent = detectIntent(query);
  const scored = tools
    .map((tool) => ({ tool, score: keywordScore(query, tool) }))
    .filter((r) => r.score > 0 || tool_matches_intent(intent, r.tool))
    .sort((a, b) => b.score - a.score);

  if (intent && !scored.some((s) => s.tool.id === intent.tool.id)) {
    scored.unshift({ tool: intent.tool, score: 1000 });
  } else if (intent) {
    const existing = scored.find((s) => s.tool.id === intent.tool.id);
    if (existing) existing.score = 1000;
    scored.sort((a, b) => b.score - a.score);
  }

  return scored.slice(0, limit).map((r) => ({
    ...r,
    interpreted: intent && intent.tool.id === r.tool.id ? intent.interpreted : undefined,
  }));
}

function tool_matches_intent(intent: SearchMatch | null, tool: ToolMeta) {
  return intent?.tool.id === tool.id;
      }
