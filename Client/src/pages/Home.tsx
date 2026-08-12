/*
 * AI WATCH TOWER — "Command Center Midnight" landing page
 * Asymmetric split hero, section rhythm with signal-line dividers,
 * feature grid, trust/security band, resources teaser, careers + contact CTAs,
 * footer. Single indigo beacon accent; glass only in hero.
 */
import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import {
  Radar,
  ShieldCheck,
  FileSearch,
  Bot,
  Lock,
  Users,

  Eye,
  ArrowRight,
  Shield,
  FileText,
  Briefcase,
  Phone,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RiskChip from "@/components/RiskChip";
import { Button } from "@/components/ui/button";
import {
  HERO_URL,
  GOVERNANCE_URL,
  SHIELD_URL,
  SECURITY_EVENTS,
  OVERALL_ORG_RISK,
} from "@/lib/brand";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return ref;
}

function placeholder() {
  toast("This section is a placeholder in the preview.");
}

export default function Home() {
  const ref = useReveal();
  const [, navigate] = useLocation();

  return (
    <div ref={ref} className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* ————— HERO: asymmetric split, glass panel on dark navy ————— */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.14_0.014_265)] via-[oklch(0.16_0.02_270)] to-[oklch(0.13_0.02_280)]" />
        <div className="absolute inset-0 signal-grid opacity-60" />
        {/* Hero image, right-weighted */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[55%] hidden md:block bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(90deg, oklch(0.145 0.014 265) 0%, transparent 35%), url(${HERO_URL})`,
            opacity: 0.85,
          }}
        />
        {/* radar sweep echo */}
        <div className="absolute right-[12%] top-[18%] hidden lg:block pointer-events-none select-none">
          <svg width="380" height="380" viewBox="0 0 380 380" className="radar-sweep opacity-[0.14]">
            <circle cx="190" cy="190" r="185" fill="none" stroke="oklch(0.62 0.19 275)" strokeWidth="1" strokeDasharray="4 10" />
            <circle cx="190" cy="190" r="120" fill="none" stroke="oklch(0.62 0.19 275)" strokeWidth="1" strokeDasharray="2 14" />
            <circle cx="190" cy="190" r="60" fill="none" stroke="oklch(0.62 0.19 275)" strokeWidth="1" />
          </svg>
          {/* Beacon mast at radar center */}
          <svg width="60" height="120" viewBox="0 0 60 120" className="absolute -bottom-10 -left-8 pointer-events-none">
            <line x1="14" y1="110" x2="14" y2="38" stroke="oklch(0.62 0.19 275)" strokeWidth="4" strokeLinecap="round" />
            <line x1="2" y1="110" x2="26" y2="110" stroke="oklch(0.62 0.19 275)" strokeWidth="4" strokeLinecap="round" />
            <circle cx="14" cy="30" r="7" fill="oklch(0.62 0.19 275)" className="breathe" />
          </svg>
        </div>

        <div className="container relative z-10 pt-28 pb-20">
          <div className="max-w-[560px]">
            <p className="reveal eyebrow mb-5">Enterprise AI Governance Platform</p>
            <h1 className="reveal font-display text-4xl sm:text-5xl lg:text-[3.6rem] font-bold leading-[1.08] tracking-tight text-foreground [transition-delay:60ms]">
              Every AI interaction,{" "}
              <span className="text-primary">governed.</span>
            </h1>
            <p className="reveal mt-6 text-lg text-muted-foreground leading-relaxed [transition-delay:120ms]">
              Generative AI is moving faster than policy. AI Watch Tower
              monitors employee interactions with AI systems in real time,
              detects risky usage, and turns risk intelligence into action —
              so your workforce stays productive and your perimeter stays
              intact.
            </p>
            <p className="reveal font-mono text-sm text-primary mt-4 [transition-delay:160ms]">
              "See the risk. Secure the intelligence."
            </p>
            <div className="reveal mt-8 flex flex-wrap gap-3 [transition-delay:200ms]">
              <Button size="lg" className="font-medium" onClick={() => navigate("/login")}>
                Access the console
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-medium bg-secondary/40"
                onClick={() => {
                  document.getElementById("what-we-do")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                See how it works
              </Button>
            </div>
              <div className="reveal mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground [transition-delay:240ms]">
                <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> SOC 2 Type II</span>
                <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> ISO 27001</span>
                <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> 4,300+ sessions/day monitored</span>
              </div>

              {/* SOC evidence strip — live console preview */}
              <div className="reveal mt-8 glass-panel px-5 py-4 max-w-[640px] [transition-delay:280ms]">
                <p className="eyebrow mb-3 !text-[0.6rem]">Live control plane preview</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-display text-2xl font-bold">246</p>
                    <p className="font-mono text-[0.62rem] text-muted-foreground mt-0.5">EMPLOYEES MONITORED</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-[var(--risk-high)]">9</p>
                    <p className="font-mono text-[0.62rem] text-muted-foreground mt-0.5">VIOLATIONS / WEEK</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-destructive">{OVERALL_ORG_RISK}%</p>
                    <p className="font-mono text-[0.62rem] text-muted-foreground mt-0.5">ORG RISK INDEX</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-destructive breathe" />
                  <p className="font-mono text-[0.62rem] text-muted-foreground truncate">
                    Alert · 09:58 — employee risk exceeded 60% threshold · audit #AX-88412
                  </p>
                </div>
                <div className="mt-3 h-9">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[31, 34, 29, 38, 42, 37, 44, 41, 47, 43, 39, 45]} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="heroSpark" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="oklch(0.62 0.19 275)" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="oklch(0.62 0.19 275)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="0" stroke="oklch(0.62 0.19 275)" strokeWidth={1.5} fill="url(#heroSpark)" dot={false} isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* ————— WHAT WE DO ————— */}
      <section id="what-we-do" className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
            <div>
              <p className="reveal eyebrow mb-4">What We Do</p>
              <h2 className="reveal font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight [transition-delay:60ms]">
                Visibility without surveillance fatigue
              </h2>
              <p className="reveal mt-5 text-muted-foreground leading-relaxed [transition-delay:120ms]">
                AI Watch Tower sits between your workforce and the generative AI
                ecosystem. It observes sessions on sanctioned tools, detects
                policy violations and sensitive-data exposure, and surfaces risk
                intelligence to authorized security staff — while giving every
                employee a safe, governed AI assistant of their own.
              </p>
              <div className="reveal mt-7 panel divide-y divide-border/60 [transition-delay:180ms]">
                {[
                  { id: "SIG-4011", t: "09:58", icon: Radar, text: "Real-time detection of risky AI usage across all monitored services.", chip: <RiskChip level="High" /> },
                  { id: "SIG-4012", t: "09:55", icon: FileSearch, text: "Automated identification of potential policy violations with context.", chip: <RiskChip level="Critical" /> },
                  { id: "SIG-4013", t: "09:52", icon: ShieldCheck, text: "Risk intelligence for authorized staff — never exposed to peers.", chip: <RiskChip level="Low" /> },
                  { id: "SIG-4014", t: "09:50", icon: Bot, text: "A governed AI assistant that keeps employees productive and safe.", chip: <RiskChip level="Medium" /> },
                ].map(({ id, t, icon: Icon, text, chip }) => (
                  <div key={id} className="flex items-start gap-3 px-4 py-3.5">
                    <span className="font-mono text-[0.62rem] text-muted-foreground w-9 shrink-0 pt-1">{t}</span>
                    <span className="mt-0.5 p-2 rounded-md bg-accent text-primary shrink-0">
                      <Icon className="h-4 w-4" />
                    </span>
                    <p className="text-sm text-foreground/90 flex-1">{text}</p>
                    <span className="font-mono text-[0.6rem] text-muted-foreground shrink-0 hidden md:block">{id}</span>
                    {chip}
                  </div>
                ))}
                <div className="flex items-center justify-between px-4 py-2.5">
                  <span className="font-mono text-[0.6rem] text-muted-foreground flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary breathe" />
                    FEED LIVE · 4,312 SESSIONS TODAY
                  </span>
                  <span className="font-mono text-[0.6rem] text-muted-foreground">LAST SCAN 11 S AGO</span>
                </div>
              </div>
            </div>
            <div className="reveal relative [transition-delay:120ms]">
              <img
                src={GOVERNANCE_URL}
                alt="AI governance lattice illustration"
                className="w-full rounded-xl border border-border"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
              {/* Console evidence overlay */}
              <div className="absolute bottom-4 left-4 right-4 panel px-4 py-3 bg-background/85 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.62rem] text-muted-foreground">POLICY LATTICE · 12 SERVICES SEALED</span>
                  <span className="flex items-center gap-1.5 font-mono text-[0.62rem] text-[var(--risk-low)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--risk-low)] breathe" /> COMPLIANT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container"><div className="signal-line" /></div>

      {/* ————— HOW IT PROTECTS ————— */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 items-start">
            <div>
              <p className="reveal eyebrow mb-4">How AI Watch Tower protects you</p>
              <h2 className="reveal font-display text-3xl sm:text-4xl font-bold tracking-tight [transition-delay:60ms]">
                A closed loop from detection to decision
              </h2>
              <p className="reveal mt-5 text-muted-foreground leading-relaxed [transition-delay:120ms]">
                Four stages, one governed pipeline. Every AI session is observed
                with privacy-preserving telemetry, scored continuously, escalated
                only above defined thresholds, and closed with employee
                guidance — not punishment.
              </p>
            </div>
            <div className="reveal space-y-3 [transition-delay:120ms]">
              {[
                { step: "01", icon: Eye, title: "Observe", text: "Monitors AI sessions on sanctioned services with privacy-preserving telemetry.", audit: "AUDIT-7F21 · 12 services · telemetry sealed" },
                { step: "02", icon: Radar, title: "Detect", text: "Scores risk continuously — sensitive data exposure, prompt misuse, policy drift.", audit: "4,312 sessions analyzed today" },
                { step: "03", icon: ShieldCheck, title: "Alert", text: "Thresholds above 60% trigger instant review for authorized staff only.", audit: "AUTO-TRIGGER · SCORE > 60%" },
                { step: "04", icon: Bot, title: "Assist", text: "Employees get a safe AI assistant and clear guidance to stay within policy.", audit: "09:58 · case AX-88412 opened" },
              ].map(({ step, icon: Icon, title, text, audit }, i) => (
                <div
                  key={title}
                  className="panel flex items-center gap-5 p-5 hover:border-primary/30 transition-all duration-200"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <span className="hidden sm:flex flex-col items-center gap-1.5 shrink-0">
                    <span className="p-2.5 rounded-lg bg-beacon-dim text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="w-px h-8 bg-border" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground w-8 shrink-0">{step}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{text}</p>
                  </div>
                  <span className="hidden md:block font-mono text-[0.62rem] text-primary/80 shrink-0 max-w-[180px] text-right border-l border-border pl-4">
                    {audit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ————— FEATURE HIGHLIGHTS ————— */}
      <section className="py-24 bg-secondary/30 border-y border-border">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <p className="reveal eyebrow mb-4">Capabilities</p>
              <h2 className="reveal font-display text-3xl sm:text-4xl font-bold tracking-tight [transition-delay:60ms]">
                Built for security teams. Respected by employees.
              </h2>
            </div>
            <Button variant="outline" className="hidden sm:inline-flex font-medium bg-background" onClick={placeholder}>
              Browse documentation
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          {/* Asymmetric console composition: main console panel + intelligence rail */}
          <div className="grid lg:grid-cols-[1fr_300px] gap-5">
            <div className="reveal panel p-7 [transition-delay:60ms]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-lg">Organizational risk trend</h3>
                <span className="font-mono text-[0.62rem] text-muted-foreground">WEIGHTED RISK INDEX · 12 WEEKS</span>
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { w: "W22", v: 31 }, { w: "W23", v: 34 }, { w: "W24", v: 29 },
                    { w: "W25", v: 38 }, { w: "W26", v: 42 }, { w: "W27", v: 37 },
                    { w: "W28", v: 44 }, { w: "W29", v: 41 }, { w: "W30", v: 47 },
                    { w: "W31", v: 43 }, { w: "W32", v: 39 }, { w: "W33", v: 45 },
                  ]} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                    <defs>
                      <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.62 0.19 275)" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="oklch(0.62 0.19 275)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="w" tick={{ fill: "oklch(0.62 0.015 260)", fontSize: 11, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "oklch(0.62 0.015 260)", fontSize: 11, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} unit="%" />
                    <Area type="monotone" dataKey="v" stroke="oklch(0.62 0.19 275)" strokeWidth={2} fill="url(#riskFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-4 pt-5 border-t border-border">
                <div>
                  <p className="font-display text-2xl font-bold">246</p>
                  <p className="font-mono text-[0.62rem] text-muted-foreground mt-0.5">MONITORED</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-[var(--risk-high)]">36</p>
                  <p className="font-mono text-[0.62rem] text-muted-foreground mt-0.5">AT RISK</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-destructive">{OVERALL_ORG_RISK}%</p>
                  <p className="font-mono text-[0.62rem] text-muted-foreground mt-0.5">ORG RISK</p>
                </div>
              </div>
            </div>
            <div className="reveal space-y-5 [transition-delay:120ms]">
              {[
                { code: "INT-3011", t: "09:57", title: "Organizational risk intelligence", text: "One view of monitored headcount, people at risk, overall risk percentage, and ranked employee risk — reserved for authorized staff.", chip: <RiskChip level="High" /> },
                { code: "INT-3012", t: "09:55", title: "Policy violation intelligence", text: "Automated classification of violations with evidence context, so security teams act on signals, not noise.", chip: <RiskChip level="Critical" /> },
                { code: "INT-3013", t: "09:53", title: "The employee's safe assistant", text: "A governed AI assistant inside the perimeter: approved services, redaction helpers, and self-serve policy answers.", chip: <RiskChip level="Low" /> },
              ].map(({ code, t, title, text, chip }) => (
                <div key={title} className="panel p-5 hover:-translate-y-0.5 hover:border-primary/30 transition-all duration-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[0.6rem] text-muted-foreground">{code}</span>
                    <span className="font-mono text-[0.6rem] text-muted-foreground">{t}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-semibold text-[0.95rem]">{title}</h3>
                    {chip}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ————— SECURITY / TRUST ————— */}
      <section id="who-we-are" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 beacon-wash pointer-events-none" />
        <div className="absolute left-[70%] top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none select-none">
          <svg width="300" height="300" viewBox="0 0 300 300" className="radar-sweep opacity-[0.10]">
            <circle cx="150" cy="150" r="145" fill="none" stroke="oklch(0.62 0.19 275)" strokeWidth="1" strokeDasharray="4 10" />
            <circle cx="150" cy="150" r="95" fill="none" stroke="oklch(0.62 0.19 275)" strokeWidth="1" strokeDasharray="2 14" />
            <circle cx="150" cy="150" r="45" fill="none" stroke="oklch(0.62 0.19 275)" strokeWidth="1" />
          </svg>
        </div>
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            <div className="reveal relative order-2 lg:order-1 [transition-delay:120ms]">
              <img
                src={SHIELD_URL}
                alt="Security trust shield illustration"
                className="w-full rounded-xl border border-border"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 panel px-4 py-3 bg-background/85 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.62rem] text-muted-foreground">AUDIT TRAIL · CONTROL PLANE SEALED</span>
                  <span className="flex items-center gap-1.5 font-mono text-[0.62rem] text-[var(--risk-low)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--risk-low)] breathe" /> VERIFIED
                  </span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="reveal eyebrow mb-4">Security & Trust</p>
              <h2 className="reveal font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight [transition-delay:60ms]">
                Governed by design, audited by default
              </h2>
              <p className="reveal mt-5 text-muted-foreground leading-relaxed [transition-delay:120ms]">
                We treat the monitor the same way we treat the monitored.
                Every signal is encrypted at rest, role access is enforced at
                the API layer — employees can never see peer risk scores or
                administrative data — and our control plane is independently
                audited.
              </p>
              <ul className="reveal mt-7 space-y-3 [transition-delay:180ms]">
                {[
                  "End-to-end encryption with key escrow for authorized review",
                  "Strict role separation: staff intelligence vs. employee workspace",
                  "SOC 2 Type II and ISO 27001 certified control plane",
                  "Data residency options and 30-day retention defaults",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-foreground/90">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
              {/* SOC evidence strip: recent security events feed */}
              <div className="reveal mt-8 panel p-5 [transition-delay:220ms]">
                <p className="eyebrow mb-3 !text-[0.6rem]">Control plane audit log · today</p>
                <ul className="space-y-0">
                  {SECURITY_EVENTS.slice(0, 3).map((ev, i) => (
                    <li key={ev.id} className={`flex items-start gap-3 py-2.5 ${i !== 2 ? "border-b border-border/60" : ""}`}>
                      <span className="font-mono text-[0.62rem] text-muted-foreground w-9 shrink-0">{ev.time}</span>
                      <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${
                        ev.level === "Critical" ? "bg-destructive breathe" :
                        ev.level === "High" ? "bg-[var(--risk-high)]" : "bg-primary"
                      }`} />
                      <span className="text-xs text-foreground/80 leading-relaxed">
                        {ev.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container"><div className="signal-line" /></div>

      {/* ————— RESOURCES / CAREERS / CONTACT band ————— */}
      <section className="py-24">
        <div className="container">
          <div id="resources" className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: FileText,
                code: "DOC-2.4.1",
                title: "Resources",
                text: "Documentation, policy templates, and the security whitepaper.",
                cta: "Explore resources",
                signal: "BUNDLE v2.4.1 SEALED",
                dot: "bg-[var(--risk-low)]",
              },
              {
                icon: Briefcase,
                code: "RC-0841",
                title: "Careers",
                text: "Security researchers, engineers, and product thinkers welcome.",
                cta: "View open roles",
                signal: "4 OPEN SEATS · ENG",
                dot: "bg-[var(--risk-med)]",
              },
              {
                icon: Phone,
                code: "REV-0073",
                title: "Contact",
                text: "Request a security review or talk to our governance team.",
                cta: "Request a review",
                signal: "QUEUE · 2 PENDING",
                dot: "bg-primary",
              },
            ].map(({ icon: Icon, code, title, text, cta, signal, dot }, i) => (
              <div
                key={title}
                className="reveal panel flex flex-col hover:-translate-y-0.5 hover:border-primary/30 transition-all duration-200"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-border/60">
                  <span className="font-mono text-[0.6rem] text-muted-foreground">{code}</span>
                  <span className={`h-1.5 w-1.5 rounded-full ${dot} ${dot === "bg-primary" ? "breathe" : ""}`} />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="p-2.5 rounded-lg bg-beacon-dim text-primary inline-flex mb-5 w-fit">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{text}</p>
                  <Button variant="ghost" className="mt-5 self-start text-primary hover:text-primary pl-0" onClick={placeholder}>
                    {cta}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                  <p className="mt-4 pt-3 border-t border-border/60 font-mono text-[0.6rem] text-muted-foreground">{signal}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="reveal mt-16 relative rounded-xl overflow-hidden border border-primary/25 bg-gradient-to-br from-[oklch(0.2_0.05_275)] via-card to-card p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 [transition-delay:120ms]">
            <div className="absolute inset-0 signal-grid opacity-40 pointer-events-none" />
            {/* Beacon mast at the left edge of the CTA panel */}
            <svg width="70" height="130" viewBox="0 0 60 120" className="absolute -left-3 -bottom-16 hidden md:block pointer-events-none select-none">
              <line x1="14" y1="110" x2="14" y2="38" stroke="oklch(0.62 0.19 275)" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="2" y1="110" x2="26" y2="110" stroke="oklch(0.62 0.19 275)" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="14" cy="30" r="6" fill="oklch(0.62 0.19 275)" className="breathe" />
            </svg>
            <div className="relative">
              <p className="font-mono text-[0.65rem] text-primary mb-3">PERIMETER REVIEW REQUEST · OPEN INTAKE</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                Ready to see what your AI perimeter looks like?
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl">
                Request a security review and get an honest read on your
                organization's generative AI risk posture — no obligation.
              </p>
            </div>
            <div className="relative flex gap-3 shrink-0">
              <Button size="lg" className="font-medium" onClick={() => navigate("/login")}>
                Access the console
              </Button>
              <Button size="lg" variant="outline" className="font-medium bg-secondary/40" onClick={placeholder}>
                Request a review
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
