/** Reusable button component with shared variants and sizes. */
import React from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
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
    "bg-linear-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/30 hover:from-indigo-600 hover:to-violet-600 hover:shadow-xl hover:shadow-indigo-500/30",
  secondary:
    "border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10",
  accent:
    "bg-linear-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30 hover:from-rose-600 hover:to-pink-600",
  ghost: "text-slate-400 hover:text-rose-500",
  icon: "border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-700 dark:hover:text-slate-200",
  iconDanger:
    "border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-500 hover:border-rose-300 hover:bg-rose-500 hover:text-white dark:hover:border-rose-500/40",
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
      className={`inline-flex items-center justify-center gap-1.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
