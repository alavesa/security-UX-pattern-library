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

$ get --score
🛡 Security UX Score: rate your app → A+ through F
$█
```

Built from 20 years of UX design leadership and a double M.Sc. in Cyber Security and Information Systems.

## Security UX Score

**Rate your app's security UX.** Interactive 22-item checklist that scores your app across Authentication, Data Protection, Threat Response, and Ethical Design. Get a grade from A+ to F with a shareable badge.

## What is this?

17 interactive security UX patterns + 1 scoring tool. Live demos, do/don't guidelines, OWASP/CWE references, and accessibility notes. Each pattern shows how to design secure interfaces that users actually want to use.

The problem: security and usability are often at odds. Strong security measures frustrate users. Easy-to-use flows leave security gaps. These patterns solve both.

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
| Breach Notification | CRITICAL | In-app banner, full-page with timeline, email with GDPR refs |
| Phishing Warning | CRITICAL | Blocked page, email annotations, link safety preview |
| Suspicious Activity | HIGH | Sign-in alerts, session management, new device approval |

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
| Encryption Indicators | HIGH | E2E messaging, connection security, at-rest dashboard |
| Secure File Upload | HIGH | File type blocking, malware scanning, encryption status |
| Data Deletion | CRITICAL | GDPR-compliant deletion with export, confirmation, grace period |

## Each pattern includes

- **Interactive demo** — working UI you can click through
- **Do / Don't** — clear guidelines with rationale
- **Security rationale** — OWASP, CWE, GDPR, FTC references
- **Accessibility notes** — ARIA, keyboard, screen reader guidance
- **Dark patterns** — side-by-side dark vs ethical comparison

## Run locally

```bash
git clone https://github.com/alavesa/security-UX-pattern-library.git
cd security-UX-pattern-library
npm install
npm run dev
```

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS
- Lucide icons
- React Router

## Design

Hacker terminal aesthetic — black background, green glow, JetBrains Mono, scanlines, blinking cursor. Each category has its own color: green (auth), red (dark patterns), cyan (data protection).

## Coming soon

- **Permissions & Access Control** — role-based access, OAuth consent, admin panels
- **Privacy** — privacy dashboards, tracking controls, data portability
- **Compliance** — GDPR notices, age verification, DPA flows

## Author

**Piia Alavesa** — Senior UX Design Leader
- M.Sc. Cyber Security (University of Jyväskylä)
- M.Sc. Information Systems (University of Oulu)
- 20 years building design organisations for complex industrial systems
- [neversay.no](https://www.neversay.no) | [LinkedIn](https://www.linkedin.com/in/piia-alavesa/)

## License

MIT
