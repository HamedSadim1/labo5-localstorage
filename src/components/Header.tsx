/** Header component with the app branding, hero section and dark mode toggle. */
import React from "react";
import { LogoIcon, MoonIcon, SparklesIcon, SunIcon } from "./icons";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

/** Renders the brand bar and hero section. */
const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="animate-slide-up">
      {/* Brand bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-linear-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/25">
            <LogoIcon className="h-5 w-5 text-[#1a1205]" />
          </span>
          <div className="leading-tight">
            <span className="block text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              DadJokes
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Est. every dad, ever
            </span>
          </div>
        </div>

        <button
          onClick={toggleDarkMode}
          aria-pressed={darkMode}
          aria-label={
            darkMode ? "Switch to light mode" : "Switch to dark mode"
          }
          className="grid h-10 w-10 place-items-center rounded-full border border-orange-950/10 bg-white text-zinc-600 transition-all duration-300 hover:scale-105 hover:bg-orange-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10"
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
        <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500 dark:text-orange-400">
          <SparklesIcon className="h-3.5 w-3.5" /> One tap, one groan
        </span>
        <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          Ready for a{" "}
          <span className="bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            dad joke
          </span>
          ?
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
          The internet's finest collection of groan-inducing, eye-roll worthy
          dad jokes — rated on arrival by the Groan-o-Meter.
        </p>
      </div>
    </header>
  );
};

export default Header;
