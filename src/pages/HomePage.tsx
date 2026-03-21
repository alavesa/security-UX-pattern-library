import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Shield, Lock, LogIn, KeyRound, Timer, UserCheck, Terminal, ShieldAlert, AlertTriangle, Activity, ShieldOff, Cookie, Trash2, Eye, MousePointerClick, CreditCard, Upload, Settings, Bot, Sparkles, Brain, Fingerprint, Zap, Bell, Layers } from "lucide-react";

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    // Half-width katakana + digits — authentic Matrix characters
    const chars = "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789Z:・.=*+-<>¦╌";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => Math.random() * canvas.height / fontSize);

    let rafId: number;
    let last = 0;
    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);
      if (now - last < 33) return; // ~30fps
      last = now;

      // Fade overlay — creates the trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head — bright white-green (like the movie)
        ctx.fillStyle = "#cefad0";
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y);

        // Just behind head — pure green
        if (drops[i] > 0) {
          ctx.fillStyle = "#00ff41";
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, (drops[i] - 1) * fontSize);
        }

        // Random mutations in the trail
        if (Math.random() > 0.95 && drops[i] > 2) {
          ctx.fillStyle = "rgba(0, 255, 65, 0.3)";
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, Math.floor(Math.random() * drops[i]) * fontSize);
        }

        // Reset at bottom — staggered
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }

    };

    rafId = requestAnimationFrame(tick);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.3 }}
    />
  );
}

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
      <section className="px-4 sm:px-6 py-16 sm:py-24 text-center border-b relative overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <MatrixRain />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-sm font-mono px-4 py-1.5 rounded mb-6"
            style={{ background: "var(--green-glow)", color: "var(--green)", border: "1px solid var(--green-border)" }}>
            <Terminal className="w-4 h-4" />
            open-source pattern library
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 font-mono glow-text">
            Security UX<br />Patterns
          </h1>

          <p className="text-lg leading-relaxed mb-4 max-w-xl mx-auto" style={{ color: "var(--text-bright)" }}>
            Interactive patterns for designing secure user experiences.
          </p>
          <p className="text-sm leading-relaxed mb-8 max-w-lg mx-auto" style={{ color: "var(--text)" }}>
            Gathered from 20 years of experience in safety-critical industries — energy, maritime, drilling operations — and a double M.Sc. in Cyber Security and Information Systems. The patterns comply to any domain.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

          {/* Stats */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 font-mono">
            {[
              { value: "30", label: "patterns", color: "var(--green)" },
              { value: "8", label: "categories", color: "var(--cyan)" },
              { value: "16", label: "regulations", color: "var(--amber)" },
              { value: "4", label: "tools", color: "#c084fc" },
            ].map(({ value, label, color }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold" style={{ color }}>{value}</div>
                <div className="text-xs" style={{ color: "var(--text)" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Terminal prompt — all links clickable */}
          <div className="mt-12 font-mono text-xs text-left max-w-lg mx-auto p-3 sm:p-4 rounded overflow-x-auto" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div style={{ color: "#444" }}>$ ls ./patterns</div>
            <div className="mt-1" style={{ color: "var(--green)" }}>🔒 auth/ (7)</div>
            {[
              { path: "/patterns/auth/login", name: "login_flow", ref: "OWASP A07, CWE-307" },
              { path: "/patterns/auth/mfa", name: "multi_factor_auth", ref: "OWASP A07, CWE-308" },
              { path: "/patterns/auth/password-strength", name: "password_strength", ref: "OWASP A07, CWE-521" },
              { path: "/patterns/auth/session-timeout", name: "session_timeout", ref: "OWASP A07, CWE-613" },
              { path: "/patterns/auth/account-recovery", name: "account_recovery", ref: "OWASP A07, CWE-640" },
              { path: "/patterns/auth/passkeys", name: "passkeys", ref: "WebAuthn, FIDO2" },
              { path: "/patterns/auth/oauth-consent", name: "oauth_consent", ref: "OAuth 2.0, CWE-250" },
            ].map(({ path, name, ref }) => (
              <Link key={path} to={path} className="block no-underline hover:underline py-0.5 pl-3" style={{ color: "var(--text)" }}>
                {name} <span className="hidden sm:inline" style={{ color: "#333" }}>{'.'}{'.'.repeat(Math.max(1, 22 - name.length))}</span> <span className="hidden sm:inline" style={{ color: "#555" }}>{ref}</span>
              </Link>
            ))}

            <div className="mt-2" style={{ color: "var(--green)" }}>🔒 threat/ (3)</div>
            {[
              { path: "/patterns/threat/breach-notification", name: "breach_notification", ref: "GDPR Art. 33, CWE-200" },
              { path: "/patterns/threat/phishing-warning", name: "phishing_warning", ref: "OWASP A07, CWE-601" },
              { path: "/patterns/threat/suspicious-activity", name: "suspicious_activity", ref: "OWASP A07, CWE-778" },
            ].map(({ path, name, ref }) => (
              <Link key={path} to={path} className="block no-underline hover:underline py-0.5 pl-3" style={{ color: "var(--text)" }}>
                {name} <span className="hidden sm:inline" style={{ color: "#333" }}>{'.'}{'.'.repeat(Math.max(1, 22 - name.length))}</span> <span className="hidden sm:inline" style={{ color: "#555" }}>{ref}</span>
              </Link>
            ))}

            <div className="mt-2" style={{ color: "var(--red)" }}>⚠ dark_patterns/ (6)</div>
            {[
              { path: "/patterns/dark/confirmshaming", name: "confirmshaming", ref: "EU DSA" },
              { path: "/patterns/dark/cookie-consent", name: "cookie_consent", ref: "GDPR Art. 7" },
              { path: "/patterns/dark/hidden-unsubscribe", name: "hidden_unsubscribe", ref: "GDPR Art. 17" },
              { path: "/patterns/dark/privacy-zuckering", name: "privacy_zuckering", ref: "GDPR Art. 5" },
              { path: "/patterns/dark/bait-switch", name: "bait_and_switch", ref: "FTC Act §5" },
              { path: "/patterns/dark/forced-continuity", name: "forced_continuity", ref: "FTC Neg. Option" },
            ].map(({ path, name, ref }) => (
              <Link key={path} to={path} className="block no-underline hover:underline py-0.5 pl-3" style={{ color: "var(--text)" }}>
                {name} <span className="hidden sm:inline" style={{ color: "#333" }}>{'.'}{'.'.repeat(Math.max(1, 22 - name.length))}</span> <span className="hidden sm:inline" style={{ color: "#555" }}>{ref}</span>
              </Link>
            ))}

            <div className="mt-2" style={{ color: "var(--cyan)" }}>🔐 data/ (3)</div>
            {[
              { path: "/patterns/data/encryption", name: "encryption", ref: "OWASP A02, CWE-311" },
              { path: "/patterns/data/file-upload", name: "file_upload", ref: "OWASP A03, CWE-434" },
              { path: "/patterns/data/deletion", name: "data_deletion", ref: "GDPR Art. 17" },
              { path: "/patterns/data/activity-log", name: "activity_log", ref: "GDPR Art. 15, CWE-778" },
            ].map(({ path, name, ref }) => (
              <Link key={path} to={path} className="block no-underline hover:underline py-0.5 pl-3" style={{ color: "var(--text)" }}>
                {name} <span className="hidden sm:inline" style={{ color: "#333" }}>{'.'}{'.'.repeat(Math.max(1, 22 - name.length))}</span> <span className="hidden sm:inline" style={{ color: "#555" }}>{ref}</span>
              </Link>
            ))}

            <div className="mt-2" style={{ color: "var(--amber)" }}>🛡 owasp/ (3)</div>
            {[
              { path: "/patterns/owasp/broken-access-control", name: "A01_access_control", ref: "CWE-284" },
              { path: "/patterns/owasp/security-misconfiguration", name: "A05_misconfiguration", ref: "CWE-16" },
              { path: "/patterns/owasp/logging-monitoring", name: "A09_logging", ref: "CWE-778" },
            ].map(({ path, name, ref }) => (
              <Link key={path} to={path} className="block no-underline hover:underline py-0.5 pl-3" style={{ color: "var(--text)" }}>
                {name} <span className="hidden sm:inline" style={{ color: "#333" }}>{'.'}{'.'.repeat(Math.max(1, 22 - name.length))}</span> <span className="hidden sm:inline" style={{ color: "#555" }}>{ref}</span>
              </Link>
            ))}

            <div className="mt-2" style={{ color: "#c084fc" }}>🤖 ai/ (3)</div>
            {[
              { path: "/patterns/ai/disclosure", name: "ai_disclosure", ref: "EU AI Act Art. 50" },
              { path: "/patterns/ai/content-labeling", name: "content_labeling", ref: "Art. 50, C2PA" },
              { path: "/patterns/ai/decision-explanation", name: "decision_explanation", ref: "GDPR Art. 22" },
            ].map(({ path, name, ref }) => (
              <Link key={path} to={path} className="block no-underline hover:underline py-0.5 pl-3" style={{ color: "var(--text)" }}>
                {name} <span className="hidden sm:inline" style={{ color: "#333" }}>{'.'}{'.'.repeat(Math.max(1, 22 - name.length))}</span> <span className="hidden sm:inline" style={{ color: "#555" }}>{ref}</span>
              </Link>
            ))}

            <div className="mt-2" style={{ color: "#f97316" }}>🏭 industrial/ (4)</div>
            {[
              { path: "/patterns/industrial/operator-auth", name: "operator_auth", ref: "IEC 62443" },
              { path: "/patterns/industrial/safety-critical", name: "safety_critical", ref: "IEC 61511" },
              { path: "/patterns/industrial/alarm-fatigue", name: "alarm_fatigue", ref: "ISA-18.2" },
              { path: "/patterns/industrial/navigation-levels", name: "navigation_levels", ref: "ISA-101" },
            ].map(({ path, name, ref }) => (
              <Link key={path} to={path} className="block no-underline hover:underline py-0.5 pl-3" style={{ color: "var(--text)" }}>
                {name} <span className="hidden sm:inline" style={{ color: "#333" }}>{'.'}{'.'.repeat(Math.max(1, 22 - name.length))}</span> <span className="hidden sm:inline" style={{ color: "#555" }}>{ref}</span>
              </Link>
            ))}

            <div className="mt-2" style={{ color: "var(--text-bright)" }}>📋 governance/ (1)</div>
            {[
              { path: "/patterns/governance/design-review", name: "security_design_review", ref: "IEC 62443, ISO 27001" },
            ].map(({ path, name, ref }) => (
              <Link key={path} to={path} className="block no-underline hover:underline py-0.5 pl-3" style={{ color: "var(--text)" }}>
                {name} <span className="hidden sm:inline" style={{ color: "#333" }}>{'.'}{'.'.repeat(Math.max(1, 22 - name.length))}</span> <span className="hidden sm:inline" style={{ color: "#555" }}>{ref}</span>
              </Link>
            ))}

            <div className="mt-2" style={{ color: "#444" }}>$ cat ./CONTRIBUTING.md</div>
            <div style={{ color: "var(--green)" }}>🤝 contribute/ (16 wanted)</div>
            <div className="break-words" style={{ color: "#555" }}>   permissions · oauth_scopes · privacy_dashboard · age_verification · captcha · biometric_enrollment · magic_links · mobile_permissions · api_key_mgmt · secret_rotation · consent_audit · gdpr_requests ...</div>
            <div style={{ color: "#444" }}>   → <a href="https://github.com/alavesa/security-UX-pattern-library" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--green)" }}>fork & build a pattern</a></div>

            <div className="cursor-blink mt-1" style={{ color: "#444" }}>$</div>
          </div>
        </div>
      </section>

      {/* Pattern Cards */}
      <section className="px-4 sm:px-6 py-16 max-w-5xl mx-auto">
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
              { path: "/patterns/data/activity-log", label: "activity_log", icon: Activity, description: "Account activity, active devices with session revoke, data access log — GDPR Art. 15" },
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

        {/* Industrial */}
        <div className="mt-16">
          <h2 className="text-xl font-mono mb-2" style={{ color: "#f97316" }}>./industrial/</h2>
          <p className="mb-2" style={{ color: "var(--text)" }}>Industrial security UX — where IT security meets operational technology. Designed for control rooms, not offices.</p>
          <p className="text-xs mb-8" style={{ color: "#f97316" }}>From 20 years of industrial UX design leadership</p>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { path: "/patterns/industrial/operator-auth", label: "operator_auth", icon: Fingerprint, description: "Badge + PIN for gloved hands, adaptive biometrics, emergency override with accountability" },
              { path: "/patterns/industrial/safety-critical", label: "safety_critical", icon: Zap, description: "Emergency shutdown hold-to-confirm, graduated safety overrides, parameter change with range context" },
              { path: "/patterns/industrial/alarm-fatigue", label: "alarm_fatigue", icon: Bell, description: "Alarm flood vs smart grouping, root cause highlighting, alarm shelving — ISA-18.2 compliant" },
              { path: "/patterns/industrial/navigation-levels", label: "navigation_levels", icon: Layers, description: "ISA-101 4-level HMI hierarchy — plant overview to diagnostic detail with breadcrumbs and alarm navigation" },
            ].map(({ path, label, icon: Icon, description }) => (
              <Link
                key={path}
                to={path}
                className="group border rounded-lg p-6 no-underline transition-all"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.3)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(249,115,22,0.1)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <Icon className="w-6 h-6 mb-3" style={{ color: "#f97316" }} />
                <h3 className="font-mono font-semibold text-sm mb-2" style={{ color: "var(--text-bright)" }}>{label}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text)" }}>{description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Contribute */}
        <div className="mt-16">
          <h2 className="text-xl font-mono mb-2 glow-text">./contribute/</h2>
          <p className="mb-8" style={{ color: "var(--text)" }}>This is open source. Help make security UX better for everyone.</p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Add a pattern", desc: "Create a new interactive demo with guidelines. Each pattern = one React component following the existing structure.", color: "var(--green)" },
              { label: "Suggest a topic", desc: "Open an issue with a security UX problem you've seen. Describe the dark pattern or missing best practice.", color: "var(--cyan)" },
              { label: "Fix & improve", desc: "Found a bug, accessibility issue, or inaccurate guideline? PRs welcome. Run PatchPilots on the codebase to find issues.", color: "var(--amber)" },
            ].map(({ label, desc, color }) => (
              <div key={label} className="border rounded-lg p-6" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
                <h3 className="font-mono font-semibold text-sm mb-2" style={{ color }}>{label}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text)" }}>{desc}</p>
              </div>
            ))}
          </div>

          <div className="border rounded-xl p-6 text-center" style={{ borderColor: "var(--green-border)", background: "var(--green-glow)" }}>
            <p className="font-mono text-sm mb-3" style={{ color: "var(--green)" }}>$ git clone https://github.com/alavesa/security-UX-pattern-library.git</p>
            <p className="text-xs mb-4" style={{ color: "var(--text)" }}>
              Every pattern follows the same structure: interactive demo + PatternHeader + DemoContainer + GuidelineSection.
              <br />Adding a new pattern is one file — check CLAUDE.md for the guide.
            </p>
            <a
              href="https://github.com/alavesa/security-UX-pattern-library"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm no-underline"
              style={{ background: "var(--green)", color: "var(--bg)" }}
            >
              View on GitHub
            </a>
          </div>

          <div className="mt-8">
            <p className="font-mono text-xs mb-4 text-center" style={{ color: "#555" }}>Wanted patterns — help build these:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                "Permissions & access control",
                "OAuth scopes management",
                "Privacy dashboard",
                "Cookie preferences center",
                "Age verification (GDPR Art. 8)",
                "CAPTCHA & bot detection",
                "Biometric enrollment",
                "Magic link authentication",
                "Mobile app permissions",
                "Secure clipboard handling",
                "API key management UI",
                "Secret rotation dashboard",
                "Data processing agreements",
                "Consent audit trail",
                "GDPR data subject request",
                "Incident response playbook UI",
              ].map(item => (
                <div key={item} className="border border-dashed rounded px-3 py-2 text-xs font-mono" style={{ borderColor: "#333", color: "#555" }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Enforcement */}
      <section className="px-4 sm:px-6 py-16 max-w-5xl mx-auto border-t" style={{ borderColor: "var(--border)" }}>
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
      <section className="px-4 sm:px-6 py-16 max-w-5xl mx-auto border-t" style={{ borderColor: "var(--border)" }}>
        <h2 className="text-xl font-mono mb-6" style={{ color: "var(--text-bright)" }}>./sources/</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className="font-mono text-sm font-semibold mb-3" style={{ color: "#3b82f6" }}>EU Regulation</h3>
            <ul className="space-y-2 text-xs" style={{ color: "var(--text)" }}>
              <li><a href="https://gdpr-info.eu/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>GDPR</a> — Articles 5, 7, 15, 17, 20, 22, 33, 34</li>
              <li><a href="https://digital-strategy.ec.europa.eu/en/policies/nis2-directive" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>NIS2 Directive</a> — Cybersecurity for essential & important entities</li>
              <li><a href="https://www.digital-operational-resilience-act.com/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>DORA</a> — Digital Operational Resilience (financial sector, Jan 2025)</li>
              <li><a href="https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>CRA</a> — Cyber Resilience Act (digital products, 2027)</li>
              <li><a href="https://artificialintelligenceact.eu/article/50/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>EU AI Act Art. 50</a> — AI transparency obligations (Aug 2026)</li>
              <li><a href="https://artificialintelligenceact.eu/high-level-summary/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>EU AI Act Overview</a> — High-level summary</li>
              <li><a href="https://digital-strategy.ec.europa.eu/en/policies/digital-services-act-package" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>EU Digital Services Act</a> — Platform transparency + dark patterns</li>
              <li><a href="https://digital-strategy.ec.europa.eu/en/policies/eprivacy-regulation" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>ePrivacy Directive</a> — Cookie consent rules</li>
              <li><a href="https://commission.europa.eu/law/law-topic/consumer-protection-law_en" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>EU Consumer Rights Directive</a> — Cancellation + unfair practices</li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-sm font-semibold mb-3" style={{ color: "var(--green)" }}>Standards & Compliance</h3>
            <ul className="space-y-2 text-xs" style={{ color: "var(--text)" }}>
              <li><a href="https://owasp.org/www-project-top-ten/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>OWASP Top 10 (2021)</a> — Web application security risks</li>
              <li><a href="https://cwe.mitre.org/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>MITRE CWE</a> — Common Weakness Enumeration</li>
              <li><a href="https://pages.nist.gov/800-63-3/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>NIST SP 800-63B</a> — Digital Identity Guidelines</li>
              <li><a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>WCAG 2.1</a> — Web Content Accessibility Guidelines</li>
              <li><a href="https://www.iso.org/standard/27001" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>ISO 27001</a> — Information Security Management</li>
              <li><a href="https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>SOC 2</a> — Service organization security controls</li>
              <li><a href="https://www.pcisecuritystandards.org/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>PCI DSS</a> — Payment Card Industry Data Security</li>
              <li><a href="https://www.w3.org/TR/webauthn-2/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>WebAuthn Level 2</a> — Passkey / FIDO2 standard</li>
              <li><a href="https://datatracker.ietf.org/doc/html/rfc6749" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>RFC 6749 (OAuth 2.0)</a> — Authorization framework</li>
              <li><a href="https://datatracker.ietf.org/doc/html/rfc6238" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>RFC 6238</a> — TOTP Algorithm</li>
              <li><a href="https://oag.ca.gov/privacy/ccpa" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>CCPA</a> — California Consumer Privacy Act</li>
              <li><a href="https://www.ftc.gov/legal-library/browse/rules/negative-option-rule" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>FTC Negative Option Rule</a> — Consumer protection</li>
              <li><a href="https://c2pa.org/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>C2PA Standard</a> — Content provenance and authenticity</li>
              <li><a href="https://www.twobirds.com/en/insights/2026/taking-the-eu-ai-act-to-practice-understanding-the-draft-transparency-code-of-practice" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>AI Transparency Code of Practice</a> — Implementation guidance</li>
              <li><a href="https://www.iab.com/guidelines/ai-transparency-and-disclosure-framework/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>IAB AI Transparency Framework</a> — Risk-based disclosure</li>
              <li><a href="https://drata.com/blog/artificial-intelligence-regulations-state-and-federal-ai-laws-2026" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>US State AI Laws 2026</a> — Colorado, California, Illinois</li>
              <li><a href="https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=4015" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>Illinois AI Video Interview Act</a> — AI consent in hiring</li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-sm font-semibold mb-3" style={{ color: "#f97316" }}>Industrial Standards</h3>
            <ul className="space-y-2 text-xs" style={{ color: "var(--text)" }}>
              <li><a href="https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>IEC 62443</a> — Industrial automation security</li>
              <li><a href="https://www.iec.ch/functionalsafety" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>IEC 61511</a> — Safety instrumented systems</li>
              <li><a href="https://www.isa.org/products/ansi-isa-18-2-2016-management-of-alarm-systems-fo" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>ISA-18.2 / IEC 62682</a> — Alarm management</li>
              <li><a href="https://www.eemua.org/Products/Publications/Print/EEMUA-Publication-191.aspx" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>EEMUA 191</a> — Alarm systems guide</li>
              <li><a href="https://www.isa.org/products/isa-101-01-2015-human-machine-interfaces-for-proce" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>ISA-101</a> — HMI design for process industries</li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-sm font-semibold mb-3" style={{ color: "var(--cyan)" }}>Research & Data</h3>
            <ul className="space-y-2 text-xs" style={{ color: "var(--text)" }}>
              <li><a href="https://www.verizon.com/business/resources/reports/dbir/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>Verizon DBIR 2024</a> — Data Breach Investigations Report</li>
              <li><a href="https://www.ibm.com/reports/data-breach" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>IBM Cost of a Data Breach 2023</a> — 204-day average detection time</li>
              <li><a href="https://www.microsoft.com/en-us/security/blog/2019/08/20/one-simple-action-you-can-take-to-prevent-99-9-percent-of-account-attacks/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>Microsoft MFA Study</a> — MFA prevents 99.9% of attacks</li>
              <li><a href="https://arxiv.org/html/2601.13342v1" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>Privacy Starts with UI (USEC 2026)</a> — Privacy patterns in UI/UX</li>
              <li><a href="https://www.deceptive.design/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>Deceptive Design</a> — Dark patterns by Harry Brignull</li>
              <li><a href="https://www.deceptive.design/enforcement" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>Dark Patterns Enforcement</a> — Global enforcement database</li>
              <li><a href="https://sharkstriker.com/blog/march-data-breaches-today-2026/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--text-bright)" }}>Data Breaches March 2026</a> — Current breach tracker</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 sm:px-6 py-12 max-w-5xl mx-auto" style={{ borderColor: "var(--border)" }}>
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
