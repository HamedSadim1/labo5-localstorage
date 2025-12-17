/** Custom hook for managing favorite jokes stored in localStorage. */
import { useState, useEffect } from "react";

/** Returns favorites state and functions to add/remove favorites. */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteJokes");
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
    if (!favorites.includes(joke)) {
      const newFavorites = [...favorites, joke];
      setFavorites(newFavorites);
      localStorage.setItem("favoriteJokes", JSON.stringify(newFavorites));
    }
  };

  /** Removes a favorite joke by index. */
  const removeFavorite = (index: number) => {
    const newFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(newFavorites);
    localStorage.setItem("favoriteJokes", JSON.stringify(newFavorites));
  };

  return { favorites, addFavorite, removeFavorite };
};
