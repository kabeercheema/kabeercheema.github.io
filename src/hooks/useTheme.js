import { useEffect, useState, useCallback } from "react";

/**
 * Manages the dark/light theme state with localStorage persistence.
 * Defaults to dark mode.
 * @returns {{ isDark: boolean, toggleTheme: () => void }}
 */
export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    try {
      const s = localStorage.getItem("theme");
      return s ? s === "dark" : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // no-op: storage can be unavailable in private contexts
    }
  }, [isDark]);

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "theme") {
        setIsDark(e.newValue === "dark");
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleTheme = useCallback(() => setIsDark((d) => !d), []);

  return { isDark, toggleTheme };
}
