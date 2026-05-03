"use client";
import { useState } from "react";

export interface PaginationProps {
  total: number;
  page?: number;
  defaultPage?: number;
  onChange?: (page: number) => void;
  siblings?: number;
}

function range(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

export function Pagination({
  total,
  page,
  defaultPage = 1,
  onChange,
  siblings = 1,
}: PaginationProps) {
  const isControlled = page !== undefined;
  const [internal, setInternal] = useState(defaultPage);
  const current = isControlled ? page : internal;
  const go = (p: number) => {
    const next = Math.min(total, Math.max(1, p));
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const start = Math.max(2, current - siblings);
  const end = Math.min(total - 1, current + siblings);
  const pages: (number | "…")[] = [1];
  if (start > 2) pages.push("…");
  pages.push(...range(start, end));
  if (end < total - 1) pages.push("…");
  if (total > 1) pages.push(total);

  const btn = (active: boolean): React.CSSProperties => ({
    minWidth: 28,
    height: 28,
    padding: "0 8px",
    background: active ? "var(--ub-menu)" : "transparent",
    color: active ? "var(--ub-fg)" : "var(--ub-fg-muted)",
    border: "1px solid var(--ub-border)",
    borderRadius: "var(--ub-radius-xs)",
    cursor: "pointer",
    fontFamily: "var(--ub-font-mono)",
    fontSize: 11,
  });

  return (
    <nav
      aria-label="Pagination"
      style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
    >
      <button onClick={() => go(current - 1)} style={btn(false)} aria-label="Previous">
        ‹
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`e-${i}`}
            style={{
              color: "var(--ub-fg-disabled)",
              fontFamily: "var(--ub-font-mono)",
              fontSize: 11,
              padding: "0 4px",
            }}
          >
            …
          </span>
        ) : (
          <button key={p} onClick={() => go(p)} style={btn(p === current)}>
            {p}
          </button>
        ),
      )}
      <button onClick={() => go(current + 1)} style={btn(false)} aria-label="Next">
        ›
      </button>
    </nav>
  );
}
