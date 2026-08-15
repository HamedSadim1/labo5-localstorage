/** Utility functions for API interactions, including fetching jokes. */
import axios from "axios";
import { Joke } from "../services/JokesData";

/** Fetches a random joke from the dad joke API. */
export const fetchJoke = async (signal?: AbortSignal): Promise<Joke> => {
  const response = await axios.get<Joke>(
    "https://icanhazdadjoke.com/slack",
    {
      timeout: 10000,
      signal,
    }
  );
  return response.data;
};
