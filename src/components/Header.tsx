/** Header component with the app branding, hero section and dark mode toggle. */
import React from "react";
import { Button } from "./Button";
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
          <div className="min-w-0 leading-tight">
            <span className="block text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              DadJokes
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-600 dark:text-zinc-400 sm:tracking-[0.25em]">
              Est. every dad, ever
            </span>
          </div>
        </div>

        <Button
          variant="icon"
          size="iconLg"
          aria-pressed={darkMode}
          aria-label={
            darkMode ? "Switch to light mode" : "Switch to dark mode"
          }
          onClick={toggleDarkMode}
          className="backdrop-blur hover:scale-105"
        >
          {darkMode ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Hero */}
      <div className="mb-14 mt-14 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-700 dark:text-orange-400">
          <SparklesIcon className="h-3.5 w-3.5" /> One tap, one groan
        </span>
        <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          Ready for a{" "}
          <span className="bg-linear-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent dark:from-amber-400 dark:to-orange-500">
            dad joke
          </span>
          ?
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
          The internet's finest collection of groan-inducing, eye-roll worthy
          dad jokes — rated on arrival by the Groan-o-Meter.
        </p>
      </div>
    </header>
  );
};

export default Header;
