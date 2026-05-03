import { Divider } from "../../src/components/primitives/Divider";
import { MonoLabel } from "../../src/components/flavored/MonoLabel";

export function Footer() {
  return (
    <footer style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Divider label="END" />
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span
            style={{
              fontFamily: "var(--ub-font-title)",
              fontSize: 28,
              letterSpacing: "-0.6px",
              fontWeight: 500,
            }}
          >
            plot/ui
          </span>
          <span style={{ color: "var(--ub-fg-muted)", fontSize: 13 }}>
            Maintained by Rahul. Add components, don&apos;t fork it.
          </span>
        </div>
        <MonoLabel tone="muted">© 2026 · INTERNAL · v0.0.1</MonoLabel>
      </div>
    </footer>
  );
}
