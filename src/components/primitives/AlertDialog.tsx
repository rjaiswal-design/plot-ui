"use client";
import { ReactNode, useEffect } from "react";
import { Button } from "./Button";

export interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  destructive?: boolean;
  children?: ReactNode;
}

export function AlertDialog({
  open,
  onClose,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  destructive,
  children,
}: AlertDialogProps) {
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
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
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
          width: 420,
          maxWidth: "calc(100vw - 32px)",
          background: "var(--ub-surface)",
          border: "1px solid var(--ub-border)",
          borderRadius: "var(--ub-radius-2xl)",
          padding: 24,
          boxShadow: "var(--ub-shadow-modal)",
          animation: "ub-pop-in 0.22s var(--ub-ease-spring-light)",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--ub-font-title)",
            fontSize: 24,
            letterSpacing: "-0.5px",
            fontWeight: 500,
            margin: 0,
            marginBottom: 8,
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              color: "var(--ub-fg-muted)",
              fontSize: 14,
              lineHeight: 1.55,
              margin: 0,
              marginBottom: 18,
            }}
          >
            {description}
          </p>
        )}
        {children}
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
          <Button variant="ghost" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            variant={destructive ? "danger" : "primary"}
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
