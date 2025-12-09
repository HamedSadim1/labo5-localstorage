import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="text-center mt-8">
      <div className="backdrop-blur-md bg-white/5 dark:bg-black/5 border border-white/10 rounded-xl p-4 shadow-lg">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Powered by{" "}
          <a
            href="https://icanhazdadjoke.com"
            className="text-blue-400 hover:text-blue-300 transition-colors underline"
          >
            icanhazdadjoke.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
