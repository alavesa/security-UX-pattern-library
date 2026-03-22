import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Shield, CheckCircle2, Filter } from "lucide-react";

interface PatternRef {
  path: string;
  label: string;
  category: string;
}

interface Regulation {
  id: string;
  name: string;
  fullName: string;
  color: string;
  patterns: PatternRef[];
}

const ALL_REGULATIONS: Regulation[] = [
  {
    id: "gdpr",
    name: "GDPR",
    fullName: "General Data Protection Regulation (EU)",
    color: "#3b82f6",
    patterns: [
      { path: "/patterns/auth/login", label: "Login Flow", category: "Auth" },
      { path: "/patterns/auth/mfa", label: "Multi-Factor Auth", category: "Auth" },
      { path: "/patterns/auth/account-recovery", label: "Account Recovery", category: "Auth" },
      { path: "/patterns/dark/cookie-consent", label: "Cookie Consent", category: "Dark Patterns" },
      { path: "/patterns/dark/privacy-zuckering", label: "Privacy Zuckering", category: "Dark Patterns" },
      { path: "/patterns/dark/hidden-unsubscribe", label: "Hidden Unsubscribe", category: "Dark Patterns" },
      { path: "/patterns/data/encryption", label: "Encryption Indicators", category: "Data" },
      { path: "/patterns/data/file-upload", label: "Secure File Upload", category: "Data" },
      { path: "/patterns/data/deletion", label: "Data Deletion", category: "Data" },
      { path: "/patterns/data/activity-log", label: "Activity & Audit Log", category: "Data" },
      { path: "/patterns/threat/breach-notification", label: "Breach Notification", category: "Threat" },
      { path: "/patterns/auth/oauth-consent", label: "OAuth Consent", category: "Auth" },
      { path: "/patterns/governance/compliance-audit", label: "Compliance Audit", category: "Governance" },
    ],
  },
  {
    id: "ccpa",
    name: "CCPA",
    fullName: "California Consumer Privacy Act (US)",
    color: "#8b5cf6",
    patterns: [
      { path: "/patterns/dark/cookie-consent", label: "Cookie Consent", category: "Dark Patterns" },
      { path: "/patterns/dark/privacy-zuckering", label: "Privacy Zuckering", category: "Dark Patterns" },
      { path: "/patterns/dark/hidden-unsubscribe", label: "Hidden Unsubscribe", category: "Dark Patterns" },
      { path: "/patterns/data/deletion", label: "Data Deletion", category: "Data" },
      { path: "/patterns/data/encryption", label: "Encryption Indicators", category: "Data" },
      { path: "/patterns/auth/oauth-consent", label: "OAuth Consent", category: "Auth" },
    ],
  },
  {
    id: "soc2",
    name: "SOC 2",
    fullName: "Service Organization Control Type 2",
    color: "#f59e0b",
    patterns: [
      { path: "/patterns/auth/login", label: "Login Flow", category: "Auth" },
      { path: "/patterns/auth/mfa", label: "Multi-Factor Auth", category: "Auth" },
      { path: "/patterns/auth/password-strength", label: "Password Strength", category: "Auth" },
      { path: "/patterns/auth/session-timeout", label: "Session Timeout", category: "Auth" },
      { path: "/patterns/data/encryption", label: "Encryption Indicators", category: "Data" },
      { path: "/patterns/data/file-upload", label: "Secure File Upload", category: "Data" },
      { path: "/patterns/owasp/broken-access-control", label: "Access Control", category: "OWASP" },
      { path: "/patterns/owasp/security-misconfiguration", label: "Security Config", category: "OWASP" },
      { path: "/patterns/owasp/logging-monitoring", label: "Logging & Monitoring", category: "OWASP" },
      { path: "/patterns/data/activity-log", label: "Activity & Audit Log", category: "Data" },
    ],
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    fullName: "Information Security Management System",
    color: "#10b981",
    patterns: [
      { path: "/patterns/auth/login", label: "Login Flow", category: "Auth" },
      { path: "/patterns/auth/mfa", label: "Multi-Factor Auth", category: "Auth" },
      { path: "/patterns/auth/password-strength", label: "Password Strength", category: "Auth" },
      { path: "/patterns/auth/session-timeout", label: "Session Timeout", category: "Auth" },
      { path: "/patterns/auth/account-recovery", label: "Account Recovery", category: "Auth" },
      { path: "/patterns/data/encryption", label: "Encryption Indicators", category: "Data" },
      { path: "/patterns/data/file-upload", label: "Secure File Upload", category: "Data" },
      { path: "/patterns/data/deletion", label: "Data Deletion", category: "Data" },
      { path: "/patterns/owasp/broken-access-control", label: "Access Control", category: "OWASP" },
      { path: "/patterns/owasp/security-misconfiguration", label: "Security Config", category: "OWASP" },
      { path: "/patterns/owasp/logging-monitoring", label: "Logging & Monitoring", category: "OWASP" },
      { path: "/patterns/threat/breach-notification", label: "Breach Notification", category: "Threat" },
      { path: "/patterns/threat/suspicious-activity", label: "Suspicious Activity", category: "Threat" },
      { path: "/patterns/data/activity-log", label: "Activity & Audit Log", category: "Data" },
      { path: "/patterns/governance/design-review", label: "Security Design Review", category: "Governance" },
      { path: "/patterns/governance/change-management", label: "Change Management", category: "Governance" },
      { path: "/patterns/governance/compliance-audit", label: "Compliance Audit", category: "Governance" },
    ],
  },
  {
    id: "pci",
    name: "PCI DSS",
    fullName: "Payment Card Industry Data Security Standard",
    color: "#ef4444",
    patterns: [
      { path: "/patterns/auth/login", label: "Login Flow", category: "Auth" },
      { path: "/patterns/auth/mfa", label: "Multi-Factor Auth", category: "Auth" },
      { path: "/patterns/auth/password-strength", label: "Password Strength", category: "Auth" },
      { path: "/patterns/auth/session-timeout", label: "Session Timeout", category: "Auth" },
      { path: "/patterns/data/encryption", label: "Encryption Indicators", category: "Data" },
      { path: "/patterns/owasp/broken-access-control", label: "Access Control", category: "OWASP" },
      { path: "/patterns/owasp/logging-monitoring", label: "Logging & Monitoring", category: "OWASP" },
    ],
  },
  {
    id: "ftc",
    name: "FTC Act",
    fullName: "Federal Trade Commission Act (US) — Deceptive Practices",
    color: "#ec4899",
    patterns: [
      { path: "/patterns/dark/confirmshaming", label: "Confirmshaming", category: "Dark Patterns" },
      { path: "/patterns/dark/cookie-consent", label: "Cookie Consent", category: "Dark Patterns" },
      { path: "/patterns/dark/hidden-unsubscribe", label: "Hidden Unsubscribe", category: "Dark Patterns" },
      { path: "/patterns/dark/bait-switch", label: "Bait & Switch", category: "Dark Patterns" },
      { path: "/patterns/dark/forced-continuity", label: "Forced Continuity", category: "Dark Patterns" },
      { path: "/patterns/dark/privacy-zuckering", label: "Privacy Zuckering", category: "Dark Patterns" },
    ],
  },
  {
    id: "euaiact",
    name: "EU AI Act",
    fullName: "EU Artificial Intelligence Act — Article 50 Transparency (Aug 2026)",
    color: "#c084fc",
    patterns: [
      { path: "/patterns/ai/disclosure", label: "AI Disclosure", category: "AI" },
      { path: "/patterns/ai/content-labeling", label: "Content Labeling", category: "AI" },
      { path: "/patterns/ai/decision-explanation", label: "Decision Explanation", category: "AI" },
      { path: "/patterns/dark/confirmshaming", label: "Confirmshaming", category: "Dark Patterns" },
      { path: "/patterns/dark/privacy-zuckering", label: "Privacy Zuckering", category: "Dark Patterns" },
    ],
  },
  {
    id: "usai",
    name: "US AI Laws",
    fullName: "Colorado AI Act + California AI Transparency Act (2026)",
    color: "#06b6d4",
    patterns: [
      { path: "/patterns/ai/disclosure", label: "AI Disclosure", category: "AI" },
      { path: "/patterns/ai/content-labeling", label: "Content Labeling", category: "AI" },
      { path: "/patterns/ai/decision-explanation", label: "Decision Explanation", category: "AI" },
    ],
  },
  {
    id: "iec62443",
    name: "IEC 62443",
    fullName: "Industrial Automation & Control System Security",
    color: "#f97316",
    patterns: [
      { path: "/patterns/industrial/operator-auth", label: "Operator Authentication", category: "Industrial" },
      { path: "/patterns/industrial/safety-critical", label: "Safety-Critical Confirmation", category: "Industrial" },
      { path: "/patterns/industrial/alarm-fatigue", label: "Alarm Fatigue Management", category: "Industrial" },
      { path: "/patterns/industrial/navigation-levels", label: "Navigation & Levels of Detail", category: "Industrial" },
      { path: "/patterns/auth/mfa", label: "Multi-Factor Auth", category: "Auth" },
      { path: "/patterns/auth/session-timeout", label: "Session Timeout", category: "Auth" },
      { path: "/patterns/owasp/broken-access-control", label: "Access Control", category: "OWASP" },
      { path: "/patterns/owasp/logging-monitoring", label: "Logging & Monitoring", category: "OWASP" },
      { path: "/patterns/governance/design-review", label: "Security Design Review", category: "Governance" },
      { path: "/patterns/governance/change-management", label: "Change Management", category: "Governance" },
    ],
  },
  {
    id: "iec61511",
    name: "IEC 61511",
    fullName: "Safety Instrumented Systems for Process Industries",
    color: "#ef4444",
    patterns: [
      { path: "/patterns/industrial/safety-critical", label: "Safety-Critical Confirmation", category: "Industrial" },
      { path: "/patterns/industrial/alarm-fatigue", label: "Alarm Fatigue Management", category: "Industrial" },
      { path: "/patterns/industrial/operator-auth", label: "Operator Authentication", category: "Industrial" },
    ],
  },
  {
    id: "isa182",
    name: "ISA-18.2",
    fullName: "Management of Alarm Systems for Process Industries (EEMUA 191)",
    color: "#eab308",
    patterns: [
      { path: "/patterns/industrial/alarm-fatigue", label: "Alarm Fatigue Management", category: "Industrial" },
      { path: "/patterns/owasp/logging-monitoring", label: "Logging & Monitoring", category: "OWASP" },
      { path: "/patterns/owasp/security-misconfiguration", label: "Security Config", category: "OWASP" },
    ],
  },
  {
    id: "isa101",
    name: "ISA-101",
    fullName: "Human Machine Interfaces for Process Industries",
    color: "#f97316",
    patterns: [
      { path: "/patterns/industrial/navigation-levels", label: "Navigation & Levels of Detail", category: "Industrial" },
      { path: "/patterns/industrial/alarm-fatigue", label: "Alarm Fatigue Management", category: "Industrial" },
      { path: "/patterns/industrial/operator-auth", label: "Operator Authentication", category: "Industrial" },
      { path: "/patterns/industrial/safety-critical", label: "Safety-Critical Confirmation", category: "Industrial" },
    ],
  },
  {
    id: "fido2",
    name: "WebAuthn / FIDO2",
    fullName: "Web Authentication & Fast Identity Online",
    color: "#00e5ff",
    patterns: [
      { path: "/patterns/auth/passkeys", label: "Passkeys", category: "Auth" },
      { path: "/patterns/auth/login", label: "Login Flow", category: "Auth" },
      { path: "/patterns/auth/mfa", label: "Multi-Factor Auth", category: "Auth" },
      { path: "/patterns/auth/accessible-auth", label: "Accessible Authentication", category: "Auth" },
    ],
  },
  {
    id: "wcag",
    name: "WCAG 2.2",
    fullName: "Web Content Accessibility Guidelines 2.2",
    color: "#a78bfa",
    patterns: [
      { path: "/patterns/auth/accessible-auth", label: "Accessible Authentication", category: "Auth" },
      { path: "/patterns/auth/login", label: "Login Flow", category: "Auth" },
      { path: "/patterns/auth/mfa", label: "Multi-Factor Auth", category: "Auth" },
      { path: "/patterns/auth/passkeys", label: "Passkeys", category: "Auth" },
      { path: "/patterns/auth/session-timeout", label: "Session Timeout", category: "Auth" },
      { path: "/patterns/dark/cookie-consent", label: "Cookie Consent", category: "Dark Patterns" },
      { path: "/patterns/industrial/alarm-fatigue", label: "Alarm Fatigue", category: "Industrial" },
    ],
  },
  {
    id: "nis2",
    name: "NIS2",
    fullName: "Network and Information Security Directive 2 (EU)",
    color: "#3b82f6",
    patterns: [
      { path: "/patterns/auth/mfa", label: "Multi-Factor Auth", category: "Auth" },
      { path: "/patterns/auth/session-timeout", label: "Session Timeout", category: "Auth" },
      { path: "/patterns/auth/passkeys", label: "Passkeys", category: "Auth" },
      { path: "/patterns/threat/breach-notification", label: "Breach Notification", category: "Threat" },
      { path: "/patterns/threat/suspicious-activity", label: "Suspicious Activity", category: "Threat" },
      { path: "/patterns/data/encryption", label: "Encryption Indicators", category: "Data" },
      { path: "/patterns/data/activity-log", label: "Activity & Audit Log", category: "Data" },
      { path: "/patterns/owasp/broken-access-control", label: "Access Control", category: "OWASP" },
      { path: "/patterns/owasp/logging-monitoring", label: "Logging & Monitoring", category: "OWASP" },
      { path: "/patterns/owasp/security-misconfiguration", label: "Security Config", category: "OWASP" },
      { path: "/patterns/industrial/operator-auth", label: "Operator Authentication", category: "Industrial" },
      { path: "/patterns/industrial/alarm-fatigue", label: "Alarm Fatigue", category: "Industrial" },
      { path: "/patterns/industrial/navigation-levels", label: "Navigation Levels", category: "Industrial" },
      { path: "/patterns/threat/phishing-warning", label: "Phishing Warning", category: "Threat" },
      { path: "/patterns/governance/design-review", label: "Security Design Review", category: "Governance" },
      { path: "/patterns/governance/change-management", label: "Change Management", category: "Governance" },
      { path: "/patterns/governance/compliance-audit", label: "Compliance Audit", category: "Governance" },
    ],
  },
  {
    id: "dora",
    name: "DORA",
    fullName: "Digital Operational Resilience Act (EU — Financial Sector)",
    color: "#f59e0b",
    patterns: [
      { path: "/patterns/auth/mfa", label: "Multi-Factor Auth", category: "Auth" },
      { path: "/patterns/auth/session-timeout", label: "Session Timeout", category: "Auth" },
      { path: "/patterns/auth/passkeys", label: "Passkeys", category: "Auth" },
      { path: "/patterns/threat/breach-notification", label: "Breach Notification", category: "Threat" },
      { path: "/patterns/threat/suspicious-activity", label: "Suspicious Activity", category: "Threat" },
      { path: "/patterns/data/encryption", label: "Encryption Indicators", category: "Data" },
      { path: "/patterns/data/activity-log", label: "Activity & Audit Log", category: "Data" },
      { path: "/patterns/owasp/broken-access-control", label: "Access Control", category: "OWASP" },
      { path: "/patterns/owasp/logging-monitoring", label: "Logging & Monitoring", category: "OWASP" },
      { path: "/patterns/owasp/security-misconfiguration", label: "Security Config", category: "OWASP" },
      { path: "/patterns/threat/phishing-warning", label: "Phishing Warning", category: "Threat" },
      { path: "/patterns/governance/change-management", label: "Change Management", category: "Governance" },
      { path: "/patterns/governance/compliance-audit", label: "Compliance Audit", category: "Governance" },
    ],
  },
  {
    id: "cra",
    name: "CRA",
    fullName: "Cyber Resilience Act (EU — Products with Digital Elements)",
    color: "#10b981",
    patterns: [
      { path: "/patterns/auth/login", label: "Login Flow", category: "Auth" },
      { path: "/patterns/auth/mfa", label: "Multi-Factor Auth", category: "Auth" },
      { path: "/patterns/auth/password-strength", label: "Password Strength", category: "Auth" },
      { path: "/patterns/data/encryption", label: "Encryption Indicators", category: "Data" },
      { path: "/patterns/data/file-upload", label: "Secure File Upload", category: "Data" },
      { path: "/patterns/data/deletion", label: "Data Deletion", category: "Data" },
      { path: "/patterns/threat/breach-notification", label: "Breach Notification", category: "Threat" },
      { path: "/patterns/owasp/security-misconfiguration", label: "Security Config", category: "OWASP" },
      { path: "/patterns/owasp/logging-monitoring", label: "Logging & Monitoring", category: "OWASP" },
      { path: "/patterns/industrial/operator-auth", label: "Operator Authentication", category: "Industrial" },
      { path: "/patterns/industrial/safety-critical", label: "Safety-Critical Confirmation", category: "Industrial" },
      { path: "/patterns/threat/phishing-warning", label: "Phishing Warning", category: "Threat" },
    ],
  },
  {
    id: "eaa",
    name: "EAA",
    fullName: "European Accessibility Act (EU — Directive 2019/882)",
    color: "#06b6d4",
    patterns: [
      { path: "/patterns/auth/accessible-auth", label: "Accessible Authentication", category: "Auth" },
      { path: "/patterns/auth/login", label: "Login Flow", category: "Auth" },
      { path: "/patterns/auth/mfa", label: "Multi-Factor Auth", category: "Auth" },
      { path: "/patterns/auth/passkeys", label: "Passkeys", category: "Auth" },
      { path: "/patterns/auth/account-recovery", label: "Account Recovery", category: "Auth" },
      { path: "/patterns/dark/cookie-consent", label: "Cookie Consent", category: "Dark Patterns" },
      { path: "/patterns/dark/confirmshaming", label: "Confirmshaming", category: "Dark Patterns" },
      { path: "/patterns/data/deletion", label: "Data Deletion", category: "Data" },
      { path: "/patterns/data/encryption", label: "Encryption Indicators", category: "Data" },
      { path: "/patterns/threat/breach-notification", label: "Breach Notification", category: "Threat" },
    ],
  },
];

