"use client";
import { CSSProperties, useEffect, useRef, useState } from "react";

const ARC = 270; // total usable arc (deg) — from -135 to +135
const START = -135;

export interface DialProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  size?: number;
  label?: string;
  unit?: string;
  onChange?: (next: number) => void;
}

export function Dial({
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  size = 88,
  label,
  unit,
  onChange,
}: DialProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? min);
  const v = isControlled ? value : internal;
  const dragRef = useRef<{ startY: number; startV: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const ratio = (v - min) / (max - min);
  const angle = START + ratio * ARC;

  const set = (next: number) => {
    const clamped = Math.min(max, Math.max(min, next));
    const stepped = Math.round(clamped / step) * step;
    if (!isControlled) setInternal(stepped);
    onChange?.(stepped);
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => {
      if (!dragRef.current) return;
      const delta = dragRef.current.startY - e.clientY; // up = +
      const sensitivity = e.shiftKey ? 0.25 : 1;
      const range = max - min;
      const next = dragRef.current.startV + (delta / 140) * range * sensitivity;
      set(next);
    };
    const onUp = () => {
      setDragging(false);
      dragRef.current = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging, min, max, step]);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    dragRef.current = { startY: e.clientY, startV: v };
    setDragging(true);
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY / 100;
    set(v + delta * step * (e.shiftKey ? 0.25 : 1));
  };

  // Arc rendering — circle stroke from start to current angle.
  const r = size / 2 - 6;
  const cx = size / 2;
  const cy = size / 2;
  const C = 2 * Math.PI * r;
  const arcLen = (ARC / 360) * C;
  const filledLen = (ratio * ARC / 360) * C;
  // Rotate the SVG so the gap (un-arced sector) is at the bottom.
  const svgRotation = 90 + (360 - ARC) / 2;

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        userSelect: "none",
      }}
    >
      <div
        role="slider"
        aria-valuenow={v}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={label}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onWheel={onWheel}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp" || e.key === "ArrowRight") {
            e.preventDefault();
            set(v + step);
          }
          if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
            e.preventDefault();
            set(v - step);
          }
        }}
        style={{
          position: "relative",
          width: size,
          height: size,
          cursor: dragging ? "grabbing" : "grab",
          outline: "none",
        }}
      >
        <svg
          width={size}
          height={size}
          style={{ display: "block", transform: `rotate(${svgRotation}deg)` }}
        >
          {/* Track */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="var(--ub-border)"
            strokeWidth={2}
            strokeDasharray={`${arcLen} ${C}`}
            strokeLinecap="round"
          />
          {/* Filled arc */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="var(--ub-accent)"
            strokeWidth={2}
            strokeDasharray={`${filledLen} ${C}`}
            strokeLinecap="round"
            style={{ transition: dragging ? "none" : "stroke-dasharray 0.12s var(--ub-ease-standard)" }}
          />
        </svg>

        {/* Knob body */}
        <div
          style={{
            position: "absolute",
            inset: 12,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 30%, #2a2a2a, var(--ub-bg-deep) 70%)",
            border: "1px solid var(--ub-border-strong)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Indicator line */}
          <div
            style={{
              position: "absolute",
              top: 6,
              left: "50%",
              width: 2,
              height: "30%",
              background: "var(--ub-fg)",
              transformOrigin: `1px ${(size - 24) * 0.5 - 6}px`,
              transform: `translateX(-1px) rotate(${angle}deg)`,
              transition: dragging ? "none" : "transform 0.12s var(--ub-ease-standard)",
              borderRadius: 1,
            }}
          />
        </div>

        {/* Value at center (shows on hover/drag) */}
        <span
          className="ub-mono"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: size > 96 ? 13 : 11,
            color: "var(--ub-fg)",
            pointerEvents: "none",
            opacity: dragging ? 1 : 0,
            transition: "opacity 0.15s var(--ub-ease-standard)",
            background: "rgba(14,14,14,0.6)",
            borderRadius: "50%",
            margin: 12,
          }}
        >
          {Math.round(v)}
          {unit}
        </span>
      </div>

      {label && (
        <span
          className="ub-mono"
          style={{ fontSize: 9, color: "var(--ub-fg-mutedXX)" }}
        >
          {label}
          {!dragging && (
            <span style={{ color: "var(--ub-fg)", marginLeft: 6 }}>
              {Math.round(v)}
              {unit}
            </span>
          )}
        </span>
      )}
    </div>
  );
}
