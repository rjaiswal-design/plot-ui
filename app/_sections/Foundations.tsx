import { MonoLabel } from "../../src/components/flavored/MonoLabel";

const colors = [
  { name: "bg", hex: "#111111" },
  { name: "surface", hex: "#161616" },
  { name: "menu", hex: "#252525" },
  { name: "border", hex: "#2a2a2a" },
  { name: "fg", hex: "#f0f0f0" },
  { name: "muted", hex: "#a0a0a0" },
  { name: "accent", hex: "#ff5800" },
  { name: "success", hex: "#4ade80" },
  { name: "danger", hex: "#e05a5a" },
];

const radii = [3, 6, 8, 12, 16];

export function Foundations() {
  return (
    <section
      id="foundations"
      style={{ display: "flex", flexDirection: "column", gap: 32 }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <MonoLabel tone="muted">§02 · FOUNDATIONS</MonoLabel>
        <h2
          style={{
            fontFamily: "var(--ub-font-title)",
            fontSize: 40,
            fontWeight: 500,
            letterSpacing: "-1.0px",
            margin: 0,
          }}
        >
          Tokens, type, geometry.
        </h2>
      </div>

      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 12,
          alignItems: "stretch",
        }}
      >
        {/* Color row */}
        <div
          style={{
            gridColumn: "1 / -1",
            border: "1px solid var(--ub-border)",
            borderRadius: "var(--ub-radius-xl)",
            background: "var(--ub-surface)",
            padding: "16px 20px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <MonoLabel tone="muted">COLOR · 9 BASE TOKENS</MonoLabel>
            <MonoLabel tone="muted">HEX</MonoLabel>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: 6 }}>
            {colors.map((c) => (
              <div key={c.name} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div
                  style={{
                    aspectRatio: "1 / 1",
                    background: c.hex,
                    border: "1px solid var(--ub-border)",
                    borderRadius: "var(--ub-radius-md)",
                  }}
                />
                <span className="ub-mono" style={{ fontSize: 9, color: "var(--ub-fg)" }}>
                  {c.name}
                </span>
                <span
                  style={{
                    fontFamily: "var(--ub-font-mono)",
                    fontSize: 9,
                    color: "var(--ub-fg-muted)",
                  }}
                >
                  {c.hex}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Type sample */}
        <div
          style={{
            border: "1px solid var(--ub-border)",
            borderRadius: "var(--ub-radius-xl)",
            background: "var(--ub-surface)",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <MonoLabel tone="muted">TYPE · 3 FAMILIES</MonoLabel>
            <MonoLabel tone="muted">SCALE</MonoLabel>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <div className="ub-mono" style={{ color: "var(--ub-fg-mutedXX)", fontSize: 9, marginBottom: 4 }}>
                CORMORANT GARAMOND · TITLE
              </div>
              <div
                style={{
                  fontFamily: "var(--ub-font-title)",
                  fontSize: 32,
                  letterSpacing: "-0.8px",
                  lineHeight: 1,
                }}
              >
                Devouring details
              </div>
            </div>
            <div>
              <div className="ub-mono" style={{ color: "var(--ub-fg-mutedXX)", fontSize: 9, marginBottom: 4 }}>
                JETBRAINS MONO · LABEL
              </div>
              <div className="ub-mono" style={{ fontSize: 13 }}>
                METRIC · VALUE · STATUS
              </div>
            </div>
            <div>
              <div className="ub-mono" style={{ color: "var(--ub-fg-mutedXX)", fontSize: 9, marginBottom: 4 }}>
                INTER · BODY
              </div>
              <p style={{ margin: 0, color: "var(--ub-fg-soft)", fontSize: 14, lineHeight: "22px" }}>
                Body copy stays soft and slow. Long lines, generous leading.
              </p>
            </div>
          </div>
        </div>

        {/* Radii */}
        <div
          style={{
            border: "1px solid var(--ub-border)",
            borderRadius: "var(--ub-radius-xl)",
            background: "var(--ub-surface)",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <MonoLabel tone="muted">RADII · 5 STEPS</MonoLabel>
            <MonoLabel tone="muted">PX</MonoLabel>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-end", justifyContent: "space-between" }}>
            {radii.map((r) => (
              <div key={r} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    background: "var(--ub-bg-deep)",
                    border: "1px solid var(--ub-border-strong)",
                    borderRadius: r,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--ub-font-mono)",
                    fontSize: 10,
                    color: "var(--ub-fg-muted)",
                  }}
                >
                  {r}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
