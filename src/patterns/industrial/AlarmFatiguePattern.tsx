import { useState, useEffect, useMemo, useRef } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Bell, BellOff, AlertTriangle, CheckCircle2, Volume2, VolumeX } from "lucide-react";

interface Alarm {
  id: number;
  time: string;
  priority: "critical" | "high" | "medium" | "low";
  message: string;
  tag: string;
  acknowledged: boolean;
  shelved: boolean;
}

const FLOOD_ALARMS: Alarm[] = [
  { id: 1, time: "14:32:01", priority: "low", message: "Tank T-201 level low", tag: "LT-201", acknowledged: false, shelved: false },
  { id: 2, time: "14:32:01", priority: "low", message: "Pump P-101 seal leak minor", tag: "PT-101", acknowledged: false, shelved: false },
  { id: 3, time: "14:32:02", priority: "medium", message: "Compressor C-301 vibration high", tag: "VT-301", acknowledged: false, shelved: false },
  { id: 4, time: "14:32:02", priority: "low", message: "Cooling water temp deviation", tag: "TT-401", acknowledged: false, shelved: false },
  { id: 5, time: "14:32:03", priority: "high", message: "Reactor R-101 pressure rising", tag: "PT-101R", acknowledged: false, shelved: false },
  { id: 6, time: "14:32:03", priority: "low", message: "Instrument air pressure low", tag: "PT-501", acknowledged: false, shelved: false },
  { id: 7, time: "14:32:04", priority: "low", message: "Flare pilot flame status", tag: "FS-601", acknowledged: false, shelved: false },
  { id: 8, time: "14:32:04", priority: "critical", message: "REACTOR R-101 HIGH PRESSURE TRIP", tag: "PSH-101R", acknowledged: false, shelved: false },
  { id: 9, time: "14:32:05", priority: "low", message: "Boiler feedwater temp low", tag: "TT-701", acknowledged: false, shelved: false },
  { id: 10, time: "14:32:05", priority: "medium", message: "Stack emission SO2 above normal", tag: "AT-801", acknowledged: false, shelved: false },
];

const MANAGED_ALARMS: Alarm[] = [
  { id: 8, time: "14:32:04", priority: "critical", message: "REACTOR R-101 HIGH PRESSURE TRIP", tag: "PSH-101R", acknowledged: false, shelved: false },
  { id: 5, time: "14:32:03", priority: "high", message: "Reactor R-101 pressure rising — root cause of trip", tag: "PT-101R", acknowledged: false, shelved: false },
  { id: 3, time: "14:32:02", priority: "medium", message: "Compressor C-301 vibration high — may be related", tag: "VT-301", acknowledged: false, shelved: false },
];

const PRIORITY_STYLES: Record<string, { bg: string; border: string; text: string }> = {
  critical: { bg: "#7f1d1d", border: "#dc2626", text: "#fca5a5" },
  high: { bg: "#78350f", border: "#d97706", text: "#fde68a" },
  medium: { bg: "#1e3a5f", border: "#3b82f6", text: "#93c5fd" },
  low: { bg: "#1f2937", border: "#4b5563", text: "#9ca3af" },
};

