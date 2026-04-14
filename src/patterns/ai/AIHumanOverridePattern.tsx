import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Shield, ShieldOff, User, Bot, CheckCircle2, XCircle, Hand } from "lucide-react";

interface Decision {
  id: string;
  type: string;
  subject: string;
  aiDecision: string;
  confidence: number;
  risk: "high" | "medium";
}

const DECISIONS: Decision[] = [
  { id: "1", type: "Loan Application", subject: "Maria K., Helsinki", aiDecision: "DENIED", confidence: 72, risk: "high" },
  { id: "2", type: "Content Moderation", subject: "Post #48291", aiDecision: "REMOVED", confidence: 88, risk: "medium" },
  { id: "3", type: "Job Screening", subject: "Applicant #1047", aiDecision: "REJECTED", confidence: 65, risk: "high" },
];

function AIHumanOverrideDemo() {
  const [view, setView] = useState<"no-override" | "with-override">("no-override");
  const [overrides, setOverrides] = useState<Record<string, "approved" | "rejected" | null>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  const reset = () => {
    setOverrides({});
    setExpandedId(null);
    setPaused(false);
  };

  const handleOverride = (id: string, action: "approved" | "rejected") => {
    setOverrides((prev) => ({ ...prev, [id]: action }));
    setExpandedId(null);
  };

  return (
    <div className="w-full max-w-lg">
      {/* Toggle */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <button onClick={() => { setView("no-override"); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: view === "no-override" ? "rgba(255,51,51,0.15)" : "transparent", color: view === "no-override" ? "var(--red)" : "var(--text)" }}>
          <ShieldOff className="w-3.5 h-3.5 inline mr-1" /> No Human Override
        </button>
        <button onClick={() => { setView("with-override"); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: view === "with-override" ? "var(--ai-glow)" : "transparent", color: view === "with-override" ? "var(--ai-color)" : "var(--text)" }}>
          <Shield className="w-3.5 h-3.5 inline mr-1" /> Human-in-the-Loop
        </button>
      </div>

      <div className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: view === "no-override" ? "rgba(255,51,51,0.4)" : "var(--ai-border)" }}>
        {/* Header */}
        <div className="px-4 py-3 flex items-center justify-between" style={{ background: view === "no-override" ? "rgba(255,51,51,0.08)" : "var(--ai-glow)", borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4" style={{ color: view === "no-override" ? "var(--red)" : "var(--ai-color)" }} />
            <p className="text-sm font-medium font-mono" style={{ color: "var(--text-bright)" }}>AI Decision Queue</p>
          </div>
          <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: view === "no-override" ? "rgba(255,51,51,0.15)" : "var(--ai-glow)", color: view === "no-override" ? "var(--red)" : "var(--ai-color)" }}>
            {view === "no-override" ? "FULLY AUTOMATED" : "HUMAN OVERSIGHT"}
          </span>
        </div>

        {/* Emergency stop (with-override only) */}
        {view === "with-override" && (
          <div className="px-4 py-2 flex items-center justify-between" style={{ background: paused ? "rgba(255,51,51,0.1)" : "rgba(192,132,252,0.08)", borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2">
              <Hand className="w-4 h-4" style={{ color: paused ? "var(--red)" : "var(--ai-color)" }} />
              <p className="text-xs font-mono" style={{ color: paused ? "var(--red)" : "var(--text)" }}>
                {paused ? "AI processing paused — all decisions require manual review" : "AI processing active — high-risk decisions flagged for review"}
              </p>
            </div>
            <button
              onClick={() => setPaused(!paused)}
              className="text-xs font-mono px-3 py-1 rounded border-none cursor-pointer"
              style={{
                background: paused ? "var(--green)" : "rgba(255,51,51,0.15)",
                color: paused ? "var(--bg)" : "var(--red)",
              }}
            >
              {paused ? "Resume" : "Pause AI"}
            </button>
          </div>
        )}

        {/* Decision list */}
        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {DECISIONS.map((decision) => {
            const overridden = overrides[decision.id];
            return (
              <div key={decision.id} className="px-4 py-3" style={{ background: "var(--bg)" }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-semibold" style={{ color: "var(--text-bright)" }}>{decision.type}</span>
                      <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{
                        background: decision.risk === "high" ? "rgba(255,51,51,0.15)" : "rgba(255,170,0,0.15)",
                        color: decision.risk === "high" ? "var(--red)" : "var(--amber)",
                      }}>
                        {decision.risk} risk
                      </span>
                    </div>
                    <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>{decision.subject}</p>

                    {view === "with-override" && (
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Bot className="w-3 h-3" style={{ color: "var(--ai-color)" }} />
                          <span className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>
                            AI: {decision.aiDecision} ({decision.confidence}% confidence)
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {view === "no-override" ? (
                      /* No override — just shows final decision, no recourse */
                      <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: "rgba(255,51,51,0.15)", color: "var(--red)" }}>
                        {decision.aiDecision}
                      </span>
                    ) : overridden ? (
                      /* Overridden state */
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" style={{ color: "var(--green)" }} />
                        <span className="text-xs font-mono px-2 py-1 rounded" style={{
                          background: overridden === "approved" ? "rgba(0,255,65,0.15)" : "rgba(255,51,51,0.15)",
                          color: overridden === "approved" ? "var(--green)" : "var(--red)",
                        }}>
                          {overridden === "approved" ? "OVERRIDDEN → APPROVED" : "DENIAL UPHELD"} by human
                        </span>
                      </div>
                    ) : expandedId === decision.id ? (
                      /* Override actions expanded */
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOverride(decision.id, "approved")}
                          className="text-xs font-mono px-2 py-1 rounded border-none cursor-pointer flex items-center gap-1"
                          style={{ background: "rgba(0,255,65,0.15)", color: "var(--green)" }}
                        >
                          <CheckCircle2 className="w-3 h-3" /> Override → Approve
                        </button>
                        <button
                          onClick={() => handleOverride(decision.id, "rejected")}
                          className="text-xs font-mono px-2 py-1 rounded border-none cursor-pointer flex items-center gap-1"
                          style={{ background: "rgba(255,51,51,0.15)", color: "var(--red)" }}
                        >
                          <XCircle className="w-3 h-3" /> Uphold Denial
                        </button>
                        <button
                          onClick={() => setExpandedId(null)}
                          className="text-xs font-mono px-1 py-1 rounded border-none cursor-pointer"
                          style={{ background: "transparent", color: "var(--text-dim)" }}
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      /* Review button */
                      <button
                        onClick={() => setExpandedId(decision.id)}
                        className="text-xs font-mono px-2 py-1 rounded border-none cursor-pointer flex items-center gap-1"
                        style={{ background: "var(--ai-glow)", color: "var(--ai-color)" }}
                      >
                        <User className="w-3 h-3" /> Review
                      </button>
                    )}
                  </div>
                </div>

                {/* No override: no explanation, no recourse */}
                {view === "no-override" && (
                  <p className="text-xs font-mono mt-2" style={{ color: "var(--text-dim)" }}>
                    Decision final. No review available.
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {view === "no-override" ? (
          <div className="px-4 py-2" style={{ background: "rgba(255,51,51,0.05)", borderTop: "1px solid var(--border)" }}>
            <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>
              3 decisions processed · No human review · No appeal mechanism · No audit trail
            </p>
          </div>
        ) : (
          <div className="px-4 py-2" style={{ background: "rgba(192,132,252,0.05)", borderTop: "1px solid var(--border)" }}>
            <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>
              {Object.values(overrides).filter(Boolean).length} of {DECISIONS.length} reviewed by human · All decisions logged with reviewer ID and timestamp
            </p>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="mt-4 p-3 rounded-lg text-xs space-y-1" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {view === "no-override" ? (
          <>
            <p className="font-mono" style={{ color: "var(--red)" }}>What's wrong:</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>AI makes final decisions on loans, content, and hiring with no human review</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>No confidence score shown — users can't assess AI certainty</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>No override, appeal, or escalation mechanism</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>No emergency stop to pause automated processing</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>Violates EU AI Act Article 14 — human oversight for high-risk AI</p>
          </>
        ) : (
          <>
            <p className="font-mono" style={{ color: "var(--ai-color)" }}>What's right:</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>High-risk decisions flagged for human review before taking effect</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>AI confidence score visible — reviewers can prioritize low-confidence decisions</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>Human can approve, confirm, or override each AI decision</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>"Pause AI" emergency stop halts all automated processing</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>Audit trail logs reviewer identity and action on every decision</p>
          </>
        )}
      </div>

      <button onClick={reset} className="mt-2 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer font-mono" style={{ color: "var(--text)" }}>Reset demo</button>
    </div>
  );
}

export function AIHumanOverridePattern() {
  return (
    <div>
      <PatternHeader
        title="Human Override & AI Kill Switch"
        description="EU AI Act Article 14 requires human oversight for high-risk AI systems — including the ability to override decisions, pause processing, and intervene in real-time. This pattern shows how to design the 'take back control' UI."
        severity="critical"
        tags={["EU AI Act Art. 14", "High-Risk AI", "Human Oversight", "GDPR Art. 22"]}
      />

      <DemoContainer label="AI decisions (no override vs human-in-the-loop)">
        <AIHumanOverrideDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Provide a 'Pause AI' or emergency stop control that halts all automated processing",
          "Flag high-risk AI decisions for mandatory human review before they take effect",
          "Show AI confidence scores so reviewers can prioritize uncertain decisions",
          "Allow humans to approve, reject, or override any AI decision",
          "Log every human review action with reviewer identity and timestamp",
          "Provide clear escalation paths when the AI's confidence is below threshold",
          "Show the AI's reasoning alongside its decision to support informed review",
          "Design the override UI to be faster than the automated path — don't make oversight feel like punishment",
          "Allow batch review for medium-risk decisions and individual review for high-risk",
        ]}
        donts={[
          "NEVER let high-risk AI make final decisions without human review (violates EU AI Act Art. 14)",
          "Don't hide the override mechanism behind admin settings — it must be immediately accessible",
          "Don't show only the AI decision without confidence level — reviewers need to assess certainty",
          "Don't require more clicks to override than to accept — bias toward acceptance undermines oversight",
          "Don't auto-approve decisions after a timeout — silence is not consent",
          "Don't remove the emergency stop once AI processing begins",
          "Don't log only overrides — log approvals too, to prove human review occurred",
          "Don't present AI decisions as final before human review is complete",
        ]}
        securityRationale="EU AI Act Article 14 requires that high-risk AI systems 'be effectively overseen by natural persons during the period in which the AI system is in use' and that operators can 'intervene in the operation of the high-risk AI system or interrupt the system.' Article 14(4) specifically requires the ability to 'decide not to use the high-risk AI system or to otherwise disregard, override or reverse the output.' GDPR Article 22 grants data subjects the right 'not to be subject to a decision based solely on automated processing' that significantly affects them. Fines for AI Act non-compliance reach up to 35M EUR or 7% of global annual turnover. Human oversight is not optional — it is a legal requirement for any AI system making decisions about people."
        accessibilityNotes={[
          "Override and approval buttons must be keyboard accessible with clear focus indicators",
          "Emergency stop must be reachable via keyboard shortcut (not just mouse click)",
          "Decision queue must be navigable by screen readers with each item's status announced",
          "Confidence scores must have text labels, not just visual indicators (color, bars)",
          "Status changes (approved, rejected, paused) must be announced via aria-live regions",
          "The pause/resume toggle must clearly communicate its current state to assistive technology",
        ]}
      />
    </div>
  );
}
