/*
 * AI WATCH TOWER — "Command Center Midnight" login page
 * Vertical split: brand panel left (dark, beacon glow), form panel right.
 * Role selection (Staff/Admin vs Employee) is visually distinct and drives
 * post-login routing. Employees can NEVER reach staff intelligence.
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { Shield, User, ArrowRight, RotateCcw, Lock, Eye, EyeOff, Activity } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BeaconGlyph from "@/components/BeaconGlyph";
import { useAuth, type Role } from "@/contexts/AuthContext";

const DEMO_CREDS: Record<Role, { id: string; password: string; name: string }> = {
  staff: { id: "staff-admin-01", password: "tower2026", name: "Security Operations" },
  employee: { id: "AWT-0843", password: "secure-pass", name: "Jordan Rivera" },
};

function generateCaptcha(): { text: string; answer: number } {
  const a = Math.floor(Math.random() * 8) + 2;
  const b = Math.floor(Math.random() * 8) + 2;
  return { text: `${a} + ${b} = ?`, answer: a + b };
}

export default function Login() {
  const [role, setRole] = useState<Role>("staff");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();
  const { login } = useAuth();

  const rotateCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim() || !password.trim()) {
      toast.error("Please enter your ID and password.");
      return;
    }
    if (parseInt(captchaInput, 10) !== captcha.answer) {
      toast.error("CAPTCHA answer is incorrect. Please try again.");
      rotateCaptcha();
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const expected = DEMO_CREDS[role];
      // Demo: accept the documented demo credentials OR any input (preview mode)
      const name = id === expected.id ? expected.name : id;
      login({ role, id: id || expected.id, name });
      toast.success(`Signed in as ${role === "staff" ? "Staff / Admin" : "Employee"}.`);
      navigate(role === "staff" ? "/dashboard/staff" : "/dashboard/employee");
    }, 700);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-[minmax(400px,44%)_1fr] flex-col lg:flex-row">
      {/* ————— Brand panel ————— */}
      <aside className="relative hidden lg:flex flex-col justify-between p-10 overflow-hidden bg-[oklch(0.135_0.014_268)] border-r border-border">
        <div className="absolute inset-0 signal-grid opacity-50" />
        <div className="absolute inset-0 beacon-wash pointer-events-none" />
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-beacon-dim blur-3xl breathe pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2.5">
            <BeaconGlyph className="h-8 w-8" />
            <span className="font-display font-bold tracking-tight text-foreground text-lg">
              AI WATCH
              <span className="ml-1 font-mono font-medium tracking-[0.22em] text-primary text-sm">TOWER</span>
            </span>
          </div>
          <blockquote className="mt-12 font-display text-3xl font-semibold leading-snug text-foreground">
            See the risk.
            <br />
            <span className="text-primary">Secure the intelligence.</span>
          </blockquote>
          <p className="mt-6 text-sm text-muted-foreground max-w-sm leading-relaxed">
            The enterprise control plane for safe generative-AI adoption.
            Authorized personnel only — all access is logged and audited.
          </p>
        </div>
        {/* Console signal log — fills the mid-panel void with a live-feeling artifact */}
        <div className="relative z-10 space-y-4">
          <div className="panel px-4 py-3.5 bg-background/60 backdrop-blur-sm">
            <p className="eyebrow mb-2.5 flex items-center gap-2 !text-[0.6rem]">
              <Activity className="h-3 w-3 text-primary" />
              Perimeter signal log · this session
            </p>
            <ul className="space-y-2">
              {[
                { t: "09:58", c: "bg-destructive", label: "RISK THRESHOLD EXCEEDED · CASE AX-88412", dim: "AUTO-TRIGGER · SCORE 85%" },
                { t: "09:41", c: "bg-[var(--risk-low)]", label: "POLICY BUNDLE v2.4.1 PROPAGATED", dim: "12 SERVICES · SEALED" },
                { t: "09:22", c: "bg-[var(--risk-high)]", label: "SENSITIVE-DATA PATTERN MATCH", dim: "PROMPT SESSION · EGRESS BLOCKED" },
                { t: "08:57", c: "bg-[var(--risk-low)]", label: "DAILY INTERACTION SCAN COMPLETE", dim: "4,312 SESSIONS ANALYZED" },
              ].map((row, i) => (
                <li key={row.t} className={`flex items-start gap-3 ${i !== 3 ? "border-b border-border/50 pb-2" : ""}`}>
                  <span className="font-mono text-[0.62rem] text-muted-foreground w-8 shrink-0 pt-0.5">{row.t}</span>
                  <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${row.c} ${row.c === "bg-destructive" ? "breathe" : ""}`} />
                  <span className="min-w-0">
                    <span className={`block font-mono text-[0.65rem] tracking-wide ${row.c === "bg-destructive" ? "text-destructive" : "text-foreground/85"}`}>
                      {row.label}
                    </span>
                    <span className="block font-mono text-[0.6rem] text-muted-foreground mt-0.5">{row.dim}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="font-mono text-xs text-muted-foreground space-y-1.5">
            <p>SESSION SECURED · TLS 1.3 · MFA ENFORCED</p>
            <p>UNAUTHORIZED ACCESS WILL BE LOGGED</p>
          </div>
        </div>
      </aside>

      {/* ————— Secure access panel ————— */}
      <main className="relative flex items-center justify-center p-6 sm:p-10 overflow-hidden bg-[oklch(0.17_0.015_265)]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 -top-24 w-[480px] h-[480px] -translate-x-1/2 rounded-full bg-beacon-dim blur-3xl breathe opacity-70" />
        </div>
        <div className="absolute top-6 right-6 hidden xl:flex items-center gap-2 panel px-3 py-1.5 z-10">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--risk-low)] breathe" />
          <span className="font-mono text-[0.65rem] text-muted-foreground">SECURE ENTRYPOINT · PORTAL v2.4</span>
        </div>
        <div className="relative z-10 w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <BeaconGlyph className="h-8 w-8" />
            <span className="font-display font-bold tracking-tight text-foreground">
              AI WATCH
              <span className="ml-1 font-mono font-medium tracking-[0.22em] text-primary text-sm">TOWER</span>
            </span>
          </div>

          <p className="eyebrow mb-3">Secure access</p>
          <h1 className="font-display text-2xl font-bold tracking-tight mb-8">
            Sign in to the console
          </h1>

          {/* Role selection — visually clear distinction */}
          <div className="grid grid-cols-2 gap-3 mb-7">
            <button
              type="button"
              onClick={() => setRole("staff")}
              aria-pressed={role === "staff"}
              className={`panel flex flex-col items-center gap-2 py-5 px-4 transition-all duration-200 active:scale-[0.97] ${
                role === "staff"
                  ? "border-primary/70 bg-beacon-dim ring-1 ring-primary/40"
                  : "hover:border-border/60 opacity-70"
              }`}
            >
              <span className={`p-2.5 rounded-lg ${role === "staff" ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground"}`}>
                <Shield className="h-5 w-5" />
              </span>
              <span className="font-display font-semibold text-sm">Staff / Admin</span>
              <span className="font-mono text-[0.65rem] text-muted-foreground text-center leading-tight">
                Org risk intelligence
              </span>
            </button>
            <button
              type="button"
              onClick={() => setRole("employee")}
              aria-pressed={role === "employee"}
              className={`panel flex flex-col items-center gap-2 py-5 px-4 transition-all duration-200 active:scale-[0.97] ${
                role === "employee"
                  ? "border-primary/70 bg-beacon-dim ring-1 ring-primary/40"
                  : "hover:border-border/60 opacity-70"
              }`}
            >
              <span className={`p-2.5 rounded-lg ${role === "employee" ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground"}`}>
                <User className="h-5 w-5" />
              </span>
              <span className="font-display font-semibold text-sm">Employee</span>
              <span className="font-mono text-[0.65rem] text-muted-foreground text-center leading-tight">
                Safe AI workspace
              </span>
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="login-id" className="text-xs font-mono uppercase tracking-wider">
                {role === "staff" ? "Staff ID" : "Employee ID"}
              </Label>
              <Input
                id="login-id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder={role === "staff" ? "e.g. staff-admin-01" : "e.g. AWT-0843"}
                autoComplete="username"
                className="h-11 bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-pw" className="text-xs font-mono uppercase tracking-wider">Password</Label>
              <div className="relative">
                <Input
                  id="login-pw"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="h-11 bg-secondary/50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* CAPTCHA */}
            <div className="space-y-2">
              <Label className="text-xs font-mono uppercase tracking-wider">Verification</Label>
              <div className="flex items-stretch gap-3">
                <div className="flex items-center gap-3 panel px-4 bg-secondary/50 font-mono text-base tracking-widest select-none min-w-[120px] justify-center">
                  <span>{captcha.text}</span>
                  <button type="button" onClick={rotateCaptcha} aria-label="Refresh CAPTCHA" className="text-muted-foreground hover:text-foreground transition-colors">
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
                <Input
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="Answer"
                  inputMode="numeric"
                  autoComplete="off"
                  className="h-11 bg-secondary/50"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-11 font-medium" disabled={loading}>
              {loading ? "Verifying…" : (
                <>
                  Sign in
                  <ArrowRight className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>

            <p className="text-center font-mono text-[0.68rem] text-muted-foreground flex items-center justify-center gap-1.5">
              <Lock className="h-3 w-3" />
              Demo preview — any ID and password are accepted. Staff demo: staff-admin-01 · Employee demo: AWT-0843
            </p>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors duration-150">← Back to aiwatchtower.com</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
