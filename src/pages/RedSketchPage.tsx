import { useState } from "react";
import { Crosshair, Terminal, Shield, FileSearch, AlertTriangle, ExternalLink, Copy, CheckCheck, Github } from "lucide-react";

const SAMPLE_OUTPUT = `  ██████╗ ███████╗██████╗ ███████╗██╗  ██╗███████╗████████╗ ██████╗██╗  ██╗
  ██╔══██╗██╔════╝██╔══██╗██╔════╝██║ ██╔╝██╔════╝╚══██╔══╝██╔════╝██║  ██║
  ██████╔╝█████╗  ██║  ██║███████╗█████╔╝ █████╗     ██║   ██║     ███████║
  ██╔══██╗██╔══╝  ██║  ██║╚════██║██╔═██╗ ██╔══╝     ██║   ██║     ██╔══██║
  ██║  ██║███████╗██████╔╝███████║██║  ██╗███████╗   ██║   ╚██████╗██║  ██║
  ╚═╝  ╚═╝╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝    ╚═════╝╚═╝  ╚═╝

● Parsing Figma URL...
● Reading Figma design...
✓ Found 335 nodes, 187 text elements, 12 components
● Analyzing design for security threats...

════════════════════════════════════════════════════════════
  RedSketch — Figma Threat Model Report
════════════════════════════════════════════════════════════

Assets Identified

  🟡 Contact Section with Plain-Text Email [data-display] MEDIUM
  🟡 Personal Information Aggregation [data-display] MEDIUM
  🔵 Project Portfolio Grid with External Links [navigation] LOW
  🔵 Project Filter with Debug Placeholder [other] LOW

STRIDE Threat Analysis

  👁 Plain-Text Email Harvested by Scrapers (information-disclosure) MEDIUM
  👤 Portfolio Impersonation via Phishing Clone (spoofing) MEDIUM
  🔧 Unvalidated External Link Destinations (tampering) LOW
  👁 Development Placeholder Text Exposed (information-disclosure) LOW

Matched Security UX Patterns

  ✅ Cookie Consent (directly-applicable) → uxsec.dev/patterns/dark/cookie-consent
  ⭐ AI Disclosure (recommended) → uxsec.dev/patterns/ai/disclosure
  ⭐ Encryption Indicators (recommended) → uxsec.dev/patterns/data/encryption
  💡 Phishing Warning (consider) → uxsec.dev/patterns/threat/phishing-warning

Compliance Gaps

  🟡 GDPR — No cookie consent banner MEDIUM
  🔵 EU AI Act — Insufficient AI disclosure LOW
  🔵 WCAG 2.2 — Emoji-based controls need ARIA labels LOW

════════════════════════════════════════════════════════════
  Risk Score:  LOW
  5 assets · 7 threats · 7 patterns · 5 compliance gaps
════════════════════════════════════════════════════════════

Cost Summary
  ThreatModel    6,333 in / 13,925 out $0.2279`;

const INSTALL_CMD = "npm install -g redsketch";
const SCAN_CMD = 'redsketch scan "https://figma.com/design/abc123/MyApp?node-id=1-234"';

