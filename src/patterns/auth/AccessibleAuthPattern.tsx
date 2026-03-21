import { useState, useEffect, useRef } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Accessibility, CheckCircle2, XCircle, AlertTriangle, Clock, Fingerprint, Mail, Shield } from "lucide-react";

type Scenario = "captcha" | "mfa" | "timeout";
type CaptchaView = "inaccessible" | "accessible";

function AccessibleAuthDemo() {
  const [scenario, setScenario] = useState<Scenario>("captcha");
  const [captchaView, setCaptchaView] = useState<CaptchaView>("inaccessible");
  const [mfaCode, setMfaCode] = useState("");
  const [mfaPasted, setMfaPasted] = useState(false);
  const [mfaVerified, setMfaVerified] = useState(false);
  const [mfaError, setMfaError] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [timeoutExtended, setTimeoutExtended] = useState(false);
  const [timeoutExpired, setTimeoutExpired] = useState(false);
  const liveRef = useRef<HTMLDivElement>(null);

  // Announce to screen readers
  const announce = (message: string) => {
    if (liveRef.current) {
      liveRef.current.textContent = message;
    }
  };

  // MFA verification
  const verifyMfa = () => {
    if (mfaCode === "482901") {
      setMfaVerified(true);
      setMfaError("");
      announce("Verification successful. You are now signed in.");
    } else {
      setMfaError("Incorrect code. Please try again.");
      announce("Error: incorrect verification code. Please try again.");
    }
  };

  // Timeout countdown
  useEffect(() => {
    if (scenario !== "timeout" || timeoutExpired) return;
    if (timeLeft <= 0) {
      setTimeoutExpired(true);
      announce("Your session has expired. Please sign in again.");
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    // Announce at key moments
    if (timeLeft === 15) announce("Warning: your session will expire in 15 seconds.");
    if (timeLeft === 5) announce("Warning: your session will expire in 5 seconds. Activate extend button to continue.");
    return () => clearTimeout(timer);
  }, [scenario, timeLeft, timeoutExpired]);

  const extendSession = () => {
    setTimeLeft(30);
    setTimeoutExtended(true);
    setTimeoutExpired(false);
    announce("Session extended by 30 seconds.");
  };

  const reset = () => {
    setCaptchaView("inaccessible");
    setMfaCode("");
    setMfaPasted(false);
    setMfaVerified(false);
    setMfaError("");
    setTimeLeft(30);
    setTimeoutExtended(false);
    setTimeoutExpired(false);
  };

  return (
    <div className="w-full max-w-lg">
      {/* Screen reader live region */}
      <div ref={liveRef} aria-live="assertive" aria-atomic="true" className="sr-only" />

      {/* Scenario tabs */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {([
          { key: "captcha" as const, label: "CAPTCHA Alt." },
          { key: "mfa" as const, label: "Screen Reader MFA" },
          { key: "timeout" as const, label: "Timed Actions" },
        ]).map(s => (
          <button key={s.key} type="button" onClick={() => { setScenario(s.key); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: scenario === s.key ? "var(--green-glow)" : "transparent", color: scenario === s.key ? "var(--green)" : "var(--text)" }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* CAPTCHA Alternatives */}
      {scenario === "captcha" && (
        <div className="space-y-4">
          {/* Toggle */}
          <div className="flex gap-2">
            {(["inaccessible", "accessible"] as const).map(v => (
              <button key={v} type="button" onClick={() => setCaptchaView(v)} className="flex-1 text-xs py-2 rounded font-mono border-none cursor-pointer" style={{ background: captchaView === v ? (v === "inaccessible" ? "rgba(255,51,51,0.15)" : "rgba(0,255,65,0.15)") : "var(--bg)", color: captchaView === v ? (v === "inaccessible" ? "var(--red)" : "var(--green)") : "var(--text)", border: `1px solid ${captchaView === v ? (v === "inaccessible" ? "rgba(255,51,51,0.3)" : "var(--green-border)") : "var(--border)"}` }}>
                {v === "inaccessible" ? "✗ Inaccessible" : "✓ Accessible"}
              </button>
            ))}
          </div>

          {captchaView === "inaccessible" && (
            <div className="p-4 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid rgba(255,51,51,0.2)" }}>
              <p className="text-xs font-mono mb-3" style={{ color: "var(--red)" }}>
                <XCircle className="w-3 h-3 inline mr-1" /> WCAG 2.2 SC 3.3.8 violation
              </p>
              {/* Fake distorted CAPTCHA */}
              <div className="p-4 rounded text-center mb-3" style={{ background: "#1a1a1a", border: "1px solid var(--border)" }}>
                <p className="text-xl sm:text-2xl font-mono" style={{ color: "var(--text-dim)", fontStyle: "italic", textDecoration: "line-through", letterSpacing: "0.2em", transform: "skewX(-10deg)" }}>
                  xK9mP2
                </p>
              </div>
              <input type="text" placeholder="Type the characters above" className="w-full px-3 py-2 rounded text-xs font-mono border-none" style={{ background: "var(--bg)", color: "var(--text)", border: "1px solid var(--border)" }} readOnly />
              <div className="mt-3 space-y-1 text-xs font-mono" style={{ color: "var(--red)" }}>
                <p><XCircle className="w-3 h-3 inline mr-1" /> Screen readers cannot read distorted text</p>
                <p><XCircle className="w-3 h-3 inline mr-1" /> No audio alternative provided</p>
                <p><XCircle className="w-3 h-3 inline mr-1" /> Cognitive function test as only auth path</p>
                <p><XCircle className="w-3 h-3 inline mr-1" /> Time-limited with no extension option</p>
              </div>
            </div>
          )}

          {captchaView === "accessible" && (
            <div className="p-4 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--green-border)" }}>
              <p className="text-xs font-mono mb-3" style={{ color: "var(--green)" }}>
                <CheckCircle2 className="w-3 h-3 inline mr-1" /> WCAG 2.2 SC 3.3.8 compliant
              </p>
              <p className="text-xs font-mono mb-4" style={{ color: "var(--text)" }}>Choose how to verify you're human:</p>

              <div className="space-y-2">
                <button type="button" className="w-full flex items-center gap-3 p-3 rounded-lg border-none cursor-pointer text-left font-mono text-xs" style={{ background: "rgba(0,255,65,0.05)", border: "1px solid var(--green-border)" }}>
                  <Fingerprint className="w-5 h-5 shrink-0" style={{ color: "var(--green)" }} />
                  <div>
                    <p style={{ color: "var(--text-bright)" }}>Sign in with passkey</p>
                    <p style={{ color: "var(--text-dim)" }}>Biometric or device PIN — no typing required</p>
                  </div>
                </button>

                <button type="button" className="w-full flex items-center gap-3 p-3 rounded-lg border-none cursor-pointer text-left font-mono text-xs" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                  <Mail className="w-5 h-5 shrink-0" style={{ color: "var(--cyan)" }} />
                  <div>
                    <p style={{ color: "var(--text-bright)" }}>Email magic link</p>
                    <p style={{ color: "var(--text-dim)" }}>We'll send a sign-in link to your email</p>
                  </div>
                </button>

                <button type="button" className="w-full flex items-center gap-3 p-3 rounded-lg border-none cursor-pointer text-left font-mono text-xs" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                  <Shield className="w-5 h-5 shrink-0" style={{ color: "var(--amber)" }} />
                  <div>
                    <p style={{ color: "var(--text-bright)" }}>Hardware security key</p>
                    <p style={{ color: "var(--text-dim)" }}>Insert your FIDO2 key and tap</p>
                  </div>
                </button>
              </div>

              <div className="mt-3 space-y-1 text-xs font-mono" style={{ color: "var(--green)" }}>
                <p><CheckCircle2 className="w-3 h-3 inline mr-1" /> No cognitive function test required</p>
                <p><CheckCircle2 className="w-3 h-3 inline mr-1" /> All options work with screen readers</p>
                <p><CheckCircle2 className="w-3 h-3 inline mr-1" /> No time pressure on any option</p>
                <p><CheckCircle2 className="w-3 h-3 inline mr-1" /> Phishing-resistant (passkey, hardware key)</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Screen Reader MFA */}
      {scenario === "mfa" && (
        <div className="p-4 rounded-lg space-y-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2">
            <Accessibility className="w-4 h-4" style={{ color: "var(--green)" }} />
            <p className="text-xs font-mono" style={{ color: "var(--text-bright)" }}>Accessible MFA verification</p>
          </div>

          <div className="p-3 rounded" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
            <p className="text-xs font-mono mb-1" style={{ color: "var(--text-dim)" }}>
              Enter the 6-digit code from your authenticator app
            </p>
            <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>
              Demo code: <span style={{ color: "var(--green)" }}>482901</span> — try pasting it
            </p>
          </div>

          {!mfaVerified ? (
            <>
              <div>
                <label htmlFor="mfa-code" className="block text-xs font-mono mb-2" style={{ color: "var(--text)" }}>
                  Verification code
                </label>
                <input
                  id="mfa-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={mfaCode}
                  onChange={e => { setMfaCode(e.target.value.replace(/\D/g, "")); setMfaError(""); }}
                  onPaste={() => setMfaPasted(true)}
                  placeholder="000000"
                  className="w-full px-3 sm:px-4 py-3 rounded text-base sm:text-lg font-mono text-center border-none"
                  style={{ background: "var(--bg)", color: "var(--text-bright)", border: `1px solid ${mfaError ? "var(--red)" : "var(--border)"}`, letterSpacing: "0.3em" }}
                  aria-describedby={mfaError ? "mfa-error" : undefined}
                  aria-invalid={mfaError ? "true" : undefined}
                />
              </div>

              {mfaPasted && (
                <p className="text-xs font-mono" style={{ color: "var(--green)" }}>
                  <CheckCircle2 className="w-3 h-3 inline mr-1" /> Paste supported — no typing required
                </p>
              )}

              {mfaError && (
                <p id="mfa-error" role="alert" className="text-xs font-mono" style={{ color: "var(--red)" }}>
                  <AlertTriangle className="w-3 h-3 inline mr-1" /> {mfaError}
                </p>
              )}

              <button type="button" onClick={verifyMfa} disabled={mfaCode.length !== 6} className="w-full py-2 rounded text-xs font-mono border-none cursor-pointer disabled:opacity-40" style={{ background: "var(--green-glow)", color: "var(--green)", border: "1px solid var(--green-border)" }}>
                Verify code
              </button>

              <div className="space-y-1 text-xs font-mono" style={{ color: "var(--text-dim)" }}>
                <p><CheckCircle2 className="w-3 h-3 inline mr-1" style={{ color: "var(--green)" }} /> <code>inputMode="numeric"</code> — mobile shows number pad</p>
                <p><CheckCircle2 className="w-3 h-3 inline mr-1" style={{ color: "var(--green)" }} /> <code>autoComplete="one-time-code"</code> — autofill from SMS</p>
                <p><CheckCircle2 className="w-3 h-3 inline mr-1" style={{ color: "var(--green)" }} /> Paste enabled — screen reader users can paste from manager</p>
                <p><CheckCircle2 className="w-3 h-3 inline mr-1" style={{ color: "var(--green)" }} /> <code>aria-invalid</code> + <code>aria-describedby</code> on error</p>
                <p><CheckCircle2 className="w-3 h-3 inline mr-1" style={{ color: "var(--green)" }} /> Error announced via <code>role="alert"</code></p>
                <p><CheckCircle2 className="w-3 h-3 inline mr-1" style={{ color: "var(--green)" }} /> No time limit on code entry</p>
              </div>
            </>
          ) : (
            <div className="p-4 rounded-lg text-center" style={{ background: "rgba(0,255,65,0.05)", border: "1px solid var(--green-border)" }}>
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--green)" }} />
              <p className="text-sm font-mono font-semibold" style={{ color: "var(--green)" }}>Verified</p>
              <p className="text-xs font-mono mt-1" style={{ color: "var(--text)" }}>
                {mfaPasted ? "Pasted and verified — zero typing required" : "Code accepted"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Timed Actions */}
      {scenario === "timeout" && (
        <div className="p-4 rounded-lg space-y-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: timeLeft <= 10 ? "var(--red)" : timeLeft <= 15 ? "var(--amber)" : "var(--green)" }} />
              <p className="text-xs font-mono" style={{ color: "var(--text-bright)" }}>Session timeout demo</p>
            </div>
            <span className="text-lg font-mono font-bold" style={{ color: timeLeft <= 10 ? "var(--red)" : timeLeft <= 15 ? "var(--amber)" : "var(--green)" }}>
              {timeoutExpired ? "0:00" : `0:${timeLeft.toString().padStart(2, "0")}`}
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${(timeLeft / 30) * 100}%`,
                background: timeLeft <= 10 ? "var(--red)" : timeLeft <= 15 ? "var(--amber)" : "var(--green)",
              }}
              role="progressbar"
              aria-valuenow={timeLeft}
              aria-valuemin={0}
              aria-valuemax={30}
              aria-label={`Session expires in ${timeLeft} seconds`}
            />
          </div>

          {!timeoutExpired ? (
            <>
              {timeLeft <= 15 && (
                <div role="alert" className="p-3 rounded-lg text-xs font-mono" style={{ background: timeLeft <= 10 ? "rgba(255,51,51,0.1)" : "rgba(255,170,0,0.1)", border: `1px solid ${timeLeft <= 10 ? "rgba(255,51,51,0.3)" : "rgba(255,170,0,0.3)"}` }}>
                  <AlertTriangle className="w-3 h-3 inline mr-1" style={{ color: timeLeft <= 10 ? "var(--red)" : "var(--amber)" }} />
                  <span style={{ color: timeLeft <= 10 ? "var(--red)" : "var(--amber)" }}>
                    Your session will expire in {timeLeft} seconds.
                  </span>
                </div>
              )}

              <button type="button" onClick={extendSession} className="w-full py-3 rounded text-xs font-mono border-none cursor-pointer" style={{ background: "var(--green-glow)", color: "var(--green)", border: "1px solid var(--green-border)" }}>
                Extend session (+30 seconds)
              </button>

              {timeoutExtended && (
                <p className="text-xs font-mono text-center" style={{ color: "var(--green)" }}>
                  <CheckCircle2 className="w-3 h-3 inline mr-1" /> Session extended
                </p>
              )}

              <div className="space-y-1 text-xs font-mono" style={{ color: "var(--text-dim)" }}>
                <p><CheckCircle2 className="w-3 h-3 inline mr-1" style={{ color: "var(--green)" }} /> Warning at 15s and 5s via <code>aria-live="assertive"</code></p>
                <p><CheckCircle2 className="w-3 h-3 inline mr-1" style={{ color: "var(--green)" }} /> Progress bar with <code>role="progressbar"</code> + aria values</p>
                <p><CheckCircle2 className="w-3 h-3 inline mr-1" style={{ color: "var(--green)" }} /> Extend button always visible and focusable</p>
                <p><CheckCircle2 className="w-3 h-3 inline mr-1" style={{ color: "var(--green)" }} /> No limit on extensions (WCAG 2.2.1)</p>
                <p><CheckCircle2 className="w-3 h-3 inline mr-1" style={{ color: "var(--green)" }} /> Warning uses color + icon + text (never color-only)</p>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <div role="alert" className="p-4 rounded-lg text-center" style={{ background: "rgba(255,51,51,0.08)", border: "1px solid rgba(255,51,51,0.2)" }}>
                <XCircle className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--red)" }} />
                <p className="text-sm font-mono font-semibold" style={{ color: "var(--red)" }}>Session Expired</p>
                <p className="text-xs font-mono mt-1" style={{ color: "var(--text)" }}>Please sign in again to continue.</p>
              </div>
              <button type="button" onClick={() => { setTimeLeft(30); setTimeoutExpired(false); }} className="w-full py-2 rounded text-xs font-mono border-none cursor-pointer" style={{ background: "var(--green-glow)", color: "var(--green)", border: "1px solid var(--green-border)" }}>
                Sign in again
              </button>
            </div>
          )}
        </div>
      )}

      <button type="button" onClick={reset} className="mt-2 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer font-mono" style={{ color: "var(--text-dim)" }}>Reset demo</button>
    </div>
  );
}

export function AccessibleAuthPattern() {
  return (
    <>
      <PatternHeader
        title="Accessible Authentication"
        description="WCAG 2.2 compliant authentication patterns. No cognitive function tests as the sole auth path, screen reader-friendly MFA, and timed actions with proper announcements and extensions."
        severity="high"
        tags={["WCAG 2.2", "SC 3.3.8", "ARIA", "a11y"]}
      />

      <DemoContainer label="Accessible Authentication (WCAG 2.2)">
        <AccessibleAuthDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Provide alternatives to CAPTCHA — passkeys, magic links, hardware keys (WCAG SC 3.3.8)",
          "Support paste in MFA code fields — screen reader users copy from password managers",
          "Use inputMode='numeric' and autoComplete='one-time-code' on MFA inputs",
          "Announce errors with role='alert' and link them with aria-describedby",
          "Use aria-invalid='true' on fields with validation errors",
          "Announce session timeout warnings via aria-live='assertive' at 15s and 5s",
          "Provide an extend button that is always visible and keyboard-focusable",
          "Allow unlimited session extensions (WCAG SC 2.2.1)",
          "Use role='progressbar' with aria-valuenow on countdown indicators",
          "Convey all status changes with text, not just color",
        ]}
        donts={[
          "Don't use distorted text CAPTCHA as the only verification method",
          "Don't block paste in password or MFA fields — this hurts all users, especially assistive tech users",
          "Don't rely on color alone to indicate errors or time pressure",
          "Don't auto-submit forms on timeout — always warn first",
          "Don't use drag-and-drop puzzles as the only auth challenge",
          "Don't require mouse interaction for any step of authentication",
          "Don't use placeholder text as the only label — it disappears on focus",
        ]}
        securityRationale="WCAG 2.2 Success Criterion 3.3.8 (Accessible Authentication, Level AA) prohibits cognitive function tests as the sole authentication mechanism. This means CAPTCHA-only flows are now a compliance failure, not just a usability issue. The accessible alternatives (passkeys, hardware keys) are also more secure — they're phishing-resistant by design. Accessible authentication and secure authentication are the same thing."
        accessibilityNotes={[
          "All demos use semantic HTML — label, input, button with proper associations",
          "Errors announced via role='alert' immediately on occurrence",
          "MFA input uses aria-invalid and aria-describedby for error state",
          "Session timeout warnings announced at 15s and 5s via aria-live='assertive'",
          "Progress bar uses role='progressbar' with aria-valuenow, aria-valuemin, aria-valuemax",
          "All interactive elements are keyboard-navigable with visible focus styles",
          "No information conveyed by color alone — always paired with text and icons",
        ]}
      />
    </>
  );
}
