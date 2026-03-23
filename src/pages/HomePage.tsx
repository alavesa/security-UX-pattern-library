import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { Shield, Lock, LogIn, KeyRound, Timer, UserCheck, Terminal, ShieldAlert, AlertTriangle, Activity, ShieldOff, Cookie, Trash2, Eye, MousePointerClick, CreditCard, Upload, Settings, Bot, Sparkles, Brain, Fingerprint, Zap, Bell, Layers, ClipboardCheck, GitBranch, FileText, ChevronUp } from "lucide-react";

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

const BUILD_DATE = new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }).toLowerCase();

function AnchorHeading({ id, children, className, style }: { id: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <h2 id={id} className={className} style={style}>
      {children}
    </h2>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    setVisible(window.scrollY > 600);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs border-none cursor-pointer transition-all z-50"
      style={{ background: "var(--bg-card)", color: "var(--green)", border: "1px solid var(--green-border)", boxShadow: "0 0 15px var(--green-glow)" }}
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}

export function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section id="hero" className="px-4 sm:px-6 py-16 sm:py-24 text-center border-b relative overflow-hidden" style={{ borderColor: "var(--border)" }}>
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
            Security is a design decision.<br />Bad UX is a vulnerability.
          </p>
          <p className="text-sm leading-relaxed mb-8 max-w-lg mx-auto" style={{ color: "var(--text)" }}>
            34 interactive patterns that turn regulatory requirements into working UI. From GDPR consent to EU AI Act compliance — each pattern is a live demo with do/don't guidelines, enforcement context, and accessibility notes.
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
              { value: "34", label: "interactive patterns", color: "var(--green)" },
              { value: "18", label: "regulations covered", color: "var(--amber)" },
              { value: "45", label: "cited sources", color: "var(--cyan)" },
              { value: "5", label: "strategic tools", color: "#c084fc" },
            ].map(({ value, label, color }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold" style={{ color }}>{value}</div>
                <div className="text-xs" style={{ color: "var(--text)" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Terminal prompt — all links clickable */}
          <div className="mt-12 font-mono text-xs text-left max-w-lg mx-auto p-3 sm:p-4 rounded overflow-x-auto" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div style={{ color: "#999" }}>$ ls ./patterns</div>
            <div className="mt-1" style={{ color: "var(--green)" }}>🔒 auth/ (8)</div>
            {[
              { path: "/patterns/auth/login", name: "login_flow", ref: "OWASP A07, CWE-307" },
              { path: "/patterns/auth/mfa", name: "multi_factor_auth", ref: "OWASP A07, CWE-308" },
              { path: "/patterns/auth/password-strength", name: "password_strength", ref: "OWASP A07, CWE-521" },
              { path: "/patterns/auth/session-timeout", name: "session_timeout", ref: "OWASP A07, CWE-613" },
              { path: "/patterns/auth/account-recovery", name: "account_recovery", ref: "OWASP A07, CWE-640" },
              { path: "/patterns/auth/passkeys", name: "passkeys", ref: "WebAuthn, FIDO2" },
              { path: "/patterns/auth/oauth-consent", name: "oauth_consent", ref: "OAuth 2.0, CWE-250" },
              { path: "/patterns/auth/accessible-auth", name: "accessible_auth", ref: "WCAG 2.2, SC 3.3.8" },
            ].map(({ path, name, ref }) => (
              <Link key={path} to={path} className="block no-underline hover:underline py-0.5 pl-3" style={{ color: "var(--text)" }}>
                {name} <span className="hidden sm:inline" style={{ color: "#777" }}>{'.'}{'.'.repeat(Math.max(1, 22 - name.length))}</span> <span className="hidden sm:inline" style={{ color: "#888" }}>{ref}</span>
              </Link>
            ))}

            <div className="mt-2" style={{ color: "var(--green)" }}>🔒 threat/ (3)</div>
            {[
              { path: "/patterns/threat/breach-notification", name: "breach_notification", ref: "GDPR Art. 33/34, CWE-200" },
              { path: "/patterns/threat/phishing-warning", name: "phishing_warning", ref: "OWASP A07, CWE-601" },
              { path: "/patterns/threat/suspicious-activity", name: "suspicious_activity", ref: "OWASP A07, CWE-778" },
            ].map(({ path, name, ref }) => (
              <Link key={path} to={path} className="block no-underline hover:underline py-0.5 pl-3" style={{ color: "var(--text)" }}>
                {name} <span className="hidden sm:inline" style={{ color: "#777" }}>{'.'}{'.'.repeat(Math.max(1, 22 - name.length))}</span> <span className="hidden sm:inline" style={{ color: "#888" }}>{ref}</span>
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
                {name} <span className="hidden sm:inline" style={{ color: "#777" }}>{'.'}{'.'.repeat(Math.max(1, 22 - name.length))}</span> <span className="hidden sm:inline" style={{ color: "#888" }}>{ref}</span>
              </Link>
            ))}

            <div className="mt-2" style={{ color: "var(--cyan)" }}>🔐 data/ (4)</div>
            {[
              { path: "/patterns/data/encryption", name: "encryption", ref: "OWASP A02, CWE-311" },
              { path: "/patterns/data/file-upload", name: "file_upload", ref: "OWASP A03, CWE-434" },
              { path: "/patterns/data/deletion", name: "data_deletion", ref: "GDPR Art. 17, CWE-212" },
              { path: "/patterns/data/activity-log", name: "activity_log", ref: "GDPR Art. 15, OWASP A09" },
            ].map(({ path, name, ref }) => (
              <Link key={path} to={path} className="block no-underline hover:underline py-0.5 pl-3" style={{ color: "var(--text)" }}>
                {name} <span className="hidden sm:inline" style={{ color: "#777" }}>{'.'}{'.'.repeat(Math.max(1, 22 - name.length))}</span> <span className="hidden sm:inline" style={{ color: "#888" }}>{ref}</span>
              </Link>
            ))}

            <div className="mt-2" style={{ color: "var(--amber)" }}>🛡 owasp/ (3)</div>
            {[
              { path: "/patterns/owasp/broken-access-control", name: "A01_access_control", ref: "CWE-284, CWE-639" },
              { path: "/patterns/owasp/security-misconfiguration", name: "A05_misconfiguration", ref: "CWE-16, CWE-209" },
              { path: "/patterns/owasp/logging-monitoring", name: "A09_logging", ref: "CWE-778, CWE-223" },
            ].map(({ path, name, ref }) => (
              <Link key={path} to={path} className="block no-underline hover:underline py-0.5 pl-3" style={{ color: "var(--text)" }}>
                {name} <span className="hidden sm:inline" style={{ color: "#777" }}>{'.'}{'.'.repeat(Math.max(1, 22 - name.length))}</span> <span className="hidden sm:inline" style={{ color: "#888" }}>{ref}</span>
              </Link>
            ))}

            <div className="mt-2" style={{ color: "#c084fc" }}>🤖 ai/ (3)</div>
            {[
              { path: "/patterns/ai/disclosure", name: "ai_disclosure", ref: "EU AI Act Art. 50" },
              { path: "/patterns/ai/content-labeling", name: "content_labeling", ref: "Art. 50, C2PA" },
              { path: "/patterns/ai/decision-explanation", name: "decision_explanation", ref: "GDPR Art. 22" },
            ].map(({ path, name, ref }) => (
              <Link key={path} to={path} className="block no-underline hover:underline py-0.5 pl-3" style={{ color: "var(--text)" }}>
                {name} <span className="hidden sm:inline" style={{ color: "#777" }}>{'.'}{'.'.repeat(Math.max(1, 22 - name.length))}</span> <span className="hidden sm:inline" style={{ color: "#888" }}>{ref}</span>
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
                {name} <span className="hidden sm:inline" style={{ color: "#777" }}>{'.'}{'.'.repeat(Math.max(1, 22 - name.length))}</span> <span className="hidden sm:inline" style={{ color: "#888" }}>{ref}</span>
              </Link>
            ))}

            <div className="mt-2" style={{ color: "var(--text-bright)" }}>📋 governance/ (3)</div>
            {[
              { path: "/patterns/governance/design-review", name: "security_design_review", ref: "IEC 62443, ISO 27001" },
              { path: "/patterns/governance/change-management", name: "change_management", ref: "IEC 62443, ITIL" },
              { path: "/patterns/governance/compliance-audit", name: "compliance_audit", ref: "NIS2, DORA, GDPR" },
            ].map(({ path, name, ref }) => (
              <Link key={path} to={path} className="block no-underline hover:underline py-0.5 pl-3" style={{ color: "var(--text)" }}>
                {name} <span className="hidden sm:inline" style={{ color: "#777" }}>{'.'}{'.'.repeat(Math.max(1, 22 - name.length))}</span> <span className="hidden sm:inline" style={{ color: "#888" }}>{ref}</span>
              </Link>
            ))}

            <div className="mt-2" style={{ color: "#999" }}>$ cat ./CONTRIBUTING.md</div>
            <div style={{ color: "var(--green)" }}>🤝 contribute/ (16 wanted)</div>
            <div className="break-words" style={{ color: "#888" }}>   permissions · oauth_scopes · privacy_dashboard · age_verification · captcha · biometric_enrollment · magic_links · mobile_permissions · api_key_mgmt · secret_rotation · consent_audit · gdpr_requests ...</div>
            <div style={{ color: "#777" }}>   → <a href="https://github.com/alavesa/security-UX-pattern-library" target="_blank" rel="noopener noreferrer" className="underline decoration-current/30 hover:decoration-current/80" style={{ color: "var(--green)" }}>fork & build a pattern</a></div>

            <div className="cursor-blink mt-1" style={{ color: "#999" }}>$</div>
          </div>
        </div>
      </section>

      {/* The cost of getting it wrong */}
      <section className="px-4 sm:px-6 py-16 max-w-5xl mx-auto border-b" style={{ borderColor: "var(--border)" }}>
        <AnchorHeading id="cost" className="text-xl font-mono mb-2" style={{ color: "var(--red)" }}>$ cat ./cost_of_failure</AnchorHeading>
        <p className="text-sm font-mono mb-8" style={{ color: "var(--text)" }}>Security UX failures have real consequences — regulatory, financial, and reputational.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { stat: "€1.86B+", label: "in dark pattern fines since 2023", color: "var(--red)" },
            { stat: "204 days", label: "average breach detection time", color: "var(--amber)" },
            { stat: "Aug 2026", label: "EU AI Act Art. 50 deadline", color: "var(--ai-color)" },
            { stat: "94%", label: "of apps have broken access control", color: "var(--cyan)" },
          ].map(({ stat, label, color }) => (
            <div key={label} className="rounded-lg p-4 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <p className="text-2xl font-bold font-mono" style={{ color }}>{stat}</p>
              <p className="text-xs font-mono mt-1" style={{ color: "var(--text)" }}>{label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg p-4" style={{ background: "rgba(255,51,51,0.05)", border: "1px solid rgba(255,51,51,0.2)" }}>
          <p className="text-xs font-mono" style={{ color: "var(--text)" }}>
            <strong style={{ color: "var(--red)" }}>The pattern:</strong> Companies invest in back-end security but leave the front door wide open. A login form without rate limiting, a consent screen that manipulates, an AI chatbot pretending to be human — these aren't just bad UX. They're compliance violations, attack vectors, and trust destroyers. Every pattern in this library exists because someone got fined, breached, or lost users by ignoring it.
          </p>
        </div>
      </section>

      {/* Strategic Tools */}
      <section className="px-4 sm:px-6 py-16 max-w-5xl mx-auto border-b" style={{ borderColor: "var(--border)" }}>
        <AnchorHeading id="tools" className="text-xl font-mono mb-2" style={{ color: "var(--ai-color)" }}>$ get --strategic-tools</AnchorHeading>
        <p className="text-sm font-mono mb-8" style={{ color: "var(--text)" }}>Don't start with patterns — start with where you stand. These tools help you assess, prioritize, and report.</p>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { path: "/score", label: "Security UX Score", desc: "Checklist across 8 categories → A+ through F grade. Industrial & Governance can be marked N/A for fair scoring. Know your baseline before you start fixing.", color: "var(--green)", cmd: "$ get --score" },
            { path: "/compliance", label: "Compliance Mapper", desc: "Select from 18 regulations (GDPR, NIS2, DORA, CRA, EU AI Act, EAA, IEC 62443, WCAG 2.2...) → see exactly which patterns you need for each.", color: "var(--cyan)", cmd: "$ get --compliance" },
            { path: "/maturity", label: "Maturity Model", desc: "10-question assessment → your current level (1-4), priority areas, and a concrete roadmap to the next level. Strategic design is about knowing what to do next.", color: "var(--amber)", cmd: "$ get --maturity" },
            { path: "/report", label: "Report Generator", desc: "Answer 6 questions about your product → downloadable .md report with prioritized patterns, compliance gaps, and implementation order. Take this to your stakeholders.", color: "var(--ai-color)", cmd: "$ get --report" },
            { path: "/convince", label: "Convince Your Team", desc: "Enforcement data, ROI arguments, regulatory deadlines, and next steps — one page designed to share with stakeholders who need the business case.", color: "var(--red)", cmd: "$ get --convince" },
          ].map(({ path, label, desc, color, cmd }) => (
            <Link
              key={path}
              to={path}
              className="rounded-lg p-6 no-underline transition-all"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = color; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${color}22`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              <p className="font-mono text-xs mb-2" style={{ color }}>{cmd}</p>
              <h3 className="font-mono font-semibold text-sm mb-2" style={{ color: "var(--text-bright)" }}>{label}</h3>
              <p className="text-xs font-mono leading-relaxed" style={{ color: "var(--text)" }}>{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section className="px-4 sm:px-6 py-16 max-w-5xl mx-auto border-b" style={{ borderColor: "var(--border)" }}>
        <AnchorHeading id="how-to-use" className="text-xl font-mono mb-2" style={{ color: "var(--green)" }}>$ cat ./how_to_use</AnchorHeading>
        <p className="text-sm font-mono mb-8" style={{ color: "var(--text)" }}>This library works for any team, any stack, any level of security maturity.</p>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: "As a design reference",
              desc: "Browse patterns, interact with demos, use the do/don't guidelines as a checklist when designing security flows. No code needed — the patterns are the value.",
              color: "var(--green)",
              cmd: "browse →",
            },
            {
              title: "Assess your product",
              desc: "Use the 5 strategic tools: Score your current state, map compliance, assess maturity, generate a report, or build the business case for your team.",
              color: "var(--cyan)",
              cmd: "assess →",
            },
            {
              title: "Implement in any stack",
              desc: "Each pattern documents what to build, why it matters, and what to avoid. The logic transfers to any framework — React, Vue, Swift, Flutter, or vanilla HTML.",
              color: "var(--amber)",
              cmd: "implement →",
            },
            {
              title: "Use the React components",
              desc: "MIT licensed. Clone the repo — each pattern is a self-contained file in src/patterns/. Copy the demo logic, adapt the styling to your design system.",
              color: "var(--ai-color)",
              cmd: "git clone →",
            },
          ].map(({ title, desc, color, cmd }) => (
            <div key={title} className="rounded-lg p-4 sm:p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <p className="font-mono text-xs mb-2" style={{ color }}>{cmd}</p>
              <h3 className="font-mono font-semibold text-sm mb-2" style={{ color: "var(--text-bright)" }}>{title}</h3>
              <p className="text-xs font-mono leading-relaxed" style={{ color: "var(--text)" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pattern Cards */}
      <section id="patterns" className="px-4 sm:px-6 py-16 max-w-5xl mx-auto">
        <AnchorHeading id="auth" className="text-xl font-mono mb-2 glow-text">./auth/</AnchorHeading>
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
          <AnchorHeading id="threat" className="text-xl font-mono mb-2 glow-text">./threat/</AnchorHeading>
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
          <AnchorHeading id="dark-patterns" className="text-xl font-mono mb-2" style={{ color: "var(--red)" }}>./dark_patterns/</AnchorHeading>
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
          <AnchorHeading id="data" className="text-xl font-mono mb-2" style={{ color: "var(--cyan)" }}>./data/</AnchorHeading>
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
          <AnchorHeading id="owasp" className="text-xl font-mono mb-2" style={{ color: "var(--amber)" }}>./owasp/</AnchorHeading>
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
          <AnchorHeading id="ai" className="text-xl font-mono mb-2" style={{ color: "#c084fc" }}>./ai/</AnchorHeading>
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
          <AnchorHeading id="industrial" className="text-xl font-mono mb-2" style={{ color: "#f97316" }}>./industrial/</AnchorHeading>
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

        {/* Governance */}
        <div className="mt-16">
          <AnchorHeading id="governance" className="text-xl font-mono mb-2" style={{ color: "var(--text-bright)" }}>./governance/</AnchorHeading>
          <p className="mb-6" style={{ color: "var(--text)" }}>Process patterns for managing security UX at scale. From industrial change management to compliance audits.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { path: "/patterns/governance/design-review", label: "design_review", icon: ClipboardCheck, description: "Security UX review checklist — critical items must pass before shipping to development" },
              { path: "/patterns/governance/change-management", label: "change_management", icon: GitBranch, description: "Propose, review, approve, deploy, rollback — structured workflow for security UX changes" },
              { path: "/patterns/governance/compliance-audit", label: "compliance_audit", icon: FileText, description: "Scope regulations, assess requirements, collect evidence, generate gap analysis report" },
            ].map(({ path, label, icon: Icon, description }) => (
              <Link
                key={path}
                to={path}
                className="group border rounded-lg p-6 no-underline transition-all"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(204,204,204,0.3)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(204,204,204,0.05)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <Icon className="w-6 h-6 mb-3" style={{ color: "var(--text-bright)" }} />
                <h3 className="font-mono font-semibold text-sm mb-2" style={{ color: "var(--text-bright)" }}>{label}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text)" }}>{description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Contribute */}
        <div className="mt-16">
          <AnchorHeading id="contribute" className="text-xl font-mono mb-2 glow-text">./contribute/</AnchorHeading>
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
            <p className="font-mono text-xs mb-4 text-center" style={{ color: "#888" }}>Wanted patterns — help build these:</p>
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
                <div key={item} className="border border-dashed rounded px-3 py-2 text-xs font-mono" style={{ borderColor: "#333", color: "#888" }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Enforcement */}
      <section className="px-4 sm:px-6 py-16 max-w-5xl mx-auto border-t" style={{ borderColor: "var(--border)" }}>
        <AnchorHeading id="enforcement" className="text-xl font-mono mb-2" style={{ color: "var(--red)" }}>./recent_enforcement/</AnchorHeading>
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
              <p className="text-xs" style={{ color: "#888" }}>{authority} · {year}</p>
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
        <AnchorHeading id="sources" className="text-xl font-mono mb-2" style={{ color: "var(--text-bright)" }}>./sources/</AnchorHeading>
        <p className="text-sm font-mono mb-8" style={{ color: "var(--text)" }}>45 cited sources across 7 categories. Every claim in the library links back to a primary source.</p>

        <div className="grid md:grid-cols-2 gap-6">

          {/* EU Regulation */}
          <div className="rounded-lg p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <h3 className="font-mono text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "#3b82f6" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "#3b82f6" }} /> EU Regulation
              <span className="text-xs font-normal ml-auto" style={{ color: "var(--text-dim)" }}>10 sources</span>
            </h3>
            <ul className="space-y-1.5 text-xs" style={{ color: "var(--text)" }}>
              {[
                { url: "https://gdpr-info.eu/", label: "GDPR", desc: "Art. 5, 7, 15, 17, 20, 22, 33, 34" },
                { url: "https://digital-strategy.ec.europa.eu/en/policies/nis2-directive", label: "NIS2", desc: "Cybersecurity for essential entities" },
                { url: "https://www.digital-operational-resilience-act.com/", label: "DORA", desc: "Financial sector resilience (Jan 2025)" },
                { url: "https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act", label: "CRA", desc: "Digital products (2027)" },
                { url: "https://artificialintelligenceact.eu/article/50/", label: "EU AI Act Art. 50", desc: "AI transparency (Aug 2026)" },
                { url: "https://artificialintelligenceact.eu/high-level-summary/", label: "EU AI Act Overview", desc: "High-level summary" },
                { url: "https://digital-strategy.ec.europa.eu/en/policies/digital-services-act-package", label: "EU DSA", desc: "Platform transparency + dark patterns" },
                { url: "https://digital-strategy.ec.europa.eu/en/policies/eprivacy-regulation", label: "ePrivacy", desc: "Cookie consent rules" },
                { url: "https://commission.europa.eu/law/law-topic/consumer-protection-law_en", label: "Consumer Rights Dir.", desc: "Cancellation + unfair practices" },
                { url: "https://ec.europa.eu/social/main.jsp?catId=1202", label: "EAA", desc: "Accessibility Act (June 2025)" },
              ].map(({ url, label, desc }) => (
                <li key={label}><a href={url} target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>{label}</a> <span style={{ color: "var(--text-dim)" }}>— {desc}</span></li>
              ))}
            </ul>
          </div>

          {/* Security Standards */}
          <div className="rounded-lg p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <h3 className="font-mono text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--green)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--green)" }} /> Security Standards
              <span className="text-xs font-normal ml-auto" style={{ color: "var(--text-dim)" }}>10 sources</span>
            </h3>
            <ul className="space-y-1.5 text-xs" style={{ color: "var(--text)" }}>
              {[
                { url: "https://owasp.org/www-project-top-ten/", label: "OWASP Top 10", desc: "Web security risks (2021)" },
                { url: "https://cwe.mitre.org/", label: "MITRE CWE", desc: "Weakness enumeration" },
                { url: "https://pages.nist.gov/800-63-3/", label: "NIST 800-63B", desc: "Digital identity guidelines" },
                { url: "https://www.nist.gov/cyberframework", label: "NIST CSF", desc: "Cybersecurity framework tiers" },
                { url: "https://csrc.nist.gov/publications/detail/sp/800-30/rev-1/final", label: "NIST 800-30", desc: "Risk assessment guide" },
                { url: "https://www.w3.org/WAI/WCAG22/quickref/", label: "WCAG 2.2", desc: "SC 3.3.8 Accessible Auth" },
                { url: "https://www.iso.org/standard/27001", label: "ISO 27001", desc: "Information security management" },
                { url: "https://www.iso.org/standard/80585.html", label: "ISO 27005", desc: "Security risk management" },
                { url: "https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2", label: "SOC 2", desc: "Service org security controls" },
                { url: "https://www.pcisecuritystandards.org/", label: "PCI DSS", desc: "Payment card security" },
              ].map(({ url, label, desc }) => (
                <li key={label}><a href={url} target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>{label}</a> <span style={{ color: "var(--text-dim)" }}>— {desc}</span></li>
              ))}
            </ul>
          </div>

          {/* Protocols & Technical Standards */}
          <div className="rounded-lg p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <h3 className="font-mono text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--amber)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--amber)" }} /> Protocols & Specs
              <span className="text-xs font-normal ml-auto" style={{ color: "var(--text-dim)" }}>4 sources</span>
            </h3>
            <ul className="space-y-1.5 text-xs" style={{ color: "var(--text)" }}>
              {[
                { url: "https://www.w3.org/TR/webauthn-2/", label: "WebAuthn L2", desc: "Passkey / FIDO2 standard" },
                { url: "https://datatracker.ietf.org/doc/html/rfc6749", label: "RFC 6749", desc: "OAuth 2.0 authorization" },
                { url: "https://datatracker.ietf.org/doc/html/rfc6238", label: "RFC 6238", desc: "TOTP algorithm" },
                { url: "https://c2pa.org/", label: "C2PA", desc: "Content provenance standard" },
              ].map(({ url, label, desc }) => (
                <li key={label}><a href={url} target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>{label}</a> <span style={{ color: "var(--text-dim)" }}>— {desc}</span></li>
              ))}
            </ul>
          </div>

          {/* Industrial Standards */}
          <div className="rounded-lg p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <h3 className="font-mono text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--industrial-color)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--industrial-color)" }} /> Industrial Standards
              <span className="text-xs font-normal ml-auto" style={{ color: "var(--text-dim)" }}>5 sources</span>
            </h3>
            <ul className="space-y-1.5 text-xs" style={{ color: "var(--text)" }}>
              {[
                { url: "https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series", label: "IEC 62443", desc: "Industrial automation security" },
                { url: "https://www.iec.ch/functionalsafety", label: "IEC 61511", desc: "Safety instrumented systems" },
                { url: "https://www.isa.org/products/ansi-isa-18-2-2016-management-of-alarm-systems-fo", label: "ISA-18.2", desc: "Alarm management" },
                { url: "https://www.eemua.org/Products/Publications/Print/EEMUA-Publication-191.aspx", label: "EEMUA 191", desc: "Alarm systems guide" },
                { url: "https://www.isa.org/products/isa-101-01-2015-human-machine-interfaces-for-proce", label: "ISA-101", desc: "HMI design for process industries" },
              ].map(({ url, label, desc }) => (
                <li key={label}><a href={url} target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>{label}</a> <span style={{ color: "var(--text-dim)" }}>— {desc}</span></li>
              ))}
            </ul>
          </div>

          {/* US Regulation */}
          <div className="rounded-lg p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <h3 className="font-mono text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--ai-color)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--ai-color)" }} /> US Regulation & AI
              <span className="text-xs font-normal ml-auto" style={{ color: "var(--text-dim)" }}>7 sources</span>
            </h3>
            <ul className="space-y-1.5 text-xs" style={{ color: "var(--text)" }}>
              {[
                { url: "https://oag.ca.gov/privacy/ccpa", label: "CCPA", desc: "California Consumer Privacy Act" },
                { url: "https://www.ftc.gov/legal-library/browse/rules/negative-option-rule", label: "FTC Neg. Option", desc: "Subscription consumer protection" },
                { url: "https://www.twobirds.com/en/insights/2026/taking-the-eu-ai-act-to-practice-understanding-the-draft-transparency-code-of-practice", label: "AI Transparency Code", desc: "Implementation guidance" },
                { url: "https://www.iab.com/guidelines/ai-transparency-and-disclosure-framework/", label: "IAB AI Framework", desc: "Risk-based disclosure" },
                { url: "https://drata.com/blog/artificial-intelligence-regulations-state-and-federal-ai-laws-2026", label: "US State AI Laws", desc: "CO, CA, IL (2026)" },
                { url: "https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=4015", label: "IL AI Interview Act", desc: "AI consent in hiring" },
                { url: "https://owasp.org/www-community/OWASP_Risk_Rating_Methodology", label: "OWASP Risk Rating", desc: "Risk rating methodology" },
              ].map(({ url, label, desc }) => (
                <li key={label}><a href={url} target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>{label}</a> <span style={{ color: "var(--text-dim)" }}>— {desc}</span></li>
              ))}
            </ul>
          </div>

          {/* Maturity Frameworks */}
          <div className="rounded-lg p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <h3 className="font-mono text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--cyan)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--cyan)" }} /> Maturity Frameworks
              <span className="text-xs font-normal ml-auto" style={{ color: "var(--text-dim)" }}>2 sources</span>
            </h3>
            <ul className="space-y-1.5 text-xs" style={{ color: "var(--text)" }}>
              {[
                { url: "https://cmmiinstitute.com/", label: "CMMI", desc: "Capability Maturity Model" },
                { url: "https://owaspsamm.org/", label: "OWASP SAMM", desc: "Software Assurance Maturity" },
              ].map(({ url, label, desc }) => (
                <li key={label}><a href={url} target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>{label}</a> <span style={{ color: "var(--text-dim)" }}>— {desc}</span></li>
              ))}
            </ul>
          </div>

          {/* Research & Data — full width */}
          <div className="rounded-lg p-4 md:col-span-2" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <h3 className="font-mono text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--red)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--red)" }} /> Research & Breach Data
              <span className="text-xs font-normal ml-auto" style={{ color: "var(--text-dim)" }}>7 sources</span>
            </h3>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {[
                { url: "https://www.verizon.com/business/resources/reports/dbir/", label: "Verizon DBIR 2024", desc: "Breach investigations report" },
                { url: "https://www.ibm.com/reports/data-breach", label: "IBM Breach Report", desc: "204-day detection average" },
                { url: "https://www.microsoft.com/en-us/security/blog/2019/08/20/one-simple-action-you-can-take-to-prevent-99-9-percent-of-account-attacks/", label: "Microsoft MFA Study", desc: "MFA prevents 99.9% of attacks" },
                { url: "https://arxiv.org/html/2601.13342v1", label: "USEC 2026", desc: "Privacy Starts with UI" },
                { url: "https://www.deceptive.design/", label: "Deceptive Design", desc: "Dark patterns taxonomy" },
                { url: "https://www.deceptive.design/enforcement", label: "Enforcement DB", desc: "Global dark pattern fines" },
                { url: "https://sharkstriker.com/blog/march-data-breaches-today-2026/", label: "Breach Tracker 2026", desc: "Current breach data" },
              ].map(({ url, label, desc }) => (
                <p key={label} className="text-xs"><a href={url} target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>{label}</a> <span style={{ color: "var(--text-dim)" }}>— {desc}</span></p>
              ))}
            </div>
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

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono" style={{ color: "#888" }}>
            <a href="https://www.neversay.no" target="_blank" rel="noopener" className="hover:underline no-underline" style={{ color: "var(--text)" }}>piia alavesa</a>
            <span style={{ color: "#777" }}>·</span>
            <a href="https://www.linkedin.com/in/piia-alavesa/" target="_blank" rel="noopener" className="hover:underline no-underline" style={{ color: "var(--text)" }}>linkedin</a>
            <span style={{ color: "#777" }}>·</span>
            <a href="https://github.com/alavesa/security-UX-pattern-library" target="_blank" rel="noopener" className="hover:underline no-underline" style={{ color: "var(--text)" }}>github</a>
            <span style={{ color: "#777" }}>·</span>
            <span className="flex items-center gap-1">built with <a href="https://claude.ai" target="_blank" rel="noopener" className="hover:underline no-underline" style={{ color: "var(--cyan)" }}>claude</a></span>
            <span style={{ color: "#777" }}>·</span>
            <span style={{ color: "var(--text-dim)" }}>updated {BUILD_DATE}</span>
          </div>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}
