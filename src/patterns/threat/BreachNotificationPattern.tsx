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
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          {!dismissed && (
            <div className="px-4 py-3" role="alert" aria-live="assertive" aria-atomic="true" style={{ background: "var(--red)", color: "white" }}>
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold font-mono">Security Alert: Data Breach Detected</p>
                  <p className="text-xs font-mono mt-1" style={{ color: "rgba(255,255,255,0.8)" }}>
                    We detected unauthorized access to our systems on {INCIDENT.date}. Your account may be affected.
                  </p>
                  <div className="flex gap-3 mt-2">
                    <button type="button" onClick={() => setExpanded(true)} className="text-xs font-medium font-mono underline bg-transparent border-none cursor-pointer" style={{ color: "white" }}>
                      Learn more & secure your account
                    </button>
                    <button type="button" onClick={() => setDismissed(true)} className="text-xs font-mono bg-transparent border-none cursor-pointer" style={{ color: "rgba(255,255,255,0.6)" }}>
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Simulated app content below the banner */}
          {dismissed && (
            <div className="p-6">
              <div className="flex justify-end mb-3">
                <div className="relative">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ background: "var(--bg-elevated)", color: "var(--text-dim)" }} title="Settings">⚙</div>
                  <span
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                    role="status"
                    aria-label="1 security alert pending"
                    style={{ background: "var(--red)", border: "2px solid var(--bg-card)" }}
                  />
                </div>
              </div>
              <div className="h-4 rounded w-3/4 mb-3" style={{ background: "var(--bg-elevated)" }} />
              <div className="h-3 rounded w-full mb-2" style={{ background: "var(--bg-elevated)" }} />
              <div className="h-3 rounded w-5/6 mb-4" style={{ background: "var(--bg-elevated)" }} />
              <div className="h-8 rounded w-32" style={{ background: "var(--bg-elevated)" }} />

              <div className="mt-4 rounded-lg p-3 text-xs font-mono" style={{ background: "rgba(255,170,0,0.08)", border: "1px solid rgba(255,170,0,0.2)", color: "var(--amber)" }}>
                <strong>UX note:</strong> <span style={{ color: "var(--text)" }}>The banner was dismissed but the security issue persists. The red badge on the settings icon above demonstrates the correct pattern — a persistent, less intrusive indicator that keeps the alert discoverable so the user can return to it.</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Full page notification */}
      {scenario === "fullpage" && (
        <div className="rounded-2xl p-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(255,51,51,0.15)" }}>
              <ShieldAlert className="w-8 h-8" style={{ color: "var(--red)" }} />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-bright)" }}>Your account may be compromised</h2>
            <p className="text-sm" style={{ color: "var(--text)" }}>
              On {INCIDENT.date}, we detected unauthorized access to our systems. Based on our investigation, the following data may have been exposed:
            </p>
          </div>

          {/* What was exposed */}
          <div className="rounded-lg p-4 mb-4" style={{ background: "rgba(255,51,51,0.08)", border: "1px solid rgba(255,51,51,0.2)" }}>
            <h3 className="text-sm font-semibold mb-2 font-mono" style={{ color: "var(--red)" }}>Data potentially exposed:</h3>
            <ul className="text-sm font-mono space-y-1" style={{ color: "var(--text-bright)" }}>
              <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--red)" }} /> Email address</li>
              <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--red)" }} /> Hashed password (bcrypt)</li>
              <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--red)" }} /> Display name</li>
            </ul>
            <p className="text-xs font-mono mt-2" style={{ color: "var(--text)" }}>Payment data and SSN were NOT affected.</p>
          </div>

          {/* What wasn't exposed */}
          <div className="rounded-lg p-4 mb-4" style={{ background: "rgba(0,255,65,0.05)", border: "1px solid var(--green-border)" }}>
            <h3 className="text-sm font-semibold mb-2 font-mono" style={{ color: "var(--green)" }}>Data NOT exposed:</h3>
            <ul className="text-sm font-mono space-y-1" style={{ color: "var(--text-bright)" }}>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "var(--green)" }} /> Payment information</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "var(--green)" }} /> Social security numbers</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "var(--green)" }} /> Physical addresses</li>
            </ul>
          </div>

          {/* Timeline */}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-controls="timeline-content"
            className="flex items-center justify-between w-full text-left text-sm font-medium font-mono py-2 bg-transparent border-none cursor-pointer"
            style={{ color: "var(--text-bright)" }}
          >
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" style={{ color: "var(--amber)" }} /> Incident timeline</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {expanded && (
            <div id="timeline-content" className="ml-2 pl-4 pb-2 space-y-3 text-xs font-mono" style={{ borderLeft: "2px solid var(--amber)", color: "var(--text)" }}>
              <div><strong style={{ color: "var(--text-bright)" }}>Mar 15, 14:32 UTC</strong> — Unauthorized access detected</div>
              <div><strong style={{ color: "var(--text-bright)" }}>Mar 15, 14:45 UTC</strong> — Access revoked, investigation started</div>
              <div><strong style={{ color: "var(--text-bright)" }}>Mar 16, 09:00 UTC</strong> — Affected accounts identified</div>
              <div><strong style={{ color: "var(--text-bright)" }}>Mar 16, 12:00 UTC</strong> — Users notified (this message)</div>
              <div><strong style={{ color: "var(--text-bright)" }}>Mar 17, ongoing</strong> — Forensic investigation with external partner</div>
            </div>
          )}

          {/* Action checklist */}
          <div className="rounded-lg p-4 mt-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <h3 className="text-sm font-semibold font-mono mb-3" style={{ color: "var(--text-bright)" }}>Secure your account:</h3>
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
                  <span className="text-sm font-mono" style={{ color: checklist[key] ? "var(--green)" : "var(--text-bright)", textDecoration: checklist[key] ? "line-through" : "none" }}>{label}</span>
                </label>
              ))}
            </div>
            {allDone && (
              <div className="flex items-center gap-2 mt-3 text-sm font-mono" style={{ color: "var(--green)" }}>
                <CheckCircle2 className="w-4 h-4" /> You've reviewed all recommended steps.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Email notification */}
      {scenario === "email" && (
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          {/* Email header */}
          <div className="px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="text-xs font-mono mb-1" style={{ color: "var(--text-dim)" }}>From: security@example.com</div>
            <div className="text-xs font-mono mb-2" style={{ color: "var(--text-dim)" }}>To: you@email.com</div>
            <div className="text-sm font-semibold font-mono" style={{ color: "var(--red)" }}>
              <AlertTriangle className="w-4 h-4 inline mr-1" />
              Important: Security incident affecting your account
            </div>
          </div>

          <div className="p-6 text-sm font-mono space-y-4" style={{ color: "var(--text)" }}>
            <p style={{ color: "var(--text-bright)" }}>Hi there,</p>

            <p>We're writing to inform you of a security incident that may affect your account. We take this seriously and want to be transparent about what happened.</p>

            <div className="p-4 rounded" style={{ borderLeft: "4px solid var(--red)", background: "rgba(255,51,51,0.05)" }}>
              <p className="font-semibold" style={{ color: "var(--text-bright)" }}>What happened</p>
              <p className="text-xs mt-1">On {INCIDENT.date}, we detected unauthorized access to a database containing user email addresses and hashed passwords.</p>
            </div>

            <div className="p-4 rounded" style={{ borderLeft: "4px solid var(--amber)", background: "rgba(255,170,0,0.05)" }}>
              <p className="font-semibold" style={{ color: "var(--text-bright)" }}>What we're doing</p>
              <p className="text-xs mt-1">We've engaged an external cybersecurity firm, reset all sessions, and reported to relevant authorities (GDPR Article 33 notification filed).</p>
            </div>

            <div className="p-4 rounded" style={{ borderLeft: "4px solid var(--green)", background: "rgba(0,255,65,0.05)" }}>
              <p className="font-semibold" style={{ color: "var(--text-bright)" }}>What you should do</p>
              <ol className="text-xs mt-1 list-decimal list-inside space-y-1">
                <li>Change your password immediately</li>
                <li>Enable two-factor authentication</li>
                <li>Change this password on any other site where you reused it</li>
              </ol>
            </div>

            <button type="button" className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium font-mono border-none cursor-pointer" style={{ background: "var(--green)", color: "var(--bg)" }}>
              Secure My Account
            </button>

            <p className="text-xs" style={{ color: "var(--text-dim)" }}>
              If you didn't request this email, it's still legitimate. Do NOT click links in emails you don't trust — instead, go directly to example.com and sign in.
            </p>

            <p className="text-xs pt-4" style={{ borderTop: "1px solid var(--border)", color: "var(--text-dim)" }}>
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
