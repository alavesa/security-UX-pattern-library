import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { ShieldAlert, ChevronDown, ChevronUp, ExternalLink, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

function BreachNotificationDemo() {
  const [scenario, setScenario] = useState<"banner" | "fullpage" | "email">("banner");
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [checklist, setChecklist] = useState({ password: false, mfa: false, sessions: false, monitor: false });

  const allDone = Object.values(checklist).every(Boolean);

  const reset = () => {
    setDismissed(false);
    setExpanded(false);
    setChecklist({ password: false, mfa: false, sessions: false, monitor: false });
  };

  return (
    <div className="w-full max-w-lg">
      {/* Scenario toggle */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {(["banner", "fullpage", "email"] as const).map(s => (
          <button
            key={s}
            onClick={() => { setScenario(s); reset(); }}
            className={`flex-1 text-xs py-2 rounded-md font-mono transition-colors border-none cursor-pointer ${
              scenario === s ? "font-medium" : ""
            }`}
            style={{
              background: scenario === s ? "var(--green-glow)" : "transparent",
              color: scenario === s ? "var(--green)" : "var(--text)",
            }}
          >
            {s === "banner" ? "In-App Banner" : s === "fullpage" ? "Full Page" : "Email"}
          </button>
        ))}
      </div>

      {/* Banner notification */}
      {scenario === "banner" && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {!dismissed && (
            <div className="bg-red-600 text-white px-4 py-3">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">Security Alert: Data Breach Detected</p>
                  <p className="text-xs mt-1 text-red-100">
                    We detected unauthorized access to our systems on March 15, 2026. Your account may be affected.
                  </p>
                  <div className="flex gap-3 mt-2">
                    <button onClick={() => setExpanded(true)} className="text-xs font-medium underline bg-transparent border-none text-white cursor-pointer">
                      Learn more & secure your account
                    </button>
                    <button onClick={() => setDismissed(true)} className="text-xs text-red-200 bg-transparent border-none cursor-pointer">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* App content below */}
          <div className="p-6">
            <div className="h-4 bg-gray-100 rounded w-3/4 mb-3" />
            <div className="h-3 bg-gray-100 rounded w-full mb-2" />
            <div className="h-3 bg-gray-100 rounded w-5/6 mb-4" />
            <div className="h-8 bg-gray-100 rounded w-32" />
          </div>

          {dismissed && (
            <div className="px-6 pb-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
                <strong>UX note:</strong> The banner was dismissed but the security issue persists. Show a persistent but less intrusive indicator (badge on settings icon) so the user can return to it.
              </div>
            </div>
          )}
        </div>
      )}

      {/* Full page notification */}
      {scenario === "fullpage" && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your account may be compromised</h2>
            <p className="text-sm text-gray-600">
              On March 15, 2026, we detected unauthorized access to our systems. Based on our investigation, the following data may have been exposed:
            </p>
          </div>

          {/* What was exposed */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <h3 className="text-sm font-semibold text-red-800 mb-2">Data potentially exposed:</h3>
            <ul className="text-sm text-red-700 space-y-1">
              <li className="flex items-center gap-2"><span className="text-red-400">*</span> Email address</li>
              <li className="flex items-center gap-2"><span className="text-red-400">*</span> Hashed password (bcrypt)</li>
              <li className="flex items-center gap-2"><span className="text-red-400">*</span> Display name</li>
            </ul>
            <p className="text-xs text-red-600 mt-2">Payment data and SSN were NOT affected.</p>
          </div>

          {/* What wasn't exposed */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <h3 className="text-sm font-semibold text-green-800 mb-2">Data NOT exposed:</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Payment information</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Social security numbers</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Physical addresses</li>
            </ul>
          </div>

          {/* Timeline */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 py-2 bg-transparent border-none cursor-pointer"
          >
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Incident timeline</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {expanded && (
            <div className="border-l-2 border-gray-200 ml-2 pl-4 pb-2 space-y-3 text-xs text-gray-600">
              <div><strong className="text-gray-900">Mar 15, 14:32 UTC</strong> — Unauthorized access detected</div>
              <div><strong className="text-gray-900">Mar 15, 14:45 UTC</strong> — Access revoked, investigation started</div>
              <div><strong className="text-gray-900">Mar 16, 09:00 UTC</strong> — Affected accounts identified</div>
              <div><strong className="text-gray-900">Mar 16, 12:00 UTC</strong> — Users notified (this message)</div>
              <div><strong className="text-gray-900">Mar 17, ongoing</strong> — Forensic investigation with external partner</div>
            </div>
          )}

          {/* Action checklist */}
          <div className="border border-gray-200 rounded-lg p-4 mt-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Secure your account:</h3>
            <div className="space-y-2">
              {[
                { key: "password" as const, label: "Change your password" },
                { key: "mfa" as const, label: "Enable two-factor authentication" },
                { key: "sessions" as const, label: "Review active sessions" },
                { key: "monitor" as const, label: "Monitor for suspicious activity" },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist[key]}
                    onChange={e => setChecklist(c => ({ ...c, [key]: e.target.checked }))}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className={`text-sm ${checklist[key] ? "text-gray-400 line-through" : "text-gray-700"}`}>{label}</span>
                </label>
              ))}
            </div>
            {allDone && (
              <div className="flex items-center gap-2 mt-3 text-sm text-green-600">
                <CheckCircle2 className="w-4 h-4" /> All steps completed. Your account is secured.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Email notification */}
      {scenario === "email" && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Email header */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <div className="text-xs text-gray-400 mb-1">From: security@example.com</div>
            <div className="text-xs text-gray-400 mb-2">To: you@email.com</div>
            <div className="text-sm font-semibold text-gray-900">
              <AlertTriangle className="w-4 h-4 inline text-red-500 mr-1" />
              Important: Security incident affecting your account
            </div>
          </div>

          <div className="p-6 text-sm text-gray-700 space-y-4">
            <p>Hi there,</p>

            <p>We're writing to inform you of a security incident that may affect your account. We take this seriously and want to be transparent about what happened.</p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <p className="font-semibold text-red-800">What happened</p>
              <p className="text-red-700 text-xs mt-1">On March 15, 2026, we detected unauthorized access to a database containing user email addresses and hashed passwords.</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-800">What we're doing</p>
              <p className="text-blue-700 text-xs mt-1">We've engaged an external cybersecurity firm, reset all sessions, and reported to relevant authorities (GDPR Article 33 notification filed).</p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <p className="font-semibold text-green-800">What you should do</p>
              <ol className="text-green-700 text-xs mt-1 list-decimal list-inside space-y-1">
                <li>Change your password immediately</li>
                <li>Enable two-factor authentication</li>
                <li>Change this password on any other site where you reused it</li>
              </ol>
            </div>

            <a href="#" onClick={e => e.preventDefault()} className="inline-flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium no-underline">
              Secure My Account <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <p className="text-xs text-gray-400">
              If you didn't request this email, it's still legitimate. Do NOT click links in emails you don't trust — instead, go directly to example.com and sign in.
            </p>

            <p className="text-xs text-gray-500 border-t border-gray-100 pt-4">
              This email was sent by the Security Team at Example Corp.<br />
              Reference: INC-2026-0315 | GDPR notification ref: DPA-FI-2026-0412
            </p>
          </div>
        </div>
      )}

      <button onClick={reset} className="mt-4 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer" style={{ color: "var(--text)" }}>
        Reset demo
      </button>
    </div>
  );
}

export function BreachNotificationPattern() {
  return (
    <div>
      <PatternHeader
        title="Breach Notification"
        description="How to communicate a data breach to affected users — in-app banners, full-page alerts, and email notifications. Covers GDPR Article 33/34 requirements and user-centric disclosure."
        severity="critical"
        tags={["Incident Response", "GDPR Art. 33/34", "CWE-200"]}
      />

      <DemoContainer label="breach notification (3 variants)">
        <BreachNotificationDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Notify affected users within 72 hours (GDPR Article 33 requirement)",
          "Be specific about what data was exposed AND what was NOT exposed",
          "Provide a clear timeline of events — when it happened, when you found out, what you did",
          "Give users an actionable checklist — change password, enable MFA, review sessions",
          "Use multiple channels — in-app + email + status page",
          "Include regulatory references (GDPR notification ref, DPA filing)",
          "Let users track their progress securing their account (checklist)",
          "Keep the notification accessible after dismissal (settings badge, security page)",
          "Use DKIM/SPF on notification emails to prove legitimacy",
        ]}
        donts={[
          "Don't downplay the severity — users lose trust when they learn the truth later",
          "Don't wait to notify users while you 'investigate further' beyond 72 hours",
          "Don't use vague language like 'a small number of users' without context",
          "Don't require users to log in to learn about the breach — they may be locked out",
          "Don't send breach notifications that look like phishing emails — include verification info",
          "Don't hide the notification behind a dismissible banner with no way to find it again",
          "Don't claim 'no data was accessed' unless forensic evidence confirms it",
          "Don't force password reset without explanation — tell users WHY first",
        ]}
        securityRationale="Data breach notification is legally mandated (GDPR Article 33: notify DPA within 72 hours; Article 34: notify users 'without undue delay' for high-risk breaches). Beyond compliance, transparent communication preserves user trust. The #1 factor in post-breach reputation damage isn't the breach itself — it's how the company communicates about it. The three-variant approach (banner, full-page, email) ensures users are reached regardless of their engagement pattern."
        accessibilityNotes={[
          "Banner uses high contrast (white on red) meeting WCAG AA",
          "Dismiss button doesn't remove the security issue — only the visual notification",
          "Checklist items are proper label+checkbox pairs for screen readers",
          "Timeline uses semantic structure, not just visual decoration",
          "Email version works without images or CSS (plain text fallback)",
          "Action buttons have clear text labels, not just 'Click here'",
        ]}
      />
    </div>
  );
}
