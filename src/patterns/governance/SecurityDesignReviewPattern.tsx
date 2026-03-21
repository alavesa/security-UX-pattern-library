import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { CheckCircle2, XCircle, Clock, AlertTriangle, Shield } from "lucide-react";

const REVIEW_ITEMS = [
  { id: "auth", label: "Authentication pattern reviewed", category: "Auth", critical: true },
  { id: "errors", label: "Error messages don't leak information", category: "Auth", critical: true },
  { id: "encryption", label: "Data encryption indicators shown", category: "Data", critical: false },
  { id: "consent", label: "Consent flows GDPR-compliant", category: "Dark Patterns", critical: true },
  { id: "a11y", label: "Security flows keyboard accessible", category: "Accessibility", critical: true },
  { id: "aria", label: "ARIA roles on all interactive elements", category: "Accessibility", critical: false },
  { id: "industrial", label: "Touch targets meet IEC 62443 (if applicable)", category: "Industrial", critical: false },
  { id: "tokens", label: "Security patterns applied consistently", category: "Consistency", critical: false },
];

function SecurityDesignReviewDemo() {
  const [phase, setPhase] = useState<"checklist" | "review" | "approved">("checklist");
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [submittedCount, setSubmittedCount] = useState<number>(0);

  const criticalComplete = REVIEW_ITEMS.filter(i => i.critical).every(i => checks[i.id]);

  const reset = () => { setPhase("checklist"); setChecks({}); setSubmittedCount(0); };

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-2xl border p-6">
        <div aria-live="polite" aria-atomic="true">
        {phase === "checklist" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm">Security UX Design Review</h3>
              <span className="text-xs font-mono">{Object.values(checks).filter(Boolean).length}/{REVIEW_ITEMS.length}</span>
            </div>

            <div className="space-y-2 mb-4">
              {REVIEW_ITEMS.map(item => (
                <label key={item.id} className="flex items-start gap-3 p-2 rounded cursor-pointer hover:">
                  <input
                    type="checkbox"
                    checked={checks[item.id] ?? false}
                    onChange={e => setChecks(c => ({ ...c, [item.id]: e.target.checked }))}
                    className="mt-0.5 w-4 h-4 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.label}</span>
                      {item.critical && <span className="text-xs px-1 rounded">Required</span>}
                    </div>
                    <span className="text-xs">{item.category}</span>
                  </div>
                </label>
              ))}
            </div>

            <button
              onClick={() => { setSubmittedCount(Object.values(checks).filter(Boolean).length); setPhase("review"); }}
              disabled={!criticalComplete}
              className="w-full text-white py-2.5 rounded-lg font-medium text-sm border-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {criticalComplete ? "Submit for review" : `Complete all required items (${REVIEW_ITEMS.filter(i => i.critical && checks[i.id]).length}/${REVIEW_ITEMS.filter(i => i.critical).length})`}
            </button>
          </>
        )}

        {phase === "review" && (
          <div className="text-center">
            <Clock className="w-10 h-10 mx-auto mb-3" />
            <h3 className="font-bold mb-1">In review</h3>
            <p className="text-sm mb-4">Security design review submitted. Awaiting approval from Security UX Lead.</p>

            <div className="rounded-lg p-4 text-left mb-4">
              <div className="flex items-center justify-between text-xs mb-2">
                <span >Submitted by</span>
                <span >Designer</span>
              </div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span >Reviewer</span>
                <span >Security UX Lead</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span >Status</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>
              </div>
            </div>

            <button onClick={() => setPhase("approved")} aria-label="Simulate approval (demo only)" className="text-xs bg-transparent border-none cursor-pointer italic">[Simulate approval]</button>
          </div>
        )}

        {phase === "approved" && (
          <div className="text-center">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3" />
            <h3 className="font-bold mb-1">Approved</h3>
            <p className="text-sm mb-4">Security UX review passed. Design is cleared for development.</p>

            <div className="border rounded-lg p-4 text-left">
              <p className="text-xs"><strong>Review outcome:</strong></p>
              <ul className="text-xs mt-2 space-y-1">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> {submittedCount}/{REVIEW_ITEMS.length} items passed</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> All critical items verified</li>
                <li className="flex items-center gap-2"><Shield className="w-3 h-3" /> Design tokens consistent</li>
              </ul>
            </div>
          </div>
        )}
        </div>
      </div>

      <div className="mt-4 p-3 rounded-lg text-xs" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <p style={{ color: "var(--green)" }}><strong>Security UX governance pattern:</strong></p>
        <p style={{ color: "var(--text)" }}>This is the process for how security UX patterns are reviewed before they ship. Critical items (auth, consent, accessibility) must pass before a design can move to development. This ensures consistency across all teams and products.</p>
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
        description="A governance process for reviewing security UX before it ships. Ensures patterns are applied consistently, critical items are verified, and there's a clear approval workflow."
        severity="high"
        tags={["Governance", "Review Process", "Compliance"]}
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
        securityRationale="Security UX governance prevents regressions. Without a review process, each team reinvents security UX — some well, some poorly. The review checklist ensures: consistent patterns across products, critical items (auth, consent, accessibility) always verified, and security standards enforced. The key insight from 20 years of industrial design leadership: governance works when it's lightweight and supportive, not when it's heavy and punitive."
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
