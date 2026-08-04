interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  id?: string;
}

export function Select({ label, value, onChange, options, id }: SelectProps) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="text-sm font-medium text-ink/70">
        {label}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-line bg-canvas px-4 py-3 text-base text-ink shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
