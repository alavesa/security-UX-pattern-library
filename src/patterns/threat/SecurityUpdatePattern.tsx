import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Shield, ShieldOff, ShieldAlert, Download, Clock, CheckCircle2, Router, AlertTriangle, CalendarClock, Gift } from "lucide-react";

type Scenario = "notice" | "auto" | "eol";

function UpdateNotice() {
  const [view, setView] = useState<"bad" | "good">("bad");
  const [state, setState] = useState<"prompt" | "installed" | "postponed" | "dismissed">("prompt");
  const good = view === "good";

  return (
    <div>
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <button type="button" onClick={() => { setView("bad"); setState("prompt"); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: !good ? "rgba(255,51,51,0.15)" : "transparent", color: !good ? "var(--red)" : "var(--text)" }}>
          <ShieldOff className="w-3.5 h-3.5 inline mr-1" aria-hidden="true" /> Bundled "What's new"
        </button>
        <button type="button" onClick={() => { setView("good"); setState("prompt"); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: good ? "var(--green-glow)" : "transparent", color: good ? "var(--green)" : "var(--text)" }}>
          <Shield className="w-3.5 h-3.5 inline mr-1" aria-hidden="true" /> Security advisory
        </button>
      </div>

      {!good ? (
        <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "2px solid rgba(255,51,51,0.3)" }}>
          {state === "prompt" ? (
            <>
              <Gift className="w-8 h-8 mb-3" style={{ color: "var(--text-bright)" }} aria-hidden="true" />
              <h3 className="text-base font-bold font-mono mb-2" style={{ color: "var(--text-bright)" }}>HomeHub 5.0 is here! 🎉</h3>
              <ul className="text-xs font-mono space-y-1 mb-3" style={{ color: "var(--text)" }}>
                <li>New dashboard look</li>
                <li>HomeHub+ cloud recording (30-day trial starts automatically)</li>
                <li>Updated Terms of Service and data sharing with partners</li>
                <li style={{ color: "var(--text-dim)" }}>Bug fixes and performance improvements</li>
              </ul>
              <button type="button" onClick={() => setState("installed")} className="w-full py-2.5 rounded-lg text-sm font-mono border-none cursor-pointer" style={{ background: "var(--red)", color: "var(--bg)" }}>Accept & update</button>
              <button type="button" onClick={() => setState("dismissed")} className="w-full mt-2 text-xs font-mono bg-transparent border-none cursor-pointer py-1" style={{ color: "var(--text-dim)" }}>Not now</button>
            </>
          ) : (
            <p className="text-xs font-mono" style={{ color: "var(--red)" }}>
              {state === "installed"
                ? "Installed — along with new terms, partner data sharing and a trial that converts to €4.99/month. The security fix was the fourth bullet."
                : "Dismissed. The router is still remotely exploitable, and nothing told the user that. The prompt returns in 30 days."}
            </p>
          )}
        </div>
      ) : (
        <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "2px solid var(--green-border)" }}>
          {state === "prompt" ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="w-5 h-5" style={{ color: "var(--amber)" }} aria-hidden="true" />
                <h3 className="text-base font-bold font-mono" style={{ color: "var(--text-bright)" }}>Security update 4.8.3</h3>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: "rgba(255,51,51,0.12)", color: "var(--red)" }}>CRITICAL</span>
              </div>
              <p className="text-xs font-mono mb-3" style={{ color: "var(--text)" }}>Fixes a flaw that lets someone on the internet take control of this router. It is being used in attacks now.</p>
              <div className="text-xs font-mono p-3 rounded space-y-1 mb-3" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                <p style={{ color: "var(--text-bright)" }}>What happens</p>
                <p style={{ color: "var(--text)" }}>Wi-Fi is offline for about 3 minutes. Settings and features stay the same.</p>
                <p style={{ color: "var(--text-bright)" }}>If you wait</p>
                <p style={{ color: "var(--text)" }}>Turn off "Remote access" in the meantime to reduce the risk.</p>
                <p style={{ color: "var(--text-dim)" }}>Security only · free · no new terms · advisory HH-2026-014</p>
              </div>
              <button type="button" onClick={() => setState("installed")} className="w-full py-2.5 rounded-lg text-sm font-mono border-none cursor-pointer flex items-center justify-center gap-2" style={{ background: "var(--green)", color: "var(--bg)" }}>
                <Download className="w-4 h-4" aria-hidden="true" /> Install now
              </button>
              <button type="button" onClick={() => setState("postponed")} className="w-full mt-2 py-2 rounded-lg text-xs font-mono cursor-pointer flex items-center justify-center gap-2" style={{ background: "transparent", color: "var(--text)", border: "1px solid var(--border)" }}>
                <Clock className="w-3.5 h-3.5" aria-hidden="true" /> Install tonight at 03:00
              </button>
            </>
          ) : (
            <p className="text-xs font-mono flex items-start gap-2" style={{ color: "var(--green)" }}>
              <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
              {state === "installed"
                ? "Updated to 4.8.3. Nothing else changed. The new dashboard is offered separately — your choice."
                : "Scheduled for 03:00 tonight. You'll see a reminder at 22:00 and can move it once more, up to 7 days."}
            </p>
          )}
        </div>
      )}

      <button type="button" onClick={() => setState("prompt")} className="mt-3 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer font-mono" style={{ color: "var(--text)" }}>Reset demo</button>
    </div>
  );
}

