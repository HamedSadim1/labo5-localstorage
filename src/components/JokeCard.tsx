/** Component for displaying the current joke with actions to favorite, copy, or get a new one. */
import React from "react";
import { Joke } from "../services/JokesData";
import { useCopy } from "../hooks/useCopy";
import { Button } from "./Button";
import {
  CaretRightIcon,
  CheckIcon,
  CopyIcon,
  HeartIcon,
  RefreshIcon,
} from "./icons";

interface JokeCardProps {
  joke: Joke | null;
  isLoading: boolean;
  error: string | null;
  onFavorite: () => void;
  onNewJoke: () => void;
  isFavorite: boolean;
}

/** Stable pseudo-rating (0-100) derived from the joke text. */
const groanScore = (text: string): number => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % 100;
};

/** Human label for a groan score. */
const groanLabel = (score: number): string => {
  if (score < 34) return "Smirk";
  if (score < 67) return "Mild chuckle";
  return "Full eye-roll";
};

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
  const score = groanScore(jokeText);
  const label = groanLabel(score);

  return (
    <section className="flex flex-col justify-between rounded-3xl border border-orange-950/10 bg-white/80 p-6 shadow-xl shadow-orange-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-[#141519] dark:shadow-black/30 sm:p-8">
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
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
          className="flex min-h-36 items-center justify-center rounded-2xl border border-orange-950/10 bg-orange-50/60 px-6 py-6 text-center dark:border-white/10 dark:bg-black/30"
          aria-live="polite"
        >
          {isLoading ? (
            <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400">
              <span
                className="h-5 w-5 animate-spin rounded-full border-2 border-orange-500/40 border-t-orange-500"
                aria-hidden="true"
              />
              <span>Fetching a joke…</span>
            </div>
          ) : error ? (
            <p className="text-rose-500 dark:text-rose-400">{error}</p>
          ) : (
            <div>
              <div className="mb-3 flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500 dark:text-orange-400">
                <CaretRightIcon className="h-3 w-3" /> Setup / Punchline
              </div>
              <p
                key={jokeText}
                className="animate-fade-in font-serif text-lg italic leading-relaxed text-zinc-900 dark:text-zinc-100 sm:text-xl"
              >
                {jokeText}
              </p>
              <span className="mt-4 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500 dark:text-orange-400">
                Ba-dum-tss
              </span>
            </div>
          )}
        </div>

        {!isLoading && !error && jokeText && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em]">
              <span className="text-zinc-500">Groan-o-Meter</span>
              <span className="text-orange-500 dark:text-orange-400">
                {label}
              </span>
            </div>
            <div className="relative mt-2 h-1.5 rounded-full bg-zinc-200 dark:bg-white/10">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-amber-400 to-orange-500"
                style={{ width: `${score}%` }}
              />
              <div
                className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-orange-500 dark:border-[#141519]"
                style={{ left: `${score}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
              <span>Smirk</span>
              <span>Sigh</span>
              <span>Full eye-roll</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
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
          variant={isFavorite ? "accent" : "favorite"}
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
