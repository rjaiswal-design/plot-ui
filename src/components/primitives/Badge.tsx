import { HTMLAttributes } from "react";

type Tone = "neutral" | "accent" | "success" | "danger" | "muted";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

const toneMap: Record<Tone, { bg: string; fg: string; border: string }> = {
  neutral: { bg: "var(--ub-surface-2)", fg: "var(--ub-fg-soft)", border: "var(--ub-border)" },
  accent: { bg: "var(--ub-accent-08)", fg: "var(--ub-accent)", border: "var(--ub-accent-border)" },
  success: { bg: "rgba(74,222,128,0.08)", fg: "var(--ub-success)", border: "#2d4a2d" },
  danger: { bg: "rgba(224,90,90,0.08)", fg: "var(--ub-danger)", border: "rgba(224,90,90,0.3)" },
  muted: { bg: "transparent", fg: "var(--ub-fg-muted)", border: "var(--ub-border)" },
};

export function Badge({ tone = "neutral", style, children, ...rest }: BadgeProps) {
  const t = toneMap[tone];
  return (
    <span
      {...rest}
      className={`ub-mono ${rest.className ?? ""}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "3px 8px",
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.border}`,
        borderRadius: "var(--ub-radius-sm)",
        fontSize: 10,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
