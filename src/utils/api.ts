/** Utility functions for API interactions, including fetching jokes. */
import axios from "axios";
import type { Joke } from "../services/JokesData";
import { JOKE_ENDPOINT, REQUEST_TIMEOUT_MS } from "../config";

/** Fetches a random joke from the dad joke API. */
export const fetchJoke = async (signal?: AbortSignal): Promise<Joke> => {
  const response = await axios.get<Joke>(JOKE_ENDPOINT, {
    timeout: REQUEST_TIMEOUT_MS,
    signal,
  });
  return response.data;
};
