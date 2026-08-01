import { useState } from "react";
import { Field } from "@/components/Field";
import { ResultCard } from "@/components/ResultCard";
import type { ToolResult } from "@/registry/types";

export default function EMICalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [error, setError] = useState("");

  const p = parseFloat(principal);
  const annualRate = parseFloat(rate);
  const years = parseFloat(tenure);
  const valid = [p, annualRate, years].every((v) => !isNaN(v)) && p > 0 && annualRate >= 0 && years > 0;

  const result: ToolResult | null = valid
    ? (() => {
        const monthlyRate = annualRate / 12 / 100;
        const n = years * 12;
        const emi =
          monthlyRate === 0
            ? p / n
            : (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
        const totalPayment = emi * n;
        const totalInterest = totalPayment - p;
        const fmt = (v: number) => v.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
        return {
          label: "Monthly EMI",
          value: fmt(emi),
          breakdown: [
            `Total interest: ${fmt(totalInterest)}`,
            `Total payment: ${fmt(totalPayment)} over ${n} months`,
            "Figures are unitless — apply your own currency symbol.",
          ],
        };
      })()
    : null;

  function handlePrincipal(v: string) {
    setPrincipal(v);
    const n = parseFloat(v);
    setError(v !== "" && (isNaN(n) || n <= 0) ? "Enter a loan amount greater than 0" : "");
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Loan amount" type="number" inputMode="decimal" value={principal} onChange={(e) => handlePrincipal(e.target.value)} placeholder="500000" error={error} />
        <Field label="Annual interest" type="number" inputMode="decimal" suffix="%" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="8.5" />
        <Field label="Tenure" type="number" inputMode="decimal" suffix="years" value={tenure} onChange={(e) => setTenure(e.target.value)} placeholder="5" />
      </div>
      <ResultCard result={result} onReset={() => { setPrincipal(""); setRate(""); setTenure(""); setError(""); }} />
    </div>
  );
}
