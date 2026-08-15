/** Footer component displaying credits and link to the joke API. */
import React from "react";
import { API_BASE_URL } from "@/config";

/** Renders a subtle footer with API credits. */
const Footer: React.FC = () => {
  return (
    <footer className="mt-10 text-center text-sm text-zinc-600 dark:text-zinc-400">
      Powered by{" "}
      <a
        href={API_BASE_URL}
        target="_blank"
        rel="noreferrer"
        className="rounded font-medium text-orange-700 transition-colors hover:text-orange-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
      >
        icanhazdadjoke.com
      </a>
    </footer>
  );
};

export default Footer;
