import { useState } from "react";
import { Field } from "@/components/Field";
import { Select } from "@/components/Select";
import { ResultCard } from "@/components/ResultCard";
import type { ToolResult } from "@/registry/types";

// All factors relative to metres.
const UNITS: Record<string, { label: string; toMeters: number }> = {
  mm: { label: "Millimeters", toMeters: 0.001 },
  cm: { label: "Centimeters", toMeters: 0.01 },
  m: { label: "Meters", toMeters: 1 },
  km: { label: "Kilometers", toMeters: 1000 },
  in: { label: "Inches", toMeters: 0.0254 },
  ft: { label: "Feet", toMeters: 0.3048 },
  yd: { label: "Yards", toMeters: 0.9144 },
  mi: { label: "Miles", toMeters: 1609.344 },
};

const options = Object.entries(UNITS).map(([value, { label }]) => ({ value, label }));

export default function LengthConverter() {
  const [amount, setAmount] = useState("5");
  const [from, setFrom] = useState("ft");
  const [to, setTo] = useState("cm");

  const n = parseFloat(amount);
  const valid = amount !== "" && !isNaN(n);

  const result: ToolResult | null = valid
    ? (() => {
        const meters = n * UNITS[from].toMeters;
        const converted = meters / UNITS[to].toMeters;
        const display = Math.abs(converted) >= 1000 ? converted.toFixed(2) : converted.toPrecision(6).replace(/\.?0+$/, "");
        return {
          label: `${amount} ${UNITS[from].label.toLowerCase()} in ${UNITS[to].label.toLowerCase()}`,
          value: `${display} ${to}`,
        };
      })()
    : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Amount" type="number" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <Select label="From" value={from} onChange={setFrom} options={options} />
        <Select label="To" value={to} onChange={setTo} options={options} />
      </div>
      <ResultCard result={result} />
    </div>
  );
}
