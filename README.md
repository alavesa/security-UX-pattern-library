# Security UX Pattern Library

Interactive patterns for designing secure user experiences.

```
$ ls ./patterns

🔒 5 auth patterns
   login_flow ............ OWASP A07, CWE-307
   multi_factor_auth ..... OWASP A07, CWE-308
   password_strength ..... OWASP A07, CWE-521
   session_timeout ....... OWASP A07, CWE-613
   account_recovery ...... OWASP A07, CWE-640

🔒 3 threat response patterns
   breach_notification ... GDPR Art. 33, CWE-200
   phishing_warning ...... OWASP A07, CWE-601
   suspicious_activity ... OWASP A07, CWE-778

⚠ 6 dark patterns documented
   confirmshaming ........ EU DSA, Deceptive Design
   cookie_consent ........ GDPR Art. 7, ePrivacy
   hidden_unsubscribe .... GDPR Art. 17, Right to Erasure
   privacy_zuckering ..... GDPR Art. 5, Data Minimization
   bait_and_switch ....... FTC Act Section 5
   forced_continuity ..... FTC Negative Option Rule

🔐 3 data protection patterns
   encryption_indicators . OWASP A02, CWE-311
   secure_file_upload .... OWASP A03, CWE-434
   data_deletion ......... GDPR Art. 17, CWE-212

🛡 3 OWASP Top 10 patterns
   A01_access_control .... CWE-284, CWE-639
   A05_misconfiguration .. CWE-16, CWE-209
   A09_logging ........... CWE-778, CWE-223

🤖 3 AI transparency patterns
   ai_disclosure ......... EU AI Act Art. 50
   content_labeling ...... EU AI Act Art. 50, C2PA
   decision_explanation .. EU AI Act, GDPR Art. 22

$ get --score
🛡 Security UX Score: rate your app → A+ through F
$ get --compliance
📋 Compliance Mapper: GDPR, CCPA, SOC 2, ISO 27001, PCI DSS, FTC, EU AI Act
$ get --maturity
📊 Maturity Model: assess your security UX → Level 1-4
$█
```

Built from 20 years of UX design leadership and a double M.Sc. in Cyber Security and Information Systems.

## 23 Interactive Patterns + 3 Strategic Tools

The most comprehensive interactive security UX pattern library that exists. Each pattern has a live demo, do/don't guidelines, security rationale with OWASP/CWE/GDPR references, and accessibility notes.

## Strategic Tools

| Tool | What it does |
|------|-------------|
| **Security UX Score** | 22-item checklist across 4 categories → A+ through F grade with shareable badge |
| **Compliance Mapper** | Select GDPR, CCPA, SOC 2, ISO 27001, PCI DSS, FTC, EU AI Act, US AI Laws → see which patterns you need |
| **Maturity Model** | 8-question assessment → current level, priority areas, roadmap to next level |

## Authentication Patterns (5)

| Pattern | Security Impact | What it covers |
|---------|----------------|----------------|
| Login Flow | CRITICAL | Rate limiting, social login, MFA challenge, remember me, success flow |
| Multi-Factor Auth | CRITICAL | TOTP/SMS/backup codes, paste support, progressive cooldown |
| Password Strength | HIGH | Real-time meter, breach detection, confirm field, show/hide |
| Session Timeout | MEDIUM | Countdown warning, auto-save, graceful expiry |
| Account Recovery | CRITICAL | Secure reset flow, one-time tokens, anti-enumeration |

## Threat Response Patterns (3)

| Pattern | Security Impact | What it covers |
|---------|----------------|----------------|
| Breach Notification | CRITICAL | In-app banner, full-page with timeline, email with GDPR refs (3 variants) |
| Phishing Warning | CRITICAL | Blocked page, email annotations, link safety preview (3 variants) |
| Suspicious Activity | HIGH | Sign-in alerts, session management, new device approval (3 variants) |

## Dark Patterns — Anti-Patterns (6)

Each shows the manipulative version side-by-side with the ethical alternative.