function AlarmFatigueDemo() {
  const [scenario, setScenario] = useState<"flood" | "managed" | "shelving">("flood");
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [running, setRunning] = useState(false);
  const hasResetRef = useRef(false);

  useEffect(() => {
    if (!running) return;
    if (!hasResetRef.current) {
      setAlarms([]);
      hasResetRef.current = true;
    }

    const source = scenario === "flood" || scenario === "shelving" ? FLOOD_ALARMS : MANAGED_ALARMS;
    const delay = scenario === "managed" ? 800 : 300;
    let idx = 0;

    const timer = setInterval(() => {
      if (idx < source.length) {
        const alarm = source[idx];
        setAlarms(prev => [...prev, { ...alarm }]);
        idx++;
      } else {
        clearInterval(timer);
        setRunning(false);
      }
    }, delay);

    return () => clearInterval(timer);
  }, [running, scenario]);

  const acknowledge = (id: number) => {
    setAlarms(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
  };

  const shelve = (id: number) => {
    setAlarms(prev => prev.map(a => a.id === id ? { ...a, shelved: true } : a));
  };

  const stats = useMemo(() => ({
    active: alarms.filter(a => !a.acknowledged && !a.shelved).length,
    unshelved: alarms.filter(a => !a.shelved),
    critical: alarms.filter(a => a.priority === "critical" && !a.shelved && !a.acknowledged).length,
    high: alarms.filter(a => a.priority === "high" && !a.shelved && !a.acknowledged).length,
    medium: alarms.filter(a => a.priority === "medium" && !a.shelved && !a.acknowledged).length,
    low: alarms.filter(a => a.priority === "low" && !a.shelved && !a.acknowledged).length,
    shelvedCount: alarms.filter(a => a.shelved).length,
  }), [alarms]);

  const reset = () => {
    setAlarms([]);
    setRunning(false);
  };

  const priorityStyle = (p: string) => PRIORITY_STYLES[p] ?? PRIORITY_STYLES.low;

  return (
    <div className="w-full max-w-lg">
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {(["flood", "managed", "shelving"] as const).map(s => (
          <button key={s} onClick={() => { setScenario(s); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: scenario === s ? "var(--industrial-glow)" : "transparent", color: scenario === s ? "var(--industrial-color)" : "var(--text)" }}>
            {s === "flood" ? "Alarm Flood" : s === "managed" ? "Smart Grouping" : "Shelving"}
          </button>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
        <div className="px-4 py-2 flex items-center justify-between" style={{ background: "var(--bg-elevated)", borderBottom: "1px solid var(--border)" }}>
          <span className="font-mono text-xs flex items-center gap-2" style={{ color: scenario === "flood" ? "var(--red)" : scenario === "shelving" ? "var(--amber)" : "var(--green)" }}>
            {scenario === "flood" ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            {scenario === "flood" ? "ALARM FLOOD — 10 alarms in 5 seconds" : scenario === "shelving" ? "ALARM SHELVING — suppress nuisance alarms" : "SMART ALARM MANAGEMENT"}
          </span>
          <span className="font-mono text-xs" style={{ color: "var(--text)" }}>
            {stats.active} active
          </span>
        </div>

        <div className="max-h-[350px] overflow-y-auto">
          {!running && alarms.length === 0 && (
            <div className="p-8 text-center">
              <Bell className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--text)" }} />
              <p className="font-mono text-xs mb-4" style={{ color: "var(--text)" }}>
                {scenario === "flood"
                  ? "Simulates 10 alarms arriving in 5 seconds — a typical alarm flood scenario"
                  : scenario === "managed"
                  ? "Same event, but with smart grouping — only 3 alarms shown, root cause highlighted"
                  : "Demonstrates alarm shelving — suppress known nuisance alarms temporarily"
                }
              </p>
              <button onClick={() => { hasResetRef.current = false; setRunning(true); }} className="font-mono text-sm px-6 py-3 rounded border-none cursor-pointer" style={{ background: "var(--industrial-color)", color: "var(--bg)" }}>
                Start alarm simulation
              </button>
            </div>
          )}

          {stats.unshelved.map(alarm => {
            const style = priorityStyle(alarm.priority);
            return (
              <div
                key={alarm.id}
                className="flex items-start gap-3 px-4 py-3 font-mono text-xs transition-all"
                style={{
                  borderBottom: "1px solid var(--border)",
                  background: alarm.acknowledged ? "var(--bg)" : style.bg,
                  opacity: alarm.acknowledged ? 0.5 : 1,
                }}
              >
                <div className="shrink-0 mt-0.5">
                  {(alarm.priority === "critical" || alarm.priority === "high") ? <AlertTriangle className="w-4 h-4" style={{ color: style.text }} /> : <Bell className="w-4 h-4" style={{ color: style.text }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold uppercase" style={{ color: style.text }}>{alarm.priority}</span>
                    <span style={{ color: "var(--text-dim)" }}>{alarm.tag}</span>
                    <span style={{ color: "var(--text-dim)" }}>{alarm.time}</span>
                  </div>
                  <p className="mt-0.5" style={{ color: alarm.acknowledged ? "var(--text-dim)" : "var(--text-bright)" }}>{alarm.message}</p>
                </div>
                {!alarm.acknowledged && (
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => acknowledge(alarm.id)} className="text-xs px-2 py-1 rounded border-none cursor-pointer" style={{ background: "var(--bg-elevated)", color: "var(--text-bright)" }}>ACK</button>
                    {scenario === "shelving" && (
                      <button onClick={() => shelve(alarm.id)} className="text-xs px-2 py-1 rounded border-none cursor-pointer" style={{ background: "var(--bg-elevated)", color: "var(--text-bright)" }}>
                        <BellOff className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}
                {alarm.acknowledged && <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "var(--text-dim)" }} />}
              </div>
            );
          })}
        </div>

        {/* Summary bar */}
        {alarms.length > 0 && (
          <div className="px-4 py-2 flex items-center justify-between font-mono text-xs" style={{ background: "var(--bg-elevated)", borderTop: "1px solid var(--border)" }}>
            <div className="flex gap-3">
              <span style={{ color: "#fca5a5" }}>{stats.critical} crit</span>
              <span style={{ color: "#fde68a" }}>{stats.high} high</span>
              <span style={{ color: "#93c5fd" }}>{stats.medium} med</span>
              <span style={{ color: "#9ca3af" }}>{stats.low} low</span>
            </div>
            {stats.shelvedCount > 0 && (
              <span style={{ color: "var(--text-dim)" }}>{stats.shelvedCount} shelved</span>
            )}
          </div>
        )}
      </div>

      {/* Explanation */}
      {alarms.length > 0 && (
        <div className="mt-4 p-3 rounded-lg text-xs" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          {scenario === "flood" && (
            <p style={{ color: "var(--red)" }}>
              <strong>The problem:</strong> 10 alarms in 5 seconds. The critical reactor trip is buried among 7 low-priority alarms. This is alarm fatigue — operators can't identify what matters. ISA-18.2 recommends max 6 alarms per operator per hour in steady state.
            </p>
          )}
          {scenario === "managed" && (
            <p style={{ color: "var(--green)" }}>
              <strong>The solution:</strong> Same event, but smart grouping shows only 3 alarms. The critical trip is first. Related alarms are linked. Low-priority consequential alarms are suppressed. Operators immediately see: what happened, what caused it, and what might be related.
            </p>
          )}
          {scenario === "shelving" && (
            <p style={{ color: "var(--cyan)" }}>
              <strong>Shelving:</strong> Known nuisance alarms can be temporarily suppressed. Shelved alarms are tracked and visible in the shelved count, keeping them monitored rather than permanently disabled. This reduces noise while maintaining awareness of suppressed conditions.
            </p>
          )}
        </div>
      )}

      <button onClick={reset} className="mt-4 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer" style={{ color: "var(--text)" }}>Reset demo</button>
    </div>
  );
}

export function AlarmFatiguePattern() {
  return (
    <div>
      <PatternHeader
        title="Alarm Fatigue Management"
        description="Industrial systems generate thousands of alarms. When everything is urgent, nothing is. This pattern shows the difference between an alarm flood that overwhelms operators and smart alarm management that saves lives."
        severity="critical"
        tags={["Industrial", "ISA-18.2", "EEMUA 191", "Alarm Management"]}
      />

      <DemoContainer label="alarm management (3 variants)">
        <AlarmFatigueDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Prioritize alarms by severity — critical alarms must visually dominate",
          "Group related alarms — show root cause, not 10 consequence alarms",
          "Follow ISA-18.2: target max 6 alarms per operator per hour in steady state",
          "Implement alarm shelving — temporarily suppress known nuisance alarms with auto-unshelve",
          "Show alarm count by priority in a persistent summary bar",
          "Use distinct visual treatment for each priority level (color + icon + size)",
          "Provide one-click acknowledge (ACK) — operators can't type during alarm floods",
          "Log all alarm activity — acknowledges, shelves, and response times for KPI analysis",
        ]}
        donts={[
          "Don't treat all alarms equally — if everything flashes red, nothing stands out",
          "Don't show consequential alarms as separate items — group them by root cause",
          "Don't allow operators to permanently silence alarms — only time-limited shelving",
          "Don't use the same notification pattern for 'low tank level' and 'reactor pressure trip'",
          "Don't exceed 10 alarms per 10 minutes in an alarm flood — suppress lower priority",
          "Don't remove alarms from view — dim acknowledged alarms but keep them visible",
          "Don't use tiny buttons — operators may be wearing gloves and under stress",
          "Don't ignore alarm KPIs — if operators acknowledge without reading, the system is failing",
        ]}
        securityRationale="EEMUA Publication 191 and ISA-18.2 (IEC 62682) are the global standards for alarm management. The Three Mile Island (1979), Buncefield (2005), and Deepwater Horizon (2010) disasters all involved alarm fatigue as a contributing factor. Texas City Refinery (2005): operators received 500 alarms in the hour before the explosion. The UX insight: alarm fatigue isn't a training problem — it's a design problem. Smart grouping, priority filtering, and shelving are UX solutions to an engineering failure mode."
        accessibilityNotes={[
          "Critical alarms use audio + visual + haptic alerts (multi-sensory)",
          "Color-coding always paired with text labels and icons — operators may be colorblind",
          "ACK buttons are minimum 14mm for gloved touch operation",
          "Priority summary bar is always visible — no scrolling needed to see alarm counts",
          "Shelved alarm count visible at all times — suppressed ≠ invisible",
          "Alarm text readable at arm's length — minimum 14px for operator workstations",
        ]}
      />
    </div>
  );
}
