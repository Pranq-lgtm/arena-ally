# Arena Ally Design Brief

## Purpose
Fight the loneliness epidemic through gamified, community-driven sports matchmaking. Build genuine social connection around shared athletic passion.

## Tone & Aesthetic
Bold, energetic, premium. Nike meets Headspace — athletic intensity paired with wellness calm. Dark-leaning, high-contrast, unapologetically modern.

## Differentiation
Animated progress rings and pulsing achievement badges are visual heroes. Accent color used sparingly (only for achievements, CTAs, and progress). Precision typography creates premium feel without decoration.

## Color Palette

| Token | Light OKLCH | Dark OKLCH | Usage |
|-------|-------------|-----------|-------|
| Primary (Navy) | 0.35 0.15 250 | 0.55 0.18 250 | Navigation, UI hierarchy, buttons |
| Accent (Electric Orange) | 0.65 0.25 45 | 0.75 0.26 45 | Achievements, progress, CTAs, badges |
| Secondary (Teal) | 0.75 0.12 190 | 0.65 0.15 190 | Supporting elements, social hints |
| Destructive (Coral) | 0.55 0.22 25 | 0.65 0.19 22 | Warnings, dismissals |
| Background | 0.12 0 0 | 0.12 0 0 | Primary dark mode canvas |
| Card | 0.16 0 0 | 0.16 0 0 | Elevated surfaces (objectives, profiles) |
| Foreground | 0.96 0 0 | 0.96 0 0 | Text on dark |

## Typography

| Family | Font | Role | Scale |
|--------|------|------|-------|
| Display | Space Grotesk | Headers, hero text, badges | 24px, 20px, 18px |
| Body | General Sans | Copy, UI labels, team text | 16px, 14px, 12px |
| Mono | Geist Mono | Coach metrics, scores, timer | 14px, 12px |

## Structural Zones

| Zone | Background | Border | Notes |
|------|------------|--------|-------|
| Header | `bg-card` with `border-b` | `border-border` | Elevated, consistent with app identity |
| Sidebar | `bg-sidebar` (same as card) | `border-sidebar-border` | Primary navy for hover states |
| Main Content | `bg-background` | None | Dark canvas with alternating card sections |
| Card Stack | `bg-card` | `border-border` | 4px muted borders for separation |
| Footer | `bg-muted/30` with `border-t` | `border-border` | Recessed, muted |

## Spacing & Rhythm

- Padding grid: 8px, 16px, 24px, 32px
- Card gap: 16px (mobile), 20px (tablet/desktop)
- Sidebar: 8px vertical padding between nav items
- Progress ring: 24px or 32px container size

## Component Patterns

- **Buttons**: Primary (navy + accent ring on focus), Secondary (muted fill), Ghost (text only)
- **Progress**: Circular rings with gradient stroke (accent → chart-3), labels center-aligned
- **Badges**: Pulsing animation (pulse-badge), accent background, navy text
- **Cards**: Rounded 12px, shadow from chart-1, hover scale-in animation
- **Objective Board**: Grid 1–3 columns (mobile-first), each tile is a card

## Motion & Interaction

- **Entrance**: fade-in + scale-in on card/objective reveal (0.2s)
- **Achievement unlock**: Pulsing badge + scale-up animation (0.3s total)
- **Button hover**: Scale 1.02, accent ring brightens
- **Progress update**: Ring stroke animates 0.5s easing
- **Transition base**: cubic-bezier(0.4, 0, 0.2, 1) for smooth, purposeful motion

## Constraints & Guardrails

- No full-page gradients; use layered depth via elevation
- Accent color only on achievements, progress, and primary CTAs — never on secondary elements
- Rounded corners: 4px (inputs, small chips), 12px (cards), 24px (badges), full (profile avatars)
- No shadow bloat: use xs (1px, 2px offset) or md (4px, 8px) — nothing bigger
- Dark mode mandatory; light mode optional

## Signature Detail

Animated circular progress rings with vibrant gradient strokes. When social battery or objective progress updates, the ring animates smoothly, and a pulsing achievement badge appears on unlock. This micro-interaction reinforces the gamification and creates moments of delight.

## Exports

- src/frontend/src/index.css: OKLCH tokens, @font-face declarations, utility classes
- src/frontend/tailwind.config.js: Custom animations (pulse, fade-in, scale-in)
- src/frontend/public/assets/fonts/: Space Grotesk, General Sans, Geist Mono (woff2)
