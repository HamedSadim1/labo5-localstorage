import React, { useState, useEffect } from "react";
import { Joke } from "../services/JokesData";
import { useDarkMode } from "../hooks/useDarkMode";
import { useFavorites } from "../hooks/useFavorites";
import { fetchJoke } from "../utils/api";
import Header from "./Header";
import JokeCard from "./JokeCard";
import FavoritesList from "./FavoritesList";
import Footer from "./Footer";

const DadJoke = () => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const loadJoke = async () => {
    try {
      const newJoke = await fetchJoke();
      setJoke(newJoke);
    } catch (error) {
      console.error("Error loading joke:", error);
    }
  };

  useEffect(() => {
    loadJoke();
  }, []);

  const handleFavoriteJoke = () => {
    if (joke?.attachments[0].text) {
      addFavorite(joke.attachments[0].text);
    }
  };

  const handleNewJoke = () => {
    loadJoke();
  };

  const isFavorite = joke
    ? favorites.includes(joke.attachments[0].text)
    : false;

  return (
    <div
      className={`${
        darkMode
          ? "dark bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900"
          : "bg-linear-to-br from-cyan-100 via-blue-100 to-indigo-100"
      } min-h-screen transition-all duration-500`}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="grid md:grid-cols-2 gap-8">
          <JokeCard
            joke={joke}
            onFavorite={handleFavoriteJoke}
            onNewJoke={handleNewJoke}
            isFavorite={isFavorite}
          />
          <FavoritesList favorites={favorites} onRemove={removeFavorite} />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DadJoke;
