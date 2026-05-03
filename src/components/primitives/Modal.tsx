"use client";
import { ReactNode, useEffect } from "react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  width?: number | string;
}

export function Modal({ open, onClose, title, children, width = 480 }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--ub-overlay)",
        WebkitBackdropFilter: "blur(6px)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        animation: "ub-fade-in 0.18s var(--ub-ease-standard)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width,
          maxWidth: "calc(100vw - 32px)",
          background: "var(--ub-surface)",
          border: "1px solid var(--ub-border)",
          borderRadius: "var(--ub-radius-2xl)",
          padding: 24,
          boxShadow: "var(--ub-shadow-modal)",
          animation: "ub-pop-in 0.22s var(--ub-ease-spring-light)",
        }}
      >
        {title && (
          <h3
            style={{
              fontFamily: "var(--ub-font-title)",
              fontSize: 28,
              letterSpacing: "-0.6px",
              fontWeight: 500,
              margin: 0,
              marginBottom: 12,
            }}
          >
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  );
}
