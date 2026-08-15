/** Groan-o-Meter rating helpers. */
import {
  GROAN_CHUCKLE_MAX,
  GROAN_HASH_MULTIPLIER,
  GROAN_SCORE_MAX,
  GROAN_SMIRK_MAX,
} from "../config";

/** Stable pseudo-rating (0-100) derived from the joke text. */
export const groanScore = (text: string): number => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * GROAN_HASH_MULTIPLIER + text.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % GROAN_SCORE_MAX;
};

/** Human label for a groan score. */
export const groanLabel = (score: number): string => {
  if (score < GROAN_SMIRK_MAX) return "Smirk";
  if (score < GROAN_CHUCKLE_MAX) return "Mild chuckle";
  return "Full eye-roll";
};
