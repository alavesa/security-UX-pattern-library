# Security UX Pattern Library

Interactive patterns for designing secure user experiences.

```
$ ls ./patterns

🔒 auth/ (8)
   login_flow ............ OWASP A07, CWE-307
   multi_factor_auth ..... OWASP A07, CWE-308
   password_strength ..... OWASP A07, CWE-521
   session_timeout ....... OWASP A07, CWE-613
   account_recovery ...... OWASP A07, CWE-640
   passkeys .............. WebAuthn, FIDO2
   oauth_consent ......... OAuth 2.0, CWE-250
   accessible_auth ....... WCAG 2.2, SC 3.3.8

🔒 threat/ (3)
   breach_notification ... GDPR Art. 33, CWE-200
   phishing_warning ...... OWASP A07, CWE-601
   suspicious_activity ... OWASP A07, CWE-778

⚠ dark_patterns/ (6)
   confirmshaming ........ EU DSA, Deceptive Design
   cookie_consent ........ GDPR Art. 7, ePrivacy
   hidden_unsubscribe .... GDPR Art. 17, Right to Erasure
   privacy_zuckering ..... GDPR Art. 5, Data Minimization
   bait_and_switch ....... FTC Act Section 5
   forced_continuity ..... FTC Negative Option Rule

🔐 data/ (4)
   encryption_indicators . OWASP A02, CWE-311
   secure_file_upload .... OWASP A03, CWE-434
   data_deletion ......... GDPR Art. 17, CWE-212
   activity_log .......... GDPR Art. 15, CWE-778

🛡 owasp/ (3)
   A01_access_control .... CWE-284, CWE-639
   A05_misconfiguration .. CWE-16, CWE-209
   A09_logging ........... CWE-778, CWE-223

🤖 ai/ (3)
   ai_disclosure ......... EU AI Act Art. 50
   content_labeling ...... EU AI Act Art. 50, C2PA
   decision_explanation .. GDPR Art. 22

🏭 industrial/ (4)
   operator_auth ......... IEC 62443
   safety_critical ....... IEC 61511
   alarm_fatigue ......... ISA-18.2, EEMUA 191
   navigation_levels ..... ISA-101

📋 governance/ (3)
   security_design_review  IEC 62443, ISO 27001
   change_management ..... IEC 62443, ITIL
   compliance_audit ...... NIS2, DORA, GDPR

$ get --score
🛡 Security UX Score: rate your app → A+ through F
$ get --compliance
📋 Compliance Mapper: 17 regulations including NIS2 + DORA + WCAG 2.2 + EU AI Act + IEC 62443
$ get --maturity
📊 Maturity Model: assess your security UX → Level 1-4
$ get --report
📄 Report Generator: 6 questions → exportable .md report
$█
```

Gathered from 20 years of experience in safety-critical industries — energy, maritime, drilling operations — and a double M.Sc. in Cyber Security and Information Systems. The patterns comply to any domain.

## 34 Interactive Patterns + 4 Strategic Tools

The most comprehensive interactive security UX pattern library. Each pattern has a live demo, do/don't guidelines, security rationale with OWASP/CWE/GDPR references, and accessibility notes.

## Strategic Tools

| Tool | What it does |
|------|-------------|
| **Security UX Score** | Checklist across 8 categories → A+ through F grade. Industrial & Governance can be marked N/A for fair scoring. |
| **Compliance Mapper** | Select from 16 regulations (GDPR, NIS2, DORA, CRA, EU AI Act, IEC 62443...) → see which patterns you need |
| **Maturity Model** | 10-question assessment → current level, priority areas, roadmap to next level |
| **Report Generator** | Answer 6 questions → downloadable .md report with prioritized patterns |

## Authentication (8)

| Pattern | What it covers |
|---------|----------------|
| Login Flow | Rate limiting, social login, MFA challenge, remember me, success flow |
| Multi-Factor Auth | TOTP/SMS/backup codes, paste support, progressive cooldown |
| Password Strength | Real-time meter, breach detection, confirm field, show/hide |
| Session Timeout | Countdown warning, auto-save, graceful expiry |
| Account Recovery | Secure reset flow, one-time tokens, anti-enumeration |
| Passkeys / WebAuthn | Create passkey, sign in (0.8s, phishing-proof), manage across devices |
| OAuth Consent | Over-permissioned vs least privilege, granular control, explained permissions |
| Accessible Authentication | CAPTCHA alternatives (passkey, magic link), screen reader MFA, timed actions with announcements (WCAG 2.2 SC 3.3.8) |

