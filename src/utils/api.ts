import axios from "axios";
import { Joke } from "../services/JokesData";

export const fetchJoke = async (): Promise<Joke> => {
  const response = await axios.get("https://icanhazdadjoke.com/slack");
  return response.data;
};
