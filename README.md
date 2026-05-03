# Plot UI

Dark editorial UI kit — token-driven primitives for internal Next.js tools.

> Maintained by Rahul. Add components, don't fork it.

## Install

```bash
npm install @plot/ui motion
```

```tsx
// app/layout.tsx
import "@plot/ui/tokens.css";
```

```tsx
import { Button, Card, Command, BlurReveal } from "@plot/ui";
```

## What's inside

- 38 components — primitives + flavored editorial pieces
- 9 color tokens, 3 type families, dark-first
- Tree-shakeable named exports
- No CSS-in-JS — all styling via CSS variables and Tailwind v4 utilities

## Run the demo site

```bash
npm install
npm run dev
# → http://localhost:3200
```

The `app/` directory is both the demo site and the visual regression baseline. Every component appears there at least once.

## Project layout

- `src/tokens/tokens.css` — design tokens (colors, fonts, radii, easings)
- `src/components/primitives/` — generic UI primitives (Button, Input, Card, Badge, Tabs, Modal, Toast, Tooltip, Avatar, Switch, …)
- `src/components/flavored/` — editorial pieces (TitleStroke, MonoLabel, OutlineRail, BlurReveal, MorphSurface, Dial, …)
- `src/index.ts` — barrel export
- `app/` — landing site / docs / dev playground

## License

MIT
