/** Component for displaying and managing the list of favorite jokes. */
import React from "react";
import { useCopy } from "../hooks/useCopy";
import { Button } from "./Button";
import { CheckIcon, CopyIcon, FrownIcon, XIcon } from "./icons";

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
  const { copy, isCopied } = useCopy(1500);

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
          <Button variant="ghost" size="sm" onClick={onClear}>
            Clear all
          </Button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-300">
            <FrownIcon className="h-6 w-6" />
          </span>
          <div>
            <p className="font-medium text-slate-700 dark:text-slate-200">
              No favorites yet
            </p>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              Click the heart on a joke to save it here.
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
                <Button
                  variant="icon"
                  size="icon"
                  aria-label="Copy joke"
                  onClick={() => copy(fav, String(index))}
                >
                  {isCopied(String(index)) ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <CopyIcon className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="iconDanger"
                  size="icon"
                  aria-label="Remove joke"
                  onClick={() => onRemove(index)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default FavoritesList;
