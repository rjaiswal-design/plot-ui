import { HTMLAttributes, ReactNode } from "react";

export interface MonoLabelProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "default" | "accent" | "muted";
  children: ReactNode;
}

export function MonoLabel({ tone = "default", style, children, ...rest }: MonoLabelProps) {
  const color =
    tone === "accent"
      ? "var(--ub-accent)"
      : tone === "muted"
      ? "var(--ub-fg-mutedXX)"
      : "var(--ub-fg)";
  return (
    <span
      {...rest}
      className={`ub-mono ${rest.className ?? ""}`}
      style={{ color, ...style }}
    >
      {children}
    </span>
  );
}
