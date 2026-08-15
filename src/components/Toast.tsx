/** Transient toast message shown at the bottom of the screen. */
import React from "react";

interface ToastProps {
  message: string | null;
}

/** Renders a toast when a message is present. */
export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-orange-500/40 bg-white px-4 py-2 text-sm font-medium text-orange-700 shadow-lg dark:bg-[#141519] dark:text-orange-300"
    >
      {message}
    </div>
  );
};
