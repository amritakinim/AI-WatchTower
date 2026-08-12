# Design refinement progress (as of current pass)

Working dir: /home/ubuntu/copy-of-ai-watch-tower

## DONE
- BeaconGlyph.tsx created (inline SVG beacon: mast + base + bulb + 3 quarter-arcs, indigo). Verified rendering in screenshots — logo now shows correctly in header, login panel, sidebars.
- index.css additions: .beacon-glow, .beacon-wash (radial indigo wash), .scanlines, @keyframes scanrise.
- SiteHeader + SiteFooter: swapped LOGO_URL img for <BeaconGlyph>.
- DashboardLayout: sidebar now uses BeaconGlyph; added glow wash blob; replaced border-l-2 active style with glowing vertical beacon bar (absolute left, h-4 w-0.5, bg-primary + shadow). Screenshots confirm both dashboards show new sidebar with active glow bar.
- Login.tsx: beacon-wash added to brand aside; signal-log artifact panel added (4 timestamped rows, red breathing dot for critical) filling the mid-panel void; mobile header also uses BeaconGlyph. Verified in screenshot — looks good.
- Home.tsx hero: added beacon mast SVG at radar center + mini sparkline (recharts AreaChart data=[31,34,29,38,42,37,44,41,47,43,39,45], id heroSpark) in the "Live control plane preview" glass panel. Verified in screenshot.

## REMAINING
1. Restyle NotFound page (client/src/pages/NotFound.tsx): currently generic light card with red icon + blue button. Rewrite to dark console style: bg-background, signal-grid, beacon glyph, mono microcopy ("SECTOR NOT FOUND · PERIMETER SWEEP CLEAR"), red breathing dot chip "404 · OUT OF BOUNDS", go-home button styled with primary. Keep wouter Link to "/".
2. Optional: employee avatar initial circle — currently gradient from-primary; could stay (acceptable).
3. Favicon: client/public/favicon.ico exists? Could regenerate favicon.png from beacon glyph (canvas or static upload) and set in index.html. Currently LOGO_URL referenced; check index.html favicon link.
4. Final full-page screenshot pass + style review (request_style_review: true), apply review in one pass, then checkpoint + deliver.

## Key facts
- Routes: / , /login, /dashboard/staff (?demo=staff auto-login), /dashboard/employee (?demo=employee).
- ThemeProvider defaultTheme="dark"; tokens in index.css (dark only).
- Hero beacon mast position in screenshot renders a bit far below radar center — acceptable but could nudge.
- Previous checkpoint in source project: 0b657d15. This copy's initial checkpoint: 809bb40b.
