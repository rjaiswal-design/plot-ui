"use client";
import { useState } from "react";

export interface RadioOption {
  value: string;
  label: string;
  hint?: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (next: string) => void;
  orientation?: "vertical" | "horizontal";
}

export function RadioGroup({
  options,
  value,
  defaultValue,
  onChange,
  orientation = "vertical",
}: RadioGroupProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? options[0]?.value);
  const current = isControlled ? value : internal;
  const select = (v: string) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };
  return (
    <div
      role="radiogroup"
      style={{
        display: "flex",
        flexDirection: orientation === "vertical" ? "column" : "row",
        gap: orientation === "vertical" ? 8 : 16,
      }}
    >
      {options.map((opt) => {
        const active = opt.value === current;
        return (
          <button
            key={opt.value}
            role="radio"
            type="button"
            aria-checked={active}
            onClick={() => select(opt.value)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "var(--ub-surface)",
                border: `1px solid ${active ? "var(--ub-accent)" : "var(--ub-border-strong)"}`,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.12s var(--ub-ease-standard)",
              }}
            >
              {active && (
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--ub-accent)",
                  }}
                />
              )}
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ color: "var(--ub-fg-soft)", fontSize: 13 }}>{opt.label}</span>
              {opt.hint && (
                <span style={{ color: "var(--ub-fg-muted)", fontSize: 12 }}>{opt.hint}</span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
