/** Header component with the app title and dark mode toggle. */
import React from "react";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

/** Renders the header with title and dark mode toggle button. */
const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="text-center mb-8">
      <div className="backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-2xl">
        <h1 className="text-4xl font-bold mb-4 text-white dark:text-gray-100">
          Dad Jokes App
        </h1>
        <button
          onClick={toggleDarkMode}
          className="px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </header>
  );
};

export default Header;
