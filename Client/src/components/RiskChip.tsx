/*
 * AI WATCH TOWER — "Command Center Midnight"
 * Consistent risk beacon chip: colored dot + mono uppercase label,
 * bordered capsule with tinted background. Used in both dashboards.
 */
import type { RiskLevel } from "@/lib/brand";

const CLASS: Record<RiskLevel, string> = {
  Low: "risk-low",
  Medium: "risk-med",
  High: "risk-high",
  Critical: "risk-crit",
};

export default function RiskChip({ level, pulse }: { level: RiskLevel; pulse?: boolean }) {
  return (
    <span className={`risk-chip ${CLASS[level]} ${pulse ? "crit-pulse" : ""}`}>
      {level}
    </span>
  );
}
