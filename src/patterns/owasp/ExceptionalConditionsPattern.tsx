import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Shield, ShieldOff, AlertTriangle, Bug, Lock, Unlock, RotateCcw, CheckCircle2, Copy, Zap } from "lucide-react";

type Scenario = "message" | "failopen" | "transaction";

const SCENARIOS: { id: Scenario; label: string; trigger: string }[] = [
  { id: "message", label: "Error message", trigger: "Search for: ' OR 1=1 --" },
  { id: "failopen", label: "Fail open", trigger: "Open admin panel (auth service down)" },
  { id: "transaction", label: "Interrupted transfer", trigger: "Send €500 (connection drops)" },
];

function ExceptionalConditionsDemo() {
  const [scenario, setScenario] = useState<Scenario>("message");
  const [view, setView] = useState<"insecure" | "secure">("insecure");
  const [triggered, setTriggered] = useState(false);
  const [retried, setRetried] = useState(false);
  const [copied, setCopied] = useState(false);

  const reset = () => {
    setTriggered(false);
    setRetried(false);
    setCopied(false);
  };

  const secure = view === "secure";
  const current = SCENARIOS.find((s) => s.id === scenario)!;

  return (
    <div className="w-full max-w-lg">
      {/* Scenario tabs */}
      <div className="flex gap-1 mb-2 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {SCENARIOS.map((s) => (
          <button type="button" key={s.id} onClick={() => { setScenario(s.id); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: scenario === s.id ? "var(--amber-glow)" : "transparent", color: scenario === s.id ? "var(--amber)" : "var(--text)" }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Insecure / secure toggle */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <button type="button" onClick={() => { setView("insecure"); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: !secure ? "rgba(255,51,51,0.15)" : "transparent", color: !secure ? "var(--red)" : "var(--text)" }}>
          <ShieldOff className="w-3.5 h-3.5 inline mr-1" aria-hidden="true" /> Mishandled
        </button>
        <button type="button" onClick={() => { setView("secure"); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: secure ? "var(--green-glow)" : "transparent", color: secure ? "var(--green)" : "var(--text)" }}>
          <Shield className="w-3.5 h-3.5 inline mr-1" aria-hidden="true" /> Fails safely
        </button>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", border: `2px solid ${secure ? "var(--green-border)" : "rgba(255,51,51,0.3)"}` }}>
        <div className="px-4 py-3 flex items-center justify-between gap-2" style={{ borderBottom: "1px solid var(--border)" }}>
          <p className="text-sm font-mono" style={{ color: "var(--text-bright)" }}>
            {scenario === "message" ? "Order search" : scenario === "failopen" ? "Admin panel" : "Send money"}
          </p>
          <button type="button" onClick={() => setTriggered(true)} disabled={triggered} className="text-xs font-mono px-3 py-1.5 rounded border-none cursor-pointer disabled:opacity-40 flex items-center gap-1" style={{ background: "var(--amber)", color: "var(--bg)" }}>
            <Zap className="w-3 h-3" aria-hidden="true" /> {current.trigger}
          </button>
        </div>

        <div className="p-4 min-h-[180px]" style={{ background: "var(--bg)" }}>
          {!triggered && (
            <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>Trigger the failure to see how the interface responds.</p>
          )}

          {/* ---------- Error message ---------- */}
          {triggered && scenario === "message" && !secure && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Bug className="w-4 h-4" style={{ color: "var(--red)" }} aria-hidden="true" />
                <p className="text-sm font-mono font-semibold" style={{ color: "var(--red)" }}>500 Internal Server Error</p>
              </div>
              <pre className="text-[11px] font-mono p-3 rounded overflow-x-auto whitespace-pre-wrap break-all" style={{ background: "var(--bg-card)", color: "var(--text)", border: "1px solid rgba(255,51,51,0.3)" }}>{`PG::SyntaxError: unterminated quoted string at or near "'"
  SELECT * FROM orders_prod.customer_orders
  WHERE email = '' OR 1=1 --'
  at /srv/app/releases/412/models/order.rb:88
  pg 14.9 on db-primary-02.internal:5432 (user: app_rw)
  Rails 7.0.4 · Ruby 3.1.2`}</pre>
            </div>
          )}
          {triggered && scenario === "message" && secure && (
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--amber)" }} aria-hidden="true" />
                <div>
                  <p className="text-sm font-mono font-semibold" style={{ color: "var(--text-bright)" }}>We couldn't run that search</p>
                  <p className="text-xs font-mono mt-1" style={{ color: "var(--text)" }}>Nothing was changed. Check the search text and try again, or contact support with the reference below.</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 p-2 rounded" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <span className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>Reference <span style={{ color: "var(--text-bright)" }}>ERR-7F3K-20QX</span></span>
                <button type="button" onClick={() => setCopied(true)} className="text-xs font-mono px-2 py-1 rounded cursor-pointer flex items-center gap-1" style={{ background: "transparent", color: copied ? "var(--green)" : "var(--text)", border: "1px solid var(--border)" }}>
                  <Copy className="w-3 h-3" aria-hidden="true" /> {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="text-[11px] font-mono" style={{ color: "var(--text-dim)" }}>Server log (not shown to the user): full stack trace, query, user and IP stored under ERR-7F3K-20QX · 4th malformed query from this session → alert raised</p>
            </div>
          )}

          {/* ---------- Fail open ---------- */}
          {triggered && scenario === "failopen" && !secure && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Unlock className="w-4 h-4" style={{ color: "var(--red)" }} aria-hidden="true" />
                <p className="text-sm font-mono font-semibold" style={{ color: "var(--red)" }}>Admin panel — signed in as guest</p>
              </div>
              <p className="text-[11px] font-mono" style={{ color: "var(--text-dim)" }}>permission check timed out after 3000 ms → continuing</p>
              {["Export all customers (CSV)", "Reset any user's password", "Disable audit logging"].map((a) => (
                <div key={a} className="text-xs font-mono px-3 py-2 rounded" style={{ background: "var(--bg-card)", color: "var(--text-bright)", border: "1px solid rgba(255,51,51,0.3)" }}>{a}</div>
              ))}
            </div>
          )}
          {triggered && scenario === "failopen" && secure && (
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Lock className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--green)" }} aria-hidden="true" />
                <div>
                  <p className="text-sm font-mono font-semibold" style={{ color: "var(--text-bright)" }}>We can't confirm your access right now</p>
                  <p className="text-xs font-mono mt-1" style={{ color: "var(--text)" }}>The admin panel stays locked until your permissions can be checked. This is on our side, not a problem with your account.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setRetried(true)} className="text-xs font-mono px-3 py-1.5 rounded border-none cursor-pointer flex items-center gap-1" style={{ background: "var(--green)", color: "var(--bg)" }}>
                  <RotateCcw className="w-3 h-3" aria-hidden="true" /> Try again
                </button>
                <span className="text-xs font-mono px-3 py-1.5 rounded" style={{ color: "var(--text)", border: "1px solid var(--border)" }}>Status page</span>
              </div>
              {retried && <p className="text-xs font-mono" style={{ color: "var(--amber)" }}>Still unavailable. Next automatic check in 30 s — you can keep using the read-only dashboard.</p>}
            </div>
          )}

          {/* ---------- Interrupted transaction ---------- */}
          {triggered && scenario === "transaction" && !secure && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" style={{ color: "var(--red)" }} aria-hidden="true" />
                <p className="text-sm font-mono font-semibold" style={{ color: "var(--red)" }}>Something went wrong. Please try again.</p>
              </div>
              <button type="button" onClick={() => setRetried(true)} className="text-xs font-mono px-3 py-1.5 rounded border-none cursor-pointer" style={{ background: "var(--red)", color: "var(--bg)" }}>Try again</button>
              <div className="text-xs font-mono p-3 rounded space-y-1" style={{ background: "var(--bg-card)", border: "1px solid rgba(255,51,51,0.3)" }}>
                <p style={{ color: "var(--text-dim)" }}>Account balance</p>
                <p style={{ color: "var(--text-bright)" }}>€{retried ? "1,000.00" : "1,500.00"} <span style={{ color: "var(--red)" }}>(was €2,000.00)</span></p>
                <p style={{ color: "var(--red)" }}>{retried ? "Debited twice. The recipient received €500 once." : "Debited €500. Was it sent? The screen doesn't say."}</p>
              </div>
            </div>
          )}
          {triggered && scenario === "transaction" && secure && (
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <RotateCcw className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--amber)" }} aria-hidden="true" />
                <div>
                  <p className="text-sm font-mono font-semibold" style={{ color: "var(--text-bright)" }}>Transfer not sent — no money has left your account</p>
                  <p className="text-xs font-mono mt-1" style={{ color: "var(--text)" }}>The connection dropped before the transfer finished, so we cancelled all of it.</p>
                </div>
              </div>
              <div className="text-xs font-mono p-3 rounded space-y-1" style={{ background: "var(--bg-card)", border: "1px solid var(--green-border)" }}>
                <p style={{ color: "var(--text-dim)" }}>Account balance</p>
                <p style={{ color: "var(--text-bright)" }}>€{retried ? "1,500.00" : "2,000.00"} {!retried && <span style={{ color: "var(--green)" }}>(unchanged)</span>}</p>
              </div>
              {retried ? (
                <p className="text-xs font-mono flex items-center gap-1" style={{ color: "var(--green)" }}><CheckCircle2 className="w-3 h-3" aria-hidden="true" /> €500 sent once. Receipt TX-88412.</p>
              ) : (
                <button type="button" onClick={() => setRetried(true)} className="text-xs font-mono px-3 py-1.5 rounded border-none cursor-pointer" style={{ background: "var(--green)", color: "var(--bg)" }}>Send €500 again (safe to retry)</button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Explanation */}
      {triggered && (
        <div className="mt-4 p-3 rounded-lg text-xs space-y-1" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <p className="font-mono" style={{ color: secure ? "var(--green)" : "var(--red)" }}>{secure ? "What's right:" : "What's wrong:"}</p>
          {(secure
            ? {
                message: ["The user learns three things: what failed, that nothing changed, what to do next", "A reference ID links the screen to the full server-side log — support can find it, attackers learn nothing", "Repeated malformed input is counted and raises an alert (A09)"],
                failopen: ["When the permission check cannot complete, the answer is no — the panel fails closed", "The message says the fault is on the service side, so the user doesn't start resetting passwords", "Retry is available and a read-only fallback keeps legitimate work going"],
                transaction: ["The whole transfer was rolled back, and the screen states the resulting state in plain words", "The balance is shown so the user can verify it instead of trusting the message", "Retry is explicitly marked safe — the request carries an idempotency key, so it cannot send twice"],
              }
            : {
                message: ["Table name, query, file path, database host, account name and framework versions — a map for the next injection attempt (CWE-209)", "The user gets nothing they can act on", "Nothing suggests anyone was alerted"],
                failopen: ["The permission check timed out and the code carried on — a guest now holds admin actions (CWE-636)", "An attacker only needs to slow the auth service down to get in", "The UI shows no sign that anything failed"],
                transaction: ["The debit happened, the credit didn't, and nothing was rolled back", "'Try again' on an unknown state invites a double charge — press it and see", "The message doesn't say whether money moved, which is the only thing the user needs to know"],
              })[scenario].map((line) => (
            <p key={line} className="font-mono" style={{ color: "var(--text)" }}>{line}</p>
          ))}
        </div>
      )}

      <button type="button" onClick={reset} className="mt-2 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer font-mono" style={{ color: "var(--text)" }}>Reset demo</button>
    </div>
  );
}

