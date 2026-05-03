export function Divider({
  vertical,
  dashed,
  label,
}: {
  vertical?: boolean;
  dashed?: boolean;
  label?: string;
}) {
  if (label) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          color: "var(--ub-fg-muted)",
        }}
      >
        <span style={{ flex: 1, height: 1, background: "var(--ub-border)" }} />
        <span className="ub-mono" style={{ fontSize: 10, color: "var(--ub-fg-muted)" }}>
          {label}
        </span>
        <span style={{ flex: 1, height: 1, background: "var(--ub-border)" }} />
      </div>
    );
  }
  return (
    <span
      style={{
        display: "block",
        width: vertical ? 1 : "100%",
        height: vertical ? "100%" : 1,
        background: dashed ? "transparent" : "var(--ub-border)",
        borderLeft: vertical && dashed ? "1px dashed var(--ub-border)" : undefined,
        borderTop: !vertical && dashed ? "1px dashed var(--ub-border)" : undefined,
      }}
    />
  );
}
