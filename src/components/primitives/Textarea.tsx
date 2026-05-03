"use client";
import { TextareaHTMLAttributes, forwardRef, useState } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, invalid, style, ...rest },
  ref,
) {
  const [focused, setFocused] = useState(false);
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
      {label && (
        <span className="ub-mono" style={{ color: "var(--ub-fg-mutedXX)", fontSize: 10 }}>
          {label}
        </span>
      )}
      <textarea
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
          background: "var(--ub-surface)",
          color: "var(--ub-fg)",
          border: `1px solid ${
            invalid
              ? "var(--ub-danger)"
              : focused
              ? "var(--ub-accent)"
              : "var(--ub-border)"
          }`,
          borderRadius: "var(--ub-radius-md)",
          padding: "10px 12px",
          fontFamily: "var(--ub-font-body)",
          fontSize: 14,
          lineHeight: 1.5,
          resize: "vertical",
          minHeight: 80,
          outline: "none",
          transition: "border-color 0.15s ease",
          ...style,
        }}
      />
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
