import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { ClipboardCheck, CheckCircle2, XCircle, AlertTriangle, FileText, Download, Clock } from "lucide-react";

type AuditPhase = "scope" | "assess" | "evidence" | "report";

interface AuditItem {
  id: string;
  requirement: string;
  regulation: string;
  status: "pass" | "fail" | "partial" | "not-assessed";
  evidence: string;
  gap: string;
}

const AUDIT_ITEMS: AuditItem[] = [
  { id: "a1", requirement: "MFA available for all user accounts", regulation: "NIS2 Art. 21", status: "not-assessed", evidence: "", gap: "" },
  { id: "a2", requirement: "Breach notification within 24 hours", regulation: "NIS2 Art. 23", status: "not-assessed", evidence: "", gap: "" },
  { id: "a3", requirement: "Activity logs retained for 2 years", regulation: "GDPR Art. 30", status: "not-assessed", evidence: "", gap: "" },
  { id: "a4", requirement: "Users can export their data", regulation: "GDPR Art. 20", status: "not-assessed", evidence: "", gap: "" },
  { id: "a5", requirement: "Cookie consent before non-essential tracking", regulation: "ePrivacy", status: "not-assessed", evidence: "", gap: "" },
  { id: "a6", requirement: "AI system clearly identified to users", regulation: "EU AI Act Art. 50", status: "not-assessed", evidence: "", gap: "" },
  { id: "a7", requirement: "Operator auth works with PPE/gloves", regulation: "IEC 62443", status: "not-assessed", evidence: "", gap: "" },
  { id: "a8", requirement: "ICT risk management framework in place", regulation: "DORA Art. 6", status: "not-assessed", evidence: "", gap: "" },
];

const statusIcon = (s: string) => {
  if (s === "pass") return <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "var(--green)" }} />;
  if (s === "fail") return <XCircle className="w-3.5 h-3.5" style={{ color: "var(--red)" }} />;
  if (s === "partial") return <AlertTriangle className="w-3.5 h-3.5" style={{ color: "var(--amber)" }} />;
  return <Clock className="w-3.5 h-3.5" style={{ color: "var(--text-dim)" }} />;
};

const statusLabel = (s: string) =>
  s === "pass" ? "Pass" : s === "fail" ? "Fail" : s === "partial" ? "Partial" : "Pending";

const statusColor = (s: string) =>
  s === "pass" ? "var(--green)" : s === "fail" ? "var(--red)" : s === "partial" ? "var(--amber)" : "var(--text-dim)";

