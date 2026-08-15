/** Reusable shimmering placeholder block used during loading. */
import React from "react";
import { cn } from "@/utils/cn";

interface SkeletonProps {
  className?: string;
}

/** Renders a shimmering skeleton block. */
export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => (
  <div className={cn("skeleton", className)} aria-hidden="true" />
);
