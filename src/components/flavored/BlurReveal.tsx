"use client";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

const DEFAULT_BLUR = 12;
const DEFAULT_DURATION = 2000;

export interface BlurRevealProps {
  children: ReactNode;
  /** Max blur in px applied to the content at the start. */
  blur?: number;
  /** Sweep duration in ms. The blur takes 1.5× this to fade out. */
  duration?: number;
  /** Show a replay button below the banner. */
  replayable?: boolean;
  /** Re-trigger the animation when this value changes. */
  resetKey?: number | string;
  className?: string;
  style?: CSSProperties;
}

export function BlurReveal({
  children,
  blur = DEFAULT_BLUR,
  duration = DEFAULT_DURATION,
  replayable = true,
  resetKey,
  className,
  style,
}: BlurRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  // `phase` controls when the CSS animation classes are applied.
  // 'idle' = pre-animation (banner hidden via clip), 'play' = animating, 'done' = settled.
  const [phase, setPhase] = useState<"idle" | "play" | "done">("idle");
  const [nonce, setNonce] = useState(0);

  // Trigger when scrolled into view (and once after replay)
  useEffect(() => {
    setPhase("idle");
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // small delay so the user sees the start state for a beat
          requestAnimationFrame(() => setPhase("play"));
          obs.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [nonce, resetKey]);

  // Mark done after the slower (blur) animation finishes
  useEffect(() => {
    if (phase !== "play") return;
    const totalMs = duration * 1.5 + 50;
    const t = window.setTimeout(() => setPhase("done"), totalMs);
    return () => window.clearTimeout(t);
  }, [phase, duration, nonce]);

  const replay = () => setNonce((n) => n + 1);

  return (
    <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
      {replayable && (
        <button
          type="button"
          onClick={replay}
          className="ub-mono"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 8px",
            background: "var(--ub-surface)",
            border: "1px solid var(--ub-border)",
            color: "var(--ub-fg-muted)",
            borderRadius: "var(--ub-radius-xs)",
            fontSize: 9,
            cursor: "pointer",
            outline: "none",
            zIndex: 3,
            transition:
              "color 0.12s var(--ub-ease-standard), border-color 0.12s var(--ub-ease-standard)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--ub-fg)";
            e.currentTarget.style.borderColor = "var(--ub-border-strong)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--ub-fg-muted)";
            e.currentTarget.style.borderColor = "var(--ub-border)";
          }}
          aria-label="Replay reveal"
        >
          <ReplayIcon />
          REPLAY
        </button>
      )}
      <div
        ref={rootRef}
        key={nonce}
        className={`ub-blur-reveal ${className ?? ""}`.trim()}
        data-phase={phase}
        style={
          {
            ...style,
            "--ub-br-blur": `${blur}px`,
            "--ub-br-clip": `${duration}ms`,
            "--ub-br-fade": `${duration + duration / 2}ms`,
          } as CSSProperties
        }
      >
        <div className="ub-blur-reveal__banner">{children}</div>
        <Effects />
      </div>
    </div>
  );
}

function Effects() {
  return (
    <div className="ub-blur-reveal__effects" aria-hidden>
      <div className="ub-blur-reveal__blur" />
      <svg className="ub-blur-reveal__noise">
        <filter id="ub-blur-noise">
          <feTurbulence
            baseFrequency="1"
            numOctaves="4"
            stitchTiles="stitch"
            type="fractalNoise"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect filter="url(#ub-blur-noise)" height="100%" width="100%" />
      </svg>
    </div>
  );
}

function ReplayIcon() {
  return (
    <svg width={9} height={9} viewBox="0 0 12 12" fill="none">
      <path
        d="M2 6a4 4 0 1 0 1.2-2.85"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M2 2.2v2h2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Reference contents in the spirit of the original — composes with BlurReveal. */
export function BlurRevealContents({
  label = "Devouring Details",
  cta = "Register Now",
}: {
  label?: string;
  cta?: string;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 16,
        fontSize: 22,
        color: "var(--ub-fg)",
        fontFamily: "var(--ub-font-title)",
      }}
    >
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "var(--ub-accent)",
            display: "inline-block",
          }}
        />
        <span>{label}</span>
      </div>
      <span
        style={{
          background: "var(--ub-accent)",
          color: "#0e0e0e",
          padding: "0 14px",
          height: 30,
          borderRadius: 999,
          display: "inline-flex",
          alignItems: "center",
          fontSize: 13,
          fontFamily: "var(--ub-font-body)",
          fontWeight: 500,
        }}
      >
        {cta}
      </span>
    </div>
  );
}
