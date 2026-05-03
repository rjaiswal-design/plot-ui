"use client";
import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string[];
  multiple?: boolean;
}

export function Accordion({ items, defaultOpen = [], multiple }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const toggle = (id: string) =>
    setOpen((s) =>
      s.includes(id)
        ? s.filter((x) => x !== id)
        : multiple
        ? [...s, id]
        : [id],
    );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--ub-surface)",
        border: "1px solid var(--ub-border)",
        borderRadius: "var(--ub-radius-lg)",
        overflow: "hidden",
      }}
    >
      {items.map((it, i) => {
        const isOpen = open.includes(it.id);
        return (
          <div
            key={it.id}
            style={{
              borderTop: i === 0 ? "none" : "1px solid var(--ub-border)",
            }}
          >
            <button
              type="button"
              onClick={() => toggle(it.id)}
              aria-expanded={isOpen}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                background: "transparent",
                border: "none",
                color: "var(--ub-fg)",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                textAlign: "left",
                outline: "none",
              }}
            >
              <span>{it.title}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  display: "inline-flex",
                  color: "var(--ub-fg-muted)",
                  transformOrigin: "center",
                }}
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path
                    d="M2.5 4L5.5 7L8.5 4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
                    opacity: { duration: 0.18, ease: [0.4, 0, 0.2, 1] },
                  }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      padding: "0 16px 14px",
                      color: "var(--ub-fg-muted)",
                      fontSize: 13,
                      lineHeight: "20px",
                    }}
                  >
                    {it.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
