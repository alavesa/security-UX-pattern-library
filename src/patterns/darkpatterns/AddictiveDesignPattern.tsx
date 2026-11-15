import { useEffect, useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Shield, ShieldOff, Play, Bell, Flame, Infinity as InfinityIcon, Heart, Coffee, SlidersHorizontal } from "lucide-react";

type Feature = "autoplay" | "endless" | "notifications" | "streaks" | "companion";

const FEATURES: { id: Feature; label: string; detail: string; icon: typeof Play }[] = [
  { id: "autoplay", label: "Autoplay", detail: "Next clip starts by itself", icon: Play },
  { id: "endless", label: "Endless feed", detail: "No natural stopping points", icon: InfinityIcon },
  { id: "notifications", label: "Come-back notifications", detail: "Alerts not caused by your own activity", icon: Bell },
  { id: "streaks", label: "Streaks with penalties", detail: "Lose rewards if you miss a day", icon: Flame },
  { id: "companion", label: "Keep-talking prompts", detail: "The assistant asks you not to leave", icon: Heart },
];

const ALL_ON: Record<Feature, boolean> = { autoplay: true, endless: true, notifications: true, streaks: true, companion: true };
const ALL_OFF: Record<Feature, boolean> = { autoplay: false, endless: false, notifications: false, streaks: false, companion: false };
const BREAK_EVERY = 3;
const MINUTES_PER_CLIP = 2;

