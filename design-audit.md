# Design Audit — AI Watch Tower (copy)

Audited from screenshots + code: Home, Login, 404, StaffDashboard, EmployeeDashboard, shared shell, header/footer, index.css, RiskChip.

## Current state
- Strong baseline: "Command Center Midnight" (Security Modernism), Space Grotesk display, IBM Plex Sans/Mono, single indigo beacon, risk chips, signal-line dividers, radar sweep in hero, SOC data artifacts.

## Issues / refinement opportunities found
1. **Logo broken everywhere** — `<img src="/manus-storage/awt-logo_35937e87.png">` fails to load (404 in storage). Wordmark falls back to broken image alt text in SiteHeader, SiteFooter, Login brand panel, DashboardLayout sidebar. HIGH PRIORITY.
2. **404 page off-brand** — generic light-themed card (white bg, red icon, blue button) contradicts the dark SOC identity. Should be dark, mono, console-styled.
3. **Staff dashboard — big empty columns**: the screenshot shows the layout grid `xl:grid-cols-[320px_1fr]` rendered oddly wide with massive vertical gaps between the 4 KPI cards (grid sm:grid-cols-2 xl:grid-cols-4 renders 4 stacked? No — full-page shot shows two columns of two stacked cards at left, large empty right half). Actually the grid is 2-col on sm; on xl it's 4-col but screenshot shows 2x2 stacked at left with huge whitespace right. Need to verify; likely the grid collapsed due to full-page capture width. Check at 1440px.
4. **Sidebar left-border accent** on active state (border-l-2) looks like a default shadcn leftover, slightly misaligned with hairline design. Could be a refined beacon dot instead.
5. **Landing hero** — radar rings sit over plain area; beacon glyph could be stronger; "Live control plane preview" glass panel could include a tiny sparkline to deepen SOC feel.
6. **Employee dashboard** — chat is the hero but bubble composer looks fine; avatar initials block uses gradient; could be more consistent with beacon style. Minor.
7. **Staff chart tooltip + donut** fine. Donut legend overlaps donut slightly? Screenshot shows donut + legend grid below looks okay.
8. **Signal-line center dot** is fine.
9. **Header mobile menu** fine.
10. **Login** — left panel has empty large dark zone at mid height (per design decision "no large empty half-screen void"). Could add an audit-event feed / beacon stack to fill.

## Refinement plan (one holistic pass)
A. Fix logo: rebuild beacon logo as inline SVG component (transparent, beacon glyph: concentric quarter arcs + mast) and use it in SiteHeader, SiteFooter, Login, DashboardLayout, favicon (dataURI png).
B. Restyle 404 page into dark console theme matching design system.
C. Login left panel: add a vertical "signal log" artifact block (timestamped audit lines + beacon arcs SVG) to eliminate the empty void.
D. Landing hero: strengthen beacon motif (larger SVG tower glyph + sweep), add mini sparkline to hero preview panel.
E. Sidebar: replace border-l-2 active state with beacon dot + filled accent; add subtle beacon glyph watermark to sidebar header.
F. Risk chip: add subtle inner shadow/glow for Critical pulse consistency (CritChip class exists; RiskChip applies crit-pulse on pulse=true — OK).
G. Check employee avatar styling consistency.
H. Verify responsive grids at desktop width after changes.
