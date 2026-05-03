import { ReactNode } from "react";

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <span
      className="ub-mono"
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 6px",
        background: "var(--ub-menu)",
        color: "var(--ub-fg-soft)",
        border: "1px solid var(--ub-border)",
        borderRadius: "var(--ub-radius-xs)",
        fontSize: 10,
        boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.4)",
      }}
    >
      {children}
    </span>
  );
}
