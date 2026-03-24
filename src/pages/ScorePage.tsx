import { useState, useMemo } from "react";
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle, Copy, CheckCheck } from "lucide-react";

interface CheckItem {
  id: string;
  question: string;
  category: string;
  weight: number;
  tip: string;
}

const CHECKS: CheckItem[] = [
  // Authentication (30 points)
  { id: "auth-generic-errors", question: "Login errors are generic ('Invalid email or password')", category: "Authentication", weight: 5, tip: "Generic errors prevent account enumeration (CWE-204)" },
  { id: "auth-rate-limit", question: "Login has rate limiting / account lockout", category: "Authentication", weight: 5, tip: "Prevents brute force attacks (OWASP A07)" },
  { id: "auth-mfa", question: "Multi-factor authentication is available", category: "Authentication", weight: 5, tip: "MFA prevents 99.9% of automated account compromise" },
  { id: "auth-password-strength", question: "Password strength feedback is shown in real-time", category: "Authentication", weight: 3, tip: "Guides users toward strong passwords without frustration" },
  { id: "auth-breach-check", question: "Passwords are checked against known breaches", category: "Authentication", weight: 4, tip: "Have I Been Pwned API catches compromised passwords" },
  { id: "auth-session-timeout", question: "Sessions timeout with a warning before expiry", category: "Authentication", weight: 4, tip: "Protects against session hijacking on shared devices" },
  { id: "auth-recovery", question: "Account recovery doesn't reveal if email exists", category: "Authentication", weight: 4, tip: "Same response for existing and non-existing accounts" },
  { id: "auth-passkeys", question: "Passkeys / WebAuthn supported as a login option", category: "Authentication", weight: 3, tip: "Phishing-resistant, no passwords to steal — FIDO2 standard" },
  { id: "auth-oauth", question: "OAuth consent screens clearly show requested permissions", category: "Authentication", weight: 3, tip: "Users must understand what data they're sharing (CWE-250)" },
  { id: "auth-accessible", question: "Authentication works without CAPTCHA or cognitive function tests", category: "Authentication", weight: 4, tip: "WCAG 2.2 SC 3.3.8 — passkeys, magic links, hardware keys as alternatives" },

  // Data Protection (25 points)
  { id: "data-encryption-indicator", question: "Users can see what data is encrypted", category: "Data Protection", weight: 4, tip: "Transparency about encryption builds trust" },
  { id: "data-https", question: "All pages use HTTPS (no mixed content)", category: "Data Protection", weight: 5, tip: "Mixed content exposes data on secure pages" },
  { id: "data-file-scanning", question: "Uploaded files are scanned for malware", category: "Data Protection", weight: 4, tip: "Unrestricted file upload is OWASP A03" },
  { id: "data-export", question: "Users can export their data", category: "Data Protection", weight: 4, tip: "GDPR Article 20 — Right to Data Portability" },
  { id: "data-deletion", question: "Users can delete their account in 2 clicks or fewer", category: "Data Protection", weight: 4, tip: "GDPR Article 17 — Right to Erasure" },
  { id: "data-activity-log", question: "Users can view their account activity and active sessions", category: "Data Protection", weight: 4, tip: "GDPR Art. 15 — users have the right to know who accessed their data" },
  { id: "data-csp", question: "Content Security Policy headers are set", category: "Data Protection", weight: 4, tip: "Prevents XSS and data injection attacks" },

  // Threat Response (20 points)
  { id: "threat-suspicious", question: "Users are alerted about suspicious sign-ins", category: "Threat Response", weight: 5, tip: "Location + device context helps users identify real threats" },
  { id: "threat-session-revoke", question: "Users can view and revoke active sessions", category: "Threat Response", weight: 5, tip: "Gives users control over their account security" },
  { id: "threat-breach-plan", question: "There's a breach notification plan/process", category: "Threat Response", weight: 5, tip: "GDPR requires notification within 72 hours" },
  { id: "threat-phishing", question: "Phishing/suspicious link warnings are shown", category: "Threat Response", weight: 5, tip: "Phishing is the #1 attack vector (Verizon DBIR)" },

  // Ethical Design (25 points)
  { id: "ethical-cookie", question: "Cookie consent has equally prominent Accept/Reject", category: "Ethical Design", weight: 5, tip: "GDPR Article 7 — consent as easy to withdraw as to give" },
  { id: "ethical-no-shame", question: "Decline buttons use neutral language (no confirmshaming)", category: "Ethical Design", weight: 4, tip: "Guilt-trip language erodes trust" },
  { id: "ethical-no-dark", question: "No bait-and-switch UI (X means close)", category: "Ethical Design", weight: 4, tip: "UI elements must do exactly what they promise" },
  { id: "ethical-cancel-easy", question: "Cancellation is as easy as signup", category: "Ethical Design", weight: 4, tip: "FTC Negative Option Rule requires equal ease" },
  { id: "ethical-privacy-defaults", question: "Privacy settings default to most protective", category: "Ethical Design", weight: 4, tip: "GDPR data minimization principle" },
  { id: "ethical-permissions", question: "App permissions are opt-in, not opt-out", category: "Ethical Design", weight: 4, tip: "Pre-enabled permissions violate informed consent" },

  // AI Transparency (15 points)
  { id: "ai-disclosure", question: "AI chatbots/assistants are labeled as AI, not presented as human", category: "AI Transparency", weight: 5, tip: "EU AI Act Article 50 — effective August 2026" },
  { id: "ai-content", question: "AI-generated content is labeled with visible indicators", category: "AI Transparency", weight: 5, tip: "EU AI Act Art. 50(2) requires machine-readable marking" },
  { id: "ai-decisions", question: "AI decisions about users include explanation and human appeal", category: "AI Transparency", weight: 5, tip: "GDPR Art. 22 — right to meaningful explanation" },

  // Industrial (15 points — only if applicable)
  { id: "ind-auth", question: "Operator authentication works with PPE/gloves (badge, biometric)", category: "Industrial", weight: 5, tip: "IEC 62443 — password auth fails in industrial environments" },
  { id: "ind-safety", question: "Safety-critical actions use graduated confirmation (hold-to-confirm)", category: "Industrial", weight: 5, tip: "IEC 61511 — safety actions must never be blocked by auth" },
  { id: "ind-alarms", question: "Alarm management follows ISA-18.2 (max 6/hour, grouped by root cause)", category: "Industrial", weight: 5, tip: "Alarm fatigue contributed to Deepwater Horizon, Texas City disasters" },
  { id: "ind-nav", question: "HMI follows ISA-101 navigation hierarchy (overview → area → unit → detail)", category: "Industrial", weight: 5, tip: "Operators must reach any detail within 3 clicks during abnormal situations" },

  // OWASP (15 points)
  { id: "owasp-access", question: "Access control enforced at UI level (role-based views, disabled actions)", category: "OWASP", weight: 5, tip: "A01 Broken Access Control — #1 most common vulnerability" },
  { id: "owasp-config", question: "Security headers visible to users (HTTPS, CSP status)", category: "OWASP", weight: 5, tip: "A05 Security Misconfiguration — debug mode and default creds exposed" },
  { id: "owasp-logging", question: "Security events logged and visible to admins/users", category: "OWASP", weight: 5, tip: "A09 Logging — average breach detection is 204 days without monitoring" },

  // Governance (15 points — skip if not applicable)
  { id: "gov-review", question: "Security UX changes go through a design review process", category: "Governance", weight: 5, tip: "Without review, each team reinvents security UX differently" },
  { id: "gov-change", question: "Change management process exists for security UX changes", category: "Governance", weight: 5, tip: "IEC 62443 and ISO 27001 require formal change management" },
  { id: "gov-audit", question: "Regular compliance audits are conducted against applicable regulations", category: "Governance", weight: 5, tip: "NIS2 Art. 21 requires regular security audits" },
];