function AutoUpdateSettings() {
  const [auto, setAuto] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [featureAuto, setFeatureAuto] = useState(false);

  return (
    <div className="rounded-2xl p-5 space-y-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
      <h3 className="text-base font-bold font-mono" style={{ color: "var(--text-bright)" }}>Updates</h3>

      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-sm font-mono" style={{ color: "var(--text-bright)" }}>Automatic security updates</p>
          <p className="text-xs font-mono" style={{ color: "var(--text)" }}>Installed between 02:00 and 04:00 within 24 h of release. You're told before and after.</p>
        </div>
        <button type="button" role="switch" aria-checked={auto} aria-label="Automatic security updates" onClick={() => (auto ? setConfirming(true) : setAuto(true))} className="text-xs font-mono px-2 py-1 rounded cursor-pointer w-12" style={{ background: auto ? "var(--green-glow)" : "rgba(255,51,51,0.15)", color: auto ? "var(--green)" : "var(--red)", border: "1px solid var(--border)" }}>
          {auto ? "ON" : "OFF"}
        </button>
      </div>

      {confirming && (
        <div className="p-3 rounded space-y-2" style={{ background: "rgba(255,170,0,0.08)", border: "1px solid rgba(255,170,0,0.25)" }}>
          <p className="text-xs font-mono" style={{ color: "var(--amber)" }}>With this off, security fixes wait until you install them yourself. We'll still notify you about each one.</p>
          <div className="flex gap-2">
            <button type="button" onClick={() => setConfirming(false)} className="flex-1 text-xs font-mono py-1.5 rounded border-none cursor-pointer" style={{ background: "var(--green)", color: "var(--bg)" }}>Keep on</button>
            <button type="button" onClick={() => { setAuto(false); setConfirming(false); }} className="flex-1 text-xs font-mono py-1.5 rounded cursor-pointer" style={{ background: "transparent", color: "var(--text)", border: "1px solid var(--border)" }}>Turn off</button>
          </div>
        </div>
      )}

      {!auto && (
        <p className="text-xs font-mono flex items-start gap-2" style={{ color: "var(--amber)" }}>
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" /> Manual mode. 1 security update is waiting: 4.8.3 (critical).
        </p>
      )}

      <div className="flex items-start gap-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="flex-1">
          <p className="text-sm font-mono" style={{ color: "var(--text-bright)" }}>Automatic feature updates</p>
          <p className="text-xs font-mono" style={{ color: "var(--text)" }}>New features and design changes. Separate from security fixes; off unless you choose it.</p>
        </div>
        <button type="button" role="switch" aria-checked={featureAuto} aria-label="Automatic feature updates" onClick={() => setFeatureAuto(!featureAuto)} className="text-xs font-mono px-2 py-1 rounded cursor-pointer w-12" style={{ background: featureAuto ? "var(--green-glow)" : "transparent", color: featureAuto ? "var(--green)" : "var(--text-dim)", border: "1px solid var(--border)" }}>
          {featureAuto ? "ON" : "OFF"}
        </button>
      </div>

      <p className="text-[11px] font-mono" style={{ color: "var(--text-dim)" }}>Last security update: 4.8.2 installed automatically on Oct 28, 2026 at 02:41 · took 2 min 50 s</p>
    </div>
  );
}

