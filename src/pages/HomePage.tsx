import { Link } from "react-router-dom";
import { Shield, Lock, LogIn, KeyRound, Timer, UserCheck, Terminal, ShieldAlert, AlertTriangle, Activity, ShieldOff, Cookie, Trash2, Eye, MousePointerClick, CreditCard, Upload } from "lucide-react";

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
              to="/score"
              className="inline-flex items-center gap-2 px-6 py-3 rounded font-mono font-medium text-sm no-underline transition-all hover:shadow-lg"
              style={{ background: "var(--green)", color: "var(--bg)", boxShadow: "0 0 20px var(--green-glow)" }}
            >
              $ get --score
            </Link>
            <Link
              to="/patterns/auth/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded font-mono font-medium text-sm no-underline transition-all border"
              style={{ borderColor: "var(--green-border)", color: "var(--green)", background: "transparent" }}
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
            <div style={{ color: "#444" }}>$ ls ./patterns</div>
            <div style={{ color: "var(--green)" }}>
              <span>🔒 5 auth patterns loaded</span>
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
              <span>🔒 3 threat response patterns loaded</span>
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
            <div style={{ color: "var(--red)" }}>
              <span>⚠ 3 dark patterns documented</span>
            </div>
            <div style={{ color: "var(--text)" }}>
              <span>   confirmshaming ........ EU DSA, Deceptive Design</span>
            </div>
            <div style={{ color: "var(--text)" }}>
              <span>   cookie_consent ........ GDPR Art. 7, ePrivacy</span>
            </div>
            <div style={{ color: "var(--text)" }}>
              <span>   hidden_unsubscribe .... GDPR Art. 17, Right to Erasure</span>
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

        {/* Dark Patterns */}
        <div className="mt-16">
          <h2 className="text-xl font-mono mb-2" style={{ color: "var(--red)" }}>./dark_patterns/</h2>
          <p className="mb-8" style={{ color: "var(--text)" }}>Anti-patterns — what NOT to do, and why. Each includes the ethical alternative.</p>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { path: "/patterns/dark/confirmshaming", label: "confirmshaming", icon: ShieldOff, description: "Guilt-trip dismiss buttons vs neutral, respectful alternatives" },
              { path: "/patterns/dark/cookie-consent", label: "cookie_consent", icon: Cookie, description: "The 'Accept All' manipulation vs GDPR-compliant consent" },
              { path: "/patterns/dark/hidden-unsubscribe", label: "hidden_unsubscribe", icon: Trash2, description: "4-step deletion maze vs 2-step ethical account deletion" },
              { path: "/patterns/dark/privacy-zuckering", label: "privacy_zuckering", icon: Eye, description: "Pre-enabled permissions and misleading data collection framing" },
              { path: "/patterns/dark/bait-switch", label: "bait_and_switch", icon: MousePointerClick, description: "X button that enables features instead of dismissing" },
              { path: "/patterns/dark/forced-continuity", label: "forced_continuity", icon: CreditCard, description: "Free trial auto-charge trap with hidden pricing" },
            ].map(({ path, label, icon: Icon, description }) => (
              <Link
                key={path}
                to={path}
                className="group border rounded-lg p-6 no-underline transition-all"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,51,51,0.3)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(255,51,51,0.1)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <Icon className="w-6 h-6 mb-3" style={{ color: "var(--red)" }} />
                <h3 className="font-mono font-semibold text-sm mb-2" style={{ color: "var(--text-bright)" }}>{label}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text)" }}>{description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Data Protection */}
        <div className="mt-16">
          <h2 className="text-xl font-mono mb-2" style={{ color: "var(--cyan)" }}>./data/</h2>
          <p className="mb-8" style={{ color: "var(--text)" }}>Data protection patterns — keeping data safe at rest, in transit, and on deletion.</p>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { path: "/patterns/data/encryption", label: "encryption_indicators", icon: Lock, description: "E2E messaging, connection security, and at-rest encryption dashboards" },
              { path: "/patterns/data/file-upload", label: "secure_file_upload", icon: Upload, description: "File type blocking, malware scanning, encryption status feedback" },
              { path: "/patterns/data/deletion", label: "data_deletion", icon: Trash2, description: "GDPR-compliant deletion with export, confirmation, and grace period" },
            ].map(({ path, label, icon: Icon, description }) => (
              <Link
                key={path}
                to={path}
                className="group border rounded-lg p-6 no-underline transition-all"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,229,255,0.3)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(0,229,255,0.1)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <Icon className="w-6 h-6 mb-3" style={{ color: "var(--cyan)" }} />
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
              { label: "privacy/", desc: "Privacy dashboards, tracking controls, data portability" },
              { label: "compliance/", desc: "GDPR notices, age verification, data processing agreements" },
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
