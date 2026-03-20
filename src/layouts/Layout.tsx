import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Shield, Lock, KeyRound, Timer, UserCheck, LogIn, ShieldAlert, AlertTriangle, Activity, ShieldOff, Cookie, Trash2, Eye, EyeOff, MousePointerClick, CreditCard, Upload, Settings, Bot, Sparkles, Brain, Menu, X, ChevronDown, Target, BarChart3, ClipboardCheck, Search, FileText, Fingerprint, Zap, Bell, Key, ExternalLink } from "lucide-react";
import { SearchDialog } from "../components/SearchDialog";

interface NavCategory {
  id: string;
  label: string;
  color: string;
  items: { path: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
}

const CATEGORIES: NavCategory[] = [
  {
    id: "auth", label: "auth", color: "var(--green)",
    items: [
      { path: "/patterns/auth/login", label: "login_flow", icon: LogIn },
      { path: "/patterns/auth/mfa", label: "multi_factor_auth", icon: Shield },
      { path: "/patterns/auth/password-strength", label: "password_strength", icon: KeyRound },
      { path: "/patterns/auth/session-timeout", label: "session_timeout", icon: Timer },
      { path: "/patterns/auth/account-recovery", label: "account_recovery", icon: UserCheck },
      { path: "/patterns/auth/passkeys", label: "passkeys", icon: Key },
      { path: "/patterns/auth/oauth-consent", label: "oauth_consent", icon: ExternalLink },
    ],
  },
  {
    id: "threat", label: "threat", color: "var(--green)",
    items: [
      { path: "/patterns/threat/breach-notification", label: "breach_notification", icon: ShieldAlert },
      { path: "/patterns/threat/phishing-warning", label: "phishing_warning", icon: AlertTriangle },
      { path: "/patterns/threat/suspicious-activity", label: "suspicious_activity", icon: Activity },
    ],
  },
  {
    id: "dark", label: "dark_patterns", color: "var(--red)",
    items: [
      { path: "/patterns/dark/confirmshaming", label: "confirmshaming", icon: ShieldOff },
      { path: "/patterns/dark/cookie-consent", label: "cookie_consent", icon: Cookie },
      { path: "/patterns/dark/hidden-unsubscribe", label: "hidden_unsubscribe", icon: EyeOff },
      { path: "/patterns/dark/privacy-zuckering", label: "privacy_zuckering", icon: Eye },
      { path: "/patterns/dark/bait-switch", label: "bait_and_switch", icon: MousePointerClick },
      { path: "/patterns/dark/forced-continuity", label: "forced_continuity", icon: CreditCard },
    ],
  },
  {
    id: "data", label: "data", color: "var(--cyan)",
    items: [
      { path: "/patterns/data/encryption", label: "encryption", icon: Lock },
      { path: "/patterns/data/file-upload", label: "file_upload", icon: Upload },
      { path: "/patterns/data/deletion", label: "deletion", icon: Trash2 },
    ],
  },
  {
    id: "owasp", label: "owasp", color: "var(--amber)",
    items: [
      { path: "/patterns/owasp/broken-access-control", label: "A01_access", icon: Shield },
      { path: "/patterns/owasp/security-misconfiguration", label: "A05_misconfig", icon: Settings },
      { path: "/patterns/owasp/logging-monitoring", label: "A09_logging", icon: Activity },
    ],
  },
  {
    id: "ai", label: "ai", color: "#c084fc",
    items: [
      { path: "/patterns/ai/disclosure", label: "disclosure", icon: Bot },
      { path: "/patterns/ai/content-labeling", label: "labeling", icon: Sparkles },
      { path: "/patterns/ai/decision-explanation", label: "decisions", icon: Brain },
    ],
  },
  {
    id: "industrial", label: "industrial", color: "#f97316",
    items: [
      { path: "/patterns/industrial/operator-auth", label: "operator_auth", icon: Fingerprint },
      { path: "/patterns/industrial/safety-critical", label: "safety_critical", icon: Zap },
      { path: "/patterns/industrial/alarm-fatigue", label: "alarm_fatigue", icon: Bell },
    ],
  },
];

const TOOLS = [
  { path: "/score", label: "score", icon: Target, color: "var(--green)" },
  { path: "/compliance", label: "compliance", icon: ClipboardCheck, color: "var(--cyan)" },
  { path: "/maturity", label: "maturity", icon: BarChart3, color: "var(--amber)" },
  { path: "/report", label: "report", icon: FileText, color: "#c084fc" },
];

const HEADER_NAV: { path: string; label: string; color: string; matchPrefix?: string }[] = [
  { path: "/patterns/auth/login", label: "patterns", color: "var(--text)", matchPrefix: "/patterns" },
  ...TOOLS,
];

const bgTint = (color: string, hex: string) => {
  if (!color.startsWith("var(")) return `${color}${hex}`;
  const pct = Math.round((parseInt(hex, 16) / 255) * 100);
  return `color-mix(in srgb, ${color} ${pct}%, transparent)`;
};

export function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

  // Cmd+K to open search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Auto-open the category that contains the current page
  useEffect(() => {
    for (const cat of CATEGORIES) {
      if (cat.items.some(item => location.pathname === item.path)) {
        setOpenCategories(prev => new Set([...prev, cat.id]));
        return;
      }
    }
  }, [location.pathname]);