const MAX_SCORE = CHECKS.reduce((sum, c) => sum + c.weight, 0);

function getGrade(score: number, max: number = MAX_SCORE): { grade: string; label: string; color: string; bg: string } {
  if (max === 0) return { grade: "—", label: "No items", color: "#555", bg: "transparent" };
  const pct = (score / max) * 100;
  if (pct >= 90) return { grade: "A+", label: "Excellent", color: "#00ff41", bg: "rgba(0,255,65,0.15)" };
  if (pct >= 80) return { grade: "A", label: "Very Good", color: "#00ff41", bg: "rgba(0,255,65,0.1)" };
  if (pct >= 70) return { grade: "B", label: "Good", color: "#00e5ff", bg: "rgba(0,229,255,0.1)" };
  if (pct >= 60) return { grade: "C", label: "Fair", color: "#ffaa00", bg: "rgba(255,170,0,0.1)" };
  if (pct >= 40) return { grade: "D", label: "Needs Work", color: "#ff6600", bg: "rgba(255,102,0,0.1)" };
  return { grade: "F", label: "Critical", color: "#ff3333", bg: "rgba(255,51,51,0.1)" };
}

const OPTIONAL_CATEGORIES = new Set(["Industrial", "Governance"]);

export function ScorePage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [skippedCategories, setSkippedCategories] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  const activeChecks = useMemo(() =>
    CHECKS.filter(c => !skippedCategories.has(c.category)),
    [skippedCategories]
  );

  const activeMaxScore = useMemo(() =>
    activeChecks.reduce((sum, c) => sum + c.weight, 0),
    [activeChecks]
  );

  const score = useMemo(() =>
    activeChecks.filter(c => checked.has(c.id)).reduce((sum, c) => sum + c.weight, 0),
    [checked, activeChecks]
  );

  const { grade, label, color, bg } = getGrade(score, activeMaxScore);
  const pct = activeMaxScore > 0 ? Math.round((score / activeMaxScore) * 100) : 0;

  const categories = useMemo(() => {
    const cats = new Map<string, { total: number; earned: number; items: CheckItem[]; skipped: boolean }>();
    for (const check of CHECKS) {
      if (!cats.has(check.category)) cats.set(check.category, { total: 0, earned: 0, items: [], skipped: skippedCategories.has(check.category) });
      const cat = cats.get(check.category)!;
      cat.total += check.weight;
      if (checked.has(check.id)) cat.earned += check.weight;
      cat.items.push(check);
    }
    return cats;
  }, [checked, skippedCategories]);

  const toggleSkip = (category: string) => {
    setSkippedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category); else next.add(category);
      return next;
    });
    // Also uncheck items in skipped category
    setChecked(prev => {
      const next = new Set(prev);
      CHECKS.filter(c => c.category === category).forEach(c => next.delete(c.id));
      return next;
    });
  };

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleCopy = async () => {
    if (!navigator.clipboard) return;
    const text = `Security UX Score: ${grade} (${pct}%) — ${score}/${activeMaxScore} points\n\nChecked: ${checked.size}/${activeChecks.length} items${skippedCategories.size > 0 ? `\nSkipped: ${[...skippedCategories].join(", ")}` : ""}\n\nGenerated at uxsec.dev`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard write failed — permission denied or unsupported context */
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold font-mono mb-3 glow-text">Security UX Score</h1>
        <p className="text-base" style={{ color: "var(--text-bright)" }}>
          Rate your app's security UX. Check what applies, get your score, share it.
        </p>
      </div>

      {/* How scoring works */}
      <div className="rounded-2xl p-4 sm:p-6 mb-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <h2 className="text-sm font-mono font-bold mb-3" style={{ color: "var(--text-bright)" }}>How scoring works</h2>
        <p className="text-xs font-mono mb-4" style={{ color: "var(--text)" }}>
          Each item is weighted by security impact (3–5 points). Check what your product implements, skip categories that don't apply (Industrial, Governance). Your grade is the percentage of applicable points earned.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
          {[
            { grade: "A+", range: "90–100%", color: "#00ff41" },
            { grade: "A", range: "80–89%", color: "#00ff41" },
            { grade: "B", range: "70–79%", color: "#00e5ff" },
            { grade: "C", range: "60–69%", color: "#ffaa00" },
            { grade: "D", range: "40–59%", color: "#ff6600" },
            { grade: "F", range: "0–39%", color: "#ff3333" },
          ].map(({ grade: g, range, color: c }) => (
            <div key={g} className="flex items-center gap-2 text-xs font-mono px-2 py-1.5 rounded" style={{ background: "var(--bg)" }}>
              <span className="font-bold" style={{ color: c }}>{g}</span>
              <span style={{ color: "var(--text-dim)" }}>{range}</span>
            </div>
          ))}
        </div>
        <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>
          8 categories · {CHECKS.length} items · {MAX_SCORE} total points · Industrial &amp; Governance can be marked N/A for fair scoring
        </p>
      </div>

      {/* Score card */}
      <div className="border rounded-2xl p-4 sm:p-8 mb-8 text-center" style={{ borderColor: color, background: bg }}>
        <div className="text-7xl font-mono font-bold mb-2" style={{ color }}>{grade}</div>
        <div className="text-lg font-mono" style={{ color }}>{label}</div>
        <div className="text-sm mt-2" style={{ color: "var(--text)" }}>{score} / {activeMaxScore} points ({pct}%){skippedCategories.size > 0 && <span style={{ color: "var(--text-dim)" }}> · {skippedCategories.size} skipped</span>}</div>

        {/* Progress bar */}
        <div className="mt-4 h-3 rounded-full overflow-hidden" style={{ background: "var(--bg-card)" }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
        </div>

        {/* Per-category breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {Array.from(categories.entries()).map(([name, { total, earned, skipped }]) => (
            <div key={name} className="p-2 rounded" style={{ opacity: skipped ? 0.35 : 1, background: "var(--bg-card)" }}>
              <div className="text-xs font-mono mb-1 truncate" style={{ color: "var(--text)" }}>{name}</div>
              <div className="text-lg font-mono font-bold" style={{ color: skipped ? "var(--text-dim)" : earned === total ? "var(--green)" : earned > 0 ? "var(--amber)" : "var(--text)" }}>
                {skipped ? "N/A" : `${earned}/${total}`}
              </div>
            </div>
          ))}
        </div>

        {/* Share */}
        <button
          onClick={handleCopy}
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm border-none cursor-pointer transition-colors"
          style={{ background: "var(--bg-card)", color: "var(--text-bright)", border: `1px solid ${color}` }}
        >
          {copied ? <><CheckCheck className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy score</>}
        </button>
      </div>

      {/* Checklist */}
      {Array.from(categories.entries()).map(([categoryName, { items, skipped }]) => (
        <div key={categoryName} className="mb-8" style={{ opacity: skipped ? 0.4 : 1 }}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h2 className="text-lg font-mono font-bold" style={{ color: skipped ? "var(--text-dim)" : "var(--text-bright)" }}>
              {categoryName} {skipped && <span className="text-xs font-normal" style={{ color: "var(--text-dim)" }}>(skipped)</span>}
            </h2>
            {OPTIONAL_CATEGORIES.has(categoryName) && (
              <button
                onClick={() => toggleSkip(categoryName)}
                className="text-xs font-mono px-3 py-1 rounded border-none cursor-pointer shrink-0"
                style={{
                  background: skipped ? "var(--green-glow)" : "rgba(255,51,51,0.1)",
                  color: skipped ? "var(--green)" : "var(--red)",
                  border: skipped ? "1px solid var(--green-border)" : "1px solid rgba(255,51,51,0.2)",
                }}
              >
                {skipped ? "Include in score" : "Not applicable"}
              </button>
            )}
          </div>
          {!skipped && (<div className="space-y-2">
            {items.map(item => (
              <label
                key={item.id}
                className="flex items-start gap-3 p-3 sm:p-4 rounded-lg cursor-pointer transition-colors border"
                style={{
                  background: checked.has(item.id) ? "rgba(0,255,65,0.05)" : "var(--bg-card)",
                  borderColor: checked.has(item.id) ? "rgba(0,255,65,0.2)" : "var(--border)",
                }}
              >
                <div className="mt-0.5 shrink-0">
                  {checked.has(item.id)
                    ? <CheckCircle2 className="w-5 h-5" style={{ color: "var(--green)" }} />
                    : <XCircle className="w-5 h-5" style={{ color: "#333" }} />
                  }
                </div>
                <div className="flex-1">
                  <input type="checkbox" checked={checked.has(item.id)} onChange={() => toggle(item.id)} className="sr-only" />
                  <p className="text-sm" style={{ color: checked.has(item.id) ? "var(--text-bright)" : "var(--text)" }}>
                    {item.question}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#555" }}>{item.tip}</p>
                </div>
                <span className="text-xs font-mono shrink-0" style={{ color: "#444" }}>+{item.weight}</span>
              </label>
            ))}
          </div>)}
        </div>
      ))}

      {/* Badge preview */}
      <div className="border rounded-2xl p-8 text-center" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
        <h2 className="text-lg font-mono font-bold mb-4" style={{ color: "var(--text-bright)" }}>Your badge</h2>
        <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl" style={{ background: bg, border: `2px solid ${color}` }}>
          {pct >= 70 ? <ShieldCheck className="w-8 h-8" style={{ color }} /> : <ShieldAlert className="w-8 h-8" style={{ color }} />}
          <div className="text-left">
            <div className="text-2xl font-mono font-bold" style={{ color }}>{grade}</div>
            <div className="text-xs font-mono" style={{ color: "var(--text)" }}>Security UX Score</div>
          </div>
        </div>
        <p className="text-xs mt-4" style={{ color: "#444" }}>
          Share this score to show your commitment to security UX
        </p>
      </div>

      {/* Sources & inspiration */}
      <div className="rounded-2xl p-4 sm:p-6 mt-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <h2 className="text-sm font-mono font-bold mb-3" style={{ color: "var(--text-bright)" }}>Sources &amp; inspiration</h2>
        <p className="text-xs font-mono mb-4" style={{ color: "var(--text)" }}>
          This scoring model is inspired by industry-standard security assessment frameworks — adapted for UX-specific concerns that traditional security audits miss.
        </p>
        <div className="flex flex-wrap gap-1.5 text-xs font-mono">
          {[
            { label: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" },
            { label: "NIST 800-63B", url: "https://pages.nist.gov/800-63-3/" },
            { label: "WCAG 2.2", url: "https://www.w3.org/WAI/WCAG22/quickref/#accessible-authentication-minimum" },
            { label: "EU AI Act Art. 50", url: "https://artificialintelligenceact.eu/article/50/" },
            { label: "GDPR", url: "https://gdpr-info.eu/" },
            { label: "FTC Neg. Option Rule", url: "https://www.ftc.gov/legal-library/browse/rules/negative-option-rule" },
            { label: "IEC 62443", url: "https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series" },
            { label: "ISA-18.2", url: "https://www.isa.org/products/ansi-isa-18-2-2016-management-of-alarm-systems-fo" },
            { label: "Verizon DBIR", url: "https://www.verizon.com/business/resources/reports/dbir/" },
            { label: "IBM Breach Report", url: "https://www.ibm.com/reports/data-breach" },
            { label: "Deceptive Design", url: "https://www.deceptive.design/" },
            { label: "PCI DSS 4.0", url: "https://www.pcisecuritystandards.org/document_library/" },
          ].map(({ label, url }) => (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="px-2 py-1 rounded no-underline hover:underline" style={{ background: "var(--bg)", color: "var(--green)", border: "1px solid var(--border)" }}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
