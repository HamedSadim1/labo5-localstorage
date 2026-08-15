/** Custom hook for managing dark mode state, persisted to localStorage. */
import { useState, useLayoutEffect } from "react";

const STORAGE_KEY = "darkMode";

/** Returns dark mode state and toggle function (defaults to dark). */
export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      return saved === "true";
    }
    return true;
  });

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem(STORAGE_KEY, String(darkMode));
  }, [darkMode]);

  /** Toggles the dark mode state. */
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return { darkMode, toggleDarkMode };
};
