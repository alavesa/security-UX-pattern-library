import { useState, useEffect, useCallback, useRef } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Timer, AlertTriangle } from "lucide-react";

const TIMEOUT_SECONDS = 15;
const WARNING_AT = 10;

function SessionTimeoutDemo() {
  const [secondsLeft, setSecondsLeft] = useState(TIMEOUT_SECONDS);
  const [phase, setPhase] = useState<"active" | "warning" | "expired">("active");
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (secondsLeft <= 0) {
      setPhase("expired");
      return;
    }

    const timer = setTimeout(() => {
      const next = secondsLeft - 1;
      setSecondsLeft(next);
      if (next <= WARNING_AT && phase === "active") {
        setPhase("warning");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft, running, phase]);

  const extend = useCallback(() => {
    setSecondsLeft(TIMEOUT_SECONDS);
    setPhase("active");
  }, []);

  const stayBtnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (phase === "warning") stayBtnRef.current?.focus();
  }, [phase]);

  const start = useCallback(() => {
    setSecondsLeft(TIMEOUT_SECONDS);
    setPhase("active");
    setRunning(true);
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    setSecondsLeft(TIMEOUT_SECONDS);
    setPhase("active");
  }, []);

  const phaseColor = phase === "active" ? "var(--green)" : phase === "warning" ? "var(--amber)" : "var(--red)";
  const phaseBg = phase === "active" ? "rgba(0,255,65,0.15)" : phase === "warning" ? "rgba(255,170,0,0.15)" : "rgba(255,51,51,0.15)";

  if (!running) {
    return (
      <div className="text-center">
        <p className="text-sm font-mono mb-4" style={{ color: "var(--text)" }}>Demo: {TIMEOUT_SECONDS}s session with warning at {WARNING_AT}s remaining</p>
        <button type="button" onClick={start} className="px-6 py-2.5 rounded-lg font-medium font-mono text-sm border-none cursor-pointer" style={{ background: "var(--green)", color: "var(--bg)" }}>
          Start session timer
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {/* Active session indicator */}
      <div className="rounded-2xl p-6 mb-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium font-mono" style={{ color: "var(--text-bright)" }}>Session Status</span>
          <span className="text-xs font-medium font-mono px-2.5 py-1 rounded-full" style={{ background: phaseBg, color: phaseColor }}>
            {phase === "active" ? "Active" : phase === "warning" ? "Expiring" : "Expired"}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: "var(--border)" }}>
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${(secondsLeft / TIMEOUT_SECONDS) * 100}%`, background: phaseColor }}
          />
        </div>
        <p className="text-xs font-mono text-right" style={{ color: phaseColor }}>{secondsLeft}s remaining</p>
      </div>

      {/* Warning modal */}
      {phase === "warning" && (
        <div className="rounded-2xl p-6 text-center" role="alertdialog" aria-label="Session expiring" style={{ background: "rgba(255,170,0,0.08)", border: "2px solid rgba(255,170,0,0.3)" }}>
          <AlertTriangle className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--amber)" }} />
          <h3 className="font-bold font-mono mb-1" style={{ color: "var(--amber)" }}>Session expiring</h3>
          <p className="text-sm font-mono mb-1" style={{ color: "var(--text-bright)" }}>Your session will expire in <strong style={{ color: "var(--amber)" }}>{secondsLeft} seconds</strong>.</p>
          <span className="sr-only" aria-live="polite" aria-atomic="true">{(secondsLeft % 5 === 0 || secondsLeft <= 5) ? `${secondsLeft} seconds remaining` : ""}</span>
          <p className="text-xs font-mono mb-4" style={{ color: "var(--text)" }}>Any unsaved changes will be preserved.</p>
          <div className="flex gap-3 justify-center">
            <button type="button" ref={stayBtnRef} onClick={extend} className="px-5 py-2 rounded-lg text-sm font-medium font-mono border-none cursor-pointer" style={{ background: "var(--green)", color: "var(--bg)" }}>
              Stay signed in
            </button>
            <button type="button" onClick={() => { setPhase("expired"); setSecondsLeft(0); }} className="px-5 py-2 rounded-lg text-sm font-medium font-mono cursor-pointer" style={{ background: "transparent", color: "var(--text)", border: "1px solid var(--border)" }}>
              Sign out
            </button>
          </div>
        </div>
      )}

      {/* Expired */}
      {phase === "expired" && (
        <div className="rounded-2xl p-6 text-center" role="alert" style={{ background: "rgba(255,51,51,0.08)", border: "2px solid rgba(255,51,51,0.3)" }}>
          <Timer className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--red)" }} />
          <h3 className="font-bold font-mono mb-1" style={{ color: "var(--red)" }}>Session expired</h3>
          <p className="text-sm font-mono mb-4" style={{ color: "var(--text)" }}>You've been signed out for your security. Your work has been auto-saved.</p>
          <button type="button" onClick={reset} className="px-5 py-2 rounded-lg text-sm font-medium font-mono border-none cursor-pointer" style={{ background: "var(--green)", color: "var(--bg)" }}>
            Sign in again
          </button>
        </div>
      )}

      <button type="button" onClick={reset} className="mt-4 text-xs font-mono mx-auto block bg-transparent border-none cursor-pointer" style={{ color: "var(--text-dim)" }}>
        Reset demo
      </button>
    </div>
  );
}

export function SessionTimeoutPattern() {
  return (
    <div>
      <PatternHeader
        title="Session Timeout"
        description="Graceful session timeout with advance warning, one-click extension, and auto-save. Protects against session hijacking while respecting the user's workflow."
        severity="medium"
        tags={["Session Management", "OWASP A07", "CWE-613"]}
      />

      <DemoContainer label="Interactive Demo (15s session)">
        <SessionTimeoutDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Show a warning dialog 2-5 minutes before session expires",
          "Offer a 'Stay signed in' button that extends the session with one click",
          "Auto-save user work before the session expires",
          "Show a clear 'Session expired' state with a sign-in button",
          "Use a visual countdown (progress bar or timer) so users can gauge urgency",
          "Allow configurable timeout durations based on data sensitivity",
        ]}
        donts={[
          "Don't expire sessions silently — users lose work and trust",
          "Don't redirect to a login page without explaining why",
          "Don't use very short timeouts (< 15 min) for non-sensitive applications",
          "Don't reset the timer on any mouse movement — use meaningful activity detection",
          "Don't show the timeout warning as a browser alert() — it's jarring and blocks the page",
          "Don't forget to clear sensitive data from memory on session expiry",
        ]}
        securityRationale="Idle session timeout (CWE-613) is critical for shared/public devices. An unattended authenticated session is a direct path to account takeover. OWASP recommends 15-30 minute idle timeout for standard applications, 5 minutes for sensitive operations. The UX challenge: timeout too aggressively and users are frustrated; too leniently and you create a security gap. The warning dialog is the bridge."
        accessibilityNotes={[
          "Warning dialog uses role='alertdialog' for screen reader announcement",
          "Expired state uses role='alert' for immediate notification",
          "Focus is managed — warning dialog captures focus when it appears",
          "Countdown is visual + text — not just an animated bar",
          "'Stay signed in' button is the first focusable element in the warning",
        ]}
      />
    </div>
  );
}
