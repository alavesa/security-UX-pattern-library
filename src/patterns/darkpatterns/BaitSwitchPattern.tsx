import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Shield, ShieldOff, X, Bell, BellOff } from "lucide-react";

function BaitSwitchDemo() {
  const [view, setView] = useState<"dark" | "ethical">("dark");
  const [darkStep, setDarkStep] = useState(0);
  const [ethicalChoice, setEthicalChoice] = useState<string | null>(null);

  const reset = () => {
    setDarkStep(0);
    setEthicalChoice(null);
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

      {/* Dark: Close button that does something else */}
      {view === "dark" && (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-red-200 p-6">
          <div className="text-right mb-2">
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded font-mono">DARK PATTERN</span>
          </div>

          {darkStep === 0 && (
            <div>
              {/* Fake app content */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
              </div>

              {/* Popup with misleading X */}
              <div className="border-2 border-blue-300 bg-blue-50 rounded-xl p-5 relative">
                <button
                  onClick={() => setDarkStep(1)}
                  className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 bg-transparent border-none cursor-pointer text-gray-400"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>

                <Bell className="w-10 h-10 text-blue-500 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">Stay in the loop!</h3>
                <p className="text-sm text-gray-600 mb-4">Get notified about important updates and offers.</p>

                <button onClick={() => setDarkStep(2)} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm border-none cursor-pointer">
                  Enable notifications
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-3 text-center">Try clicking the X button to close this popup</p>
            </div>
          )}

          {darkStep === 1 && (
            <div>
              <div className="bg-green-50 border border-green-300 rounded-lg p-4 text-center mb-4">
                <Bell className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-green-800">Notifications enabled!</p>
                <p className="text-xs text-green-600">You'll receive push notifications from us.</p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-red-800 mb-2">What just happened:</h3>
                <ul className="text-xs text-red-700 space-y-1.5">
                  <li><strong>The X button didn't close the popup</strong> — it enabled notifications</li>
                  <li>Users expect X to mean "dismiss" — hijacking this is a trust violation</li>
                  <li>This is "Bait and Switch" — the UI promises one action but performs another</li>
                  <li>Similar tricks: "Skip" buttons that actually mean "Accept defaults"</li>
                  <li>Windows 10 famously used the X button to upgrade users to Windows 11</li>
                </ul>
              </div>
            </div>
          )}

          {darkStep === 2 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-xs text-red-700">You clicked "Enable notifications" — that was the expected action. But try the X button too to see the bait and switch.</p>
              <button onClick={() => setDarkStep(0)} className="text-xs text-red-600 underline mt-2 bg-transparent border-none cursor-pointer">Try again</button>
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

          {ethicalChoice === null ? (
            <div>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
              </div>

              <div className="border border-gray-200 bg-white rounded-xl p-5 relative">
                <button
                  onClick={() => setEthicalChoice("dismissed")}
                  className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 bg-transparent border-none cursor-pointer text-gray-400"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>

                <Bell className="w-10 h-10 text-blue-500 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">Turn on notifications?</h3>
                <p className="text-sm text-gray-600 mb-4">Get notified when someone replies to your posts. You can manage this in Settings anytime.</p>

                <div className="space-y-2">
                  <button onClick={() => setEthicalChoice("enabled")} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm border-none cursor-pointer hover:bg-blue-700">
                    Enable notifications
                  </button>
                  <button onClick={() => setEthicalChoice("dismissed")} className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-medium bg-white cursor-pointer hover:bg-gray-50">
                    Not now
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className={`${ethicalChoice === "enabled" ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"} border rounded-lg p-4 text-center mb-4`}>
                {ethicalChoice === "enabled"
                  ? <><Bell className="w-8 h-8 text-green-600 mx-auto mb-2" /><p className="text-sm font-semibold text-green-800">Notifications enabled</p></>
                  : <><BellOff className="w-8 h-8 text-gray-400 mx-auto mb-2" /><p className="text-sm font-semibold text-gray-700">Popup dismissed — no action taken</p></>
                }
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-green-800 mb-2">What's right here:</h4>
                <ul className="text-xs text-green-700 space-y-1.5">
                  <li><strong>X button dismisses</strong> — does exactly what users expect</li>
                  <li><strong>"Not now" button</strong> — explicit decline option with neutral language</li>
                  <li><strong>Clear description</strong> — says what notifications you'll get</li>
                  <li><strong>"Manage in Settings"</strong> — reduces pressure, can change later</li>
                  <li><strong>No action on dismiss</strong> — closing the popup doesn't do anything sneaky</li>
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

export function BaitSwitchPattern() {
  return (
    <div>
      <PatternHeader
        title="Bait & Switch"
        description="When UI elements do something different from what they promise. The classic: an X (close) button that actually enables a feature instead of dismissing the dialog."
        severity="critical"
        tags={["Dark Pattern", "FTC Act Section 5", "Deceptive Design"]}
      />

      <DemoContainer label="bait and switch (dark vs ethical)">
        <BaitSwitchDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Make every UI element do exactly what it visually promises",
          "X means close/dismiss — always, without exception",
          "Provide explicit 'Yes' and 'No' buttons with clear labels",
          "Dismissing a prompt should take NO action — only explicit buttons should act",
          "Use questions ('Turn on notifications?') not statements ('Stay in the loop!')",
          "Include 'Not now' as an equally visible decline option",
        ]}
        donts={[
          "NEVER make the X/close button perform an action other than dismiss",
          "Don't make 'Skip' mean 'Accept defaults' — Skip should mean 'do nothing'",
          "Don't use countdown timers that auto-accept if the user doesn't respond",
          "Don't change the position of Accept/Decline buttons between prompts",
          "Don't disguise ads as system dialogs or notifications",
          "Don't use 'Update now' buttons that actually install different software",
        ]}
        securityRationale="Bait and Switch violates FTC Act Section 5 (unfair or deceptive acts) and the EU's Unfair Commercial Practices Directive. From a security perspective, when users can't trust that UI elements do what they promise, they stop reading security prompts carefully — which is exactly when real threats slip through. Every dark pattern in your app trains users to be less security-aware in all apps."
        accessibilityNotes={[
          "Close buttons must have aria-label='Dismiss' or 'Close' — and must actually dismiss",
          "Keyboard users pressing Escape should dismiss the dialog, not perform an action",
          "Screen readers must accurately describe what each button does",
          "Focus trap on modal dialogs should release on dismiss, not redirect",
        ]}
      />
    </div>
  );
}
