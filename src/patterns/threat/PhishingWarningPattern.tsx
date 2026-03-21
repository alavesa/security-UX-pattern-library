import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { AlertTriangle, Shield, ExternalLink, XCircle, CheckCircle2, Eye } from "lucide-react";

function PhishingWarningDemo() {
  const [scenario, setScenario] = useState<"interstitial" | "email" | "link">("interstitial");
  const [proceeded, setProceeded] = useState(false);
  const [reported, setReported] = useState(false);

  const reset = () => {
    setProceeded(false);
    setReported(false);
  };

  return (
    <div className="w-full max-w-lg">
      {/* Scenario toggle */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {(["interstitial", "email", "link"] as const).map(s => (
          <button
            key={s}
            onClick={() => { setScenario(s); reset(); }}
            className={`flex-1 text-xs py-2 rounded-md font-mono transition-colors border-none cursor-pointer ${scenario === s ? "font-medium" : ""}`}
            style={{
              background: scenario === s ? "var(--green-glow)" : "transparent",
              color: scenario === s ? "var(--green)" : "var(--text)",
            }}
          >
            {s === "interstitial" ? "Blocked Page" : s === "email" ? "Email Warning" : "Suspicious Link"}
          </button>
        ))}
      </div>

      {/* Interstitial warning */}
      {scenario === "interstitial" && !proceeded && (
        <div className="rounded-2xl p-6 sm:p-8 text-center" style={{ background: "rgba(255,51,51,0.08)", border: "2px solid rgba(255,51,51,0.3)" }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(255,51,51,0.15)" }}>
            <AlertTriangle className="w-8 h-8" style={{ color: "var(--red)" }} />
          </div>
          <h2 className="text-xl font-bold font-mono mb-2" style={{ color: "var(--red)" }}>Deceptive site ahead</h2>
          <p className="text-sm font-mono mb-2" style={{ color: "var(--text-bright)" }}>
            <strong style={{ color: "var(--red)" }}>login-examp1e.com</strong> may be trying to steal your information.
          </p>
          <p className="text-xs font-mono mb-6" style={{ color: "var(--text)" }}>
            This site has been reported for impersonating <strong style={{ color: "var(--text-bright)" }}>example.com</strong>. Attackers may trick you into entering your password, personal information, or financial details.
          </p>

          <div className="rounded-lg p-4 text-left mb-6" style={{ background: "var(--bg-card)", border: "1px solid rgba(255,51,51,0.2)" }}>
            <h3 className="text-xs font-semibold font-mono mb-2" style={{ color: "var(--red)" }}>Why was this blocked?</h3>
            <ul className="text-xs font-mono space-y-1" style={{ color: "var(--text)" }}>
              <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "var(--red)" }} /> Domain registered 2 days ago</li>
              <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "var(--red)" }} /> Mimics login page of example.com</li>
              <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "var(--red)" }} /> SSL certificate from free provider (not org-validated)</li>
              <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "var(--red)" }} /> Reported by 47 users in the last 24 hours</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => window.history.back}
              className="w-full py-2.5 rounded-lg font-medium font-mono text-sm border-none cursor-pointer"
              style={{ background: "var(--green)", color: "var(--bg)" }}
            >
              Go back to safety
            </button>
            <button
              type="button"
              onClick={() => setProceeded(true)}
              className="w-full text-xs py-2 bg-transparent border-none cursor-pointer font-mono"
              style={{ color: "var(--text-dim)" }}
            >
              I understand the risk, proceed anyway (not recommended)
            </button>
          </div>
        </div>
      )}

      {scenario === "interstitial" && proceeded && (
        <div className="rounded-2xl p-4 sm:p-6" style={{ background: "var(--bg-card)", border: "2px solid rgba(255,51,51,0.3)" }}>
          <div className="text-xs font-mono px-3 py-1.5 rounded mb-4 flex items-center gap-2" style={{ background: "var(--red)", color: "white" }}>
            <AlertTriangle className="w-3.5 h-3.5" />
            WARNING: You are viewing a potentially dangerous site
          </div>
          <div className="p-4 rounded-lg" style={{ background: "var(--bg)" }}>
            <div className="h-4 rounded w-1/2 mb-3" style={{ background: "var(--border)" }} />
            <div className="h-3 rounded w-full mb-2" style={{ background: "var(--border)" }} />
            <div className="h-8 rounded w-full mb-2" style={{ background: "var(--border)" }} />
            <div className="h-8 rounded w-full mb-2" style={{ background: "var(--border)" }} />
            <div className="h-10 rounded w-full" style={{ background: "rgba(255,51,51,0.15)" }} />
          </div>
          <div className="rounded-lg p-3 mt-4 text-xs font-mono" style={{ background: "rgba(255,170,0,0.05)", border: "1px solid rgba(255,170,0,0.2)", color: "var(--amber)" }}>
            <strong>UX note:</strong> The persistent red banner ensures the user never forgets this is a flagged site. The page content is rendered but all form submissions should be blocked.
          </div>
        </div>
      )}

      {/* Email phishing indicators */}
      {scenario === "email" && (
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          {/* Warning banner */}
          <div className="px-4 py-3 flex items-start gap-3" style={{ background: "rgba(255,170,0,0.1)", borderBottom: "1px solid rgba(255,170,0,0.2)" }}>
            <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "var(--amber)" }} />
            <div className="flex-1">
              <p className="text-sm font-semibold font-mono" style={{ color: "var(--amber)" }}>This message looks suspicious</p>
              <p className="text-xs font-mono mt-1" style={{ color: "var(--text)" }}>
                This email claims to be from Example Corp but was sent from <strong style={{ color: "var(--red)" }}>noreply@examp1e-corp.biz</strong> — a domain not associated with Example Corp.
              </p>
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setReported(true)}
                  disabled={reported}
                  className="text-xs font-mono px-3 py-1 rounded border-none cursor-pointer disabled:opacity-50"
                  style={{ background: "rgba(255,170,0,0.2)", color: "var(--amber)" }}
                >
                  {reported ? "Reported ✓" : "Report phishing"}
                </button>
                <button type="button" className="text-xs font-mono bg-transparent border-none cursor-pointer" style={{ color: "var(--text)" }}>
                  Not phishing
                </button>
              </div>
            </div>
          </div>

          {/* Email content with annotations */}
          <div className="p-4 sm:p-6 text-sm font-mono space-y-3" style={{ color: "var(--text)" }}>
            <div className="flex flex-wrap items-center gap-2 text-xs" style={{ color: "var(--text-dim)" }}>
              <span>From: "Example Corp Security" &lt;noreply@examp1e-corp.biz&gt;</span>
              <span className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: "rgba(255,51,51,0.15)", color: "var(--red)" }}>SUSPICIOUS DOMAIN</span>
            </div>

            <p style={{ color: "var(--text-bright)" }}>Dear Valued Customer,</p>
            <p style={{ color: "var(--text-bright)" }}>We have detected unusual activity on your account. Please verify your identity immediately to avoid account suspension.</p>

            <div className="relative inline-block">
              <a href="#" onClick={e => e.preventDefault()} className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium font-mono no-underline" style={{ background: "var(--red)", color: "white" }}>
                Verify Now <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <div className="absolute -top-1 -right-1 text-xs px-1.5 py-0.5 rounded font-mono" style={{ background: "var(--red)", color: "white" }}>
                BLOCKED
              </div>
            </div>

            <div className="rounded-lg p-3 mt-4" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
              <h4 className="text-xs font-semibold font-mono mb-2 flex items-center gap-1" style={{ color: "var(--text-bright)" }}><Eye className="w-3.5 h-3.5" /> Phishing indicators detected:</h4>
              <ul className="text-xs font-mono space-y-1.5" style={{ color: "var(--text)" }}>
                <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "var(--red)" }} /> Sender domain doesn't match claimed organization</li>
                <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "var(--red)" }} /> Creates false urgency ("account suspension")</li>
                <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "var(--red)" }} /> Generic greeting ("Dear Valued Customer")</li>
                <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "var(--red)" }} /> Link URL doesn't match button text</li>
                <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "var(--red)" }} /> No DKIM signature</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Suspicious link preview */}
      {scenario === "link" && (
        <div className="rounded-2xl p-4 sm:p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <h3 className="text-sm font-semibold font-mono mb-4" style={{ color: "var(--text-bright)" }}>Link safety check</h3>

          <div className="space-y-3">
            {/* Safe link */}
            <div className="rounded-lg p-3" style={{ border: "1px solid rgba(0,255,65,0.3)", background: "rgba(0,255,65,0.05)" }}>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4" style={{ color: "var(--green)" }} />
                <span className="text-sm font-medium font-mono" style={{ color: "var(--green)" }}>Safe</span>
              </div>
              <p className="text-xs font-mono mb-1" style={{ color: "var(--text)" }}>https://example.com/account/settings</p>
              <p className="text-xs font-mono" style={{ color: "var(--green)" }}>Domain verified · HTTPS · Known organization</p>
            </div>

            {/* Suspicious link */}
            <div className="rounded-lg p-3" style={{ border: "1px solid rgba(255,170,0,0.3)", background: "rgba(255,170,0,0.05)" }}>
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4" style={{ color: "var(--amber)" }} />
                <span className="text-sm font-medium font-mono" style={{ color: "var(--amber)" }}>Suspicious</span>
              </div>
              <p className="text-xs font-mono mb-1" style={{ color: "var(--text)" }}>
                https://examp<span style={{ color: "var(--red)", fontWeight: "bold" }}>1</span>e.com/login?redirect=...
              </p>
              <p className="text-xs font-mono" style={{ color: "var(--amber)" }}>Lookalike domain · Registered 3 days ago · Contains redirect</p>
            </div>

            {/* Dangerous link */}
            <div className="rounded-lg p-3" style={{ border: "1px solid rgba(255,51,51,0.3)", background: "rgba(255,51,51,0.05)" }}>
              <div className="flex items-center gap-2 mb-1">
                <XCircle className="w-4 h-4" style={{ color: "var(--red)" }} />
                <span className="text-sm font-medium font-mono" style={{ color: "var(--red)" }}>Dangerous</span>
              </div>
              <p className="text-xs font-mono mb-1" style={{ color: "var(--text)" }}>http://192.168.1.100/login.php</p>
              <p className="text-xs font-mono" style={{ color: "var(--red)" }}>Raw IP address · No HTTPS · Known phishing page</p>
            </div>
          </div>

          <div className="rounded-lg p-3 mt-4 text-xs font-mono" style={{ background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.2)", color: "var(--cyan)" }}>
            <strong>Pattern:</strong> Show link safety before the user clicks — preview the destination, highlight red flags (lookalike chars, raw IPs, missing HTTPS), and give a clear safe/suspicious/dangerous verdict.
          </div>
        </div>
      )}

      <button onClick={reset} className="mt-4 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer" style={{ color: "var(--text)" }}>
        Reset demo
      </button>
    </div>
  );
}

