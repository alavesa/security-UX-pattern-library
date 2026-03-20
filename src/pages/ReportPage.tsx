import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FileText, Download, Shield, AlertTriangle, CheckCircle2, Copy, CheckCheck } from "lucide-react";
import { ALL_PATTERNS } from "../data/patterns";

interface ReportQuestion {
  id: string;
  question: string;
  options: { label: string; value: string; patterns: string[]; risk: string }[];
}

const QUESTIONS: ReportQuestion[] = [
  {
    id: "data_type",
    question: "What type of user data does your product handle?",
    options: [
      { label: "Basic (email, name)", value: "basic", patterns: ["/patterns/auth/login", "/patterns/auth/password-strength"], risk: "medium" },
      { label: "Sensitive (health, financial, PII)", value: "sensitive", patterns: ["/patterns/auth/login", "/patterns/auth/mfa", "/patterns/auth/password-strength", "/patterns/data/encryption", "/patterns/data/deletion"], risk: "high" },
      { label: "Minimal (anonymous usage)", value: "minimal", patterns: ["/patterns/auth/login"], risk: "low" },
    ],
  },
  {
    id: "region",
    question: "Where are your users based?",
    options: [
      { label: "EU / EEA", value: "eu", patterns: ["/patterns/dark/cookie-consent", "/patterns/data/deletion", "/patterns/threat/breach-notification"], risk: "high" },
      { label: "US", value: "us", patterns: ["/patterns/dark/forced-continuity", "/patterns/dark/hidden-unsubscribe"], risk: "medium" },
      { label: "Global", value: "global", patterns: ["/patterns/dark/cookie-consent", "/patterns/data/deletion", "/patterns/threat/breach-notification", "/patterns/dark/forced-continuity"], risk: "high" },
    ],
  },
  {
    id: "ai",
    question: "Does your product use AI?",
    options: [
      { label: "Yes — user-facing AI (chatbot, recommendations)", value: "user_facing", patterns: ["/patterns/ai/disclosure", "/patterns/ai/content-labeling", "/patterns/ai/decision-explanation"], risk: "high" },
      { label: "Yes — backend only (no user interaction)", value: "backend", patterns: ["/patterns/ai/decision-explanation"], risk: "medium" },
      { label: "No AI", value: "none", patterns: [], risk: "low" },
    ],
  },
  {
    id: "auth",
    question: "How critical is account security?",
    options: [
      { label: "High — handles payments or sensitive actions", value: "high", patterns: ["/patterns/auth/mfa", "/patterns/auth/session-timeout", "/patterns/auth/account-recovery", "/patterns/threat/suspicious-activity", "/patterns/owasp/broken-access-control"], risk: "high" },
      { label: "Medium — standard user accounts", value: "medium", patterns: ["/patterns/auth/mfa", "/patterns/auth/session-timeout", "/patterns/auth/account-recovery"], risk: "medium" },
      { label: "Low — optional accounts or read-only", value: "low", patterns: ["/patterns/auth/login", "/patterns/auth/password-strength"], risk: "low" },
    ],
  },
  {
    id: "team",
    question: "What's your team's security UX maturity?",
    options: [
      { label: "Just starting — no security UX practices", value: "starting", patterns: ["/patterns/owasp/security-misconfiguration", "/patterns/owasp/logging-monitoring"], risk: "high" },
      { label: "Some practices — basic auth + HTTPS", value: "some", patterns: ["/patterns/owasp/logging-monitoring", "/patterns/threat/breach-notification"], risk: "medium" },
      { label: "Advanced — existing security practices", value: "advanced", patterns: ["/patterns/owasp/logging-monitoring"], risk: "low" },
    ],
  },
  {
    id: "environment",
    question: "What environment does your product operate in?",
    options: [
      { label: "Industrial / OT (control systems, SCADA, manufacturing)", value: "industrial", patterns: ["/patterns/industrial/operator-auth", "/patterns/industrial/safety-critical", "/patterns/industrial/alarm-fatigue", "/patterns/owasp/broken-access-control", "/patterns/owasp/logging-monitoring"], risk: "critical" as string },
      { label: "Web / mobile application", value: "web", patterns: ["/patterns/dark/cookie-consent", "/patterns/dark/confirmshaming", "/patterns/data/encryption"], risk: "medium" },
      { label: "Internal / enterprise tool", value: "internal", patterns: ["/patterns/owasp/broken-access-control", "/patterns/owasp/security-misconfiguration", "/patterns/auth/session-timeout"], risk: "medium" },
    ],
  },
];

