import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { CheckCircle2, XCircle, Clock, AlertTriangle, Shield } from "lucide-react";

function SecurityDesignReviewDemo() {
  const [phase, setPhase] = useState<"checklist" | "review" | "approved">("checklist");
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  const REVIEW_ITEMS = [
    { id: "auth", label: "Authentication pattern reviewed", category: "Auth", critical: true },
    { id: "errors", label: "Error messages don't leak information", category: "Auth", critical: true },
    { id: "encryption", label: "Data encryption indicators shown", category: "Data", critical: false },
    { id: "consent", label: "Consent flows GDPR-compliant", category: "Dark Patterns", critical: true },
    { id: "a11y", label: "Security flows keyboard accessible", category: "Accessibility", critical: true },
    { id: "aria", label: "ARIA roles on all interactive elements", category: "Accessibility", critical: false },
    { id: "industrial", label: "Touch targets meet IEC 62443 (if applicable)", category: "Industrial", critical: false },
    { id: "tokens", label: "Design tokens used consistently", category: "Design System", critical: false },
  ];

  const criticalComplete = REVIEW_ITEMS.filter(i => i.critical).every(i => checks[i.id]);
  const allComplete = REVIEW_ITEMS.every(i => checks[i.id]);

  const reset = () => { setPhase("checklist"); setChecks({}); };

  return (
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        {phase === "checklist" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-sm">Security UX Design Review</h3>
              <span className="text-xs text-gray-400 font-mono">{Object.values(checks).filter(Boolean).length}/{REVIEW_ITEMS.length}</span>
            </div>

            <div className="space-y-2 mb-4">
              {REVIEW_ITEMS.map(item => (
                <label key={item.id} className="flex items-start gap-3 p-2 rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={checks[item.id] ?? false}
                    onChange={e => setChecks(c => ({ ...c, [item.id]: e.target.checked }))}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900">{item.label}</span>
                      {item.critical && <span className="text-xs bg-red-100 text-red-600 px-1 rounded">Required</span>}
                    </div>
                    <span className="text-xs text-gray-400">{item.category}</span>
                  </div>
                </label>
              ))}
            </div>

            <button
              onClick={() => setPhase("review")}
              disabled={!criticalComplete}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm border-none cursor-pointer hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {criticalComplete ? "Submit for review" : `Complete all required items (${REVIEW_ITEMS.filter(i => i.critical && checks[i.id]).length}/${REVIEW_ITEMS.filter(i => i.critical).length})`}
            </button>
          </>
        )}

        {phase === "review" && (
          <div className="text-center">
            <Clock className="w-10 h-10 text-blue-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">In review</h3>
            <p className="text-sm text-gray-500 mb-4">Security design review submitted. Awaiting approval from Security UX Lead.</p>

            <div className="bg-gray-50 rounded-lg p-4 text-left mb-4">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-gray-500">Submitted by</span>
                <span className="text-gray-900">Designer</span>
              </div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-gray-500">Reviewer</span>
                <span className="text-gray-900">Security UX Lead</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Status</span>
                <span className="text-amber-600 flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>
              </div>
            </div>

            <button onClick={() => setPhase("approved")} className="text-xs text-blue-600 bg-transparent border-none cursor-pointer">[Simulate approval]</button>
          </div>
        )}

        {phase === "approved" && (
          <div className="text-center">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">Approved</h3>
            <p className="text-sm text-gray-500 mb-4">Security UX review passed. Design is cleared for development.</p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
              <p className="text-xs text-green-800"><strong>Review outcome:</strong></p>
              <ul className="text-xs text-green-700 mt-2 space-y-1">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> {Object.values(checks).filter(Boolean).length}/{REVIEW_ITEMS.length} items passed</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> All critical items verified</li>
                <li className="flex items-center gap-2"><Shield className="w-3 h-3" /> Design tokens consistent</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 p-3 rounded-lg text-xs" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <p style={{ color: "var(--green)" }}><strong>Design system governance pattern:</strong></p>
        <p style={{ color: "var(--text)" }}>This is the process for how security UX patterns are reviewed before they ship. Critical items (auth, consent, accessibility) must pass before a design can move to development. This ensures consistency across all teams using the design system.</p>
      </div>

      <button onClick={reset} className="mt-2 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer" style={{ color: "var(--text)" }}>Reset demo</button>
    </div>
  );
}

export function SecurityDesignReviewPattern() {
  return (
    <div>
      <PatternHeader
        title="Security Design Review"
        description="A governance process for reviewing security UX before it ships. Ensures design system patterns are used consistently, critical items are verified, and there's a clear approval workflow."
        severity="high"
        tags={["Governance", "Design System", "Process"]}
      />

      <DemoContainer label="security design review process">
        <SecurityDesignReviewDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Create a checklist of security UX items that must pass before a design ships",
          "Separate required (critical) items from recommended (nice-to-have) items",
          "Assign a Security UX Lead as the reviewer — not just any designer",
          "Block development until critical items pass — not just advisory",
          "Include accessibility checks as critical items — not optional",
          "Verify design tokens are used consistently, not custom one-off colors",
          "Make the process lightweight — 8-10 items, not 50. Speed matters.",
          "Track review outcomes to identify recurring gaps across teams",
        ]}
        donts={[
          "Don't skip security review for 'small changes' — small UI changes can break security",
          "Don't make it so heavy that teams bypass it — find the right weight",
          "Don't let reviews become bottlenecks — SLA should be < 1 business day",
          "Don't review only visuals — check ARIA roles, keyboard nav, and error states",
          "Don't assume one review covers everything — re-review after significant changes",
          "Don't make governance about policing — frame it as quality assurance and support",
        ]}
        securityRationale="Design system governance prevents security regressions. Without a review process, each team reinvents security UX — some well, some poorly. The review checklist ensures: consistent patterns across products, critical items (auth, consent, accessibility) always verified, and design token usage prevents drift. The key insight from 20 years of industrial design leadership: governance works when it's lightweight and supportive, not when it's heavy and punitive."
        accessibilityNotes={[
          "The review checklist itself must be accessible — keyboard-navigable checkboxes",
          "Accessibility checks are critical items, not optional",
          "Review outcomes should be documented in an accessible format",
          "The process must work for distributed teams — not just in-person design reviews",
        ]}
      />
    </div>
  );
}
