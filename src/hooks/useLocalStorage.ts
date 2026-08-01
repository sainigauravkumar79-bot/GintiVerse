import { useEffect, useState } from "react";

/** Simple JSON-backed localStorage state. Never sends data anywhere. */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or unavailable (private browsing) — the app still works,
      // it just won't persist between visits.
    }
  }, [key, value]);

  return [value, setValue] as const;
}
