/** Reusable shimmering placeholder block used during loading. */
import React from "react";

interface SkeletonProps {
  className?: string;
}

/** Renders a shimmering skeleton block. */
export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => (
  <div className={`skeleton ${className}`} aria-hidden="true" />
);
