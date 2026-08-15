/** Main component for the Dad Joke application. */
import { getJokeText } from "../services/JokesData";
import { useDarkMode } from "../hooks/useDarkMode";
import { useFavorites } from "../hooks/useFavorites";
import { useJoke } from "../hooks/useJoke";
import { useNotice } from "../hooks/useNotice";
import { NOTICES } from "../config";
import Header from "./Header";
import JokeCard from "./JokeCard";
import FavoritesList from "./FavoritesList";
import Footer from "./Footer";
import { Toast } from "./Toast";

/** Main component rendering the dad joke app. */
const DadJoke = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { favorites, addFavorite, removeFavorite, clearFavorites } =
    useFavorites();
  const { joke, jokeId, isLoading, error, loadJoke } = useJoke();
  const { notice, showNotice } = useNotice();

  const jokeText = getJokeText(joke);
  const isFavorite = jokeText !== "" && favorites.includes(jokeText);

  /** Toggles the current joke in/out of favorites. */
  const handleToggleFavorite = () => {
    if (!jokeText) return;
    if (favorites.includes(jokeText)) {
      removeFavorite(jokeText);
    } else if (!addFavorite(jokeText)) {
      showNotice(NOTICES.favoritesFull);
    }
  };

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

      <Toast message={notice} />
    </div>
  );
};

export default DadJoke;
