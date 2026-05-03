"use client";
import { InputHTMLAttributes, forwardRef, useState } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  invalid?: boolean;
  iconLeft?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, invalid, iconLeft, style, ...rest },
  ref,
) {
  const [focused, setFocused] = useState(false);
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
      {label && (
        <span
          className="ub-mono"
          style={{ color: "var(--ub-fg-mutedXX)", fontSize: 10 }}
        >
          {label}
        </span>
      )}
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "var(--ub-surface)",
          border: `1px solid ${
            invalid
              ? "var(--ub-danger)"
              : focused
              ? "var(--ub-accent)"
              : "var(--ub-border)"
          }`,
          borderRadius: "var(--ub-radius-md)",
          padding: "9px 12px",
          transition: "border-color 0.15s ease",
        }}
      >
        {iconLeft && <span style={{ color: "var(--ub-fg-muted)" }}>{iconLeft}</span>}
        <input
          ref={ref}
          {...rest}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--ub-fg)",
            fontFamily: "var(--ub-font-body)",
            fontSize: 14,
            width: "100%",
            ...style,
          }}
        />
      </span>
      {hint && (
        <span
          style={{
            color: invalid ? "var(--ub-danger)" : "var(--ub-fg-muted)",
            fontSize: 12,
          }}
        >
          {hint}
        </span>
      )}
    </label>
  );
});