export function PhishingWarningPattern() {
  return (
    <div>
      <PatternHeader
        title="Phishing Warning"
        description="How to warn users about phishing attempts — interstitial pages for blocked sites, email phishing indicators, and link safety previews. Makes invisible threats visible."
        severity="critical"
        tags={["Threat Response", "OWASP A07", "CWE-601"]}
      />

      <DemoContainer label="phishing warning (3 variants)">
        <PhishingWarningDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Explain WHY something is blocked — show specific indicators (domain age, lookalike chars)",
          "Provide a clear 'Go back to safety' as the primary action",
          "Allow advanced users to proceed with explicit risk acknowledgment",
          "Show phishing indicators inline on suspicious emails (domain mismatch, urgency, generic greeting)",
          "Preview link destinations before the user clicks",
          "Highlight character substitution attacks (examp1e vs example — numeral '1' vs letter 'l')",
          "Include a 'Report phishing' button to improve detection",
          "Keep a persistent warning if the user proceeds to a flagged site",
        ]}
        donts={[
          "Don't make 'proceed anyway' equally prominent as 'go back' — it should be de-emphasized",
          "Don't show warnings so often that users develop 'warning fatigue'",
          "Don't block sites without explaining why — unexplained blocks erode trust",
          "Don't auto-click 'go back' — let the user read and decide",
          "Don't use technical jargon only ('SSL certificate mismatch') — explain the risk in plain language",
          "Don't hide the phishing indicators — educating users is part of the defense",
          "Don't rely solely on URL checking — analyze email headers, content patterns, and sender reputation",
        ]}
        securityRationale="Phishing is the #1 initial attack vector for data breaches (Verizon DBIR, 2024). Technical controls (DMARC, link scanning) catch many attacks, but user-facing warnings are the last line of defense. The key UX insight: most users can't distinguish phishing from legitimate emails. Instead of expecting them to, the UI should do the detection and clearly explain what's suspicious. The goal is education through exposure — every warning teaches the user to spot the next attack."
        accessibilityNotes={[
          "Warning pages use high-contrast colors meeting WCAG AA",
          "Blocked content shows text explanation, not just a colored banner",
          "Report buttons provide feedback ('Reported ✓') confirming the action",
          "Link previews use both color AND text labels for safety status",
          "Character substitution highlights use bold + color to draw attention",
          "All interactive elements are keyboard accessible",
        ]}
      />
    </div>
  );
}
