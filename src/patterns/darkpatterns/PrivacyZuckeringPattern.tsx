import { useState, useCallback } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Shield, ShieldOff, Users, Globe, MapPin, Camera, Mic } from "lucide-react";

function PrivacyZuckeringDemo() {
  const [view, setView] = useState<"dark" | "ethical">("dark");
  const [darkStep, setDarkStep] = useState(0);
  const [ethicalPermissions, setEthicalPermissions] = useState({ contacts: false, location: false, camera: false, microphone: false });

  const reset = useCallback(() => {
    setDarkStep(0);
    setEthicalPermissions({ contacts: false, location: false, camera: false, microphone: false });
  }, []);

  return (
    <div className="w-full max-w-xl">
      {/* Toggle */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <button aria-pressed={view === "dark"} onClick={() => { setView("dark"); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: view === "dark" ? "rgba(255,51,51,0.15)" : "transparent", color: view === "dark" ? "var(--red)" : "var(--text)" }}>
          <ShieldOff aria-hidden="true" className="w-3.5 h-3.5 inline mr-1" /> Dark Pattern
        </button>
        <button aria-pressed={view === "ethical"} onClick={() => { setView("ethical"); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: view === "ethical" ? "var(--green-glow)" : "transparent", color: view === "ethical" ? "var(--green)" : "var(--text)" }}>
          <Shield aria-hidden="true" className="w-3.5 h-3.5 inline mr-1" /> Ethical Alternative
        </button>
      </div>

      {/* Dark: Onboarding that tricks into sharing everything */}
      {view === "dark" && (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-red-200 p-6">
          <div className="text-right mb-2">
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded font-mono">DARK PATTERN</span>
          </div>

          {darkStep === 0 && (
            <div className="text-center">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Find your friends!</h3>
              <p className="text-sm text-gray-600 mb-6">Connect with people you already know to get the most out of the app.</p>
              <button onClick={() => setDarkStep(1)} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-sm border-none cursor-pointer hover:bg-blue-700">
                Get Started
              </button>
              <p className="text-xs text-gray-400 mt-3">Step 1 of 3</p>
            </div>
          )}

          {darkStep === 1 && (
            <div className="text-center">
              <Globe className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Personalize your experience</h3>
              <p className="text-sm text-gray-600 mb-2">Allow access to make the app work better for you.</p>
              <p className="text-xs text-gray-400 mb-6">This helps us show you relevant content near you.</p>

              <div className="space-y-3 mb-6 text-left">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2"><Users className="w-4 h-4 text-gray-500" /><span className="text-sm">Contacts</span></div>
                  <div aria-hidden="true" className="w-10 h-5 bg-blue-600 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5" /></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-500" /><span className="text-sm">Location</span></div>
                  <div aria-hidden="true" className="w-10 h-5 bg-blue-600 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5" /></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2"><Camera className="w-4 h-4 text-gray-500" /><span className="text-sm">Camera & Photos</span></div>
                  <div aria-hidden="true" className="w-10 h-5 bg-blue-600 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5" /></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2"><Mic className="w-4 h-4 text-gray-500" /><span className="text-sm">Microphone</span></div>
                  <div aria-hidden="true" className="w-10 h-5 bg-blue-600 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5" /></div>
                </div>
              </div>

              <button onClick={() => setDarkStep(2)} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-sm border-none cursor-pointer">
                Continue
              </button>
              <p className="text-xs text-gray-300 mt-2">
                By continuing, you agree to share this data with us and our partners
              </p>
            </div>
          )}

          {darkStep === 2 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-red-800 mb-2">What just happened:</h3>
              <ul className="text-xs text-red-700 space-y-1.5">
                <li><strong>All permissions pre-enabled</strong> — user has to opt OUT of each one individually</li>
                <li><strong>"Find your friends"</strong> — friendly framing for uploading your entire contact list</li>
                <li><strong>"Personalize your experience"</strong> — euphemism for location tracking + data harvesting</li>
                <li><strong>Microphone access</strong> — why does a social app need your mic during onboarding?</li>
                <li><strong>"and our partners"</strong> — hidden in tiny gray text, means data sold to third parties</li>
                <li><strong>No individual explanations</strong> — doesn't say WHY each permission is needed</li>
                <li><strong>No skip option</strong> — "Continue" is the only button, implying all permissions are required</li>
              </ul>
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

          <h3 className="font-bold text-gray-900 mb-2">App permissions</h3>
          <p className="text-sm text-gray-600 mb-6">Choose what you'd like to share. You can change these anytime in Settings.</p>

          <div className="space-y-4 mb-6">
            {[
              { key: "contacts" as const, icon: Users, label: "Contacts", why: "Find friends who are already on the app", optional: true },
              { key: "location" as const, icon: MapPin, label: "Location", why: "Show nearby events and content", optional: true },
              { key: "camera" as const, icon: Camera, label: "Camera", why: "Take and share photos in the app", optional: true },
              { key: "microphone" as const, icon: Mic, label: "Microphone", why: "Record voice messages", optional: true },
            ].map(({ key, icon: Icon, label, why, optional }) => (
              <div key={key} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                <Icon className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        aria-label={label}
                        checked={ethicalPermissions[key]}
                        onChange={e => setEthicalPermissions(p => ({ ...p, [key]: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className={`relative w-10 h-5 rounded-full transition-colors ${ethicalPermissions[key] ? "bg-blue-600" : "bg-gray-300"}`}>
                        <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${ethicalPermissions[key] ? "right-0.5" : "left-0.5"}`} />
                      </div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{why}</p>
                  {optional && <span className="text-xs text-gray-400">Optional</span>}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-sm border-none cursor-pointer hover:bg-blue-700">
            Continue {Object.values(ethicalPermissions).some(Boolean) ? `with ${Object.values(ethicalPermissions).filter(Boolean).length} permissions` : "without sharing"}
          </button>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
            <h4 className="text-sm font-semibold text-green-800 mb-2">What's right here:</h4>
            <ul className="text-xs text-green-700 space-y-1.5">
              <li><strong>All toggles default to OFF</strong> — opt-in, not opt-out</li>
              <li><strong>Each permission explained</strong> — users know WHY before they decide</li>
              <li><strong>Marked as "Optional"</strong> — no pressure, no guilt</li>
              <li><strong>Button updates dynamically</strong> — "Continue without sharing" is a valid path</li>
              <li><strong>"Change anytime in Settings"</strong> — reduces FOMO and decision pressure</li>
            </ul>
          </div>
        </div>
      )}

      <button onClick={reset} className="mt-4 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer" style={{ color: "var(--text)" }}>
        Reset demo
      </button>
    </div>
  );
}

export function PrivacyZuckeringPattern() {
  return (
    <div>
      <PatternHeader
        title="Privacy Zuckering"
        description="Named after Facebook's permission patterns. Tricking users into sharing more data than they intend to through confusing interfaces, pre-selected options, and misleading framing."
        severity="critical"
        tags={["Dark Pattern", "GDPR Art. 5", "Data Minimization"]}
      />

      <DemoContainer label="privacy zuckering (dark vs ethical)">
        <PrivacyZuckeringDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Default all permissions to OFF — require explicit opt-in",
          "Explain WHY each permission is needed in plain language",
          "Mark non-essential permissions as 'Optional'",
          "Allow users to proceed without granting any permissions",
          "Show the button state dynamically ('Continue without sharing' vs 'Continue with 2 permissions')",
          "Tell users they can change permissions later in Settings",
          "Request permissions at the moment they're needed, not all during onboarding",
        ]}
        donts={[
          "Don't pre-enable permissions and make users opt out",
          "Don't bundle unrelated permissions together ('Find friends' = upload contacts + location + camera)",
          "Don't use friendly euphemisms to hide data collection ('Personalize your experience' = tracking)",
          "Don't hide 'and our partners' in gray micro-text below the button",
          "Don't make skipping impossible — there must always be a 'No thanks' path",
          "Don't request microphone/camera access during onboarding without a clear immediate use case",
          "Don't use dark patterns even if your data practices are actually benign",
        ]}
        securityRationale="GDPR Article 5 requires data minimization — collect only what's necessary for the stated purpose. Pre-enabling all permissions violates Article 7 (conditions for consent) because consent that's bundled, pre-selected, or hidden isn't 'freely given.' The FTC has fined companies billions for misleading privacy practices. From a security perspective, every unnecessary permission increases the attack surface — if the app is compromised, stolen location/contact/camera data becomes the attacker's data."
        accessibilityNotes={[
          "Permission toggles must be keyboard accessible and properly labeled",
          "The 'Optional' label helps all users, not just screen reader users",
          "WHY text for each permission provides context that benefits everyone",
          "Dynamic button text must be announced to screen readers on change",
          "Don't hide important information in low-contrast gray text",
        ]}
      />
    </div>
  );
}
