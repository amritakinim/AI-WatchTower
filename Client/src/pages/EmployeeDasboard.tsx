/*
 * AI WATCH TOWER — "Command Center Midnight" employee dashboard
 * Clean, friendly, professional. Primary feature: governed AI Assistant.
 * NO org data, NO peer risk scores, NO staff tooling — strictly personal.
 */
import { useState } from "react";
import {
  Bot,
  Send,
  Cloud,
  Wrench,
  ShieldCheck,
  Sparkles,
  FileText,
  RefreshCw,
  CheckCircle2,
  User,
  BadgeCheck,
} from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";
import RiskChip from "@/components/RiskChip";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  CURRENT_EMPLOYEE,
  AI_ASSISTANT_SUGGESTIONS,
  aiAssistantReply,
} from "@/lib/brand";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  text: string;
}

export default function EmployeeDashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: "assistant",
      text: aiAssistantReply("default"),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    const userMsg: ChatMessage = { id: Date.now(), role: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, role: "assistant", text: aiAssistantReply(trimmed) },
      ]);
      setTyping(false);
    }, 700);
  };

  return (
    <DashboardLayout role="employee" title="My Workspace" subtitle="GOVERNED ENVIRONMENT · PRIVATE TO YOU">
      <div className="grid lg:grid-cols-[300px_1fr] gap-5">
        {/* ————— Employee profile panel ————— */}
        <div className="space-y-5">
          <div className="panel p-6">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center font-display font-bold text-lg text-primary-foreground">
                {CURRENT_EMPLOYEE.avatar}
              </div>
              <div>
                <p className="font-display font-semibold flex items-center gap-1.5">
                  {CURRENT_EMPLOYEE.name}
                  <BadgeCheck className="h-4 w-4 text-primary" />
                </p>
                <p className="text-sm text-muted-foreground">{CURRENT_EMPLOYEE.department}</p>
              </div>
            </div>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="eyebrow">Employee ID</dt>
                <dd className="font-mono text-sm">{CURRENT_EMPLOYEE.employeeId}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="eyebrow">Compliance</dt>
                <dd><RiskChip level={CURRENT_EMPLOYEE.level} /></dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="eyebrow">Last review</dt>
                <dd className="text-muted-foreground text-xs">{CURRENT_EMPLOYEE.lastReview}</dd>
              </div>
            </dl>
            <div className="mt-5 pt-5 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
              <span>Your session is private. Nobody else can see your data.</span>
            </div>
          </div>

          {/* Approved cloud services */}
          <div className="panel p-6">
            <div className="flex items-center gap-2 mb-4">
              <Cloud className="h-4 w-4 text-primary" />
              <h3 className="font-display font-semibold text-sm">Approved cloud services</h3>
            </div>
            <ul className="space-y-3">
              {[
                { name: "Internal AI Assistant", status: "Active", ok: true },
                { name: "Secure file storage", status: "Active", ok: true },
                { name: "Governed model workspace", status: "Request access", ok: false },
              ].map((s) => (
                <li key={s.name} className="flex items-center justify-between text-sm">
                  <span className="text-foreground/90">{s.name}</span>
                  <span className={`flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-wide ${s.ok ? "text-[var(--risk-low)]" : "text-muted-foreground"}`}>
                    <CheckCircle2 className={`h-3.5 w-3.5 ${s.ok ? "" : "hidden"}`} />
                    {s.status}
                  </span>
                </li>
              ))}
            </ul>
            <Button
              variant="ghost"
              size="sm"
              className="mt-4 w-full text-primary hover:text-primary text-xs bg-primary/5"
              onClick={() => toast("Service catalog is a preview placeholder.")}
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              Check for new services
            </Button>
          </div>
        </div>

        {/* ————— AI Assistant (primary feature) ————— */}
        <div className="panel flex flex-col overflow-hidden" style={{ minHeight: "620px" }}>
          <div className="p-6 border-b border-border flex items-center gap-3">
            <span className="p-2.5 rounded-lg bg-primary text-primary-foreground">
              <Bot className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display font-semibold">AI Assistant</h2>
              <p className="font-mono text-[0.65rem] text-muted-foreground">
                GOVERNED · INSIDE THE PERIMETER · NOTHING LEAVES WITHOUT AUTHORIZATION
              </p>
            </div>
            <span className="ml-auto flex items-center gap-1.5 panel px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--risk-low)] breathe" />
              <span className="font-mono text-[0.65rem] text-muted-foreground">ONLINE</span>
            </span>
          </div>

          {/* Chat area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "assistant" && (
                  <span className="h-8 w-8 rounded-lg bg-beacon-dim text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="h-4 w-4" />
                  </span>
                )}
                <div
                  className={`max-w-[75%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary/50 border border-border rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-3">
                <span className="h-8 w-8 rounded-lg bg-beacon-dim text-primary flex items-center justify-center shrink-0">
                  <Sparkles className="h-4 w-4" />
                </span>
                <span className="panel px-4 py-3 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:120ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:240ms]" />
                </span>
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div className="px-6 pb-3 flex flex-wrap gap-2">
            {AI_ASSISTANT_SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="panel px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors duration-150 flex items-center gap-1.5 active:scale-[0.97]"
              >
                <Sparkles className="h-3 w-3 text-primary" />
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-6 pt-2 border-t border-border">
            <div className="flex gap-3 items-end">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask about approved services, policies, or safe data handling…"
                rows={2}
                className="bg-secondary/50 resize-none"
              />
              <Button
                onClick={() => send(input)}
                disabled={!input.trim() || typing}
                aria-label="Send message"
                className="h-11 w-11 shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-2 font-mono text-[0.62rem] text-muted-foreground">
              Replies are generated inside the governed environment. Report misuse via Resources → Report.
            </p>
          </div>
        </div>

        {/* ————— Engineering Services ————— */}
        <div className="lg:col-span-2 panel p-6">
          <div className="flex items-center gap-2 mb-1">
            <Wrench className="h-4 w-4 text-primary" />
            <h3 className="font-display font-semibold">Engineering services</h3>
          </div>
          <p className="font-mono text-[0.68rem] text-muted-foreground mb-5">
            Sanctioned development tooling available to your role
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                title: "Sanctioned model workspace",
                text: "Run approved models on internal workloads with full audit trail.",
                status: "Available",
                icon: FileText,
              },
              {
                title: "Code review helper",
                text: "AI-assisted review on internal repositories, governed output policies.",
                status: "Available",
                icon: CheckCircle2,
              },
              {
                title: "Redaction pipeline",
                text: "Anonymize PII before any content touches an external model.",
                status: "On request",
                icon: ShieldCheck,
              },
            ].map(({ title, text, status, icon: Icon }) => (
              <div key={title} className="panel bg-secondary/30 p-5 hover:border-primary/30 transition-colors duration-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="p-2 rounded-lg bg-beacon-dim text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[0.62rem] uppercase tracking-wide text-[var(--risk-low)]">{status}</span>
                </div>
                <h4 className="font-display font-semibold text-sm mb-1.5">{title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
