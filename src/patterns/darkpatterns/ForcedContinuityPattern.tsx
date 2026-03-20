import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Shield, ShieldOff, CreditCard, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

function ForcedContinuityDemo() {
  const [view, setView] = useState<"dark" | "ethical">("dark");
  const [darkStep, setDarkStep] = useState(0);
  const [ethicalStep, setEthicalStep] = useState(0);

  const reset = () => {
    setDarkStep(0);
    setEthicalStep(0);
  };

  return (
    <div className="w-full max-w-xl">
      {/* Toggle */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <button onClick={() => { setView("dark"); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: view === "dark" ? "rgba(255,51,51,0.15)" : "transparent", color: view === "dark" ? "var(--red)" : "var(--text)" }}>
          <ShieldOff className="w-3.5 h-3.5 inline mr-1" /> Dark Pattern
        </button>
        <button onClick={() => { setView("ethical"); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: view === "ethical" ? "var(--green-glow)" : "transparent", color: view === "ethical" ? "var(--green)" : "var(--text)" }}>
          <Shield className="w-3.5 h-3.5 inline mr-1" /> Ethical Alternative
        </button>
      </div>

      {/* Dark: Free trial → auto-charge */}
      {view === "dark" && (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-red-200 p-6">
          <div className="text-right mb-2">
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded font-mono">DARK PATTERN</span>
          </div>

          {darkStep === 0 && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Start your free trial</h3>
              <p className="text-4xl font-bold text-blue-600 mb-1">$0</p>
              <p className="text-sm text-gray-500 mb-6">7-day free trial</p>

              <div className="text-left space-y-2 mb-6">
                {["Unlimited access to all features", "Priority support", "Cancel anytime"].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> {f}
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Payment method</label>
                <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-500">•••• •••• •••• 4242</span>
                </div>
              </div>

              <button onClick={() => setDarkStep(1)} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-sm border-none cursor-pointer hover:bg-blue-700">
                Start Free Trial
              </button>

              <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                After your free trial ends, you will be automatically charged $29.99/month. By clicking "Start Free Trial" you agree to our Terms of Service and authorize recurring charges.
              </p>
            </div>
          )}

          {darkStep === 1 && (
            <div>
              <div className="text-center mb-4">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <h3 className="font-bold text-gray-900">Trial started!</h3>
                <p className="text-sm text-gray-500">Your free trial is active.</p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-red-800 mb-2">What's wrong here:</h3>
                <ul className="text-xs text-red-700 space-y-1.5">
                  <li><strong>$29.99/month hidden in micro-text</strong> — the price after trial is barely visible</li>
                  <li><strong>Credit card required upfront</strong> — for a "free" trial</li>
                  <li><strong>"Cancel anytime" is misleading</strong> — cancellation is typically buried and complex</li>
                  <li><strong>Auto-charge is the default</strong> — no reminder email before the trial ends</li>
                  <li><strong>"Recurring charges" in fine print</strong> — user may not realize it's a subscription</li>
                  <li><strong>No cancellation reminder</strong> — relies on users forgetting to cancel</li>
                  <li>The FTC's "Negative Option Rule" (2024) makes this illegal in many jurisdictions</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Ethical version */}
      {view === "ethical" && (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-green-200 p-6">
          <div className="text-right mb-2">
            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded font-mono">ETHICAL</span>
          </div>

          {ethicalStep === 0 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Try it free for 7 days</h3>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900">Free trial</span>
                  <span className="text-sm font-bold text-blue-900">$0 for 7 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-900">Then</span>
                  <span className="text-sm font-bold text-blue-900">$29.99/month</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div className="text-xs text-amber-800">
                  <strong>No credit card required.</strong> We'll ask for payment only if you choose to continue after the trial.
                </div>
              </div>

              <div className="text-left space-y-2 mb-6">
                {["Unlimited access during trial", "We'll email you 2 days before it ends", "No charge if you don't continue"].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> {f}
                  </div>
                ))}
              </div>

              <button onClick={() => setEthicalStep(1)} className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-sm border-none cursor-pointer hover:bg-blue-700">
                Start free trial — no credit card needed
              </button>
            </div>
          )}

          {ethicalStep === 1 && (
            <div>
              <div className="text-center mb-4">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <h3 className="font-bold text-gray-900">Trial started!</h3>
                <p className="text-sm text-gray-500 mb-2">Your 7-day free trial is active.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"><Clock className="w-4 h-4" /> What happens next:</h4>
                <div className="space-y-3 text-xs text-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-blue-600 font-bold">1</div>
                    <div><strong>Day 5:</strong> We'll email you a reminder that your trial ends in 2 days</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-blue-600 font-bold">2</div>
                    <div><strong>Day 7:</strong> Trial ends. We'll ask if you'd like to subscribe</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center shrink-0 text-gray-600 font-bold">3</div>
                    <div><strong>No action needed to cancel</strong> — trial simply ends</div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-green-800 mb-2">What's right here:</h4>
                <ul className="text-xs text-green-700 space-y-1.5">
                  <li><strong>No credit card upfront</strong> — the trial is genuinely free</li>
                  <li><strong>Price clearly shown</strong> — $29.99/month visible BEFORE signup, not in fine print</li>
                  <li><strong>Reminder before expiry</strong> — email 2 days before trial ends</li>
                  <li><strong>No auto-charge</strong> — trial simply expires, user chooses to subscribe</li>
                  <li><strong>Clear timeline</strong> — user knows exactly what to expect and when</li>
                  <li><strong>No action to cancel</strong> — doing nothing = cancellation (not the reverse)</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      <button onClick={reset} className="mt-4 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer" style={{ color: "var(--text)" }}>
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
