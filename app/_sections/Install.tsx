"use client";
import { ReactNode, useState } from "react";

import { MonoLabel } from "../../src/components/flavored/MonoLabel";

const REPO_URL = "https://github.com/rjaiswal-design/plot-ui";

export function Install() {
  return (
    <section
      id="install"
      style={{ display: "flex", flexDirection: "column", gap: 28 }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
        }}
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
            Installation.
          </h2>
        </div>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="View on GitHub"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: "var(--ub-radius-sm)",
            border: "1px solid var(--ub-border)",
            color: "var(--ub-fg-muted)",
            background: "var(--ub-surface)",
            transition:
              "color 0.15s ease, border-color 0.15s ease, transform 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--ub-fg)";
            e.currentTarget.style.borderColor = "var(--ub-border-strong)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--ub-fg-muted)";
            e.currentTarget.style.borderColor = "var(--ub-border)";
          }}
        >
          <GitHubMark />
        </a>
      </div>

      {/* Body */}
      <div
        style={{
          width: "100%",
          maxWidth: 760,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <Prose>
          Install Plot UI via npm:
        </Prose>
        <Snippet copyText="npm i @uiplot/ui">
          <ShellLine />
        </Snippet>

        <Prose style={{ marginTop: 4 }}>Or just tell your agent to set it up:</Prose>
        <Snippet
          copyText={`Install Plot UI (npm i @uiplot/ui). Wrap your root layout's children in <ToastProvider /> and import @uiplot/ui/tokens.css at the top of app/layout.tsx.`}
          tone="prose"
        >
          <span style={{ color: "var(--ub-fg-soft)" }}>
            Install Plot UI (<C>npm i @uiplot/ui</C>). Wrap your root
            layout&rsquo;s children in <C>&lt;ToastProvider /&gt;</C> and import{" "}
            <C>@uiplot/ui/tokens.css</C> at the top of <C>app/layout.tsx</C>.
          </span>
        </Snippet>

        <Prose style={{ marginTop: 4 }}>
          If installing manually, add{" "}
          <InlineCode>&lt;ToastProvider /&gt;</InlineCode> to your layout, and import the
          tokens:
        </Prose>
        <Snippet copyText={LAYOUT_SOURCE}>
          <LayoutTsx />
        </Snippet>

        <Prose style={{ marginTop: 4 }}>
          That&rsquo;s it. Now you can use any component from{" "}
          <InlineCode>@uiplot/ui</InlineCode> — like{" "}
          <InlineCode>useToast</InlineCode> — in any client component.
        </Prose>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

function Prose({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <p
      style={{
        color: "var(--ub-fg-muted)",
        fontSize: 14,
        margin: 0,
        lineHeight: 1.6,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code
      style={{
        background: "var(--ub-surface)",
        border: "1px solid var(--ub-border)",
        borderRadius: "var(--ub-radius-xs)",
        padding: "1px 6px",
        fontSize: 12,
        fontFamily: "var(--ub-font-mono)",
        textTransform: "none",
        letterSpacing: 0,
        color: "var(--ub-fg)",
      }}
    >
      {children}
    </code>
  );
}

/** Subtle inline code used inside the agent-prompt snippet. */
function C({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        color: "var(--ub-fg)",
        fontSize: 12.5,
        fontFamily: "var(--ub-font-mono)",
        textTransform: "none",
        letterSpacing: 0,
      }}
    >
      {children}
    </span>
  );
}

interface SnippetProps {
  children: ReactNode;
  copyText: string;
  /** "code" = monospace block, "prose" = monospace block w/ wrapping prose. */
  tone?: "code" | "prose";
}

function Snippet({ children, copyText, tone = "code" }: SnippetProps) {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };
  return (
    <div
      style={{
        position: "relative",
        background: "var(--ub-bg-deep)",
        border: "1px solid var(--ub-border)",
        borderRadius: "var(--ub-radius-lg)",
        overflow: "hidden",
      }}
    >
      <pre
        style={{
          margin: 0,
          padding: tone === "prose" ? "16px 48px 16px 18px" : "16px 48px 16px 18px",
          fontFamily: "var(--ub-font-mono)",
          fontSize: 12.5,
          lineHeight: 1.75,
          color: "var(--ub-fg-soft)",
          overflowX: tone === "prose" ? "visible" : "auto",
          whiteSpace: tone === "prose" ? "normal" : "pre",
          wordBreak: tone === "prose" ? "break-word" : "normal",
        }}
      >
        <code style={{ fontFamily: "inherit" }}>{children}</code>
      </pre>
      <button
        onClick={onCopy}
        aria-label={copied ? "Copied" : "Copy"}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 28,
          height: 28,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          border: "1px solid transparent",
          borderRadius: "var(--ub-radius-xs)",
          color: copied ? "var(--ub-success)" : "var(--ub-fg-mutedXX)",
          cursor: "pointer",
          transition: "color 0.15s ease, border-color 0.15s ease, background 0.15s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = copied
            ? "var(--ub-success)"
            : "var(--ub-fg)";
          e.currentTarget.style.borderColor = "var(--ub-border)";
          e.currentTarget.style.background = "var(--ub-surface)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = copied
            ? "var(--ub-success)"
            : "var(--ub-fg-mutedXX)";
          e.currentTarget.style.borderColor = "transparent";
          e.currentTarget.style.background = "transparent";
        }}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  );
}

