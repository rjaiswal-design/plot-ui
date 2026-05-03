"use client";
import { useRef, useState } from "react";

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (next: number) => void;
  showValue?: boolean;
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  showValue,
}: SliderProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? min);
  const v = isControlled ? value : internal;
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const pct = ((v - min) / (max - min)) * 100;

  const setFromClient = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const raw = min + ratio * (max - min);
    const stepped = Math.round(raw / step) * step;
    if (!isControlled) setInternal(stepped);
    onChange?.(stepped);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
      <div
        ref={ref}
        onMouseDown={(e) => {
          setDragging(true);
          setFromClient(e.clientX);
        }}
        onMouseMove={(e) => dragging && setFromClient(e.clientX)}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
        style={{
          flex: 1,
          height: 4,
          background: "var(--ub-surface-hover)",
          borderRadius: 999,
          position: "relative",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "0 auto 0 0",
            width: `${pct}%`,
            background: "var(--ub-accent)",
            borderRadius: 999,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${pct}%`,
            transform: "translate(-50%, -50%)",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "var(--ub-fg)",
            border: "2px solid var(--ub-bg)",
            transition: dragging ? "none" : "left 0.06s linear",
          }}
        />
      </div>
      {showValue && (
        <span
          className="ub-mono"
          style={{
            fontSize: 10,
            color: "var(--ub-fg-soft)",
            minWidth: 24,
            textAlign: "right",
          }}
        >
          {v}
        </span>
      )}
    </div>
  );
}
