import { useState, useEffect, useRef } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Fingerprint, CreditCard, Shield, User, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

function OperatorAuthDemo() {
  const [scenario, setScenario] = useState<"badge" | "biometric" | "emergency">("badge");
  const [badgeScanned, setBadgeScanned] = useState(false);
  const [pinEntered, setPinEntered] = useState(false);
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [pin, setPin] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [now, setNow] = useState(() => new Date());
  const [activatedAt, setActivatedAt] = useState<Date | null>(null);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const reset = () => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    setBadgeScanned(false);
    setPinEntered(false);
    setEmergencyActive(false);
    setPin("");
    setActivatedAt(null);
  };

  return (
    <div className="w-full max-w-lg">
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {(["badge", "biometric", "emergency"] as const).map(s => (
          <button key={s} onClick={() => { setScenario(s); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: scenario === s ? "var(--industrial-glow)" : "transparent", color: scenario === s ? "var(--industrial-color)" : "var(--text)" }}>
            {s === "badge" ? "Badge + PIN" : s === "biometric" ? "Biometric" : "Emergency Override"}
          </button>
        ))}
      </div>

      {/* Badge + PIN */}
      {scenario === "badge" && (
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
          {/* Industrial HMI header */}
          <div className="px-4 py-2 flex items-center justify-between" style={{ background: "var(--bg-elevated)", borderBottom: "1px solid var(--border)" }}>
            <span className="font-mono text-xs" style={{ color: "var(--industrial-color)" }}>DRILLING CONTROL SYSTEM v4.2</span>
            <span className="font-mono text-xs" style={{ color: "var(--text-dim)" }}>{now.toLocaleTimeString()}</span>
          </div>

          <div className="p-8 text-center">
            {!badgeScanned ? (
              <>
                <CreditCard className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--text)" }} />
                <h3 className="font-mono text-lg mb-2" style={{ color: "var(--text-bright)" }}>SCAN OPERATOR BADGE</h3>
                <p className="font-mono text-xs mb-6" style={{ color: "var(--text)" }}>Hold badge near the reader to authenticate</p>
                <div className="w-32 h-32 mx-auto border-2 border-dashed rounded-xl flex items-center justify-center mb-6" style={{ borderColor: "var(--industrial-color)", animation: "pulse 2s infinite" }}>
                  <CreditCard className="w-10 h-10" style={{ color: "var(--text-dim)", opacity: 0.5 }} />
                </div>
                <button onClick={() => setBadgeScanned(true)} className="font-mono text-sm px-6 py-3 rounded border-none cursor-pointer" style={{ background: "var(--industrial-color)", color: "var(--bg)" }}>
                  [Simulate badge scan]
                </button>
                <p className="font-mono text-xs mt-4" style={{ color: "var(--text-dim)" }}>No keyboard input required — glove-friendly</p>
              </>
            ) : !pinEntered ? (
              <>
                <CheckCircle2 className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--green)" }} />
                <p className="font-mono text-xs mb-1" style={{ color: "var(--green)" }}>BADGE RECOGNIZED</p>
                <p className="font-mono text-sm mb-6" style={{ color: "var(--text-bright)" }}>Operator: <strong>K. VIRTANEN</strong> — Driller</p>

                <h3 className="font-mono text-sm mb-4" style={{ color: "var(--text-bright)" }}>ENTER 4-DIGIT PIN</h3>
                <div className="flex gap-3 justify-center mb-4">
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} className="w-14 h-14 rounded-lg flex items-center justify-center font-mono text-2xl" style={{ background: pin.length > i ? "var(--industrial-color)" : "var(--bg-elevated)", border: "2px solid var(--border)", color: "var(--text-bright)" }}>
                      {pin.length > i ? "•" : ""}
                    </div>
                  ))}
                </div>

                {/* Large touch-friendly numpad */}
                <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "⌫"].map((num, i) => (
                    num !== null ? (
                      <button
                        key={i}
                        onClick={() => {
                          if (num === "⌫") { setPin(p => p.slice(0, -1)); return; }
                          if (pin.length >= 4) return;
                          const newPin = pin + String(num);
                          setPin(newPin);
                          if (newPin.length === 4) { timerRef.current = setTimeout(() => setPinEntered(true), 500); }
                        }}
                        className="h-14 rounded-lg font-mono text-lg font-bold border-none cursor-pointer"
                        style={{ background: "var(--bg-elevated)", color: "var(--text-bright)" }}
                      >
                        {num}
                      </button>
                    ) : <div key={i} />
                  ))}
                </div>
                <p className="font-mono text-xs mt-4" style={{ color: "var(--text-dim)" }}>Large buttons for gloved operation</p>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--green)" }} />
                <h3 className="font-mono text-lg mb-2" style={{ color: "var(--green)" }}>AUTHENTICATED</h3>
                <div className="rounded-lg p-4 text-left font-mono text-xs space-y-1" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
                  <p style={{ color: "var(--text)" }}>Operator: <span style={{ color: "var(--text-bright)" }}>K. VIRTANEN</span></p>
                  <p style={{ color: "var(--text)" }}>Role: <span style={{ color: "var(--text-bright)" }}>Driller — Level 3</span></p>
                  <p style={{ color: "var(--text)" }}>Shift: <span style={{ color: "var(--text-bright)" }}>Day shift (06:00-18:00)</span></p>
                  <p style={{ color: "var(--text)" }}>Station: <span style={{ color: "var(--text-bright)" }}>Driller's Chair — WS-04</span></p>
                  <p style={{ color: "var(--text)" }}>Permissions: <span style={{ color: "var(--green)" }}>Full drilling operations</span></p>
                </div>
                <div className="rounded-lg p-3 mt-4 text-left" style={{ background: "var(--industrial-glow)", border: "1px solid var(--industrial-border)" }}>
                  <p className="font-mono text-xs" style={{ color: "var(--industrial-color)" }}><strong>UX note:</strong> <span style={{ color: "var(--text)" }}>Badge + PIN is the industrial standard. No passwords to type with gloves. Badge proves physical presence. PIN proves identity. Together they're two-factor auth adapted for the industrial environment.</span></p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Biometric */}
      {scenario === "biometric" && (
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
          <div className="px-4 py-2 flex items-center justify-between" style={{ background: "var(--bg-elevated)", borderBottom: "1px solid var(--border)" }}>
            <span className="font-mono text-xs" style={{ color: "var(--industrial-color)" }}>ENGINE CONTROL ROOM</span>
            <span className="font-mono text-xs" style={{ color: "var(--text-dim)" }}>MARITIME VESSEL</span>
          </div>

          <div className="p-8 text-center">
            <Fingerprint className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--industrial-color)" }} />
            <h3 className="font-mono text-lg mb-2" style={{ color: "var(--text-bright)" }}>BIOMETRIC AUTHENTICATION</h3>
            <p className="font-mono text-xs mb-6" style={{ color: "var(--text)" }}>Place finger on scanner for engine room access</p>

            <div className="space-y-3 text-left rounded-lg p-4 mb-4" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
              {[
                { method: "Fingerprint scan", status: "Available", color: "var(--green)" },
                { method: "Retina scan", status: "Available", color: "var(--green)" },
                { method: "Facial recognition", status: "Degraded (low light)", color: "var(--amber)" },
                { method: "Voice recognition", status: "Unavailable (engine noise)", color: "var(--red)" },
              ].map(({ method, status, color }) => (
                <div key={method} className="flex items-center justify-between">
                  <span className="font-mono text-xs" style={{ color: "var(--text-bright)" }}>{method}</span>
                  <span className="font-mono text-xs" style={{ color }}>{status}</span>
                </div>
              ))}
            </div>

            <div className="rounded-lg p-3 text-left" style={{ background: "var(--industrial-glow)", border: "1px solid var(--industrial-border)" }}>
              <p className="font-mono text-xs" style={{ color: "var(--industrial-color)" }}><strong>Industrial reality:</strong> <span style={{ color: "var(--text)" }}>Biometric methods that work in offices fail in industrial environments. Facial recognition fails in low light. Voice fails near engines. Fingerprints fail with dirty/wet hands. The system must detect conditions and offer the best available method — not just one.</span></p>
            </div>
          </div>
        </div>
      )}

      {/* Emergency override */}
      {scenario === "emergency" && (
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
          <div className="px-4 py-2 flex items-center justify-between" style={{ background: "rgba(255,51,51,0.2)", borderBottom: "1px solid rgba(255,51,51,0.3)" }}>
            <span className="font-mono text-xs flex items-center gap-2" style={{ color: "var(--red)" }}>
              <AlertTriangle className="w-3.5 h-3.5" /> EMERGENCY MODE
            </span>
            <span className="font-mono text-xs" style={{ color: "rgba(255,51,51,0.7)" }}>RESTRICTED ACCESS</span>
          </div>

          <div className="p-8 text-center">
            {!emergencyActive ? (
              <>
                <AlertTriangle className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--red)" }} />
                <h3 className="font-mono text-lg mb-2" style={{ color: "var(--text-bright)" }}>EMERGENCY OVERRIDE</h3>
                <p className="font-mono text-xs mb-6" style={{ color: "var(--text)" }}>Bypasses normal authentication for emergency response</p>

                <div className="rounded-lg p-4 mb-4 text-left" style={{ background: "rgba(255,51,51,0.08)", border: "2px solid rgba(255,51,51,0.3)" }}>
                  <h4 className="font-mono text-xs mb-2" style={{ color: "var(--red)" }}>WHEN TO USE:</h4>
                  <ul className="font-mono text-xs space-y-1" style={{ color: "var(--text)" }}>
                    <li>• Fire or explosion requiring immediate shutdown</li>
                    <li>• Loss of well control (blowout)</li>
                    <li>• Man overboard / medical emergency</li>
                    <li>• Primary operator incapacitated</li>
                  </ul>
                </div>

                <button onClick={() => { setEmergencyActive(true); setActivatedAt(new Date()); }} className="font-mono text-sm px-8 py-4 rounded-lg cursor-pointer font-bold" style={{ background: "rgba(255,51,51,0.15)", color: "var(--red)", border: "2px solid var(--red)" }}>
                  ACTIVATE EMERGENCY OVERRIDE
                </button>

                <p className="font-mono text-xs mt-4" style={{ color: "var(--text-dim)" }}>Single large button — no complex auth during emergencies</p>
              </>
            ) : (
              <>
                <div className="rounded-lg p-4 mb-4 font-mono text-sm" style={{ background: "rgba(255,51,51,0.15)", color: "var(--red)" }}>
                  <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
                  EMERGENCY OVERRIDE ACTIVE
                </div>

                <div className="rounded-lg p-4 text-left font-mono text-xs space-y-2 mb-4" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text)" }}>
                  <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" style={{ color: "var(--amber)" }} /> Override activated at {activatedAt?.toLocaleTimeString()}</div>
                  <div className="flex items-center gap-2"><User className="w-3.5 h-3.5" style={{ color: "var(--text-dim)" }} /> Station: Driller's Chair — WS-04</div>
                  <div className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5" style={{ color: "var(--amber)" }} /> All actions logged for post-incident review</div>
                  <div className="flex items-center gap-2"><Shield className="w-3.5 h-3.5" style={{ color: "var(--green)" }} /> Supervisor notification sent automatically</div>
                  <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" style={{ color: "var(--amber)" }} /> Override expires in 15 minutes</div>
                </div>

                <div className="rounded-lg p-3 text-left" style={{ background: "var(--industrial-glow)", border: "1px solid var(--industrial-border)" }}>
                  <p className="font-mono text-xs" style={{ color: "var(--industrial-color)" }}><strong>Design principle:</strong> <span style={{ color: "var(--text)" }}>In a genuine emergency, authentication cannot be a barrier to safety. The emergency override grants access immediately but: logs everything, notifies the supervisor, and expires after 15 minutes. Security is preserved through accountability after the fact, not barriers during the crisis.</span></p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <button onClick={reset} className="mt-4 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer" style={{ color: "var(--text)" }}>Reset demo</button>
    </div>
  );
}

