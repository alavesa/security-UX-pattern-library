import { Link } from "react-router-dom";
import { Shield, Lock, LogIn, KeyRound, Timer, UserCheck, Terminal, ShieldAlert, AlertTriangle, Activity, ShieldOff, Cookie, Trash2, Eye, MousePointerClick, CreditCard, Upload, Settings, Bot, Sparkles, Brain } from "lucide-react";

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

        {/* OWASP Top 10 */}
        <div className="mt-16">
          <h2 className="text-xl font-mono mb-2" style={{ color: "var(--amber)" }}>./owasp/</h2>
          <p className="mb-8" style={{ color: "var(--text)" }}>OWASP Top 10 patterns — the most critical web application security risks.</p>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { path: "/patterns/owasp/broken-access-control", label: "A01_access_control", icon: Shield, description: "Role-based UI, IDOR prevention, privilege escalation blocking" },
              { path: "/patterns/owasp/security-misconfiguration", label: "A05_misconfiguration", icon: Settings, description: "Security header dashboard, debug mode detection, default credential forcing" },
              { path: "/patterns/owasp/logging-monitoring", label: "A09_logging", icon: Activity, description: "Live event log, anomaly detection, per-user audit trails" },
            ].map(({ path, label, icon: Icon, description }) => (
              <Link
                key={path}
                to={path}
                className="group border rounded-lg p-6 no-underline transition-all"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,170,0,0.3)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(255,170,0,0.1)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <Icon className="w-6 h-6 mb-3" style={{ color: "var(--amber)" }} />
                <h3 className="font-mono font-semibold text-sm mb-2" style={{ color: "var(--text-bright)" }}>{label}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text)" }}>{description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* AI Transparency */}
        <div className="mt-16">
          <h2 className="text-xl font-mono mb-2" style={{ color: "#c084fc" }}>./ai/</h2>
          <p className="mb-2" style={{ color: "var(--text)" }}>AI transparency patterns — EU AI Act compliance, effective August 2026.</p>
          <p className="text-xs mb-8" style={{ color: "var(--red)" }}>Deadline: August 2026 — 5 months away</p>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { path: "/patterns/ai/disclosure", label: "ai_disclosure", icon: Bot, description: "Chatbot transparency — compliant vs non-compliant AI interaction disclosure" },
              { path: "/patterns/ai/content-labeling", label: "content_labeling", icon: Sparkles, description: "AI-generated content labels for social feeds, articles, and images (C2PA)" },
              { path: "/patterns/ai/decision-explanation", label: "decision_explanation", icon: Brain, description: "When AI decides about people — loans, moderation, hiring — explain why" },
            ].map(({ path, label, icon: Icon, description }) => (
              <Link
                key={path}
                to={path}
                className="group border rounded-lg p-6 no-underline transition-all"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(192,132,252,0.3)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(192,132,252,0.1)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <Icon className="w-6 h-6 mb-3" style={{ color: "#c084fc" }} />
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

      {/* Recent Enforcement */}
      <section className="px-6 py-16 max-w-5xl mx-auto border-t" style={{ borderColor: "var(--border)" }}>
        <h2 className="text-xl font-mono mb-2" style={{ color: "var(--red)" }}>./recent_enforcement/</h2>
        <p className="text-xs mb-6" style={{ color: "var(--text)" }}>Real fines for dark patterns and security failures — this is why these patterns matter.</p>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {[
            { company: "Amazon", fine: "$30M", authority: "FTC", reason: "Manipulative design patterns in subscription flows", year: "2026", link: "https://www.ketch.com/blog/posts/dark-patterns-are-they-illegal" },
            { company: "Epic Games", fine: "$245M", authority: "FTC", reason: "Deceptive patterns tricking players (including children) into purchases", year: "2024", link: "https://www.deceptive.design/enforcement" },
            { company: "TikTok", fine: "€345M", authority: "Irish DPC", reason: "Public-by-default accounts as a deceptive pattern", year: "2023", link: "https://www.deceptive.design/enforcement" },
            { company: "Meta", fine: "€1.2B", authority: "Irish DPC", reason: "GDPR data transfer violations", year: "2023", link: "https://www.deceptive.design/enforcement" },
          ].map(({ company, fine, authority, reason, year, link }) => (
            <a
              key={company}
              href={link}
              target="_blank"
              rel="noopener"
              className="border rounded-lg p-4 no-underline transition-all"
              style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,51,51,0.3)"; }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-sm" style={{ color: "var(--text-bright)" }}>{company}</span>
                <span className="font-mono font-bold text-sm" style={{ color: "var(--red)" }}>{fine}</span>
              </div>
              <p className="text-xs mb-1" style={{ color: "var(--text)" }}>{reason}</p>
              <p className="text-xs" style={{ color: "#555" }}>{authority} · {year}</p>
            </a>
          ))}
        </div>

        <div className="border rounded-lg p-4" style={{ borderColor: "rgba(255,170,0,0.2)", background: "rgba(255,170,0,0.05)" }}>
          <h3 className="font-mono text-sm font-semibold mb-3" style={{ color: "var(--amber)" }}>2026 enforcement trends</h3>
          <ul className="space-y-2 text-xs" style={{ color: "var(--text)" }}>
            <li><span style={{ color: "var(--amber)" }}>FTC Click-to-Cancel Rule</span> — actively enforcing since 2025, targets subscription dark patterns</li>
            <li><span style={{ color: "var(--amber)" }}>20 US states</span> now enforce consumer privacy statutes (Kentucky, Rhode Island, Indiana joined Jan 2026)</li>
            <li><span style={{ color: "var(--amber)" }}>EU AI-powered enforcement</span> — ML models scanning millions of websites for dark patterns</li>
            <li><span style={{ color: "var(--amber)" }}>Breach response focus</span> — enforcement now judges HOW you responded, not just that it happened</li>
            <li><span style={{ color: "var(--amber)" }}>EU AI Act Art. 50</span> — transparency obligations go live August 2026</li>
          </ul>
        </div>
      </section>

      {/* Sources & References */}
      <section className="px-6 py-16 max-w-5xl mx-auto border-t" style={{ borderColor: "var(--border)" }}>
        <h2 className="text-xl font-mono mb-6" style={{ color: "var(--text-bright)" }}>./sources/</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-mono text-sm font-semibold mb-3" style={{ color: "var(--green)" }}>Standards & Frameworks</h3>
            <ul className="space-y-2 text-xs" style={{ color: "var(--text)" }}>
              <li><a href="https://owasp.org/www-project-top-ten/" target="_blank" rel="noopener" className="hover:underline" style={{ color: "var(--text-bright)" }}>OWASP Top 10 (2021)</a> — Web application security risks</li>
              <li><a href="https://cwe.mitre.org/" target="_blank" rel="noopener" className="hover:underline" style={{ color: "var(--text-bright)" }}>MITRE CWE</a> — Common Weakness Enumeration</li>
              <li><a href="https://pages.nist.gov/800-63-3/" target="_blank" rel="noopener" className="hover:underline" style={{ color: "var(--text-bright)" }}>NIST SP 800-63B</a> — Digital Identity Guidelines</li>
              <li><a href="https://gdpr-info.eu/" target="_blank" rel="noopener" className="hover:underline" style={{ color: "var(--text-bright)" }}>GDPR</a> — Articles 5, 7, 17, 20, 22, 33, 34</li>
              <li><a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener" className="hover:underline" style={{ color: "var(--text-bright)" }}>WCAG 2.1</a> — Web Content Accessibility Guidelines</li>
              <li><a href="https://www.ftc.gov/legal-library/browse/rules/negative-option-rule" target="_blank" rel="noopener" className="hover:underline" style={{ color: "var(--text-bright)" }}>FTC Negative Option Rule</a> — Consumer protection for subscriptions</li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-sm font-semibold mb-3" style={{ color: "#c084fc" }}>AI Regulation</h3>
            <ul className="space-y-2 text-xs" style={{ color: "var(--text)" }}>
              <li><a href="https://artificialintelligenceact.eu/article/50/" target="_blank" rel="noopener" className="hover:underline" style={{ color: "var(--text-bright)" }}>EU AI Act Article 50</a> — AI transparency obligations (Aug 2026)</li>
              <li><a href="https://artificialintelligenceact.eu/high-level-summary/" target="_blank" rel="noopener" className="hover:underline" style={{ color: "var(--text-bright)" }}>EU AI Act Overview</a> — High-level summary of the regulation</li>
              <li><a href="https://www.twobirds.com/en/insights/2026/taking-the-eu-ai-act-to-practice-understanding-the-draft-transparency-code-of-practice" target="_blank" rel="noopener" className="hover:underline" style={{ color: "var(--text-bright)" }}>AI Transparency Code of Practice</a> — Draft implementation guidance</li>
              <li><a href="https://drata.com/blog/artificial-intelligence-regulations-state-and-federal-ai-laws-2026" target="_blank" rel="noopener" className="hover:underline" style={{ color: "var(--text-bright)" }}>US State AI Laws 2026</a> — Colorado, California, Illinois</li>
              <li><a href="https://www.iab.com/guidelines/ai-transparency-and-disclosure-framework/" target="_blank" rel="noopener" className="hover:underline" style={{ color: "var(--text-bright)" }}>IAB AI Transparency Framework</a> — Risk-based disclosure model</li>
              <li><a href="https://c2pa.org/" target="_blank" rel="noopener" className="hover:underline" style={{ color: "var(--text-bright)" }}>C2PA Standard</a> — Content provenance and authenticity</li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-sm font-semibold mb-3" style={{ color: "var(--green)" }}>Research & Data</h3>
            <ul className="space-y-2 text-xs" style={{ color: "var(--text)" }}>
              <li><a href="https://www.verizon.com/business/resources/reports/dbir/" target="_blank" rel="noopener" className="hover:underline" style={{ color: "var(--text-bright)" }}>Verizon DBIR 2024</a> — Data Breach Investigations Report</li>
              <li><a href="https://www.ibm.com/reports/data-breach" target="_blank" rel="noopener" className="hover:underline" style={{ color: "var(--text-bright)" }}>IBM Cost of a Data Breach 2023</a> — 204-day average detection time</li>
              <li><a href="https://www.microsoft.com/en-us/security/blog/2019/08/20/one-simple-action-you-can-take-to-prevent-99-9-percent-of-account-attacks/" target="_blank" rel="noopener" className="hover:underline" style={{ color: "var(--text-bright)" }}>Microsoft MFA Study</a> — MFA prevents 99.9% of attacks</li>
              <li><a href="https://arxiv.org/html/2601.13342v1" target="_blank" rel="noopener" className="hover:underline" style={{ color: "var(--text-bright)" }}>Privacy Starts with UI (USEC 2026)</a> — Privacy patterns in UI/UX</li>
              <li><a href="https://www.deceptive.design/" target="_blank" rel="noopener" className="hover:underline" style={{ color: "var(--text-bright)" }}>Deceptive Design</a> — Dark patterns by Harry Brignull</li>
              <li><a href="https://datatracker.ietf.org/doc/html/rfc6238" target="_blank" rel="noopener" className="hover:underline" style={{ color: "var(--text-bright)" }}>RFC 6238</a> — TOTP Algorithm</li>
              <li><a href="https://sharkstriker.com/blog/march-data-breaches-today-2026/" target="_blank" rel="noopener" className="hover:underline" style={{ color: "var(--text-bright)" }}>Data Breaches March 2026</a> — Current breach tracker</li>
              <li><a href="https://www.deceptive.design/enforcement" target="_blank" rel="noopener" className="hover:underline" style={{ color: "var(--text-bright)" }}>Dark Patterns Enforcement</a> — Global enforcement database</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-12 max-w-5xl mx-auto" style={{ borderColor: "var(--border)" }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" style={{ color: "var(--green)" }} />
            <span className="font-mono font-bold text-sm" style={{ color: "var(--green)" }}>uxsec<span style={{ color: "var(--text)" }}>.dev</span></span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono" style={{ color: "#555" }}>
            <a href="https://www.neversay.no" target="_blank" rel="noopener" className="hover:underline no-underline" style={{ color: "var(--text)" }}>piia alavesa</a>
            <span style={{ color: "#333" }}>·</span>
            <a href="https://www.linkedin.com/in/piia-alavesa/" target="_blank" rel="noopener" className="hover:underline no-underline" style={{ color: "var(--text)" }}>linkedin</a>
            <span style={{ color: "#333" }}>·</span>
            <a href="https://github.com/alavesa/security-UX-pattern-library" target="_blank" rel="noopener" className="hover:underline no-underline" style={{ color: "var(--text)" }}>github</a>
            <span style={{ color: "#333" }}>·</span>
            <span className="flex items-center gap-1">built with <a href="https://claude.ai" target="_blank" rel="noopener" className="hover:underline no-underline" style={{ color: "var(--cyan)" }}>claude</a></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
