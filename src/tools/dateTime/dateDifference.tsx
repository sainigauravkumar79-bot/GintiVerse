import { useState } from "react";
import { Field } from "@/components/Field";
import { ResultCard } from "@/components/ResultCard";
import type { ToolResult } from "@/registry/types";

export default function DateDifference() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState("");

  let result: ToolResult | null = null;
  if (start && end) {
    const d1 = new Date(start);
    const d2 = new Date(end);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      if (!error) setError("Enter two valid dates");
    } else {
      if (error) setError("");
      const days = Math.round(Math.abs(d2.getTime() - d1.getTime()) / 86400000);
      const weeks = Math.floor(days / 7);
      result = {
        label: "Days between",
        value: `${days.toLocaleString()} days`,
        breakdown: [`${weeks} weeks and ${days - weeks * 7} days`, `≈ ${(days / 30.44).toFixed(1)} months`],
      };
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Start date" type="date" value={start} onChange={(e) => setStart(e.target.value)} />
        <Field label="End date" type="date" value={end} onChange={(e) => setEnd(e.target.value)} error={error} />
      </div>
      <ResultCard result={result} onReset={() => { setStart(""); setEnd(""); setError(""); }} />
    </div>
  );
}
