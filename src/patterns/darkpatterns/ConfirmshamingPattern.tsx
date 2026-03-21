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
        <div className="relative rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", border: "2px solid rgba(255,51,51,0.3)" }}>
          <div className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded font-mono" style={{ background: "var(--red)", color: "white" }}>
            DARK PATTERN
          </div>

          {!darkDismissed ? (
            <div className="p-8 text-center">
              <Shield className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--text-bright)" }} />
              <h2 className="text-xl font-bold font-mono mb-2" style={{ color: "var(--text-bright)" }}>Enable two-factor authentication</h2>
              <p className="text-sm font-mono mb-6" style={{ color: "var(--text)" }}>Protect your account with an extra layer of security.</p>

              <div className="space-y-3">
                <button type="button" className="w-full py-3 rounded-lg font-semibold font-mono text-sm transition-colors border-none cursor-pointer" style={{ background: "var(--green)", color: "var(--bg)" }}>
                  Yes, protect my account
                </button>
                <button
                  type="button"
                  onClick={() => setDarkDismissed(true)}
                  className="w-full text-sm font-mono py-2 bg-transparent border-none cursor-pointer"
                  style={{ color: "var(--text-dim)" }}
                >
                  No thanks, I don't care about my security
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm font-mono mb-4" style={{ color: "var(--text)" }}>You dismissed the prompt.</p>
              <div className="rounded-lg p-4 text-left" style={{ background: "rgba(255,51,51,0.08)", border: "1px solid rgba(255,51,51,0.2)" }}>
                <h3 className="text-sm font-semibold font-mono mb-2" style={{ color: "var(--red)" }}>What's wrong here:</h3>
                <ul className="text-xs font-mono space-y-1.5" style={{ color: "var(--text)" }}>
                  <li><strong style={{ color: "var(--text-bright)" }}>"I don't care about my security"</strong> — guilts the user for making a valid choice</li>
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
        <div className="relative rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", border: "2px solid var(--green-border)" }}>
          <div className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded font-mono" style={{ background: "var(--green)", color: "var(--bg)" }}>
            ETHICAL
          </div>

          {ethicalChoice === null ? (
            <div className="p-8 text-center">
              <Shield className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--green)" }} />
              <h2 className="text-xl font-bold font-mono mb-2" style={{ color: "var(--text-bright)" }}>Add two-factor authentication?</h2>
              <p className="text-sm font-mono mb-2" style={{ color: "var(--text)" }}>This adds an extra verification step when you sign in.</p>
              <p className="text-xs font-mono mb-6" style={{ color: "var(--text-dim)" }}>You can always enable this later in Settings → Security.</p>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setEthicalChoice("enabled")}
                  className="w-full py-3 rounded-lg font-medium font-mono text-sm transition-colors border-none cursor-pointer"
                  style={{ background: "var(--green)", color: "var(--bg)" }}
                >
                  Set up now
                </button>
                <button
                  type="button"
                  onClick={() => setEthicalChoice("later")}
                  className="w-full py-2.5 rounded-lg text-sm font-medium font-mono transition-colors cursor-pointer"
                  style={{ background: "transparent", color: "var(--text-bright)", border: "1px solid var(--border)" }}
                >
                  Remind me later
                </button>
                <button
                  type="button"
                  onClick={() => setEthicalChoice("skip")}
                  className="w-full text-sm font-mono py-2 bg-transparent border-none cursor-pointer"
                  style={{ color: "var(--text)" }}
                >
                  Skip for now
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm font-mono mb-4" style={{ color: "var(--text)" }}>
                You chose: <strong style={{ color: "var(--green)" }}>{choiceLabels[ethicalChoice] ?? ethicalChoice}</strong>
              </p>
              <div className="rounded-lg p-4 text-left" style={{ background: "rgba(0,255,65,0.05)", border: "1px solid var(--green-border)" }}>
                <h3 className="text-sm font-semibold font-mono mb-2" style={{ color: "var(--green)" }}>What's right here:</h3>
                <ul className="text-xs font-mono space-y-1.5" style={{ color: "var(--text)" }}>
                  <li><strong style={{ color: "var(--text-bright)" }}>Neutral language</strong> — no guilt, no shaming, no manipulation</li>
                  <li><strong style={{ color: "var(--text-bright)" }}>Three choices</strong> — set up, remind later, or skip — all equally valid</li>
                  <li><strong style={{ color: "var(--text-bright)" }}>Clear path back</strong> — tells users where to find this later (Settings → Security)</li>
                  <li><strong style={{ color: "var(--text-bright)" }}>Respects autonomy</strong> — users make informed choices, not coerced ones</li>
                  <li><strong style={{ color: "var(--text-bright)" }}>Builds trust</strong> — transparent communication earns long-term engagement</li>
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
