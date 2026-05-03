import { ReactNode } from "react";

type Tone = "neutral" | "accent" | "success" | "danger";

export interface AlertProps {
  tone?: Tone;
  title?: string;
  children?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
}

const toneMap: Record<Tone, { bg: string; border: string; fg: string }> = {
  neutral: {
    bg: "var(--ub-surface)",
    border: "var(--ub-border)",
    fg: "var(--ub-fg-soft)",
  },
  accent: {
    bg: "var(--ub-accent-06)",
    border: "var(--ub-accent-border)",
    fg: "var(--ub-accent)",
  },
  success: {
    bg: "rgba(74,222,128,0.06)",
    border: "#2d4a2d",
    fg: "var(--ub-success)",
  },
  danger: {
    bg: "rgba(224,90,90,0.06)",
    border: "rgba(224,90,90,0.3)",
    fg: "var(--ub-danger)",
  },
};

export function Alert({ tone = "neutral", title, children, icon, action }: AlertProps) {
  const t = toneMap[tone];
  return (
    <div
      role="alert"
      style={{
        display: "flex",
        gap: 12,
        padding: "12px 14px",
        background: t.bg,
        border: `1px solid ${t.border}`,
        borderRadius: "var(--ub-radius-lg)",
      }}
    >
      {icon && (
        <span style={{ color: t.fg, flexShrink: 0, marginTop: 1 }}>{icon}</span>
      )}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        {title && (
          <div style={{ color: t.fg, fontSize: 13, fontWeight: 500 }}>{title}</div>
        )}
        {children && (
          <div style={{ color: "var(--ub-fg-muted)", fontSize: 13, lineHeight: "20px" }}>
            {children}
          </div>
        )}
      </div>
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    </div>
  );
}
