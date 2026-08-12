/*
 * AI WATCH TOWER — "Command Center Midnight"
 * Beacon glyph: three concentric quarter-arcs rising from a vertical mast,
 * electric indigo with subtle glow. Replaces the broken raster logo asset.
 * Used in the wordmark, footer, login brand panel, sidebar, and favicon.
 */
export default function BeaconGlyph({
  className = "h-8 w-8",
  glow = true,
}: {
  className?: string;
  glow?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={glow ? { filter: "drop-shadow(0 0 6px oklch(0.62 0.19 275 / 55%))" } : undefined}
    >
      <svg viewBox="0 0 40 40" fill="none" className="h-full w-full">
        {/* Mast */}
        <line x1="10" y1="36" x2="10" y2="18" stroke="oklch(0.62 0.19 275)" strokeWidth="2.4" strokeLinecap="round" />
        {/* Base */}
        <line x1="4" y1="36" x2="16" y2="36" stroke="oklch(0.62 0.19 275)" strokeWidth="2.4" strokeLinecap="round" />
        {/* Beacon bulb */}
        <circle cx="10" cy="15.5" r="2.6" fill="oklch(0.62 0.19 275)" />
        {/* Concentric quarter-arcs radiating right/up from the bulb */}
        <path
          d="M16.5 12.2 A 8 8 0 0 1 16.5 18.8"
          stroke="oklch(0.62 0.19 275)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.95"
        />
        <path
          d="M21.2 9.2 A 13 13 0 0 1 21.2 21.8"
          stroke="oklch(0.62 0.19 275)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M25.9 6.2 A 18 18 0 0 1 25.9 24.8"
          stroke="oklch(0.62 0.19 275)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.45"
        />
      </svg>
    </span>
  );
}
