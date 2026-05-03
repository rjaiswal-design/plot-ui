"use client";
import { useEffect, useState, ReactNode } from "react";

/* Top scroll progress bar (1px orange accent) */
export function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: "transparent",
        zIndex: 80,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: "var(--ub-accent)",
          transition: "width 60ms linear",
        }}
      />
    </div>
  );
}

/* Coordinate marks pinned to the viewport corners — feels like a dev tool */
export function CornerMarks() {
  const tick: React.CSSProperties = {
    position: "fixed",
    fontFamily: "var(--ub-font-mono)",
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: "0.08em",
    color: "var(--ub-fg-mutedXX)",
    zIndex: 70,
    pointerEvents: "none",
  };
  const corner = (text: string, pos: React.CSSProperties) => (
    <span style={{ ...tick, ...pos }}>{text}</span>
  );
  return (
    <>
      {corner("[ N · 00 ]", { top: 14, left: 16 })}
      {corner("PLOT / UI / 0.0.1", { top: 14, right: 16 })}
      {corner("[ S · 99 ]", { bottom: 14, left: 16 })}
      {corner("DEC · 2026", { bottom: 14, right: 16 })}
    </>
  );
}

/* Sticky outline rail — dogfoods our own component */
import { OutlineRail } from "../../src/components/flavored/OutlineRail";

const railSpec = [
  { id: "hero",         major: true,  scrollMin: 0,    scrollMax: 700  },
  { id: "install-eyebrow",                              scrollMin: 700,  scrollMax: 950 },
  { id: "install",      major: true,  scrollMin: 950,  scrollMax: 1700 },
  { id: "install-detail",                               scrollMin: 1700, scrollMax: 1900 },
  { id: "found-eyebrow",                                scrollMin: 1900, scrollMax: 2050 },
  { id: "foundations",  major: true,  scrollMin: 2050, scrollMax: 3100 },
  { id: "found-detail",                                 scrollMin: 3100, scrollMax: 3300 },
  { id: "gallery-eyebrow",                              scrollMin: 3300, scrollMax: 3500 },
  { id: "gallery",      major: true,  scrollMin: 3500, scrollMax: 4900 },
  { id: "footer",                                       scrollMin: 4900, scrollMax: 9999 },
];

export function StickyRail() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 200;
      const hit = railSpec.find((s) => y >= s.scrollMin && y < s.scrollMax);
      if (hit) setActive(hit.id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        left: 18,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 60,
      }}
    >
      <OutlineRail items={railSpec.map(({ id, major }) => ({ id, major }))} activeId={active} />
    </div>
  );
}

/* Page chrome wrapper */
export function PageChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <CornerMarks />
      {/* (Dotted grid is painted via body::before — see globals.css) */}
      {children}
    </>
  );
}
