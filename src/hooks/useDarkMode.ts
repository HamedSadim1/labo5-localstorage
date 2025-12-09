import { useState } from "react";

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return { darkMode, toggleDarkMode };
};