| Pattern | What's wrong | Ethical alternative |
|---------|-------------|-------------------|
| Confirmshaming | Guilt-trip dismiss buttons | Neutral language with 3 options |
| Cookie Consent | "Accept All" manipulation | Equally prominent Accept/Reject |
| Hidden Unsubscribe | 4-step deletion maze | 2-step with data export |
| Privacy Zuckering | Pre-enabled permissions | Opt-in with per-permission explanations |
| Bait & Switch | X button enables features | X means close, always |
| Forced Continuity | Free trial auto-charge trap | No-card trial, pre-expiry reminder |

## Data Protection Patterns (3)

| Pattern | Security Impact | What it covers |
|---------|----------------|----------------|
| Encryption Indicators | HIGH | E2E messaging, connection security, at-rest dashboard (3 variants) |
| Secure File Upload | HIGH | File type blocking, malware scanning, encryption status |
| Data Deletion | CRITICAL | GDPR-compliant deletion with export, confirmation, grace period |

## OWASP Top 10 Patterns (3)

| Pattern | OWASP | What it covers |
|---------|-------|----------------|
| Broken Access Control | A01 | Role-based UI, IDOR prevention, privilege escalation blocking (3 variants) |
| Security Misconfiguration | A05 | Security headers dashboard, debug mode, default credentials (3 variants) |
| Logging & Monitoring | A09 | Live event log, anomaly detection, per-user audit trails (3 variants) |

## AI Transparency Patterns (3) — EU AI Act (August 2026)

| Pattern | Regulation | What it covers |
|---------|-----------|----------------|
| AI Interaction Disclosure | Art. 50(1) | Chatbot as human (non-compliant) vs labeled AI assistant (compliant) |
| AI Content Labeling | Art. 50(2-4) | Social feed labels, article transparency, image authenticity (C2PA) |
| AI Decision Explanation | Art. 50 + GDPR Art. 22 | Loan decisions, content moderation, hiring AI with human appeal |

## Recent Enforcement

| Company | Fine | Authority | Reason |
|---------|------|-----------|--------|
| Amazon | $30M | FTC | Manipulative subscription design |
| Epic Games | $245M | FTC | Deceptive in-game purchases |
| TikTok | €345M | Irish DPC | Public-by-default dark pattern |
| Meta | €1.2B | Irish DPC | GDPR data transfer violations |

## Each pattern includes

- **Interactive demo** — working UI you can click through
- **Do / Don't** — clear guidelines with rationale
- **Security rationale** — OWASP, CWE, GDPR, FTC, EU AI Act references
- **Accessibility notes** — ARIA, keyboard, screen reader guidance
- **Dark patterns** — side-by-side dark vs ethical comparison
- **AI patterns** — compliant vs non-compliant comparison

## Run locally

```bash
git clone https://github.com/alavesa/security-UX-pattern-library.git
cd security-UX-pattern-library
npm install
npm run dev
```

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS + Lucide Icons + React Router
- Built with [Claude Code](https://claude.ai) by Anthropic

## Design

Hacker terminal aesthetic — black background, green glow, JetBrains Mono, scanlines, blinking cursor. Each category has its own color: green (auth/threat), red (dark patterns), cyan (data), amber (OWASP), purple (AI).

## Sources

**Standards:** OWASP Top 10, MITRE CWE, NIST SP 800-63B, GDPR, WCAG 2.1, FTC Negative Option Rule

**AI Regulation:** EU AI Act Article 50, Transparency Code of Practice, US State AI Laws, IAB Framework, C2PA Standard

**Research:** Verizon DBIR, IBM Cost of a Data Breach, Microsoft MFA Study, USEC 2026, Deceptive Design, RFC 6238

## Author

**Piia Alavesa** — Senior UX Design Leader
- M.Sc. Cyber Security (University of Jyväskylä)
- M.Sc. Information Systems (University of Oulu)
- 20 years building design organisations for complex industrial systems
- [neversay.no](https://www.neversay.no) | [LinkedIn](https://www.linkedin.com/in/piia-alavesa/)

## License

MIT
