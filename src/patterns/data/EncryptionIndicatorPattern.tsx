import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Lock, Unlock, ShieldCheck, ShieldAlert, Send, Eye } from "lucide-react";

function EncryptionIndicatorDemo() {
  const [scenario, setScenario] = useState<"messaging" | "connection" | "storage">("messaging");
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  const reset = () => {
    setMessage("");
    setSentMessages([]);
    setShowDetails(false);
  };

  return (
    <div className="w-full max-w-lg">
      {/* Scenario toggle */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {(["messaging", "connection", "storage"] as const).map(s => (
          <button key={s} onClick={() => { setScenario(s); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: scenario === s ? "var(--cyan-glow)" : "transparent", color: scenario === s ? "var(--cyan)" : "var(--text)" }}>
            {s === "messaging" ? "E2E Messaging" : s === "connection" ? "Connection" : "At-Rest"}
          </button>
        ))}
      </div>

      {/* E2E Encrypted messaging */}
      {scenario === "messaging" && (
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono text-xs" style={{ background: "var(--cyan-glow)", color: "var(--cyan)" }}>AJ</div>
              <div>
                <p className="text-sm font-medium font-mono" style={{ color: "var(--text-bright)" }}>Alice Johnson</p>
                <p className="text-xs font-mono flex items-center gap-1" style={{ color: "var(--cyan)" }}><Lock className="w-3 h-3" aria-hidden="true" /> End-to-end encrypted</p>
              </div>
            </div>
            <button onClick={() => setShowDetails(!showDetails)} className="text-xs font-mono bg-transparent border-none cursor-pointer hover:underline" style={{ color: "var(--cyan)" }}>
              {showDetails ? "Hide" : "Verify"}
            </button>
          </div>

          {/* Encryption details */}
          {showDetails && (
            <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)", background: "var(--cyan-glow)" }}>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "var(--cyan)" }} />
                <div>
                  <p className="text-xs font-semibold font-mono" style={{ color: "var(--cyan)" }}>Encryption verified</p>
                  <p className="text-xs font-mono mt-1" style={{ color: "var(--text)" }}>Messages are end-to-end encrypted using Signal Protocol. Only you and Alice can read them — not even we can.</p>
                  <div className="mt-2 p-2 rounded" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                    <p className="text-xs font-mono mb-1" style={{ color: "var(--text-dim)" }}>Safety number</p>
                    <p className="font-mono text-xs tracking-wider" style={{ color: "var(--text-bright)" }}>38472 91056 73829 10384 72910 56738</p>
                    <p className="text-xs font-mono mt-1" style={{ color: "var(--text-dim)" }}>Compare this number with Alice to verify encryption.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="p-4 space-y-3 min-h-[150px]">
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-none px-4 py-2 max-w-[80%]" style={{ background: "var(--bg-elevated)" }}>
                <p className="text-sm font-mono" style={{ color: "var(--text-bright)" }}>Hey, can you send me the quarterly report?</p>
                <p className="text-xs font-mono mt-1 flex items-center gap-1" style={{ color: "var(--text-dim)" }}><Lock className="w-2.5 h-2.5" aria-hidden="true" /> 10:32 AM</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="rounded-2xl rounded-br-none px-4 py-2 max-w-[80%]" style={{ background: "var(--cyan)" }}>
                <p className="text-sm font-mono" style={{ color: "var(--bg)" }}>Sure, sending it now. It has sensitive financial data so glad this is encrypted.</p>
                <p className="text-xs font-mono mt-1 flex items-center gap-1" style={{ color: "rgba(0,0,0,0.5)" }}><Lock className="w-2.5 h-2.5" aria-hidden="true" /> 10:33 AM</p>
              </div>
            </div>
            {sentMessages.map((msg, i) => (
              <div key={i} className="flex justify-end">
                <div className="rounded-2xl rounded-br-none px-4 py-2 max-w-[80%]" style={{ background: "var(--cyan)" }}>
                  <p className="text-sm font-mono" style={{ color: "var(--bg)" }}>{msg}</p>
                  <p className="text-xs font-mono mt-1 flex items-center gap-1" style={{ color: "rgba(0,0,0,0.5)" }}><Lock className="w-2.5 h-2.5" aria-hidden="true" /> Just now</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-3 flex items-center gap-2" style={{ borderTop: "1px solid var(--border)" }}>
            <Lock className="w-4 h-4 shrink-0" aria-hidden="true" style={{ color: "var(--cyan)" }} />
            <input
              aria-label="Encrypted message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Encrypted message..."
              className="flex-1 text-sm font-mono border-none outline-none bg-transparent"
              style={{ color: "var(--text-bright)" }}
              onKeyDown={e => { if (e.key === "Enter" && message) { setSentMessages(prev => [...prev, message]); setMessage(""); } }}
            />
            <button aria-label="Send message" onClick={() => { if (message) { setSentMessages(prev => [...prev, message]); setMessage(""); } }} className="bg-transparent border-none cursor-pointer">
              <Send className="w-4 h-4" style={{ color: "var(--cyan)" }} />
            </button>
          </div>
        </div>
      )}

      {/* Connection security */}
      {scenario === "connection" && (
        <div className="rounded-2xl p-6 space-y-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <h3 className="font-semibold font-mono text-sm" style={{ color: "var(--text-bright)" }}>Connection security indicators</h3>

          {/* Secure */}
          <div className="rounded-lg p-4 overflow-hidden" style={{ background: "rgba(0,255,65,0.05)", border: "1px solid var(--green-border)" }}>
            <div className="flex items-start gap-3 mb-2">
              <Lock className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--green)" }} />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-sm font-medium font-mono break-all" style={{ color: "var(--text-bright)" }}>https://bank.example.com</span>
                  <span className="text-xs font-mono px-1.5 py-0.5 rounded shrink-0" style={{ background: "rgba(0,255,65,0.15)", color: "var(--green)" }}>EV Certificate</span>
                </div>
                <p className="text-xs font-mono mt-0.5" style={{ color: "var(--green)" }}>Connection is secure • TLS 1.3 • Bank Corp, Inc.</p>
              </div>
            </div>
            <div className="rounded p-2 text-xs font-mono" style={{ background: "var(--bg)", color: "var(--text)" }}>
              Information you send (passwords, credit cards) is encrypted and cannot be read by others.
            </div>
          </div>

          {/* Mixed content */}
          <div className="rounded-lg p-4 overflow-hidden" style={{ background: "rgba(255,170,0,0.05)", border: "1px solid rgba(255,170,0,0.25)" }}>
            <div className="flex items-start gap-3 mb-2">
              <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--amber)" }} />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-sm font-medium font-mono break-all" style={{ color: "var(--text-bright)" }}>https://shop.example.com</span>
                  <span className="text-xs font-mono px-1.5 py-0.5 rounded shrink-0" style={{ background: "rgba(255,170,0,0.15)", color: "var(--amber)" }}>Mixed Content</span>
                </div>
                <p className="text-xs font-mono mt-0.5" style={{ color: "var(--amber)" }}>Connection partially secure • Some resources loaded over HTTP</p>
              </div>
            </div>
            <div className="rounded p-2 text-xs font-mono" style={{ background: "var(--bg)", color: "var(--text)" }}>
              This page includes resources that aren't encrypted. Sensitive data may be visible to others.
            </div>
          </div>

          {/* Insecure */}
          <div className="rounded-lg p-4 overflow-hidden" style={{ background: "rgba(255,51,51,0.05)", border: "1px solid rgba(255,51,51,0.25)" }}>
            <div className="flex items-start gap-3 mb-2">
              <Unlock className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--red)" }} />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-sm font-medium font-mono break-all" style={{ color: "var(--text-bright)" }}>http://old.example.com</span>
                  <span className="text-xs font-mono px-1.5 py-0.5 rounded shrink-0" style={{ background: "rgba(255,51,51,0.15)", color: "var(--red)" }}>Not Secure</span>
                </div>
                <p className="text-xs font-mono mt-0.5" style={{ color: "var(--red)" }}>Connection is not encrypted</p>
              </div>
            </div>
            <div className="rounded p-2 text-xs font-mono" style={{ background: "var(--bg)", color: "var(--text)" }}>
              Do not enter passwords or credit card numbers on this site. Anyone on the network can see what you send.
            </div>
          </div>
        </div>
      )}

      {/* At-rest encryption */}
      {scenario === "storage" && (
        <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <h3 className="font-semibold font-mono text-sm mb-4" style={{ color: "var(--text-bright)" }}>Data encryption status</h3>

          <div className="space-y-3">
            {[
              { name: "Personal documents", status: "encrypted", icon: Lock, detail: "AES-256 • Encrypted at rest • Only you can decrypt" },
              { name: "Profile information", status: "encrypted", icon: Lock, detail: "AES-256 • Encrypted at rest • Visible to admins" },
              { name: "Chat history", status: "e2e", icon: ShieldCheck, detail: "Signal Protocol • End-to-end encrypted • No server access" },
              { name: "Usage analytics", status: "plain", icon: Eye, detail: "Not encrypted • Anonymized • Used for service improvement" },
            ].map(({ name, status, icon: Icon, detail }) => {
              const color = status === "e2e" ? "var(--cyan)" : status === "encrypted" ? "var(--green)" : "var(--amber)";
              const bg = status === "e2e" ? "var(--cyan-glow)" : status === "encrypted" ? "rgba(0,255,65,0.1)" : "rgba(255,170,0,0.1)";
              return (
                <div key={name} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                  <Icon className="w-5 h-5 mt-0.5 shrink-0" style={{ color }} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium font-mono" style={{ color: "var(--text-bright)" }}>{name}</span>
                      <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: bg, color }}>
                        {status === "e2e" ? "E2E Encrypted" : status === "encrypted" ? "Encrypted" : "Not encrypted"}
                      </span>
                    </div>
                    <p className="text-xs font-mono mt-1" style={{ color: "var(--text)" }}>{detail}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-lg p-3 mt-4 text-xs font-mono" style={{ background: "var(--cyan-glow)", border: "1px solid var(--cyan-border)", color: "var(--cyan)" }}>
            <strong>Pattern:</strong> <span style={{ color: "var(--text)" }}>Show users exactly what's encrypted, how, and who can access it. Different encryption levels (E2E vs at-rest vs none) need different visual indicators.</span>
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