export function ReportPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  const report = useMemo(() => {
    if (!allAnswered) return null;

    // Collect all recommended patterns (deduplicated)
    const patternPaths = new Set<string>();
    let highRiskCount = 0;

    for (const q of QUESTIONS) {
      const selected = q.options.find(o => o.value === answers[q.id]);
      if (selected) {
        selected.patterns.forEach(p => patternPaths.add(p));
        if (selected.risk === "high") highRiskCount++;
      }
    }

    const patterns = ALL_PATTERNS.filter(p => patternPaths.has(p.path));
    const riskLevel = highRiskCount >= 3 ? "HIGH" : highRiskCount >= 1 ? "MEDIUM" : "LOW";

    // Group by category
    const byCategory = new Map<string, typeof patterns>();
    for (const p of patterns) {
      const existing = byCategory.get(p.category) ?? [];
      existing.push(p);
      byCategory.set(p.category, existing);
    }

    return { patterns, riskLevel, byCategory, highRiskCount };
  }, [answers, allAnswered]);

  const generateMarkdown = () => {
    if (!report) return "";

    const lines: string[] = [];
    lines.push("# Security UX Report");
    lines.push(`Generated by uxsec.dev — ${new Date().toLocaleDateString()}`);
    lines.push("");
    lines.push(`## Risk Level: ${report.riskLevel}`);
    lines.push(`${report.patterns.length} patterns recommended across ${report.byCategory.size} categories.`);
    lines.push("");

    lines.push("## Answers");
    for (const q of QUESTIONS) {
      const selected = q.options.find(o => o.value === answers[q.id]);
      lines.push(`- **${q.question}** → ${selected?.label}`);
    }
    lines.push("");

    lines.push("## Recommended Patterns");
    lines.push("");
    lines.push("### Priority Order");
    lines.push("");

    let priority = 1;
    // High risk patterns first
    for (const p of report.patterns) {
      lines.push(`${priority}. **${p.label}** (${p.category}) — ${p.tags.slice(0, 3).join(", ")}`);
      lines.push(`   → https://uxsec.dev${p.path}`);
      priority++;
    }

    lines.push("");
    lines.push("## Next Steps");
    lines.push("");
    lines.push("1. Start with the first 3 patterns — they address your highest-risk areas");
    lines.push("2. Run the Security UX Score to benchmark: https://uxsec.dev/score");
    lines.push("3. Check the Compliance Mapper for your specific regulations: https://uxsec.dev/compliance");
    lines.push("4. Assess your team's maturity: https://uxsec.dev/maturity");
    lines.push("");
    lines.push("---");
    lines.push("Generated by uxsec.dev — Security UX Pattern Library");
    lines.push("By Piia Alavesa — M.Sc. Cyber Security + M.Sc. Information Systems");

    return lines.join("\n");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = generateMarkdown();
    const blob = new Blob([text], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `security-ux-report-${new Date().toISOString().split("T")[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-mono mb-3 glow-text">Security UX Report</h1>
        <p className="text-base" style={{ color: "var(--text-bright)" }}>
          Answer 6 questions. Get a custom report with prioritized patterns for your product.
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-6 mb-8">
        {QUESTIONS.map((q, qi) => (
          <div key={q.id} className="border rounded-xl p-6" style={{
            borderColor: answers[q.id] ? "var(--green-border)" : "var(--border)",
            background: "var(--bg-card)",
          }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "var(--bg-elevated)", color: "var(--text)" }}>{qi + 1}/{QUESTIONS.length}</span>
            </div>
            <h3 className="font-mono text-sm font-semibold mb-4" style={{ color: "var(--text-bright)" }}>{q.question}</h3>
            <div className="space-y-2">
              {q.options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt.value }))}
                  className="w-full flex items-center justify-between p-3 rounded-lg text-left transition-all border-none cursor-pointer"
                  style={{
                    background: answers[q.id] === opt.value ? "var(--green-glow)" : "var(--bg-elevated)",
                    outline: answers[q.id] === opt.value ? "2px solid var(--green)" : "none",
                  }}
                >
                  <span className="text-xs font-mono" style={{ color: answers[q.id] === opt.value ? "var(--text-bright)" : "var(--text)" }}>{opt.label}</span>
                  <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                    opt.risk === "high" ? "text-red-400" : opt.risk === "medium" ? "text-amber-400" : "text-green-400"
                  }`} style={{ background: opt.risk === "high" ? "rgba(255,51,51,0.1)" : opt.risk === "medium" ? "rgba(255,170,0,0.1)" : "rgba(0,255,65,0.1)" }}>
                    {opt.risk}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Generate button */}
      {!allAnswered && (
        <div className="text-center py-4">
          <p className="font-mono text-xs" style={{ color: "var(--text)" }}>
            Answer all questions ({Object.keys(answers).length}/{QUESTIONS.length})
          </p>
        </div>
      )}

      {/* Report results */}
      {allAnswered && report && (
        <div className="space-y-6">
          {/* Risk summary */}
          <div className="border rounded-2xl p-8 text-center" style={{
            borderColor: report.riskLevel === "HIGH" ? "var(--red)" : report.riskLevel === "MEDIUM" ? "var(--amber)" : "var(--green)",
            background: report.riskLevel === "HIGH" ? "rgba(255,51,51,0.05)" : report.riskLevel === "MEDIUM" ? "rgba(255,170,0,0.05)" : "rgba(0,255,65,0.05)",
          }}>
            <div className="text-4xl font-mono font-bold mb-2" style={{
              color: report.riskLevel === "HIGH" ? "var(--red)" : report.riskLevel === "MEDIUM" ? "var(--amber)" : "var(--green)",
            }}>
              {report.riskLevel} RISK
            </div>
            <p className="text-sm" style={{ color: "var(--text-bright)" }}>
              {report.patterns.length} patterns recommended across {report.byCategory.size} categories
            </p>
          </div>

          {/* Pattern list */}
          <div className="border rounded-xl p-6" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
            <h3 className="font-mono text-sm font-semibold mb-4" style={{ color: "var(--text-bright)" }}>
              <FileText className="w-4 h-4 inline mr-2" />
              Your prioritized pattern list
            </h3>
            <div className="space-y-2">
              {report.patterns.map((pattern, i) => (
                <Link
                  key={pattern.path}
                  to={pattern.path}
                  className="flex items-center justify-between p-3 rounded-lg no-underline transition-all"
                  style={{ background: "var(--bg-elevated)" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono w-6 text-center" style={{ color: i < 3 ? "var(--red)" : "var(--text)" }}>{i + 1}</span>
                    <div>
                      <p className="font-mono text-sm" style={{ color: "var(--text-bright)" }}>{pattern.label}</p>
                      <p className="text-xs" style={{ color: "#555" }}>{pattern.tags.slice(0, 3).join(" · ")}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${pattern.categoryColor}15`, color: pattern.categoryColor }}>
                    {pattern.category}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Next steps */}
          <div className="border rounded-xl p-6" style={{ borderColor: "var(--green-border)", background: "var(--green-glow)" }}>
            <h3 className="font-mono text-sm font-semibold mb-3" style={{ color: "var(--green)" }}>
              <CheckCircle2 className="w-4 h-4 inline mr-2" />
              Next steps
            </h3>
            <ol className="space-y-2 text-xs" style={{ color: "var(--text-bright)" }}>
              <li>1. Start with the top 3 patterns — they address your highest-risk areas</li>
              <li>2. <Link to="/score" className="underline" style={{ color: "var(--green)" }}>Run the Security UX Score</Link> to benchmark your current state</li>
              <li>3. <Link to="/compliance" className="underline" style={{ color: "var(--cyan)" }}>Check the Compliance Mapper</Link> for your specific regulations</li>
              <li>4. <Link to="/maturity" className="underline" style={{ color: "var(--amber)" }}>Assess your maturity</Link> and create a roadmap</li>
            </ol>
          </div>

          {/* Export buttons */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm border-none cursor-pointer"
              style={{ background: "var(--green)", color: "var(--bg)" }}
            >
              <Download className="w-4 h-4" /> Download .md report
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm border cursor-pointer"
              style={{ borderColor: "var(--border)", color: "var(--text-bright)", background: "var(--bg-card)" }}
            >
              {copied ? <><CheckCheck className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy to clipboard</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
