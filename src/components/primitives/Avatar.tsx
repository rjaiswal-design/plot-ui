export interface AvatarProps {
  initials: string;
  active?: boolean;
  size?: number;
  color?: string;
}

export function Avatar({ initials, active = true, size = 36, color = "var(--ub-accent)" }: AvatarProps) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "var(--ub-bg-deep)",
        color: "var(--ub-fg-strong)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--ub-font-mono)",
        fontWeight: 700,
        fontSize: size * 0.32,
        letterSpacing: "0.04em",
        border: `1.5px ${active ? "solid" : "dashed"} ${active ? color : "#8e8e8e"}`,
        textTransform: "uppercase",
      }}
    >
      {initials.slice(0, 2)}
    </span>
  );
}
