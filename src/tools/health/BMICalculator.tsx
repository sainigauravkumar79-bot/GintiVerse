import { useState } from "react";
import { Field } from "@/components/Field";
import { ResultCard } from "@/components/ResultCard";
import type { ToolResult } from "@/registry/types";

function bmiCategory(bmi: number) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Healthy range";
  if (bmi < 30) return "Overweight";
  return "Obesity range";
}

export default function BMICalculator() {
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [error, setError] = useState("");

  const h = parseFloat(heightCm);
  const w = parseFloat(weightKg);
  const valid = heightCm !== "" && weightKg !== "" && !isNaN(h) && !isNaN(w) && h > 0 && w > 0;

  const result: ToolResult | null = valid
    ? (() => {
        const bmi = w / (h / 100) ** 2;
        return {
          label: "Body Mass Index",
          value: bmi.toFixed(1),
          breakdown: [bmiCategory(bmi), "Estimate only — not a diagnosis. See a clinician for medical advice."],
        };
      })()
    : null;

  function handleWeight(v: string) {
    setWeightKg(v);
    const n = parseFloat(v);
    setError(v !== "" && (isNaN(n) || n <= 0) ? "Enter a weight greater than 0" : "");
  }

  return (
    <div className="space-y-6">
      <p className="rounded-2xl bg-accent-soft px-4 py-3 text-sm text-ink/80">
        This calculator provides estimates for informational purposes only and is not medical advice.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Height" type="number" inputMode="decimal" suffix="cm" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} placeholder="175" />
        <Field label="Weight" type="number" inputMode="decimal" suffix="kg" value={weightKg} onChange={(e) => handleWeight(e.target.value)} placeholder="70" error={error} />
      </div>
      <ResultCard result={result} onReset={() => { setHeightCm(""); setWeightKg(""); setError(""); }} />
    </div>
  );
}
