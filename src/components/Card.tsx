/** Shared card shell and panel class strings. */
import React from "react";

const CARD_CLASSES =
  "rounded-3xl border border-orange-950/10 bg-white/80 p-6 shadow-xl shadow-orange-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-[#141519] dark:shadow-black/30 sm:p-8";

export const PANEL_CLASSES =
  "rounded-2xl border border-orange-950/10 bg-orange-50/60 dark:border-white/10 dark:bg-black/30";

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

/** Renders a themed card shell. */
export const Card: React.FC<CardProps> = ({
  className = "",
  children,
  ...rest
}) => (
  <section className={`${CARD_CLASSES} ${className}`} {...rest}>
    {children}
  </section>
);
