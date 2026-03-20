import { Outlet, Link, useLocation } from "react-router-dom";
import { Shield, Lock, KeyRound, Timer, UserCheck, LogIn, Terminal, ShieldAlert, AlertTriangle, Activity, ShieldOff, Cookie, Trash2, Eye, MousePointerClick, CreditCard, Upload, Settings } from "lucide-react";

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
            <Link to="/score" className="no-underline hover:underline" style={{ color: "var(--green)" }}>score</Link>
            <Link to="/compliance" className="no-underline hover:underline" style={{ color: "var(--cyan)" }}>compliance</Link>
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

            <h3 className="text-xs font-mono uppercase tracking-widest mt-8 mb-4" style={{ color: "#444" }}>
              $ ls threat/
            </h3>
            <nav className="space-y-0.5">
              {[
                { path: "/patterns/threat/breach-notification", label: "breach_notification", icon: ShieldAlert },
                { path: "/patterns/threat/phishing-warning", label: "phishing_warning", icon: AlertTriangle },
                { path: "/patterns/threat/suspicious-activity", label: "suspicious_activity", icon: Activity },
              ].map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className="flex items-center gap-3 px-3 py-2 rounded text-sm no-underline font-mono transition-colors"
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

            <h3 className="text-xs font-mono uppercase tracking-widest mt-8 mb-4" style={{ color: "#444" }}>
              $ ls dark_patterns/
            </h3>
            <nav className="space-y-0.5">
              {[
                { path: "/patterns/dark/confirmshaming", label: "confirmshaming", icon: ShieldOff },
                { path: "/patterns/dark/cookie-consent", label: "cookie_consent", icon: Cookie },
                { path: "/patterns/dark/hidden-unsubscribe", label: "hidden_unsubscribe", icon: Trash2 },
                { path: "/patterns/dark/privacy-zuckering", label: "privacy_zuckering", icon: Eye },
                { path: "/patterns/dark/bait-switch", label: "bait_and_switch", icon: MousePointerClick },
                { path: "/patterns/dark/forced-continuity", label: "forced_continuity", icon: CreditCard },
              ].map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className="flex items-center gap-3 px-3 py-2 rounded text-sm no-underline font-mono transition-colors"
                  style={{
                    color: location.pathname === path ? "var(--red)" : "var(--text)",
                    background: location.pathname === path ? "rgba(255,51,51,0.1)" : "transparent",
                    borderLeft: location.pathname === path ? "2px solid var(--red)" : "2px solid transparent",
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </Link>
              ))}
            </nav>

            <h3 className="text-xs font-mono uppercase tracking-widest mt-8 mb-4" style={{ color: "#444" }}>
              $ ls data/
            </h3>
            <nav className="space-y-0.5">
              {[
                { path: "/patterns/data/encryption", label: "encryption_indicators", icon: Lock },
                { path: "/patterns/data/file-upload", label: "secure_file_upload", icon: Upload },
                { path: "/patterns/data/deletion", label: "data_deletion", icon: Trash2 },
              ].map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className="flex items-center gap-3 px-3 py-2 rounded text-sm no-underline font-mono transition-colors"
                  style={{
                    color: location.pathname === path ? "var(--cyan)" : "var(--text)",
                    background: location.pathname === path ? "rgba(0,229,255,0.1)" : "transparent",
                    borderLeft: location.pathname === path ? "2px solid var(--cyan)" : "2px solid transparent",
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </Link>
              ))}
            </nav>

            <h3 className="text-xs font-mono uppercase tracking-widest mt-8 mb-4" style={{ color: "#444" }}>
              $ ls owasp/
            </h3>
            <nav className="space-y-0.5">
              {[
                { path: "/patterns/owasp/broken-access-control", label: "A01_access_control", icon: Shield },
                { path: "/patterns/owasp/security-misconfiguration", label: "A05_misconfiguration", icon: Settings },
                { path: "/patterns/owasp/logging-monitoring", label: "A09_logging", icon: Activity },
              ].map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className="flex items-center gap-3 px-3 py-2 rounded text-sm no-underline font-mono transition-colors"
                  style={{
                    color: location.pathname === path ? "var(--amber)" : "var(--text)",
                    background: location.pathname === path ? "rgba(255,170,0,0.1)" : "transparent",
                    borderLeft: location.pathname === path ? "2px solid var(--amber)" : "2px solid transparent",
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
              {["permissions/", "privacy/"].map(label => (
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
