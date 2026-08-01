import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

/** Reads the stored theme preference and keeps <html class="dark"> in sync. */
export function useTheme() {
  const [dark, setDark] = useLocalStorage("gintiverse-dark-mode", false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return [dark, setDark] as const;
}
