"use client";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Kbd } from "./Kbd";

export interface CommandItem {
  id: string;
  label: string;
  group?: string;
  shortcut?: string;
  icon?: ReactNode;
  onSelect?: () => void;
  keywords?: string[];
}

export interface CommandProps {
  open: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
}

export function Command({
  open,
  onClose,
  items,
  placeholder = "Search components, actions, docs…",
}: CommandProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter((it) => {
      const hay = [it.label, it.group, ...(it.keywords ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [items, query]);

  const groups = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    filtered.forEach((it) => {
      const g = it.group ?? "Results";
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push(it);
    });
    return [...map.entries()];
  }, [filtered]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    setTimeout(() => inputRef.current?.focus(), 10);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(filtered.length - 1, i + 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const it = filtered[active];
        if (it) {
          it.onSelect?.();
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, onClose]);

  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--ub-overlay)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "12vh",
        zIndex: 60,
        animation: "ub-fade-in 0.18s var(--ub-ease-standard)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 560,
          maxWidth: "calc(100vw - 32px)",
          background: "var(--ub-surface)",
          border: "1px solid var(--ub-border)",
          borderRadius: "var(--ub-radius-2xl)",
          boxShadow: "var(--ub-shadow-modal)",
          overflow: "hidden",
          animation: "ub-pop-in 0.22s var(--ub-ease-spring-light)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 16px",
            borderBottom: "1px solid var(--ub-border)",
          }}
        >
          <span style={{ color: "var(--ub-fg-muted)" }}>⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder={placeholder}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--ub-fg)",
              fontSize: 15,
              fontFamily: "var(--ub-font-body)",
            }}
          />
          <Kbd>esc</Kbd>
        </div>
        <div style={{ maxHeight: 360, overflowY: "auto", padding: 6 }}>
          {filtered.length === 0 ? (
            <div
              style={{
                padding: "32px 16px",
                textAlign: "center",
                color: "var(--ub-fg-muted)",
                fontSize: 13,
              }}
            >
              No results for <em>{query}</em>
            </div>
          ) : (
            groups.map(([group, list]) => (
              <div key={group}>
                <div
                  className="ub-mono"
                  style={{
                    fontSize: 9,
                    color: "var(--ub-fg-mutedXX)",
                    padding: "10px 10px 6px",
                  }}
                >
                  {group}
                </div>
                {list.map((it) => {
                  const idx = filtered.indexOf(it);
                  const isActive = idx === active;
                  return (
                    <div
                      key={it.id}
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => {
                        it.onSelect?.();
                        onClose();
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "9px 10px",
                        borderRadius: "var(--ub-radius-sm)",
                        background: isActive ? "var(--ub-menu-hover)" : "transparent",
                        color: "var(--ub-fg-soft)",
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ width: 16, color: "var(--ub-fg-muted)" }}>
                        {it.icon ?? "•"}
                      </span>
                      <span style={{ flex: 1 }}>{it.label}</span>
                      {it.shortcut && (
                        <span
                          className="ub-mono"
                          style={{ fontSize: 9, color: "var(--ub-fg-disabled)" }}
                        >
                          {it.shortcut}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 14px",
            borderTop: "1px solid var(--ub-border)",
            color: "var(--ub-fg-muted)",
            fontSize: 11,
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd> navigate
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Kbd>↵</Kbd> select
          </span>
          <span style={{ marginLeft: "auto", display: "inline-flex", gap: 4, alignItems: "center" }}>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </span>
        </div>
      </div>
    </div>
  );
}
