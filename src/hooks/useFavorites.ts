import { useState, useEffect } from "react";

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

  const addFavorite = (joke: string) => {
    if (!favorites.includes(joke)) {
      const newFavorites = [...favorites, joke];
      setFavorites(newFavorites);
      localStorage.setItem("favoriteJokes", JSON.stringify(newFavorites));
    }
  };

  const removeFavorite = (index: number) => {
    const newFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(newFavorites);
    localStorage.setItem("favoriteJokes", JSON.stringify(newFavorites));
  };

  return { favorites, addFavorite, removeFavorite };
};
