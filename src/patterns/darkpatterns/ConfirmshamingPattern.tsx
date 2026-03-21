import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Shield, ShieldOff } from "lucide-react";

function ConfirmshamingDemo() {
  const [view, setView] = useState<"dark" | "ethical">("dark");
  const [darkDismissed, setDarkDismissed] = useState(false);
  const [ethicalChoice, setEthicalChoice] = useState<string | null>(null);

  const reset = () => {
    setDarkDismissed(false);
    setEthicalChoice(null);
  };

  const choiceLabels: Record<string, string> = { enabled: "Set up now", later: "Remind me later", skip: "Skip for now" };

  return (
    <div className="w-full max-w-xl">
      {/* Toggle */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <button
          type="button"
          onClick={() => { setView("dark"); reset(); }}
          className={`flex-1 text-xs py-2 rounded-md font-mono transition-colors border-none cursor-pointer ${view === "dark" ? "font-medium" : ""}`}
          style={{ background: view === "dark" ? "rgba(255,51,51,0.15)" : "transparent", color: view === "dark" ? "var(--red)" : "var(--text)" }}
        >
          <ShieldOff className="w-3.5 h-3.5 inline mr-1" aria-hidden="true" /> Dark Pattern
        </button>
        <button
          type="button"
          onClick={() => { setView("ethical"); reset(); }}
          className={`flex-1 text-xs py-2 rounded-md font-mono transition-colors border-none cursor-pointer ${view === "ethical" ? "font-medium" : ""}`}
          style={{ background: view === "ethical" ? "var(--green-glow)" : "transparent", color: view === "ethical" ? "var(--green)" : "var(--text)" }}
        >
          <Shield className="w-3.5 h-3.5 inline mr-1" aria-hidden="true" /> Ethical Alternative
        </button>
      </div>

      {/* Dark pattern version */}
      {view === "dark" && (
        <div className="relative bg-white rounded-2xl shadow-lg border-2 border-red-200 overflow-hidden">
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded font-mono text-right">
            DARK PATTERN
          </div>

          {!darkDismissed ? (
            <div className="p-8 text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Enable two-factor authentication</h2>
              <p className="text-sm text-gray-600 mb-6">Protect your account with an extra layer of security.</p>

              <div className="space-y-3">
                <button type="button" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors border-none cursor-pointer">
                  Yes, protect my account
                </button>
                <button
                  type="button"
                  onClick={() => setDarkDismissed(true)}
                  className="w-full text-sm py-2 bg-transparent border-none cursor-pointer"
                  style={{ color: "#999" }}
                >
                  No thanks, I don't care about my security
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm text-gray-500 mb-4">You dismissed the prompt.</p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
                <h3 className="text-sm font-semibold text-red-800 mb-2">What's wrong here:</h3>
                <ul className="text-xs text-red-700 space-y-1.5">
                  <li><strong>"I don't care about my security"</strong> — guilts the user for making a valid choice</li>
                  <li>Implies the user is irresponsible or foolish for declining</li>
                  <li>Only two options: comply or be shamed</li>
                  <li>No "Remind me later" — forcing an immediate decision</li>
                  <li>Users who feel manipulated lose trust in the product</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Ethical version */}
      {view === "ethical" && (
        <div className="relative bg-white rounded-2xl shadow-lg border-2 border-green-200 overflow-hidden">
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded font-mono text-right">
            ETHICAL
          </div>

          {ethicalChoice === null ? (
            <div className="p-8 text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Add two-factor authentication?</h2>
              <p className="text-sm text-gray-600 mb-2">This adds an extra verification step when you sign in.</p>
              <p className="text-xs text-gray-400 mb-6">You can always enable this later in Settings → Security.</p>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setEthicalChoice("enabled")}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors border-none cursor-pointer"
                >
                  Set up now
                </button>
                <button
                  type="button"
                  onClick={() => setEthicalChoice("later")}
                  className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors bg-white cursor-pointer"
                >
                  Remind me later
                </button>
                <button
                  type="button"
                  onClick={() => setEthicalChoice("skip")}
                  className="w-full text-sm py-2 text-gray-500 bg-transparent border-none cursor-pointer hover:text-gray-700"
                >
                  Skip for now
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm text-gray-500 mb-4">
                You chose: <strong>{choiceLabels[ethicalChoice] ?? ethicalChoice}</strong>
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                <h3 className="text-sm font-semibold text-green-800 mb-2">What's right here:</h3>
                <ul className="text-xs text-green-700 space-y-1.5">
                  <li><strong>Neutral language</strong> — no guilt, no shaming, no manipulation</li>
                  <li><strong>Three choices</strong> — set up, remind later, or skip — all equally valid</li>
                  <li><strong>Clear path back</strong> — tells users where to find this later (Settings → Security)</li>
                  <li><strong>Respects autonomy</strong> — users make informed choices, not coerced ones</li>
                  <li><strong>Builds trust</strong> — transparent communication earns long-term engagement</li>
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

export function ConfirmshamingPattern() {
  return (
    <div>
      <PatternHeader
        title="Confirmshaming"
        description="When dismiss buttons shame users into compliance. Compare the manipulative version with the ethical alternative that respects user autonomy."
        severity="high"
        tags={["Dark Pattern", "EU Digital Services Act", "Deceptive Design"]}
      />

      <DemoContainer label="confirmshaming (dark vs ethical)">
        <ConfirmshamingDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Use neutral, respectful language for all options — including decline",
          "Offer a 'Remind me later' option for non-urgent prompts",
          "Tell users where they can find the feature later if they skip",
          "Make all choices visually distinguishable but equally respectful",
          "Explain the benefit clearly — let the value proposition do the convincing",
          "Accept that some users will decline — and that's okay",
        ]}
        donts={[
          "Don't use guilt-trip language: 'No, I don't care about X'",
          "Don't make the decline option intentionally hard to read (tiny, gray, low contrast)",
          "Don't use manipulative framing: 'Are you sure? Your account is at risk!'",
          "Don't remove the decline option entirely — forced choices erode trust",
          "Don't repeat the same prompt after the user declined — respect their decision",
          "Don't use dark patterns even for 'good' security features — the ends don't justify the means",
        ]}
        securityRationale="Confirmshaming for security features (MFA, strong passwords) seems justified — after all, we WANT users to be secure. But manipulation backfires: users who feel tricked are LESS likely to engage with security features long-term. The EU Digital Services Act (2024) and the FTC's enforcement against dark patterns make this a legal risk too. Ethical persuasion through clear benefit communication outperforms manipulation every time."
        accessibilityNotes={[
          "Decline options must meet WCAG minimum contrast ratios — graying them out fails AA",
          "All interactive options should be keyboard-reachable in logical order",
          "Screen readers should announce all options equally — no hidden text tricks",
          "Don't use aria-hidden on the decline option to hide it from assistive tech",
        ]}
      />
    </div>
  );
}
