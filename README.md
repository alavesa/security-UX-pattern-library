# Security UX Pattern Library

Interactive patterns for designing secure user experiences.

```
$ patchpilots security ./auth-patterns

🔒 5 patterns loaded
   login_flow ............ OWASP A07, CWE-307
   multi_factor_auth ..... OWASP A07, CWE-308
   password_strength ..... OWASP A07, CWE-521
   session_timeout ....... OWASP A07, CWE-613
   account_recovery ...... OWASP A07, CWE-640
$█
```

Built from 20 years of UX design leadership and a double M.Sc. in Cyber Security and Information Systems.

## What is this?

A collection of interactive security UX patterns with live demos, do/don't guidelines, OWASP/CWE references, and accessibility notes. Each pattern shows how to design secure interfaces that users actually want to use.

The problem: security and usability are often at odds. Strong security measures frustrate users. Easy-to-use flows leave security gaps. These patterns solve both.

## Authentication Patterns

| Pattern | Security Impact | What it covers |
|---------|----------------|----------------|
| [Login Flow](src/patterns/auth/LoginPattern.tsx) | CRITICAL | Rate limiting, generic errors, anti-enumeration |
| [Multi-Factor Auth](src/patterns/auth/MfaPattern.tsx) | CRITICAL | TOTP/SMS code entry, auto-advance, method switching |
| [Password Strength](src/patterns/auth/PasswordStrengthPattern.tsx) | HIGH | Real-time meter, checklist, breach detection |
| [Session Timeout](src/patterns/auth/SessionTimeoutPattern.tsx) | MEDIUM | Countdown warning, auto-save, graceful expiry |
| [Account Recovery](src/patterns/auth/AccountRecoveryPattern.tsx) | CRITICAL | Secure reset flow, one-time tokens, anti-enumeration |

## Each pattern includes

- **Interactive demo** — working UI you can click through
- **Do / Don't** — clear guidelines with rationale
- **Security rationale** — why this matters, with OWASP and CWE references
- **Accessibility notes** — ARIA patterns, keyboard support, screen reader guidance

## Run locally

```bash
git clone https://github.com/alavesa/security-UX-pattern-library.git
cd security-UX-pattern-library
npm install
npm run dev
```

Opens at http://localhost:5173

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS
- Lucide icons
- React Router

## Design

Hacker terminal aesthetic — black background, green glow, JetBrains Mono, scanlines, blinking cursor. Because security UX should look like it means business.

## Coming soon

- **Permissions & Access Control** — role-based access, consent flows, admin controls
- **Threat Response** — breach notifications, phishing warnings, incident response UIs
- **Data Protection** — encryption indicators, secure sharing, privacy controls

## Author

**Piia Alavesa** — Senior UX Design Leader
- M.Sc. Cyber Security (University of Jyväskylä)
- M.Sc. Information Systems (University of Oulu)
- 20 years building design organisations for complex industrial systems
- [neversay.no](https://www.neversay.no) | [LinkedIn](https://www.linkedin.com/in/piia-alavesa/)

## License

MIT
