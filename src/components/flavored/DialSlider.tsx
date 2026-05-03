"use client";
import { useEffect, useRef, useState } from "react";

export interface DialSliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  /** Track length in px (height for vertical, width for horizontal). */
  length?: number;
  orientation?: "vertical" | "horizontal";
  label?: string;
  unit?: string;
  /** Number of tick marks along the track. */
  ticks?: number;
  onChange?: (next: number) => void;
}

export function DialSlider({
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  length = 140,
  orientation = "vertical",
  label,
  unit,
  ticks = 11,
  onChange,
}: DialSliderProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? min);
  const v = isControlled ? value : internal;
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ start: number; startV: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const isVertical = orientation === "vertical";

  const ratio = (v - min) / (max - min);

  const set = (next: number) => {
    const clamped = Math.min(max, Math.max(min, next));
    const stepped = Math.round(clamped / step) * step;
    if (!isControlled) setInternal(stepped);
    onChange?.(stepped);
  };

  // Drag from anywhere on the cap or track
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return;
      const sensitivity = e.shiftKey ? 0.25 : 1;
      const range = max - min;
      let nextRatio: number;
      if (isVertical) {
        nextRatio = 1 - (e.clientY - rect.top) / rect.height;
      } else {
        nextRatio = (e.clientX - rect.left) / rect.width;
      }
      nextRatio = Math.min(1, Math.max(0, nextRatio));
      // If dragging started, blend between absolute & relative for fine control
      if (e.shiftKey && dragRef.current) {
        const delta =
          (isVertical ? dragRef.current.start - e.clientY : e.clientX - dragRef.current.start) /
          (isVertical ? rect.height : rect.width);
        set(dragRef.current.startV + delta * range * sensitivity);
      } else {
        set(min + nextRatio * range);
      }
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
  }, [dragging, min, max, step, isVertical]);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    let nextRatio: number;
    if (isVertical) {
      nextRatio = 1 - (e.clientY - rect.top) / rect.height;
    } else {
      nextRatio = (e.clientX - rect.left) / rect.width;
    }
    nextRatio = Math.min(1, Math.max(0, nextRatio));
    set(min + nextRatio * (max - min));
    dragRef.current = { start: isVertical ? e.clientY : e.clientX, startV: v };
    setDragging(true);
  };

  // Track + thumb geometry
  const TRACK_THICKNESS = 6;
  const CAP_W = 28;
  const CAP_H = 18;

  const thumbStyle: React.CSSProperties = isVertical
    ? {
        position: "absolute",
        left: "50%",
        bottom: `calc(${ratio * 100}% - ${CAP_H / 2}px)`,
        transform: "translateX(-50%)",
      }
    : {
        position: "absolute",
        top: "50%",
        left: `calc(${ratio * 100}% - ${CAP_W / 2}px)`,
        transform: "translateY(-50%)",
      };

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        userSelect: "none",
      }}
    >
      {/* Track + thumb */}
      <div
        style={{
          position: "relative",
          width: isVertical ? CAP_W + 8 : length,
          height: isVertical ? length : CAP_W + 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Tick marks */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: isVertical ? "column" : "row",
            justifyContent: "space-between",
            pointerEvents: "none",
          }}
        >
          {Array.from({ length: ticks }, (_, i) => {
            const major = i % 5 === 0;
            return (
              <span
                key={i}
                style={{
                  width: isVertical ? (major ? 8 : 4) : 1,
                  height: isVertical ? 1 : major ? 8 : 4,
                  background: major ? "var(--ub-border-strong)" : "var(--ub-border)",
                  alignSelf: isVertical ? "flex-end" : "flex-start",
                }}
              />
            );
          })}
        </div>

        {/* Track + fill */}
        <div
          ref={trackRef}
          role="slider"
          aria-valuenow={v}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label={label}
          aria-orientation={orientation}
          tabIndex={0}
          onPointerDown={onPointerDown}
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
            width: isVertical ? TRACK_THICKNESS : length,
            height: isVertical ? length : TRACK_THICKNESS,
            background: "var(--ub-bg-deep)",
            border: "1px solid var(--ub-border)",
            borderRadius: 999,
            cursor: dragging ? "grabbing" : "pointer",
            outline: "none",
            overflow: "hidden",
          }}
        >
          {/* Filled portion */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: isVertical ? 0 : "auto",
              top: isVertical ? "auto" : 0,
              width: isVertical ? "100%" : `${ratio * 100}%`,
              height: isVertical ? `${ratio * 100}%` : "100%",
              background: "var(--ub-accent)",
              transition: dragging ? "none" : "all 0.12s var(--ub-ease-standard)",
            }}
          />
        </div>

        {/* Cap (the fader thumb) */}
        <div
          aria-hidden
          onPointerDown={onPointerDown}
          style={{
            ...thumbStyle,
            width: isVertical ? CAP_W : CAP_W,
            height: isVertical ? CAP_H : CAP_H,
            background:
              "linear-gradient(180deg, #2a2a2a 0%, var(--ub-bg-deep) 60%, #0a0a0a 100%)",
            border: "1px solid var(--ub-border-strong)",
            borderRadius: 4,
            cursor: dragging ? "grabbing" : "grab",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            flexDirection: isVertical ? "column" : "row",
            transition: dragging ? "none" : "all 0.12s var(--ub-ease-standard)",
          }}
        >
          {/* Grip lines */}
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: isVertical ? 12 : 1,
                height: isVertical ? 1 : 8,
                background: "var(--ub-border-strong)",
              }}
            />
          ))}
        </div>
      </div>

      {label && (
        <span
          className="ub-mono"
          style={{
            fontSize: 9,
            color: "var(--ub-fg-mutedXX)",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {label}
          <span style={{ color: "var(--ub-fg)" }}>
            {Math.round(v)}
            {unit}
          </span>
        </span>
      )}
    </div>
  );
}
