import { useState, useMemo } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Brain, ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, XCircle, HelpCircle, Scale } from "lucide-react";

function AIDecisionExplanationDemo() {
  const [scenario, setScenario] = useState<"loan" | "content" | "hiring">("loan");
  const [expanded, setExpanded] = useState(false);
  const [appealStarted, setAppealStarted] = useState(false);
  const [contentAction, setContentAction] = useState<"none" | "appealed" | "accepted">("none");

  const reset = () => {
    setExpanded(false);
    setAppealStarted(false);
    setContentAction("none");
  };

  const selectScenario = (s: typeof scenario) => { setScenario(s); reset(); };

  const appealRef = useMemo(() => `APPEAL-${Date.now()}`, []);
  const modRef = useMemo(() => `MOD-${Date.now()}`, []);

  return (
    <div className="w-full max-w-lg">
      <div role="tablist" aria-label="Decision scenario" className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {(["loan", "content", "hiring"] as const).map(s => (
          <button key={s} type="button" role="tab" aria-selected={scenario === s} onClick={() => selectScenario(s)} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: scenario === s ? "var(--ai-glow)" : "transparent", color: scenario === s ? "var(--ai-color)" : "var(--text)" }}>
            {s === "loan" ? "Loan Decision" : s === "content" ? "Content Moderation" : "Hiring AI"}
          </button>
        ))}
      </div>

      {/* Loan application decision */}
      {scenario === "loan" && (
        <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--ai-glow)" }}>
              <Brain className="w-5 h-5" style={{ color: "var(--ai-color)" }} />
            </div>
            <div>
              <h3 className="font-bold font-mono" style={{ color: "var(--text-bright)" }}>Loan Application Result</h3>
              <p className="text-xs font-mono flex items-center gap-1" style={{ color: "var(--ai-color)" }}>
                <Brain className="w-3 h-3" /> Decision assisted by AI
              </p>
            </div>
          </div>

          <div className="rounded-lg p-4 mb-4" style={{ background: "rgba(255,51,51,0.08)", border: "1px solid rgba(255,51,51,0.2)" }}>
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5" style={{ color: "var(--red)" }} />
              <span className="font-semibold font-mono" style={{ color: "var(--red)" }}>Application declined</span>
            </div>
            <p className="text-sm font-mono" style={{ color: "var(--text)" }}>Your loan application for €25,000 has been declined.</p>
          </div>

          {/* Explanation */}
          <div className="rounded-lg mb-4" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
            <button type="button" aria-expanded={expanded} aria-controls="loan-explanation-panel" onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between p-4 text-left bg-transparent border-none cursor-pointer">
              <span className="text-sm font-medium font-mono flex items-center gap-2" style={{ color: "var(--text-bright)" }}>
                <HelpCircle className="w-4 h-4" style={{ color: "var(--ai-color)" }} /> Why was my application declined?
              </span>
              {expanded ? <ChevronUp className="w-4 h-4" style={{ color: "var(--text-dim)" }} /> : <ChevronDown className="w-4 h-4" style={{ color: "var(--text-dim)" }} />}
            </button>

            {expanded && (
              <div id="loan-explanation-panel" className="px-4 pb-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="rounded-lg p-3 mb-3 text-xs font-mono" style={{ background: "var(--ai-glow)", border: "1px solid var(--ai-border)", color: "var(--text)" }}>
                  <strong style={{ color: "var(--ai-color)" }}>How this decision was made:</strong> An AI model assessed your application based on the following factors. A human reviewer confirmed the decision.
                </div>

                <h4 className="text-xs font-semibold font-mono mb-2" style={{ color: "var(--text-bright)" }}>Key factors:</h4>
                <div className="space-y-2 mb-4">
                  {[
                    { factor: "Debt-to-income ratio", impact: "negative", detail: "42% (threshold: 35%)", weight: "High" },
                    { factor: "Employment duration", impact: "negative", detail: "6 months (preferred: 24+ months)", weight: "High" },
                    { factor: "Credit score", impact: "positive", detail: "720 (good)", weight: "Medium" },
                    { factor: "Savings balance", impact: "neutral", detail: "€3,200", weight: "Low" },
                  ].map(({ factor, impact, detail, weight }) => {
                    const color = impact === "negative" ? "var(--red)" : impact === "positive" ? "var(--green)" : "var(--text-dim)";
                    return (
                      <div key={factor} className="flex items-center justify-between p-2 rounded" style={{ background: "var(--bg-elevated)" }}>
                        <div className="flex items-center gap-2">
                          {impact === "negative" ? <XCircle className="w-3.5 h-3.5" style={{ color }} /> :
                           impact === "positive" ? <CheckCircle2 className="w-3.5 h-3.5" style={{ color }} /> :
                           <div className="w-3.5 h-3.5 rounded-full" style={{ background: "var(--text-dim)" }} />}
                          <div>
                            <p className="text-xs font-medium font-mono" style={{ color: "var(--text-bright)" }}>{factor}</p>
                            <p className="text-xs font-mono" style={{ color }}>{detail}</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>{weight} weight</span>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-lg p-3 text-xs font-mono" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text)" }}>
                  <strong style={{ color: "var(--text-bright)" }}>What this means:</strong> Your debt-to-income ratio and short employment history were the primary factors. Your credit score was positive but not sufficient to offset the other factors.
                </div>
              </div>
            )}
          </div>

          {/* Right to appeal */}
          <div className="rounded-lg p-4" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
            <h4 className="text-sm font-semibold font-mono mb-2 flex items-center gap-2" style={{ color: "var(--text-bright)" }}>
              <Scale className="w-4 h-4" style={{ color: "var(--ai-color)" }} /> Your rights
            </h4>
            <ul className="text-xs font-mono space-y-1 mb-3" style={{ color: "var(--text)" }}>
              <li>You have the right to a human review of this decision (GDPR Art. 22)</li>
              <li>You can request more details about how the decision was made</li>
              <li>You can provide additional information and request reconsideration</li>
            </ul>
            {!appealStarted ? (
              <button type="button" onClick={() => setAppealStarted(true)} className="text-xs font-mono px-4 py-2 rounded border-none cursor-pointer" style={{ background: "var(--ai-color)", color: "var(--bg)" }}>
                Request human review
              </button>
            ) : (
              <div className="rounded p-3" style={{ background: "rgba(0,255,65,0.05)", border: "1px solid var(--green-border)" }}>
                <CheckCircle2 className="w-5 h-5 mb-2" style={{ color: "var(--green)" }} />
                <p className="text-xs font-medium font-mono" style={{ color: "var(--green)" }}>Human review requested</p>
                <p className="text-xs font-mono" style={{ color: "var(--text)" }}>A human reviewer will assess your application within 5 business days. Reference: <span style={{ color: "var(--text-bright)" }}>{appealRef}</span></p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content moderation */}
      {scenario === "content" && (
        <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(255,170,0,0.15)" }}>
              <AlertTriangle className="w-5 h-5" style={{ color: "var(--amber)" }} />
            </div>
            <div>
              <h3 className="font-bold font-mono" style={{ color: "var(--text-bright)" }}>Content removed</h3>
              <p className="text-xs font-mono" style={{ color: "var(--text)" }}>Your post was flagged by our automated system</p>
            </div>
          </div>

          <div className="rounded-lg p-4 mb-4" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
            <p className="text-sm font-mono italic" style={{ color: "var(--text-bright)" }}>"Check out this amazing deal on supplements that doctors don't want you to know about! [link]"</p>
          </div>

          <div className="rounded-lg p-4 mb-4" style={{ background: "rgba(255,51,51,0.05)", border: "1px solid rgba(255,51,51,0.2)" }}>
            <h4 className="text-xs font-semibold font-mono mb-2 flex items-center gap-1" style={{ color: "var(--ai-color)" }}>
              <Brain className="w-3.5 h-3.5" /> AI moderation explanation
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "var(--red)" }} />
                <p className="text-xs font-mono" style={{ color: "var(--text)" }}><strong style={{ color: "var(--text-bright)" }}>Misleading health claims</strong> — AI detected unsubstantiated health claims ("doctors don't want you to know")</p>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "var(--red)" }} />
                <p className="text-xs font-mono" style={{ color: "var(--text)" }}><strong style={{ color: "var(--text-bright)" }}>Potential spam</strong> — Pattern matches known supplement spam campaigns</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "var(--amber)" }} />
                <p className="text-xs font-mono" style={{ color: "var(--text)" }}><strong style={{ color: "var(--amber)" }}>Confidence: 87%</strong> — Above our 80% threshold for automatic removal</p>
              </div>
            </div>
          </div>

          {contentAction === "none" && (
            <>
              <div className="flex gap-2">
                <button type="button" onClick={() => setContentAction("appealed")} className="flex-1 py-2.5 rounded-lg text-sm font-medium font-mono border-none cursor-pointer" style={{ background: "var(--ai-color)", color: "var(--bg)" }}>
                  Appeal — request human review
                </button>
                <button type="button" onClick={() => setContentAction("accepted")} className="flex-1 py-2.5 rounded-lg text-sm font-medium font-mono cursor-pointer" style={{ background: "transparent", color: "var(--text-bright)", border: "1px solid var(--border)" }}>
                  I understand
                </button>
              </div>
              <p className="text-xs font-mono mt-3" style={{ color: "var(--text-dim)" }}>This decision was made by AI. You have the right to appeal to a human moderator. Average review time: 24 hours.</p>
            </>
          )}

          {contentAction === "appealed" && (
            <div className="rounded-lg p-4 text-center" style={{ background: "rgba(0,255,65,0.05)", border: "1px solid var(--green-border)" }}>
              <CheckCircle2 className="w-6 h-6 mx-auto mb-2" style={{ color: "var(--green)" }} />
              <p className="text-sm font-medium font-mono" style={{ color: "var(--green)" }}>Appeal submitted</p>
              <p className="text-xs font-mono mt-1" style={{ color: "var(--text)" }}>A human moderator will review your post within 24 hours. Reference: <span style={{ color: "var(--text-bright)" }}>{modRef}</span></p>
              <p className="text-xs font-mono mt-2" style={{ color: "var(--text-dim)" }}>Your post remains hidden during review. If the appeal succeeds, it will be restored.</p>
            </div>
          )}

          {contentAction === "accepted" && (
            <div className="rounded-lg p-4 text-center" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
              <p className="text-sm font-medium font-mono" style={{ color: "var(--text-bright)" }}>Acknowledged</p>
              <p className="text-xs font-mono mt-1" style={{ color: "var(--text)" }}>The post has been removed. You can review our content guidelines to avoid future removals.</p>
            </div>
          )}
        </div>
      )}

      {/* Hiring AI */}
      {scenario === "hiring" && (
        <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="rounded-lg p-3 mb-4 flex items-start gap-2" style={{ background: "var(--ai-glow)", border: "1px solid var(--ai-border)" }}>
            <Brain className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--ai-color)" }} />
            <div className="text-xs font-mono" style={{ color: "var(--text)" }}>
              <strong style={{ color: "var(--ai-color)" }}>AI Notice (required by law):</strong> This application was assessed with the assistance of AI tools. Under the EU AI Act, AI systems used in employment decisions are classified as <strong style={{ color: "var(--text-bright)" }}>high-risk</strong> and subject to additional transparency requirements.
            </div>
          </div>

          <h3 className="font-bold font-mono mb-4" style={{ color: "var(--text-bright)" }}>Application Assessment Summary</h3>

          <div className="space-y-3 mb-4">
            {[
              { area: "Skills match", score: 85, detail: "Strong match on 7/9 required skills" },
              { area: "Experience relevance", score: 72, detail: "4 years relevant; preferred: 5+" },
              { area: "Education alignment", score: 90, detail: "M.Sc. matches requirements" },
            ].map(({ area, score, detail }) => (
              <div key={area} className="p-3 rounded-lg" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium font-mono" style={{ color: "var(--text-bright)" }}>{area}</span>
                  <span className="text-xs font-mono" style={{ color: score >= 80 ? "var(--green)" : "var(--amber)" }}>{score}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "var(--bg-elevated)" }}>
                  <div role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100} aria-label={`${area} score`} className="h-full rounded-full" style={{ width: `${score}%`, background: score >= 80 ? "var(--green)" : "var(--amber)" }} />
                </div>
                <p className="text-xs font-mono mt-1" style={{ color: "var(--text)" }}>{detail}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg p-4 mb-4" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
            <h4 className="text-xs font-semibold font-mono mb-2" style={{ color: "var(--green)" }}>What the AI did NOT assess:</h4>
            <ul className="text-xs font-mono space-y-1" style={{ color: "var(--text)" }}>
              <li className="flex items-center gap-2"><XCircle className="w-3 h-3" style={{ color: "var(--green)" }} /> Age, gender, ethnicity, or other protected characteristics</li>
              <li className="flex items-center gap-2"><XCircle className="w-3 h-3" style={{ color: "var(--green)" }} /> Social media profiles or personal photos</li>
              <li className="flex items-center gap-2"><XCircle className="w-3 h-3" style={{ color: "var(--green)" }} /> Inferred personality traits or emotional analysis</li>
            </ul>
          </div>

          <div className="rounded-lg p-3 text-xs font-mono" style={{ background: "var(--ai-glow)", border: "1px solid var(--ai-border)", color: "var(--ai-color)" }}>
            <strong>EU AI Act — High-Risk AI:</strong> <span style={{ color: "var(--text)" }}>Employment AI is classified as high-risk (Annex III). This requires: human oversight of all decisions, right to explanation, bias testing, and the option for human-only assessment on request.</span>
          </div>
        </div>
      )}

      <button type="button" onClick={reset} className="mt-4 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer" style={{ color: "var(--text)" }}>Reset demo</button>
    </div>
  );
}

