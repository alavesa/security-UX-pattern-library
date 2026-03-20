import { useState } from "react";
import { Copy, CheckCheck, Shield, AlertTriangle, Lock, Fingerprint } from "lucide-react";

interface Token {
  name: string;
  value: string;
  preview?: string;
  description: string;
}

function TokenCard({ token, format }: { token: Token; format: string }) {
  const [copied, setCopied] = useState(false);

  const formattedValue = format === "css"
    ? `--${token.name}: ${token.value};`
    : format === "json"
    ? `"${token.name}": "${token.value}"`
    : `$${token.name}: ${token.value};`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard unavailable */ }
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border" style={{ borderColor: "var(--border)", background: "var(--bg-elevated)" }}>
      {token.preview && (
        <div className="w-8 h-8 rounded shrink-0 border" style={{ background: token.preview, borderColor: "var(--border)" }} />
      )}
      <div className="flex-1 min-w-0">
        <p className="font-mono text-xs" style={{ color: "var(--text-bright)" }}>{token.name}</p>
        <p className="text-xs truncate" style={{ color: "#555" }}>{token.description}</p>
      </div>
      <button onClick={handleCopy} className="shrink-0 bg-transparent border-none cursor-pointer p-1" style={{ color: "#555" }}>
        {copied ? <CheckCheck className="w-3.5 h-3.5" style={{ color: "var(--green)" }} /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}

const SEVERITY_TOKENS: Token[] = [
  { name: "security-critical", value: "#ff3333", preview: "#ff3333", description: "Critical severity — immediate action required" },
  { name: "security-high", value: "#ff6600", preview: "#ff6600", description: "High severity — action needed soon" },
  { name: "security-medium", value: "#ffaa00", preview: "#ffaa00", description: "Medium severity — should be addressed" },
  { name: "security-low", value: "#00e5ff", preview: "#00e5ff", description: "Low severity — informational" },
  { name: "security-safe", value: "#00ff41", preview: "#00ff41", description: "Safe / verified / no issues" },
  { name: "security-none", value: "#888888", preview: "#888888", description: "No security context / neutral" },
];

const STATE_TOKENS: Token[] = [
  { name: "state-encrypted", value: "#00ff41", preview: "#00ff41", description: "Data is encrypted (E2E or at-rest)" },
  { name: "state-partial", value: "#ffaa00", preview: "#ffaa00", description: "Partially secure (mixed content, partial encryption)" },
  { name: "state-unencrypted", value: "#ff3333", preview: "#ff3333", description: "Not encrypted — data at risk" },
  { name: "state-authenticated", value: "#00e5ff", preview: "#00e5ff", description: "User is authenticated" },
  { name: "state-expired", value: "#ff6600", preview: "#ff6600", description: "Session expired / token invalid" },
  { name: "state-locked", value: "#888888", preview: "#888888", description: "Account locked / action restricted" },
];

const CATEGORY_TOKENS: Token[] = [
  { name: "cat-auth", value: "var(--green)", preview: "#00ff41", description: "Authentication patterns" },
  { name: "cat-threat", value: "var(--green)", preview: "#00ff41", description: "Threat response patterns" },
  { name: "cat-dark", value: "var(--red)", preview: "#ff3333", description: "Dark patterns / anti-patterns" },
  { name: "cat-data", value: "var(--cyan)", preview: "#00e5ff", description: "Data protection patterns" },
  { name: "cat-owasp", value: "var(--amber)", preview: "#ffaa00", description: "OWASP Top 10 patterns" },
  { name: "cat-ai", value: "#c084fc", preview: "#c084fc", description: "AI transparency patterns" },
  { name: "cat-industrial", value: "#f97316", preview: "#f97316", description: "Industrial security patterns" },
];

const SPACING_TOKENS: Token[] = [
  { name: "touch-target-min", value: "44px", description: "WCAG minimum touch target (web)" },
  { name: "touch-target-industrial", value: "14mm (≈53px)", description: "IEC 62443 gloved operation minimum" },
  { name: "touch-target-emergency", value: "20mm (≈76px)", description: "Emergency button minimum (ISA-18.2)" },
  { name: "text-min-arm-length", value: "14px", description: "Minimum text for reading at arm's length (HMI)" },
  { name: "alarm-badge-min", value: "24px", description: "Minimum alarm priority indicator size" },
];

const ALARM_TOKENS: Token[] = [
  { name: "alarm-critical", value: "#ff0000", preview: "#ff0000", description: "ISA-18.2 Priority 1 — immediate action" },
  { name: "alarm-high", value: "#ff8800", preview: "#ff8800", description: "ISA-18.2 Priority 2 — prompt action" },
  { name: "alarm-medium", value: "#0088ff", preview: "#0088ff", description: "ISA-18.2 Priority 3 — awareness" },
  { name: "alarm-low", value: "#888888", preview: "#888888", description: "ISA-18.2 Priority 4 — diagnostic" },
  { name: "alarm-acknowledged", value: "opacity: 0.5", description: "Acknowledged alarm visual treatment" },
  { name: "alarm-shelved", value: "display: none", description: "Shelved alarm — hidden but tracked" },
];

