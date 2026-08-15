/** Component for displaying the current joke with actions to favorite, copy, or get a new one. */
import React from "react";
import type { Joke } from "../services/JokesData";
import { getJokeText } from "../services/JokesData";
import { Card, PANEL_CLASSES } from "./Card";
import { CopyButton } from "./CopyButton";
import { Button } from "./Button";
import { Skeleton } from "./Skeleton";
import { GroanMeter } from "./GroanMeter";
import { StatusBadge } from "./StatusBadge";
import type { JokeStatus } from "./StatusBadge";
import { CaretRightIcon, HeartIcon, RefreshIcon } from "./icons";
import { GROAN_HASH_MULTIPLIER, GROAN_SCORE_MAX } from "../config";

const MICRO_LABEL_CLASSES =
  "text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-700 dark:text-orange-400";

interface JokeCardProps {
  joke: Joke | null;
  jokeId: number;
  isLoading: boolean;
  error: string | null;
  onToggleFavorite: () => void;
  onNewJoke: () => void;
  isFavorite: boolean;
}

/** Stable pseudo-rating (0-100) derived from the joke text. */
const groanScore = (text: string): number => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * GROAN_HASH_MULTIPLIER + text.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % GROAN_SCORE_MAX;
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
  const jokeText = getJokeText(joke);
  const score = groanScore(jokeText);

  // Only show the skeleton on the first load; keep the joke during refreshes.
  const isInitialLoad = isLoading && !joke;
  const status: JokeStatus = isLoading ? "loading" : error ? "error" : "live";

  return (
    <Card className="flex flex-col justify-between">
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Random Joke
          </h2>
          <StatusBadge status={status} />
        </div>

        <div
          className={`flex min-h-36 items-center justify-center ${PANEL_CLASSES} px-6 py-6 text-center`}
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
              <div
                className={`mb-3 flex items-center justify-center gap-1.5 ${MICRO_LABEL_CLASSES}`}
              >
                <CaretRightIcon className="h-3 w-3" /> Setup / Punchline
              </div>
              <p
                key={jokeId}
                className="animate-fade-in font-serif text-lg italic leading-relaxed text-zinc-900 dark:text-zinc-100 sm:text-xl"
              >
                {jokeText || "This joke is too shy — try another one."}
              </p>
              {jokeText && (
                <span
                  className={`mt-4 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 ${MICRO_LABEL_CLASSES}`}
                >
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
            <GroanMeter score={score} />
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
        <CopyButton
          text={jokeText}
          variant="secondary"
          showLabel
          resetKey={jokeId}
          disabled={!jokeText}
        />
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
    </Card>
  );
};

export default JokeCard;
