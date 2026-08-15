/** Main component for the Dad Joke application, handling joke fetching, favorites, and dark mode. */
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import type { Joke } from "../services/JokesData";
import { useDarkMode } from "../hooks/useDarkMode";
import { useFavorites } from "../hooks/useFavorites";
import { useTimeout } from "../hooks/useTimeout";
import { fetchJoke } from "../utils/api";
import { ERROR_MESSAGES, HTTP_TOO_MANY_REQUESTS, TOAST_DURATION_MS } from "../config";
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
  const [notice, setNotice] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { favorites, addFavorite, removeFavorite, clearFavorites } =
    useFavorites();
  const { schedule: scheduleNotice } = useTimeout();

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
      if (axios.isCancel(err)) return;
      console.error("Error loading joke:", err);
      const status = axios.isAxiosError(err) ? err.response?.status : undefined;
      setError(
        status === HTTP_TOO_MANY_REQUESTS
          ? ERROR_MESSAGES.rateLimit
          : navigator.onLine
            ? ERROR_MESSAGES.generic
            : ERROR_MESSAGES.offline
      );
    } finally {
      if (abortRef.current === controller) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    void loadJoke();
    return () => abortRef.current?.abort();
  }, [loadJoke]);

  /** Shows a transient toast message that auto-dismisses. */
  const showNotice = (message: string) => {
    setNotice(message);
    scheduleNotice(() => setNotice(null), TOAST_DURATION_MS);
  };

  /** Toggles the current joke in/out of favorites. */
  const handleToggleFavorite = (): void => {
    const text = joke?.attachments?.[0]?.text;
    if (!text) return;
    if (favorites.includes(text)) {
      removeFavorite(text);
    } else if (!addFavorite(text)) {
      showNotice("Favorites are full — remove one first.");
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-orange-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#1a1205]"
        >
          Skip to content
        </a>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main
          id="main-content"
          className="grid items-start gap-6 md:grid-cols-2"
        >
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

      {notice && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-orange-500/40 bg-white px-4 py-2 text-sm font-medium text-orange-700 shadow-lg dark:bg-[#141519] dark:text-orange-300"
        >
          {notice}
        </div>
      )}
    </div>
  );
};

export default DadJoke;
