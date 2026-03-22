# CLAUDE.md — uxsec.dev (Security UX Pattern Library)

## Project overview

Interactive security UX pattern library with 34 patterns across 8 categories, plus 4 strategic tools. Hacker terminal aesthetic. Domain: uxsec.dev

## Commands

```bash
npm run dev      # Start dev server (Vite)
npm run build    # Build for production (+ copies index.html → 404.html for SPA routing)
npm run preview  # Preview production build
```

## Architecture

- `src/patterns/` — Each pattern is a self-contained React component
  - `auth/` — Authentication (8 patterns, green)
  - `threat/` — Threat Response (3 patterns, green)
  - `darkpatterns/` — Dark Patterns with ethical alternatives (6 patterns, red)
  - `data/` — Data Protection (4 patterns, cyan)
  - `owasp/` — OWASP Top 10 (3 patterns, amber)
  - `ai/` — AI Transparency / EU AI Act (3 patterns, purple)
  - `industrial/` — Industrial Security (4 patterns, orange)
  - `governance/` — Governance (3 patterns, gray)
- `src/pages/` — Tool pages (ScorePage, CompliancePage, MaturityPage, ReportPage, HomePage)
- `src/components/` — Shared components (PatternHeader, DemoContainer, GuidelineSection)
- `src/layouts/Layout.tsx` — Main layout with header, sidebar, mobile menu
- `src/data/patterns.ts` — Pattern metadata for search and compliance mapping

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
5. Add to homepage terminal listing + pattern cards in `src/pages/HomePage.tsx`
6. Add to `src/data/patterns.ts`
7. Add to compliance mapper in `src/pages/CompliancePage.tsx` (map to relevant regulations)
8. Add to score checklist in `src/pages/ScorePage.tsx` if applicable

## Color system

Each category has its own color with glow and border variants:

| Category | Variable | Hex | Glow | Border |
|----------|----------|-----|------|--------|
| Auth & Threat | `--green` | `#00ff41` | `--green-glow` | `--green-border` |
| Dark Patterns | `--red` | `#ff3333` | N/A | N/A |
| Data Protection | `--cyan` | `#00e5ff` | `--cyan-glow` | `--cyan-border` |
| OWASP Top 10 | `--amber` | `#ffaa00` | `--amber-glow` | `--amber-border` |
| AI Transparency | `--ai-color` | `#c084fc` | `--ai-glow` | `--ai-border` |
| Industrial | `--industrial-color` | `#f97316` | `--industrial-glow` | `--industrial-border` |
| Governance | `--governance-color` | `#cccccc` | `--governance-glow` | `--governance-border` |

**Important:** Use CSS variables for all colors in demo components — no Tailwind color classes (bg-red-500, text-blue-200, etc.). Tailwind is used for layout only. All colors must be inline styles using CSS variables.

## Styling rules for demo components

- Every element needs explicit dark-theme colors via inline `style={{ }}` — nothing relies on Tailwind color defaults
- Use `font-mono` on all text in demos for the terminal aesthetic
- Cards: `background: "var(--bg-card)"`, `border: "1px solid var(--border)"`
- Inputs: `background: "var(--bg)"`, `color: "var(--text-bright)"`, `border: "1px solid var(--border)"`
- Buttons (primary): `background: "var(--green)"` (or category color), `color: "var(--bg)"`
- Buttons (secondary): `background: "transparent"`, `border: "1px solid var(--border)"`
- Text hierarchy: `var(--text-bright)` for headings, `var(--text)` for body, `var(--text-dim)` for metadata
- Semantic colors: red for errors/danger, green for success, amber for warnings — across all categories
- Icons: always set explicit `style={{ color: "..." }}` — don't rely on inherited color

## Key design decisions

- **Hacker terminal aesthetic** — JetBrains Mono, black background, scanlines, green glow
- **Dark vs Ethical comparison** — dark patterns show both versions side-by-side
- **Every pattern has multiple variants** — 2-3 scenarios per pattern
- **Real enforcement data** — fines and regulations, not hypothetical examples
- **EU AI Act patterns** — ahead of August 2026 deadline
- **Industrial patterns** — from real control room design, not consumer UX adapted
- **Strategic tools** — Score, Compliance Mapper, Maturity Model, Report Generator
- **Mobile-first** — all demos must work on mobile with proper overflow handling

## Important files

- `index.html` — Meta tags, OG image, page title
- `public/favicon.svg` — Green shield+lock on black
- `public/og-image.svg` — Social sharing image
- `public/CNAME` — Custom domain (uxsec.dev)
- `src/index.css` — CSS variables, scanline effect, global styles
- `.github/workflows/deploy.yml` — GitHub Pages deployment
