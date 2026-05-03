"use client";
import { ReactNode, useEffect } from "react";

type Side = "right" | "left" | "bottom";

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  side?: Side;
  width?: number | string;
  height?: number | string;
  title?: string;
  children: ReactNode;
}

export function Sheet({
  open,
  onClose,
  side = "right",
  width = 380,
  height = "60vh",
  title,
  children,
}: SheetProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const panelStyle: React.CSSProperties =
    side === "right"
      ? { right: 0, top: 0, bottom: 0, width, animation: "ub-sheet-right 0.22s var(--ub-ease-emphasis)" }
      : side === "left"
      ? { left: 0, top: 0, bottom: 0, width, animation: "ub-sheet-left 0.22s var(--ub-ease-emphasis)" }
      : { left: 0, right: 0, bottom: 0, height, animation: "ub-sheet-bottom 0.22s var(--ub-ease-emphasis)" };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--ub-overlay-soft)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        zIndex: 50,
        animation: "ub-fade-in 0.18s var(--ub-ease-standard)",
      }}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          background: "var(--ub-surface)",
          borderLeft: side === "right" ? "1px solid var(--ub-border)" : undefined,
          borderRight: side === "left" ? "1px solid var(--ub-border)" : undefined,
          borderTop: side === "bottom" ? "1px solid var(--ub-border)" : undefined,
          padding: 24,
          boxShadow: "var(--ub-shadow-xl)",
          overflow: "auto",
          ...panelStyle,
        }}
      >
        {title && (
          <h3
            style={{
              fontFamily: "var(--ub-font-title)",
              fontSize: 24,
              letterSpacing: "-0.5px",
              fontWeight: 500,
              margin: 0,
              marginBottom: 16,
            }}
          >
            {title}
          </h3>
        )}
        {children}
      </aside>
    </div>
  );
}
