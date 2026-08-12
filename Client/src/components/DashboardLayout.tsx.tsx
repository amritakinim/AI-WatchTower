/*
 * AI WATCH TOWER — "Command Center Midnight" dashboard shell
 * Persistent sidebar (role-aware), top bar with identity, role enforcement:
 * employees cannot reach staff routes; staff links are hidden from employees.
 */
import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "wouter";
import {
  LayoutDashboard,
  Users,
  Bell,
  History,
  ShieldCheck,
  Bot,
  Cloud,
  Wrench,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { toast } from "sonner";
import BeaconGlyph from "@/components/BeaconGlyph";
import { useAuth, type Role } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import RiskChip from "@/components/RiskChip";

interface NavItem {
  label: string;
  icon: ReactNode;
  href: string;
  badge?: string;
  staffOnly?: boolean;
  placeholder?: boolean;
}

const STAFF_NAV: NavItem[] = [
  { label: "Overview", icon: <LayoutDashboard className="h-4 w-4" />, href: "/dashboard/staff" },
  { label: "Employees", icon: <Users className="h-4 w-4" />, href: "/dashboard/staff?tab=employees" },
  { label: "Alerts", icon: <Bell className="h-4 w-4" />, href: "/dashboard/staff?tab=alerts", badge: "2" },
  { label: "Security Events", icon: <History className="h-4 w-4" />, href: "/dashboard/staff?tab=events" },
  { label: "Policy Center", icon: <ShieldCheck className="h-4 w-4" />, href: "#", placeholder: true },
];

const EMPLOYEE_NAV: NavItem[] = [
  { label: "Overview", icon: <LayoutDashboard className="h-4 w-4" />, href: "/dashboard/employee" },
  { label: "AI Assistant", icon: <Bot className="h-4 w-4" />, href: "/dashboard/employee?tab=assistant" },
  { label: "Cloud Services", icon: <Cloud className="h-4 w-4" />, href: "/dashboard/employee?tab=cloud", placeholder: true },
  { label: "Engineering Services", icon: <Wrench className="h-4 w-4" />, href: "/dashboard/employee?tab=engineering", placeholder: true },
  { label: "Resources", icon: <ShieldCheck className="h-4 w-4" />, href: "#", placeholder: true },
];

interface Props {
  role: Role;
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function DashboardLayout({ role, children, title, subtitle }: Props) {
  const { user, logout } = useAuth();
  const [location, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Role gating: employees cannot see staff routes and vice versa
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role === "employee" && location.startsWith("/dashboard/staff")) {
      toast.error("You do not have permission to view this area.");
      navigate("/dashboard/employee");
    }
    if (user.role === "staff" && location.startsWith("/dashboard/employee")) {
      navigate("/dashboard/staff");
    }
  }, [user, location, navigate]);

  const nav = role === "staff" ? STAFF_NAV : EMPLOYEE_NAV;

  const Sidebar = (
    <aside className="relative w-60 shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col h-full overflow-hidden">
      <div className="absolute right-0 top-24 -z-0 h-72 w-64 rounded-full bg-beacon-dim blur-3xl opacity-50 pointer-events-none breathe" />
      <div className="h-16 px-5 flex items-center gap-2.5 border-b border-sidebar-border relative z-10">
        <BeaconGlyph className="h-7 w-7" />
        <span className="font-display font-bold tracking-tight text-sidebar-foreground text-[0.95rem]">
          AI WATCH
          <span className="ml-1 font-mono font-medium tracking-[0.2em] text-primary text-[0.7rem]">TOWER</span>
        </span>
      </div>

      <div className="px-3 pt-4 pb-2">
        <p className="px-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground mb-2">
          {role === "staff" ? "Security Console" : "My Workspace"}
        </p>
        <nav className="space-y-0.5">
          {nav.map((item) => {
            const active =
              (item.href === location) ||
              (item.href.startsWith(location) && item.href.length >= location.length);
            return (
              <button
                key={item.label}
                onClick={() => {
                  setMobileOpen(false);
                  if (item.placeholder) {
                    toast("Coming soon in the next release.");
                    return;
                  }
                  navigate(item.href);
                }}
                className={`relative w-full flex items-center gap-3 pl-4 pr-3 py-2.5 rounded-md text-sm transition-colors duration-150 ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-full bg-primary shadow-[0_0_6px_oklch(0.62_0.19_275)]" />
                )}
                {item.icon}
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="font-mono text-[0.65rem] bg-destructive text-destructive-foreground rounded-full px-1.5 py-0.5">
                    {item.badge}
                  </span>
                )}
                {role === "staff" && item.label === "Employees" && <RiskChip level="High" />}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-3 border-t border-sidebar-border space-y-3">
        <div className="px-2">
          <p className="text-sm font-medium text-sidebar-foreground">{user?.name}</p>
          <p className="font-mono text-[0.68rem] text-muted-foreground">
            {role === "staff" ? "STAFF / ADMINISTRATOR" : user?.id}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full text-muted-foreground bg-transparent"
          onClick={() => {
            logout();
            toast("Signed out.");
            navigate("/");
          }}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-30">{Sidebar}</div>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-64 animate-in slide-in-from-left duration-200">
            {Sidebar}
          </div>
        </div>
      )}

      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 h-16 bg-background/92 backdrop-blur-md border-b border-border flex items-center justify-between px-4 lg:px-7">
          <div className="flex items-center gap-3 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="font-display font-semibold text-base lg:text-lg truncate">{title}</h1>
              {subtitle && (
                <p className="font-mono text-[0.68rem] text-muted-foreground truncate">{subtitle}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {role === "staff" && (
              <div className="hidden sm:flex items-center gap-1.5 panel px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary breathe" />
                <span className="font-mono text-[0.68rem] text-muted-foreground">LIVE MONITORING</span>
              </div>
            )}
            <div className="h-9 w-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center font-mono text-xs font-semibold text-primary">
              {user?.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-7">{children}</main>

        <footer className="px-4 lg:px-7 py-4 border-t border-border">
          <p className="font-mono text-[0.65rem] text-muted-foreground">
            AI WATCH TOWER · GOVERNED ENVIRONMENT · ACTIVITY LOGGED
          </p>
        </footer>
      </div>
    </div>
  );
}
