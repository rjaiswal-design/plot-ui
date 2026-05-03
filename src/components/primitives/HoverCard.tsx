"use client";
import { ReactNode, useRef, useState } from "react";

export function HoverCard({
  trigger,
  children,
  width = 280,
}: {
  trigger: ReactNode;
  children: ReactNode;
  width?: number;
}) {
  const [open, setOpen] = useState(false);
  const closeT = useRef<number | null>(null);
  const show = () => {
    if (closeT.current) window.clearTimeout(closeT.current);
    setOpen(true);
  };
  const hide = () => {
    closeT.current = window.setTimeout(() => setOpen(false), 120);
  };
  return (
    <span
      onMouseEnter={show}
      onMouseLeave={hide}
      style={{ position: "relative", display: "inline-flex" }}
    >
      {trigger}
      {open && (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            width,
            padding: 14,
            background: "var(--ub-menu)",
            border: "1px solid var(--ub-border)",
            borderRadius: "var(--ub-radius-lg)",
            boxShadow: "var(--ub-shadow-md)",
            zIndex: 30,
            animation: "ub-pop-in 0.16s var(--ub-ease-standard)",
          }}
        >
          {children}
        </span>
      )}
    </span>
  );
}
