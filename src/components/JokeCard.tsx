/** Component for displaying the current joke with actions to favorite, copy, or get a new one. */
import React, { useEffect } from "react";
import { Joke } from "../services/JokesData";
import { useCopy } from "../hooks/useCopy";
import { Button } from "./Button";
import { Skeleton } from "./Skeleton";
import {
  CaretRightIcon,
  CheckIcon,
  CopyIcon,
  HeartIcon,
  RefreshIcon,
  XIcon,
} from "./icons";

interface JokeCardProps {
  joke: Joke | null;
  jokeId: number;
  isLoading: boolean;
  error: string | null;
  onToggleFavorite: () => void;
  onNewJoke: () => void;
  isFavorite: boolean;
}

type JokeStatus = "loading" | "error" | "live";

/** Visual treatment for each fetch status. */
const statusConfig: Record<
  JokeStatus,
  { wrap: string; dot: string; label: string }
> = {
  loading: {
    wrap: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
    label: "Loading",
  },
  error: {
    wrap: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
    dot: "bg-rose-500",
    label: "Error",
  },
  live: {
    wrap: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
    label: "Live",
  },
};

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
  jokeId,
  isLoading,
  error,
  onToggleFavorite,
  onNewJoke,
  isFavorite,
}) => {
  const { copy, isCopied, isFailed, reset } = useCopy();
  const jokeText = joke?.attachments?.[0]?.text ?? "";

  // Clear copy feedback whenever a new joke loads so it never shows stale text.
  useEffect(() => {
    reset();
  }, [jokeId, reset]);
  const score = groanScore(jokeText);
  const label = groanLabel(score);

  // Only show the skeleton on the first load; keep the joke during refreshes.
  const isInitialLoad = isLoading && !joke;
  const status: JokeStatus = isLoading ? "loading" : error ? "error" : "live";
  const statusStyle = statusConfig[status];

  return (
    <section className="flex flex-col justify-between rounded-3xl border border-orange-950/10 bg-white/80 p-6 shadow-xl shadow-orange-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-[#141519] dark:shadow-black/30 sm:p-8">
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Random Joke
          </h2>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle.wrap}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
              aria-hidden="true"
            />
            {statusStyle.label}
          </span>
        </div>

        <div
          className="flex min-h-36 items-center justify-center rounded-2xl border border-orange-950/10 bg-orange-50/60 px-6 py-6 text-center dark:border-white/10 dark:bg-black/30"
          aria-live="polite"
        >
          {isInitialLoad ? (
            <>
              <span className="sr-only">Loading a joke…</span>
              <div className="w-full" aria-hidden="true">
                <div className="mb-4 flex justify-center">
                  <Skeleton className="h-3 w-32 rounded-full" />
                </div>
                <div className="space-y-2.5">
                  <Skeleton className="mx-auto h-4 w-11/12 rounded" />
                  <Skeleton className="mx-auto h-4 w-3/4 rounded" />
                </div>
                <div className="mt-4 flex justify-center">
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </div>
            </>
          ) : error ? (
            <div className="flex flex-col items-center gap-3">
              <p className="text-rose-600 dark:text-rose-400">{error}</p>
              <Button variant="secondary" size="sm" onClick={onNewJoke}>
                Try again
              </Button>
            </div>
          ) : (
            <div>
              <div className="mb-3 flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-700 dark:text-orange-400">
                <CaretRightIcon className="h-3 w-3" /> Setup / Punchline
              </div>
              <p
                key={jokeId}
                className="animate-fade-in font-serif text-lg italic leading-relaxed text-zinc-900 dark:text-zinc-100 sm:text-xl"
              >
                {jokeText || "This joke is too shy — try another one."}
              </p>
              {jokeText && (
                <span className="mt-4 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-700 dark:text-orange-400">
                  Ba-dum-tss
                </span>
              )}
            </div>
          )}
        </div>

        <div className="mt-6">
          {isInitialLoad ? (
            <div aria-hidden="true">
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-32 rounded-full" />
                <Skeleton className="h-3 w-20 rounded-full" />
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-zinc-200 dark:bg-white/10" />
              <div className="mt-1.5 flex justify-between">
                <Skeleton className="h-2.5 w-10 rounded-full" />
                <Skeleton className="h-2.5 w-8 rounded-full" />
                <Skeleton className="h-2.5 w-16 rounded-full" />
              </div>
            </div>
          ) : !error && jokeText ? (
            <div
              role="meter"
              aria-label={`Groan level: ${label}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={score}
            >
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em]">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Groan-o-Meter
                </span>
                <span className="text-orange-700 dark:text-orange-400">
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
                  style={{ left: `clamp(7px, ${score}%, calc(100% - 7px))` }}
                />
              </div>
              <div className="mt-1.5 flex flex-wrap justify-between gap-x-2 text-[11px] uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
                <span>Smirk</span>
                <span>Sigh</span>
                <span>Full eye-roll</span>
              </div>
            </div>
          ) : null}
        </div>
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
          ) : isFailed() ? (
            <>
              <XIcon className="h-4 w-4" /> Copy failed
            </>
          ) : (
            <>
              <CopyIcon className="h-4 w-4" /> Copy
            </>
          )}
        </Button>
        <Button
          variant={isFavorite ? "accent" : "favorite"}
          aria-pressed={isFavorite}
          onClick={onToggleFavorite}
          disabled={!joke}
        >
          <HeartIcon filled={isFavorite} className="h-4 w-4" />
          Favorite
        </Button>
      </div>
    </section>
  );
};

export default JokeCard;
