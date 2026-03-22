import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { GitBranch, CheckCircle2, Clock, AlertTriangle, Users, Shield, ArrowRight, XCircle } from "lucide-react";

type Phase = "proposal" | "review" | "approval" | "rollout" | "rollback";

interface ChangeItem {
  id: string;
  title: string;
  impact: "low" | "medium" | "high" | "critical";
  status: "draft" | "review" | "approved" | "deployed" | "rolled-back";
  requester: string;
  reviewers: string[];
  affectedUsers: string;
  rollbackPlan: string;
}

const SAMPLE_CHANGE: ChangeItem = {
  id: "CHG-2026-047",
  title: "Replace password-only login with passkey-first flow",
  impact: "critical",
  status: "draft",
  requester: "UX Team Lead",
  reviewers: ["Security Architect", "Product Owner", "Ops Lead"],
  affectedUsers: "12,400 operators across 3 facilities",
  rollbackPlan: "Feature flag revert to password login within 5 minutes",
};

const impactColor = (i: string) =>
  i === "critical" ? "var(--red)" : i === "high" ? "var(--amber)" : i === "medium" ? "var(--cyan)" : "var(--green)";

const impactBg = (i: string) =>
  i === "critical" ? "rgba(255,51,51,0.1)" : i === "high" ? "rgba(255,170,0,0.1)" : i === "medium" ? "rgba(0,229,255,0.1)" : "rgba(0,255,65,0.05)";

