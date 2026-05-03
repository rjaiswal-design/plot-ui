"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

export function FocusParagraph({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <p
      ref={ref}
      style={{
        fontFamily: "var(--ub-font-body)",
        fontSize: 16,
        lineHeight: "27px",
        letterSpacing: "-0.16px",
        fontWeight: 300,
        color: active ? "var(--ub-fg-soft)" : "var(--ub-fg-inactive)",
        transition: "color 0.6s ease",
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}