const REG_BY_NAME = new Map(ALL_REGULATIONS.map(r => [r.name, r]));

export function CompliancePage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const filteredPatterns = useMemo(() => {
    if (selected.size === 0) return [];
    const patternMap = new Map<string, { pattern: PatternRef; regs: string[] }>();

    for (const reg of ALL_REGULATIONS) {
      if (!selected.has(reg.id)) continue;
      for (const pattern of reg.patterns) {
        const existing = patternMap.get(pattern.path);
        if (existing) {
          existing.regs.push(reg.name);
        } else {
          patternMap.set(pattern.path, { pattern, regs: [reg.name] });
        }
      }
    }

    return Array.from(patternMap.values()).sort((a, b) => b.regs.length - a.regs.length);
  }, [selected]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold font-mono mb-3 glow-text">Compliance Mapper</h1>
        <p className="text-base" style={{ color: "var(--text-bright)" }}>
          Select your compliance requirements — see which patterns you need.
        </p>
      </div>

      {/* How it works */}
      <div className="rounded-2xl p-4 sm:p-6 mb-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <h2 className="text-sm font-mono font-bold mb-3" style={{ color: "var(--text-bright)" }}>How it works</h2>
        <div className="space-y-2 text-xs font-mono" style={{ color: "var(--text)" }}>
          <p><span style={{ color: "var(--green)" }}>1.</span> Select the regulations your product must comply with</p>
          <p><span style={{ color: "var(--green)" }}>2.</span> The mapper cross-references each regulation against the 34 patterns</p>
          <p><span style={{ color: "var(--green)" }}>3.</span> Results are sorted by impact — patterns satisfying multiple regulations appear first</p>
          <p><span style={{ color: "var(--green)" }}>4.</span> Click any pattern to see its interactive demo, guidelines, and implementation notes</p>
        </div>
        <p className="text-xs font-mono mt-3" style={{ color: "var(--text-dim)" }}>
          18 regulations mapped · Each mapping is based on the regulation's specific articles, not general themes
        </p>
      </div>

      {/* Regulation selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 mb-8">
        {ALL_REGULATIONS.map(reg => (
          <button
            key={reg.id}
            type="button"
            onClick={() => toggle(reg.id)}
            aria-pressed={selected.has(reg.id)}
            className="border rounded-xl p-3 sm:p-4 text-left transition-all cursor-pointer"
            style={{
              borderColor: selected.has(reg.id) ? reg.color : "var(--border)",
              background: selected.has(reg.id) ? `${reg.color}15` : "var(--bg-card)",
              boxShadow: selected.has(reg.id) ? `0 0 15px ${reg.color}20` : "none",
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono font-bold text-sm" style={{ color: selected.has(reg.id) ? reg.color : "var(--text-bright)" }}>
                {reg.name}
              </span>
              {selected.has(reg.id) && <CheckCircle2 className="w-4 h-4" style={{ color: reg.color }} />}
            </div>
            <p className="text-xs" style={{ color: "var(--text)" }}>{reg.fullName}</p>
            <p className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>{reg.patterns.length} patterns</p>
          </button>
        ))}
      </div>

      {/* Results */}
      {selected.size === 0 && (
        <div className="text-center py-12 border rounded-xl" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
          <Filter className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--text-dim)" }} />
          <p className="font-mono text-sm" style={{ color: "var(--text)" }}>Select one or more regulations above</p>
          <p className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>We'll show you which patterns to implement</p>
        </div>
      )}

      {selected.size > 0 && (
        <>
          {/* Summary */}
          <div className="border rounded-xl p-4 sm:p-6 mb-6" style={{ borderColor: "var(--green-border)", background: "var(--green-glow)" }}>
            <div className="flex items-start gap-3 mb-3">
              <Shield className="w-6 h-6 shrink-0 mt-0.5" style={{ color: "var(--green)" }} />
              <div className="min-w-0">
                <p className="font-mono font-bold text-lg" style={{ color: "var(--green)" }}>{filteredPatterns.length} patterns needed</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {ALL_REGULATIONS.filter(r => selected.has(r.id)).map(r => (
                    <span key={r.id} className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: `${r.color}20`, color: r.color }}>{r.name}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Coverage by category */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
              {[...new Set(filteredPatterns.map(p => p.pattern.category))].map(cat => {
                const count = filteredPatterns.filter(p => p.pattern.category === cat).length;
                if (count === 0) return null;
                return (
                  <div key={cat} className="text-center">
                    <p className="font-mono font-bold text-lg" style={{ color: "var(--text-bright)" }}>{count}</p>
                    <p className="text-xs" style={{ color: "var(--text)" }}>{cat}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pattern list */}
          <div className="space-y-2">
            {filteredPatterns.map(({ pattern, regs }) => (
              <Link
                key={pattern.path}
                to={pattern.path}
                className="flex flex-wrap items-center justify-between gap-2 p-3 sm:p-4 border rounded-lg no-underline transition-all"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--green-border)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "var(--green)" }} />
                  <div className="min-w-0">
                    <p className="font-mono text-sm truncate" style={{ color: "var(--text-bright)" }}>{pattern.label}</p>
                    <p className="text-xs" style={{ color: "var(--text)" }}>{pattern.category}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 ml-auto">
                  {regs.map(reg => {
                    const color = REG_BY_NAME.get(reg)?.color ?? '#888';
                    return (
                      <span
                        key={reg}
                        className="text-xs font-mono px-1.5 py-0.5 rounded"
                        style={{ background: `${color}20`, color: color, border: `1px solid ${color}40` }}
                      >
                        {reg}
                      </span>
                    );
                  })}
                </div>
              </Link>
            ))}
          </div>

          {/* Multi-regulation patterns */}
          {filteredPatterns.some(p => p.regs.length > 1) && (
            <div className="border rounded-xl p-3 sm:p-4 mt-6" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
              <h3 className="font-mono text-xs sm:text-sm font-semibold mb-3" style={{ color: "var(--amber)" }}>High-impact patterns</h3>
              <div className="space-y-2">
                {filteredPatterns.filter(p => p.regs.length > 1).map(({ pattern, regs }) => (
                  <div key={pattern.path} className="flex flex-wrap items-center justify-between gap-1 text-xs">
                    <span className="font-mono" style={{ color: "var(--text-bright)" }}>{pattern.label}</span>
                    <span className="font-mono shrink-0 ml-auto" style={{ color: "var(--amber)" }}>{regs.length} regs</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Sources & methodology */}
      <div className="rounded-2xl p-4 sm:p-6 mt-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <h2 className="text-sm font-mono font-bold mb-2" style={{ color: "var(--text-bright)" }}>Mapping methodology</h2>
        <p className="text-xs font-mono mb-3" style={{ color: "var(--text)" }}>
          Each regulation-to-pattern mapping references specific articles and requirements — not general themes. For example, GDPR Art. 17 maps to Data Deletion (right to erasure), not broadly to "all data patterns." The goal is actionable: select your regulations, get the exact patterns you need to implement.
        </p>
        <p className="text-xs font-mono mb-3" style={{ color: "var(--text-dim)" }}>
          Inspired by compliance mapping approaches in ISO 27001 Annex A control mapping, NIST CSF crosswalks, and the EDPB's consistency mechanism for GDPR interpretation across member states.
        </p>
        <div className="flex flex-wrap gap-1.5 text-xs font-mono">
          {[
            { label: "GDPR", url: "https://gdpr-info.eu/" },
            { label: "NIS2", url: "https://digital-strategy.ec.europa.eu/en/policies/nis2-directive" },
            { label: "DORA", url: "https://www.digital-operational-resilience-act.com/" },
            { label: "EU AI Act", url: "https://artificialintelligenceact.eu/" },
            { label: "CRA", url: "https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act" },
            { label: "OWASP", url: "https://owasp.org/www-project-top-ten/" },
            { label: "WCAG 2.2", url: "https://www.w3.org/WAI/WCAG22/quickref/" },
            { label: "ISO 27001", url: "https://www.iso.org/standard/27001" },
            { label: "SOC 2", url: "https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2" },
            { label: "IEC 62443", url: "https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series" },
            { label: "CCPA", url: "https://oag.ca.gov/privacy/ccpa" },
            { label: "FTC", url: "https://www.ftc.gov/legal-library/browse/rules/negative-option-rule" },
            { label: "ePrivacy", url: "https://digital-strategy.ec.europa.eu/en/policies/eprivacy-regulation" },
            { label: "EAA", url: "https://ec.europa.eu/social/main.jsp?catId=1202" },
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
