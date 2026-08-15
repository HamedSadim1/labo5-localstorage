/** Main component for the Dad Joke application, handling joke fetching, favorites, and dark mode. */
import { useState, useEffect, useCallback } from "react";
import { Joke } from "../services/JokesData";
import { useDarkMode } from "../hooks/useDarkMode";
import { useFavorites } from "../hooks/useFavorites";
import { fetchJoke } from "../utils/api";
import Header from "./Header";
import JokeCard from "./JokeCard";
import FavoritesList from "./FavoritesList";
import Footer from "./Footer";

/** Main component rendering the dad joke app. */
const DadJoke = () => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { favorites, addFavorite, removeFavorite, clearFavorites } =
    useFavorites();

  /** Fetches and sets a new joke. */
  const loadJoke = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newJoke = await fetchJoke();
      setJoke(newJoke);
    } catch (err) {
      console.error("Error loading joke:", err);
      setError("Couldn't load a joke. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJoke();
  }, [loadJoke]);

  /** Adds the current joke to favorites. */
  const handleFavoriteJoke = (): void => {
    if (joke?.attachments[0].text) {
      addFavorite(joke.attachments[0].text);
    }
  };

  // Determine if the current joke is already a favorite
  const isFavorite: boolean = joke
    ? favorites.includes(joke.attachments[0].text)
    : false;

  return (
    <div
      className={`${
        darkMode ? "dark bg-slate-950" : "bg-slate-50"
      } relative min-h-screen overflow-hidden transition-colors duration-300`}
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl dark:bg-indigo-500/15" />
        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl dark:bg-violet-500/10" />
        <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-rose-400/10 blur-3xl dark:bg-rose-500/10" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="grid items-stretch gap-6 md:grid-cols-2">
          <JokeCard
            joke={joke}
            isLoading={isLoading}
            error={error}
            onFavorite={handleFavoriteJoke}
            onNewJoke={loadJoke}
            isFavorite={isFavorite}
          />
          <FavoritesList
            favorites={favorites}
            onRemove={removeFavorite}
            onClear={clearFavorites}
          />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DadJoke;
