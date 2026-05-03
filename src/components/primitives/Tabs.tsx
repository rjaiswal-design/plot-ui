"use client";
import { useState, ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export function Tabs({ items, defaultId }: { items: TabItem[]; defaultId?: string }) {
  const [active, setActive] = useState(defaultId ?? items[0]?.id);
  const current = items.find((i) => i.id === active);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        role="tablist"
        style={{
          display: "inline-flex",
          gap: 4,
          padding: 3,
          background: "var(--ub-surface)",
          border: "1px solid var(--ub-border)",
          borderRadius: "var(--ub-radius-md)",
          alignSelf: "flex-start",
        }}
      >
        {items.map((it) => {
          const isActive = it.id === active;
          return (
            <button
              key={it.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(it.id)}
              className="ub-mono"
              style={{
                padding: "6px 12px",
                fontSize: 10,
                color: isActive ? "var(--ub-fg)" : "var(--ub-fg-muted)",
                background: isActive ? "var(--ub-menu)" : "transparent",
                border: "none",
                borderRadius: "var(--ub-radius-sm)",
                cursor: "pointer",
                transition: "background 0.15s ease, color 0.15s ease",
              }}
            >
              {it.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel">{current?.content}</div>
    </div>
  );
}
