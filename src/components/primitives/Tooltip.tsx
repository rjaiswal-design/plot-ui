"use client";
import { ReactNode, useState } from "react";

export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      {open && (
        <span
          className="ub-mono"
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--ub-menu)",
            color: "var(--ub-fg)",
            padding: "5px 8px",
            border: "1px solid var(--ub-border)",
            borderRadius: "var(--ub-radius-sm)",
            fontSize: 10,
            whiteSpace: "nowrap",
            boxShadow: "var(--ub-shadow-md)",
            animation: "ub-pop-in 0.15s var(--ub-ease-standard)",
            zIndex: 30,
            pointerEvents: "none",
          }}
        >
          {label}
        </span>
      )}
    </span>
  );
}
