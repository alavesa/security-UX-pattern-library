import { useState } from "react";
import { Shield, Lock, AlertTriangle, Bell, CheckCircle2, XCircle, Copy, CheckCheck } from "lucide-react";

interface ComponentSpec {
  name: string;
  description: string;
  props: { name: string; type: string; default?: string; description: string }[];
  code: string;
  preview: React.ReactNode;
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };
  return (
    <div className="relative rounded-lg overflow-hidden" style={{ background: "#111" }}>
      <button onClick={handleCopy} className="absolute top-2 right-2 bg-transparent border-none cursor-pointer" style={{ color: "#555" }}>
        {copied ? <CheckCheck className="w-3.5 h-3.5" style={{ color: "var(--green)" }} /> : <Copy className="w-3.5 h-3.5" />}
      </button>
      <pre className="p-4 text-xs font-mono overflow-x-auto" style={{ color: "var(--text-bright)" }}>{code}</pre>
    </div>
  );
}

const COMPONENTS: ComponentSpec[] = [
  {
    name: "SecurityBadge",
    description: "Displays severity level as a colored badge. Used across all patterns for consistent risk communication.",
    props: [
      { name: "severity", type: "'critical' | 'high' | 'medium' | 'low'", description: "Risk level to display" },
      { name: "label", type: "string", default: "severity.toUpperCase()", description: "Custom label text" },
    ],
    code: `<SecurityBadge severity="critical" />
<SecurityBadge severity="high" />
<SecurityBadge severity="medium" />
<SecurityBadge severity="low" label="Safe" />`,
    preview: (
      <div className="flex gap-2 flex-wrap">
        {[
          { s: "critical", bg: "rgba(255,51,51,0.15)", c: "#ff3333", b: "rgba(255,51,51,0.3)" },
          { s: "high", bg: "rgba(255,170,0,0.15)", c: "#ffaa00", b: "rgba(255,170,0,0.3)" },
          { s: "medium", bg: "rgba(0,229,255,0.15)", c: "#00e5ff", b: "rgba(0,229,255,0.3)" },
          { s: "low", bg: "rgba(0,255,65,0.15)", c: "#00ff41", b: "rgba(0,255,65,0.3)" },
        ].map(({ s, bg, c, b }) => (
          <span key={s} className="text-xs font-mono font-semibold px-2.5 py-1 rounded tracking-wide" style={{ background: bg, color: c, border: `1px solid ${b}` }}>
            {s.toUpperCase()}
          </span>
        ))}
      </div>
    ),
  },
  {
    name: "EncryptionStatus",
    description: "Shows encryption level with icon, label, and description. Three states: E2E, encrypted at-rest, not encrypted.",
    props: [
      { name: "level", type: "'e2e' | 'encrypted' | 'none'", description: "Encryption level" },
      { name: "detail", type: "string", description: "Additional context about what's protected" },
    ],
    code: `<EncryptionStatus level="e2e" detail="Only you and the recipient can read this" />
<EncryptionStatus level="encrypted" detail="Encrypted at rest with AES-256" />
<EncryptionStatus level="none" detail="Data stored in plaintext" />`,
    preview: (
      <div className="space-y-2 w-full">
        {[
          { level: "E2E Encrypted", color: "#00ff41", icon: <Shield className="w-4 h-4" /> },
          { level: "Encrypted", color: "#00e5ff", icon: <Lock className="w-4 h-4" /> },
          { level: "Not encrypted", color: "#ff3333", icon: <AlertTriangle className="w-4 h-4" /> },
        ].map(({ level, color, icon }) => (
          <div key={level} className="flex items-center gap-2 px-3 py-2 rounded" style={{ background: `${color}10`, border: `1px solid ${color}30` }}>
            <span style={{ color }}>{icon}</span>
            <span className="text-xs font-mono" style={{ color }}>{level}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "AlarmEntry",
    description: "Single alarm item for industrial HMI displays. Supports 4 priority levels, acknowledge, and shelve actions.",
    props: [
      { name: "priority", type: "'critical' | 'high' | 'medium' | 'low'", description: "ISA-18.2 alarm priority" },
      { name: "message", type: "string", description: "Alarm description text" },
      { name: "tag", type: "string", description: "Equipment tag identifier" },
      { name: "acknowledged", type: "boolean", default: "false", description: "Whether operator has acknowledged" },
      { name: "onAcknowledge", type: "() => void", description: "Callback when ACK button pressed" },
      { name: "onShelve", type: "() => void", description: "Callback when shelve button pressed" },
    ],
    code: `<AlarmEntry
  priority="critical"
  message="REACTOR R-101 HIGH PRESSURE TRIP"
  tag="PSH-101R"
  acknowledged={false}
  onAcknowledge={() => handleAck(id)}
  onShelve={() => handleShelve(id)}
/>`,
    preview: (
      <div className="w-full space-y-1 font-mono text-xs" style={{ background: "#111", borderRadius: 8, padding: 12 }}>
        <div className="flex items-center gap-2 p-2 rounded" style={{ background: "#7f1d1d" }}>
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span style={{ color: "#fca5a5" }}>CRITICAL</span>
          <span style={{ color: "#e5e7eb" }}>REACTOR HIGH PRESSURE</span>
          <span className="ml-auto px-2 py-0.5 rounded text-xs" style={{ background: "#374151", color: "#9ca3af" }}>ACK</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded" style={{ background: "#78350f" }}>
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span style={{ color: "#fde68a" }}>HIGH</span>
          <span style={{ color: "#e5e7eb" }}>Pressure rising</span>
          <span className="ml-auto px-2 py-0.5 rounded text-xs" style={{ background: "#374151", color: "#9ca3af" }}>ACK</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded opacity-50" style={{ background: "#111" }}>
          <CheckCircle2 className="w-3 h-3" style={{ color: "#4b5563" }} />
          <span style={{ color: "#6b7280" }}>LOW</span>
          <span style={{ color: "#6b7280" }}>Tank level normal</span>
        </div>
      </div>
    ),
  },
  {
    name: "ConsentToggle",
    description: "GDPR-compliant permission toggle with explanation. Supports required (locked on) and optional states.",
    props: [
      { name: "label", type: "string", description: "Permission name" },
      { name: "description", type: "string", description: "Why this permission is needed" },
      { name: "required", type: "boolean", default: "false", description: "If true, toggle is locked on" },
      { name: "checked", type: "boolean", description: "Current state" },
      { name: "onChange", type: "(checked: boolean) => void", description: "Toggle callback" },
    ],
    code: `<ConsentToggle
  label="Analytics cookies"
  description="Help us understand how you use the site"
  required={false}
  checked={analyticsEnabled}
  onChange={setAnalyticsEnabled}
/>`,
    preview: (
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between p-3 rounded-lg border border-blue-200 bg-blue-50">
          <div>
            <span className="text-sm font-medium text-gray-900">Essential cookies</span>
            <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded ml-2">Required</span>
            <p className="text-xs text-gray-500">Required for the site to function</p>
          </div>
          <div className="w-10 h-5 bg-blue-600 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5" /></div>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
          <div>
            <span className="text-sm font-medium text-gray-900">Analytics</span>
            <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded ml-2">Optional</span>
            <p className="text-xs text-gray-500">Help us improve the site</p>
          </div>
          <div className="w-10 h-5 bg-gray-300 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5" /></div>
        </div>
      </div>
    ),
  },
];

export function ComponentsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-mono mb-3 glow-text">Component API</h1>
        <p className="text-base" style={{ color: "var(--text-bright)" }}>
          Reusable component specs for your design system. Copy the API, adapt to your stack.
        </p>
      </div>

      <div className="space-y-12">
        {COMPONENTS.map(comp => (
          <div key={comp.name} className="border rounded-xl overflow-hidden" style={{ borderColor: "var(--border)" }}>
            {/* Header */}
            <div className="px-6 py-4 border-b" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
              <h2 className="font-mono text-lg font-bold" style={{ color: "var(--green)" }}>&lt;{comp.name} /&gt;</h2>
              <p className="text-xs mt-1" style={{ color: "var(--text)" }}>{comp.description}</p>
            </div>

            {/* Preview */}
            <div className="px-6 py-6 border-b flex items-center justify-center" style={{ borderColor: "var(--border)", background: "var(--bg-elevated)" }}>
              <div className="max-w-sm w-full">{comp.preview}</div>
            </div>

            {/* Props table */}
            <div className="px-6 py-4 border-b" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
              <h3 className="font-mono text-xs font-semibold mb-3" style={{ color: "var(--text-bright)" }}>Props</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ color: "#555" }}>
                      <th className="text-left font-mono py-1 pr-4">Prop</th>
                      <th className="text-left font-mono py-1 pr-4">Type</th>
                      <th className="text-left font-mono py-1 pr-4">Default</th>
                      <th className="text-left font-mono py-1">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comp.props.map(prop => (
                      <tr key={prop.name} className="border-t" style={{ borderColor: "var(--border)" }}>
                        <td className="font-mono py-2 pr-4" style={{ color: "var(--green)" }}>{prop.name}</td>
                        <td className="font-mono py-2 pr-4" style={{ color: "var(--cyan)" }}>{prop.type}</td>
                        <td className="font-mono py-2 pr-4" style={{ color: "#555" }}>{prop.default ?? "—"}</td>
                        <td className="py-2" style={{ color: "var(--text)" }}>{prop.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Code example */}
            <div className="px-6 py-4" style={{ background: "var(--bg-card)" }}>
              <h3 className="font-mono text-xs font-semibold mb-2" style={{ color: "var(--text-bright)" }}>Usage</h3>
              <CodeBlock code={comp.code} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
