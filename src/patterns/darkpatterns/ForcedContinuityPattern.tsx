import { useState, useCallback } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Shield, ShieldOff, CreditCard, CheckCircle2, Clock } from "lucide-react";

function ForcedContinuityDemo() {
  const [view, setView] = useState<"dark" | "ethical">("dark");
  const [darkStep, setDarkStep] = useState(0);
  const [ethicalStep, setEthicalStep] = useState(0);

  const reset = useCallback(() => {
    setDarkStep(0);
    setEthicalStep(0);
  }, []);

  return (
    <div className="w-full max-w-xl">
      {/* Toggle */}
      <div role="tablist" className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <button type="button" role="tab" aria-selected={view === "dark"} onClick={() => { setView("dark"); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: view === "dark" ? "rgba(255,51,51,0.15)" : "transparent", color: view === "dark" ? "var(--red)" : "var(--text)" }}>
          <ShieldOff aria-hidden="true" className="w-3.5 h-3.5 inline mr-1" /> Dark Pattern
        </button>
        <button type="button" role="tab" aria-selected={view === "ethical"} onClick={() => { setView("ethical"); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: view === "ethical" ? "var(--green-glow)" : "transparent", color: view === "ethical" ? "var(--green)" : "var(--text)" }}>
          <Shield aria-hidden="true" className="w-3.5 h-3.5 inline mr-1" /> Ethical Alternative
        </button>
      </div>

      {/* Dark: Free trial → auto-charge */}
      {view === "dark" && (
        <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "2px solid rgba(255,51,51,0.3)" }}>
          <div className="text-right mb-2">
            <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: "var(--red)", color: "white" }}>DARK PATTERN</span>
          </div>

          {darkStep === 0 && (
            <div className="text-center">
              <h3 className="text-2xl font-bold font-mono mb-2" style={{ color: "var(--text-bright)" }}>Start your free trial</h3>
              <p className="text-4xl font-bold font-mono mb-1" style={{ color: "var(--text-bright)" }}>$0</p>
              <p className="text-sm font-mono mb-6" style={{ color: "var(--text)" }}>7-day free trial</p>

              <div className="text-left space-y-2 mb-6">
                {["Unlimited access to all features", "Priority support", "Cancel anytime"].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm font-mono" style={{ color: "var(--text-bright)" }}>
                    <CheckCircle2 aria-hidden="true" className="w-4 h-4" style={{ color: "var(--green)" }} /> {f}
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium font-mono mb-1 text-left" style={{ color: "var(--text-bright)" }}>Payment method</label>
                <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                  <CreditCard aria-hidden="true" className="w-5 h-5" style={{ color: "var(--text)" }} />
                  <span className="text-sm font-mono" style={{ color: "var(--text-bright)" }}>•••• •••• •••• 4242</span>
                </div>
              </div>

              <button type="button" onClick={() => setDarkStep(1)} className="w-full py-3 rounded-lg font-bold font-mono text-sm border-none cursor-pointer" style={{ background: "#2563eb", color: "white" }}>
                Start Free Trial
              </button>

              <p role="note" aria-label="Example of deceptive fine print" className="text-xs font-mono mt-3 leading-relaxed" style={{ color: "var(--text-dim)" }}>
                <span className="sr-only">Intentionally hard to read — example of deceptive fine print: </span>
                After your free trial ends, you will be automatically charged $29.99/month. By clicking "Start Free Trial" you agree to our Terms of Service and authorize recurring charges.
              </p>
            </div>
          )}

          {darkStep === 1 && (
            <div>
              <div className="text-center mb-4">
                <CheckCircle2 aria-hidden="true" className="w-12 h-12 mx-auto mb-2" style={{ color: "var(--green)" }} />
                <h3 className="font-bold font-mono" style={{ color: "var(--text-bright)" }}>Trial started!</h3>
                <p className="text-sm font-mono" style={{ color: "var(--text)" }}>Your free trial is active.</p>
              </div>

              <div className="rounded-lg p-4" style={{ background: "rgba(255,51,51,0.08)", border: "1px solid rgba(255,51,51,0.2)" }}>
                <h3 className="text-sm font-semibold font-mono mb-2" style={{ color: "var(--red)" }}>What's wrong here:</h3>
                <ul className="text-xs font-mono space-y-1.5" style={{ color: "var(--text)" }}>
                  <li><strong style={{ color: "var(--text-bright)" }}>$29.99/month hidden in micro-text</strong> — the price after trial is barely visible</li>
                  <li><strong style={{ color: "var(--text-bright)" }}>Credit card required upfront</strong> — for a "free" trial</li>
                  <li><strong style={{ color: "var(--text-bright)" }}>"Cancel anytime" is misleading</strong> — cancellation is typically buried and complex</li>
                  <li><strong style={{ color: "var(--text-bright)" }}>Auto-charge is the default</strong> — no reminder email before the trial ends</li>
                  <li><strong style={{ color: "var(--text-bright)" }}>"Recurring charges" in fine print</strong> — user may not realize it's a subscription</li>
                  <li><strong style={{ color: "var(--text-bright)" }}>No cancellation reminder</strong> — relies on users forgetting to cancel</li>
                  <li>The FTC's "Negative Option Rule" (2024) makes this illegal in many jurisdictions</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Ethical version */}
      {view === "ethical" && (
        <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "2px solid var(--green-border)" }}>
          <div className="text-right mb-2">
            <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: "var(--green)", color: "var(--bg)" }}>ETHICAL</span>
          </div>

          {ethicalStep === 0 && (
            <div>
              <h3 className="text-2xl font-bold font-mono mb-2 text-center" style={{ color: "var(--text-bright)" }}>Try it free for 7 days</h3>

              <div className="rounded-lg p-4 mb-4" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium font-mono" style={{ color: "var(--text)" }}>Free trial</span>
                  <span className="text-sm font-bold font-mono" style={{ color: "var(--green)" }}>$0 for 7 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium font-mono" style={{ color: "var(--text)" }}>Then</span>
                  <span className="text-sm font-bold font-mono" style={{ color: "var(--text-bright)" }}>$29.99/month</span>
                </div>
              </div>

              <div className="rounded-lg p-3 mb-4 flex items-start gap-2" style={{ background: "rgba(0,255,65,0.05)", border: "1px solid var(--green-border)" }}>
                <CheckCircle2 aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--green)" }} />
                <div className="text-xs font-mono" style={{ color: "var(--text)" }}>
                  <strong style={{ color: "var(--green)" }}>No credit card required.</strong> We'll ask for payment only if you choose to continue after the trial.
                </div>
              </div>

              <div className="text-left space-y-2 mb-6">
                {["Unlimited access during trial", "We'll email you 2 days before it ends", "No charge if you don't continue"].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm font-mono" style={{ color: "var(--text-bright)" }}>
                    <CheckCircle2 aria-hidden="true" className="w-4 h-4" style={{ color: "var(--green)" }} /> {f}
                  </div>
                ))}
              </div>

              <button type="button" onClick={() => setEthicalStep(1)} className="w-full py-3 rounded-lg font-medium font-mono text-sm border-none cursor-pointer" style={{ background: "var(--green)", color: "var(--bg)" }}>
                Start free trial — no credit card needed
              </button>
            </div>
          )}

          {ethicalStep === 1 && (
            <div>
              <div className="text-center mb-4">
                <CheckCircle2 aria-hidden="true" className="w-12 h-12 mx-auto mb-2" style={{ color: "var(--green)" }} />
                <h3 className="font-bold font-mono" style={{ color: "var(--green)" }}>Trial started!</h3>
                <p className="text-sm font-mono mb-2" style={{ color: "var(--text)" }}>Your 7-day free trial is active.</p>
              </div>

              <div className="rounded-lg p-4 mb-4" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                <h4 className="text-sm font-semibold font-mono mb-3 flex items-center gap-2" style={{ color: "var(--text-bright)" }}><Clock aria-hidden="true" className="w-4 h-4" style={{ color: "var(--amber)" }} /> What happens next:</h4>
                <div className="space-y-3 text-xs font-mono">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold" style={{ background: "var(--bg-elevated)", color: "var(--text-bright)" }}>1</div>
                    <div style={{ color: "var(--text)" }}><strong style={{ color: "var(--text-bright)" }}>Day 5:</strong> We'll email you a reminder that your trial ends in 2 days</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold" style={{ background: "var(--bg-elevated)", color: "var(--text-bright)" }}>2</div>
                    <div style={{ color: "var(--text)" }}><strong style={{ color: "var(--text-bright)" }}>Day 7:</strong> Trial ends. We'll ask if you'd like to subscribe</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold" style={{ background: "var(--bg-elevated)", color: "var(--text-bright)" }}>3</div>
                    <div style={{ color: "var(--text)" }}><strong style={{ color: "var(--green)" }}>No action needed to cancel</strong> — trial simply ends</div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4" style={{ background: "rgba(0,255,65,0.05)", border: "1px solid var(--green-border)" }}>
                <h4 className="text-sm font-semibold font-mono mb-2" style={{ color: "var(--green)" }}>What's right here:</h4>
                <ul className="text-xs font-mono space-y-1.5" style={{ color: "var(--text)" }}>
                  <li><strong style={{ color: "var(--text-bright)" }}>No credit card upfront</strong> — the trial is genuinely free</li>
                  <li><strong style={{ color: "var(--text-bright)" }}>Price clearly shown</strong> — $29.99/month visible BEFORE signup, not in fine print</li>
                  <li><strong style={{ color: "var(--text-bright)" }}>Reminder before expiry</strong> — email 2 days before trial ends</li>
                  <li><strong style={{ color: "var(--text-bright)" }}>No auto-charge</strong> — trial simply expires, user chooses to subscribe</li>
                  <li><strong style={{ color: "var(--text-bright)" }}>Clear timeline</strong> — user knows exactly what to expect and when</li>
                  <li><strong style={{ color: "var(--text-bright)" }}>No action to cancel</strong> — doing nothing = cancellation (not the reverse)</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      <button type="button" onClick={reset} className="mt-4 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded" style={{ color: "var(--text)" }}>
        Reset demo
      </button>
    </div>
  );
}

