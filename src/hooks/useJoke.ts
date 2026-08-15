/** Hook for fetching and managing the current joke. */
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import type { Joke } from "@/services/JokesData";
import { fetchJoke } from "@/utils/api";
import { ERROR_MESSAGES, HTTP_TOO_MANY_REQUESTS } from "@/config";

/** Returns the current joke, its load state, and a function to fetch a new one. */
export const useJoke = () => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [jokeId, setJokeId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

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

  return { joke, jokeId, isLoading, error, loadJoke };
};
