export interface PatternInfo {
  path: string;
  label: string;
  category: string;
  categoryColor: string;
  tags: string[];
}

export const ALL_PATTERNS: PatternInfo[] = [
  // Auth
  { path: "/patterns/auth/login", label: "Login Flow", category: "auth", categoryColor: "var(--green)", tags: ["authentication", "OWASP A07", "CWE-307", "rate limiting", "social login", "MFA"] },
  { path: "/patterns/auth/mfa", label: "Multi-Factor Auth", category: "auth", categoryColor: "var(--green)", tags: ["authentication", "OWASP A07", "CWE-308", "TOTP", "SMS", "backup codes"] },
  { path: "/patterns/auth/password-strength", label: "Password Strength", category: "auth", categoryColor: "var(--green)", tags: ["authentication", "OWASP A07", "CWE-521", "breach detection", "NIST"] },
  { path: "/patterns/auth/session-timeout", label: "Session Timeout", category: "auth", categoryColor: "var(--green)", tags: ["authentication", "OWASP A07", "CWE-613", "session management"] },
  { path: "/patterns/auth/account-recovery", label: "Account Recovery", category: "auth", categoryColor: "var(--green)", tags: ["authentication", "OWASP A07", "CWE-640", "password reset"] },
  { path: "/patterns/auth/passkeys", label: "Passkeys / WebAuthn", category: "auth", categoryColor: "var(--green)", tags: ["authentication", "WebAuthn", "FIDO2", "passkey", "biometric", "phishing-resistant"] },
  { path: "/patterns/auth/oauth-consent", label: "OAuth Consent", category: "auth", categoryColor: "var(--green)", tags: ["authentication", "OAuth", "consent", "permissions", "least privilege", "CWE-250"] },
  // Threat
  { path: "/patterns/threat/breach-notification", label: "Breach Notification", category: "threat", categoryColor: "var(--green)", tags: ["incident response", "GDPR Art. 33", "CWE-200", "breach"] },
  { path: "/patterns/threat/phishing-warning", label: "Phishing Warning", category: "threat", categoryColor: "var(--green)", tags: ["threat response", "OWASP A07", "CWE-601", "phishing"] },
  { path: "/patterns/threat/suspicious-activity", label: "Suspicious Activity", category: "threat", categoryColor: "var(--green)", tags: ["threat response", "OWASP A07", "CWE-778", "session"] },
  // Dark patterns
  { path: "/patterns/dark/confirmshaming", label: "Confirmshaming", category: "dark", categoryColor: "var(--red)", tags: ["dark pattern", "EU DSA", "deceptive design", "consent"] },
  { path: "/patterns/dark/cookie-consent", label: "Cookie Consent", category: "dark", categoryColor: "var(--red)", tags: ["dark pattern", "GDPR Art. 7", "ePrivacy", "consent", "cookies"] },
  { path: "/patterns/dark/hidden-unsubscribe", label: "Hidden Unsubscribe", category: "dark", categoryColor: "var(--red)", tags: ["dark pattern", "GDPR Art. 17", "right to erasure", "deletion"] },
  { path: "/patterns/dark/privacy-zuckering", label: "Privacy Zuckering", category: "dark", categoryColor: "var(--red)", tags: ["dark pattern", "GDPR Art. 5", "data minimization", "permissions"] },
  { path: "/patterns/dark/bait-switch", label: "Bait & Switch", category: "dark", categoryColor: "var(--red)", tags: ["dark pattern", "FTC Act", "deceptive design"] },
  { path: "/patterns/dark/forced-continuity", label: "Forced Continuity", category: "dark", categoryColor: "var(--red)", tags: ["dark pattern", "FTC", "subscription", "free trial"] },
  // Data
  { path: "/patterns/data/encryption", label: "Encryption Indicators", category: "data", categoryColor: "var(--cyan)", tags: ["data protection", "OWASP A02", "CWE-311", "encryption", "E2E"] },
  { path: "/patterns/data/file-upload", label: "Secure File Upload", category: "data", categoryColor: "var(--cyan)", tags: ["data protection", "OWASP A03", "CWE-434", "malware", "upload"] },
  { path: "/patterns/data/deletion", label: "Data Deletion", category: "data", categoryColor: "var(--cyan)", tags: ["data protection", "GDPR Art. 17", "CWE-212", "right to erasure"] },
  // OWASP
  { path: "/patterns/owasp/broken-access-control", label: "Broken Access Control", category: "owasp", categoryColor: "var(--amber)", tags: ["OWASP A01", "CWE-284", "CWE-639", "RBAC", "IDOR"] },
  { path: "/patterns/owasp/security-misconfiguration", label: "Security Misconfiguration", category: "owasp", categoryColor: "var(--amber)", tags: ["OWASP A05", "CWE-16", "CWE-209", "headers", "debug"] },
  { path: "/patterns/owasp/logging-monitoring", label: "Logging & Monitoring", category: "owasp", categoryColor: "var(--amber)", tags: ["OWASP A09", "CWE-778", "CWE-223", "audit", "anomaly"] },
  // AI
  { path: "/patterns/ai/disclosure", label: "AI Disclosure", category: "ai", categoryColor: "#c084fc", tags: ["EU AI Act", "Art. 50", "chatbot", "transparency"] },
  { path: "/patterns/ai/content-labeling", label: "AI Content Labeling", category: "ai", categoryColor: "#c084fc", tags: ["EU AI Act", "Art. 50", "C2PA", "watermark", "deepfake"] },
  { path: "/patterns/ai/decision-explanation", label: "AI Decision Explanation", category: "ai", categoryColor: "#c084fc", tags: ["EU AI Act", "GDPR Art. 22", "high-risk AI", "explainability"] },
  // Industrial
  { path: "/patterns/industrial/operator-auth", label: "Operator Authentication", category: "industrial", categoryColor: "#f97316", tags: ["industrial", "IEC 62443", "OT security", "badge", "biometric", "emergency"] },
  { path: "/patterns/industrial/safety-critical", label: "Safety-Critical Confirmation", category: "industrial", categoryColor: "#f97316", tags: ["industrial", "IEC 61511", "safety", "emergency shutdown", "override"] },
  { path: "/patterns/industrial/alarm-fatigue", label: "Alarm Fatigue Management", category: "industrial", categoryColor: "#f97316", tags: ["industrial", "ISA-18.2", "EEMUA 191", "alarm management", "HMI"] },
];

export function getPatternIndex(path: string): number {
  return ALL_PATTERNS.findIndex(p => p.path === path);
}

export function getPrevNext(path: string): { prev: PatternInfo | null; next: PatternInfo | null } {
  const idx = getPatternIndex(path);
  return {
    prev: idx > 0 ? ALL_PATTERNS[idx - 1] : null,
    next: idx < ALL_PATTERNS.length - 1 ? ALL_PATTERNS[idx + 1] : null,
  };
}
