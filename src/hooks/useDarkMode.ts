/** Custom hook for managing dark mode state, persisted to localStorage. */
import { useLayoutEffect } from "react";
import { usePersistedState } from "./usePersistedState";
import { STORAGE_KEYS } from "../config";
import { systemPrefersDark } from "../utils/theme";

/** Parses the persisted value, falling back to the system preference. */
const parseDarkMode = (raw: string | null): boolean =>
  raw !== null ? raw === "true" : systemPrefersDark();

/** Serializes the flag for persistence. */
const serializeDarkMode = (darkMode: boolean): string => String(darkMode);

/** Returns dark mode state and toggle function (defaults to system preference). */
export const useDarkMode = () => {
  const [darkMode, setDarkMode] = usePersistedState<boolean>({
    key: STORAGE_KEYS.darkMode,
    parse: parseDarkMode,
    serialize: serializeDarkMode,
  });

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  /** Toggles the dark mode state (persisted by usePersistedState). */
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return { darkMode, toggleDarkMode };
};
