import { useState } from "react";
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

  const reset = () => {
    setBadgeScanned(false);
    setPinEntered(false);
    setEmergencyActive(false);
    setPin("");
  };

  return (
    <div className="w-full max-w-lg">
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {(["badge", "biometric", "emergency"] as const).map(s => (
          <button key={s} onClick={() => { setScenario(s); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: scenario === s ? "var(--green-glow)" : "transparent", color: scenario === s ? "var(--green)" : "var(--text)" }}>
            {s === "badge" ? "Badge + PIN" : s === "biometric" ? "Biometric" : "Emergency Override"}
          </button>
        ))}
      </div>

      {/* Badge + PIN */}
      {scenario === "badge" && (
        <div className="bg-gray-900 rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
          {/* Industrial HMI header */}
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
            <span className="font-mono text-xs text-green-400">DRILLING CONTROL SYSTEM v4.2</span>
            <span className="font-mono text-xs text-gray-500">{new Date().toLocaleTimeString()}</span>
          </div>

          <div className="p-8 text-center">
            {!badgeScanned ? (
              <>
                <CreditCard className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="font-mono text-lg text-white mb-2">SCAN OPERATOR BADGE</h3>
                <p className="font-mono text-xs text-gray-400 mb-6">Hold badge near the reader to authenticate</p>
                <div className="w-32 h-32 mx-auto border-2 border-dashed border-blue-400 rounded-xl flex items-center justify-center mb-6" style={{ animation: "pulse 2s infinite" }}>
                  <CreditCard className="w-10 h-10 text-blue-400 opacity-50" />
                </div>
                <button onClick={() => setBadgeScanned(true)} className="font-mono text-sm bg-blue-600 text-white px-6 py-3 rounded border-none cursor-pointer hover:bg-blue-700">
                  [Simulate badge scan]
                </button>
                <p className="font-mono text-xs text-gray-600 mt-4">No keyboard input required — glove-friendly</p>
              </>
            ) : !pinEntered ? (
              <>
                <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto mb-3" />
                <p className="font-mono text-xs text-green-400 mb-1">BADGE RECOGNIZED</p>
                <p className="font-mono text-sm text-white mb-6">Operator: <strong>K. VIRTANEN</strong> — Driller</p>

                <h3 className="font-mono text-sm text-white mb-4">ENTER 4-DIGIT PIN</h3>
                <div className="flex gap-3 justify-center mb-4">
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} className="w-14 h-14 border-2 border-gray-600 rounded-lg flex items-center justify-center font-mono text-2xl text-white" style={{ background: pin.length > i ? "#1e40af" : "#1f2937" }}>
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
                          const newPin = pin + num;
                          setPin(newPin);
                          if (newPin.length === 4) setTimeout(() => setPinEntered(true), 500);
                        }}
                        className="h-14 rounded-lg font-mono text-lg font-bold text-white border-none cursor-pointer"
                        style={{ background: "#374151" }}
                      >
                        {num}
                      </button>
                    ) : <div key={i} />
                  ))}
                </div>
                <p className="font-mono text-xs text-gray-500 mt-4">Large buttons for gloved operation</p>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h3 className="font-mono text-lg text-green-400 mb-2">AUTHENTICATED</h3>
                <div className="bg-gray-800 rounded-lg p-4 text-left font-mono text-xs text-gray-300 space-y-1">
                  <p>Operator: <span className="text-white">K. Virtanen</span></p>
                  <p>Role: <span className="text-white">Driller — Level 3</span></p>
                  <p>Shift: <span className="text-white">Day shift (06:00-18:00)</span></p>
                  <p>Station: <span className="text-white">Driller's Chair — WS-04</span></p>
                  <p>Permissions: <span className="text-green-400">Full drilling operations</span></p>
                </div>
                <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-3 mt-4 text-left">
                  <p className="font-mono text-xs text-blue-300"><strong>UX note:</strong> Badge + PIN is the industrial standard. No passwords to type with gloves. Badge proves physical presence. PIN proves identity. Together they're two-factor auth adapted for the industrial environment.</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Biometric */}
      {scenario === "biometric" && (
        <div className="bg-gray-900 rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
            <span className="font-mono text-xs text-green-400">ENGINE CONTROL ROOM</span>
            <span className="font-mono text-xs text-gray-500">MARITIME VESSEL</span>
          </div>

          <div className="p-8 text-center">
            <Fingerprint className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="font-mono text-lg text-white mb-2">BIOMETRIC AUTHENTICATION</h3>
            <p className="font-mono text-xs text-gray-400 mb-6">Place finger on scanner for engine room access</p>

            <div className="space-y-3 text-left bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gray-400">Fingerprint scan</span>
                <span className="font-mono text-xs text-green-400">Available</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gray-400">Retina scan</span>
                <span className="font-mono text-xs text-green-400">Available</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gray-400">Facial recognition</span>
                <span className="font-mono text-xs text-amber-400">Degraded (low light)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gray-400">Voice recognition</span>
                <span className="font-mono text-xs text-red-400">Unavailable (engine noise)</span>
              </div>
            </div>

            <div className="bg-amber-900/50 border border-amber-700 rounded-lg p-3 text-left">
              <p className="font-mono text-xs text-amber-300"><strong>Industrial reality:</strong> Biometric methods that work in offices fail in industrial environments. Facial recognition fails in low light. Voice fails near engines. Fingerprints fail with dirty/wet hands. The system must detect conditions and offer the best available method — not just one.</p>
            </div>
          </div>
        </div>
      )}

      {/* Emergency override */}
      {scenario === "emergency" && (
        <div className="bg-gray-900 rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
          <div className="bg-red-900 px-4 py-2 flex items-center justify-between border-b border-red-700">
            <span className="font-mono text-xs text-red-200 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5" /> EMERGENCY MODE
            </span>
            <span className="font-mono text-xs text-red-300">RESTRICTED ACCESS</span>
          </div>

          <div className="p-8 text-center">
            {!emergencyActive ? (
              <>
                <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h3 className="font-mono text-lg text-red-400 mb-2">EMERGENCY OVERRIDE</h3>
                <p className="font-mono text-xs text-gray-400 mb-6">Bypasses normal authentication for emergency response</p>

                <div className="bg-red-950 border-2 border-red-700 rounded-lg p-4 mb-4 text-left">
                  <h4 className="font-mono text-xs text-red-400 mb-2">WHEN TO USE:</h4>
                  <ul className="font-mono text-xs text-red-300 space-y-1">
                    <li>• Fire or explosion requiring immediate shutdown</li>
                    <li>• Loss of well control (blowout)</li>
                    <li>• Man overboard / medical emergency</li>
                    <li>• Primary operator incapacitated</li>
                  </ul>
                </div>

                <button onClick={() => setEmergencyActive(true)} className="font-mono text-sm bg-red-600 text-white px-8 py-4 rounded-lg border-2 border-red-400 cursor-pointer hover:bg-red-700 font-bold">
                  ACTIVATE EMERGENCY OVERRIDE
                </button>

                <p className="font-mono text-xs text-gray-500 mt-4">Single large button — no complex auth during emergencies</p>
              </>
            ) : (
              <>
                <div className="bg-red-600 text-white rounded-lg p-4 mb-4 font-mono text-sm">
                  <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
                  EMERGENCY OVERRIDE ACTIVE
                </div>

                <div className="bg-gray-800 rounded-lg p-4 text-left font-mono text-xs space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-amber-400"><Clock className="w-3.5 h-3.5" /> Override activated at {new Date().toLocaleTimeString()}</div>
                  <div className="flex items-center gap-2 text-amber-400"><User className="w-3.5 h-3.5" /> Station: Driller's Chair — WS-04</div>
                  <div className="flex items-center gap-2 text-red-400"><AlertTriangle className="w-3.5 h-3.5" /> All actions logged for post-incident review</div>
                  <div className="flex items-center gap-2 text-red-400"><Shield className="w-3.5 h-3.5" /> Supervisor notification sent automatically</div>
                  <div className="flex items-center gap-2 text-amber-400"><Clock className="w-3.5 h-3.5" /> Override expires in 15 minutes</div>
                </div>

                <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-3 text-left">
                  <p className="font-mono text-xs text-blue-300"><strong>Design principle:</strong> In a genuine emergency, authentication cannot be a barrier to safety. The emergency override grants access immediately but: logs everything, notifies the supervisor, and expires after 15 minutes. Security is preserved through accountability after the fact, not barriers during the crisis.</p>
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
