import { LabelHTMLAttributes, ReactNode } from "react";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  optional?: boolean;
}

export function Label({ children, optional, style, ...rest }: LabelProps) {
  return (
    <label
      {...rest}
      className={`ub-mono ${rest.className ?? ""}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 10,
        color: "var(--ub-fg-mutedXX)",
        ...style,
      }}
    >
      {children}
      {optional && (
        <span style={{ color: "var(--ub-fg-disabled)", fontWeight: 500 }}>
          (OPTIONAL)
        </span>
      )}
    </label>
  );
}
