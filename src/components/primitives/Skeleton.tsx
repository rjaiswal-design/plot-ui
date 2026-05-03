"use client";
import { CSSProperties } from "react";

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  style?: CSSProperties;
}

export function Skeleton({ width = "100%", height = 12, radius = 4, style }: SkeletonProps) {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width,
        height,
        borderRadius: radius,
        background:
          "linear-gradient(90deg, var(--ub-surface) 0%, var(--ub-menu-hover) 50%, var(--ub-surface) 100%)",
        backgroundSize: "200% 100%",
        animation: "ub-skeleton 1.4s ease-in-out infinite",
        ...style,
      }}
    />
  );
}