export function AIDecisionExplanationPattern() {
  return (
    <div>
      <PatternHeader
        title="AI Decision Explanation"
        description="When AI makes or assists decisions about people — loans, content moderation, hiring — users have a right to understand why. Covers GDPR Article 22 and EU AI Act high-risk AI requirements."
        severity="critical"
        tags={["EU AI Act", "GDPR Art. 22", "High-Risk AI"]}
      />

      <DemoContainer label="AI decision explanation (3 variants)">
        <AIDecisionExplanationDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Explain the key factors that influenced the AI's decision, ranked by impact",
          "Provide a 'Request human review' option for all automated decisions (GDPR Art. 22)",
          "Show AI confidence levels so users understand the certainty of the decision",
          "Disclose what the AI did NOT consider (protected characteristics, personal data)",
          "Label the decision as AI-assisted or AI-made clearly at the top",
          "Provide an appeal mechanism with a tracking reference number",
          "Show both positive and negative factors — not just the negatives",
          "Use plain language ('your debt is higher than our threshold') not model jargon",
        ]}
        donts={[
          "Don't make automated decisions about people without disclosure and explanation",
          "Don't hide the explanation behind legal jargon — use simple language",
          "Don't remove the human review option to save costs — it's a legal requirement",
          "Don't use AI for hiring decisions based on personality traits, facial analysis, or emotion detection",
          "Don't present AI scores as objective truth — they're probabilistic estimates",
          "Don't auto-reject without showing why — even if the reason seems obvious to the system",
          "Don't use different explanation quality for different demographics (explanation equity)",
        ]}
        securityRationale="GDPR Article 22 gives individuals the right not to be subject to solely automated decisions that significantly affect them, with the right to 'meaningful information about the logic involved.' The EU AI Act classifies employment, creditworthiness, and law enforcement AI as high-risk (Annex III), requiring human oversight, bias testing, and detailed documentation. The Illinois AI Video Interview Act already requires consent before AI analysis of job interviews. The key UX challenge: making AI decisions understandable without overwhelming users with technical details."
        accessibilityNotes={[
          "Factor explanations use both icons and text — never color alone",
          "Expandable sections use aria-expanded for screen readers",
          "Confidence percentages are available as text, not just progress bars",
          "Appeal buttons have clear, descriptive labels",
          "AI notices use high-contrast backgrounds for visibility",
        ]}
      />
    </div>
  );
}
