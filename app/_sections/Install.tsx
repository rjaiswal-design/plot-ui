import { CodeBlock } from "../../src/components/flavored/CodeBlock";
import { MonoLabel } from "../../src/components/flavored/MonoLabel";

export function Install() {
  return (
    <section
      id="install"
      style={{ display: "flex", flexDirection: "column", gap: 32 }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <MonoLabel tone="muted">§01 · INSTALL</MonoLabel>
        <h2
          style={{
            fontFamily: "var(--ub-font-title)",
            fontSize: 40,
            fontWeight: 500,
            letterSpacing: "-1.0px",
            margin: 0,
          }}
        >
          Three lines and you&rsquo;re in.
        </h2>
        <p
          style={{
            color: "var(--ub-fg-muted)",
            fontSize: 14,
            margin: 0,
            maxWidth: 480,
          }}
        >
          No build step. No runtime config. Tokens are CSS variables — override one,
          the kit follows.
        </p>
      </div>

      <div style={{ width: "100%", maxWidth: 760, display: "flex", flexDirection: "column", gap: 12 }}>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`npm install @plot/ui motion`}
        />
        <CodeBlock
          filename="app/layout.tsx"
          code={`import "@plot/ui/tokens.css";`}
        />
        <CodeBlock
          filename="anywhere.tsx"
          code={`import { Button, Card, Command, BlurReveal } from "@plot/ui";`}
        />
      </div>
    </section>
  );
}