export function ExceptionalConditionsPattern() {
  return (
    <div>
      <PatternHeader
        title="A10: Mishandling of Exceptional Conditions"
        description="What an interface does when something breaks is a security decision. New in the OWASP Top 10:2025, A10 covers leaky error messages, checks that fail open, and transactions left half-done. This pattern shows three failures and the error states that keep them safe: say what happened, say what state things are in, say what to do next — and reveal nothing else."
        severity="high"
        tags={["OWASP A10:2025", "CWE-209", "CWE-636", "CWE-754", "Error States"]}
      />

      <DemoContainer label="Error states (3 failures × mishandled vs fails safely)">
        <ExceptionalConditionsDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Design every error state around three answers: what failed, what state your data is in now, what to do next",
          "Show a short reference ID the user can copy; keep the stack trace, query and host names in the server log under that ID",
          "Fail closed: if a permission, payment or validation check cannot complete, treat it as denied",
          "Say when the fault is on the service side, so users don't change passwords or re-enter card details for nothing",
          "Roll back the whole operation when any step fails, then state the resulting state explicitly ('no money has left your account')",
          "Show the verifiable fact next to the message — the balance, the saved draft, the order status",
          "Make retries idempotent and say so ('safe to retry'); disable the button while a request is in flight",
          "Offer a degraded but safe mode (read-only, cached data) instead of a dead end",
          "Count repeated errors per session and alert on patterns — error probing is reconnaissance",
          "Use one global error boundary and one error component, so no screen ships a raw exception by accident",
        ]}
        donts={[
          "Don't show stack traces, SQL, file paths, internal host names or framework versions to users",
          "Don't let a timeout or exception in an access check fall through to 'allowed'",
          "Don't write 'Something went wrong' with no state and no next step",
          "Don't offer 'Try again' when you don't know whether the first attempt went through",
          "Don't return different errors for 'user not found' and 'wrong password' — that is enumeration, not helpfulness",
          "Don't blame the user for a server fault ('Invalid request') or hide a server fault as a user error",
          "Don't swallow errors silently and render an empty or stale screen as if it were current",
          "Don't put secrets, tokens or personal data in error text, URLs or client-side logs",
        ]}
        securityRationale="OWASP added A10 Mishandling of Exceptional Conditions to the Top 10 in the 2025 edition, mapping 24 CWEs including CWE-209 (error messages containing sensitive information), CWE-234 (missing parameter), CWE-274 (insufficient privileges), CWE-476 (NULL dereference) and CWE-636 (not failing securely, 'failing open'). OWASP's own scenarios are the three in this demo: verbose database errors used to refine SQL injection, resources or checks left in an undefined state after an exception, and a multi-step financial transaction interrupted without a full rollback so that an account is drained or a payment repeats. The prevention list is as much UX as code: return understandable messages to users, log and alert, use a global exception handler, roll back the entire transaction, and centralise error handling so it behaves the same everywhere. An error screen is the one moment when users and attackers both look closely at what the system says about itself; the safe design gives the user certainty about state and gives the attacker a reference number."
        accessibilityNotes={[
          "Error messages use role=alert (or aria-live=assertive for blocking errors) and move focus to the message heading",
          "Never signal an error by colour alone — pair with an icon and text (WCAG 1.4.1)",
          "Identify the error in text and suggest a fix where one is known (WCAG 3.3.1, 3.3.3)",
          "Reference IDs must be selectable text with a labelled copy button, not an image",
          "Preserve the user's input after an error; do not clear the form",
          "Automatic retries and countdowns must be announced and must not steal focus",
        ]}
      />
    </div>
  );
}
