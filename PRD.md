# Plot UI Kit — PRD

**Package:** `@uiplot/ui` v0.0.1 · MIT · maintained by Rahul
**Repo:** https://github.com/rjaiswal-design/plot-ui
**Docs site:** https://plot-ui.vercel.app

---

## 1. Overview

Plot UI is a dark, editorial design language packaged as a tree-shakeable React component library for Next.js internal tools. The repo is dual-purpose:

1. **Published npm library** — `@uiplot/ui`, consumed by other apps.
2. **Docs / landing site** — a Next.js 16 app under `app/` that demos every component and acts as the dev playground + visual regression surface.

There is **no backend** — no API routes, server actions, database, or auth. The docs site is fully static.

---

## 2. Goals & Non-Goals

**Goals**
- Drop-in primitives for any Next.js app (`npm i @uiplot/ui`).
- Consistent dark editorial look: serif display + mono labels + dense spacing.
- Token-driven theming via CSS variables, no CSS-in-JS, no theme provider.
- Tree-shakeable: import one component, ship one component.

**Non-Goals**
- Not a general-purpose multi-theme system (dark-first only).
- No backend, persistence, or data fetching.
- No SSR-specific server components — primitives are client components.

---

## 3. Users

- **Primary:** internal tool builders who want editorial polish without rewriting primitives.
- **Secondary:** AI agents installing the kit via the "tell your agent to set it up" prompt in `app/_sections/Install.tsx`.

---

## 4. Frontend — Library (`src/`)

The shippable npm package. Lives entirely in `src/`.

### 4.1 Tokens — `src/tokens/tokens.css`

CSS variables imported once at app root (`@uiplot/ui/tokens.css`):
- **Colors:** surfaces (bg, bg-deep, surface-1/2/3, menu), text (fg, fg-strong, fg-muted), brand (accent, success, danger), translucent overlays.
- **Typography:** Cormorant Garamond (serif display), JetBrains Mono, system sans.
- **Radii:** xs → 2xl + pill.
- **Shadows / glow:** sm → modal, glow-accent.
- **Easings:** standard, emphasis, spring-light, spring-pop, out-strong.
- **Layout helpers:** sidebar-w, rail-left, content-w, phone-w.

### 4.2 Primitives — `src/components/primitives/` (32)

Accordion, Alert, AlertDialog, Avatar, Badge, Breadcrumb, Button, Card, Checkbox, Command, Divider, DropdownMenu, HoverCard, Input, Kbd, Label, Modal, Pagination, Popover, Progress, RadioGroup, Select, Sheet, Skeleton, Slider, Switch, Tabs, Textarea, Toast, Toggle, ToggleGroup, Tooltip.

### 4.3 Flavored — `src/components/flavored/` (15)

BeforeAfter, BlurReveal, CodeBlock, Dial, DialSlider, FocusParagraph, LiveRipple, LogosCarousel, MonoLabel, MorphSurface, OutlineRail, PhoneFrame, SectionHeader, SpotlightCard, TitleStroke.

### 4.4 Barrel — `src/index.ts`

Named re-exports for everything above + `useToast` hook. No default exports.

---

## 5. Frontend — Docs Site (`app/`)

Next.js 16 App Router site under `app/`, runs on port 3200 in dev.

- **Layout / globals:** `app/layout.tsx`, `app/globals.css`. Title: *"Plot UI — A kit for internal tools."*
- **Page:** `app/page.tsx` — composes the sections below.
- **Sections** (`app/_sections/`):
  - `Hero.tsx` — V0.0.1 / editorial hero / `npm i @uiplot/ui` CTA.
  - `Install.tsx` — install snippet + agent-prompt + manual layout setup.
  - `Foundations.tsx` — token showcase.
  - `Gallery.tsx` + `GalleryDemos.tsx` — every component on display.
  - `Footer.tsx`.
- **Chrome** (`app/_chrome/`):
  - `Chrome.tsx` — top bar / nav frame.
  - `CommandLauncher.tsx` — command palette (`npm i @uiplot/ui` quick-copy).

---

## 6. Backend

**None.** No `app/api/`, no server actions, no DB, no auth. Toast / state is client-only via React context (`<ToastProvider />` consumed by `useToast`).

---

## 7. Build & Deploy

| Concern | Tool / file |
|---|---|
| Library build | `tsup.config.ts` — per-file ESM, preserves `"use client"`, externals: react, react-dom, motion, motion/react |
| Library types | `tsconfig.build.json` — declaration-only, excludes `app/`, `.next/`, `dist/` |
| Site build | `next.config.ts` — minimal, defaults |
| Vercel | `vercel.json` — `framework: nextjs`, `buildCommand: next build` |
| Scripts | `dev` (Next on 3200), `build` (tsup + copy tokens), `site:build` / `site:start`, `prepublishOnly` |
| Peer deps | `react >= 18`, `motion ^12` |

**Distribution:** library outputs to `dist/` and is published to npm; site is deployed to Vercel (production alias `plot-ui.vercel.app`).

---

## 8. Conventions (from `AGENTS.md`)

- Named exports only; no defaults.
- All styling via token CSS variables + Tailwind v4 utilities. No CSS-in-JS.
- Adding a component = file in the right subdir + entry in `src/index.ts` + a slot in `app/page.tsx` (visual regression).
- Next.js 16 has breaking changes — consult `node_modules/next/dist/docs/` before writing code.

---

## 9. Status & Open Items

- **Version 0.0.1** — pre-release; surface API may still shift.
- 47 components shipped (32 primitives + 15 flavored).
- No tests, no Storybook — visual regression is "look at the landing page."
- No CI workflow committed.
