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
        <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "2px solid rgba(255,51,51,0.3)" }}>
          <div className="text-right mb-2">
            <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: "var(--red)", color: "white" }}>DARK PATTERN</span>
          </div>

          {darkStep === 0 && (
            <div>
              <h3 className="font-bold font-mono mb-2" style={{ color: "var(--text-bright)" }}>Account Settings</h3>
              <div className="space-y-2 mb-6">
                {["Profile", "Notifications", "Privacy", "Billing", "Help & Support"].map(item => (
                  <div key={item} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid var(--border)" }}>
                    <span className="text-sm font-mono" style={{ color: "var(--text-bright)" }}>{item}</span>
                    <span style={{ color: "var(--text-dim)" }}>→</span>
                  </div>
                ))}
              </div>
              <p className="text-xs font-mono mb-2" style={{ color: "var(--text)" }}>
                Looking for something else? <button type="button" onClick={() => setDarkStep(1)} className="text-xs font-mono underline bg-transparent border-none cursor-pointer" style={{ color: "var(--text-dim)" }}>Visit our help center</button>
              </p>
              <div className="rounded-lg p-3 mt-4" style={{ background: "rgba(255,170,0,0.08)", border: "1px solid rgba(255,170,0,0.2)" }}>
                <p className="text-xs font-mono" style={{ color: "var(--amber)" }}><strong>Notice:</strong> <span style={{ color: "var(--text)" }}>"Delete account" isn't in the settings. You have to find a tiny link to the help center.</span></p>
              </div>
            </div>
          )}

          {darkStep === 1 && (
            <div>
              <h3 className="font-bold font-mono mb-4" style={{ color: "var(--text-bright)" }}>Help Center</h3>
              <label htmlFor="help-search" className="sr-only">Search for help</label>
              <input id="help-search" placeholder="Search for help..." className="w-full px-3 py-2 rounded-lg text-sm font-mono mb-4" style={{ background: "var(--bg)", color: "var(--text-bright)", border: "1px solid var(--border)" }} />
              <div className="space-y-2 mb-4">
                {["How to change my password", "Billing FAQ", "Privacy settings", "Contact support"].map(item => (
                  <div key={item} style={{ borderBottom: "1px solid var(--border)" }}>
                    <button type="button" className="w-full text-left py-2 text-sm font-mono cursor-pointer bg-transparent border-none" style={{ color: "var(--text-bright)" }}>{item}</button>
                  </div>
                ))}
              </div>
              <p className="text-xs font-mono" style={{ color: "var(--text)" }}>
                Can't find what you need? <button type="button" onClick={() => setDarkStep(2)} className="text-xs font-mono underline bg-transparent border-none cursor-pointer" style={{ color: "var(--text-dim)" }}>Contact us</button>
              </p>
              <div className="rounded-lg p-3 mt-4" style={{ background: "rgba(255,170,0,0.08)", border: "1px solid rgba(255,170,0,0.2)" }}>
                <p className="text-xs font-mono" style={{ color: "var(--amber)" }}><strong>Step 2:</strong> <span style={{ color: "var(--text)" }}>The help center doesn't have a "delete account" option either. You need to contact support.</span></p>
              </div>
            </div>
          )}

          {darkStep === 2 && (
            <div>
              <h3 className="font-bold font-mono mb-2" style={{ color: "var(--text-bright)" }}>We're sorry to see you go</h3>
              <p className="text-sm font-mono mb-4" style={{ color: "var(--text)" }}>Before you leave, would you like to try these instead?</p>

              <div className="space-y-2 mb-4">
                {["Pause my account instead (keep all data)", "Downgrade to free plan", "Talk to a retention specialist"].map(label => (
                  <button key={label} type="button" className="w-full py-3 rounded-lg text-sm font-medium font-mono cursor-pointer" style={{ background: "transparent", color: "var(--text-bright)", border: "1px solid var(--border)" }}>
                    {label}
                  </button>
                ))}
              </div>

              <button type="button" onClick={() => setDarkStep(3)} className="text-xs font-mono bg-transparent border-none cursor-pointer" style={{ color: "var(--text-dim)" }}>
                I still want to delete my account
              </button>

              <div className="rounded-lg p-3 mt-4" style={{ background: "rgba(255,170,0,0.08)", border: "1px solid rgba(255,170,0,0.2)" }}>
                <p className="text-xs font-mono" style={{ color: "var(--amber)" }}><strong>Step 3:</strong> <span style={{ color: "var(--text)" }}>Three retention offers before you can proceed. The actual delete link is tiny gray text at the bottom.</span></p>
              </div>
            </div>
          )}

          {darkStep === 3 && (
            <div>
              <h3 className="font-bold font-mono mb-4" style={{ color: "var(--text-bright)" }}>Tell us why you're leaving</h3>
              <p className="text-sm font-mono mb-4" style={{ color: "var(--text)" }}>Please select a reason (required):</p>
              <div className="space-y-2 mb-4">
                {["Too expensive", "Found a better alternative", "Don't need it anymore", "Privacy concerns", "Other"].map(r => (
                  <label key={r} className="flex items-center gap-2 text-sm font-mono cursor-pointer" style={{ color: "var(--text-bright)" }}>
                    <input type="radio" name="reason" />
                    {r}
                  </label>
                ))}
              </div>
              <label htmlFor="deletion-reason" className="sr-only">Please explain in detail why you are leaving</label>
              <textarea id="deletion-reason" placeholder="Please explain in detail (required, minimum 50 characters)..." className="w-full px-3 py-2 rounded-lg text-sm font-mono mb-4 h-20" style={{ background: "var(--bg)", color: "var(--text-bright)", border: "1px solid var(--border)" }} />
              <button type="button" onClick={() => setDarkStep(4)} className="w-full py-2.5 rounded-lg text-sm font-medium font-mono border-none cursor-pointer" style={{ background: "var(--red)", color: "white" }}>
                Permanently delete my account
              </button>

              <div className="rounded-lg p-3 mt-4" style={{ background: "rgba(255,170,0,0.08)", border: "1px solid rgba(255,170,0,0.2)" }}>
                <p className="text-xs font-mono" style={{ color: "var(--amber)" }}><strong>Step 4:</strong> <span style={{ color: "var(--text)" }}>Required survey with minimum character count. All designed to make you give up.</span></p>
              </div>
            </div>
          )}

          {darkStep === 4 && (
            <div className="rounded-lg p-4" style={{ background: "rgba(255,51,51,0.08)", border: "1px solid rgba(255,51,51,0.2)" }}>
              <h3 className="text-sm font-semibold font-mono mb-2" style={{ color: "var(--red)" }}>That was 4 steps to delete an account:</h3>
              <ol className="text-xs font-mono space-y-1 list-decimal list-inside" style={{ color: "var(--text)" }}>
                <li>Settings → no delete option (hidden in help center link)</li>
                <li>Help center → no delete option (hidden in contact link)</li>
                <li>3 retention offers before seeing the real delete link</li>
                <li>Required survey with minimum character count</li>
              </ol>
              <p className="text-xs font-mono mt-2 font-semibold" style={{ color: "var(--red)" }}>This violates GDPR Article 17 (Right to Erasure) — deletion must be as easy as signup.</p>
            </div>
          )}

          <div className="flex justify-between mt-4 text-xs font-mono" style={{ color: "var(--text)" }}>
            <span>Step {Math.min(darkStep + 1, 5)}/5</span>
            {darkStep > 0 && (
              <button type="button" onClick={() => setDarkStep(s => s - 1)} className="bg-transparent border-none cursor-pointer underline" style={{ color: "var(--text)" }}>Back</button>
            )}
          </div>
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
              <h3 className="font-bold font-mono mb-2" style={{ color: "var(--text-bright)" }}>Account Settings</h3>
              <div className="space-y-2 mb-4">
                {["Profile", "Notifications", "Privacy", "Billing"].map(item => (
                  <div key={item} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid var(--border)" }}>
                    <span className="text-sm font-mono" style={{ color: "var(--text-bright)" }}>{item}</span>
                    <span style={{ color: "var(--text-dim)" }}>→</span>
                  </div>
                ))}
              </div>
              <div className="pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                <button
                  type="button"
                  onClick={() => setEthicalStep(1)}
                  className="flex items-center gap-2 text-sm font-mono bg-transparent border-none cursor-pointer"
                  style={{ color: "var(--red)" }}
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
                <AlertTriangle aria-hidden="true" className="w-6 h-6 shrink-0" style={{ color: "var(--red)" }} />
                <div>
                  <h3 className="font-bold font-mono mb-1" style={{ color: "var(--text-bright)" }}>Delete your account?</h3>
                  <p className="text-sm font-mono" style={{ color: "var(--text)" }}>This is permanent and cannot be undone.</p>
                </div>
              </div>

              <div className="rounded-lg p-4 mb-4" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                <h4 className="text-xs font-semibold font-mono mb-2" style={{ color: "var(--red)" }}>What will be deleted:</h4>
                <ul className="text-xs font-mono space-y-1" style={{ color: "var(--text)" }}>
                  <li>Your profile and settings</li>
                  <li>All saved data and history</li>
                  <li>Active subscription (if any)</li>
                </ul>
                <h4 className="text-xs font-semibold font-mono mt-3 mb-2" style={{ color: "var(--text-bright)" }}>Want to keep your data?</h4>
                <button type="button" onClick={() => alert('In a real app, this would trigger a data export email.')} className="text-xs font-mono bg-transparent border-none cursor-pointer underline" style={{ color: "var(--cyan)" }}>
                  Download your data first
                </button>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setEthicalStep(2)}
                  className="w-full py-2.5 rounded-lg font-medium font-mono text-sm transition-colors border-none cursor-pointer"
                  style={{ background: "var(--red)", color: "white" }}
                >
                  Permanently delete my account
                </button>
                <button
                  type="button"
                  onClick={() => setEthicalStep(0)}
                  className="w-full py-2.5 rounded-lg text-sm font-medium font-mono transition-colors cursor-pointer"
                  style={{ background: "transparent", color: "var(--text-bright)", border: "1px solid var(--border)" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {ethicalStep === 2 && (
            <div className="text-center">
              <CheckCircle2 aria-hidden="true" className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--green)" }} />
              <h3 className="font-bold font-mono mb-2" style={{ color: "var(--green)" }}>Account deleted</h3>
              <p className="text-sm font-mono mb-4" style={{ color: "var(--text)" }}>Your data has been scheduled for deletion. You'll receive a confirmation email.</p>

              <div className="rounded-lg p-4 text-left" style={{ background: "rgba(0,255,65,0.05)", border: "1px solid var(--green-border)" }}>
                <h4 className="text-sm font-semibold font-mono mb-2" style={{ color: "var(--green)" }}>What's right here:</h4>
                <ul className="text-xs font-mono space-y-1.5" style={{ color: "var(--text)" }}>
                  <li><strong style={{ color: "var(--text-bright)" }}>2 steps total</strong> — find it in settings, confirm once</li>
                  <li><strong style={{ color: "var(--text-bright)" }}>Clear about consequences</strong> — lists exactly what gets deleted</li>
                  <li><strong style={{ color: "var(--text-bright)" }}>Data export offered</strong> — respects GDPR right to data portability</li>
                  <li><strong style={{ color: "var(--text-bright)" }}>No retention dark patterns</strong> — no guilt, no maze, no surveys</li>
                  <li><strong style={{ color: "var(--text-bright)" }}>Equally prominent Cancel</strong> — in case they changed their mind</li>
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