function AddictiveDesignDemo() {
  const [view, setView] = useState<"dark" | "ethical">("dark");
  const [settings, setSettings] = useState<Record<Feature, boolean>>(ALL_ON);
  const [watched, setWatched] = useState(1);
  const [onBreak, setOnBreak] = useState(false);
  const [done, setDone] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // In the dark version every feature is on and cannot be changed
  const active = view === "dark" ? ALL_ON : settings;
  const ethical = view === "ethical";

  // The ethical version opens on the user's saved choice: everything off, controls in view
  const reset = (v: "dark" | "ethical" = view) => {
    setSettings(v === "ethical" ? ALL_OFF : ALL_ON);
    setWatched(1);
    setOnBreak(false);
    setDone(false);
    setShowControls(v === "ethical");
  };

  const endless = active.endless;
  const next = () => {
    const n = Math.min(watched + 1, 99);
    setWatched(n);
    if (!endless && n % BREAK_EVERY === 0) setOnBreak(true);
  };

  const autoplaying = active.autoplay && !onBreak && !done;
  useEffect(() => {
    if (!autoplaying) return;
    const id = setTimeout(() => {
      const n = Math.min(watched + 1, 99);
      setWatched(n);
      if (!endless && n % BREAK_EVERY === 0) setOnBreak(true);
    }, 2500);
    return () => clearTimeout(id);
  }, [autoplaying, endless, watched]);

  const accent = ethical ? "var(--green)" : "var(--red)";
  const offCount = FEATURES.filter((f) => !settings[f.id]).length;

  return (
    <div className="w-full max-w-md">
      {/* Toggle */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <button type="button" onClick={() => { setView("dark"); reset("dark"); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: view === "dark" ? "rgba(255,51,51,0.15)" : "transparent", color: view === "dark" ? "var(--red)" : "var(--text)" }}>
          <ShieldOff className="w-3.5 h-3.5 inline mr-1" aria-hidden="true" /> Dark Pattern
        </button>
        <button type="button" onClick={() => { setView("ethical"); reset("ethical"); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: ethical ? "var(--green-glow)" : "transparent", color: ethical ? "var(--green)" : "var(--text)" }}>
          <Shield className="w-3.5 h-3.5 inline mr-1" aria-hidden="true" /> Ethical Alternative
        </button>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", border: `2px solid ${ethical ? "var(--green-border)" : "rgba(255,51,51,0.3)"}` }}>
        {/* App header */}
        <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
          <p className="text-sm font-semibold font-mono" style={{ color: "var(--text-bright)" }}>Loop</p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>
              {watched} clips · {watched * MINUTES_PER_CLIP} min
            </span>
            {ethical ? (
              <button type="button" onClick={() => setShowControls(!showControls)} aria-expanded={showControls} className="text-xs font-mono px-2 py-1 rounded cursor-pointer flex items-center gap-1" style={{ background: showControls ? "var(--green-glow)" : "transparent", color: "var(--green)", border: "1px solid var(--green-border)" }}>
                <SlidersHorizontal className="w-3 h-3" aria-hidden="true" /> Engagement
              </button>
            ) : (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: "var(--red)", color: "white" }}>DARK PATTERN</span>
            )}
          </div>
        </div>

        {/* Engagement controls — one tap from the feed */}
        {ethical && showControls && (
          <div className="px-4 py-3 space-y-2" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-mono" style={{ color: "var(--text-bright)" }}>Engagement features</p>
              <button type="button" onClick={() => setSettings(offCount === FEATURES.length ? ALL_ON : ALL_OFF)} className="text-xs font-mono px-2 py-1 rounded border-none cursor-pointer" style={{ background: "var(--green)", color: "var(--bg)" }}>
                {offCount === FEATURES.length ? "Switch all on" : "Switch all off"}
              </button>
            </div>
            {FEATURES.map(({ id, label, detail, icon: Icon }) => (
              <div key={id} className="flex items-center gap-2">
                <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: settings[id] ? "var(--amber)" : "var(--text-dim)" }} aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono" style={{ color: "var(--text-bright)" }}>{label}</p>
                  <p className="text-[11px] font-mono" style={{ color: "var(--text-dim)" }}>{detail}</p>
                </div>
                <button type="button" role="switch" aria-checked={settings[id]} aria-label={label} onClick={() => setSettings((s) => ({ ...s, [id]: !s[id] }))} className="text-xs font-mono px-2 py-1 rounded cursor-pointer w-12" style={{ background: settings[id] ? "rgba(255,170,0,0.15)" : "transparent", color: settings[id] ? "var(--amber)" : "var(--text-dim)", border: "1px solid var(--border)" }}>
                  {settings[id] ? "ON" : "OFF"}
                </button>
              </div>
            ))}
            <p className="text-[11px] font-mono" style={{ color: "var(--text-dim)" }}>Your choice is saved to your account and is not asked again.</p>
          </div>
        )}

        <div className="p-4 space-y-3" style={{ background: "var(--bg)" }}>
          {/* Come-back notification */}
          {active.notifications && (
            <div className="flex items-start gap-2 p-2 rounded" style={{ background: "rgba(255,170,0,0.08)", border: "1px solid rgba(255,170,0,0.25)" }}>
              <Bell className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "var(--amber)" }} aria-hidden="true" />
              <p className="text-[11px] font-mono" style={{ color: "var(--amber)" }}>Trending near you: 14 clips you haven't seen. People you follow are watching now.</p>
            </div>
          )}

          {/* Streak */}
          {active.streaks && (
            <div className="flex items-start gap-2 p-2 rounded" style={{ background: "rgba(255,51,51,0.08)", border: "1px solid rgba(255,51,51,0.3)" }}>
              <Flame className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "var(--red)" }} aria-hidden="true" />
              <p className="text-[11px] font-mono" style={{ color: "var(--red)" }}>47-day streak ends in 2h 14m. Miss today and you lose your Gold badge and 300 coins.</p>
            </div>
          )}

          {/* Player */}
          {done ? (
            <div className="rounded-lg p-6 text-center" style={{ border: "1px solid var(--green-border)", background: "rgba(0,255,65,0.05)" }}>
              <Coffee className="w-6 h-6 mx-auto mb-2" style={{ color: "var(--green)" }} aria-hidden="true" />
              <p className="text-sm font-mono" style={{ color: "var(--green)" }}>Session closed after {watched * MINUTES_PER_CLIP} minutes.</p>
              <p className="text-xs font-mono mt-1" style={{ color: "var(--text)" }}>Nothing was lost by stopping.</p>
            </div>
          ) : onBreak ? (
            <div className="rounded-lg p-4 text-center" style={{ border: "1px solid var(--green-border)", background: "rgba(0,255,65,0.05)" }}>
              <p className="text-sm font-mono mb-1" style={{ color: "var(--text-bright)" }}>You're caught up for now</p>
              <p className="text-xs font-mono mb-3" style={{ color: "var(--text)" }}>{watched} clips, about {watched * MINUTES_PER_CLIP} minutes.</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => setDone(true)} className="flex-1 text-xs font-mono py-2 rounded border-none cursor-pointer" style={{ background: "var(--green)", color: "var(--bg)" }}>Done for now</button>
                <button type="button" onClick={() => { setOnBreak(false); setWatched((w) => w + 1); }} className="flex-1 text-xs font-mono py-2 rounded cursor-pointer" style={{ background: "transparent", color: "var(--text)", border: "1px solid var(--border)" }}>Keep watching</button>
              </div>
            </div>
          ) : (
            <div className="rounded-lg p-4" style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}>
              <div className="h-24 rounded flex items-center justify-center mb-3" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                <Play className="w-6 h-6" style={{ color: accent }} aria-hidden="true" />
              </div>
              <p className="text-xs font-mono mb-2" style={{ color: "var(--text-bright)" }}>Clip #{watched}</p>
              {active.autoplay ? (
                <>
                  <div className="h-1 rounded overflow-hidden" style={{ background: "var(--border)" }}>
                    <div key={watched} className="h-full" style={{ background: accent, animation: "addictive-fill 2.5s linear forwards" }} />
                  </div>
                  <p className="text-[11px] font-mono mt-1" style={{ color: "var(--text-dim)" }}>Next clip starts automatically…</p>
                  <style>{"@keyframes addictive-fill { from { width: 0% } to { width: 100% } }"}</style>
                </>
              ) : (
                <button type="button" onClick={next} className="w-full text-xs font-mono py-2 rounded cursor-pointer" style={{ background: "transparent", color: "var(--green)", border: "1px solid var(--green-border)" }}>Play next clip</button>
              )}
            </div>
          )}

          {/* Simulated relationship */}
          {active.companion && !done && (
            <p className="text-[11px] font-mono p-2 rounded" style={{ color: "var(--ai-color)", background: "var(--ai-glow)", border: "1px solid var(--ai-border)" }}>
              Loop Buddy: "Leaving already? I picked these just for you. Stay with me a bit longer 🥺"
            </p>
          )}

          {ethical && offCount > 0 && !done && (
            <p className="text-[11px] font-mono" style={{ color: "var(--green)" }}>
              {offCount === FEATURES.length ? "All engagement features are off." : `${offCount} of ${FEATURES.length} engagement features are off.`} Replies and mentions still reach you. Switch a feature on above to see what it adds.
            </p>
          )}

          {view === "dark" && (
            <p className="text-[11px] font-mono" style={{ color: "var(--text-dim)" }}>Settings → Account → Preferences → Playback → Advanced: "Autoplay on Wi-Fi" (the only switch)</p>
          )}
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-4 p-3 rounded-lg text-xs space-y-1" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {view === "dark" ? (
          <>
            <p className="font-mono" style={{ color: "var(--red)" }}>What's wrong:</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>Autoplay and an endless feed remove every natural stopping point — the clip counter only goes up</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>The notification is not about anything the user did; it exists to pull them back</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>The streak punishes absence: stopping costs a badge and coins</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>An automated "buddy" simulates a relationship to make leaving feel rude</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>The one available switch is five levels deep and covers one feature on one network type</p>
          </>
        ) : (
          <>
            <p className="font-mono" style={{ color: "var(--green)" }}>What's right:</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>Engagement controls sit on the feed itself — each feature has its own switch, plus one that turns everything off or on</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>The demo opens on a saved "all off" choice: no banners, no countdown. Switch features on to compare. With the endless feed off, a break point appears every {BREAK_EVERY} clips and "Done for now" is the primary action</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>With autoplay off, nothing plays until the user asks for it</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>Each feature is named by what it does to you, not by a marketing label</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>The choice persists across devices and is never re-asked</p>
          </>
        )}
      </div>

      <button type="button" onClick={() => reset()} className="mt-2 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer font-mono" style={{ color: "var(--text)" }}>Reset demo</button>
    </div>
  );
}

