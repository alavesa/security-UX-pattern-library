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
        <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-red-900 mb-2">Deceptive site ahead</h2>
          <p className="text-sm text-red-700 mb-2">
            <strong>login-examp1e.com</strong> may be trying to steal your information.
          </p>
          <p className="text-xs text-red-600 mb-6">
            This site has been reported for impersonating <strong>example.com</strong>. Attackers may trick you into entering your password, personal information, or financial details.
          </p>

          <div className="bg-white border border-red-200 rounded-lg p-4 text-left mb-6">
            <h3 className="text-xs font-semibold text-red-800 mb-2">Why was this blocked?</h3>
            <ul className="text-xs text-red-700 space-y-1">
              <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-400" /> Domain registered 2 days ago</li>
              <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-400" /> Mimics login page of example.com</li>
              <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-400" /> SSL certificate from free provider (not organization-validated)</li>
              <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-400" /> Reported by 47 users in the last 24 hours</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => window.history.back}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors border-none cursor-pointer"
            >
              Go back to safety
            </button>
            <button
              onClick={() => setProceeded(true)}
              className="w-full text-xs text-red-400 py-2 bg-transparent border-none cursor-pointer"
            >
              I understand the risk, proceed anyway (not recommended)
            </button>
          </div>
        </div>
      )}

      {scenario === "interstitial" && proceeded && (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-red-300 p-6">
          <div className="bg-red-600 text-white text-xs font-mono px-3 py-1.5 rounded mb-4 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            WARNING: You are viewing a potentially dangerous site
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
            <div className="h-3 bg-gray-200 rounded w-full mb-2" />
            <div className="h-8 bg-gray-200 rounded w-full mb-2" />
            <div className="h-8 bg-gray-200 rounded w-full mb-2" />
            <div className="h-10 bg-red-200 rounded w-full" />
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4 text-xs text-amber-800">
            <strong>UX note:</strong> The persistent red banner ensures the user never forgets this is a flagged site. The page content is rendered but all form submissions should be blocked.
          </div>
        </div>
      )}

      {/* Email phishing indicators */}
      {scenario === "email" && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Warning banner */}
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-800">This message looks suspicious</p>
              <p className="text-xs text-amber-700 mt-1">
                This email claims to be from Example Corp but was sent from <strong>noreply@examp1e-corp.biz</strong> — a domain not associated with Example Corp.
              </p>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setReported(true)}
                  disabled={reported}
                  className="text-xs font-medium text-amber-800 bg-amber-200 px-3 py-1 rounded border-none cursor-pointer hover:bg-amber-300 disabled:opacity-50"
                >
                  {reported ? "Reported ✓" : "Report phishing"}
                </button>
                <button className="text-xs text-amber-600 bg-transparent border-none cursor-pointer">
                  Not phishing
                </button>
              </div>
            </div>
          </div>

          {/* Email content with annotations */}
          <div className="p-6 text-sm text-gray-700 space-y-3">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>From: "Example Corp Security" &lt;noreply@examp1e-corp.biz&gt;</span>
              <span className="bg-red-100 text-red-600 px-1.5 py-0.5 rounded text-xs font-mono">SUSPICIOUS DOMAIN</span>
            </div>

            <p>Dear Valued Customer,</p>
            <p>We have detected unusual activity on your account. Please verify your identity immediately to avoid account suspension.</p>

            <div className="relative">
              <a href="#" onClick={e => e.preventDefault()} className="inline-flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium no-underline">
                Verify Now <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded font-mono">
                BLOCKED
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mt-4">
              <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> Phishing indicators detected:</h4>
              <ul className="text-xs text-gray-600 space-y-1.5">
                <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" /> Sender domain doesn't match claimed organization</li>
                <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" /> Creates false urgency ("account suspension")</li>
                <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" /> Generic greeting ("Dear Valued Customer")</li>
                <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" /> Link URL doesn't match button text</li>
                <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" /> No DKIM signature</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Suspicious link preview */}
      {scenario === "link" && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Link safety check</h3>

          <div className="space-y-3">
            {/* Safe link */}
            <div className="border border-green-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-800">Safe</span>
              </div>
              <p className="text-xs font-mono text-gray-600 mb-1">https://example.com/account/settings</p>
              <p className="text-xs text-green-600">Domain verified • HTTPS • Known organization</p>
            </div>

            {/* Suspicious link */}
            <div className="border border-amber-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-amber-800">Suspicious</span>
              </div>
              <p className="text-xs font-mono text-gray-600 mb-1">
                https://examp<span className="text-red-600 font-bold">1</span>e.com/login?redirect=...
              </p>
              <p className="text-xs text-amber-600">Lookalike domain • Registered 3 days ago • Contains redirect parameter</p>
            </div>

            {/* Dangerous link */}
            <div className="border border-red-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-800">Dangerous</span>
              </div>
              <p className="text-xs font-mono text-gray-600 mb-1">http://192.168.1.100/login.php</p>
              <p className="text-xs text-red-600">Raw IP address • No HTTPS • Known phishing page</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4 text-xs text-blue-800">
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