export function RedSketchPage() {
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedScan, setCopiedScan] = useState(false);

  const copyToClipboard = (text: string, setter: (v: boolean) => void) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setter(true);
        setTimeout(() => setter(false), 2000);
      }).catch(() => {});
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold font-mono mb-3" style={{ color: "var(--red, #ff3333)" }}>
          RedSketch
        </h1>
        <p className="text-base font-mono" style={{ color: "var(--text-bright)" }}>
          Threat-model your Figma designs before writing a single line of code
        </p>
        <p className="text-sm mt-3 font-mono" style={{ color: "var(--text)" }}>
          A CLI tool that reads Figma files and generates security threat models using STRIDE — the industry-standard framework covering Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege.
          <br />
          Powered by Claude AI and the 34 patterns from this library.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { value: "34", label: "Patterns", color: "var(--green)" },
          { value: "19", label: "Regulations", color: "var(--cyan)" },
          { value: "6", label: "STRIDE categories", color: "var(--amber)" },
          { value: "~$0.15–0.50", label: "Per scan", color: "var(--ai-color)" },
        ].map(({ value, label, color }) => (
          <div
            key={label}
            className="rounded-lg p-4 text-center font-mono"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <div className="text-2xl font-bold mb-1" style={{ color }}>{value}</div>
            <div className="text-xs" style={{ color: "var(--text-dim)" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="mb-12">
        <h2 className="text-lg font-bold font-mono mb-6" style={{ color: "var(--text-bright)" }}>
          How It Works
        </h2>
        <div className="grid gap-4">
          {[
            { icon: FileSearch, step: "1", title: "Reads your Figma design", desc: "Parses the node hierarchy, component names, and text content via the Figma REST API", color: "var(--cyan)" },
            { icon: Crosshair, step: "2", title: "Identifies security-relevant assets", desc: "Login forms, data inputs, file uploads, payment flows, consent screens, admin panels, AI features", color: "var(--red, #ff3333)" },
            { icon: Shield, step: "3", title: "Generates STRIDE threat analysis", desc: "Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege", color: "var(--amber)" },
            { icon: AlertTriangle, step: "4", title: "Maps to patterns and regulations", desc: "Matches findings against 34 Security UX patterns from this library and flags compliance gaps across 19 regulations", color: "var(--green)" },
          ].map(({ icon: Icon, step, title, desc, color }) => (
            <div
              key={step}
              className="flex gap-4 items-start rounded-lg p-5"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm"
                style={{ background: `${color}15`, color, border: `1px solid ${color}33` }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono font-semibold text-sm mb-1" style={{ color: "var(--text-bright)" }}>{title}</h3>
                <p className="font-mono text-xs leading-relaxed" style={{ color: "var(--text)" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Install */}
      <div className="mb-12">
        <h2 className="text-lg font-bold font-mono mb-4" style={{ color: "var(--text-bright)" }}>
          Quick Start
        </h2>
        <div className="space-y-3">
          {/* Install command */}
          <div
            className="rounded-lg p-4 flex items-center justify-between"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <div className="font-mono text-sm overflow-x-auto" style={{ color: "var(--green)" }}>
              <span style={{ color: "var(--text-dim)" }}>$</span> {INSTALL_CMD}
            </div>
            <button
              onClick={() => copyToClipboard(INSTALL_CMD, setCopiedInstall)}
              className="flex-shrink-0 ml-3 p-1.5 rounded border-none cursor-pointer"
              style={{ background: "transparent", color: copiedInstall ? "var(--green)" : "var(--text-dim)" }}
            >
              {copiedInstall ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Scan command */}
          <div
            className="rounded-lg p-4 flex items-center justify-between"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <div className="font-mono text-sm overflow-x-auto" style={{ color: "var(--green)" }}>
              <span style={{ color: "var(--text-dim)" }}>$</span> {SCAN_CMD}
            </div>
            <button
              onClick={() => copyToClipboard(SCAN_CMD, setCopiedScan)}
              className="flex-shrink-0 ml-3 p-1.5 rounded border-none cursor-pointer"
              style={{ background: "transparent", color: copiedScan ? "var(--green)" : "var(--text-dim)" }}
            >
              {copiedScan ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <p className="font-mono text-xs mt-3" style={{ color: "var(--text-dim)" }}>
          Requires <span style={{ color: "var(--text)" }}>ANTHROPIC_API_KEY</span> and <span style={{ color: "var(--text)" }}>FIGMA_ACCESS_TOKEN</span> environment variables.
        </p>
      </div>

      {/* CLI options */}
      <div className="mb-12">
        <h2 className="text-lg font-bold font-mono mb-4" style={{ color: "var(--text-bright)" }}>
          CLI Options
        </h2>
        <div
          className="rounded-lg p-5 font-mono text-xs leading-relaxed overflow-x-auto"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text)" }}
        >
          <div className="mb-2" style={{ color: "var(--text-dim)" }}># Focus on specific regulations</div>
          <div style={{ color: "var(--green)" }}>$ redsketch scan {"<url>"} --regulations gdpr,nis2,pci</div>
          <div className="mt-3 mb-2" style={{ color: "var(--text-dim)" }}># JSON output for CI/CD pipelines</div>
          <div style={{ color: "var(--green)" }}>$ redsketch scan {"<url>"} --json</div>
          <div className="mt-3 mb-2" style={{ color: "var(--text-dim)" }}># Save report to file</div>
          <div style={{ color: "var(--green)" }}>$ redsketch scan {"<url>"} --output report.json</div>
          <div className="mt-3 mb-2" style={{ color: "var(--text-dim)" }}># Watch AI thinking in real-time</div>
          <div style={{ color: "var(--green)" }}>$ redsketch scan {"<url>"} --verbose</div>
        </div>
      </div>

      {/* Sample output */}
      <div className="mb-12">
        <h2 className="text-lg font-bold font-mono mb-4" style={{ color: "var(--text-bright)" }}>
          Sample Output
        </h2>
        <div
          className="rounded-lg p-5 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre"
          style={{
            background: "var(--bg)",
            border: "1px solid var(--border)",
            color: "var(--green)",
            maxHeight: "500px",
            overflowY: "auto",
          }}
        >
          {SAMPLE_OUTPUT}
        </div>
        <p className="font-mono text-xs mt-2" style={{ color: "var(--text-dim)" }}>
          Real scan output from a personal portfolio Figma design.
        </p>
      </div>

      {/* Regulations */}
      <div className="mb-12">
        <h2 className="text-lg font-bold font-mono mb-4" style={{ color: "var(--text-bright)" }}>
          19 Regulations Checked
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            "GDPR", "CCPA", "SOC 2", "ISO 27001", "PCI DSS 4.0",
            "FTC Act", "EU AI Act", "US AI Laws", "NIS2", "DORA",
            "CRA", "EAA", "IEC 62443", "IEC 61511", "ISA-18.2",
            "ISA-101", "WCAG 2.2", "WebAuthn", "ISO/IEC 42001",
          ].map((reg) => (
            <span
              key={reg}
              className="font-mono text-xs px-2.5 py-1 rounded"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text)" }}
            >
              {reg}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="rounded-lg p-8 text-center"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <Terminal className="w-8 h-8 mx-auto mb-4" style={{ color: "var(--red, #ff3333)" }} />
        <h2 className="font-mono font-bold text-lg mb-2" style={{ color: "var(--text-bright)" }}>
          Get RedSketch
        </h2>
        <p className="font-mono text-sm mb-6" style={{ color: "var(--text)" }}>
          Open source. MIT licensed. One command to install.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://github.com/alavesa/RedSketch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-mono text-sm no-underline border-none cursor-pointer"
            style={{ background: "var(--red, #ff3333)", color: "var(--bg)" }}
          >
            <Github className="w-4 h-4" /> View on GitHub <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.npmjs.com/package/redsketch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-mono text-sm no-underline cursor-pointer"
            style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--text-bright)" }}
          >
            npm install redsketch <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
