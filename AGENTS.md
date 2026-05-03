<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version (16.x) has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Unboxed UI Kit

This package extracts the Unboxed editorial design language into reusable primitives that internal Next.js tools can `import` directly.

## Layout

- `src/tokens/tokens.css` — design tokens (colors, fonts, radii, easings) as CSS variables. Import once at the app root.
- `src/components/primitives/` — generic UI primitives (Button, Input, Card, Badge, Tabs, Modal, Toast, Tooltip, Avatar, Switch, Divider).
- `src/components/flavored/` — Unboxed-specific components (TitleStroke, MonoLabel, LiveRipple, OutlineRail, PhoneFrame, BeforeAfter, FocusParagraph).
- `src/index.ts` — barrel re-export for `import { Button } from "@unboxed/ui"`.
- `app/` — landing/docs site that demos every component (this is also the dev playground).

## Conventions

- Components are tree-shakeable named exports — no defaults.
- Don't ship CSS-in-JS. All styling via the token CSS variables and Tailwind v4 utilities.
- Add new components: file in the right subdir + add to `src/index.ts`.
- The landing page sections in `app/page.tsx` are the manual visual regression — every new component should appear there.
