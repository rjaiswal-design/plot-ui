"use client";
import { ReactNode, useEffect, useRef, useState, CSSProperties } from "react";

type Placement = "bottom" | "top" | "bottom-start" | "bottom-end";

export interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  placement?: Placement;
  offset?: number;
  width?: number | "trigger";
  open?: boolean;
  onOpenChange?: (next: boolean) => void;
  contentStyle?: CSSProperties;
}

export function Popover({
  trigger,
  children,
  placement = "bottom-start",
  offset = 6,
  width,
  open: controlled,
  onOpenChange,
  contentStyle,
}: PopoverProps) {
  const [internal, setInternal] = useState(false);
  const isControlled = controlled !== undefined;
  const open = isControlled ? controlled : internal;
  const setOpen = (n: boolean) => {
    if (!isControlled) setInternal(n);
    onOpenChange?.(n);
  };

  const triggerRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number; w?: number }>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    if (!open) return;
    const place = () => {
      const t = triggerRef.current?.getBoundingClientRect();
      const c = contentRef.current?.getBoundingClientRect();
      if (!t) return;
      const w = width === "trigger" ? t.width : c?.width ?? 200;
      let top = t.bottom + offset;
      let left = t.left;
      if (placement === "top") top = t.top - (c?.height ?? 0) - offset;
      if (placement === "bottom-end") left = t.right - w;
      // viewport-relative coords (we use position: fixed below)
      setPos({ top, left, w });
    };
    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open, placement, offset, width]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        contentRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      )
        return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <span
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        style={{ display: "inline-flex" }}
      >
        {trigger}
      </span>
      {open && (
        <div
          ref={contentRef}
          role="dialog"
          style={{
            position: "fixed",
            top: pos.top,
            left: pos.left,
            width: width === "trigger" ? pos.w : width,
            background: "var(--ub-menu)",
            border: "1px solid var(--ub-border)",
            borderRadius: "var(--ub-radius-md)",
            boxShadow: "var(--ub-shadow-md)",
            padding: 6,
            zIndex: 50,
            animation: "ub-pop-in 0.14s var(--ub-ease-standard)",
            ...contentStyle,
          }}
        >
          {children}
        </div>
      )}
    </>
  );
}
