"use client";
import { ReactNode, useState } from "react";

export interface ToggleProps {
  pressed?: boolean;
  defaultPressed?: boolean;
  onChange?: (next: boolean) => void;
  children: ReactNode;
  size?: "sm" | "md";
  disabled?: boolean;
}

export function Toggle({
  pressed,
  defaultPressed,
  onChange,
  children,
  size = "md",
  disabled,
}: ToggleProps) {
  const isControlled = pressed !== undefined;
  const [internal, setInternal] = useState(defaultPressed ?? false);
  const value = isControlled ? pressed : internal;
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(!value);
    onChange?.(!value);
  };
  const pad = size === "sm" ? "5px 8px" : "7px 11px";
  return (
    <button
      type="button"
      aria-pressed={value}
      onClick={toggle}
      disabled={disabled}
      className="ub-mono"
      style={{
        padding: pad,
        background: value ? "var(--ub-menu)" : "transparent",
        color: value ? "var(--ub-fg)" : "var(--ub-fg-muted)",
        border: `1px solid ${value ? "var(--ub-border-strong)" : "var(--ub-border)"}`,
        borderRadius: "var(--ub-radius-sm)",
        fontSize: 10,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background 0.12s var(--ub-ease-standard)",
      }}
    >
      {children}
    </button>
  );
}
