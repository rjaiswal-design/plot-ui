"use client";
import { ReactNode, useState } from "react";

export interface ToggleGroupItem {
  value: string;
  label: ReactNode;
}

export interface ToggleGroupProps {
  items: ToggleGroupItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (next: string) => void;
}

export function ToggleGroup({
  items,
  value,
  defaultValue,
  onChange,
}: ToggleGroupProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.value);
  const current = isControlled ? value : internal;
  const select = (v: string) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };
  return (
    <div
      role="group"
      style={{
        display: "inline-flex",
        padding: 3,
        gap: 2,
        background: "var(--ub-surface)",
        border: "1px solid var(--ub-border)",
        borderRadius: "var(--ub-radius-md)",
      }}
    >
      {items.map((it) => {
        const active = it.value === current;
        return (
          <button
            key={it.value}
            type="button"
            aria-pressed={active}
            onClick={() => select(it.value)}
            className="ub-mono"
            style={{
              padding: "5px 11px",
              background: active ? "var(--ub-menu)" : "transparent",
              color: active ? "var(--ub-fg)" : "var(--ub-fg-muted)",
              border: "none",
              borderRadius: "var(--ub-radius-xs)",
              fontSize: 10,
              cursor: "pointer",
              transition: "background 0.12s var(--ub-ease-standard), color 0.12s var(--ub-ease-standard)",
            }}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
