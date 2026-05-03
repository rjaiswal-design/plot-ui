"use client";
import { CSSProperties, ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const sizeStyle: Record<Size, CSSProperties> = {
  sm: { padding: "6px 10px", fontSize: 10, letterSpacing: "0.08em" },
  md: { padding: "9px 14px", fontSize: 11, letterSpacing: "0.06em" },
  lg: { padding: "12px 18px", fontSize: 12, letterSpacing: "0.05em" },
};

const variantStyle: Record<Variant, CSSProperties> = {
  primary: {
    background: "var(--ub-accent)",
    color: "#0e0e0e",
    border: "1px solid var(--ub-accent)",
  },
  secondary: {
    background: "var(--ub-surface)",
    color: "var(--ub-fg)",
    border: "1px solid var(--ub-border)",
  },
  ghost: {
    background: "transparent",
    color: "var(--ub-fg-soft)",
    border: "1px solid transparent",
  },
  outline: {
    background: "transparent",
    color: "var(--ub-fg)",
    border: "1px solid var(--ub-border)",
  },
  danger: {
    background: "transparent",
    color: "var(--ub-danger)",
    border: "1px solid rgba(224,90,90,0.3)",
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", fullWidth, iconLeft, iconRight, style, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      {...rest}
      style={{
        fontFamily: "var(--ub-font-mono)",
        fontWeight: 700,
        textTransform: "uppercase",
        borderRadius: "var(--ub-radius-md)",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        width: fullWidth ? "100%" : undefined,
        transition: "background 0.15s ease, border-color 0.15s ease, color 0.15s ease",
        ...sizeStyle[size],
        ...variantStyle[variant],
        ...style,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        if (variant === "primary") el.style.background = "var(--ub-accent-hover)";
        if (variant === "secondary") el.style.background = "var(--ub-menu-hover)";
        if (variant === "ghost") el.style.background = "var(--ub-accent-06)";
        if (variant === "outline") el.style.borderColor = "var(--ub-border-strong)";
        if (variant === "danger") el.style.background = "rgba(224,90,90,0.08)";
        rest.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        const base = variantStyle[variant];
        el.style.background = (base.background as string) ?? "transparent";
        el.style.borderColor = (base.border as string)?.split(" ")[2] ?? "transparent";
        rest.onMouseLeave?.(e);
      }}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
});
