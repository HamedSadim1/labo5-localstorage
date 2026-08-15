/** Component for displaying and managing the list of favorite jokes. */
import React, { useEffect, useRef, useState } from "react";
import { Card, PANEL_CLASSES } from "./Card";
import { CopyButton } from "./CopyButton";
import { Button } from "./Button";
import { FrownIcon, XIcon } from "./icons";
import { useTimeout } from "../hooks/useTimeout";
import {
  CONFIRM_RESET_MS,
  COPY_FEEDBACK_MS,
  FAVORITE_HIGHLIGHT_MS,
} from "../config";

interface FavoritesListProps {
  favorites: string[];
  onRemove: (joke: string) => void;
  onClear: () => void;
}

/** Renders the list of favorite jokes with copy and remove actions. */
const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  onRemove,
  onClear,
}) => {
  const [confirmingClear, setConfirmingClear] = useState(false);
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const prevFavoritesRef = useRef<string[]>(favorites);
  const { schedule: scheduleConfirm, cancel: cancelConfirm } = useTimeout();
  const { schedule: scheduleHighlight } = useTimeout();

  // Briefly highlight a newly added favorite for feedback.
  useEffect(() => {
    const prev = prevFavoritesRef.current;
    if (favorites.length > prev.length) {
      const added = favorites[favorites.length - 1];
      setHighlighted(added);
      scheduleHighlight(() => setHighlighted(null), FAVORITE_HIGHLIGHT_MS);
    }
    prevFavoritesRef.current = favorites;
  }, [favorites, scheduleHighlight]);

  /** Clears favorites after a two-step confirmation. */
  const handleClearClick = () => {
    if (confirmingClear) {
      onClear();
      setConfirmingClear(false);
      cancelConfirm();
      return;
    }
    setConfirmingClear(true);
    scheduleConfirm(() => setConfirmingClear(false), CONFIRM_RESET_MS);
  };

  return (
    <Card className="flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Favorite Jokes
          <span className="grid h-5 min-w-5 place-items-center rounded-full bg-orange-500 px-1 text-xs font-bold text-[#1a1205]">
            {favorites.length}
          </span>
        </h2>
        {favorites.length > 0 && (
          <Button
            variant={confirmingClear ? "accent" : "ghost"}
            size="sm"
            onClick={handleClearClick}
          >
            {confirmingClear ? "Confirm clear?" : "Clear all"}
          </Button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-orange-500/10 text-orange-700 dark:text-orange-400">
            <FrownIcon className="h-6 w-6" />
          </span>
          <div>
            <p className="font-medium text-zinc-700 dark:text-zinc-200">
              No favorites yet
            </p>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Click the heart on a joke to save it here.
            </p>
          </div>
        </div>
      ) : (
        <ul
          className="favorites-scroll -mr-2 max-h-72 space-y-3 overflow-y-auto pr-2"
          aria-live="polite"
        >
          {favorites.map((fav) => (
            <li
              key={fav}
              className={`flex items-start justify-between gap-3 ${PANEL_CLASSES} p-4 transition-all duration-300 ${
                highlighted === fav ? "ring-2 ring-orange-400/60" : ""
              }`}
            >
              <p className="flex-1 font-serif text-sm italic leading-relaxed text-zinc-800 dark:text-zinc-100">
                “{fav}”
              </p>
              <div className="flex shrink-0 gap-1">
                <CopyButton
                  text={fav}
                  id={fav}
                  variant="icon"
                  size="icon"
                  duration={COPY_FEEDBACK_MS}
                />
                <Button
                  variant="iconDanger"
                  size="icon"
                  aria-label="Remove joke"
                  onClick={() => onRemove(fav)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default FavoritesList;
