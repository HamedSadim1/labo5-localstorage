/** Footer component displaying credits and link to the joke API. */
import React from "react";

/** Renders a subtle footer with API credits. */
const Footer: React.FC = () => {
  return (
    <footer className="mt-10 text-center text-sm text-slate-400 dark:text-slate-500">
      Powered by{" "}
      <a
        href="https://icanhazdadjoke.com"
        target="_blank"
        rel="noreferrer"
        className="font-medium text-indigo-500 dark:text-indigo-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-300 hover:underline"
      >
        icanhazdadjoke.com
      </a>
    </footer>
  );
};

export default Footer;
