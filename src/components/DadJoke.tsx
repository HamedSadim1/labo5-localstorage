/** Main component for the Dad Joke application, handling joke fetching, favorites, and dark mode. */
import { useState, useEffect, useCallback, useRef } from "react";
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
  const [jokeId, setJokeId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { favorites, addFavorite, removeFavorite, clearFavorites } =
    useFavorites();

  /** Fetches and sets a new joke. */
  const loadJoke = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const newJoke = await fetchJoke(controller.signal);
      setJoke(newJoke);
      setJokeId((id) => id + 1);
    } catch (err) {
      if ((err as { code?: string })?.code === "ERR_CANCELED") return;
      console.error("Error loading joke:", err);
      const status = (err as { response?: { status?: number } })?.response
        ?.status;
      setError(
        status === 429
          ? "Too many requests — slow down and try again in a moment."
          : navigator.onLine
            ? "Couldn't load a joke. Please try again."
            : "You're offline. Check your connection and try again."
      );
    } finally {
      if (abortRef.current === controller) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadJoke();
    return () => abortRef.current?.abort();
  }, [loadJoke]);

  /** Toggles the current joke in/out of favorites. */
  const handleToggleFavorite = (): void => {
    const text = joke?.attachments?.[0]?.text;
    if (!text) return;
    if (favorites.includes(text)) {
      removeFavorite(text);
    } else {
      addFavorite(text);
    }
  };

  // Determine if the current joke is already a favorite
  const jokeText = joke?.attachments?.[0]?.text ?? "";
  const isFavorite: boolean = jokeText !== "" && favorites.includes(jokeText);

  return (
    <div
      className={`${
        darkMode ? "bg-[#0b0c0f]" : "bg-[#faf6f0]"
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
        <main className="grid items-start gap-6 md:grid-cols-2">
          <JokeCard
            joke={joke}
            jokeId={jokeId}
            isLoading={isLoading}
            error={error}
            onToggleFavorite={handleToggleFavorite}
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
