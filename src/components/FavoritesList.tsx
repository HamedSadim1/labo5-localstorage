/** Component for displaying and managing the list of favorite jokes. */
import React, { useState } from "react";
import { copyText } from "../utils/clipboard";

interface FavoritesListProps {
  favorites: string[];
  onRemove: (index: number) => void;
  onClear: () => void;
}

/** Renders the list of favorite jokes with copy and remove actions. */
const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  onRemove,
  onClear,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  /** Copies a favorite joke to the clipboard. */
  const handleCopy = async (text: string, index: number) => {
    const ok = await copyText(text);
    if (ok) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    }
  };

  return (
    <section className="flex flex-col rounded-3xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl dark:shadow-black/20 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          Favorite Jokes
          <span className="inline-flex items-center justify-center rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-300">
            {favorites.length}
          </span>
        </h2>
        {favorites.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs font-semibold text-slate-400 transition-colors hover:text-rose-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-full px-2 py-1"
          >
            Clear all
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-indigo-500/10 text-2xl">
            <span aria-hidden="true">😢</span>
          </span>
          <div>
            <p className="font-medium text-slate-700 dark:text-slate-200">
              No favorites yet
            </p>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              Click 🤍 on a joke to save it here.
            </p>
          </div>
        </div>
      ) : (
        <ul className="favorites-scroll -mr-2 max-h-72 space-y-3 overflow-y-auto pr-2">
          {favorites.map((fav, index) => (
            <li
              key={`${fav}-${index}`}
              className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4"
            >
              <span className="flex-1 text-sm italic text-slate-800 dark:text-slate-100">
                “{fav}”
              </span>
              <div className="flex shrink-0 gap-1.5">
                <button
                  onClick={() => handleCopy(fav, index)}
                  aria-label="Copy joke"
                  className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-xs text-slate-500 transition-all duration-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95"
                >
                  {copiedIndex === index ? "✅" : "📋"}
                </button>
                <button
                  onClick={() => onRemove(index)}
                  aria-label="Remove joke"
                  className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-xs text-slate-500 transition-all duration-300 hover:border-rose-300 hover:bg-rose-500 hover:text-white dark:hover:border-rose-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 active:scale-95"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default FavoritesList;
