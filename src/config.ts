/** Central configuration and shared constants (single source of truth). */

/* ============ External services ============ */
export const API_BASE_URL = "https://icanhazdadjoke.com";
export const JOKE_ENDPOINT = `${API_BASE_URL}/slack`;
export const REQUEST_TIMEOUT_MS = 10000;

/* ============ HTTP ============ */
export const HTTP_TOO_MANY_REQUESTS = 429;

/* ============ User-facing messages ============ */
export const ERROR_MESSAGES = {
  rateLimit: "Too many requests — slow down and try again in a moment.",
  generic: "Couldn't load a joke. Please try again.",
  offline: "You're offline. Check your connection and try again.",
} as const;

export const NOTICES = {
  favoritesFull: "Favorites are full — remove one first.",
} as const;

/* ============ Timing (ms) ============ */
export const COPY_FEEDBACK_MS = 2000;
export const FAVORITE_HIGHLIGHT_MS = 1600;
export const CONFIRM_RESET_MS = 3000;
export const TOAST_DURATION_MS = 3000;

/* ============ Storage ============ */
export const STORAGE_KEYS = {
  darkMode: "darkMode",
  favoriteJokes: "favoriteJokes",
} as const;

/* ============ Favorites ============ */
export const MAX_FAVORITES = 100;

/* ============ Groan-o-Meter ============ */
export const GROAN_SCORE_MAX = 100;
export const GROAN_HASH_MULTIPLIER = 31;
export const GROAN_SMIRK_MAX = 34;
export const GROAN_CHUCKLE_MAX = 67;
