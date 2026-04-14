import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, AlertTriangle, TrendingUp, Users, Scale, Clock, Copy, CheckCheck } from "lucide-react";

export function ConvincePage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `Security UX: Why It Matters

€1.86B+ in dark pattern fines since 2023
204 days — average time to detect a breach
94% of tested apps have broken access control
99.9% of account compromises prevented by MFA

Key regulations:
- GDPR Art. 7: consent must be as easy to withdraw as to give
- EU AI Act Art. 50: AI interactions must be disclosed (Aug 2026)
- FTC Negative Option Rule: cancellation must equal signup ease
- European Accessibility Act: digital services must be accessible (enforced since June 2025)
- PCI DSS 4.0: MFA required for all cardholder data access (enforced since March 2025)

What to do:
1. Audit current security UX → uxsec.dev/score
2. Map compliance requirements → uxsec.dev/compliance
3. Assess maturity level → uxsec.dev/maturity
4. Generate prioritized report → uxsec.dev/report
5. Trace headline implications → uxsec.dev/ripple

Source: uxsec.dev — 36 interactive patterns, 19 regulations, 46 cited sources`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold font-mono mb-3 glow-text">Convince Your Team</h1>
        <p className="text-base" style={{ color: "var(--text-bright)" }}>
          The data, arguments, and tools you need to make the case for security UX investment.
        </p>
        <p className="text-sm mt-2" style={{ color: "var(--text)" }}>
          Share this page, copy the summary, or walk through the sections in a meeting.
        </p>
      </div>

      {/* Copy summary button */}
      <div className="text-center mb-12">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm border-none cursor-pointer"
          style={{ background: "var(--green)", color: "var(--bg)" }}
        >
          {copied ? <><CheckCheck className="w-4 h-4" /> Copied summary</> : <><Copy className="w-4 h-4" /> Copy one-page summary</>}
        </button>
        <p className="text-xs font-mono mt-2" style={{ color: "var(--text-dim)" }}>Plain text — paste into Slack, email, or a doc</p>
      </div>

      {/* Section 1: The cost */}
      <div className="rounded-2xl p-4 sm:p-6 mb-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <h2 className="text-sm font-mono font-bold mb-4 flex items-center gap-2" style={{ color: "var(--red)" }}>
          <AlertTriangle className="w-4 h-4" /> The cost of ignoring security UX
        </h2>

        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          {[
            { stat: "€1.2B", context: "Meta — GDPR data transfer violations", year: "2023" },
            { stat: "€345M", context: "TikTok — public-by-default dark pattern", year: "2023" },
            { stat: "$245M", context: "Epic Games — deceptive in-game purchases", year: "2024" },
            { stat: "$30M", context: "Amazon — manipulative subscription flows", year: "2026" },
          ].map(({ stat, context, year }) => (
            <div key={context} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: "rgba(255,51,51,0.05)", border: "1px solid rgba(255,51,51,0.15)" }}>
              <span className="font-mono font-bold text-lg shrink-0" style={{ color: "var(--red)" }}>{stat}</span>
              <div>
                <p className="text-xs font-mono" style={{ color: "var(--text)" }}>{context}</p>
                <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>{year}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs font-mono" style={{ color: "var(--text)" }}>
          <strong style={{ color: "var(--red)" }}>Total: €1.86B+ in fines since 2023.</strong> These aren't back-end security failures — they're UX decisions. A consent screen that manipulates. A deletion flow that's intentionally hard. A default setting that exposes data. The regulators are looking at the front end now.
        </p>
      </div>

      {/* Section 2: The risk numbers */}
      <div className="rounded-2xl p-4 sm:p-6 mb-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <h2 className="text-sm font-mono font-bold mb-4 flex items-center gap-2" style={{ color: "var(--amber)" }}>
          <Clock className="w-4 h-4" /> The numbers your leadership needs to see
        </h2>

        <div className="space-y-3">
          {[
            { stat: "204 days", desc: "Average time to detect a data breach", source: "IBM Cost of a Data Breach 2023", impact: "Every day of delayed detection increases the cost by $1,000+" },
            { stat: "94%", desc: "Of tested applications have broken access control", source: "OWASP Top 10 (2021)", impact: "The #1 web vulnerability — and it's visible to users in the UI" },
            { stat: "99.9%", desc: "Of account compromises prevented by MFA", source: "Microsoft Security Blog, 2023", impact: "The single highest-ROI security UX investment" },
            { stat: "72 hours", desc: "Maximum time to notify authorities of a breach", source: "GDPR Article 33", impact: "Requires a tested breach notification flow — not ad-hoc emails" },
          ].map(({ stat, desc, source, impact }) => (
            <div key={desc} className="p-3 rounded-lg" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                <span className="font-mono font-bold text-lg" style={{ color: "var(--amber)" }}>{stat}</span>
                <span className="text-xs font-mono" style={{ color: "var(--text-bright)" }}>{desc}</span>
              </div>
              <p className="text-xs font-mono" style={{ color: "var(--text)" }}>{impact}</p>
              <p className="text-xs font-mono mt-1" style={{ color: "var(--text-dim)" }}>Source: {source}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Regulatory deadlines */}
      <div className="rounded-2xl p-4 sm:p-6 mb-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <h2 className="text-sm font-mono font-bold mb-4 flex items-center gap-2" style={{ color: "var(--ai-color)" }}>
          <Scale className="w-4 h-4" /> Regulatory deadlines your product must meet
        </h2>

        <div className="space-y-2">
          {[
            { date: "Now", reg: "GDPR Art. 7", req: "Consent as easy to withdraw as to give — no dark patterns in cookie banners", penalty: "Up to 4% of global annual turnover" },
            { date: "Now", reg: "FTC Neg. Option Rule", req: "Cancellation must be as easy as signup — no retention mazes", penalty: "Up to $50,000 per incident" },
            { date: "Now", reg: "European Accessibility Act", req: "Digital services must be accessible — auth flows, consent, notifications (enforced since June 2025)", penalty: "Varies by member state" },
            { date: "Now", reg: "PCI DSS 4.0", req: "MFA required for all access to cardholder data — phishing-resistant auth, secure session management (enforced since March 2025)", penalty: "Fines $5,000–$100,000/month + loss of card processing" },
            { date: "Aug 2026", reg: "EU AI Act Art. 50", req: "AI interactions must be disclosed — chatbots can't pretend to be human", penalty: "Up to €15M or 3% of global turnover" },
            { date: "2027", reg: "Cyber Resilience Act", req: "Products with digital elements must meet security requirements", penalty: "Up to €15M or 2.5% of global turnover" },
          ].map(({ date, reg, req, penalty }) => (
            <div key={reg} className="flex flex-wrap items-start gap-3 p-3 rounded-lg" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded shrink-0" style={{ background: date === "Now" ? "rgba(255,51,51,0.15)" : "var(--ai-glow)", color: date === "Now" ? "var(--red)" : "var(--ai-color)" }}>{date}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono font-semibold" style={{ color: "var(--text-bright)" }}>{reg}</p>
                <p className="text-xs font-mono mt-0.5" style={{ color: "var(--text)" }}>{req}</p>
                <p className="text-xs font-mono mt-0.5" style={{ color: "var(--text-dim)" }}>Penalty: {penalty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: The ROI argument */}
      <div className="rounded-2xl p-4 sm:p-6 mb-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <h2 className="text-sm font-mono font-bold mb-4 flex items-center gap-2" style={{ color: "var(--green)" }}>
          <TrendingUp className="w-4 h-4" /> The ROI of getting it right
        </h2>

        <div className="space-y-3">
          {[
            { title: "Reduced support costs", desc: "Clear security UX (visible encryption, session warnings, error messages) reduces 'is this safe?' support tickets by 30-50%." },
            { title: "Higher conversion on auth flows", desc: "Passkey sign-in takes 0.8 seconds vs 30+ seconds for password + MFA. Google reports 50% faster sign-in and near-zero account takeover." },
            { title: "Compliance by design", desc: "Building patterns into the product is 10x cheaper than retrofitting after a regulatory audit finding. Each pattern in this library maps to specific regulation articles." },
            { title: "User trust as competitive advantage", desc: "Transparent security UX (showing encryption status, explaining permissions, offering data export) builds the trust that retains users long-term." },
            { title: "Reduced breach impact", desc: "A tested breach notification flow (multi-channel, with checklists and timeline) reduces reputational damage and demonstrates 'reasonable measures' to regulators." },
          ].map(({ title, desc }) => (
            <div key={title} className="p-3 rounded-lg" style={{ background: "rgba(0,255,65,0.03)", border: "1px solid var(--green-border)" }}>
              <p className="text-xs font-mono font-semibold mb-1" style={{ color: "var(--green)" }}>{title}</p>
              <p className="text-xs font-mono" style={{ color: "var(--text)" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5: What to do next */}
      <div className="rounded-2xl p-4 sm:p-6 mb-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <h2 className="text-sm font-mono font-bold mb-4 flex items-center gap-2" style={{ color: "var(--cyan)" }}>
          <Users className="w-4 h-4" /> What to do next — with your team
        </h2>

        <div className="space-y-3">
          {[
            { step: "1", action: "Audit your current state", desc: "Run the Security UX Score — takes 5 minutes, gives you an A+ through F grade across 8 categories.", link: "/score", cmd: "$ get --score" },
            { step: "2", action: "Map your compliance requirements", desc: "Select your applicable regulations — get the exact patterns you need to implement.", link: "/compliance", cmd: "$ get --compliance" },
            { step: "3", action: "Assess your maturity level", desc: "10 questions → your current level (1-4), weakest areas, and a roadmap to the next level.", link: "/maturity", cmd: "$ get --maturity" },
            { step: "4", action: "Generate a stakeholder report", desc: "Answer 6 questions about your product → downloadable .md report with prioritized patterns.", link: "/report", cmd: "$ get --report" },
            { step: "5", action: "Trace headline implications", desc: "Paste any news event into Ripple → get UX, security, and compliance implications through 36 patterns.", link: "/ripple", cmd: "$ live --ripple" },
          ].map(({ step, action, desc, link, cmd }) => (
            <Link key={step} to={link} className="flex items-start gap-3 p-3 rounded-lg no-underline transition-all" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--cyan-border)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
            >
              <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-mono font-bold text-sm" style={{ background: "var(--cyan-glow)", color: "var(--cyan)", border: "1px solid var(--cyan-border)" }}>{step}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono font-semibold" style={{ color: "var(--text-bright)" }}>{action}</p>
                <p className="text-xs font-mono mt-0.5" style={{ color: "var(--text)" }}>{desc}</p>
                <p className="text-xs font-mono mt-1" style={{ color: "var(--cyan)" }}>{cmd}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Sources — every claim linked */}
      <div className="rounded-2xl p-4 sm:p-6 mb-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <h2 className="text-sm font-mono font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-bright)" }}>
          <Shield className="w-4 h-4" style={{ color: "var(--green)" }} /> Sources cited on this page
        </h2>
        <p className="text-xs font-mono mb-4" style={{ color: "var(--text-dim)" }}>
          Every number, fine, and deadline above links to a primary source. Share these with your team for credibility.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-mono font-semibold mb-2" style={{ color: "var(--red)" }}>Enforcement &amp; fines</p>
            <ul className="space-y-1.5 text-xs font-mono" style={{ color: "var(--text)" }}>
              <li><a href="https://www.deceptive.design/enforcement" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>Deceptive Design Enforcement DB</a> <span style={{ color: "var(--text-dim)" }}>— Meta, TikTok, Epic fines</span></li>
              <li><a href="https://www.ketch.com/blog/posts/dark-patterns-are-they-illegal" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>Ketch — Dark Patterns Legality</a> <span style={{ color: "var(--text-dim)" }}>— Amazon FTC action</span></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-mono font-semibold mb-2" style={{ color: "var(--amber)" }}>Breach &amp; risk data</p>
            <ul className="space-y-1.5 text-xs font-mono" style={{ color: "var(--text)" }}>
              <li><a href="https://www.ibm.com/reports/data-breach" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>IBM Cost of a Data Breach 2023</a> <span style={{ color: "var(--text-dim)" }}>— 204-day detection</span></li>
              <li><a href="https://owasp.org/www-project-top-ten/" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>OWASP Top 10 (2021)</a> <span style={{ color: "var(--text-dim)" }}>— 94% broken access control</span></li>
              <li><a href="https://www.microsoft.com/en-us/security/blog/2019/08/20/one-simple-action-you-can-take-to-prevent-99-9-percent-of-account-attacks/" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>Microsoft MFA Study</a> <span style={{ color: "var(--text-dim)" }}>— 99.9% prevention</span></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-mono font-semibold mb-2" style={{ color: "var(--ai-color)" }}>Regulations</p>
            <ul className="space-y-1.5 text-xs font-mono" style={{ color: "var(--text)" }}>
              <li><a href="https://gdpr-info.eu/art-7-gdpr/" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>GDPR Art. 7</a> <span style={{ color: "var(--text-dim)" }}>— Conditions for consent</span></li>
              <li><a href="https://gdpr-info.eu/art-33-gdpr/" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>GDPR Art. 33</a> <span style={{ color: "var(--text-dim)" }}>— 72h breach notification</span></li>
              <li><a href="https://artificialintelligenceact.eu/article/50/" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>EU AI Act Art. 50</a> <span style={{ color: "var(--text-dim)" }}>— AI transparency (Aug 2026)</span></li>
              <li><a href="https://www.ftc.gov/legal-library/browse/rules/negative-option-rule" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>FTC Negative Option Rule</a> <span style={{ color: "var(--text-dim)" }}>— Cancellation ease</span></li>
              <li><a href="https://ec.europa.eu/social/main.jsp?catId=1202" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>European Accessibility Act</a> <span style={{ color: "var(--text-dim)" }}>— June 2025</span></li>
              <li><a href="https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>Cyber Resilience Act</a> <span style={{ color: "var(--text-dim)" }}>— 2027</span></li>
              <li><a href="https://www.pcisecuritystandards.org/document_library/" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>PCI DSS 4.0</a> <span style={{ color: "var(--text-dim)" }}>— March 2025</span></li>
              <li><a href="https://www.iso.org/standard/42001" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>ISO/IEC 42001</a> <span style={{ color: "var(--text-dim)" }}>— AI management system (2023)</span></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-mono font-semibold mb-2" style={{ color: "var(--green)" }}>ROI references</p>
            <ul className="space-y-1.5 text-xs font-mono" style={{ color: "var(--text)" }}>
              <li><a href="https://www.verizon.com/business/resources/reports/dbir/" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>Verizon DBIR 2024</a> <span style={{ color: "var(--text-dim)" }}>— Phishing #1 vector</span></li>
              <li><a href="https://blog.google/technology/safety-security/the-beginning-of-the-end-of-the-password/" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>Google Passkey Report</a> <span style={{ color: "var(--text-dim)" }}>— 50% faster sign-in</span></li>
              <li><a href="https://www.deceptive.design/" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "var(--text-bright)" }}>Deceptive Design</a> <span style={{ color: "var(--text-dim)" }}>— Dark pattern taxonomy</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Shareable quote */}
      <div className="rounded-2xl p-6 sm:p-8 text-center" style={{ background: "var(--green-glow)", border: "1px solid var(--green-border)" }}>
        <Shield className="w-8 h-8 mx-auto mb-3" style={{ color: "var(--green)" }} />
        <blockquote className="text-lg sm:text-xl font-mono font-bold mb-3" style={{ color: "var(--green)" }}>
          "Security is a design decision.<br />Bad UX is a vulnerability."
        </blockquote>
        <p className="text-xs font-mono mb-4" style={{ color: "var(--text)" }}>
          36 interactive patterns · 19 regulations · 46 cited sources · Open source
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm border-none cursor-pointer"
            style={{ background: "var(--green)", color: "var(--bg)" }}
          >
            {copied ? <><CheckCheck className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy summary</>}
          </button>
          <Link
            to="/score"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm no-underline"
            style={{ background: "transparent", color: "var(--green)", border: "1px solid var(--green-border)" }}
          >
            Start with the Score →
          </Link>
        </div>
      </div>
    </div>
  );
}