export function ForcedContinuityPattern() {
  return (
    <div>
      <PatternHeader
        title="Forced Continuity"
        description="Free trials that auto-charge when they expire. Credit card required upfront, price hidden in fine print, no cancellation reminder. The subscription trap."
        severity="critical"
        tags={["Dark Pattern", "FTC Negative Option Rule", "Consumer Protection"]}
      />

      <DemoContainer label="forced continuity (dark vs ethical)">
        <ForcedContinuityDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Show the post-trial price prominently — not in fine print",
          "Offer trials WITHOUT requiring a credit card",
          "Send a reminder email 2-3 days before the trial expires",
          "Let the trial simply expire — don't auto-charge",
          "Show a clear timeline of what happens and when",
          "Make subscription a deliberate choice AFTER the trial, not a forgotten default",
          "If you must auto-charge, require explicit checkbox consent (not just 'Start Trial')",
        ]}
        donts={[
          "Don't require credit card for a 'free' trial — if you need payment info, it's not free",
          "Don't hide the subscription price in micro-text below the button",
          "Don't rely on users forgetting to cancel — that's the business model of dark patterns",
          "Don't make cancellation harder than signup",
          "Don't use 'Cancel anytime' as reassurance while making cancellation a 5-step process",
          "Don't auto-charge without sending a pre-charge notification",
          "Don't use 'We'll miss you' or other emotional manipulation in cancellation flows",
        ]}
        securityRationale="The FTC's Negative Option Rule (updated 2024) requires: (1) clear disclosure of material terms before charge, (2) affirmative consent, (3) easy cancellation. Violations result in fines up to $50,000 per incident. The EU Consumer Rights Directive has similar requirements. From a security UX perspective, forced continuity trains users to distrust legitimate payment flows — when users expect to be tricked, they're less likely to engage with genuine security prompts about their payment methods."
        accessibilityNotes={[
          "Price information must not be in low-contrast text — it's material information",
          "Trial terms must be readable by screen readers in logical order",
          "The 'Start Free Trial' button text must accurately reflect what happens",
          "Timeline steps should use ordered lists for screen reader navigation",
          "Reminder emails must be accessible (plain text + HTML versions)",
        ]}
      />
    </div>
  );
}
