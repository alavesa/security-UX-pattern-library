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

⚠ 3 dark patterns documented
   confirmshaming ........ EU DSA, Deceptive Design
   cookie_consent ........ GDPR Art. 7, ePrivacy
   hidden_unsubscribe .... GDPR Art. 17, Right to Erasure
$█
```

Built from 20 years of UX design leadership and a double M.Sc. in Cyber Security and Information Systems.

## What is this?

A collection of interactive security UX patterns with live demos, do/don't guidelines, OWASP/CWE references, and accessibility notes. Each pattern shows how to design secure interfaces that users actually want to use.

The problem: security and usability are often at odds. Strong security measures frustrate users. Easy-to-use flows leave security gaps. These patterns solve both.

## Authentication Patterns

| Pattern | Security Impact | What it covers |
|---------|----------------|----------------|
| Login Flow | CRITICAL | Rate limiting, social login, MFA challenge, success flow |
| Multi-Factor Auth | CRITICAL | TOTP/SMS/backup codes, paste support, progressive cooldown |
| Password Strength | HIGH | Real-time meter, breach detection, confirm field |
| Session Timeout | MEDIUM | Countdown warning, auto-save, graceful expiry |
| Account Recovery | CRITICAL | Secure reset flow, one-time tokens, anti-enumeration |

## Threat Response Patterns

| Pattern | Security Impact | What it covers |
|---------|----------------|----------------|
| Breach Notification | CRITICAL | In-app banner, full-page disclosure, email (GDPR Art. 33/34) |
| Phishing Warning | CRITICAL | Blocked page interstitial, email annotations, link safety preview |
| Suspicious Activity | HIGH | Sign-in alerts, session management, new device approval |

## Dark Patterns (Anti-Patterns)

| Pattern | What's wrong | Ethical alternative |
|---------|-------------|-------------------|
| Confirmshaming | Guilt-trip dismiss buttons | Neutral, respectful language with 3 options |
| Cookie Consent | "Accept All" manipulation | Equally prominent Accept/Reject |
| Hidden Unsubscribe | 4-step deletion maze | 2-step find-and-confirm with data export |

## Each pattern includes

- **Interactive demo** — working UI you can click through
- **Do / Don't** — clear guidelines with rationale
- **Security rationale** — why this matters, with OWASP and CWE references
- **Accessibility notes** — ARIA patterns, keyboard support, screen reader guidance
- **Dark patterns include** — side-by-side comparison of dark vs ethical alternative

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

Hacker terminal aesthetic — black background, green glow, JetBrains Mono, scanlines, blinking cursor. Because security UX should look like it means business.

## Coming soon

- **Permissions & Access Control** — role-based access, consent flows, admin controls
- **Data Protection** — encryption indicators, secure sharing, privacy controls
- **Privacy** — cookie consent flows, data export, account deletion patterns

## Author

**Piia Alavesa** — Senior UX Design Leader
- M.Sc. Cyber Security (University of Jyväskylä)
- M.Sc. Information Systems (University of Oulu)
- 20 years building design organisations for complex industrial systems
- [neversay.no](https://www.neversay.no) | [LinkedIn](https://www.linkedin.com/in/piia-alavesa/)

## License

MIT
