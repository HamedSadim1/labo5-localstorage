/** Component for displaying the current joke with options to favorite or get a new one. */
import React from "react";
import { Joke } from "../services/JokesData";

interface JokeCardProps {
  joke: Joke | null;
  onFavorite: () => void;
  onNewJoke: () => void;
  isFavorite: boolean;
}

/** Renders the joke card with favorite and new joke buttons. */
const JokeCard: React.FC<JokeCardProps> = ({
  joke,
  onFavorite,
  onNewJoke,
  isFavorite,
}) => {
  return (
    <div className="backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
      <h2 className="text-2xl font-semibold mb-4 text-center text-white dark:text-gray-100">
        Random Joke
      </h2>
      <div className="text-center mb-6">
        <p className="text-lg italic mb-4 p-4 bg-white/5 dark:bg-black/5 rounded-xl border border-white/10 text-gray-900 dark:text-gray-100 min-h-24 flex items-center justify-center">
          "{joke?.attachments[0].text}"
        </p>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onFavorite}
          className="px-6 py-3 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-full hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!joke || isFavorite}
        >
          ❤️ Favorite
        </button>
        <button
          onClick={onNewJoke}
          className="px-6 py-3 bg-linear-to-r from-blue-500 to-cyan-600 text-white rounded-full hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          🔄 New Joke
        </button>
      </div>
    </div>
  );
};

export default JokeCard;
