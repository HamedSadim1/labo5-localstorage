/** Custom hook for managing favorite jokes stored in localStorage. */
import { useState, useEffect } from "react";

const STORAGE_KEY = "favoriteJokes";

/** Loads favorites from localStorage, handling legacy string values. */
const loadFavorites = (): string[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    // niet JSON, behandel als string
    return [saved];
  }
};

/** Returns favorites state and functions to add/remove/clear favorites. */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(loadFavorites);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  /** Adds a joke to favorites if not already present. */
  const addFavorite = (joke: string) => {
    setFavorites((prev) => (prev.includes(joke) ? prev : [...prev, joke]));
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
