/*
 * AI WATCH TOWER — "Command Center Midnight"
 * Shared auth context: distinguishes Staff/Admin vs Employee roles.
 * Employees NEVER gain access to org risk data or the staff dashboard.
 */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Role = "staff" | "employee";

export interface User {
  role: Role;
  id: string;
  name: string;
}

interface AuthContextValue {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Demo auto-login for preview visitors: /dashboard/staff?demo=staff etc.
    try {
      const params = new URLSearchParams(window.location.search);
      const demo = params.get("demo");
      if (demo === "staff")
        return { role: "staff", id: "staff-admin-01", name: "Security Operations" };
      if (demo === "employee")
        return { role: "employee", id: "AWT-0843", name: "Jordan Rivera" };
    } catch {
      /* not in a browser */
    }
    return null;
  });

  useEffect(() => {
    // Clear the demo query so app state stays clean after boot
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has("demo")) {
        url.searchParams.delete("demo");
        window.history.replaceState({}, "", url.toString());
      }
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      login: (u: User) => setUser(u),
      logout: () => setUser(null),
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