function EndOfSupport() {
  const [stage, setStage] = useState<"supported" | "ending" | "ended">("supported");
  const pct = stage === "supported" ? 38 : stage === "ending" ? 92 : 100;
  const color = stage === "supported" ? "var(--green)" : stage === "ending" ? "var(--amber)" : "var(--red)";

  return (
    <div>
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {([["supported", "At purchase"], ["ending", "6 months left"], ["ended", "Support ended"]] as const).map(([id, label]) => (
          <button type="button" key={id} onClick={() => setStage(id)} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: stage === id ? "var(--green-glow)" : "transparent", color: stage === id ? "var(--green)" : "var(--text)" }}>
            {label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl p-5 space-y-3" style={{ background: "var(--bg-card)", border: `1px solid ${stage === "supported" ? "var(--border)" : color}` }}>
        <div className="flex items-center gap-2">
          <Router className="w-5 h-5" style={{ color }} aria-hidden="true" />
          <h3 className="text-base font-bold font-mono" style={{ color: "var(--text-bright)" }}>HomeHub Router R2</h3>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs font-mono mb-1">
            <span style={{ color: "var(--text)" }}>Security updates until</span>
            <span style={{ color }}>December 2031</span>
          </div>
          <div className="h-2 rounded overflow-hidden" style={{ background: "var(--border)" }}>
            <div className="h-full" style={{ width: `${pct}%`, background: color }} />
          </div>
        </div>

        {stage === "supported" && (
          <p className="text-xs font-mono flex items-start gap-2" style={{ color: "var(--text)" }}>
            <CalendarClock className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "var(--green)" }} aria-hidden="true" />
            Shown on the product page, the box and in Settings → About. Free security updates for 5 years from launch.
          </p>
        )}
        {stage === "ending" && (
          <div className="p-3 rounded text-xs font-mono space-y-1" style={{ background: "rgba(255,170,0,0.08)", border: "1px solid rgba(255,170,0,0.25)" }}>
            <p style={{ color: "var(--amber)" }}>Security updates for this router end in December 2031.</p>
            <p style={{ color: "var(--text)" }}>It will keep working, but new flaws won't be fixed. We'll remind you once more a month before. No action needed today.</p>
          </div>
        )}
        {stage === "ended" && (
          <div className="p-3 rounded text-xs font-mono space-y-1" style={{ background: "rgba(255,51,51,0.08)", border: "1px solid rgba(255,51,51,0.3)" }}>
            <p style={{ color: "var(--red)" }}>This router no longer receives security updates.</p>
            <p style={{ color: "var(--text)" }}>Last update: 4.9.7 (Dec 2031). To lower the risk: turn off Remote access, and plan a replacement. Past updates stay available for download.</p>
            <p style={{ color: "var(--text-dim)" }}>Shown once on sign-in and kept in Settings → About. Not a sales banner — no "Upgrade now" countdown.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SecurityUpdateDemo() {
  const [scenario, setScenario] = useState<Scenario>("notice");

  return (
    <div className="w-full max-w-md">
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {([["notice", "Update notice"], ["auto", "Auto-update"], ["eol", "Support period"]] as const).map(([id, label]) => (
          <button type="button" key={id} onClick={() => setScenario(id)} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: scenario === id ? "var(--green-glow)" : "transparent", color: scenario === id ? "var(--green)" : "var(--text)" }}>
            {label}
          </button>
        ))}
      </div>
      {scenario === "notice" && <UpdateNotice />}
      {scenario === "auto" && <AutoUpdateSettings />}
      {scenario === "eol" && <EndOfSupport />}
    </div>
  );
}

export function SecurityUpdatePattern() {
  return (
    <div>
      <PatternHeader
        title="Security Update Notification"
        description="A patch protects nobody until it is installed, and whether it gets installed is decided by a prompt. The EU Cyber Resilience Act makes that prompt a legal requirement for connected products: automatic security updates on by default, a clear opt-out, notification, the option to postpone, and a stated end-of-support date. Three variants: the update notice, auto-update settings, and the support period."
        severity="high"
        tags={["CRA Annex I", "CRA Art. 13", "Security Updates", "End of Support", "IoT"]}
      />

      <DemoContainer label="security updates (3 variants)">
        <SecurityUpdateDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Ship security updates separately from feature updates, and label them as security",
          "Say in one sentence what the flaw lets an attacker do, in user terms — not only a CVE number",
          "State severity, whether it is being exploited, how long the install takes and what stops working meanwhile",
          "Turn automatic security updates on by default, with an opt-out that is easy to find and explains the consequence once",
          "Let users postpone to a specific time ('tonight at 03:00') and cap how long a critical fix can be deferred",
          "Give an interim mitigation for users who wait ('turn off Remote access until then')",
          "Confirm afterwards: what was installed, when, and that nothing else changed",
          "Show the end-of-support date (month and year) before purchase and in device settings",
          "Notify users when the support period is about to end and when it has ended, with what still works and what to do",
          "Keep notifying about available security updates even when automatic updates are off",
        ]}
        donts={[
          "Don't bury a security fix under 'bug fixes and performance improvements'",
          "Don't tie a security update to new terms, new data sharing, a trial or a paid tier",
          "Don't offer an endless 'Not now' on a critical fix with no reminder and no explanation of the risk",
          "Don't restart or take a device offline without warning — schedule it and say so",
          "Don't hide the automatic-update opt-out, and don't punish it by going silent about new fixes",
          "Don't use end of support as a sales countdown; state the fact and the safe options",
          "Don't change settings, defaults or the interface in a security-only update",
          "Don't charge for security updates during the support period",
        ]}
        securityRationale="The Cyber Resilience Act (Regulation (EU) 2024/2847) applies in full from December 11, 2027; its vulnerability reporting duty has applied since September 11, 2026. Annex I, Part I(2)(c) requires that vulnerabilities can be addressed through security updates, including, where applicable, automatic security updates that are enabled as a default setting, with a clear and easy-to-use opt-out mechanism, notification of available updates to users, and the option to temporarily postpone them. Annex I, Part II requires that security updates are provided separately from functionality updates where technically feasible (point 2), and disseminated without delay and free of charge, accompanied by advisory messages giving users the relevant information, including action to be taken (point 8). Article 13(8) sets a support period of at least five years unless the product is expected to be in use for less, and Article 13(19) requires the end date of the support period, at least month and year, to be clearly specified at the time of purchase, with a notification to users when the product reaches the end of its support period where technically feasible. Non-compliance with the essential requirements carries fines of up to €15 million or 2.5% of worldwide turnover. Every clause in that list is an interface: a default, a switch, a message, a date on a product page."
        accessibilityNotes={[
          "Update notices are modal only when the fix is critical; otherwise a non-blocking banner that persists until acted on",
          "Severity is conveyed in text ('Critical'), not by colour alone",
          "Scheduled restarts are announced in advance through every channel the device has — screen, app notification, email — not only an LED",
          "Postpone options are real buttons with specific times, reachable by keyboard and screen reader",
          "The support-period bar has a text equivalent ('Security updates until December 2031')",
          "End-of-support notices must be available in the user's language and in plain wording — this audience includes people who never open device settings",
        ]}
      />
    </div>
  );
}
