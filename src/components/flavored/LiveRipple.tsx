export interface LiveRippleProps {
  label?: string;
  color?: string;
}

export function LiveRipple({ label = "LIVE", color = "var(--ub-success)" }: LiveRippleProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "3px 8px 3px 6px",
        background: "rgba(74,222,128,0.06)",
        border: "1px solid #2d4a2d",
        borderRadius: "var(--ub-radius-sm)",
      }}
    >
      <span
        style={{
          position: "relative",
          width: 16,
          height: 16,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: color,
            animation: "ub-ripple 1.6s ease-out infinite",
          }}
        />
        <span
          style={{
            position: "absolute",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: color,
            animation: "ub-ripple 1.6s ease-out 0.6s infinite",
          }}
        />
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: color,
            position: "relative",
            zIndex: 1,
          }}
        />
      </span>
      <span className="ub-mono" style={{ fontSize: 10, color }}>
        {label}
      </span>
    </span>
  );
}
