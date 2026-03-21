import { useState, useEffect, useCallback } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { AlertTriangle, Shield, CheckCircle2, XCircle, Clock, Zap } from "lucide-react";

type ShutdownStep = 'idle' | 'confirm' | 'executing';

const HOLD_DURATION_MS = 3000;
const TICK_INTERVAL_MS = 50;
const INCREMENT = 100 / (HOLD_DURATION_MS / TICK_INTERVAL_MS);

function SafetyCriticalDemo() {
  const [scenario, setScenario] = useState<"shutdown" | "override" | "parameter">("shutdown");
  const [step, setStep] = useState<ShutdownStep>('idle');
  const [holdProgress, setHoldProgress] = useState(0);
  const [holdTimer, setHoldTimer] = useState<ReturnType<typeof setInterval> | null>(null);

  const reset = useCallback(() => {
    setStep('idle');
    setHoldProgress(0);
    if (holdTimer) clearInterval(holdTimer);
    setHoldTimer(null);
  }, [holdTimer]);

  const startHold = useCallback(() => {
    const timer = setInterval(() => {
      setHoldProgress(prev => {
        if (prev >= 100) return 100;
        return prev + INCREMENT;
      });
    }, TICK_INTERVAL_MS);
    setHoldTimer(timer);
  }, []);

  const stopHold = useCallback(() => {
    if (holdTimer) clearInterval(holdTimer);
    setHoldTimer(null);
    setHoldProgress(prev => prev >= 100 ? prev : 0);
  }, [holdTimer]);

  useEffect(() => {
    return () => {
      if (holdTimer) clearInterval(holdTimer);
    };
  }, [holdTimer]);

  useEffect(() => {
    if (holdProgress >= 100) {
      if (holdTimer) clearInterval(holdTimer);
      setHoldTimer(null);
      setStep('executing');
    }
  }, [holdProgress, holdTimer]);

  return (
    <div className="w-full max-w-lg">
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {(["shutdown", "override", "parameter"] as const).map(s => (
          <button key={s} onClick={() => { setScenario(s); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: scenario === s ? "var(--green-glow)" : "transparent", color: scenario === s ? "var(--green)" : "var(--text)" }}>
            {s === "shutdown" ? "Emergency Stop" : s === "override" ? "Safety Override" : "Parameter Change"}
          </button>
        ))}
      </div>

      {/* Emergency shutdown */}
      {scenario === "shutdown" && (
        <div className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
            <span className="font-mono text-xs" style={{ color: "var(--text-bright)" }}>POWER PLANT CONTROL</span>
            <span className="font-mono text-xs" style={{ color: "var(--green)" }}>● NORMAL OPERATIONS</span>
          </div>

          <div className="p-8">
            {step === 'idle' && (
              <div className="text-center">
                <h3 className="font-mono text-sm text-white mb-6">TURBINE #3 — EMERGENCY SHUTDOWN</h3>

                <div className="bg-gray-800 rounded-lg p-4 mb-6 text-left">
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    <div><span style={{ color: "var(--text-dim)" }}>Status:</span> <span style={{ color: "var(--green)" }}>Running</span></div>
                    <div><span style={{ color: "var(--text-dim)" }}>Output:</span> <span className="text-white">340 MW</span></div>
                    <div><span style={{ color: "var(--text-dim)" }}>Temp:</span> <span className="text-white">1,104°C</span></div>
                    <div><span style={{ color: "var(--text-dim)" }}>RPM:</span> <span className="text-white">3,600</span></div>
                  </div>
                </div>

                <button
                  onClick={() => setStep('confirm')}
                  className="font-mono text-lg text-white px-8 py-5 rounded-xl border-4 cursor-pointer font-bold w-full"
                  style={{ background: "#991b1b", borderColor: "var(--red)" }}
                >
                  ⚠ EMERGENCY STOP
                </button>
                <p className="font-mono text-xs mt-3" style={{ color: "var(--text-dim)" }}>Large button, high contrast, no confirmation needed for first press</p>
              </div>
            )}

            {step === 'confirm' && (
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--red)" }} />
                <h3 className="font-mono text-lg mb-2" style={{ color: "var(--red)" }}>CONFIRM EMERGENCY STOP</h3>
                <p className="font-mono text-xs mb-4" style={{ color: "var(--text)" }}>Turbine #3 — 340 MW output will be lost</p>

                <div className="bg-red-950 border border-red-700 rounded-lg p-4 mb-6 text-left">
                  <h4 className="font-mono text-xs mb-2">IMPACT:</h4>
                  <ul className="font-mono text-xs text-red-300 space-y-1">
                    <li>• Grid output reduced by 340 MW (23% of capacity)</li>
                    <li>• Cooldown sequence: ~45 minutes</li>
                    <li>• Restart time: ~4 hours minimum</li>
                    <li>• Automatic load transfer to Turbine #1 and #2</li>
                  </ul>
                </div>

                <p className="font-mono text-xs mb-4">HOLD the button for 3 seconds to confirm</p>

                <button
                  onMouseDown={startHold}
                  onMouseUp={stopHold}
                  onMouseLeave={stopHold}
                  onTouchStart={(e) => { e.preventDefault(); startHold(); }}
                  onTouchEnd={stopHold}
                  onTouchCancel={stopHold}
                  className="font-mono text-lg text-white px-8 py-5 rounded-xl border-4 border-red-400 cursor-pointer font-bold w-full relative overflow-hidden"
                  style={{ background: "#991b1b" }}
                >
                  <div className="absolute inset-0 transition-all" style={{ width: `${holdProgress}%`, background: "rgba(255,51,51,0.5)" }} />
                  <span className="relative">HOLD TO CONFIRM STOP</span>
                </button>

                <button onClick={reset} className="font-mono text-xs mt-4 bg-transparent border-none cursor-pointer" style={{ color: "var(--text-dim)" }}>
                  Cancel — return to normal operations
                </button>
              </div>
            )}

            {step === 'executing' && (
              <div className="text-center">
                <XCircle className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--red)" }} />
                <h3 className="font-mono text-lg mb-2" style={{ color: "var(--red)" }}>TURBINE #3 — STOPPING</h3>
                <div className="bg-gray-800 rounded-lg p-4 font-mono text-xs text-left space-y-2 mb-4">
                  <div style={{ color: "var(--green)" }}>▶ Fuel supply cut off</div>
                  <div style={{ color: "var(--green)" }}>▶ Generator disconnected from grid</div>
                  <div style={{ color: "var(--green)" }}>▶ Load transferred to Turbine #1, #2</div>
                  <div style={{ color: "var(--amber)" }}>○ Cooldown sequence in progress...</div>
                  <div style={{ color: "var(--text-dim)" }}>○ Supervisor notified</div>
                  <div style={{ color: "var(--text-dim)" }}>○ Incident logged: ESD-2026-0320-001</div>
                </div>

                <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-3 text-left">
                  <p className="font-mono text-xs text-blue-300"><strong>Design principle:</strong> The "hold to confirm" pattern replaces double-click or typed confirmation. In an emergency with shaking hands and high stress, holding a button for 3 seconds is more reliable than typing "SHUTDOWN" or clicking a small checkbox. The progress bar provides visual feedback that the action is being registered.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Safety override */}
      {scenario === "override" && (
        <div className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
          <div className="bg-amber-900 px-4 py-2 flex items-center justify-between border-b border-amber-700">
            <span className="font-mono text-xs text-amber-200">SAFETY SYSTEM OVERRIDE</span>
            <span className="font-mono text-xs text-amber-300">REQUIRES SUPERVISOR</span>
          </div>

          <div className="p-8">
            <div className="flex items-start gap-3 mb-4">
              <Shield className="w-8 h-8 shrink-0" style={{ color: "var(--amber)" }} />
              <div>
                <h3 className="font-mono text-sm text-white">Override: High Pressure Alarm — Vessel P-301</h3>
                <p className="font-mono text-xs mt-1" style={{ color: "var(--amber)" }}>Current pressure: <strong>42 bar</strong> (limit: 40 bar)</p>
              </div>
            </div>

            <div className="rounded-lg p-4 mb-4" style={{ background: "rgba(255,51,51,0.1)", border: "1px solid rgba(255,51,51,0.3)" }}>
              <h4 className="font-mono text-xs mb-2" style={{ color: "var(--red)" }}>⚠ SAFETY IMPLICATIONS:</h4>
              <ul className="font-mono text-xs space-y-1" style={{ color: "#ff8888" }}>
                <li>• This override disables the automatic pressure relief on P-301</li>
                <li>• Vessel rated for max 50 bar — current: 42 bar (84% of max)</li>
                <li>• Manual monitoring required while override is active</li>
                <li>• Override auto-expires in 4 hours</li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <h4 className="font-mono text-xs mb-3" style={{ color: "var(--text-bright)" }}>REQUIRED APPROVALS:</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs" style={{ color: "var(--text-bright)" }}>Operator (K. Virtanen)</span>
                  <span className="font-mono text-xs flex items-center gap-1" style={{ color: "var(--green)" }}><CheckCircle2 className="w-3 h-3" /> Approved</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs" style={{ color: "var(--text-bright)" }}>Shift Supervisor (M. Korhonen)</span>
                  <span className="font-mono text-xs flex items-center gap-1" style={{ color: "var(--amber)" }}><Clock className="w-3 h-3" /> Pending</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs" style={{ color: "var(--text-bright)" }}>Safety Engineer</span>
                  <span className="font-mono text-xs" style={{ color: "var(--text-dim)" }}>Not required (&lt;45 bar)</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-3 text-left">
              <p className="font-mono text-xs text-blue-300"><strong>Key pattern:</strong> Safety overrides require multi-person authorization. The number of approvals scales with the risk level. Below 45 bar: operator + supervisor. Above 45 bar: add safety engineer. Above 48 bar: override denied — automatic shutdown only. This graduated approval prevents both single-point failures AND unnecessary bureaucracy.</p>
            </div>
          </div>
        </div>
      )}

      {/* Parameter change */}
      {scenario === "parameter" && (
        <div className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
            <span className="font-mono text-xs" style={{ color: "var(--text-bright)" }}>PARAMETER ADJUSTMENT</span>
            <span className="font-mono text-xs" style={{ color: "var(--cyan)" }}>DRILLING OPERATIONS</span>
          </div>

          <div className="p-8">
            <h3 className="font-mono text-sm text-white mb-4">Adjust: Drilling RPM</h3>

            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs" style={{ color: "var(--text-dim)" }}>Current value</span>
                <span className="font-mono text-lg" style={{ color: "var(--green)" }}>120 RPM</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs" style={{ color: "var(--text-dim)" }}>Requested value</span>
                <span className="font-mono text-lg" style={{ color: "var(--amber)" }}>180 RPM</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs" style={{ color: "var(--text-dim)" }}>Change</span>
                <span className="font-mono text-sm" style={{ color: "var(--amber)" }}>+50% increase</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs" style={{ color: "var(--text-dim)" }}>Safe range</span>
                <span className="font-mono text-sm" style={{ color: "var(--green)" }}>60 — 200 RPM</span>
              </div>
            </div>

            {/* Visual context */}
            <div className="mb-4">
              <div className="flex justify-between font-mono text-xs mb-1">
                <span>60</span>
                <span>200</span>
              </div>
              <div className="h-4 bg-gray-800 rounded-full overflow-hidden relative">
                {/* Safe range */}
                <div className="absolute inset-0 bg-green-900/30 rounded-full" />
                {/* Warning zones */}
                <div className="absolute top-0 bottom-0 right-0 w-[15%] bg-amber-900/30 rounded-r-full" />
                <div className="absolute top-0 bottom-0 left-0 w-[10%] bg-amber-900/30 rounded-l-full" />
                {/* Current */}
                <div className="absolute top-0 bottom-0 w-1" style={{ left: "43%", background: "var(--green)" }}>
                  <div className="absolute -top-4 -translate-x-1/2 text-xs font-mono text-white whitespace-nowrap">120</div>
                </div>
                {/* Target */}
                <div className="absolute top-0 bottom-0 w-1" style={{ left: "86%", background: "var(--amber)" }}>
                  <div className="absolute -top-4 -translate-x-1/2 text-xs font-mono whitespace-nowrap" style={{ color: "var(--amber)" }}>180</div>
                </div>
              </div>
              <div className="flex justify-between font-mono text-xs mt-1">
                <span style={{ color: "var(--amber)" }}>caution</span>
                <span style={{ color: "var(--green)" }}>safe range</span>
                <span style={{ color: "var(--amber)" }}>caution</span>
              </div>
            </div>

            <div className="bg-amber-900/50 border border-amber-700 rounded-lg p-3 mb-4">
              <p className="font-mono text-xs text-amber-300 flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>180 RPM is within safe range but approaching the caution zone. Monitor vibration levels.</span>
              </p>
            </div>

            <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-3 text-left">
              <p className="font-mono text-xs text-blue-300"><strong>Industrial UX pattern:</strong> Parameter changes show current → new value, the percentage change, AND a visual range indicator showing where the new value falls relative to safe/caution/danger zones. This spatial context lets operators intuitively understand risk — a number alone (180 RPM) means nothing without knowing how close it is to the limit.</p>
            </div>
          </div>
        </div>
      )}

      <button onClick={reset} className="mt-4 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer" style={{ color: "var(--text)" }}>Reset demo</button>
    </div>
  );
}

export function SafetyCriticalPattern() {
  return (
    <div>
      <PatternHeader
        title="Safety-Critical Confirmation"
        description="When an operator is about to shut down a turbine, override a safety system, or change drilling parameters — the confirmation UX is fundamentally different from 'delete my account.' Lives may depend on getting this right."
        severity="critical"
        tags={["Industrial", "IEC 61511", "Safety Instrumented Systems"]}
      />

      <DemoContainer label="safety-critical confirmation (3 variants)">
        <SafetyCriticalDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Use 'hold to confirm' for emergency actions — more reliable than typing under stress",
          "Show the impact of the action BEFORE confirmation — MW lost, cooldown time, restart time",
          "Scale approval requirements with risk level — more dangerous = more approvers",
          "Auto-expire safety overrides with a maximum duration",
          "Show parameter changes with visual range indicators — not just numbers",
          "Log all safety-critical actions with operator ID, timestamp, and outcome",
          "Provide a clear 'Cancel' path that returns to normal operations",
          "Use spatial context (range bars) to show where values fall relative to limits",
        ]}
        donts={[
          "Don't use the same confirmation pattern for 'delete file' and 'emergency shutdown'",
          "Don't require complex input (typing, checkboxes) during emergency situations",
          "Don't allow safety overrides without at least two-person authorization",
          "Don't show parameters as just numbers — always provide context (range, trend, limit)",
          "Don't hide the impact assessment — it must be visible BEFORE the action",
          "Don't make the cancel button smaller than the confirm button in safety contexts",
          "Don't use consumer UX patterns (modal dialogs, 'Are you sure?') for safety-critical actions",
        ]}
        securityRationale="IEC 61511 (Safety Instrumented Systems) and IEC 62443 define security requirements for safety-critical industrial systems. The key tension: security measures must never prevent safety actions. A locked-out operator who can't perform an emergency shutdown is a worse outcome than an unauthorized shutdown. The patterns here resolve this by: immediate access for emergencies + post-facto accountability, graduated authorization for overrides, and contextual confirmation that helps operators make informed decisions under pressure."
        accessibilityNotes={[
          "Emergency buttons use maximum contrast (white on red) and oversized targets",
          "Hold-to-confirm provides visual progress feedback (filling bar)",
          "Range indicators use color + position + text labels — never color alone",
          "Audio alerts accompany visual warnings in noisy environments",
          "All critical information visible without scrolling — fits one screen",
          "Touch targets minimum 14mm for gloved operation (larger than WCAG 44px)",
        ]}
      />
    </div>
  );
}
