/** Header component with the app branding, hero section and dark mode toggle. */
import React from "react";
import { LogoIcon, MoonIcon, SparklesIcon, SunIcon } from "./icons";

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
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/25">
            <LogoIcon className="h-5 w-5 text-white" />
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
          className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 text-slate-600 dark:text-slate-300 backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95"
        >
          {darkMode ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Hero */}
      <div className="mt-14 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-400/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-300 ring-1 ring-inset ring-indigo-500/20">
          <SparklesIcon className="h-3.5 w-3.5" /> A fresh joke every click
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
