import { Link } from "react-router-dom";
import { Shield, Lock, LogIn, KeyRound, Timer, UserCheck, Terminal, ShieldAlert, AlertTriangle, Activity } from "lucide-react";

const AUTH_PATTERNS = [
  {
    path: "/patterns/auth/login",
    label: "login_flow",
    icon: LogIn,
    description: "Secure login with rate limiting, error handling, and progressive disclosure",
  },
  {
    path: "/patterns/auth/mfa",
    label: "multi_factor_auth",
    icon: Shield,
    description: "TOTP, SMS, and hardware key flows with clear user guidance",
  },
  {
    path: "/patterns/auth/password-strength",
    label: "password_strength",
    icon: KeyRound,
    description: "Real-time feedback, zxcvbn-style scoring, and breach detection",
  },
  {
    path: "/patterns/auth/session-timeout",
    label: "session_timeout",
    icon: Timer,
    description: "Graceful timeout warnings, auto-save, and secure re-authentication",
  },
  {
    path: "/patterns/auth/account-recovery",
    label: "account_recovery",
    icon: UserCheck,
    description: "Secure recovery flows that balance usability with identity verification",
  },
];

export function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="px-6 py-24 text-center border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-sm font-mono px-4 py-1.5 rounded mb-6"
            style={{ background: "var(--green-glow)", color: "var(--green)", border: "1px solid var(--green-border)" }}>
            <Terminal className="w-4 h-4" />
            open-source pattern library
          </div>

          <h1 className="text-5xl font-bold tracking-tight mb-6 font-mono glow-text">
            Security UX<br />Patterns
          </h1>

          <p className="text-lg leading-relaxed mb-4 max-w-xl mx-auto" style={{ color: "var(--text-bright)" }}>
            Interactive patterns for designing secure user experiences.
          </p>
          <p className="text-sm leading-relaxed mb-8 max-w-lg mx-auto" style={{ color: "var(--text)" }}>
            Built from 20 years of UX design leadership and a double M.Sc. in
            Cyber Security and Information Systems.
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              to="/patterns/auth/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded font-mono font-medium text-sm no-underline transition-all hover:shadow-lg"
              style={{ background: "var(--green)", color: "var(--bg)", boxShadow: "0 0 20px var(--green-glow)" }}
            >
              $ explore --patterns
            </Link>
            <a
              href="https://github.com/alavesa/security-UX-pattern-library"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 border px-6 py-3 rounded font-mono font-medium text-sm no-underline transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--text-bright)", background: "transparent" }}
            >
              $ git clone
            </a>
          </div>

          {/* Terminal prompt */}
          <div className="mt-12 font-mono text-sm text-left max-w-md mx-auto p-4 rounded" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div style={{ color: "#444" }}>$ patchpilots security ./auth-patterns</div>
            <div style={{ color: "var(--green)" }}>
              <span>🔒 5 patterns loaded</span>
            </div>
            <div style={{ color: "var(--text)" }}>
              <span>   login_flow ............ OWASP A07, CWE-307</span>
            </div>
            <div style={{ color: "var(--text)" }}>
              <span>   multi_factor_auth ..... OWASP A07, CWE-308</span>
            </div>
            <div style={{ color: "var(--text)" }}>
              <span>   password_strength ..... OWASP A07, CWE-521</span>
            </div>
            <div style={{ color: "var(--text)" }}>
              <span>   session_timeout ....... OWASP A07, CWE-613</span>
            </div>
            <div style={{ color: "var(--text)" }}>
              <span>   account_recovery ...... OWASP A07, CWE-640</span>
            </div>
            <div style={{ color: "var(--green)" }}>
              <span>🔒 3 threat patterns loaded</span>
            </div>
            <div style={{ color: "var(--text)" }}>
              <span>   breach_notification ... GDPR Art. 33, CWE-200</span>
            </div>
            <div style={{ color: "var(--text)" }}>
              <span>   phishing_warning ...... OWASP A07, CWE-601</span>
            </div>
            <div style={{ color: "var(--text)" }}>
              <span>   suspicious_activity ... OWASP A07, CWE-778</span>
            </div>
            <div className="cursor-blink" style={{ color: "#444" }}>$</div>
          </div>
        </div>
      </section>

      {/* Pattern Cards */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-xl font-mono mb-2 glow-text">./auth/</h2>
        <p className="mb-8" style={{ color: "var(--text)" }}>Authentication patterns — the front door of security.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AUTH_PATTERNS.map(({ path, label, icon: Icon, description }) => (
            <Link
              key={path}
              to={path}
              className="group border rounded-lg p-6 no-underline transition-all"
              style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--green-border)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px var(--green-glow)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <Icon className="w-6 h-6 mb-3" style={{ color: "var(--green)" }} />
              <h3 className="font-mono font-semibold text-sm mb-2" style={{ color: "var(--text-bright)" }}>{label}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text)" }}>{description}</p>
            </Link>
          ))}
        </div>

        {/* Threat Response */}
        <div className="mt-16">
          <h2 className="text-xl font-mono mb-2 glow-text">./threat/</h2>
          <p className="mb-8" style={{ color: "var(--text)" }}>Threat response patterns — when things go wrong.</p>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { path: "/patterns/threat/breach-notification", label: "breach_notification", icon: ShieldAlert, description: "Multi-channel breach disclosure with GDPR compliance and user action checklists" },
              { path: "/patterns/threat/phishing-warning", label: "phishing_warning", icon: AlertTriangle, description: "Interstitial warnings, email phishing indicators, and link safety previews" },
              { path: "/patterns/threat/suspicious-activity", label: "suspicious_activity", icon: Activity, description: "Sign-in alerts, active session management, and new device approval" },
            ].map(({ path, label, icon: Icon, description }) => (
              <Link
                key={path}
                to={path}
                className="group border rounded-lg p-6 no-underline transition-all"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--green-border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px var(--green-glow)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <Icon className="w-6 h-6 mb-3" style={{ color: "var(--red, #ff3333)" }} />
                <h3 className="font-mono font-semibold text-sm mb-2" style={{ color: "var(--text-bright)" }}>{label}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text)" }}>{description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <div className="mt-16">
          <h2 className="text-xl font-mono mb-2" style={{ color: "#444" }}>./coming-soon/</h2>
          <p className="mb-8" style={{ color: "#444" }}>More patterns in development.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: "permissions/", desc: "Role-based access, consent flows, admin controls" },
              { label: "data_protection/", desc: "Encryption indicators, secure sharing, privacy controls" },
              { label: "privacy/", desc: "Cookie consent, data export, account deletion" },
            ].map(({ label, desc }) => (
              <div key={label} className="border border-dashed rounded-lg p-6" style={{ borderColor: "#222" }}>
                <Lock className="w-6 h-6 mb-3" style={{ color: "#333" }} />
                <h3 className="font-mono font-semibold text-sm mb-2" style={{ color: "#444" }}>{label}</h3>
                <p className="text-xs" style={{ color: "#333" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-8 text-center font-mono text-xs" style={{ borderColor: "var(--border)", color: "#444" }}>
        <p>built by <a href="https://www.neversay.no" className="hover:underline" style={{ color: "var(--green-dim)" }}>piia.alavesa</a> — senior ux design leader</p>
        <p className="mt-1">m.sc. cyber security + m.sc. information systems</p>
      </footer>
    </div>
  );
}
