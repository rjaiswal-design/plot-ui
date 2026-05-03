"use client";
import { useState } from "react";
import { Popover } from "./Popover";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (next: string) => void;
  placeholder?: string;
}

export function Select({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select…",
}: SelectProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const current = isControlled ? value : internal;
  const selected = options.find((o) => o.value === current);
  const choose = (v: string) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
    setOpen(false);
  };
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      width="trigger"
      trigger={
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            minWidth: 180,
            padding: "9px 12px",
            background: "var(--ub-surface)",
            border: `1px solid ${open ? "var(--ub-accent)" : "var(--ub-border)"}`,
            borderRadius: "var(--ub-radius-md)",
            color: selected ? "var(--ub-fg)" : "var(--ub-fg-muted)",
            fontFamily: "var(--ub-font-body)",
            fontSize: 14,
            cursor: "pointer",
            outline: "none",
            transition: "border-color 0.12s var(--ub-ease-standard)",
          }}
        >
          <span>{selected?.label ?? placeholder}</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 3.5L5 6.5L8 3.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      }
    >
      <ul
        role="listbox"
        style={{
          margin: 0,
          padding: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          maxHeight: 240,
          overflowY: "auto",
        }}
      >
        {options.map((opt) => {
          const active = opt.value === current;
          return (
            <li
              key={opt.value}
              role="option"
              aria-selected={active}
              onClick={() => choose(opt.value)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "7px 10px",
                fontSize: 13,
                color: active ? "var(--ub-fg)" : "var(--ub-fg-soft)",
                background: active ? "var(--ub-menu-hover)" : "transparent",
                borderRadius: "var(--ub-radius-xs)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--ub-menu-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = active
                  ? "var(--ub-menu-hover)"
                  : "transparent")
              }
            >
              <span>{opt.label}</span>
              {active && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M1.5 5.5L4 8L8.5 2"
                    stroke="var(--ub-accent)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </li>
          );
        })}
      </ul>
    </Popover>
  );
}
