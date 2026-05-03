"use client";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ToastTone = "neutral" | "accent" | "success" | "danger";
interface ToastItem {
  id: number;
  tone: ToastTone;
  title: string;
  body?: string;
}

const ToastCtx = createContext<{ push: (t: Omit<ToastItem, "id">) => void } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const push = useCallback((t: Omit<ToastItem, "id">) => {
    const id = Date.now() + Math.random();
    setItems((s) => [...s, { ...t, id }]);
    setTimeout(() => setItems((s) => s.filter((i) => i.id !== id)), 3500);
  }, []);
  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          zIndex: 60,
        }}
      >
        {items.map((it) => (
          <div
            key={it.id}
            style={{
              minWidth: 240,
              maxWidth: 360,
              padding: "12px 14px",
              background: "var(--ub-surface)",
              border: `1px solid ${
                it.tone === "accent"
                  ? "var(--ub-accent)"
                  : it.tone === "success"
                  ? "var(--ub-success)"
                  : it.tone === "danger"
                  ? "var(--ub-danger)"
                  : "var(--ub-border)"
              }`,
              borderRadius: "var(--ub-radius-lg)",
              boxShadow: "var(--ub-shadow-md)",
              animation: "ub-pop-in 0.18s var(--ub-ease-spring-light)",
            }}
          >
            <div className="ub-mono" style={{ fontSize: 10, color: "var(--ub-fg-mutedXX)", marginBottom: 4 }}>
              {it.tone}
            </div>
            <div style={{ color: "var(--ub-fg)", fontSize: 14, fontWeight: 500 }}>{it.title}</div>
            {it.body && (
              <div style={{ color: "var(--ub-fg-muted)", fontSize: 13, marginTop: 2 }}>
                {it.body}
              </div>
            )}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
