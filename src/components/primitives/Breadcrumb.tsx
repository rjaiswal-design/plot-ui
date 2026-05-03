import { Fragment, ReactNode } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--ub-font-mono)",
        fontSize: 11,
        letterSpacing: "0.04em",
      }}
    >
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <Fragment key={`${it.label}-${i}`}>
            {it.href && !last ? (
              <a
                href={it.href}
                style={{
                  color: "var(--ub-fg-muted)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {it.icon}
                {it.label}
              </a>
            ) : (
              <span
                style={{
                  color: last ? "var(--ub-fg)" : "var(--ub-fg-muted)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {it.icon}
                {it.label}
              </span>
            )}
            {!last && <span style={{ color: "var(--ub-border-strong)" }}>/</span>}
          </Fragment>
        );
      })}
    </nav>
  );
}
