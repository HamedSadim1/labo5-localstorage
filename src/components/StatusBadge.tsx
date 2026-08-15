/** Status pill showing the current fetch state. */
import React from "react";

export type JokeStatus = "loading" | "error" | "live";

/** Visual treatment for each fetch status. */
const statusConfig: Record<
  JokeStatus,
  { wrap: string; dot: string; label: string }
> = {
  loading: {
    wrap: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
    label: "Loading",
  },
  error: {
    wrap: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
    dot: "bg-rose-500",
    label: "Error",
  },
  live: {
    wrap: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
    label: "Live",
  },
};

interface StatusBadgeProps {
  status: JokeStatus;
}

/** Renders the status pill (Loading / Error / Live). */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const style = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${style.wrap}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
        aria-hidden="true"
      />
      {style.label}
    </span>
  );
};
