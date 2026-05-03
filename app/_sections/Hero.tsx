"use client";
import { Button } from "../../src/components/primitives/Button";
import { LiveRipple } from "../../src/components/flavored/LiveRipple";
import { useToast } from "../../src/components/primitives/Toast";

export function Hero() {
  const toast = useToast();

  const scrollToInstall = () => {
    document
      .getElementById("install")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyInstallCmd = () => {
    const cmd = "npm i @plot/ui";
    navigator.clipboard
      .writeText(cmd)
      .then(() =>
        toast.push({ tone: "success", title: "Copied", body: cmd }),
      )
      .catch(() =>
        toast.push({ tone: "neutral", title: "Copy failed", body: cmd }),
      );
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 32,
        paddingTop: 64,
        paddingBottom: 32,
      }}
    >
      {/* Eyebrow pill */}
      <span
        className="ub-mono"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "5px 11px 5px 8px",
          background: "var(--ub-surface)",
          border: "1px solid var(--ub-border)",
          borderRadius: 999,
          fontSize: 10,
          color: "var(--ub-fg-mutedXX)",
        }}
      >
        <LiveRipple label="V0.0.1" />
        <span style={{ color: "var(--ub-border-strong)" }}>·</span>
        PLOT · UI KIT
        <span style={{ color: "var(--ub-border-strong)" }}>·</span>
        MAINTAINED BY RAHUL
      </span>

      {/* Title */}
      <h1
        style={{
          fontFamily: "var(--ub-font-title)",
          fontWeight: 500,
          fontSize: 96,
          letterSpacing: "-3px",
          lineHeight: 0.96,
          margin: 0,
          maxWidth: 880,
        }}
      >
        Editorial UI for{" "}
        <span style={{ fontStyle: "italic", color: "var(--ub-fg-soft)" }}>
          internal tools.
        </span>
      </h1>

      {/* Subtitle — one line */}
      <p
        style={{
          margin: 0,
          maxWidth: 520,
          color: "var(--ub-fg-muted)",
          fontSize: 16,
          lineHeight: "26px",
          letterSpacing: "-0.1px",
        }}
      >
        Token-driven primitives, dark-first. Drop into any Next.js project.
      </p>

      {/* CTAs */}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Button variant="primary" size="lg" onClick={scrollToInstall}>
          Get started
        </Button>
        <Button variant="ghost" size="lg" onClick={copyInstallCmd}>
          npm i @plot/ui →
        </Button>
      </div>

      {/* Tiny stats row */}
      <div
        style={{
          marginTop: 24,
          display: "inline-flex",
          alignItems: "center",
          gap: 22,
          color: "var(--ub-fg-mutedXX)",
        }}
      >
        {[
          ["38", "components"],
          ["9", "color tokens"],
          ["3", "type families"],
          ["MIT", "license"],
        ].map(([k, v], i) => (
          <span
            key={k}
            style={{
              display: "inline-flex",
              alignItems: "baseline",
              gap: 6,
              borderLeft: i === 0 ? "none" : "1px solid var(--ub-border)",
              paddingLeft: i === 0 ? 0 : 22,
            }}
          >
            <span
              className="ub-mono"
              style={{ color: "var(--ub-fg)", fontSize: 11 }}
            >
              {k}
            </span>
            <span style={{ fontSize: 11 }}>{v}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