export function OperatorAuthPattern() {
  return (
    <div>
      <PatternHeader
        title="Operator Authentication"
        description="Authentication for industrial operators — badge + PIN for gloved hands, adaptive biometrics for harsh environments, and emergency override for when seconds matter. Not your average login flow."
        severity="critical"
        tags={["Industrial", "IEC 62443", "OT Security"]}
      />

      <DemoContainer label="operator authentication (3 variants)">
        <OperatorAuthDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Use badge + PIN as the primary method — operators wear gloves and can't type passwords",
          "Design large, touch-friendly inputs — 14mm minimum touch target for gloved operation",
          "Show operator name, role, and permissions immediately after auth — context is critical",
          "Support multiple biometric fallbacks — conditions change (light, noise, dirty hands)",
          "Implement emergency override that bypasses auth but logs everything",
          "Auto-expire emergency override after a set time (15 min) with supervisor notification",
          "Design for shared workstations — operators hand off between shifts",
          "Show shift information and station identity — operators need environmental context",
        ]}
        donts={[
          "Don't use password-based auth for operator workstations — passwords fail with PPE",
          "Don't rely on a single biometric method — industrial environments degrade all of them",
          "Don't block emergency actions with authentication — safety trumps security",
          "Don't use SMS-based MFA in environments with no cellular coverage",
          "Don't require re-auth for every action — use session-based auth with role verification",
          "Don't apply consumer UX patterns directly — industrial context is fundamentally different",
          "Don't forget to log emergency overrides — accountability is the security mechanism",
        ]}
        securityRationale="IEC 62443 (Industrial Automation and Control System Security) defines security levels for operational technology. Zone authentication in industrial environments must balance: physical safety (never delay emergency response), operational continuity (12-hour shifts, shared stations), and environmental constraints (gloves, noise, limited visibility). The emergency override pattern is the key insight — in industrial security UX, the question isn't 'how to prevent unauthorized access' but 'how to enable authorized emergency access while maintaining accountability.'"
        accessibilityNotes={[
          "Badge scan requires no keyboard or screen interaction — accessible by design",
          "PIN numpad uses 14mm+ touch targets for gloved operation",
          "Emergency override button is oversized and high-contrast (red on dark)",
          "Audio feedback for badge scan success/failure (environments may be noisy)",
          "Status messages use icons + text + color — never color alone",
          "All text is minimum 14px for readability at arm's length",
        ]}
      />
    </div>
  );
}
