# CLAUDE.md — uxsec.dev (Security UX Pattern Library)

## Project overview

Interactive security UX pattern library with 23 patterns across 6 categories, plus 3 strategic tools. Hacker terminal aesthetic. Domain: uxsec.dev

## Commands

```bash
npm run dev      # Start dev server (Vite)
npm run build    # Build for production
npm run preview  # Preview production build
```

## Architecture

- `src/patterns/` — Each pattern is a self-contained React component
  - `auth/` — Authentication (5 patterns, green)
  - `threat/` — Threat Response (3 patterns, green)
  - `darkpatterns/` — Dark Patterns with ethical alternatives (6 patterns, red)
  - `data/` — Data Protection (3 patterns, cyan)
  - `owasp/` — OWASP Top 10 (3 patterns, amber)
  - `ai/` — AI Transparency / EU AI Act (3 patterns, purple)
- `src/pages/` — Tool pages (ScorePage, CompliancePage, MaturityPage, HomePage)
- `src/components/` — Shared components (PatternHeader, DemoContainer, GuidelineSection)
- `src/layouts/Layout.tsx` — Main layout with header, sidebar, mobile menu

## Pattern structure

Every pattern follows this structure:
1. Interactive demo component (top) — working UI users can interact with
2. `PatternHeader` — title, description, severity badge, tags
3. `DemoContainer` — wraps the demo with a label
4. `GuidelineSection` — Do/Don't lists, security rationale, accessibility notes

## Adding a new pattern

1. Create `src/patterns/<category>/MyPattern.tsx`
2. Export a component using PatternHeader + DemoContainer + GuidelineSection
3. Add route in `src/App.tsx`
4. Add to sidebar in `src/layouts/Layout.tsx`
5. Add to homepage section in `src/pages/HomePage.tsx`
6. Add to compliance mapper if relevant in `src/pages/CompliancePage.tsx`

## Color system

Each category has its own color:
- Green (`--green`, `#00ff41`) — Auth, Threat Response
- Red (`--red`, `#ff3333`) — Dark Patterns
- Cyan (`--cyan`, `#00e5ff`) — Data Protection
- Amber (`--amber`, `#ffaa00`) — OWASP Top 10
- Purple (`#c084fc`) — AI Transparency

## Key design decisions

- **Hacker terminal aesthetic** — JetBrains Mono, black background, scanlines, green glow
- **Dark vs Ethical comparison** — dark patterns show both versions side-by-side
- **Every pattern has multiple variants** — 2-3 scenarios per pattern
- **Real enforcement data** — fines and regulations, not hypothetical examples
- **EU AI Act patterns** — ahead of August 2026 deadline

## Important files

- `index.html` — Meta tags, OG image, page title
- `public/favicon.svg` — Green shield+lock on black
- `public/og-image.svg` — Social sharing image
- `src/index.css` — CSS variables, scanline effect, global styles
