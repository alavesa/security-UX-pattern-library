import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Lock, Unlock, ShieldCheck, ShieldAlert, Send, Eye, EyeOff } from "lucide-react";

function EncryptionIndicatorDemo() {
  const [scenario, setScenario] = useState<"messaging" | "connection" | "storage">("messaging");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const reset = () => {
    setMessage("");
    setSent(false);
    setShowDetails(false);
  };

  return (
    <div className="w-full max-w-lg">
      {/* Scenario toggle */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {(["messaging", "connection", "storage"] as const).map(s => (
          <button key={s} onClick={() => { setScenario(s); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: scenario === s ? "var(--green-glow)" : "transparent", color: scenario === s ? "var(--green)" : "var(--text)" }}>
            {s === "messaging" ? "E2E Messaging" : s === "connection" ? "Connection" : "At-Rest"}
          </button>
        ))}
      </div>

      {/* E2E Encrypted messaging */}
      {scenario === "messaging" && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">AJ</div>
              <div>
                <p className="text-sm font-medium text-gray-900">Alice Johnson</p>
                <p className="text-xs text-green-600 flex items-center gap-1"><Lock className="w-3 h-3" /> End-to-end encrypted</p>
              </div>
            </div>
            <button onClick={() => setShowDetails(!showDetails)} className="text-xs text-blue-600 bg-transparent border-none cursor-pointer hover:underline">
              {showDetails ? "Hide" : "Verify"}
            </button>
          </div>

          {/* Encryption details */}
          {showDetails && (
            <div className="bg-green-50 border-b border-green-200 px-4 py-3">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-green-800">Encryption verified</p>
                  <p className="text-xs text-green-700 mt-1">Messages are end-to-end encrypted using Signal Protocol. Only you and Alice can read them — not even we can.</p>
                  <div className="mt-2 p-2 bg-white rounded border border-green-200">
                    <p className="text-xs text-gray-500 mb-1">Safety number</p>
                    <p className="font-mono text-xs text-gray-900 tracking-wider">38472 91056 73829 10384 72910 56738</p>
                    <p className="text-xs text-gray-400 mt-1">Compare this number with Alice to verify encryption.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="p-4 space-y-3 min-h-[150px]">
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-bl-none px-4 py-2 max-w-[80%]">
                <p className="text-sm text-gray-900">Hey, can you send me the quarterly report?</p>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><Lock className="w-2.5 h-2.5" /> 10:32 AM</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-blue-600 rounded-2xl rounded-br-none px-4 py-2 max-w-[80%]">
                <p className="text-sm text-white">Sure, sending it now. It has sensitive financial data so glad this is encrypted.</p>
                <p className="text-xs text-blue-200 mt-1 flex items-center gap-1"><Lock className="w-2.5 h-2.5" /> 10:33 AM</p>
              </div>
            </div>
            {sent && (
              <div className="flex justify-end">
                <div className="bg-blue-600 rounded-2xl rounded-br-none px-4 py-2 max-w-[80%]">
                  <p className="text-sm text-white">{message}</p>
                  <p className="text-xs text-blue-200 mt-1 flex items-center gap-1"><Lock className="w-2.5 h-2.5" /> Just now</p>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 px-4 py-3 flex items-center gap-2">
            <Lock className="w-4 h-4 text-green-500 shrink-0" />
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Encrypted message..."
              className="flex-1 text-sm border-none outline-none bg-transparent"
              onKeyDown={e => { if (e.key === "Enter" && message) { setSent(true); setMessage(""); } }}
            />
            <button onClick={() => { if (message) { setSent(true); setMessage(""); } }} className="text-blue-600 bg-transparent border-none cursor-pointer">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Connection security */}
      {scenario === "connection" && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900 text-sm">Connection security indicators</h3>

          {/* Secure */}
          <div className="border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Lock className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">https://bank.example.com</span>
                  <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">EV Certificate</span>
                </div>
                <p className="text-xs text-green-600">Connection is secure • TLS 1.3 • Bank Corp, Inc.</p>
              </div>
            </div>
            <div className="bg-green-50 rounded p-2 text-xs text-green-700">
              Information you send (passwords, credit cards) is encrypted and cannot be read by others.
            </div>
          </div>

          {/* Mixed content */}
          <div className="border border-amber-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">https://shop.example.com</span>
                  <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">Mixed Content</span>
                </div>
                <p className="text-xs text-amber-600">Connection partially secure • Some resources loaded over HTTP</p>
              </div>
            </div>
            <div className="bg-amber-50 rounded p-2 text-xs text-amber-700">
              This page includes resources that aren't encrypted. Sensitive data may be visible to others.
            </div>
          </div>

          {/* Insecure */}
          <div className="border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Unlock className="w-5 h-5 text-red-500" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">http://old.example.com</span>
                  <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">Not Secure</span>
                </div>
                <p className="text-xs text-red-600">Connection is not encrypted</p>
              </div>
            </div>
            <div className="bg-red-50 rounded p-2 text-xs text-red-700">
              Do not enter passwords or credit card numbers on this site. Anyone on the network can see what you send.
            </div>
          </div>
        </div>
      )}

      {/* At-rest encryption */}
      {scenario === "storage" && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 text-sm mb-4">Data encryption status</h3>

          <div className="space-y-3">
            {[
              { name: "Personal documents", status: "encrypted", icon: Lock, detail: "AES-256 • Encrypted at rest • Only you can decrypt" },
              { name: "Profile information", status: "encrypted", icon: Lock, detail: "AES-256 • Encrypted at rest • Visible to admins" },
              { name: "Chat history", status: "e2e", icon: ShieldCheck, detail: "Signal Protocol • End-to-end encrypted • No server access" },
              { name: "Usage analytics", status: "plain", icon: EyeOff, detail: "Not encrypted • Anonymized • Used for service improvement" },
            ].map(({ name, status, icon: Icon, detail }) => (
              <div key={name} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${status === "e2e" ? "text-green-600" : status === "encrypted" ? "text-blue-600" : "text-gray-400"}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{name}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      status === "e2e" ? "bg-green-100 text-green-700" :
                      status === "encrypted" ? "bg-blue-100 text-blue-700" :
                      "bg-gray-100 text-gray-500"
                    }`}>
                      {status === "e2e" ? "E2E Encrypted" : status === "encrypted" ? "Encrypted" : "Not encrypted"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4 text-xs text-blue-800">
            <strong>Pattern:</strong> Show users exactly what's encrypted, how, and who can access it. Different encryption levels (E2E vs at-rest vs none) need different visual indicators.
          </div>
        </div>
      )}

      <button onClick={reset} className="mt-4 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer" style={{ color: "var(--text)" }}>
        Reset demo
      </button>
    </div>
  );
}

export function EncryptionIndicatorPattern() {
  return (
    <div>
      <PatternHeader
        title="Encryption Indicators"
        description="How to communicate encryption status to users — E2E messaging indicators, connection security badges, and at-rest encryption dashboards. Making invisible security visible."
        severity="high"
        tags={["Data Protection", "OWASP A02", "CWE-311"]}
      />

      <DemoContainer label="encryption indicators (3 variants)">
        <EncryptionIndicatorDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Show encryption status on every message/file, not just once in settings",
          "Use a lock icon as the universal encryption indicator — users understand it",
          "Differentiate between E2E encryption and server-side encryption visually",
          "Provide a way to verify encryption (safety numbers, key fingerprints)",
          "Explain in plain language what encryption means: 'Only you and Alice can read this'",
          "Show connection security with clear green/amber/red indicators",
          "List what data is encrypted and what isn't — transparency builds trust",
        ]}
        donts={[
          "Don't say 'encrypted' when you mean 'HTTPS' — they're different things",
          "Don't show a lock icon if the data is only encrypted in transit but stored in plaintext",
          "Don't use only color to indicate encryption status — add text and icons",
          "Don't hide encryption details behind technical jargon (TLS 1.3, AES-256) — lead with impact",
          "Don't claim E2E encryption if you hold the decryption keys server-side",
          "Don't show encryption as binary (on/off) — there are levels users should understand",
        ]}
        securityRationale="OWASP A02 (Cryptographic Failures) covers missing or weak encryption of sensitive data. CWE-311 (Missing Encryption) is a critical vulnerability. Users can't verify encryption themselves — they rely entirely on UI indicators. If the indicator is misleading or absent, users assume their data is either always secure (dangerous) or never secure (they stop using the service). Accurate, contextual encryption indicators are both a security feature and a trust feature."
        accessibilityNotes={[
          "Lock icons need aria-label describing the encryption state",
          "Green/amber/red must be paired with text labels — not color alone",
          "Safety numbers should be copyable and screen-reader friendly",
          "Encryption status badges use both color AND text",
          "'Not encrypted' is explicitly stated — not just the absence of a lock icon",
        ]}
      />
    </div>
  );
}