export function TokensPage() {
  const [format, setFormat] = useState<"css" | "json" | "scss">("css");

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-mono mb-3 glow-text">Design Tokens</h1>
        <p className="text-base" style={{ color: "var(--text-bright)" }}>
          The security UX design system as exportable tokens. Copy to your design system.
        </p>
      </div>

      {/* Format toggle */}
      <div className="flex gap-1 mb-8 p-1 rounded-lg max-w-xs mx-auto" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {(["css", "json", "scss"] as const).map(f => (
          <button key={f} onClick={() => setFormat(f)} className="flex-1 text-xs py-1.5 rounded-md font-mono border-none cursor-pointer" style={{ background: format === f ? "var(--green-glow)" : "transparent", color: format === f ? "var(--green)" : "var(--text)" }}>
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Severity Scale */}
      <section className="mb-10">
        <h2 className="font-mono text-lg font-bold mb-2" style={{ color: "var(--text-bright)" }}>
          <Shield className="w-5 h-5 inline mr-2" style={{ color: "var(--green)" }} />
          Severity Scale
        </h2>
        <p className="text-xs mb-4" style={{ color: "var(--text)" }}>Consistent severity colors across all patterns. Maps to OWASP, CWE, and GDPR classifications.</p>
        <div className="space-y-2">
          {SEVERITY_TOKENS.map(t => <TokenCard key={t.name} token={t} format={format} />)}
        </div>
      </section>

      {/* Security States */}
      <section className="mb-10">
        <h2 className="font-mono text-lg font-bold mb-2" style={{ color: "var(--text-bright)" }}>
          <Lock className="w-5 h-5 inline mr-2" style={{ color: "var(--cyan)" }} />
          Security States
        </h2>
        <p className="text-xs mb-4" style={{ color: "var(--text)" }}>Visual indicators for encryption, authentication, and session status.</p>
        <div className="space-y-2">
          {STATE_TOKENS.map(t => <TokenCard key={t.name} token={t} format={format} />)}
        </div>
      </section>

      {/* Category Colors */}
      <section className="mb-10">
        <h2 className="font-mono text-lg font-bold mb-2" style={{ color: "var(--text-bright)" }}>
          Category Colors
        </h2>
        <p className="text-xs mb-4" style={{ color: "var(--text)" }}>Each pattern category has its own color for consistent navigation and identification.</p>
        <div className="space-y-2">
          {CATEGORY_TOKENS.map(t => <TokenCard key={t.name} token={t} format={format} />)}
        </div>
      </section>

      {/* Touch Targets & Spacing */}
      <section className="mb-10">
        <h2 className="font-mono text-lg font-bold mb-2" style={{ color: "var(--text-bright)" }}>
          <Fingerprint className="w-5 h-5 inline mr-2" style={{ color: "#f97316" }} />
          Touch Targets & Spacing
        </h2>
        <p className="text-xs mb-4" style={{ color: "var(--text)" }}>Minimum sizes for different contexts — web WCAG vs industrial gloved operation vs emergency buttons.</p>
        <div className="space-y-2">
          {SPACING_TOKENS.map(t => <TokenCard key={t.name} token={t} format={format} />)}
        </div>

        {/* Visual comparison */}
        <div className="mt-4 p-4 rounded-lg border flex items-end gap-4" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
          <div className="text-center">
            <div className="border-2 border-dashed rounded flex items-center justify-center font-mono text-xs" style={{ width: 44, height: 44, borderColor: "var(--green)", color: "var(--green)" }}>44px</div>
            <p className="text-xs mt-1" style={{ color: "var(--text)" }}>WCAG</p>
          </div>
          <div className="text-center">
            <div className="border-2 border-dashed rounded flex items-center justify-center font-mono text-xs" style={{ width: 53, height: 53, borderColor: "#f97316", color: "#f97316" }}>53px</div>
            <p className="text-xs mt-1" style={{ color: "var(--text)" }}>Gloved</p>
          </div>
          <div className="text-center">
            <div className="border-2 border-dashed rounded flex items-center justify-center font-mono text-xs" style={{ width: 76, height: 76, borderColor: "var(--red)", color: "var(--red)" }}>76px</div>
            <p className="text-xs mt-1" style={{ color: "var(--text)" }}>Emergency</p>
          </div>
        </div>
      </section>

      {/* Alarm Colors (ISA-18.2) */}
      <section className="mb-10">
        <h2 className="font-mono text-lg font-bold mb-2" style={{ color: "var(--text-bright)" }}>
          <AlertTriangle className="w-5 h-5 inline mr-2" style={{ color: "var(--amber)" }} />
          Alarm Priority Colors (ISA-18.2)
        </h2>
        <p className="text-xs mb-4" style={{ color: "var(--text)" }}>Industrial alarm management colors following ISA-18.2 / IEC 62682 standards.</p>
        <div className="space-y-2">
          {ALARM_TOKENS.map(t => <TokenCard key={t.name} token={t} format={format} />)}
        </div>
      </section>

      {/* Export all */}
      <div className="border rounded-xl p-6 text-center" style={{ borderColor: "var(--green-border)", background: "var(--green-glow)" }}>
        <p className="font-mono text-sm mb-2" style={{ color: "var(--green)" }}>Export to your design system</p>
        <p className="text-xs mb-4" style={{ color: "var(--text)" }}>Click any token to copy. Or grab the full set from the repo: <code className="text-xs font-mono px-1 py-0.5 rounded" style={{ background: "var(--bg-card)", color: "var(--text-bright)" }}>src/data/tokens.ts</code></p>
      </div>
    </div>
  );
}
