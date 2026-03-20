import { useState, useEffect, useCallback } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Timer, AlertTriangle } from "lucide-react";

function SessionTimeoutDemo() {
  const TIMEOUT_SECONDS = 15;
  const WARNING_AT = 10;

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
      if (next <= (TIMEOUT_SECONDS - WARNING_AT) && phase === "active") {
        setPhase("warning");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft, running, phase]);

  const extend = useCallback(() => {
    setSecondsLeft(TIMEOUT_SECONDS);
    setPhase("active");
  }, []);

  const start = () => {
    setSecondsLeft(TIMEOUT_SECONDS);
    setPhase("active");
    setRunning(true);
  };

  const reset = () => {
    setRunning(false);
    setSecondsLeft(TIMEOUT_SECONDS);
    setPhase("active");
  };

  if (!running) {
    return (
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-4">Demo: {TIMEOUT_SECONDS}s session with warning at {WARNING_AT}s remaining</p>
        <button onClick={start} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors border-none cursor-pointer">
          Start session timer
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {/* Active session indicator */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">Session Status</span>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            phase === "active" ? "bg-green-100 text-green-700" :
            phase === "warning" ? "bg-amber-100 text-amber-700" :
            "bg-red-100 text-red-700"
          }`}>
            {phase === "active" ? "Active" : phase === "warning" ? "Expiring" : "Expired"}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              phase === "active" ? "bg-green-500" : phase === "warning" ? "bg-amber-500" : "bg-red-500"
            }`}
            style={{ width: `${(secondsLeft / TIMEOUT_SECONDS) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 text-right">{secondsLeft}s remaining</p>
      </div>

      {/* Warning modal */}
      {phase === "warning" && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center" role="alertdialog" aria-label="Session expiring">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h3 className="font-bold text-gray-900 mb-1">Session expiring</h3>
          <p className="text-sm text-gray-600 mb-1">Your session will expire in <strong>{secondsLeft} seconds</strong>.</p>
          <p className="text-xs text-gray-400 mb-4">Any unsaved changes will be preserved.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={extend} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors border-none cursor-pointer">
              Stay signed in
            </button>
            <button onClick={() => { setPhase("expired"); setSecondsLeft(0); }} className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors bg-white cursor-pointer">
              Sign out
            </button>
          </div>
        </div>
      )}

      {/* Expired */}
      {phase === "expired" && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center" role="alert">
          <Timer className="w-10 h-10 text-red-400 mx-auto mb-3" />
          <h3 className="font-bold text-gray-900 mb-1">Session expired</h3>
          <p className="text-sm text-gray-600 mb-4">You've been signed out for your security. Your work has been auto-saved.</p>
          <button onClick={reset} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors border-none cursor-pointer">
            Sign in again
          </button>
        </div>
      )}

      <button onClick={reset} className="mt-4 text-xs text-gray-400 hover:text-gray-600 mx-auto block bg-transparent border-none cursor-pointer">
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
