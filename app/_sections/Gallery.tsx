import { MonoLabel } from "../../src/components/flavored/MonoLabel";
import { GalleryDemos } from "./GalleryDemos";

export function Gallery() {
  return (
    <section
      id="gallery"
      style={{ display: "flex", flexDirection: "column", gap: 32 }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <MonoLabel tone="muted">§03 · COMPONENTS · 41</MonoLabel>
        <h2
          style={{
            fontFamily: "var(--ub-font-title)",
            fontSize: 40,
            fontWeight: 500,
            letterSpacing: "-1.0px",
            margin: 0,
          }}
        >
          Live, not screenshotted.
        </h2>
        <p
          style={{
            color: "var(--ub-fg-muted)",
            fontSize: 14,
            margin: 0,
            maxWidth: 480,
          }}
        >
          Every primitive below is the actual component. Click, type, drag, open.
        </p>
      </div>
      <GalleryDemos />
    </section>
  );
}
