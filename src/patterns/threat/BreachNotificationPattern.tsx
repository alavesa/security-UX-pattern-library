import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { ShieldAlert, ChevronDown, ChevronUp, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const INCIDENT = {
  date: "March 15, 2026",
  reference: "INC-2026-0315",
  gdprRef: "DPA-FI-2026-0412",
};

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
            type="button"
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
        <div className="rounded-2xl border overflow-hidden">
          {!dismissed && (
            <div className="text-white px-4 py-3" role="alert" aria-live="assertive" aria-atomic="true">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">Security Alert: Data Breach Detected</p>
                  <p className="text-xs mt-1 text-red-100">
                    We detected unauthorized access to our systems on {INCIDENT.date}. Your account may be affected.
                  </p>
                  <div className="flex gap-3 mt-2">
                    <button type="button" onClick={() => setExpanded(true)} className="text-xs font-medium underline bg-transparent border-none text-white cursor-pointer">
                      Learn more & secure your account
                    </button>
                    <button type="button" onClick={() => setDismissed(true)} className="text-xs text-red-200 bg-transparent border-none cursor-pointer">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* App content below */}
          <div className="p-6">
            <div className="flex justify-end mb-2">
              <div className="relative">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm" title="Settings">⚙</div>
                {dismissed && (
                  <span
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
                    role="status"
                    aria-label="1 security alert pending"
                  />
                )}
              </div>
            </div>
            <div className="h-4 rounded w-3/4 mb-3" />
            <div className="h-3 rounded w-full mb-2" />
            <div className="h-3 rounded w-5/6 mb-4" />
            <div className="h-8 rounded w-32" />
          </div>

          {dismissed && (
            <div className="px-6 pb-4">
              <div className="border rounded-lg p-3 text-xs">
                <strong>UX note:</strong> The banner was dismissed but the security issue persists. The red badge on the settings icon above demonstrates the correct pattern — a persistent, less intrusive indicator that keeps the alert discoverable so the user can return to it.
              </div>
            </div>
          )}
        </div>
      )}

      {/* Full page notification */}
      {scenario === "fullpage" && (
        <div className="rounded-2xl border p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold mb-2">Your account may be compromised</h2>
            <p className="text-sm">
              On {INCIDENT.date}, we detected unauthorized access to our systems. Based on our investigation, the following data may have been exposed:
            </p>
          </div>

          {/* What was exposed */}
          <div className="border rounded-lg p-4 mb-4">
            <h3 className="text-sm font-semibold mb-2">Data potentially exposed:</h3>
            <ul className="text-sm space-y-1">
              <li className="flex items-center gap-2"><span >*</span> Email address</li>
              <li className="flex items-center gap-2"><span >*</span> Hashed password (bcrypt)</li>
              <li className="flex items-center gap-2"><span >*</span> Display name</li>
            </ul>
            <p className="text-xs mt-2">Payment data and SSN were NOT affected.</p>
          </div>

          {/* What wasn't exposed */}
          <div className="border rounded-lg p-4 mb-4">
            <h3 className="text-sm font-semibold mb-2">Data NOT exposed:</h3>
            <ul className="text-sm space-y-1">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Payment information</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Social security numbers</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Physical addresses</li>
            </ul>
          </div>

          {/* Timeline */}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-controls="timeline-content"
            className="flex items-center justify-between w-full text-left text-sm font-medium py-2 bg-transparent border-none cursor-pointer"
          >
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Incident timeline</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {expanded && (
            <div id="timeline-content" className="border-l-2 ml-2 pl-4 pb-2 space-y-3 text-xs">
              <div><strong >Mar 15, 14:32 UTC</strong> — Unauthorized access detected</div>
              <div><strong >Mar 15, 14:45 UTC</strong> — Access revoked, investigation started</div>
              <div><strong >Mar 16, 09:00 UTC</strong> — Affected accounts identified</div>
              <div><strong >Mar 16, 12:00 UTC</strong> — Users notified (this message)</div>
              <div><strong >Mar 17, ongoing</strong> — Forensic investigation with external partner</div>
            </div>
          )}

          {/* Action checklist */}
          <div className="border rounded-lg p-4 mt-4">
            <h3 className="text-sm font-semibold mb-3">Secure your account:</h3>
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
                    className="w-4 h-4 rounded"
                  />
                  <span className={`text-sm ${checklist[key] ? " line-through" : ""}`}>{label}</span>
                </label>
              ))}
            </div>
            {allDone && (
              <div className="flex items-center gap-2 mt-3 text-sm">
                <CheckCircle2 className="w-4 h-4" /> You've reviewed all recommended steps. Make sure you've completed each action in the app.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Email notification */}
      {scenario === "email" && (
        <div className="rounded-2xl border overflow-hidden">
          {/* Email header */}
          <div className="border-b px-6 py-4">
            <div className="text-xs mb-1">From: security@example.com</div>
            <div className="text-xs mb-2">To: you@email.com</div>
            <div className="text-sm font-semibold">
              <AlertTriangle className="w-4 h-4 inline mr-1" />
              Important: Security incident affecting your account
            </div>
          </div>

          <div className="p-6 text-sm space-y-4">
            <p>Hi there,</p>

            <p>We're writing to inform you of a security incident that may affect your account. We take this seriously and want to be transparent about what happened.</p>

            <div className="border-l-4 p-4">
              <p className="font-semibold">What happened</p>
              <p className="text-xs mt-1">On {INCIDENT.date}, we detected unauthorized access to a database containing user email addresses and hashed passwords.</p>
            </div>

            <div className="border-l-4 p-4">
              <p className="font-semibold">What we're doing</p>
              <p className="text-xs mt-1">We've engaged an external cybersecurity firm, reset all sessions, and reported to relevant authorities (GDPR Article 33 notification filed).</p>
            </div>

            <div className="border-l-4 p-4">
              <p className="font-semibold">What you should do</p>
              <ol className="text-xs mt-1 list-decimal list-inside space-y-1">
                <li>Change your password immediately</li>
                <li>Enable two-factor authentication</li>
                <li>Change this password on any other site where you reused it</li>
              </ol>
            </div>

            <button type="button" className="inline-flex items-center gap-1 text-white px-4 py-2 rounded-lg text-sm font-medium border-none cursor-pointer">
              Secure My Account
            </button>

            <p className="text-xs">
              If you didn't request this email, it's still legitimate. Do NOT click links in emails you don't trust — instead, go directly to example.com and sign in.
            </p>

            <p className="text-xs border-t pt-4">
              This email was sent by the Security Team at Example Corp.<br />
              Reference: {INCIDENT.reference} | GDPR notification ref: {INCIDENT.gdprRef}
            </p>
          </div>
        </div>
      )}

      <button type="button" onClick={reset} className="mt-4 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer" style={{ color: "var(--text)" }}>
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