/* ── Pre-tokenized snippets ─────────────────────────────────────────────── */

function ShellLine() {
  return (
    <>
      <Tk c="accent">npm</Tk>
      <span> </span>
      <Tk c="success">i</Tk>
      <span> </span>
      <Tk c="fg">@uiplot/ui</Tk>
    </>
  );
}

const LAYOUT_SOURCE = `import { ToastProvider } from "@uiplot/ui";
import "@uiplot/ui/tokens.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}`;

function LayoutTsx() {
  return (
    <>
      <Tk c="accent">import</Tk>
      <span> </span>
      <Tk c="muted">{"{"}</Tk>
      <span> ToastProvider </span>
      <Tk c="muted">{"}"}</Tk>
      <span> </span>
      <Tk c="accent">from</Tk>
      <span> </span>
      <Tk c="success">&quot;@uiplot/ui&quot;</Tk>
      <Tk c="muted">;</Tk>
      {"\n"}
      <Tk c="accent">import</Tk>
      <span> </span>
      <Tk c="success">&quot;@uiplot/ui/tokens.css&quot;</Tk>
      <Tk c="muted">;</Tk>
      {"\n\n"}
      <Tk c="accent">export default function</Tk>
      <span> </span>
      <Tk c="fg">Layout</Tk>
      <Tk c="muted">(</Tk>
      <Tk c="muted">{"{"}</Tk>
      <span> children </span>
      <Tk c="muted">{"}"}: {"{"}</Tk>
      <span> children</span>
      <Tk c="muted">: </Tk>
      <Tk c="fg">React.ReactNode</Tk>
      <span> </span>
      <Tk c="muted">{"})"}</Tk>
      <span> </span>
      <Tk c="muted">{"{"}</Tk>
      {"\n  "}
      <Tk c="accent">return</Tk>
      <span> </span>
      <Tk c="muted">(</Tk>
      {"\n    "}
      <Tk c="muted">&lt;</Tk>
      <Tk c="fg">html</Tk>
      <span> </span>
      <Tk c="soft">lang</Tk>
      <Tk c="muted">=</Tk>
      <Tk c="success">&quot;en&quot;</Tk>
      <Tk c="muted">&gt;</Tk>
      {"\n      "}
      <Tk c="muted">&lt;</Tk>
      <Tk c="fg">body</Tk>
      <Tk c="muted">&gt;</Tk>
      {"\n        "}
      <Tk c="muted">&lt;</Tk>
      <Tk c="fg">ToastProvider</Tk>
      <Tk c="muted">&gt;</Tk>
      <Tk c="muted">{"{"}</Tk>
      <span>children</span>
      <Tk c="muted">{"}"}</Tk>
      <Tk c="muted">&lt;/</Tk>
      <Tk c="fg">ToastProvider</Tk>
      <Tk c="muted">&gt;</Tk>
      {"\n      "}
      <Tk c="muted">&lt;/</Tk>
      <Tk c="fg">body</Tk>
      <Tk c="muted">&gt;</Tk>
      {"\n    "}
      <Tk c="muted">&lt;/</Tk>
      <Tk c="fg">html</Tk>
      <Tk c="muted">&gt;</Tk>
      {"\n  "}
      <Tk c="muted">);</Tk>
      {"\n"}
      <Tk c="muted">{"}"}</Tk>
    </>
  );
}

type TkColor = "accent" | "success" | "fg" | "soft" | "muted";

function Tk({ c, children }: { c: TkColor; children: ReactNode }) {
  const map: Record<TkColor, string> = {
    accent: "var(--ub-accent)",
    success: "var(--ub-success)",
    fg: "var(--ub-fg)",
    soft: "var(--ub-fg-soft)",
    muted: "var(--ub-fg-mutedXX)",
  };
  return <span style={{ color: map[c] }}>{children}</span>;
}

/* ── Icons ──────────────────────────────────────────────────────────────── */

function GitHubMark() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.426 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.481A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <rect
        x="9"
        y="9"
        width="11"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M5 15V6a2 2 0 0 1 2-2h9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <path
        d="m5 12 5 5L20 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
