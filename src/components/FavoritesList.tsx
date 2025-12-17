/** Component for displaying and managing the list of favorite jokes. */
import React from "react";

interface FavoritesListProps {
  favorites: string[];
  onRemove: (index: number) => void;
}

/** Renders the list of favorite jokes with remove buttons. */
const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  onRemove,
}) => {
  return (
    <div className="backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-2xl min-h-80 flex flex-col">
      <h2 className="text-2xl font-semibold mb-4 text-center text-white dark:text-gray-100">
        Favorite Jokes
      </h2>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No favorites yet! 😢
        </p>
      ) : (
        <ul className="space-y-3 max-h-48 overflow-y-auto">
          {favorites.map((fav, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white/5 dark:bg-black/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm"
            >
              <span className="flex-1 italic text-sm text-gray-900 dark:text-gray-100">
                "{fav}"
              </span>
              <button
                onClick={() => onRemove(index)}
                className="ml-2 px-3 py-1 bg-linear-to-r from-red-500 to-pink-600 text-white rounded-full hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;
