import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Shield, Lock, KeyRound, Timer, UserCheck, LogIn, Terminal, ShieldAlert, AlertTriangle, Activity, ShieldOff, Cookie, Trash2, Eye, MousePointerClick, CreditCard, Upload, Settings, Bot, Sparkles, Brain, Menu, X } from "lucide-react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <header className="border-b sticky top-0 z-50" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <Shield className="w-4.5 h-4.5" style={{ color: "var(--green)" }} />
            <span className="font-mono font-bold text-sm tracking-tight" style={{ color: "var(--green)" }}>
              uxsec<span style={{ color: "var(--text)" }}>.dev</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-mono">
            <Link to="/" className="no-underline hover:underline" style={{ color: "var(--text)" }}>~/home</Link>
            <Link to="/score" className="no-underline hover:underline" style={{ color: "var(--green)" }}>score</Link>
            <Link to="/compliance" className="no-underline hover:underline" style={{ color: "var(--cyan)" }}>compliance</Link>
            <Link to="/maturity" className="no-underline hover:underline" style={{ color: "var(--amber)" }}>maturity</Link>
            <a href="https://github.com/alavesa/security-UX-pattern-library" target="_blank" rel="noopener" className="no-underline hover:underline" style={{ color: "var(--text)" }}>github</a>
            <span className="text-xs" style={{ color: "#444" }}>by piia.alavesa</span>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden bg-transparent border-none cursor-pointer p-1"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen
              ? <X className="w-5 h-5" style={{ color: "var(--green)" }} />
              : <Menu className="w-5 h-5" style={{ color: "var(--text)" }} />
            }
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t px-6 py-4 space-y-3 font-mono text-sm" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
            <Link to="/" className="block no-underline py-1" style={{ color: "var(--text)" }}>~/home</Link>
            <Link to="/score" className="block no-underline py-1" style={{ color: "var(--green)" }}>score</Link>
            <Link to="/compliance" className="block no-underline py-1" style={{ color: "var(--cyan)" }}>compliance</Link>
            <Link to="/maturity" className="block no-underline py-1" style={{ color: "var(--amber)" }}>maturity</Link>

            <div className="border-t pt-3" style={{ borderColor: "var(--border)" }}>
              <p className="text-xs mb-2" style={{ color: "#444" }}>patterns</p>
              <Link to="/patterns/auth/login" className="block no-underline py-1 text-xs" style={{ color: "var(--text)" }}>auth/</Link>
              <Link to="/patterns/threat/breach-notification" className="block no-underline py-1 text-xs" style={{ color: "var(--text)" }}>threat/</Link>
              <Link to="/patterns/dark/confirmshaming" className="block no-underline py-1 text-xs" style={{ color: "var(--red)" }}>dark_patterns/</Link>
              <Link to="/patterns/data/encryption" className="block no-underline py-1 text-xs" style={{ color: "var(--cyan)" }}>data/</Link>
              <Link to="/patterns/owasp/broken-access-control" className="block no-underline py-1 text-xs" style={{ color: "var(--amber)" }}>owasp/</Link>
              <Link to="/patterns/ai/disclosure" className="block no-underline py-1 text-xs" style={{ color: "#c084fc" }}>ai/</Link>
            </div>

            <div className="border-t pt-3" style={{ borderColor: "var(--border)" }}>
              <a href="https://github.com/alavesa/security-UX-pattern-library" target="_blank" rel="noopener" className="block no-underline py-1 text-xs" style={{ color: "var(--text)" }}>github</a>
              <span className="block text-xs py-1" style={{ color: "#444" }}>by piia.alavesa</span>
            </div>
          </nav>
        )}
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

            <h3 className="text-xs font-mono uppercase tracking-widest mt-8 mb-4" style={{ color: "#444" }}>
              $ ls ai/
            </h3>
            <nav className="space-y-0.5">
              {[
                { path: "/patterns/ai/disclosure", label: "ai_disclosure", icon: Bot },
                { path: "/patterns/ai/content-labeling", label: "content_labeling", icon: Sparkles },
                { path: "/patterns/ai/decision-explanation", label: "decision_explanation", icon: Brain },
              ].map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className="flex items-center gap-3 px-3 py-2 rounded text-sm no-underline font-mono transition-colors"
                  style={{
                    color: location.pathname === path ? "#c084fc" : "var(--text)",
                    background: location.pathname === path ? "rgba(192,132,252,0.1)" : "transparent",
                    borderLeft: location.pathname === path ? "2px solid #c084fc" : "2px solid transparent",
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
