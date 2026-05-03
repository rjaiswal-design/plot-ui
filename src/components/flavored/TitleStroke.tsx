import { ReactNode } from "react";

export interface TitleStrokeProps {
  children: ReactNode;
  size?: number;
  italic?: boolean;
  as?: "h1" | "h2" | "h3";
}

export function TitleStroke({ children, size = 60, italic, as: Tag = "h1" }: TitleStrokeProps) {
  return (
    <Tag
      style={{
        fontFamily: "var(--ub-font-title)",
        fontWeight: 500,
        fontStyle: italic ? "italic" : "normal",
        fontSize: size,
        letterSpacing: size > 48 ? "-1.8px" : "-0.6px",
        lineHeight: 1,
        color: "var(--ub-fg)",
        margin: 0,
      }}
    >
      {children}
    </Tag>
  );
}
