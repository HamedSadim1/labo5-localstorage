/** Header component with the app branding, hero section and dark mode toggle. */
import React from "react";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

/** Renders the top bar and hero section. */
const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="animate-slide-up">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span
            className="grid place-items-center h-9 w-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/25"
            aria-hidden="true"
          >
            <span className="text-lg">😂</span>
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            DadJokes
          </span>
        </div>

        <button
          onClick={toggleDarkMode}
          aria-pressed={darkMode}
          aria-label={
            darkMode ? "Switch to light mode" : "Switch to dark mode"
          }
          className="grid place-items-center h-10 w-10 rounded-full border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 text-slate-600 dark:text-slate-300 backdrop-blur transition-all duration-300 hover:bg-white dark:hover:bg-white/10 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95"
        >
          {darkMode ? (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>

      {/* Hero */}
      <div className="mt-14 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-400/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-300 ring-1 ring-inset ring-indigo-500/20">
          <span aria-hidden="true">✨</span> A fresh joke every click
        </span>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Ready for a{" "}
          <span className="bg-linear-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
            dad joke
          </span>
          ?
        </h1>
        <p className="mx-auto mt-4 max-w-md text-slate-500 dark:text-slate-400">
          The internet's finest collection of groan-inducing, eye-roll worthy
          dad jokes — refreshed on demand.
        </p>
      </div>
    </header>
  );
};

export default Header;
