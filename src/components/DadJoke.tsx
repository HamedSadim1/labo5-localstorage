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
        darkMode ? "dark bg-[#0b0c0f]" : "bg-[#faf6f0]"
      } relative min-h-screen overflow-hidden transition-colors duration-300`}
    >
      {/* Warm decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-orange-500/10 blur-3xl dark:bg-orange-500/10" />
        <div className="absolute -bottom-40 -left-40 h-[24rem] w-[24rem] rounded-full bg-amber-500/10 blur-3xl dark:bg-amber-500/5" />
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