## Threat Response (3)

| Pattern | What it covers |
|---------|----------------|
| Breach Notification | In-app banner, full-page with timeline, email with GDPR refs (3 variants) |
| Phishing Warning | Blocked page, email annotations, link safety preview (3 variants) |
| Suspicious Activity | Sign-in alerts, session management, new device approval (3 variants) |

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

## Data Protection (4)

| Pattern | What it covers |
|---------|----------------|
| Encryption Indicators | E2E messaging, connection security, at-rest dashboard (3 variants) |
| Secure File Upload | File type blocking, malware scanning, encryption status |
| Data Deletion | GDPR-compliant deletion with export, confirmation, grace period |
| Activity & Audit Log | Account activity, active devices with session revoke, data access log (GDPR Art. 15) |

## OWASP Top 10 (3)

| Pattern | What it covers |
|---------|----------------|
| A01 Broken Access Control | Role-based UI, IDOR prevention, privilege escalation blocking |
| A05 Security Misconfiguration | Security headers dashboard, debug mode, default credentials |
| A09 Logging & Monitoring | Live event log, anomaly detection, per-user audit trails |

## AI Transparency (3) — EU AI Act (August 2026)

| Pattern | What it covers |
|---------|----------------|
| AI Interaction Disclosure | Chatbot as human (non-compliant) vs labeled AI assistant |
| AI Content Labeling | Social feed labels, article transparency, image authenticity (C2PA) |
| AI Decision Explanation | Loan decisions, content moderation, hiring AI with human appeal |

## Industrial Security UX (4)

| Pattern | What it covers |
|---------|----------------|
| Operator Authentication | Badge + PIN for gloves, adaptive biometrics, emergency override |
| Safety-Critical Confirmation | Hold-to-confirm shutdown, graduated overrides, parameter ranges |
| Alarm Fatigue Management | Alarm flood vs smart grouping, root cause, shelving (ISA-18.2) |
| Navigation & Levels of Detail | ISA-101 4-level HMI hierarchy — plant overview to diagnostic detail |

## Governance (3)

| Pattern | What it covers |
|---------|----------------|
| Security Design Review | Checklist with critical/non-critical items, approval workflow |
| Change Management | Propose → Review → Approve → Rollout → Rollback with impact assessment |
| Compliance Audit Workflow | Scope regulations → Assess requirements → Collect evidence → Gap analysis report |

## Recent Enforcement

| Company | Fine | Reason |
|---------|------|--------|
| Amazon | $30M | Manipulative subscription design |
| Epic Games | $245M | Deceptive in-game purchases |
| TikTok | €345M | Public-by-default dark pattern |
| Meta | €1.2B | GDPR data transfer violations |

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

Hacker terminal aesthetic — black background, green glow, JetBrains Mono, scanlines, Matrix rain with katakana. Each category has its own color: green (auth/threat), red (dark patterns), cyan (data), amber (OWASP), purple (AI), orange (industrial).

## Sources (38)

**EU Regulation:** GDPR, NIS2, DORA, CRA, EU AI Act, EU DSA, ePrivacy, EU Consumer Rights Directive

**Standards & Compliance:** OWASP, CWE, NIST, WCAG 2.2 (SC 3.3.8 Accessible Auth), ISO 27001, SOC 2, PCI DSS, WebAuthn/FIDO2, OAuth 2.0, CCPA, FTC, C2PA, AI Transparency Code, IAB Framework, US State AI Laws, Illinois AI Act

**Industrial:** IEC 62443, IEC 61511, ISA-18.2, ISA-101, EEMUA 191

**Research:** Verizon DBIR, IBM Breach Report, Microsoft MFA Study, USEC 2026, Deceptive Design, Dark Patterns Enforcement, RFC 6238

## Author

**Piia Alavesa** — Senior UX Design Leader
- M.Sc. Cyber Security (University of Jyväskylä)
- M.Sc. Information Systems (University of Oulu)
- 20 years building design organisations for complex industrial systems
- [neversay.no](https://www.neversay.no) | [LinkedIn](https://www.linkedin.com/in/piia-alavesa/)

## License

MIT
