"use client";
import { useRef, ReactNode, CSSProperties } from "react";

export interface SpotlightCardProps {
  children: ReactNode;
  style?: CSSProperties;
  intensity?: number;
  className?: string;
}

export function SpotlightCard({
  children,
  style,
  intensity = 0.18,
  className,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={className}
      style={{
        position: "relative",
        background: "var(--ub-surface)",
        border: "1px solid var(--ub-border)",
        borderRadius: "var(--ub-radius-xl)",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(360px circle at var(--mx, -200px) var(--my, -200px), rgba(255,88,0,${intensity}), transparent 60%)`,
          transition: "background 60ms linear",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
