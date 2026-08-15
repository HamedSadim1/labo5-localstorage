/** Custom hook for managing favorite jokes stored in localStorage. */
import { useState, useEffect } from "react";

const STORAGE_KEY = "favoriteJokes";

/** Returns favorites state and functions to add/remove/clear favorites. */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem(STORAGE_KEY);
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        } else {
          // oude string, maak array
          setFavorites([parsed]);
        }
      } catch {
        // niet JSON, behandel als string
        setFavorites([savedFavorites]);
      }
    }
  }, []);

  /** Adds a joke to favorites if not already present. */
  const addFavorite = (joke: string) => {
    setFavorites((prev) => {
      if (prev.includes(joke)) return prev;
      const next = [...prev, joke];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  /** Removes a favorite joke by index. */
  const removeFavorite = (index: number) => {
    setFavorites((prev) => {
      const next = prev.filter((_, i) => i !== index);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  /** Removes all favorite jokes. */
  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { favorites, addFavorite, removeFavorite, clearFavorites };
};
