import { HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  padded?: boolean;
}

export function Card({ active, padded = true, style, children, ...rest }: CardProps) {
  return (
    <div
      {...rest}
      style={{
        background: "var(--ub-surface)",
        border: `1px solid ${active ? "var(--ub-accent)" : "var(--ub-border)"}`,
        borderRadius: "var(--ub-radius-xl)",
        padding: padded ? 20 : 0,
        transition: "border-color 0.2s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  eyebrow,
  title,
  meta,
}: {
  eyebrow?: string;
  title: string;
  meta?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
      {eyebrow && (
        <span className="ub-mono" style={{ color: "var(--ub-accent)" }}>
          {eyebrow}
        </span>
      )}
      <span
        style={{
          fontSize: 16,
          fontWeight: 500,
          color: "var(--ub-fg)",
          letterSpacing: "-0.13px",
        }}
      >
        {title}
      </span>
      {meta && <span style={{ color: "var(--ub-fg-muted)", fontSize: 13 }}>{meta}</span>}
    </div>
  );
}
