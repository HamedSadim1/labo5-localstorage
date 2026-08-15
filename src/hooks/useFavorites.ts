/** Custom hook for managing favorite jokes stored in localStorage. */
import { usePersistedState } from "./usePersistedState";
import { MAX_FAVORITES, STORAGE_KEYS } from "../config";

/** Parses the persisted value into a string array. */
const parseFavorites = (raw: string | null): string[] => {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((x): x is string => typeof x === "string");
    }
    return typeof parsed === "string" ? [parsed] : [];
  } catch {
    // Not JSON — treat the raw string as a single favorite.
    return [raw];
  }
};

/** Serializes favorites for persistence. */
const serializeFavorites = (favorites: string[]): string =>
  JSON.stringify(favorites);

/** Returns favorites state and functions to add/remove/clear favorites. */
export const useFavorites = () => {
  const [favorites, setFavorites] = usePersistedState<string[]>({
    key: STORAGE_KEYS.favoriteJokes,
    parse: parseFavorites,
    serialize: serializeFavorites,
  });

  /**
   * Adds a joke to favorites if not already present and under the cap.
   * Returns true when the joke was actually added.
   */
  const addFavorite = (joke: string): boolean => {
    if (favorites.includes(joke) || favorites.length >= MAX_FAVORITES) {
      return false;
    }
    setFavorites((prev) => {
      if (prev.includes(joke) || prev.length >= MAX_FAVORITES) return prev;
      return [...prev, joke];
    });
    return true;
  };

  /** Removes a favorite joke by its text. */
  const removeFavorite = (joke: string) => {
    setFavorites((prev) => prev.filter((fav) => fav !== joke));
  };

  /** Removes all favorite jokes. */
  const clearFavorites = () => {
    setFavorites([]);
  };

  return { favorites, addFavorite, removeFavorite, clearFavorites };
};
