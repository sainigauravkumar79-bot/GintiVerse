import { useState } from "react";
import { Field } from "@/components/Field";
import { ResultCard } from "@/components/ResultCard";
import type { ToolResult } from "@/registry/types";

function diffYMD(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState("");

  let result: ToolResult | null = null;
  if (birthDate) {
    const from = new Date(birthDate);
    const to = new Date();
    if (isNaN(from.getTime())) {
      if (!error) setError("Enter a valid date");
    } else if (from > to) {
      if (!error) setError("Birth date can't be in the future");
    } else {
      if (error) setError("");
      const { years, months, days } = diffYMD(from, to);
      const totalDays = Math.floor((to.getTime() - from.getTime()) / 86400000);
      result = {
        label: "Your age",
        value: `${years} years`,
        breakdown: [
          `${years} years, ${months} months, ${days} days`,
          `That's ${totalDays.toLocaleString()} days total`,
        ],
      };
    }
  }

  return (
    <div className="space-y-6">
      <div className="max-w-xs">
        <Field
          label="Date of birth"
          type="date"
          value={birthDate}
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => setBirthDate(e.target.value)}
          error={error}
        />
      </div>
      <ResultCard result={result} onReset={() => { setBirthDate(""); setError(""); }} />
    </div>
  );
}
