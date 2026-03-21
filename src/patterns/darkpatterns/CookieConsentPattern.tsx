import { useState, useCallback } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Shield, ShieldOff, Cookie, Settings } from "lucide-react";

function CookieConsentDemo() {
  const [view, setView] = useState<"dark" | "ethical">("dark");
  const [darkChoice, setDarkChoice] = useState<string | null>(null);
  const [ethicalChoice, setEthicalChoice] = useState<string | null>(null);
  const [showDarkSettings, setShowDarkSettings] = useState(false);

  const reset = useCallback(() => {
    setDarkChoice(null);
    setEthicalChoice(null);
    setShowDarkSettings(false);
  }, []);

  return (
    <div className="w-full max-w-xl">
      {/* Toggle */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <button
          onClick={() => { setView("dark"); reset(); }}
          aria-pressed={view === "dark"}
          className={`flex-1 text-xs py-2 rounded-md font-mono transition-colors border-none cursor-pointer`}
          style={{ background: view === "dark" ? "rgba(255,51,51,0.15)" : "transparent", color: view === "dark" ? "var(--red)" : "var(--text)" }}
        >
          <ShieldOff aria-hidden="true" className="w-3.5 h-3.5 inline mr-1" /> Dark Pattern
        </button>
        <button
          onClick={() => { setView("ethical"); reset(); }}
          aria-pressed={view === "ethical"}
          className={`flex-1 text-xs py-2 rounded-md font-mono transition-colors border-none cursor-pointer`}
          style={{ background: view === "ethical" ? "var(--green-glow)" : "transparent", color: view === "ethical" ? "var(--green)" : "var(--text)" }}
        >
          <Shield aria-hidden="true" className="w-3.5 h-3.5 inline mr-1" /> Ethical Alternative
        </button>
      </div>

      {/* Dark pattern cookie banner */}
      {view === "dark" && darkChoice === null && !showDarkSettings && (
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", border: "2px solid rgba(255,51,51,0.3)" }}>
          <div style={{ position: "relative", textAlign: "right" }}>
            <span className="text-xs px-2 py-0.5 rounded font-mono inline-block mt-2 mr-2" style={{ background: "var(--red)", color: "white" }}>DARK PATTERN</span>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Cookie aria-hidden="true" className="w-8 h-8 shrink-0" style={{ color: "var(--text-bright)" }} />
              <div>
                <h3 className="font-bold font-mono mb-1" style={{ color: "var(--text-bright)" }}>We value your privacy</h3>
                <p className="text-xs font-mono leading-relaxed" style={{ color: "var(--text)" }}>
                  We and our 847 partners use cookies and similar technologies to provide, protect, and improve our services. By clicking "Accept All", you consent to our use of cookies.
                  <button onClick={e => e.preventDefault()} className="bg-transparent border-none p-0 underline cursor-pointer inline font-mono" style={{ color: "var(--text-dim)" }}> Read our Cookie Policy</button>
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setDarkChoice("accept")}
                className="w-full py-3 rounded-lg font-bold font-mono text-sm transition-colors border-none cursor-pointer"
                style={{ background: "#2563eb", color: "white" }}
              >
                Accept All Cookies
              </button>
              <button
                onClick={() => setShowDarkSettings(true)}
                className="w-full text-xs font-mono py-1.5 bg-transparent border-none cursor-pointer"
                style={{ color: "var(--text-dim)" }}
              >
                Manage preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dark pattern settings maze */}
      {view === "dark" && darkChoice === null && showDarkSettings && (
        <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "2px solid rgba(255,51,51,0.3)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold font-mono text-sm" style={{ color: "var(--text-bright)" }}>Cookie Preferences</h3>
            <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: "var(--red)", color: "white" }}>DARK PATTERN</span>
          </div>

          <div className="space-y-3 mb-6" aria-hidden="true">
            {[
              { name: "Essential", on: true, locked: true },
              { name: "Performance & Analytics", on: true, locked: false },
              { name: "Advertising & Targeting", on: true, locked: false },
              { name: "Social Media", on: true, locked: false },
              { name: "Personalization", on: true, locked: false },
            ].map(({ name, on }) => (
              <div key={name} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid var(--border)" }}>
                <span className="text-sm font-mono" style={{ color: "var(--text-bright)" }}>{name}</span>
                <div className="w-10 h-5 rounded-full relative" style={{ background: on ? "var(--green)" : "var(--bg-elevated)" }}>
                  <div className="w-4 h-4 rounded-full absolute top-0.5 transition-all" style={{ background: "white", right: on ? "2px" : undefined, left: on ? undefined : "2px" }} />
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs font-mono mb-4" style={{ color: "var(--text-dim)" }}>
            Note: Disabling non-essential cookies may affect your experience. Changes require 24-48 hours to take effect.
          </p>

          <div className="space-y-2">
            <button
              onClick={() => setDarkChoice("accept")}
              className="w-full py-3 rounded-lg font-bold font-mono text-sm border-none cursor-pointer"
              style={{ background: "#2563eb", color: "white" }}
            >
              Accept All & Continue
            </button>
            <button
              onClick={() => setDarkChoice("custom")}
              className="w-full text-xs font-mono py-1.5 bg-transparent border-none cursor-pointer"
              style={{ color: "var(--text-dim)" }}
            >
              Save my preferences
            </button>
          </div>
        </div>
      )}

      {view === "dark" && darkChoice !== null && (
        <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "2px solid rgba(255,51,51,0.3)" }}>
          <div className="rounded-lg p-4" style={{ background: "rgba(255,51,51,0.08)", border: "1px solid rgba(255,51,51,0.2)" }}>
            <h3 className="text-sm font-semibold font-mono mb-2" style={{ color: "var(--red)" }}>What's wrong here:</h3>
            <ul className="text-xs font-mono space-y-1.5" style={{ color: "var(--text)" }}>
              <li><strong style={{ color: "var(--text-bright)" }}>No "Reject All" button</strong> — forces users through a settings maze to decline</li>
              <li><strong style={{ color: "var(--text-bright)" }}>"Accept All" is prominent</strong> — big, blue, bold. "Manage preferences" is tiny and gray</li>
              <li><strong style={{ color: "var(--text-bright)" }}>All toggles default to ON</strong> — user has to manually turn each one off</li>
              <li><strong style={{ color: "var(--text-bright)" }}>"847 partners"</strong> — intentionally overwhelming number to discourage reading</li>
              <li><strong style={{ color: "var(--text-bright)" }}>"24-48 hours to take effect"</strong> — false urgency and friction to discourage changes</li>
              <li><strong style={{ color: "var(--text-bright)" }}>Settings page ALSO has "Accept All" as primary</strong> — dark pattern within a dark pattern</li>
              <li>Violates GDPR Article 7: consent must be as easy to withdraw as to give</li>
            </ul>
          </div>
        </div>
      )}

      {/* Ethical cookie banner */}
      {view === "ethical" && ethicalChoice === null && (
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", border: "2px solid var(--green-border)" }}>
          <div style={{ position: "relative", textAlign: "right" }}>
            <span className="text-xs px-2 py-0.5 rounded font-mono inline-block mt-2 mr-2" style={{ background: "var(--green)", color: "var(--bg)" }}>ETHICAL</span>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Cookie aria-hidden="true" className="w-8 h-8 shrink-0" style={{ color: "var(--green)" }} />
              <div>
                <h3 className="font-bold font-mono mb-1" style={{ color: "var(--text-bright)" }}>Cookie preferences</h3>
                <p className="text-xs font-mono leading-relaxed" style={{ color: "var(--text)" }}>
                  We use essential cookies to make the site work. We'd also like to use analytics cookies to understand how you use our site so we can improve it.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEthicalChoice("accept")}
                className="flex-1 py-2.5 rounded-lg font-medium font-mono text-sm transition-colors border-none cursor-pointer"
                style={{ background: "var(--green)", color: "var(--bg)" }}
              >
                Accept all
              </button>
              <button
                onClick={() => setEthicalChoice("reject")}
                className="flex-1 py-2.5 rounded-lg font-medium font-mono text-sm transition-colors cursor-pointer"
                style={{ background: "transparent", color: "var(--text-bright)", border: "1px solid var(--border)" }}
              >
                Reject non-essential
              </button>
              <button
                onClick={() => setEthicalChoice("custom")}
                aria-label="Customize cookie settings"
                className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-lg text-sm transition-colors cursor-pointer"
                style={{ background: "transparent", color: "var(--text)", border: "1px solid var(--border)" }}
              >
                <Settings aria-hidden="true" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {view === "ethical" && ethicalChoice !== null && (
        <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "2px solid var(--green-border)" }}>
          <p className="text-sm font-mono mb-4" style={{ color: "var(--text)" }}>
            You chose: <strong style={{ color: "var(--green)" }}>{ethicalChoice === "accept" ? "Accept all" : ethicalChoice === "reject" ? "Reject non-essential" : "Customize"}</strong>
          </p>
          <div className="rounded-lg p-4" style={{ background: "rgba(0,255,65,0.05)", border: "1px solid var(--green-border)" }}>
            <h3 className="text-sm font-semibold font-mono mb-2" style={{ color: "var(--green)" }}>What's right here:</h3>
            <ul className="text-xs font-mono space-y-1.5" style={{ color: "var(--text)" }}>
              <li><strong style={{ color: "var(--text-bright)" }}>"Reject non-essential" is equally prominent</strong> — same size, same style as Accept</li>
              <li><strong style={{ color: "var(--text-bright)" }}>Plain language</strong> — explains what cookies do, not legal jargon</li>
              <li><strong style={{ color: "var(--text-bright)" }}>Three clear options</strong> — accept, reject, or customize</li>
              <li><strong style={{ color: "var(--text-bright)" }}>No defaults</strong> — doesn't pre-select anything the user didn't choose</li>
              <li><strong style={{ color: "var(--text-bright)" }}>One click to reject</strong> — GDPR compliant: as easy to decline as to accept</li>
              <li><strong style={{ color: "var(--text-bright)" }}>Customize option available</strong> — but not required to reject</li>
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

export function CookieConsentPattern() {
  return (
    <div>
      <PatternHeader
        title="Cookie Consent"
        description="The most common dark pattern on the web. Compare the manipulative 'Accept All' banner with the GDPR-compliant ethical alternative that gives users real choice."
        severity="high"
        tags={["Dark Pattern", "GDPR Art. 7", "ePrivacy Directive"]}
      />

      <DemoContainer label="cookie consent (dark vs ethical)">
        <CookieConsentDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Make 'Reject' equally prominent and accessible as 'Accept'",
          "Use plain language — explain what cookies do, not legal terminology",
          "Default all non-essential toggles to OFF",
          "Allow one-click rejection without navigating through settings",
          "Respect the choice immediately — no '24-48 hour' delay",
          "Remember the preference — don't re-ask on every visit",
          "Provide a settings icon for users who want granular control",
        ]}
        donts={[
          "Don't hide 'Reject' behind a settings maze",
          "Don't make 'Accept All' visually dominant (bigger, bolder, colored) while 'Reject' is tiny/gray",
          "Don't pre-toggle all categories to ON",
          "Don't use 'legitimate interest' as a loophole to bypass consent",
          "Don't use the wall-of-text approach with '847 partners' to overwhelm users",
          "Don't make rejecting harder than accepting — GDPR Article 7 requires equal ease",
          "Don't use 'We value your privacy' while designing to extract maximum consent",
        ]}
        securityRationale="Cookie consent dark patterns violate GDPR Article 7 (conditions for consent), which requires consent to be 'freely given, specific, informed, and unambiguous.' The EU Data Protection Board (EDPB) has explicitly ruled that 'reject' must be as easy as 'accept.' Fines for non-compliance reach up to 4% of global annual turnover. Beyond legal risk, dark patterns in consent erode the trust foundation that every other security measure depends on."
        accessibilityNotes={[
          "Both Accept and Reject buttons must meet WCAG AA contrast requirements",
          "The banner should be focusable and announced by screen readers on page load",
          "Settings toggles need proper labels and state descriptions",
          "Don't trap keyboard focus — users must be able to navigate past the banner",
          "The 'Manage preferences' button must have equal accessibility to 'Accept All'",
        ]}
      />
    </div>
  );
}
