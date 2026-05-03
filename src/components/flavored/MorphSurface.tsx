"use client";
import { AnimatePresence, motion } from "motion/react";
import {
  FormEvent,
  KeyboardEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { Kbd } from "../primitives/Kbd";

const FEEDBACK_W = 360;
const FEEDBACK_H = 200;
const SPEED = 1;

const LOGO_SPRING = {
  type: "spring",
  stiffness: 350 / SPEED,
  damping: 35,
} as const;

const MORPH_SPRING = {
  type: "spring",
  stiffness: 550 / SPEED,
  damping: 45,
  mass: 0.7,
} as const;

function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  onOutside: () => void,
) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onOutside();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, onOutside]);
}

/** Auto-toggles every `interval` ms; pauses on hover. */
function useDemoLoop(enabled: boolean, interval = 1800) {
  const [on, setOn] = useState(false);
  const timer = useRef<number | null>(null);
  const start = () => {
    if (!enabled) return;
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => setOn((p) => !p), interval);
  };
  useEffect(() => {
    start();
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, interval]);
  const stop = () => {
    if (timer.current) window.clearInterval(timer.current);
  };
  return { on, setOn, mouseHandlers: { onMouseEnter: stop, onMouseLeave: start } };
}

export interface MorphSurfaceProps {
  /** Label shown beside the dot. */
  label?: string;
  /** Text on the right-side trigger button. */
  trigger?: string;
  /** Textarea placeholder. */
  placeholder?: string;
  /** Called with the message when submitted. */
  onSubmit?: (message: string) => void | Promise<void>;
  /** Auto-toggle for demo purposes (pauses on hover). */
  demoMode?: boolean;
}

export function MorphSurface({
  label = "Unboxed UI",
  trigger = "Feedback",
  placeholder = "What's on your mind?",
  onSubmit,
  demoMode = false,
}: MorphSurfaceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const demo = useDemoLoop(demoMode);
  const open = demoMode ? demo.on : demo.on; // local override below
  const [openOverride, setOpenOverride] = useState(false);
  const isOpen = demoMode ? demo.on : openOverride;

  const [success, setSuccess] = useState(false);
  const [text, setText] = useState("");

  function close() {
    if (demoMode) demo.setOn(false);
    setOpenOverride(false);
    textareaRef.current?.blur();
  }

  function openFn() {
    if (demoMode) demo.setOn(true);
    setOpenOverride(true);
    setTimeout(() => textareaRef.current?.focus(), 50);
  }

  useClickOutside(rootRef, close);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) {
      // simulate success in demo mode regardless
      if (demoMode) {
        close();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 1500);
      }
      return;
    }
    await onSubmit?.(text);
    setText("");
    close();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Escape") close();
    if (e.key === "Enter" && e.metaKey) {
      e.preventDefault();
      submitRef.current?.click();
    }
  }

  return (
    <div
      {...demo.mouseHandlers}
      style={{
        width: FEEDBACK_W,
        height: FEEDBACK_H,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <motion.div
        ref={rootRef}
        initial={false}
        animate={{
          width: isOpen ? FEEDBACK_W : "auto",
          height: isOpen ? FEEDBACK_H : 44,
          borderRadius: isOpen ? 14 : 20,
        }}
        transition={{ ...MORPH_SPRING, delay: isOpen ? 0 : 0.08 }}
        style={{
          position: "relative",
          background: "var(--ub-surface)",
          border: "1px solid var(--ub-border)",
          boxShadow: "var(--ub-shadow-lg)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* ── Dock (resting state) ──────────────────────────────────── */}
        <footer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 44,
            marginTop: "auto",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              padding: "0 12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {isOpen ? (
                <span style={{ width: 20, height: 20, opacity: 0 }} />
              ) : (
                <motion.div
                  layoutId="ub-morph-dot"
                  transition={LOGO_SPRING}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "var(--ub-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AnimatePresence>
                    {success && (
                      <motion.span
                        key="check"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{
                          type: "spring",
                          stiffness: 500 / SPEED,
                          damping: 22,
                          delay: 0.3,
                        }}
                        style={{ display: "inline-flex" }}
                      >
                        <CheckIcon />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
              <span
                style={{ fontSize: 13, color: "var(--ub-fg)", fontWeight: 500 }}
              >
                {label}
              </span>
            </div>

            <button
              type="button"
              onClick={openFn}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--ub-fg-muted)",
                fontSize: 13,
                padding: "8px 12px",
                margin: -8,
                borderRadius: 999,
                cursor: "pointer",
                outline: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--ub-fg)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--ub-fg-muted)")
              }
            >
              {trigger}
            </button>
          </div>
        </footer>

        {/* ── Feedback form (expanded state) ─────────────────────────── */}
        <form
          onSubmit={handleSubmit}
          style={{
            position: "absolute",
            inset: "0 0 0 0",
            width: FEEDBACK_W,
            height: FEEDBACK_H,
            pointerEvents: isOpen ? "auto" : "none",
          }}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="form-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={MORPH_SPRING}
                style={{
                  padding: 6,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "4px 6px 6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      color: "var(--ub-fg-muted)",
                      marginLeft: 22,
                    }}
                  >
                    {label}
                  </span>
                  <button
                    type="submit"
                    ref={submitRef}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      background: "transparent",
                      border: "none",
                      color: "var(--ub-fg-muted)",
                      fontSize: 12,
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    <Kbd>⌘</Kbd>
                    <Kbd>Enter</Kbd>
                  </button>
                </div>
                <textarea
                  ref={textareaRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={placeholder}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  style={{
                    flex: 1,
                    width: "100%",
                    resize: "none",
                    fontSize: 14,
                    lineHeight: 1.5,
                    outline: "none",
                    border: "none",
                    padding: 14,
                    caretColor: "var(--ub-accent)",
                    color: "var(--ub-fg)",
                    background: "var(--ub-bg-deep)",
                    borderRadius: 10,
                    fontFamily: "var(--ub-font-body)",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* The morphing dot — same layoutId, smaller + repositioned */}
          {isOpen && (
            <motion.div
              layoutId="ub-morph-dot"
              transition={LOGO_SPRING}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--ub-accent)",
                position: "absolute",
                top: 19,
                left: 16,
              }}
            />
          )}
        </form>
      </motion.div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <path
        d="M5 13L9 17L19 7"
        stroke="#0e0e0e"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
