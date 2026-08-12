/*
 * AI WATCH TOWER — "Command Center Midnight" staff/admin dashboard
 * KPI rail + main grid: risk trend chart, distribution donut,
 * employee risk ranking table (high → low), alert panel with >60% rule,
 * recent security events. Data-first: big numerals, semantic risk colors.
 */
import { useState } from "react";
import {
  Users,
  ShieldAlert,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  AlertTriangle,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";
import RiskChip from "@/components/RiskChip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  EMPLOYEES,
  RISK_TREND,
  RISK_DISTRIBUTION,
  SECURITY_EVENTS,
  OVERALL_ORG_RISK,
} from "@/lib/brand";

const THRESHOLD = 60; // high-risk alert threshold

const sortedEmployees = [...EMPLOYEES].sort((a, b) => b.score - a.score);
const atRiskCount = EMPLOYEES.filter((e) => e.score >= THRESHOLD).length;

function KPICard({
  icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  tone?: "default" | "critical";
}) {
  return (
    <div className={`panel p-5 ${tone === "critical" ? "crit-pulse" : ""}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="p-2 rounded-lg bg-beacon-dim text-primary">{icon}</span>
        <span className="eyebrow">{label}</span>
      </div>
      <p className="font-display text-3xl font-bold tracking-tight">{value}</p>
      {sub && <p className="mt-1 font-mono text-[0.68rem] text-muted-foreground">{sub}</p>}
    </div>
  );
}

function TrendChart() {
  return (
    <div className="panel p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="font-display font-semibold">Organizational risk trend</h3>
          <p className="font-mono text-[0.68rem] text-muted-foreground mt-1">
            Weighted risk index · last 12 weeks · % of monitored workforce at risk
          </p>
        </div>
        <Tabs defaultValue="12w">
          <TabsList className="bg-secondary/60">
            <TabsTrigger value="12w" className="font-mono text-xs">12W</TabsTrigger>
            <TabsTrigger value="30d" className="font-mono text-xs">30D</TabsTrigger>
            <TabsTrigger value="7d" className="font-mono text-xs">7D</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={RISK_TREND} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.62 0.19 275)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="oklch(0.62 0.19 275)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 6%)" vertical={false} />
            <XAxis dataKey="week" tick={{ fill: "oklch(0.62 0.015 260)", fontSize: 11, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "oklch(0.62 0.015 260)", fontSize: 11, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} unit="%" />
            <RTooltip
              contentStyle={{
                background: "oklch(0.195 0.015 265)",
                border: "1px solid oklch(1 0 0 / 11%)",
                borderRadius: 8,
                fontSize: 12,
                fontFamily: "IBM Plex Mono",
              }}
              labelStyle={{ color: "oklch(0.62 0.015 260)", fontFamily: "IBM Plex Mono" }}
              formatter={(v: number) => [`${v}%`, "Org risk"]}
            />
            <Area type="monotone" dataKey="value" stroke="oklch(0.62 0.19 275)" strokeWidth={2} fill="url(#riskFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function DistributionDonut() {
  return (
    <div className="panel p-6">
      <h3 className="font-display font-semibold mb-1">Risk distribution</h3>
      <p className="font-mono text-[0.68rem] text-muted-foreground mb-4">
        Monitored workforce by risk category
      </p>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={RISK_DISTRIBUTION}
              dataKey="value"
              nameKey="name"
              innerRadius={58}
              outerRadius={82}
              paddingAngle={3}
              stroke="none"
            >
              {RISK_DISTRIBUTION.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
            <RTooltip
              contentStyle={{
                background: "oklch(0.195 0.015 265)",
                border: "1px solid oklch(1 0 0 / 11%)",
                borderRadius: 8,
                fontSize: 12,
                fontFamily: "IBM Plex Mono",
              }}
              formatter={(v: number, name: string) => [`${v} people`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {RISK_DISTRIBUTION.map((d) => (
          <div key={d.name} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ background: d.color }} />
            <span className="text-xs text-muted-foreground flex-1">{d.name}</span>
            <span className="font-mono text-xs font-medium">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmployeeTable() {
  const [q, setQ] = useState("");
  const filtered = sortedEmployees.filter((e) =>
    e.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="panel p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="font-display font-semibold">Employee risk ranking</h3>
          <p className="font-mono text-[0.68rem] text-muted-foreground mt-1">
            Highest risk first · threshold {THRESHOLD}%
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name…"
            className="h-9 pl-9 w-48 bg-secondary/50"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">Rank</TableHead>
            <TableHead className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">Employee</TableHead>
            <TableHead className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Dept</TableHead>
            <TableHead className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">Risk</TableHead>
            <TableHead className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">Score</TableHead>
            <TableHead className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground hidden md:table-cell">Trend</TableHead>
            <TableHead className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((e, i) => (
            <TableRow key={e.id} className="hover:bg-accent/40 transition-colors duration-150">
              <TableCell className="font-mono text-xs text-muted-foreground w-10">{String(i + 1).padStart(2, "0")}</TableCell>
              <TableCell>
                <p className="text-sm font-medium">{e.name}</p>
                <p className="font-mono text-[0.65rem] text-muted-foreground">{e.employeeId}</p>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground hidden sm:table-cell">{e.department}</TableCell>
              <TableCell>
                <RiskChip level={e.level} pulse={e.score >= THRESHOLD} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${e.score}%`,
                        background:
                          e.level === "Critical" ? "var(--risk-crit)" :
                          e.level === "High" ? "var(--risk-high)" :
                          e.level === "Medium" ? "var(--risk-med)" : "var(--risk-low)",
                      }}
                    />
                  </div>
                  <span className="font-mono text-sm font-medium">{e.score}%</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {e.trend === 1 ? (
                  <ArrowUpRight className="h-4 w-4 text-destructive" />
                ) : e.trend === -1 ? (
                  <ArrowDownRight className="h-4 w-4 text-primary" />
                ) : (
                  <Minus className="h-4 w-4 text-muted-foreground" />
                )}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => toast(`Reviewing ${e.name} — review flow is a preview placeholder.`)}>
                  Review
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {filtered.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-10">
                No employees match “{q}”.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function AlertPanel() {
  const alerts = EMPLOYEES.filter((e) => e.score > THRESHOLD);
  return (
    <div className="panel p-6 border-destructive/25">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-4 w-4 text-destructive" />
        <h3 className="font-display font-semibold">High-risk alerts</h3>
        <span className="ml-auto font-mono text-[0.65rem] text-destructive bg-destructive/10 rounded-full px-2 py-0.5">
          AUTO-TRIGGER · SCORE &gt; {THRESHOLD}%
        </span>
      </div>
      <div className="space-y-3">
        {alerts.map((e) => (
          <div key={e.id} className="crit-pulse rounded-md border border-destructive/40 bg-destructive/5 p-4">
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <p className="text-sm font-medium">{e.name} <span className="font-mono text-[0.65rem] text-muted-foreground ml-1">{e.employeeId}</span></p>
                <p className="font-mono text-[0.68rem] text-muted-foreground">{e.department} · last activity {e.lastActivity}</p>
              </div>
              <RiskChip level={e.level} pulse />
            </div>
            <ul className="mt-2 space-y-1">
              {e.flags.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-foreground/80">
                  <span className="mt-1 h-1 w-1 rounded-full bg-destructive shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button variant="outline" size="sm" className="mt-3 h-8 bg-transparent" onClick={() => toast("Case created — workflow is a preview placeholder.")}>
              Open review case
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecurityEvents() {
  return (
    <div className="panel p-6">
      <h3 className="font-display font-semibold mb-1">Recent security events</h3>
      <p className="font-mono text-[0.68rem] text-muted-foreground mb-4">Live feed · today</p>
      <ul className="space-y-0">
        {SECURITY_EVENTS.map((ev, i) => (
          <li
            key={ev.id}
            className={`flex items-start gap-3 py-3.5 ${i !== SECURITY_EVENTS.length - 1 ? "border-b border-border/60" : ""}`}
          >
            <span className="font-mono text-[0.68rem] text-muted-foreground w-10 pt-0.5 shrink-0">{ev.time}</span>
            <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${
              ev.level === "Critical" ? "bg-destructive breathe" :
              ev.level === "High" ? "bg-[var(--risk-high)]" :
              ev.level === "Medium" ? "bg-[var(--risk-med)]" : "bg-primary"
            }`} />
            <div className="min-w-0">
              <p className="text-sm font-medium">
                {ev.type}
                <RiskChip level={ev.level} />
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{ev.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function StaffDashboard() {
  return (
    <DashboardLayout role="staff" title="Security Operations Console" subtitle="ORGANIZATION RISK INTELLIGENCE · AUTHORIZED PERSONNEL ONLY">
      {/* KPI rail */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        <KPICard
          icon={<Users className="h-4 w-4" />}
          label="Employees monitored"
          value="246"
          sub="+12 this month"
        />
        <KPICard
          icon={<ShieldAlert className="h-4 w-4" />}
          label="People at risk"
          value={atRiskCount}
          sub={`Above ${THRESHOLD}% threshold`}
          tone="critical"
        />
        <KPICard
          icon={<ShieldAlert className="h-4 w-4" />}
          label="Overall org risk"
          value={`${OVERALL_ORG_RISK}%`}
          sub="+2 pts vs last week"
        />
        <KPICard
          icon={<TrendingUp className="h-4 w-4" />}
          label="Violations / week"
          value="9"
          sub="3 critical, 6 high"
        />
      </div>

      {/* Main grid: chart rail 3 + employee table 9 */}
      <div className="grid xl:grid-cols-[320px_1fr] gap-5 mb-5">
        <TrendChart />
        <EmployeeTable />
      </div>

      {/* Second row: distribution + alerts + events */}
      <div className="grid lg:grid-cols-[320px_380px_1fr] gap-5">
        <DistributionDonut />
        <AlertPanel />
        <SecurityEvents />
      </div>
    </DashboardLayout>
  );
}
