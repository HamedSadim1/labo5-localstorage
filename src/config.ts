/** Central configuration and shared constants. */

/** External service endpoints. */
export const API_BASE_URL = "https://icanhazdadjoke.com";
export const JOKE_ENDPOINT = `${API_BASE_URL}/slack`;

/** Network request settings. */
export const REQUEST_TIMEOUT_MS = 10000;

/** HTTP status codes handled specially. */
export const HTTP_TOO_MANY_REQUESTS = 429;

/** User-facing error messages. */
export const ERROR_MESSAGES = {
  rateLimit: "Too many requests — slow down and try again in a moment.",
  generic: "Couldn't load a joke. Please try again.",
  offline: "You're offline. Check your connection and try again.",
} as const;

/** Transient UI feedback durations (ms). */
export const COPY_FEEDBACK_MS = 2000;
export const FAVORITE_HIGHLIGHT_MS = 1600;
export const CONFIRM_RESET_MS = 3000;
export const TOAST_DURATION_MS = 3000;

/** localStorage keys. */
export const STORAGE_KEYS = {
  darkMode: "darkMode",
  favoriteJokes: "favoriteJokes",
} as const;