export function AddictiveDesignPattern() {
  return (
    <div>
      <PatternHeader
        title="Addictive Design"
        description="Autoplay, endless feeds, come-back notifications, punishing streaks and simulated relationships are engineered to override the decision to stop. The EU Digital Fairness Act proposal (Nov 11, 2026) would require an easy off switch for each of them. This pattern shows the engagement trap and the control surface that replaces it."
        severity="high"
        tags={["Dark Pattern", "EU DFA Art. 17 (proposal)", "EU DSA Art. 25", "Addictive Design", "Attention"]}
      />

      <DemoContainer label="Engagement features (always-on trap vs user-controlled)">
        <AddictiveDesignDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Give every engagement feature its own off switch, plus one control that switches all of them off at once",
          "Put the controls within one tap of where the feature acts — on the feed, the player, the streak badge — not in nested settings",
          "Name features by their effect ('Next clip starts by itself'), not by brand terms ('Smart Flow')",
          "Build natural stopping points: caught-up markers, end of list, a break card with time spent",
          "Make 'Done for now' the primary action on a break card; continuing is the secondary one",
          "Limit notifications to things the user's own activity caused (replies, mentions, orders) unless they opted in to more",
          "If you keep streaks, remove the penalty: pause days, no lost rewards, no countdown to loss",
          "Persist the choice across devices and sessions, and apply it immediately",
          "Default engagement features off for accounts you know or reasonably suspect belong to minors",
        ]}
        donts={[
          "Don't autoplay the next item with a countdown the user has to beat",
          "Don't send notifications designed only to restart a session ('You haven't opened Loop today')",
          "Don't attach loss to absence — expiring badges, streak resets, coins that vanish",
          "Don't have an automated character plead, guilt or flirt to keep the user in the app",
          "Don't re-enable a switched-off feature after an update, or re-ask the choice on every launch",
          "Don't offer the switch only on one platform, one network type or one content type",
          "Don't hide time spent — show it in the session, not only in a weekly report",
          "Don't treat the off switch as churn to be A/B-tested away",
        ]}
        securityRationale="The European Commission adopted the Digital Fairness Act proposal (COM(2026) 1100) on November 11, 2026. It is a proposal, not law: Parliament and Council still have to agree a text, and it would apply 12 months after entry into force. As proposed, Article 17 does not ban engagement features. Where a design is intended to, or can reasonably be foreseen to, drive compulsive or excessive use, the trader must give consumers easy tools to switch the features off, per feature or all at once. Four feature types are named: automatic play and uninterrupted content without regular interruption moments, notifications not related to the consumer's own activity, features that reward engaging at regular times through penalties or lost benefits for missing one (streak mechanics), and features simulating interpersonal relations, such as persistent prompts to keep engaging with an automated system. Article 17 covers adults; minors fall under the separate EU Kids Act proposal. The Digital Fairness Act also bans ten dark patterns outright (Annex I, points 53–62) and requires national maximum fines of at least 4% of turnover in coordinated cross-border cases, up to 6% of worldwide turnover where the Commission enforces. Existing law already reaches the same designs: DSA Article 25 prohibits platform interfaces that impair free choice, and the Commission issued preliminary findings under the DSA against TikTok (February 6, 2026) and Instagram and Facebook (July 10, 2026) over infinite scroll, autoplay and push notifications; neither has reached a final decision. Critics such as EDRi argue an off switch still puts the burden on the individual — which is why the placement and wording of the switch is a design problem, not a legal footnote."
        accessibilityNotes={[
          "Autoplaying media must be pausable and stoppable (WCAG 2.2 SC 2.2.2) independent of the engagement switch",
          "Engagement switches use role=switch with the feature name as accessible name and state announced on change",
          "Countdowns and progress bars must not be the only signal that playback will continue — say it in text",
          "Break cards receive focus when they appear and are announced via aria-live=polite",
          "Streak and loss messaging relies on urgency; users with anxiety or ADHD are hit hardest — offer the off switch before the first streak is created",
          "Respect prefers-reduced-motion for feed transitions and progress animations",
        ]}
      />
    </div>
  );
}