function ChangeManagementDemo() {
  const [phase, setPhase] = useState<Phase>("proposal");
  const [approved, setApproved] = useState<Set<string>>(new Set());
  const [deployed, setDeployed] = useState(false);
  const [rolledBack, setRolledBack] = useState(false);

  const phases: { key: Phase; label: string; icon: typeof GitBranch }[] = [
    { key: "proposal", label: "Propose", icon: GitBranch },
    { key: "review", label: "Review", icon: Users },
    { key: "approval", label: "Approve", icon: Shield },
    { key: "rollout", label: "Rollout", icon: ArrowRight },
    { key: "rollback", label: "Rollback", icon: AlertTriangle },
  ];

  const approveReviewer = (name: string) => {
    setApproved(prev => new Set([...prev, name]));
  };

  const allApproved = SAMPLE_CHANGE.reviewers.every(r => approved.has(r));

  const reset = () => {
    setPhase("proposal");
    setApproved(new Set());
    setDeployed(false);
    setRolledBack(false);
  };

  return (
    <div className="w-full max-w-lg">
      {/* Phase indicators */}
      <div className="flex items-center gap-1 mb-4 overflow-x-auto">
        {phases.map((p, i) => {
          const Icon = p.icon;
          const isActive = p.key === phase;
          const isPast = phases.findIndex(x => x.key === phase) > i;
          return (
            <button
              key={p.key}
              onClick={() => {
                if (p.key === "rollback" && !deployed) return;
                setPhase(p.key);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono border-none cursor-pointer whitespace-nowrap"
              style={{
                background: isActive ? "var(--governance-glow)" : isPast ? "rgba(204,204,204,0.05)" : "transparent",
                color: isActive ? "var(--governance-color)" : isPast ? "var(--text)" : "var(--text-dim)",
                border: isActive ? "1px solid var(--governance-border)" : "1px solid var(--border)",
              }}
            >
              <Icon className="w-3 h-3" /> {p.label}
            </button>
          );
        })}
      </div>

      {/* Phase content */}
      <div className="rounded-lg p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", minHeight: 200 }}>

        {/* Proposal */}
        {phase === "proposal" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>{SAMPLE_CHANGE.id}</span>
              <span className="px-2 py-0.5 rounded text-xs font-mono" style={{ background: impactBg(SAMPLE_CHANGE.impact), color: impactColor(SAMPLE_CHANGE.impact), border: `1px solid ${impactColor(SAMPLE_CHANGE.impact)}33` }}>
                {SAMPLE_CHANGE.impact} impact
              </span>
            </div>

            <h3 className="text-sm font-mono font-semibold" style={{ color: "var(--text-bright)" }}>{SAMPLE_CHANGE.title}</h3>

            <div className="space-y-2 text-xs font-mono">
              {[
                { label: "Requester", value: SAMPLE_CHANGE.requester, color: "var(--text)" },
                { label: "Affected users", value: SAMPLE_CHANGE.affectedUsers, color: "var(--amber)" },
                { label: "Rollback plan", value: SAMPLE_CHANGE.rollbackPlan, color: "var(--green)" },
              ].map(({ label, value, color }) => (
                <div key={label} className="p-2 rounded" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                  <p className="mb-0.5" style={{ color: "var(--text-dim)" }}>{label}</p>
                  <p style={{ color }}>{value}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setPhase("review")}
              className="w-full py-2 rounded text-xs font-mono border-none cursor-pointer"
              style={{ background: "var(--green-glow)", color: "var(--green)", border: "1px solid var(--green-border)" }}
            >
              Submit for Review →
            </button>
          </div>
        )}

        {/* Review */}
        {phase === "review" && (
          <div className="space-y-3">
            <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>
              Required reviewers — {approved.size}/{SAMPLE_CHANGE.reviewers.length} approved
            </p>

            {SAMPLE_CHANGE.reviewers.map(reviewer => {
              const isApproved = approved.has(reviewer);
              return (
                <div key={reviewer} className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg" style={{ background: isApproved ? "rgba(0,255,65,0.05)" : "var(--bg)", border: `1px solid ${isApproved ? "var(--green-border)" : "var(--border)"}` }}>
                  <div className="flex items-center gap-2 text-xs font-mono min-w-0">
                    {isApproved
                      ? <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "var(--green)" }} />
                      : <Clock className="w-4 h-4 shrink-0" style={{ color: "var(--text-dim)" }} />
                    }
                    <span className="truncate" style={{ color: isApproved ? "var(--green)" : "var(--text)" }}>{reviewer}</span>
                  </div>
                  {!isApproved && (
                    <button
                      onClick={() => approveReviewer(reviewer)}
                      className="px-3 py-1 rounded text-xs font-mono border-none cursor-pointer shrink-0"
                      style={{ background: "var(--green-glow)", color: "var(--green)", border: "1px solid var(--green-border)" }}
                    >
                      Approve
                    </button>
                  )}
                  {isApproved && (
                    <span className="text-xs font-mono shrink-0" style={{ color: "var(--green)" }}>✓ Approved</span>
                  )}
                </div>
              );
            })}

            {allApproved && (
              <button
                onClick={() => setPhase("approval")}
                className="w-full py-2 rounded text-xs font-mono border-none cursor-pointer"
                style={{ background: "var(--green-glow)", color: "var(--green)", border: "1px solid var(--green-border)" }}
              >
                All reviewers approved → Proceed to Final Approval
              </button>
            )}
          </div>
        )}

        {/* Approval */}
        {phase === "approval" && (
          <div className="space-y-3">
            <div className="p-4 rounded-lg text-center" style={{ background: "rgba(0,255,65,0.05)", border: "1px solid var(--green-border)" }}>
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--green)" }} />
              <p className="text-sm font-mono font-semibold" style={{ color: "var(--green)" }}>All Reviews Passed</p>
              <p className="text-xs font-mono mt-1" style={{ color: "var(--text)" }}>
                {SAMPLE_CHANGE.reviewers.length} reviewers approved · Impact: {SAMPLE_CHANGE.impact}
              </p>
            </div>

            <div className="p-3 rounded-lg text-xs font-mono" style={{ background: "rgba(255,170,0,0.08)", border: "1px solid rgba(255,170,0,0.2)" }}>
              <p style={{ color: "var(--amber)" }}>
                <AlertTriangle className="w-3 h-3 inline mr-1" />
                Critical impact change — requires sign-off from Change Advisory Board
              </p>
            </div>

            <button
              onClick={() => { setPhase("rollout"); setDeployed(true); }}
              className="w-full py-2 rounded text-xs font-mono border-none cursor-pointer"
              style={{ background: "var(--green)", color: "var(--bg)" }}
            >
              Authorize Deployment →
            </button>
          </div>
        )}

        {/* Rollout */}
        {phase === "rollout" && !rolledBack && (
          <div className="space-y-3">
            <div className="p-4 rounded-lg text-center" style={{ background: "rgba(0,255,65,0.05)", border: "1px solid var(--green-border)" }}>
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--green)" }} />
              <p className="text-sm font-mono font-semibold" style={{ color: "var(--green)" }}>Deployed Successfully</p>
              <p className="text-xs font-mono mt-1" style={{ color: "var(--text)" }}>
                Passkey-first login active for 12,400 operators
              </p>
            </div>

            <div className="space-y-1 text-xs font-mono">
              {[
                { label: "Deploy time", value: "14:23 UTC", color: "var(--text)" },
                { label: "Feature flag", value: "passkey-first: ON", color: "var(--green)" },
                { label: "Monitoring", value: "Active — 72h observation window", color: "var(--green)" },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0 p-2 rounded" style={{ background: "var(--bg)" }}>
                  <span style={{ color: "var(--text-dim)" }}>{label}</span>
                  <span className="text-right" style={{ color }}>{value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setPhase("rollback")}
              className="w-full py-2 rounded text-xs font-mono border-none cursor-pointer"
              style={{ background: "rgba(255,51,51,0.15)", color: "var(--red)", border: "1px solid rgba(255,51,51,0.3)" }}
            >
              Emergency Rollback ↩
            </button>
          </div>
        )}

        {/* Rollback */}
        {phase === "rollback" && (
          <div className="space-y-3">
            {!rolledBack ? (
              <>
                <div className="p-4 rounded-lg text-center" style={{ background: "rgba(255,51,51,0.08)", border: "1px solid rgba(255,51,51,0.2)" }}>
                  <AlertTriangle className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--red)" }} />
                  <p className="text-sm font-mono font-semibold" style={{ color: "var(--red)" }}>Confirm Rollback</p>
                  <p className="text-xs font-mono mt-1" style={{ color: "var(--text)" }}>
                    This will revert to password-only login for all 12,400 operators
                  </p>
                </div>

                <div className="p-3 rounded-lg text-xs font-mono" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                  <p style={{ color: "var(--text-dim)" }}>Rollback plan:</p>
                  <p style={{ color: "var(--text)" }}>{SAMPLE_CHANGE.rollbackPlan}</p>
                </div>

                <button
                  onClick={() => setRolledBack(true)}
                  className="w-full py-2 rounded text-xs font-mono border-none cursor-pointer"
                  style={{ background: "var(--red)", color: "white" }}
                >
                  Execute Rollback
                </button>
              </>
            ) : (
              <div className="p-4 rounded-lg text-center" style={{ background: "rgba(255,170,0,0.08)", border: "1px solid rgba(255,170,0,0.2)" }}>
                <XCircle className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--amber)" }} />
                <p className="text-sm font-mono font-semibold" style={{ color: "var(--amber)" }}>Rolled Back</p>
                <p className="text-xs font-mono mt-1" style={{ color: "var(--text)" }}>
                  Password-only login restored. Incident report required within 24h.
                </p>
                <p className="text-xs font-mono mt-2" style={{ color: "var(--text-dim)" }}>
                  CHG-2026-047 status: ROLLED_BACK · Duration: 47 minutes
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <button onClick={reset} className="mt-2 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer font-mono" style={{ color: "var(--text-dim)" }}>Reset demo</button>
    </div>
  );
}

export function ChangeManagementPattern() {
  return (
    <>
      <PatternHeader
        title="Change Management"
        description="Structured process for proposing, reviewing, approving, and rolling back security UX changes. Critical in industrial environments where a login flow change affects thousands of operators."
        severity="critical"
        tags={["IEC 62443", "ISO 27001", "ITIL", "Governance"]}
      />

      <DemoContainer label="Change Management Workflow">
        <ChangeManagementDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Require impact assessment for every change (low/medium/high/critical)",
          "Document affected users, systems, and rollback plan before approval",
          "Require multi-stakeholder review for high/critical impact changes",
          "Use feature flags for gradual rollout and instant rollback",
          "Define observation windows after deployment (72h for critical)",
          "Log all change decisions with timestamps and approvers",
          "Require incident reports for any rollback within 24h",
          "Separate the roles of requester, reviewer, and approver",
        ]}
        donts={[
          "Don't allow self-approval — the requester cannot approve their own change",
          "Don't skip rollback planning — every change must have a documented revert path",
          "Don't deploy critical changes during shift handover or peak hours",
          "Don't batch unrelated changes together — each change needs its own review",
          "Don't allow emergency changes to bypass documentation (document within 24h)",
          "Don't forget to notify affected users before deploying UX changes",
        ]}
        securityRationale="IEC 62443-2-4 requires formal change management for industrial control systems. ISO 27001 A.12.1.2 mandates change management procedures. Stuxnet exploited undocumented changes. Colonial Pipeline's incident response was hampered by poor change documentation. In UX terms: when you change a login flow for 12,000 operators, the stakes aren't just usability — they're operational safety."
        accessibilityNotes={[
          "Phase indicators use both color and text labels",
          "Approval buttons have clear labels indicating the reviewer name",
          "Rollback confirmation uses explicit warning language, not just color",
          "Status changes announced to screen readers via aria-live",
        ]}
      />
    </>
  );
}
