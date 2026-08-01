import { useState } from "react";
import { Field } from "@/components/Field";
import { ResultCard } from "@/components/ResultCard";
import type { ToolResult } from "@/registry/types";

export default function DiscountCalculator() {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");

  const pr = parseFloat(price);
  const d = parseFloat(discount);
  const valid = price !== "" && discount !== "" && !isNaN(pr) && !isNaN(d);

  const result: ToolResult | null = valid
    ? (() => {
        const saved = (pr * d) / 100;
        const final = pr - saved;
        return {
          label: "You pay",
          value: final.toFixed(2),
          breakdown: [`You save ${saved.toFixed(2)} (${d}%)`, `Original price: ${pr.toFixed(2)}`],
        };
      })()
    : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Original price" type="number" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="120" />
        <Field label="Discount" type="number" inputMode="decimal" suffix="%" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="25" />
      </div>
      <ResultCard result={result} onReset={() => { setPrice(""); setDiscount(""); }} />
    </div>
  );
}
