import type { ComponentType } from "react";

export type CategoryId =
  | "calculators"
  | "finance"
  | "date-time"
  | "converters"
  | "health"
  | "developer-tools"
  | "generators";

export interface CategoryMeta {
  id: CategoryId;
  name: string;
  path: string; // e.g. /calculators
  description: string;
}

export interface ToolResult {
  /** Short label shown above the headline number, e.g. "Result" */
  label: string;
  /** The headline value, already formatted for display */
  value: string;
  /** Optional line-by-line breakdown shown under the result */
  breakdown?: string[];
}

export interface ToolMeta {
  /** Stable unique id, used as the React key and localStorage key */
  id: string;
  /** Canonical route, e.g. /calculators/percentage */
  slug: string;
  name: string;
  category: CategoryId;
  /** One or two sentences, shown in cards and meta description */
  description: string;
  /** Longer explanation for the tool page body */
  longDescription: string;
  /** Search keywords / synonyms, lowercase */
  keywords: string[];
  /** Ids of other tools to recommend from this tool's page */
  relatedTools: string[];
  /** Lucide icon name, resolved by IconRenderer */
  icon: string;
  /** The interactive calculator component for this tool's page */
  component: ComponentType;
  /** Example calculations shown on the tool page */
  examples?: { input: string; output: string }[];
  /** FAQ entries used for on-page content and FAQ schema */
  faq?: { question: string; answer: string }[];
  /** Show the "informational only, not medical advice" notice */
  isHealthTool?: boolean;
}
