export type Category = 'auth' | 'threat' | 'dark' | 'data' | 'owasp' | 'ai' | 'industrial' | 'governance';

export const CATEGORY_COLORS: Record<Category, string> = {
  auth: 'var(--green)',
  threat: 'var(--green)',
  dark: 'var(--red)',
  data: 'var(--cyan)',
  owasp: 'var(--amber)',
  ai: 'var(--ai-color)',
  industrial: 'var(--industrial-color)',
  governance: 'var(--text-bright)',
};

export interface PatternInfo {
  path: string;
  label: string;
  category: Category;
  categoryColor: string;
  tags: string[];
}

const RAW_PATTERNS: Omit<PatternInfo, 'categoryColor'>[] = [
  // Auth
  { path: "/patterns/auth/login", label: "Login Flow", category: "auth", tags: ["authentication", "OWASP A07", "CWE-307", "rate limiting", "social login", "MFA"] },
  { path: "/patterns/auth/mfa", label: "Multi-Factor Auth", category: "auth", tags: ["authentication", "OWASP A07", "CWE-308", "TOTP", "SMS", "backup codes"] },
  { path: "/patterns/auth/password-strength", label: "Password Strength", category: "auth", tags: ["authentication", "OWASP A07", "CWE-521", "breach detection", "NIST"] },
  { path: "/patterns/auth/session-timeout", label: "Session Timeout", category: "auth", tags: ["authentication", "OWASP A07", "CWE-613", "session management"] },
  { path: "/patterns/auth/account-recovery", label: "Account Recovery", category: "auth", tags: ["authentication", "OWASP A07", "CWE-640", "password reset"] },
  { path: "/patterns/auth/passkeys", label: "Passkeys / WebAuthn", category: "auth", tags: ["authentication", "WebAuthn", "FIDO2", "passkey", "biometric", "phishing-resistant"] },
  { path: "/patterns/auth/oauth-consent", label: "OAuth Consent", category: "auth", tags: ["authentication", "OAuth", "consent", "permissions", "least privilege", "CWE-250"] },
  { path: "/patterns/auth/accessible-auth", label: "Accessible Authentication", category: "auth", tags: ["authentication", "WCAG 2.2", "SC 3.3.8", "ARIA", "accessibility", "screen reader", "CAPTCHA alternative"] },
  // Threat
  { path: "/patterns/threat/breach-notification", label: "Breach Notification", category: "threat", tags: ["incident response", "GDPR Art. 33", "CWE-200", "breach"] },
  { path: "/patterns/threat/phishing-warning", label: "Phishing Warning", category: "threat", tags: ["threat response", "OWASP A07", "CWE-601", "phishing"] },
  { path: "/patterns/threat/suspicious-activity", label: "Suspicious Activity", category: "threat", tags: ["threat response", "OWASP A07", "CWE-778", "session"] },
  // Dark patterns
  { path: "/patterns/dark/confirmshaming", label: "Confirmshaming", category: "dark", tags: ["dark pattern", "EU DSA", "deceptive design", "consent"] },
  { path: "/patterns/dark/cookie-consent", label: "Cookie Consent", category: "dark", tags: ["dark pattern", "GDPR Art. 7", "ePrivacy", "consent", "cookies"] },
  { path: "/patterns/dark/hidden-unsubscribe", label: "Hidden Unsubscribe", category: "dark", tags: ["dark pattern", "GDPR Art. 17", "right to erasure", "deletion"] },
  { path: "/patterns/dark/privacy-zuckering", label: "Privacy Zuckering", category: "dark", tags: ["dark pattern", "GDPR Art. 5", "data minimization", "permissions"] },
  { path: "/patterns/dark/bait-switch", label: "Bait & Switch", category: "dark", tags: ["dark pattern", "FTC Act", "deceptive design"] },
  { path: "/patterns/dark/forced-continuity", label: "Forced Continuity", category: "dark", tags: ["dark pattern", "FTC", "subscription", "free trial"] },
  // Data
  { path: "/patterns/data/encryption", label: "Encryption Indicators", category: "data", tags: ["data protection", "OWASP A02", "CWE-311", "encryption", "E2E"] },
  { path: "/patterns/data/file-upload", label: "Secure File Upload", category: "data", tags: ["data protection", "OWASP A03", "CWE-434", "malware", "upload"] },
  { path: "/patterns/data/deletion", label: "Data Deletion", category: "data", tags: ["data protection", "GDPR Art. 17", "CWE-212", "right to erasure"] },
  { path: "/patterns/data/activity-log", label: "Activity & Audit Log", category: "data", tags: ["data protection", "GDPR Art. 15", "CWE-778", "OWASP A09", "audit trail", "device management"] },
  // OWASP
  { path: "/patterns/owasp/broken-access-control", label: "Broken Access Control", category: "owasp", tags: ["OWASP A01", "CWE-284", "CWE-639", "RBAC", "IDOR"] },
  { path: "/patterns/owasp/security-misconfiguration", label: "Security Misconfiguration", category: "owasp", tags: ["OWASP A05", "CWE-16", "CWE-209", "headers", "debug"] },
  { path: "/patterns/owasp/logging-monitoring", label: "Logging & Monitoring", category: "owasp", tags: ["OWASP A09", "CWE-778", "CWE-223", "audit", "anomaly"] },
  // AI
  { path: "/patterns/ai/disclosure", label: "AI Disclosure", category: "ai", tags: ["EU AI Act", "Art. 50", "chatbot", "transparency"] },
  { path: "/patterns/ai/content-labeling", label: "AI Content Labeling", category: "ai", tags: ["EU AI Act", "Art. 50", "C2PA", "watermark", "deepfake"] },
  { path: "/patterns/ai/decision-explanation", label: "AI Decision Explanation", category: "ai", tags: ["EU AI Act", "GDPR Art. 22", "high-risk AI", "explainability"] },
  { path: "/patterns/ai/input-safety", label: "AI Input Safety", category: "ai", tags: ["EU AI Act", "OWASP LLM01", "CWE-77", "prompt injection", "rate limiting", "input validation"] },
  { path: "/patterns/ai/human-override", label: "Human Override & AI Kill Switch", category: "ai", tags: ["EU AI Act Art. 14", "GDPR Art. 22", "high-risk AI", "human oversight", "emergency stop"] },
  // Industrial
  { path: "/patterns/industrial/operator-auth", label: "Operator Authentication", category: "industrial", tags: ["industrial", "IEC 62443", "OT security", "badge", "biometric", "emergency"] },
  { path: "/patterns/industrial/safety-critical", label: "Safety-Critical Confirmation", category: "industrial", tags: ["industrial", "IEC 61511", "safety", "emergency shutdown", "override"] },
  { path: "/patterns/industrial/alarm-fatigue", label: "Alarm Fatigue Management", category: "industrial", tags: ["industrial", "ISA-18.2", "EEMUA 191", "alarm management", "HMI"] },
  { path: "/patterns/industrial/navigation-levels", label: "Navigation & Levels of Detail", category: "industrial", tags: ["industrial", "ISA-101", "HMI", "navigation", "drill-down", "levels of detail"] },
  // Governance
  { path: "/patterns/governance/design-review", label: "Security Design Review", category: "governance", tags: ["governance", "review process", "compliance", "checklist", "audit"] },
  { path: "/patterns/governance/change-management", label: "Change Management", category: "governance", tags: ["governance", "IEC 62443", "ISO 27001", "ITIL", "rollback", "feature flag"] },
  { path: "/patterns/governance/compliance-audit", label: "Compliance Audit Workflow", category: "governance", tags: ["governance", "NIS2", "DORA", "GDPR", "audit", "gap analysis", "evidence"] },
];

export const ALL_PATTERNS: PatternInfo[] = RAW_PATTERNS.map(p => ({
  ...p,
  categoryColor: CATEGORY_COLORS[p.category],
}));

// Dev-time assertion: paths must be unique
const _paths = ALL_PATTERNS.map(p => p.path);
if (new Set(_paths).size !== _paths.length) throw new Error('Duplicate pattern paths detected');

export function getPatternIndex(path: string): number {
  return ALL_PATTERNS.findIndex(p => p.path === path);
}

export function getPrevNext(path: string): { prev: PatternInfo | null; next: PatternInfo | null } {
  const idx = getPatternIndex(path);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? ALL_PATTERNS[idx - 1] : null,
    next: idx < ALL_PATTERNS.length - 1 ? ALL_PATTERNS[idx + 1] : null,
  };
}
