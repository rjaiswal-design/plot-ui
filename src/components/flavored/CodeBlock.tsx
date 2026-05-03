"use client";
import { useState } from "react";

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = "tsx", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };
  return (
    <div
      style={{
        background: "var(--ub-bg-deep)",
        border: "1px solid var(--ub-border)",
        borderRadius: "var(--ub-radius-lg)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          borderBottom: "1px solid var(--ub-border)",
          background: "var(--ub-surface)",
        }}
      >
        <span
          className="ub-mono"
          style={{ fontSize: 10, color: "var(--ub-fg-mutedXX)" }}
        >
          {filename ?? language}
        </span>
        <button
          onClick={onCopy}
          className="ub-mono"
          style={{
            background: "transparent",
            border: "1px solid var(--ub-border)",
            color: copied ? "var(--ub-success)" : "var(--ub-fg-soft)",
            padding: "3px 8px",
            fontSize: 9,
            borderRadius: "var(--ub-radius-xs)",
            cursor: "pointer",
            transition: "color 0.15s ease, border-color 0.15s ease",
          }}
        >
          {copied ? "COPIED" : "COPY"}
        </button>
      </div>
      <pre
        style={{
          margin: 0,
          padding: "14px 16px",
          fontFamily: "var(--ub-font-mono)",
          fontSize: 12,
          lineHeight: 1.7,
          color: "var(--ub-fg-soft)",
          overflowX: "auto",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
