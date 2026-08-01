import { useState } from "react";
import { Field } from "@/components/Field";
import { ResultCard } from "@/components/ResultCard";
import type { ToolResult } from "@/registry/types";

export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPct, setTipPct] = useState("15");
  const [people, setPeople] = useState("1");

  const b = parseFloat(bill);
  const t = parseFloat(tipPct);
  const n = Math.max(1, parseInt(people || "1", 10));
  const valid = bill !== "" && !isNaN(b) && !isNaN(t) && b >= 0;

  const result: ToolResult | null = valid
    ? (() => {
        const tipAmount = (b * t) / 100;
        const total = b + tipAmount;
        return {
          label: "Total with tip",
          value: total.toFixed(2),
          breakdown: [
            `Tip: ${tipAmount.toFixed(2)}`,
            n > 1 ? `Per person (${n}): ${(total / n).toFixed(2)}` : "Split across more people using the field below",
          ],
        };
      })()
    : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Bill total" type="number" inputMode="decimal" value={bill} onChange={(e) => setBill(e.target.value)} placeholder="86.40" />
        <Field label="Tip" type="number" inputMode="decimal" suffix="%" value={tipPct} onChange={(e) => setTipPct(e.target.value)} />
        <Field label="Split between" type="number" inputMode="numeric" min={1} value={people} onChange={(e) => setPeople(e.target.value)} />
      </div>
      <ResultCard result={result} onReset={() => { setBill(""); setTipPct("15"); setPeople("1"); }} />
    </div>
  );
}
