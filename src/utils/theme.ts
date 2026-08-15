/** Theme and browser-preference helpers. */

/** Whether the OS currently prefers a dark color scheme. */
export const systemPrefersDark = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
