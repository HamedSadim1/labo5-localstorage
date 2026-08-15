/** Custom hook for managing favorite jokes stored in localStorage. */
import { useState, useEffect } from "react";
import { storageGet, storageSet } from "../utils/storage";

const STORAGE_KEY = "favoriteJokes";
const MAX_FAVORITES = 100;

/** Loads favorites from localStorage, keeping only strings. */
const loadFavorites = (): string[] => {
  const saved = storageGet(STORAGE_KEY);
  if (!saved) return [];
  try {
    const parsed: unknown = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      return parsed.filter((x): x is string => typeof x === "string");
    }
    return typeof parsed === "string" ? [parsed] : [];
  } catch {
    // niet JSON, behandel als string
    return [saved];
  }
};

/** Returns favorites state and functions to add/remove/clear favorites. */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(loadFavorites);

  useEffect(() => {
    if (!storageSet(STORAGE_KEY, JSON.stringify(favorites))) {
      console.warn("Favorites could not be persisted to localStorage.");
    }
  }, [favorites]);

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
