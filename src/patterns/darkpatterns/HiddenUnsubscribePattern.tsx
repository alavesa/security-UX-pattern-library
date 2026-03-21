import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Shield, ShieldOff, Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";

function HiddenUnsubscribeDemo() {
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
        <button
          type="button"
          aria-pressed={view === "dark"}
          onClick={() => { setView("dark"); reset(); }}
          className="flex-1 text-xs py-2 rounded-md font-mono transition-colors border-none cursor-pointer"
          style={{ background: view === "dark" ? "rgba(255,51,51,0.15)" : "transparent", color: view === "dark" ? "var(--red)" : "var(--text)" }}
        >
          <ShieldOff aria-hidden="true" className="w-3.5 h-3.5 inline mr-1" /> Dark Pattern
        </button>
        <button
          type="button"
          aria-pressed={view === "ethical"}
          onClick={() => { setView("ethical"); reset(); }}
          className="flex-1 text-xs py-2 rounded-md font-mono transition-colors border-none cursor-pointer"
          style={{ background: view === "ethical" ? "var(--green-glow)" : "transparent", color: view === "ethical" ? "var(--green)" : "var(--text)" }}
        >
          <Shield aria-hidden="true" className="w-3.5 h-3.5 inline mr-1" /> Ethical Alternative
        </button>
      </div>

      {/* Dark pattern: 5-step deletion maze */}
      {view === "dark" && (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-red-200 p-6">
          <div className="text-right mb-2">
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded font-mono">DARK PATTERN</span>
          </div>

          {darkStep === 0 && (
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Account Settings</h3>
              <div className="space-y-2 mb-6">
                {["Profile", "Notifications", "Privacy", "Billing", "Help & Support"].map(item => (
                  <div key={item} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-700">{item}</span>
                    <span className="text-gray-300">→</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-300 mb-2">
                Looking for something else? <button type="button" onClick={() => setDarkStep(1)} className="text-xs text-gray-400 underline bg-transparent border-none cursor-pointer">Visit our help center</button>
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                <p className="text-xs text-red-700"><strong>Notice:</strong> "Delete account" isn't in the settings. You have to find a tiny link to the help center.</p>
              </div>
            </div>
          )}

          {darkStep === 1 && (
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Help Center</h3>
              <label htmlFor="help-search" className="sr-only">Search for help</label>
              <input id="help-search" placeholder="Search for help..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-4" />
              <div className="space-y-2 mb-4">
                {["How to change my password", "Billing FAQ", "Privacy settings", "Contact support"].map(item => (
                  <div key={item} className="border-b border-gray-100">
                    <button type="button" className="w-full text-left py-2 text-sm text-blue-600 cursor-pointer bg-transparent border-none">{item}</button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400">
                Can't find what you need? <button type="button" onClick={() => setDarkStep(2)} className="text-xs text-gray-400 underline bg-transparent border-none cursor-pointer">Contact us</button>
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                <p className="text-xs text-red-700"><strong>Step 2:</strong> The help center doesn't have a "delete account" option either. You need to contact support.</p>
              </div>
            </div>
          )}

          {darkStep === 2 && (
            <div>
              <h3 className="font-bold text-gray-900 mb-2">We're sorry to see you go</h3>
              <p className="text-sm text-gray-600 mb-4">Before you leave, would you like to try these instead?</p>

              <div className="space-y-2 mb-4">
                <button type="button" className="w-full border border-blue-300 text-blue-700 py-3 rounded-lg text-sm font-medium bg-blue-50 cursor-pointer">
                  Pause my account instead (keep all data)
                </button>
                <button type="button" className="w-full border border-blue-300 text-blue-700 py-3 rounded-lg text-sm font-medium bg-blue-50 cursor-pointer">
                  Downgrade to free plan
                </button>
                <button type="button" className="w-full border border-blue-300 text-blue-700 py-3 rounded-lg text-sm font-medium bg-blue-50 cursor-pointer">
                  Talk to a retention specialist
                </button>
              </div>

              <button type="button" onClick={() => setDarkStep(3)} className="text-xs text-gray-400 bg-transparent border-none cursor-pointer">
                I still want to delete my account
              </button>

              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                <p className="text-xs text-red-700"><strong>Step 3:</strong> Three retention offers before you can proceed. The actual delete link is tiny gray text at the bottom.</p>
              </div>
            </div>
          )}

          {darkStep === 3 && (
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Tell us why you're leaving</h3>
              <p className="text-sm text-gray-600 mb-4">Please select a reason (required):</p>
              <div className="space-y-2 mb-4">
                {["Too expensive", "Found a better alternative", "Don't need it anymore", "Privacy concerns", "Other"].map(r => (
                  <label key={r} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="radio" name="reason" className="text-blue-600" />
                    {r}
                  </label>
                ))}
              </div>
              <label htmlFor="deletion-reason" className="sr-only">Please explain in detail why you are leaving</label>
              <textarea id="deletion-reason" placeholder="Please explain in detail (required, minimum 50 characters)..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-4 h-20" />
              <button type="button" onClick={() => setDarkStep(4)} className="w-full bg-red-600 text-white py-2.5 rounded-lg text-sm font-medium border-none cursor-pointer">
                Permanently delete my account
              </button>

              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                <p className="text-xs text-red-700"><strong>Step 4:</strong> Required survey with minimum character count. All designed to make you give up.</p>
              </div>
            </div>
          )}

          {darkStep === 4 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-red-800 mb-2">That was 4 steps to delete an account:</h3>
              <ol className="text-xs text-red-700 space-y-1 list-decimal list-inside">
                <li>Settings → no delete option (hidden in help center link)</li>
                <li>Help center → no delete option (hidden in contact link)</li>
                <li>3 retention offers before seeing the real delete link</li>
                <li>Required survey with minimum character count</li>
              </ol>
              <p className="text-xs text-red-700 mt-2 font-semibold">This violates GDPR Article 17 (Right to Erasure) — deletion must be as easy as signup.</p>
            </div>
          )}

          <div className="flex justify-between mt-4 text-xs" style={{ color: "var(--text)" }}>
            <span>Step {Math.min(darkStep + 1, 5)}/5</span>
            {darkStep > 0 && (
              <button type="button" onClick={() => setDarkStep(s => s - 1)} className="bg-transparent border-none cursor-pointer underline" style={{ color: "var(--text)" }}>Back</button>
            )}
          </div>
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
              <h3 className="font-bold text-gray-900 mb-2">Account Settings</h3>
              <div className="space-y-2 mb-4">
                {["Profile", "Notifications", "Privacy", "Billing"].map(item => (
                  <div key={item} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-700">{item}</span>
                    <span className="text-gray-300">→</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4">
                <button
                  type="button"
                  onClick={() => setEthicalStep(1)}
                  className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 bg-transparent border-none cursor-pointer"
                >
                  <Trash2 aria-hidden="true" className="w-4 h-4" />
                  Delete my account
                </button>
              </div>
            </div>
          )}

          {ethicalStep === 1 && (
            <div>
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle aria-hidden="true" className="w-6 h-6 text-amber-500 shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Delete your account?</h3>
                  <p className="text-sm text-gray-600">This is permanent and cannot be undone.</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <h4 className="text-xs font-semibold text-amber-800 mb-2">What will be deleted:</h4>
                <ul className="text-xs text-amber-700 space-y-1">
                  <li>Your profile and settings</li>
                  <li>All saved data and history</li>
                  <li>Active subscription (if any)</li>
                </ul>
                <h4 className="text-xs font-semibold text-amber-800 mt-3 mb-2">Want to keep your data?</h4>
                <button type="button" onClick={() => alert('In a real app, this would trigger a data export email.')} className="text-xs text-blue-600 bg-transparent border-none cursor-pointer underline">
                  Download your data first
                </button>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setEthicalStep(2)}
                  className="w-full bg-red-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-red-700 transition-colors border-none cursor-pointer"
                >
                  Permanently delete my account
                </button>
                <button
                  type="button"
                  onClick={() => setEthicalStep(0)}
                  className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors bg-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {ethicalStep === 2 && (
            <div className="text-center">
              <CheckCircle2 aria-hidden="true" className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Account deleted</h3>
              <p className="text-sm text-gray-600 mb-4">Your data has been scheduled for deletion. You'll receive a confirmation email.</p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                <h4 className="text-sm font-semibold text-green-800 mb-2">What's right here:</h4>
                <ul className="text-xs text-green-700 space-y-1.5">
                  <li><strong>2 steps total</strong> — find it in settings, confirm once</li>
                  <li><strong>Clear about consequences</strong> — lists exactly what gets deleted</li>
                  <li><strong>Data export offered</strong> — respects GDPR right to data portability</li>
                  <li><strong>No retention dark patterns</strong> — no guilt, no maze, no surveys</li>
                  <li><strong>Equally prominent Cancel</strong> — in case they changed their mind</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      <button type="button" onClick={reset} className="mt-4 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer" style={{ color: "var(--text)" }}>
        Reset demo
      </button>
    </div>
  );
}

export function HiddenUnsubscribePattern() {
  return (
    <div>
      <PatternHeader
        title="Hidden Unsubscribe / Account Deletion"
        description="The 'roach motel' pattern — easy to sign up, impossible to leave. Compare a 4-step deletion maze with the ethical 2-step alternative."
        severity="critical"
        tags={["Dark Pattern", "GDPR Art. 17", "Right to Erasure"]}
      />

      <DemoContainer label="account deletion (dark vs ethical)">
        <HiddenUnsubscribeDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Put 'Delete account' in the settings page where users expect it",
          "Make deletion a maximum of 2 steps — find it, confirm it",
          "Clearly list what will be deleted before confirmation",
          "Offer data export before deletion (GDPR right to data portability)",
          "Send a confirmation email after deletion",
          "Allow a grace period (30 days) for accidental deletion — but actually delete after",
          "Use the same visual weight for Cancel and Delete buttons",
        ]}
        donts={[
          "Don't hide the delete option behind help centers, support tickets, or phone calls",
          "Don't force users through retention offers before they can delete",
          "Don't require a 'reason' survey to proceed — make it optional",
          "Don't use confirmshaming ('You'll lose all your precious memories!')",
          "Don't 'soft delete' forever — actually delete the data as promised",
          "Don't make signup 1 click but deletion 10 clicks — GDPR requires equal ease",
          "Don't require users to contact customer support to delete their account",
        ]}
        securityRationale="GDPR Article 17 (Right to Erasure) gives users the right to have their data deleted. The process must be as easy as the process to give consent in the first place. The FTC has taken enforcement action against companies that make cancellation harder than signup (the 'negative option rule'). From a security perspective, an account the user can't delete is an attack surface they can't close — abandoned accounts with reused passwords become liability vectors."
        accessibilityNotes={[
          "The delete option must be keyboard navigable and screen reader accessible",
          "Don't hide it behind hover-only interactions or visual-only cues",
          "Confirmation dialogs must trap focus appropriately",
          "The 'Download your data' link must be functional and accessible",
          "Don't use JavaScript-only deletion — provide a fallback path",
        ]}
      />
    </div>
  );
}
