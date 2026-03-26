# Security UX Pattern Library

[![Reviewed by PatchPilots](https://img.shields.io/badge/reviewed%20by-PatchPilots-blue)](https://github.com/alavesa/patchpilots)

**Live site: [uxsec.dev](https://uxsec.dev)**

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
   breach_notification ... GDPR Art. 33/34, CWE-200
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
📋 Compliance Mapper: 18 regulations including NIS2 + DORA + WCAG 2.2 + EU AI Act + EAA + IEC 62443
$ get --maturity
📊 Maturity Model: assess your security UX → Level 1-4
$ get --report
📄 Report Generator: 6 questions → exportable .md report
$ get --convince
🎯 Convince Your Team: enforcement data + ROI arguments for stakeholders
$█
```

Gathered from 20 years of experience in safety-critical industries — energy, maritime, drilling operations — and a double M.Sc. in Cyber Security and Information Systems. The patterns comply to any domain.

## 34 Interactive Patterns + 5 Strategic Tools

The most comprehensive interactive security UX pattern library. Each pattern has a live demo, do/don't guidelines, security rationale with OWASP/CWE/GDPR references, and accessibility notes.

## Strategic Tools

| Tool | What it does |
|------|-------------|
| **Security UX Score** | Checklist across 8 categories → A+ through F grade. Industrial & Governance can be marked N/A for fair scoring. |
| **Compliance Mapper** | Select from 18 regulations (GDPR, NIS2, DORA, CRA, EU AI Act, EAA, IEC 62443...) → see which patterns you need |
| **Maturity Model** | 10-question assessment → current level, priority areas, roadmap to next level |
| **Report Generator** | Answer 6 questions → downloadable .md report with prioritized patterns |
| **Convince Your Team** | Enforcement data, ROI arguments, regulatory deadlines, and next steps — designed to share with stakeholders |

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

## Adding a new pattern

Each pattern is a single React component. Follow these steps:

**1. Create the component**
```
src/patterns/<category>/MyPattern.tsx
```

Use the standard structure:
```tsx
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";

function MyPatternDemo() {
  // Interactive demo with inline styles using CSS variables
  // Use category color for tabs/accents (see color system below)
  return <div>...</div>;
}

export function MyPattern() {
  return (
    <div>
      <PatternHeader
        title="My Pattern"
        description="What this pattern demonstrates"
        severity="high"          // critical | high | medium
        tags={["Category", "OWASP A01", "CWE-XXX"]}
      />
      <DemoContainer label="my pattern (N variants)">
        <MyPatternDemo />
      </DemoContainer>
      <GuidelineSection
        dos={["Do this", "And this"]}
        donts={["Don't do this"]}
        securityRationale="Why this matters..."
        accessibilityNotes={["a11y consideration"]}
      />
    </div>
  );
}
```

**2. Wire it up** — add to these files:
- `src/App.tsx` — add a `<Route>`
- `src/layouts/Layout.tsx` — add to sidebar navigation
- `src/pages/HomePage.tsx` — add to terminal listing + pattern cards
- `src/data/patterns.ts` — add metadata
- `src/pages/CompliancePage.tsx` — map to relevant regulations
- `src/pages/ScorePage.tsx` — add a scoring item if applicable

**3. Styling rules** — critical for the hacker terminal aesthetic:
- All colors via inline `style={{ }}` with CSS variables — **no Tailwind color classes**
- Use `font-mono` on all text
- Cards: `background: "var(--bg-card)"`, `border: "1px solid var(--border)"`
- Inputs: `background: "var(--bg)"`, `color: "var(--text-bright)"`
- Primary buttons: `background: "var(--green)"` (or your category color)
- Text: `var(--text-bright)` headings, `var(--text)` body, `var(--text-dim)` metadata
- Icons: always set explicit color — don't rely on inheritance
- Test on mobile — add `flex-wrap`, `break-words`, `min-w-0` where needed

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS (layout only) + CSS custom properties (colors) + Lucide Icons + React Router
- Built with [Claude Code](https://claude.ai) by Anthropic

## Design

Hacker terminal aesthetic — black background, green glow, JetBrains Mono, scanlines, Matrix rain with katakana. Every interactive demo uses CSS custom properties for consistent dark theming — no Tailwind color classes in demo components.

**Category color system:**

| Category | Color | CSS Variable | Hex |
|----------|-------|-------------|-----|
| Auth & Threat | Green | `--green` | `#00ff41` |
| Dark Patterns | Red | `--red` | `#ff3333` |
| Data Protection | Cyan | `--cyan` | `#00e5ff` |
| OWASP Top 10 | Amber | `--amber` | `#ffaa00` |
| AI Transparency | Purple | `--ai-color` | `#c084fc` |
| Industrial | Orange | `--industrial-color` | `#f97316` |
| Governance | Gray | `--governance-color` | `#cccccc` |

Each color has `--*-glow` (15% opacity background) and `--*-border` (25% opacity border) variants for consistent tinted containers. Semantic colors (red for errors, green for success, amber for warnings) are used across all categories regardless of accent color.

## Sources (45)

**EU Regulation:** GDPR, NIS2, DORA, CRA, EU AI Act, EU DSA, ePrivacy, EU Consumer Rights Directive, European Accessibility Act (EAA)

**Standards & Compliance:** OWASP, CWE, NIST SP 800-63B, NIST CSF, NIST SP 800-30, WCAG 2.2 (SC 3.3.8 Accessible Auth), ISO 27001, ISO 27005, SOC 2, PCI DSS 4.0, WebAuthn/FIDO2, OAuth 2.0, CCPA, FTC, C2PA, AI Transparency Code, IAB Framework, US State AI Laws, Illinois AI Act, CMMI, OWASP SAMM, OWASP Risk Rating

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
