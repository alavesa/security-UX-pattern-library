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
          <button key={s} type="button" role="tab" aria-selected={scenario === s} onClick={() => selectScenario(s)} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: scenario === s ? "var(--green-glow)" : "transparent", color: scenario === s ? "var(--green)" : "var(--text)" }}>
            {s === "loan" ? "Loan Decision" : s === "content" ? "Content Moderation" : "Hiring AI"}
          </button>
        ))}
      </div>

      {/* Loan application decision */}
      {scenario === "loan" && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
              <Brain className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Loan Application Result</h3>
              <p className="text-xs text-amber-600 flex items-center gap-1">
                <Brain className="w-3 h-3" /> Decision assisted by AI
              </p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-red-800">Application declined</span>
            </div>
            <p className="text-sm text-red-700">Your loan application for €25,000 has been declined.</p>
          </div>

          {/* Explanation */}
          <div className="border border-gray-200 rounded-lg mb-4">
            <button type="button" aria-expanded={expanded} aria-controls="loan-explanation-panel" onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between p-4 text-left bg-transparent border-none cursor-pointer">
              <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600" /> Why was my application declined?
              </span>
              {expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>

            {expanded && (
              <div id="loan-explanation-panel" className="px-4 pb-4 border-t border-gray-200 pt-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3 text-xs text-blue-800">
                  <strong>How this decision was made:</strong> An AI model assessed your application based on the following factors. A human reviewer confirmed the decision.
                </div>

                <h4 className="text-xs font-semibold text-gray-700 mb-2">Key factors:</h4>
                <div className="space-y-2 mb-4">
                  {[
                    { factor: "Debt-to-income ratio", impact: "negative", detail: "42% (threshold: 35%)", weight: "High" },
                    { factor: "Employment duration", impact: "negative", detail: "6 months (preferred: 24+ months)", weight: "High" },
                    { factor: "Credit score", impact: "positive", detail: "720 (good)", weight: "Medium" },
                    { factor: "Savings balance", impact: "neutral", detail: "€3,200", weight: "Low" },
                  ].map(({ factor, impact, detail, weight }) => (
                    <div key={factor} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        {impact === "negative" ? <XCircle className="w-3.5 h-3.5 text-red-500" /> :
                         impact === "positive" ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> :
                         <div className="w-3.5 h-3.5 bg-gray-300 rounded-full" />}
                        <div>
                          <p className="text-xs font-medium text-gray-900">{factor}</p>
                          <p className="text-xs text-gray-500">{detail}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{weight} weight</span>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
                  <strong>What this means:</strong> Your debt-to-income ratio and short employment history were the primary factors. Your credit score was positive but not sufficient to offset the other factors.
                </div>
              </div>
            )}
          </div>

          {/* Right to appeal */}
          <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <Scale className="w-4 h-4" /> Your rights
            </h4>
            <ul className="text-xs text-blue-700 space-y-1 mb-3">
              <li>You have the right to a human review of this decision (GDPR Art. 22)</li>
              <li>You can request more details about how the decision was made</li>
              <li>You can provide additional information and request reconsideration</li>
            </ul>
            {!appealStarted ? (
              <button type="button" onClick={() => setAppealStarted(true)} className="text-xs bg-blue-600 text-white px-4 py-2 rounded border-none cursor-pointer hover:bg-blue-700">
                Request human review
              </button>
            ) : (
              <div className="bg-white border border-blue-200 rounded p-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mb-2" />
                <p className="text-xs text-green-700 font-medium">Human review requested</p>
                <p className="text-xs text-gray-500">A human reviewer will assess your application within 5 business days. Reference: {appealRef}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content moderation */}
      {scenario === "content" && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Content removed</h3>
              <p className="text-xs text-gray-500">Your post was flagged by our automated system</p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700 italic">"Check out this amazing deal on supplements that doctors don't want you to know about! [link]"</p>
          </div>

          <div className="border border-amber-200 bg-amber-50 rounded-lg p-4 mb-4">
            <h4 className="text-xs font-semibold text-amber-800 mb-2 flex items-center gap-1">
              <Brain className="w-3.5 h-3.5" /> AI moderation explanation
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-800"><strong>Misleading health claims</strong> — AI detected unsubstantiated health claims ("doctors don't want you to know")</p>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-800"><strong>Potential spam</strong> — Pattern matches known supplement spam campaigns</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-800"><strong>Confidence: 87%</strong> — Above our 80% threshold for automatic removal</p>
              </div>
            </div>
          </div>

          {contentAction === "none" && (
            <>
              <div className="flex gap-2">
                <button type="button" onClick={() => setContentAction("appealed")} className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium border-none cursor-pointer hover:bg-blue-700">
                  Appeal — request human review
                </button>
                <button type="button" onClick={() => setContentAction("accepted")} className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-medium bg-white cursor-pointer hover:bg-gray-50">
                  I understand
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-3">This decision was made by AI. You have the right to appeal to a human moderator. Average review time: 24 hours.</p>
            </>
          )}

          {contentAction === "appealed" && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <CheckCircle2 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-800">Appeal submitted</p>
              <p className="text-xs text-blue-700 mt-1">A human moderator will review your post within 24 hours. Reference: {modRef}</p>
              <p className="text-xs text-gray-500 mt-2">Your post remains hidden during review. If the appeal succeeds, it will be restored.</p>
            </div>
          )}

          {contentAction === "accepted" && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-gray-700">Acknowledged</p>
              <p className="text-xs text-gray-500 mt-1">The post has been removed. You can review our content guidelines to avoid future removals.</p>
            </div>
          )}
        </div>
      )}

      {/* Hiring AI */}
      {scenario === "hiring" && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4 flex items-start gap-2">
            <Brain className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
            <div className="text-xs text-purple-800">
              <strong>AI Notice (required by law):</strong> This application was assessed with the assistance of AI tools. Under the EU AI Act, AI systems used in employment decisions are classified as <strong>high-risk</strong> and subject to additional transparency requirements.
            </div>
          </div>

          <h3 className="font-bold text-gray-900 mb-4">Application Assessment Summary</h3>

          <div className="space-y-3 mb-4">
            {[
              { area: "Skills match", score: 85, detail: "Strong match on 7/9 required skills" },
              { area: "Experience relevance", score: 72, detail: "4 years relevant; preferred: 5+" },
              { area: "Education alignment", score: 90, detail: "M.Sc. matches requirements" },
            ].map(({ area, score, detail }) => (
              <div key={area} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{area}</span>
                  <span className={`text-xs font-mono ${score >= 80 ? "text-green-600" : "text-amber-600"}`}>{score}%</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full">
                  <div role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100} aria-label={`${area} score`} className={`h-full rounded-full ${score >= 80 ? "bg-green-500" : "bg-amber-500"}`} style={{ width: `${score}%` }} />
                </div>
                <p className="text-xs text-gray-500 mt-1">{detail}</p>
              </div>
            ))}
          </div>

          <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <h4 className="text-xs font-semibold text-gray-700 mb-2">What the AI did NOT assess:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li className="flex items-center gap-2"><XCircle className="w-3 h-3 text-gray-300" /> Age, gender, ethnicity, or other protected characteristics</li>
              <li className="flex items-center gap-2"><XCircle className="w-3 h-3 text-gray-300" /> Social media profiles or personal photos</li>
              <li className="flex items-center gap-2"><XCircle className="w-3 h-3 text-gray-300" /> Inferred personality traits or emotional analysis</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
            <strong>EU AI Act — High-Risk AI:</strong> Employment AI is classified as high-risk (Annex III). This requires: human oversight of all decisions, right to explanation, bias testing, and the option for human-only assessment on request.
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
