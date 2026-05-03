"use client";
import { useState } from "react";

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (next: boolean) => void;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
}

export function Checkbox({
  checked,
  defaultChecked,
  onChange,
  label,
  disabled,
  indeterminate,
}: CheckboxProps) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(defaultChecked ?? false);
  const value = isControlled ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(!value);
    onChange?.(!value);
  };
  const filled = value || indeterminate;
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : value}
      onClick={toggle}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span
        aria-hidden
        style={{
          width: 16,
          height: 16,
          borderRadius: "var(--ub-radius-xs)",
          background: filled ? "var(--ub-accent)" : "var(--ub-surface)",
          border: `1px solid ${filled ? "var(--ub-accent)" : "var(--ub-border-strong)"}`,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.12s var(--ub-ease-standard), border-color 0.12s var(--ub-ease-standard)",
        }}
      >
        {indeterminate ? (
          <span
            style={{
              width: 8,
              height: 2,
              background: "#0e0e0e",
              borderRadius: 1,
            }}
          />
        ) : value ? (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M1.5 5.5L4 8L8.5 2"
              stroke="#0e0e0e"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
      {label && (
        <span style={{ color: "var(--ub-fg-soft)", fontSize: 13 }}>{label}</span>
      )}
    </button>
  );
}
