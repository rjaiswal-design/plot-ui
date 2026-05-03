import { ReactNode } from "react";

export function SectionHeader({
  number,
  eyebrow,
  title,
  children,
}: {
  number?: string;
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* number + line + eyebrow row */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {number && (
          <span
            className="ub-mono"
            style={{
              fontSize: 10,
              color: "var(--ub-fg-mutedXX)",
              padding: "3px 7px",
              border: "1px solid var(--ub-border)",
              borderRadius: "var(--ub-radius-xs)",
              background: "var(--ub-bg-deep)",
            }}
          >
            §{number}
          </span>
        )}
        <span
          aria-hidden
          style={{
            flex: "0 1 80px",
            height: 1,
            background:
              "linear-gradient(to right, var(--ub-accent), transparent)",
          }}
        />
        {eyebrow && (
          <span
            className="ub-mono"
            style={{ fontSize: 11, color: "var(--ub-accent)" }}
          >
            {eyebrow}
          </span>
        )}
      </div>

      <h2
        style={{
          fontFamily: "var(--ub-font-title)",
          fontSize: 44,
          fontWeight: 500,
          letterSpacing: "-1.1px",
          lineHeight: 1.05,
          color: "var(--ub-fg)",
          margin: 0,
        }}
      >
        {title}
      </h2>
      {children && (
        <p
          style={{
            color: "var(--ub-fg-muted)",
            fontSize: 15,
            lineHeight: 1.65,
            maxWidth: 580,
            margin: 0,
            marginTop: 2,
          }}
        >
          {children}
        </p>
      )}
    </div>
  );
}
