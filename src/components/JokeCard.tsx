/** Component for displaying the current joke with actions to favorite, copy, or get a new one. */
import React, { useState } from "react";
import { Joke } from "../services/JokesData";
import { copyText } from "../utils/clipboard";

interface JokeCardProps {
  joke: Joke | null;
  isLoading: boolean;
  error: string | null;
  onFavorite: () => void;
  onNewJoke: () => void;
  isFavorite: boolean;
}

/** Renders the joke card with loading/error states and action buttons. */
const JokeCard: React.FC<JokeCardProps> = ({
  joke,
  isLoading,
  error,
  onFavorite,
  onNewJoke,
  isFavorite,
}) => {
  const [copied, setCopied] = useState(false);
  const jokeText = joke?.attachments[0].text ?? "";

  /** Copies the current joke to the clipboard and shows feedback. */
  const handleCopy = async () => {
    const ok = await copyText(jokeText);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const buttonBase =
    "px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

  return (
    <section className="flex flex-col justify-between rounded-3xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl dark:shadow-black/20 sm:p-8">
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Random Joke
          </h2>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            Live
          </span>
        </div>

        <div
          className="relative mb-8 flex min-h-32 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-6 py-6"
          aria-live="polite"
        >
          <span
            className="pointer-events-none absolute left-4 top-2 text-5xl font-serif text-indigo-500/20"
            aria-hidden="true"
          >
            “
          </span>
          {isLoading ? (
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
              <span
                className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-500/40 border-t-indigo-500"
                aria-hidden="true"
              />
              <span>Fetching a joke…</span>
            </div>
          ) : error ? (
            <p className="text-center text-rose-500 dark:text-rose-400">{error}</p>
          ) : (
            <p
              key={jokeText}
              className="animate-fade-in text-center text-lg italic leading-relaxed text-slate-800 dark:text-slate-100 sm:text-xl"
            >
              {jokeText}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={onNewJoke}
          disabled={isLoading}
          className={`${buttonBase} bg-linear-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/30 hover:from-indigo-600 hover:to-violet-600 hover:shadow-xl hover:shadow-indigo-500/30`}
        >
          {isLoading ? "Loading…" : "🔄 New Joke"}
        </button>
        <button
          onClick={handleCopy}
          disabled={!jokeText}
          className={`${buttonBase} border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10`}
        >
          {copied ? "✅ Copied!" : "📋 Copy"}
        </button>
        <button
          onClick={onFavorite}
          disabled={!joke || isFavorite}
          className={`${buttonBase} ${
            isFavorite
              ? "bg-linear-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30"
              : "border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10"
          }`}
        >
          {isFavorite ? "❤️ Favorited" : "🤍 Favorite"}
        </button>
      </div>
    </section>
  );
};

export default JokeCard;
