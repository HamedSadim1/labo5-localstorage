/** Utility to combine and merge Tailwind class names. */
import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges class names, resolving Tailwind conflicts (later wins). */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
