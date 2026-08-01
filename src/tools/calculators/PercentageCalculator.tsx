import { useState } from "react";
import { Field } from "@/components/Field";
import { ResultCard } from "@/components/ResultCard";
import type { ToolResult } from "@/registry/types";

export default function PercentageCalculator() {
  const [percent, setPercent] = useState("");
  const [of, setOf] = useState("");
  const [error, setError] = useState("");

  const p = parseFloat(percent);
  const n = parseFloat(of);
  const valid = percent !== "" && of !== "" && !isNaN(p) && !isNaN(n);

  const result: ToolResult | null = valid
    ? {
        label: `${percent}% of ${of}`,
        value: (p / 100) * n === Math.trunc((p / 100) * n) ? String((p / 100) * n) : ((p / 100) * n).toFixed(2),
        breakdown: [`${percent} ÷ 100 = ${(p / 100).toFixed(4)}`, `${(p / 100).toFixed(4)} × ${of} = ${((p / 100) * n).toFixed(2)}`],
      }
    : null;

  function handleOfChange(v: string) {
    setOf(v);
    setError(v !== "" && isNaN(parseFloat(v)) ? "Enter a valid number" : "");
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Percentage"
          type="number"
          inputMode="decimal"
          suffix="%"
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
          placeholder="15"
        />
        <Field
          label="Of value"
          type="number"
          inputMode="decimal"
          value={of}
          onChange={(e) => handleOfChange(e.target.value)}
          placeholder="850"
          error={error}
        />
      </div>
      <ResultCard result={result} onReset={() => { setPercent(""); setOf(""); setError(""); }} />
    </div>
  );
}
