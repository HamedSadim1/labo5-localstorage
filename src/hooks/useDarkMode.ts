/** Custom hook for managing dark mode state, persisted to localStorage. */
import { useState, useLayoutEffect } from "react";
import { storageGet, storageSet } from "../utils/storage";

const STORAGE_KEY = "darkMode";

/** Whether the OS currently prefers a dark color scheme. */
const systemPrefersDark = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

/** Returns dark mode state and toggle function (defaults to system preference). */
export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = storageGet(STORAGE_KEY);
    if (saved !== null) {
      return saved === "true";
    }
    return systemPrefersDark();
  });

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  /** Toggles the dark mode state and persists the explicit choice. */
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (!storageSet(STORAGE_KEY, String(next))) {
        console.warn("Dark mode preference could not be persisted.");
      }
      return next;
    });
  };

  return { darkMode, toggleDarkMode };
};
