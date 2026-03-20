import { Outlet, Link, useLocation } from "react-router-dom";
import { Shield, Lock, KeyRound, Timer, UserCheck, LogIn, Terminal } from "lucide-react";

const AUTH_PATTERNS = [
  { path: "/patterns/auth/login", label: "login_flow", icon: LogIn },
  { path: "/patterns/auth/mfa", label: "multi_factor_auth", icon: Shield },
  { path: "/patterns/auth/password-strength", label: "password_strength", icon: KeyRound },
  { path: "/patterns/auth/session-timeout", label: "session_timeout", icon: Timer },
  { path: "/patterns/auth/account-recovery", label: "account_recovery", icon: UserCheck },
];

export function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <header className="border-b sticky top-0 z-50" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <Terminal className="w-4 h-4" style={{ color: "var(--green)" }} />
            <span className="font-mono font-semibold text-sm" style={{ color: "var(--green)" }}>
              security-ux-patterns
            </span>
            <span className="font-mono text-xs" style={{ color: "var(--text)" }}>v1.0</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-mono">
            <Link to="/" className="no-underline hover:underline" style={{ color: "var(--text)" }}>~/home</Link>
            <a href="https://github.com/alavesa/security-UX-pattern-library" target="_blank" rel="noopener" className="no-underline hover:underline" style={{ color: "var(--text)" }}>github</a>
            <span className="text-xs" style={{ color: "#444" }}>by piia.alavesa</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        {!isHome && (
          <aside className="w-64 shrink-0 border-r min-h-[calc(100vh-3.5rem)] p-5 hidden lg:block" style={{ borderColor: "var(--border)" }}>
            <h3 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "#444" }}>
              $ ls auth/
            </h3>
            <nav className="space-y-0.5">
              {AUTH_PATTERNS.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-3 px-3 py-2 rounded text-sm no-underline font-mono transition-colors ${
                    location.pathname === path
                      ? ""
                      : ""
                  }`}
                  style={{
                    color: location.pathname === path ? "var(--green)" : "var(--text)",
                    background: location.pathname === path ? "var(--green-glow)" : "transparent",
                    borderLeft: location.pathname === path ? "2px solid var(--green)" : "2px solid transparent",
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </Link>
              ))}
            </nav>

            <h3 className="text-xs font-mono uppercase tracking-widest mt-8 mb-4" style={{ color: "#333" }}>
              $ ls --coming-soon
            </h3>
            <nav className="space-y-0.5">
              {["permissions/", "threat_response/", "data_protection/", "privacy/"].map(label => (
                <span key={label} className="flex items-center gap-3 px-3 py-2 text-sm font-mono" style={{ color: "#333" }}>
                  <Lock className="w-3.5 h-3.5" />
                  {label}
                </span>
              ))}
            </nav>
          </aside>
        )}

        {/* Main content */}
        <main className={`flex-1 ${isHome ? "" : "p-8"}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
