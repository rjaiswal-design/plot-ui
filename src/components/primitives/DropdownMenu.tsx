"use client";
import { ReactNode } from "react";
import { Popover } from "./Popover";

export interface DropdownMenuItem {
  id: string;
  label: string;
  onSelect?: () => void;
  shortcut?: string;
  icon?: ReactNode;
  destructive?: boolean;
  disabled?: boolean;
}

export interface DropdownMenuProps {
  trigger: ReactNode;
  items: (DropdownMenuItem | "separator")[];
  width?: number;
}

export function DropdownMenu({ trigger, items, width = 200 }: DropdownMenuProps) {
  return (
    <Popover
      trigger={trigger}
      width={width}
      placement="bottom-start"
      contentStyle={{ padding: 4 }}
    >
      <ul
        role="menu"
        style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 1 }}
      >
        {items.map((it, i) => {
          if (it === "separator") {
            return (
              <li
                key={`sep-${i}`}
                aria-hidden
                style={{
                  margin: "4px 6px",
                  height: 1,
                  background: "var(--ub-border)",
                }}
              />
            );
          }
          return (
            <li
              key={it.id}
              role="menuitem"
              aria-disabled={it.disabled}
              onClick={() => !it.disabled && it.onSelect?.()}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "7px 10px",
                fontSize: 13,
                color: it.disabled
                  ? "var(--ub-fg-disabled)"
                  : it.destructive
                  ? "var(--ub-danger)"
                  : "var(--ub-fg-soft)",
                cursor: it.disabled ? "not-allowed" : "pointer",
                borderRadius: "var(--ub-radius-xs)",
              }}
              onMouseEnter={(e) =>
                !it.disabled && (e.currentTarget.style.background = "var(--ub-menu-hover)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {it.icon && <span style={{ flexShrink: 0 }}>{it.icon}</span>}
              <span style={{ flex: 1 }}>{it.label}</span>
              {it.shortcut && (
                <span
                  className="ub-mono"
                  style={{ fontSize: 9, color: "var(--ub-fg-disabled)" }}
                >
                  {it.shortcut}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </Popover>
  );
}
