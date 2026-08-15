/** Reusable button component with shared variants and sizes. */
import React from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "favorite"
  | "accent"
  | "ghost"
  | "icon"
  | "iconDanger";

type ButtonSize = "md" | "sm" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-linear-to-r from-amber-400 to-orange-500 text-[#1a1205] shadow-lg shadow-orange-500/25 hover:from-amber-300 hover:to-orange-400",
  secondary:
    "border border-orange-950/10 bg-white text-zinc-700 hover:bg-orange-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10",
  favorite:
    "text-rose-500 hover:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/10",
  accent:
    "bg-linear-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30 hover:from-rose-600 hover:to-pink-600",
  ghost:
    "text-zinc-400 hover:text-orange-400 dark:text-zinc-500 dark:hover:text-orange-400",
  icon: "border border-orange-950/10 bg-white text-zinc-500 hover:bg-orange-50 hover:text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-200",
  iconDanger:
    "border border-orange-950/10 bg-white text-zinc-500 hover:border-rose-300 hover:bg-rose-500 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:border-rose-500/40 dark:hover:bg-rose-500 dark:hover:text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "rounded-full px-4 py-2.5 text-sm font-semibold",
  sm: "rounded-full px-2 py-1 text-xs font-semibold",
  icon: "h-8 w-8 rounded-full",
};

/** Renders a themed button. */
export const Button: React.FC<ButtonProps> = ({
  variant = "secondary",
  size = "md",
  className = "",
  type = "button",
  children,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-1.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0b0c0f] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