  const toggleCategory = (id: string) => {
    setOpenCategories(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  // Which header link is active
  const headerActive = (path: string, matchPrefix?: string) => {
    if (matchPrefix) return location.pathname.startsWith(matchPrefix);
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <header className="border-b sticky top-0 z-50" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2.5 no-underline"
            onClick={() => { if (location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            <Shield className="w-[18px] h-[18px]" style={{ color: "var(--green)" }} />
            <span className="font-mono font-bold text-sm tracking-tight" style={{ color: "var(--green)" }}>
              uxsec<span style={{ color: "var(--text)" }}>.dev</span>
            </span>
          </Link>

          {/* Desktop nav — simplified */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-mono">
            {HEADER_NAV.map(({ path, label, color, matchPrefix }) => (
              <Link
                key={path}
                to={path}
                className="no-underline px-3 py-1.5 rounded-md transition-colors"
                style={{
                  color: headerActive(path, matchPrefix) ? color : "var(--text)",
                  background: headerActive(path, matchPrefix) ? bgTint(color, "15") : "transparent",
                }}
              >
                {label}
              </Link>
            ))}
            <span className="mx-1" style={{ color: "#222" }}>|</span>
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-transparent border-none cursor-pointer font-mono text-xs"
              style={{ color: "#555" }}
            >
              <Search className="w-3.5 h-3.5" /> <span className="text-xs px-1 py-0.5 rounded" style={{ background: "#1a1a1a", color: "#444" }}>⌘K</span>
            </button>
            <a href="https://github.com/alavesa/security-UX-pattern-library" target="_blank" rel="noopener noreferrer" className="no-underline px-3 py-1.5 rounded-md" style={{ color: "#555" }}>
              github
            </a>
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

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t px-6 py-4 space-y-1 font-mono text-sm max-h-[70vh] overflow-y-auto" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
            {TOOLS.map(({ path, label, icon: Icon, color }) => (
              <Link key={path} to={path} className="flex items-center gap-2 no-underline px-3 py-2 rounded" style={{ color, background: headerActive(path) ? bgTint(color, "15") : "transparent" }}>
                <Icon className="w-3.5 h-3.5" /> {label}
              </Link>
            ))}
            <div className="border-t my-2" style={{ borderColor: "var(--border)" }} />
            {CATEGORIES.map(cat => (
              <div key={cat.id}>
                <button onClick={() => toggleCategory(cat.id)} className="w-full flex items-center justify-between px-3 py-2 text-xs bg-transparent border-none cursor-pointer font-mono" aria-expanded={openCategories.has(cat.id)} style={{ color: cat.color }}>
                  {cat.label}/ <span style={{ color: "#555" }}>{cat.items.length}</span>
                </button>
                {openCategories.has(cat.id) && cat.items.map(item => (
                  <Link key={item.path} to={item.path} className="flex items-center gap-2 no-underline px-6 py-1.5 text-xs rounded" style={{ color: location.pathname === item.path ? cat.color : "var(--text)" }}>
                    <item.icon className="w-3 h-3" /> {item.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="border-t my-2" style={{ borderColor: "var(--border)" }} />
            <a href="https://github.com/alavesa/security-UX-pattern-library" target="_blank" rel="noopener noreferrer" className="block no-underline px-3 py-2 text-xs" style={{ color: "#555" }}>github</a>
          </nav>
        )}
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar — collapsible categories */}
        {!isHome && (
          <aside className="w-56 shrink-0 border-r min-h-[calc(100vh-3.5rem)] py-4 px-3 hidden lg:block overflow-y-auto" style={{ borderColor: "var(--border)" }}>
            {/* Tools */}
            <div className="mb-4">
              <p className="text-xs font-mono px-2 mb-2" style={{ color: "#444" }}>tools</p>
              {TOOLS.map(({ path, label, icon: Icon, color }) => (
                <Link
                  key={path}
                  to={path}
                  className="flex items-center gap-2 px-2 py-1.5 rounded text-xs no-underline font-mono transition-colors"
                  style={{
                    color: headerActive(path) ? color : "var(--text)",
                    background: headerActive(path) ? bgTint(color, "15") : "transparent",
                  }}
                >
                  <Icon className="w-3.5 h-3.5" /> {label}
                </Link>
              ))}
            </div>

            <div className="border-t my-3" style={{ borderColor: "var(--border)" }} />

            {/* Pattern categories — collapsible */}
            {CATEGORIES.map(cat => {
              const isOpen = openCategories.has(cat.id);
              const hasActive = cat.items.some(item => location.pathname === item.path);

              return (
                <div key={cat.id} className="mb-1">
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded text-xs font-mono bg-transparent border-none cursor-pointer transition-colors"
                    aria-expanded={isOpen}
                    style={{
                      color: hasActive ? cat.color : "var(--text)",
                      background: hasActive && !isOpen ? bgTint(cat.color, "10") : "transparent",
                    }}
                  >
                    <span className="flex items-center gap-1">
                      {cat.label}/
                      <span style={{ color: "#444" }}>{cat.items.length}</span>
                    </span>
                    <ChevronDown
                      className="w-3 h-3 transition-transform"
                      style={{ color: "#444", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>

                  {isOpen && (
                    <nav className="ml-2 space-y-0.5 mt-0.5">
                      {cat.items.map(({ path, label, icon: Icon }) => (
                        <Link
                          key={path}
                          to={path}
                          className="flex items-center gap-2 px-2 py-1 rounded text-xs no-underline font-mono transition-colors"
                          style={{
                            color: location.pathname === path ? cat.color : "var(--text)",
                            background: location.pathname === path ? bgTint(cat.color, "15") : "transparent",
                            borderLeft: location.pathname === path ? `2px solid ${cat.color}` : "2px solid transparent",
                          }}
                        >
                          <Icon className="w-3 h-3" />
                          {label}
                        </Link>
                      ))}
                    </nav>
                  )}
                </div>
              );
            })}
          </aside>
        )}

        {/* Main content */}
        <main className={`flex-1 ${isHome ? "" : "p-8"}`}>
          <Outlet />
        </main>
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