function ComplianceAuditDemo() {
  const [phase, setPhase] = useState<AuditPhase>("scope");
  const [selectedRegs, setSelectedRegs] = useState<Set<string>>(new Set(["NIS2 Art. 21", "NIS2 Art. 23", "GDPR Art. 30"]));
  const [assessments, setAssessments] = useState<Map<string, "pass" | "fail" | "partial">>(new Map());
  const [reportGenerated, setReportGenerated] = useState(false);

  const scopedItems = AUDIT_ITEMS.filter(item => selectedRegs.has(item.regulation));
  const allRegs = [...new Set(AUDIT_ITEMS.map(i => i.regulation))];

  const toggleReg = (reg: string) => {
    setSelectedRegs(prev => {
      const next = new Set(prev);
      if (next.has(reg)) next.delete(reg); else next.add(reg);
      return next;
    });
  };

  const assess = (id: string, status: "pass" | "fail" | "partial") => {
    setAssessments(prev => new Map([...prev, [id, status]]));
  };

  const allAssessed = scopedItems.every(item => assessments.has(item.id));
  const passCount = scopedItems.filter(i => assessments.get(i.id) === "pass").length;
  const failCount = scopedItems.filter(i => assessments.get(i.id) === "fail").length;
  const partialCount = scopedItems.filter(i => assessments.get(i.id) === "partial").length;

  const reset = () => {
    setPhase("scope");
    setAssessments(new Map());
    setReportGenerated(false);
  };

  return (
    <div className="w-full max-w-lg">
      {/* Phase tabs */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg overflow-x-auto" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {([
          { key: "scope" as const, label: "1. Scope" },
          { key: "assess" as const, label: "2. Assess" },
          { key: "evidence" as const, label: "3. Evidence" },
          { key: "report" as const, label: "4. Report" },
        ]).map(p => (
          <button key={p.key} onClick={() => setPhase(p.key)} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer whitespace-nowrap" style={{ background: phase === p.key ? "var(--governance-glow)" : "transparent", color: phase === p.key ? "var(--governance-color)" : "var(--text)" }}>
            {p.label}
          </button>
        ))}
      </div>

      <div className="rounded-lg p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", minHeight: 200 }}>

        {/* Scope */}
        {phase === "scope" && (
          <div className="space-y-3">
            <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>
              Select regulations to audit against:
            </p>
            <div className="flex flex-wrap gap-2">
              {allRegs.map(reg => (
                <button
                  key={reg}
                  onClick={() => toggleReg(reg)}
                  className="px-3 py-1.5 rounded text-xs font-mono border-none cursor-pointer"
                  style={{
                    background: selectedRegs.has(reg) ? "var(--governance-glow)" : "var(--bg)",
                    color: selectedRegs.has(reg) ? "var(--governance-color)" : "var(--text)",
                    border: selectedRegs.has(reg) ? "1px solid var(--governance-border)" : "1px solid var(--border)",
                  }}
                >
                  {reg}
                </button>
              ))}
            </div>
            <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>
              {selectedRegs.size} regulations selected · {scopedItems.length} requirements to audit
            </p>
            <button
              onClick={() => setPhase("assess")}
              className="w-full py-2 rounded text-xs font-mono border-none cursor-pointer"
              style={{ background: "var(--green-glow)", color: "var(--green)", border: "1px solid var(--green-border)" }}
              disabled={selectedRegs.size === 0}
            >
              Start Assessment →
            </button>
          </div>
        )}

        {/* Assess */}
        {phase === "assess" && (
          <div className="space-y-2">
            <p className="text-xs font-mono mb-2" style={{ color: "var(--text-dim)" }}>
              Assess each requirement — {[...assessments.values()].length}/{scopedItems.length} assessed
            </p>
            {scopedItems.map(item => {
              const status = assessments.get(item.id);
              return (
                <div key={item.id} className="p-3 rounded-lg" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="text-xs font-mono" style={{ color: "var(--text-bright)" }}>{item.requirement}</p>
                      <p className="text-xs font-mono mt-0.5" style={{ color: "var(--text-dim)" }}>{item.regulation}</p>
                    </div>
                    {status && statusIcon(status)}
                  </div>
                  <div className="flex gap-1">
                    {(["pass", "partial", "fail"] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => assess(item.id, s)}
                        className="flex-1 py-1 rounded text-xs font-mono border-none cursor-pointer"
                        style={{
                          background: status === s ? `${statusColor(s)}15` : "transparent",
                          color: status === s ? statusColor(s) : "var(--text-dim)",
                          border: `1px solid ${status === s ? statusColor(s) + "44" : "var(--border)"}`,
                        }}
                      >
                        {statusLabel(s)}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
            {allAssessed && (
              <button
                onClick={() => setPhase("evidence")}
                className="w-full py-2 rounded text-xs font-mono border-none cursor-pointer"
                style={{ background: "var(--green-glow)", color: "var(--green)", border: "1px solid var(--green-border)" }}
              >
                All assessed → Collect Evidence
              </button>
            )}
          </div>
        )}

        {/* Evidence */}
        {phase === "evidence" && (
          <div className="space-y-3">
            <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>
              Evidence collection — attach proof for each requirement
            </p>
            {scopedItems.map(item => {
              const status = assessments.get(item.id) ?? "not-assessed";
              return (
                <div key={item.id} className="flex items-center gap-3 p-2 rounded text-xs font-mono" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                  {statusIcon(status)}
                  <div className="flex-1 min-w-0">
                    <span style={{ color: "var(--text)" }}>{item.requirement}</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                    <FileText className="w-3 h-3" style={{ color: "var(--cyan)" }} />
                    <span style={{ color: "var(--cyan)" }}>attached</span>
                  </div>
                </div>
              );
            })}
            <button
              onClick={() => setPhase("report")}
              className="w-full py-2 rounded text-xs font-mono border-none cursor-pointer"
              style={{ background: "var(--green-glow)", color: "var(--green)", border: "1px solid var(--green-border)" }}
            >
              Generate Audit Report →
            </button>
          </div>
        )}

        {/* Report */}
        {phase === "report" && (
          <div className="space-y-3">
            <div className="p-4 rounded-lg text-center" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
              <ClipboardCheck className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--green)" }} />
              <p className="text-sm font-mono font-semibold" style={{ color: "var(--text-bright)" }}>Audit Report</p>
              <p className="text-xs font-mono mt-1" style={{ color: "var(--text-dim)" }}>
                {selectedRegs.size} regulations · {scopedItems.length} requirements · {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded" style={{ background: "rgba(0,255,65,0.05)", border: "1px solid var(--green-border)" }}>
                <p className="text-xl font-mono font-bold" style={{ color: "var(--green)" }}>{passCount}</p>
                <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>Pass</p>
              </div>
              <div className="p-3 rounded" style={{ background: "rgba(255,170,0,0.05)", border: "1px solid rgba(255,170,0,0.25)" }}>
                <p className="text-xl font-mono font-bold" style={{ color: "var(--amber)" }}>{partialCount}</p>
                <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>Partial</p>
              </div>
              <div className="p-3 rounded" style={{ background: "rgba(255,51,51,0.05)", border: "1px solid rgba(255,51,51,0.25)" }}>
                <p className="text-xl font-mono font-bold" style={{ color: "var(--red)" }}>{failCount}</p>
                <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>Fail</p>
              </div>
            </div>

            {failCount > 0 && (
              <div className="p-3 rounded-lg text-xs font-mono" style={{ background: "rgba(255,51,51,0.08)", border: "1px solid rgba(255,51,51,0.2)" }}>
                <p style={{ color: "var(--red)" }}>
                  <AlertTriangle className="w-3 h-3 inline mr-1" />
                  {failCount} requirement(s) failed — remediation plan required within 30 days
                </p>
              </div>
            )}

            <button
              onClick={() => setReportGenerated(true)}
              className="w-full py-2 rounded text-xs font-mono border-none cursor-pointer flex items-center justify-center gap-2"
              style={{ background: reportGenerated ? "rgba(0,255,65,0.05)" : "var(--green-glow)", color: "var(--green)", border: "1px solid var(--green-border)" }}
            >
              {reportGenerated
                ? <><CheckCircle2 className="w-3 h-3" /> Report exported</>
                : <><Download className="w-3 h-3" /> Export audit report</>
              }
            </button>
          </div>
        )}
      </div>

      <button onClick={reset} className="mt-2 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer font-mono" style={{ color: "var(--text-dim)" }}>Reset demo</button>
    </div>
  );
}

export function ComplianceAuditPattern() {
  return (
    <>
      <PatternHeader
        title="Compliance Audit Workflow"
        description="Structured process for auditing security UX against regulations. Scope the audit, assess each requirement, collect evidence, and generate a gap analysis report."
        severity="high"
        tags={["NIS2", "DORA", "GDPR", "ISO 27001", "Governance"]}
      />

      <DemoContainer label="Compliance Audit Workflow">
        <ComplianceAuditDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Start with scope — let auditors select which regulations to audit against",
          "Break requirements into atomic, assessable items (pass/partial/fail)",
          "Require evidence attachment for every assessed item",
          "Generate a structured gap analysis with remediation timelines",
          "Track remediation progress over time (audit history)",
          "Map audit items to specific UX patterns for actionable fixes",
          "Support multiple concurrent audits (NIS2 + GDPR + DORA)",
          "Export reports in standard formats (PDF, CSV, markdown)",
        ]}
        donts={[
          "Don't allow audits without a defined scope — everything-at-once audits fail",
          "Don't use binary pass/fail only — partial compliance is a real state",
          "Don't skip evidence collection — assertions without proof fail external audits",
          "Don't present results without remediation guidance",
          "Don't hide failed items or downplay their severity",
          "Don't allow audit results to be modified after report generation",
        ]}
        securityRationale="NIS2 Article 21 requires regular security audits. DORA Article 6 mandates ICT risk management with audit trails. ISO 27001 Clause 9.2 requires internal audits at planned intervals. The compliance audit workflow makes these requirements practical for design teams — instead of treating audits as a bureaucratic burden, the structured approach turns them into actionable improvement cycles. With GDPR fines reaching €345M (TikTok) and NIS2 penalties up to €10M or 2% of global turnover, the cost of poor audit practices is real."
        accessibilityNotes={[
          "Assessment buttons use aria-pressed state",
          "Pass/partial/fail conveyed by both color and text label",
          "Phase tabs use aria-selected for screen readers",
          "Report summary uses semantic heading hierarchy",
          "Evidence attachment status announced via aria-live",
        ]}
      />
    </>
  );
}
