/** Custom hook for managing dark mode state. */
import { useState } from "react";

/** Returns dark mode state and toggle function. */
export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(true);

  /** Toggles the dark mode state. */
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return { darkMode, toggleDarkMode };
};
