/** Safe localStorage helpers that never throw (e.g. in private browsing). */
export const storageGet = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const storageSet = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // storage unavailable or full — ignore
  }
};
