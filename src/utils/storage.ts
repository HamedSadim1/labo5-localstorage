/** Safe localStorage helpers that never throw (e.g. in private browsing). */
export const storageGet = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const storageSet = (key: string, value: string): boolean => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    // storage unavailable or full — surface to caller so it can warn
    return false;
  }
};
