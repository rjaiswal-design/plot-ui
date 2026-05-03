import { ReactNode } from "react";

export interface PhoneFrameProps {
  children?: ReactNode;
  width?: number;
  height?: number;
}

export function PhoneFrame({ children, width = 244, height = 528 }: PhoneFrameProps) {
  return (
    <div
      style={{
        width,
        height,
        background: "var(--ub-bg-deep)",
        border: "6.5px solid var(--ub-bg-deep)",
        borderRadius: 31,
        overflow: "hidden",
        boxShadow: "var(--ub-shadow-lg)",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "var(--ub-surface)",
          borderRadius: 24,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
