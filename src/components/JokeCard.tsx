/** Component for displaying the current joke with actions to favorite, copy, or get a new one. */
import React from "react";
import { Joke } from "../services/JokesData";
import { useCopy } from "../hooks/useCopy";
import { Button } from "./Button";
import { CheckIcon, CopyIcon, HeartIcon, RefreshIcon } from "./icons";

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
  const { copy, isCopied } = useCopy();
  const jokeText = joke?.attachments[0].text ?? "";

  return (
    <section className="flex flex-col justify-between rounded-3xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl dark:shadow-black/20 sm:p-8">
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Random Joke
          </h2>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            Live
          </span>
        </div>

        <div
          className="relative mb-8 flex min-h-32 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-6 py-6"
          aria-live="polite"
        >
          <span
            className="pointer-events-none absolute left-4 top-2 font-serif text-5xl text-indigo-500/20"
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
            <p className="text-center text-rose-500 dark:text-rose-400">
              {error}
            </p>
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
        <Button variant="primary" onClick={onNewJoke} disabled={isLoading}>
          <RefreshIcon
            className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
          />
          {isLoading ? "Loading…" : "New Joke"}
        </Button>
        <Button
          variant="secondary"
          onClick={() => copy(jokeText)}
          disabled={!jokeText}
        >
          {isCopied() ? (
            <>
              <CheckIcon className="h-4 w-4" /> Copied!
            </>
          ) : (
            <>
              <CopyIcon className="h-4 w-4" /> Copy
            </>
          )}
        </Button>
        <Button
          variant={isFavorite ? "accent" : "secondary"}
          onClick={onFavorite}
          disabled={!joke || isFavorite}
        >
          <HeartIcon filled={isFavorite} className="h-4 w-4" />
          {isFavorite ? "Favorited" : "Favorite"}
        </Button>
      </div>
    </section>
  );
};

export default JokeCard;
