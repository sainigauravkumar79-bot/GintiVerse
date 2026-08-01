import { useState } from "react";
import { ResultCard } from "@/components/ResultCard";
import type { ToolResult } from "@/registry/types";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}",
};

function generate(length: number, opts: { lower: boolean; upper: boolean; digits: boolean; symbols: boolean }) {
  const pool = Object.entries(opts)
    .filter(([, on]) => on)
    .map(([key]) => SETS[key as keyof typeof SETS])
    .join("");
  if (!pool) return "";
  const bytes = new Uint32Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => pool[b % pool.length]).join("");
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ lower: true, upper: true, digits: true, symbols: true });
  const [password, setPassword] = useState(() => generate(16, { lower: true, upper: true, digits: true, symbols: true }));

  const noneSelected = !opts.lower && !opts.upper && !opts.digits && !opts.symbols;
  const result: ToolResult | null = password ? { label: "Generated password", value: password } : null;

  function regenerate(nextLength = length, nextOpts = opts) {
    setPassword(generate(nextLength, nextOpts));
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="pw-length" className="text-sm font-medium text-ink/70">
          Length: {length}
        </label>
        <input
          id="pw-length"
          type="range"
          min={8}
          max={64}
          value={length}
          onChange={(e) => {
            const v = Number(e.target.value);
            setLength(v);
            regenerate(v, opts);
          }}
          className="mt-2 w-full accent-accent"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(Object.keys(SETS) as (keyof typeof SETS)[]).map((key) => (
          <label key={key} className="flex items-center gap-2 rounded-2xl border border-line bg-white px-3 py-2.5 text-sm capitalize">
            <input
              type="checkbox"
              checked={opts[key]}
              onChange={(e) => {
                const next = { ...opts, [key]: e.target.checked };
                setOpts(next);
                regenerate(length, next);
              }}
              className="accent-accent"
            />
            {key}
          </label>
        ))}
      </div>

      {noneSelected && <p className="text-sm text-red-500">Select at least one character type.</p>}

      <button
        onClick={() => regenerate()}
        disabled={noneSelected}
        className="rounded-pill bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-bright disabled:opacity-40"
      >
        Generate new password
      </button>

      <ResultCard result={result} />
    </div>
  );
}
