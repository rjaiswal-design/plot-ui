"use client";
import { useRef, useState, ReactNode } from "react";

export interface BeforeAfterProps {
  before: ReactNode;
  after: ReactNode;
  defaultSplit?: number;
  height?: number;
}

export function BeforeAfter({
  before,
  after,
  defaultSplit = 0.45,
  height = 280,
}: BeforeAfterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(defaultSplit);
  const [dragging, setDragging] = useState(false);

  const onMove = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const next = (clientX - rect.left) / rect.width;
    setSplit(Math.min(0.95, Math.max(0.05, next)));
  };

  return (
    <div
      ref={ref}
      onMouseDown={(e) => {
        setDragging(true);
        onMove(e.clientX);
      }}
      onMouseMove={(e) => dragging && onMove(e.clientX)}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      style={{
        position: "relative",
        width: "100%",
        height,
        borderRadius: 28,
        overflow: "hidden",
        border: "1px solid var(--ub-border)",
        background: "var(--ub-bg-deep)",
        userSelect: "none",
        cursor: "ew-resize",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>{after}</div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: `${split * 100}%`,
          overflow: "hidden",
          borderRight: "1px solid var(--ub-fg-12)",
        }}
      >
        <div style={{ width: ref.current?.clientWidth ?? "100%", height: "100%" }}>{before}</div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          padding: "3px 8px",
          background: "rgba(0,0,0,0.55)",
          color: split > 0.15 ? "var(--ub-fg)" : "var(--ub-fg-muted)",
          fontFamily: "var(--ub-font-mono)",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          borderRadius: "var(--ub-radius-sm)",
        }}
      >
        Before
      </div>
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          padding: "3px 8px",
          background: "rgba(0,0,0,0.55)",
          color: split < 0.85 ? "var(--ub-fg)" : "var(--ub-fg-muted)",
          fontFamily: "var(--ub-font-mono)",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          borderRadius: "var(--ub-radius-sm)",
        }}
      >
        After
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${split * 100}%`,
          width: 2,
          background: "var(--ub-fg)",
          transform: "translateX(-1px)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "var(--ub-fg)",
            color: "#0e0e0e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--ub-font-mono)",
            fontSize: 14,
            fontWeight: 800,
          }}
        >
          ⇆
        </span>
      </div>
    </div>
  );
}
