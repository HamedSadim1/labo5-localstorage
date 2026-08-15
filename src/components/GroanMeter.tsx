/** Groan-o-Meter: a rating gauge derived from a joke's groan score. */
import React from "react";
import { groanLabel } from "../utils/groan";
import { GROAN_SCORE_MAX } from "../config";

interface GroanMeterProps {
  score: number;
}

/** Renders the groan rating gauge for a score (0-100). */
export const GroanMeter: React.FC<GroanMeterProps> = ({ score }) => {
  const label = groanLabel(score);

  return (
    <div
      role="meter"
      aria-label={`Groan level: ${label}`}
      aria-valuemin={0}
      aria-valuemax={GROAN_SCORE_MAX}
      aria-valuenow={score}
    >
      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em]">
        <span className="text-zinc-600 dark:text-zinc-400">Groan-o-Meter</span>
        <span className="text-orange-700 dark:text-orange-400">{label}</span>
      </div>
      <div className="relative mt-2 h-1.5 rounded-full bg-zinc-200 dark:bg-white/10">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-amber-400 to-orange-500"
          style={{ width: `${score}%` }}
        />
        <div
          className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-orange-500 dark:border-[#141519]"
          style={{ left: `clamp(7px, ${score}%, calc(100% - 7px))` }}
        />
      </div>
      <div className="mt-1.5 flex flex-wrap justify-between gap-x-2 text-[11px] uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
        <span>Smirk</span>
        <span>Sigh</span>
        <span>Full eye-roll</span>
      </div>
    </div>
  );
};
