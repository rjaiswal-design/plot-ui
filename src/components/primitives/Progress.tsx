export interface ProgressProps {
  value: number;
  max?: number;
  showValue?: boolean;
  tone?: "accent" | "success" | "danger";
}

export function Progress({ value, max = 100, showValue, tone = "accent" }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const color =
    tone === "success"
      ? "var(--ub-success)"
      : tone === "danger"
      ? "var(--ub-danger)"
      : "var(--ub-accent)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemax={max}
        style={{
          flex: 1,
          height: 4,
          background: "var(--ub-surface-hover)",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: color,
            transition: "width 0.3s var(--ub-ease-standard)",
          }}
        />
      </div>
      {showValue && (
        <span
          className="ub-mono"
          style={{ fontSize: 10, color: "var(--ub-fg-soft)", minWidth: 32, textAlign: "right" }}
        >
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}
