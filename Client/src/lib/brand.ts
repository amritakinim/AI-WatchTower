/*
 * AI WATCH TOWER — "Command Center Midnight"
 * Shared brand constants, risk taxonomy, and product data.
 * Single source of truth used by login, staff, and employee dashboards.
 */

export const LOGO_URL = "/manus-storage/awt-logo_35937e87.png";
export const HERO_URL = "/manus-storage/awt-hero_2a76ab20.png";
export const GOVERNANCE_URL = "/manus-storage/awt-governance_512a3955.png";
export const SHIELD_URL = "/manus-storage/awt-shield_97dfaeed.png";

export type RiskLevel = "Low" | "Medium" | "High" | "Critical";

export function riskLevelFor(score: number): RiskLevel {
  if (score >= 70) return "Critical";
  if (score >= 50) return "High";
  if (score >= 30) return "Medium";
  return "Low";
}

export interface EmployeeRisk {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  score: number;
  level: RiskLevel;
  lastActivity: string;
  flags: string[];
  trend: number; // -1, 0, +1
}

// Example employees from the product spec
export const EMPLOYEES: EmployeeRisk[] = [
  {
    id: "e-1",
    name: "Alex Morgan",
    employeeId: "AWT-0417",
    department: "Marketing",
    score: 85,
    level: "Critical",
    lastActivity: "2 min ago",
    flags: ["Unsanctioned model use", "Sensitive data in prompt"],
    trend: 1,
  },
  {
    id: "e-2",
    name: "Sarah Chen",
    employeeId: "AWT-0238",
    department: "Engineering",
    score: 72,
    level: "High",
    lastActivity: "11 min ago",
    flags: ["Policy-violating upload", "Prompt injection attempt"],
    trend: 1,
  },
  {
    id: "e-3",
    name: "John Davis",
    employeeId: "AWT-0592",
    department: "Finance",
    score: 48,
    level: "Medium",
    lastActivity: "34 min ago",
    flags: ["Unusual session pattern"],
    trend: 0,
  },
  {
    id: "e-4",
    name: "Maya Patel",
    employeeId: "AWT-0761",
    department: "Product",
    score: 25,
    level: "Low",
    lastActivity: "1 hr ago",
    flags: [],
    trend: -1,
  },
];

// The logged-in employee profile (only visible to themselves)
export const CURRENT_EMPLOYEE = {
  name: "Jordan Rivera",
  employeeId: "AWT-0843",
  department: "Customer Success",
  avatar: "JR",
  score: 12,
  level: "Low" as RiskLevel,
  lastReview: "Today, 09:41 AM",
};

// 12-week org risk trend (percentage)
export const RISK_TREND = [
  { week: "W22", value: 31 },
  { week: "W23", value: 34 },
  { week: "W24", value: 29 },
  { week: "W25", value: 38 },
  { week: "W26", value: 42 },
  { week: "W27", value: 37 },
  { week: "W28", value: 44 },
  { week: "W29", value: 41 },
  { week: "W30", value: 47 },
  { week: "W31", value: 43 },
  { week: "W32", value: 39 },
  { week: "W33", value: 45 },
];

// Risk distribution across the organization
export const RISK_DISTRIBUTION = [
  { name: "Low", value: 142, color: "oklch(0.78 0.14 155)" },
  { name: "Medium", value: 68, color: "oklch(0.8 0.15 80)" },
  { name: "High", value: 27, color: "oklch(0.72 0.17 55)" },
  { name: "Critical", value: 9, color: "oklch(0.64 0.21 28)" },
];

export interface SecurityEvent {
  id: string;
  time: string;
  type: string;
  detail: string;
  level: RiskLevel;
}

export const SECURITY_EVENTS: SecurityEvent[] = [
  {
    id: "ev-1",
    time: "09:58",
    type: "Alert triggered",
    detail: "Alex Morgan exceeded 60% risk threshold — auto-flagged for review.",
    level: "Critical",
  },
  {
    id: "ev-2",
    time: "09:41",
    detail: "Policy update v2.4.1 applied across 12 monitored AI services.",
    type: "Policy change",
    level: "Low",
  },
  {
    id: "ev-3",
    time: "09:22",
    type: "Violation detected",
    detail: "Sensitive data classification matched in prompt session — Sarah Chen.",
    level: "High",
  },
  {
    id: "ev-4",
    time: "08:57",
    type: "Scan complete",
    detail: "Daily AI interaction scan completed — 4,312 sessions analyzed.",
    level: "Low",
  },
  {
    id: "ev-5",
    time: "08:33",
    type: "Alert triggered",
    detail: "Unsanctioned model access attempt from Engineering VLAN.",
    level: "High",
  },
];

export const OVERALL_ORG_RISK = 45; // percent

export const AI_ASSISTANT_SUGGESTIONS = [
  "Summarize our AI usage policy for this week",
  "How do I request approval for a new AI tool?",
  "Explain the safe-handling guidelines for customer data",
  "What generative AI services are approved here?",
];

export const AI_ASSISTANT_REPLIES: Record<string, string> = {
  default:
    "Hello, I'm your secure AI assistant. I can help you with approved AI services, safe data-handling practices, and internal policy questions. Everything we discuss stays within the governed environment — nothing leaves the perimeter without authorization.",
  "Summarize our AI usage policy for this week":
    "This week's summary: 3 policy updates were published (v2.4.0–v2.4.2), covering prompt-data handling for customer records, approval flows for new AI services, and export restrictions on model outputs. No changes affect your current workflows. Full changelog is in Resources → Policy Center.",
  "How do I request approval for a new AI tool?":
    "Start a request in Governance → AI Tool Requests. You'll need the vendor name, data flows, and intended use case. Reviews typically complete within 3 business days, and Engineering Services evaluates sandboxed behavior before any approval.",
  "Explain the safe-handling guidelines for customer data":
    "Customer PII should never be pasted directly into a prompt. Use the built-in redaction helper in your approved assistant — it anonymizes identifiers before the request is sent. If you've already pasted data, flag the session in the AI Assistant panel and the compliance team will be notified within minutes.",
  "What generative AI services are approved here?":
    "Currently 5 services are approved: the internal AI Assistant (this one), two sanctioned model workspaces for Engineering, the redaction-enabled writing helper, and the analytics summarizer. A live list with version notes is under Resources → Approved Services.",
};

export function aiAssistantReply(question: string): string {
  return AI_ASSISTANT_REPLIES[question] ?? AI_ASSISTANT_REPLIES.default;
}
