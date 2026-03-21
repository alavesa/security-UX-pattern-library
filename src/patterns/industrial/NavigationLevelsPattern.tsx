import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Layers, ChevronRight, AlertTriangle, Activity, Thermometer, Gauge, ArrowLeft } from "lucide-react";

type Level = 1 | 2 | 3 | 4;

interface AreaData {
  name: string;
  status: "normal" | "warning" | "critical";
  units: UnitData[];
}

interface UnitData {
  name: string;
  status: "normal" | "warning" | "critical";
  value: number;
  unit: string;
  setpoint: number;
  details: { label: string; value: string }[];
}

const PLANT_DATA: AreaData[] = [
  {
    name: "Boiler House",
    status: "warning",
    units: [
      { name: "Boiler B-101", status: "warning", value: 342, unit: "°C", setpoint: 320, details: [
        { label: "Steam pressure", value: "45.2 bar" },
        { label: "Feed water flow", value: "12.8 t/h" },
        { label: "Flue gas O₂", value: "3.2%" },
        { label: "Efficiency", value: "91.4%" },
      ]},
      { name: "Boiler B-102", status: "normal", value: 318, unit: "°C", setpoint: 320, details: [
        { label: "Steam pressure", value: "44.8 bar" },
        { label: "Feed water flow", value: "12.5 t/h" },
        { label: "Flue gas O₂", value: "3.8%" },
        { label: "Efficiency", value: "93.1%" },
      ]},
    ],
  },
  {
    name: "Turbine Hall",
    status: "normal",
    units: [
      { name: "Turbine T-201", status: "normal", value: 3000, unit: "RPM", setpoint: 3000, details: [
        { label: "Power output", value: "24.5 MW" },
        { label: "Vibration X", value: "2.1 mm/s" },
        { label: "Vibration Y", value: "1.8 mm/s" },
        { label: "Bearing temp", value: "62°C" },
      ]},
      { name: "Generator G-201", status: "normal", value: 24.5, unit: "MW", setpoint: 25, details: [
        { label: "Voltage", value: "11.0 kV" },
        { label: "Current", value: "1.42 kA" },
        { label: "Power factor", value: "0.95" },
        { label: "Frequency", value: "50.0 Hz" },
      ]},
    ],
  },
  {
    name: "Cooling System",
    status: "critical",
    units: [
      { name: "Pump P-301", status: "critical", value: 72, unit: "°C", setpoint: 55, details: [
        { label: "Flow rate", value: "28.3 m³/h" },
        { label: "Discharge pressure", value: "4.2 bar" },
        { label: "Motor current", value: "45.2 A" },
        { label: "Vibration", value: "8.7 mm/s" },
      ]},
      { name: "Cooling Tower CT-301", status: "warning", value: 38, unit: "°C", setpoint: 32, details: [
        { label: "Wet bulb temp", value: "24°C" },
        { label: "Fan speed", value: "85%" },
        { label: "Makeup water", value: "3.2 m³/h" },
        { label: "Basin level", value: "78%" },
      ]},
    ],
  },
];

const statusColor = (s: string) =>
  s === "critical" ? "var(--red)" : s === "warning" ? "var(--amber)" : "var(--green)";

const statusBg = (s: string) =>
  s === "critical" ? "rgba(255,51,51,0.1)" : s === "warning" ? "rgba(255,170,0,0.1)" : "rgba(0,255,65,0.05)";

function NavigationDemo() {
  const [level, setLevel] = useState<Level>(1);
  const [selectedArea, setSelectedArea] = useState<number | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);

  const breadcrumb: { label: string; action: () => void }[] = [
    { label: "Plant Overview", action: () => { setLevel(1); setSelectedArea(null); setSelectedUnit(null); } },
  ];

  if (level >= 2 && selectedArea !== null) {
    breadcrumb.push({
      label: PLANT_DATA[selectedArea].name,
      action: () => { setLevel(2); setSelectedUnit(null); },
    });
  }

  if (level >= 3 && selectedArea !== null && selectedUnit !== null) {
    breadcrumb.push({
      label: PLANT_DATA[selectedArea].units[selectedUnit].name,
      action: () => { setLevel(3); },
    });
  }

  if (level === 4) {
    breadcrumb.push({ label: "Detail View", action: () => {} });
  }

  const goToArea = (i: number) => { setSelectedArea(i); setSelectedUnit(null); setLevel(2); };
  const goToUnit = (i: number) => { setSelectedUnit(i); setLevel(3); };
  const goToDetail = () => { setLevel(4); };
  const goBack = () => {
    if (level === 4) setLevel(3);
    else if (level === 3) { setLevel(2); setSelectedUnit(null); }
    else if (level === 2) { setLevel(1); setSelectedArea(null); }
  };

  return (
    <div className="w-full max-w-lg">
      {/* Level indicator */}
      <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded text-xs font-mono" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <Layers className="w-3.5 h-3.5" style={{ color: "var(--green)" }} />
        <span style={{ color: "var(--text-dim)" }}>ISA-101 Level</span>
        {([1, 2, 3, 4] as Level[]).map(l => (
          <span key={l} className="px-1.5 py-0.5 rounded text-xs" style={{
            background: level === l ? "var(--green-glow)" : "transparent",
            color: level === l ? "var(--green)" : "var(--text-dim)",
            border: level === l ? "1px solid var(--green-border)" : "1px solid transparent",
          }}>
            L{l}
          </span>
        ))}
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 mb-3 px-3 py-2 rounded text-xs font-mono overflow-x-auto" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
        {level > 1 && (
          <button onClick={goBack} className="mr-1 p-1 rounded border-none cursor-pointer bg-transparent" style={{ color: "var(--green)" }}>
            <ArrowLeft className="w-3 h-3" />
          </button>
        )}
        {breadcrumb.map((b, i) => (
          <span key={i} className="flex items-center gap-1 whitespace-nowrap">
            {i > 0 && <ChevronRight className="w-3 h-3" style={{ color: "var(--text-dim)" }} />}
            <button
              onClick={b.action}
              className="border-none bg-transparent cursor-pointer font-mono text-xs px-1 py-0.5 rounded hover:underline"
              style={{ color: i === breadcrumb.length - 1 ? "var(--green)" : "var(--text)" }}
            >
              {b.label}
            </button>
          </span>
        ))}
      </div>

      {/* Content area */}
      <div className="rounded-lg p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", minHeight: 200 }}>
        {/* Level 1: Plant Overview */}
        {level === 1 && (
          <div className="space-y-2">
            <p className="text-xs font-mono mb-3" style={{ color: "var(--text-dim)" }}>
              L1 — Plant Overview · {PLANT_DATA.filter(a => a.status === "critical").length} critical · {PLANT_DATA.filter(a => a.status === "warning").length} warning
            </p>
            {PLANT_DATA.map((area, i) => (
              <button
                key={i}
                onClick={() => goToArea(i)}
                className="w-full flex items-center justify-between p-3 rounded-lg border-none cursor-pointer font-mono text-xs text-left"
                style={{ background: statusBg(area.status), border: `1px solid ${statusColor(area.status)}33` }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: statusColor(area.status) }} />
                  <span style={{ color: "var(--text)" }}>{area.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: statusColor(area.status) }}>{area.status.toUpperCase()}</span>
                  <ChevronRight className="w-3 h-3" style={{ color: "var(--text-dim)" }} />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Level 2: Area View */}
        {level === 2 && selectedArea !== null && (
          <div className="space-y-2">
            <p className="text-xs font-mono mb-3" style={{ color: "var(--text-dim)" }}>
              L2 — {PLANT_DATA[selectedArea].name} · {PLANT_DATA[selectedArea].units.length} units
            </p>
            {PLANT_DATA[selectedArea].units.map((unit, i) => (
              <button
                key={i}
                onClick={() => goToUnit(i)}
                className="w-full flex items-center justify-between p-3 rounded-lg border-none cursor-pointer font-mono text-xs text-left"
                style={{ background: statusBg(unit.status), border: `1px solid ${statusColor(unit.status)}33` }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: statusColor(unit.status) }} />
                  <span style={{ color: "var(--text)" }}>{unit.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono" style={{ color: statusColor(unit.status) }}>
                    {unit.value} {unit.unit}
                  </span>
                  <ChevronRight className="w-3 h-3" style={{ color: "var(--text-dim)" }} />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Level 3: Unit View */}
        {level === 3 && selectedArea !== null && selectedUnit !== null && (() => {
          const unit = PLANT_DATA[selectedArea].units[selectedUnit];
          const deviation = Math.abs(unit.value - unit.setpoint);
          const deviationPct = ((deviation / unit.setpoint) * 100).toFixed(1);
          return (
            <div className="space-y-3">
              <p className="text-xs font-mono mb-1" style={{ color: "var(--text-dim)" }}>
                L3 — {unit.name}
              </p>

              {/* Main value */}
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: statusBg(unit.status), border: `1px solid ${statusColor(unit.status)}33` }}>
                <div>
                  <p className="text-2xl font-mono font-bold" style={{ color: statusColor(unit.status) }}>
                    {unit.value} {unit.unit}
                  </p>
                  <p className="text-xs font-mono mt-1" style={{ color: "var(--text-dim)" }}>
                    Setpoint: {unit.setpoint} {unit.unit} · Deviation: {deviationPct}%
                  </p>
                </div>
                {unit.status !== "normal" && (
                  <AlertTriangle className="w-6 h-6" style={{ color: statusColor(unit.status) }} />
                )}
              </div>

              {/* Key parameters */}
              <div className="grid grid-cols-2 gap-2">
                {unit.details.slice(0, 4).map((d, i) => (
                  <div key={i} className="p-2 rounded text-xs font-mono" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                    <p style={{ color: "var(--text-dim)" }}>{d.label}</p>
                    <p className="text-sm mt-0.5" style={{ color: "var(--text)" }}>{d.value}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={goToDetail}
                className="w-full py-2 rounded text-xs font-mono border-none cursor-pointer"
                style={{ background: "var(--green-glow)", color: "var(--green)", border: "1px solid var(--green-border)" }}
              >
                View Detail (L4) →
              </button>
            </div>
          );
        })()}

        {/* Level 4: Detail View */}
        {level === 4 && selectedArea !== null && selectedUnit !== null && (() => {
          const unit = PLANT_DATA[selectedArea].units[selectedUnit];
          return (
            <div className="space-y-3">
              <p className="text-xs font-mono mb-1" style={{ color: "var(--text-dim)" }}>
                L4 — {unit.name} · Diagnostic Detail
              </p>

              {/* Trend placeholder */}
              <div className="p-3 rounded-lg" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                <p className="text-xs font-mono mb-2" style={{ color: "var(--text-dim)" }}>
                  <Activity className="w-3 h-3 inline mr-1" /> 24h Trend
                </p>
                <div className="flex items-end gap-1 h-16">
                  {Array.from({ length: 24 }, (_, i) => {
                    const base = unit.setpoint;
                    const noise = Math.sin(i * 0.5) * (unit.value - unit.setpoint) * (i / 24);
                    const val = base + noise;
                    const height = Math.max(10, Math.min(100, ((val - base * 0.8) / (base * 0.4)) * 100));
                    const isHigh = val > unit.setpoint * 1.05;
                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-t"
                        style={{
                          height: `${height}%`,
                          background: isHigh ? "var(--red)" : "var(--green)",
                          opacity: 0.6 + (i / 24) * 0.4,
                        }}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between text-xs font-mono mt-1" style={{ color: "var(--text-dim)" }}>
                  <span>-24h</span>
                  <span style={{ color: "var(--amber)" }}>— setpoint: {unit.setpoint} {unit.unit}</span>
                  <span>now</span>
                </div>
              </div>

              {/* All parameters */}
              <div className="space-y-1">
                <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>All Parameters</p>
                {unit.details.map((d, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded text-xs font-mono" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                    <span style={{ color: "var(--text-dim)" }}>{d.label}</span>
                    <span style={{ color: "var(--text)" }}>{d.value}</span>
                  </div>
                ))}
              </div>

              {/* Alarm history */}
              <div className="p-3 rounded-lg" style={{ background: "rgba(255,51,51,0.05)", border: "1px solid rgba(255,51,51,0.15)" }}>
                <p className="text-xs font-mono mb-2" style={{ color: "var(--red)" }}>
                  <AlertTriangle className="w-3 h-3 inline mr-1" /> Recent Alarms
                </p>
                <div className="space-y-1 text-xs font-mono">
                  <div className="flex justify-between" style={{ color: "var(--text)" }}>
                    <span>High value exceeded</span>
                    <span style={{ color: "var(--text-dim)" }}>14:23</span>
                  </div>
                  <div className="flex justify-between" style={{ color: "var(--text)" }}>
                    <span>Rate of change alarm</span>
                    <span style={{ color: "var(--text-dim)" }}>14:18</span>
                  </div>
                  <div className="flex justify-between" style={{ color: "var(--text)" }}>
                    <span>Setpoint deviation &gt;5%</span>
                    <span style={{ color: "var(--text-dim)" }}>14:02</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

export function NavigationLevelsPattern() {
  return (
    <>
      <PatternHeader
        title="Navigation & Levels of Detail"
        description="ISA-101 compliant HMI navigation hierarchy — from plant overview to diagnostic detail. Operators must navigate quickly to the right level during abnormal situations without losing context."
        severity="warning"
        tags={["ISA-101", "IEC 62443", "HMI", "industrial"]}
      />

      <DemoContainer label="ISA-101 Navigation Hierarchy">
        <NavigationDemo />
      </DemoContainer>

      <GuidelineSection
        doList={[
          "Follow ISA-101 4-level hierarchy: Overview → Area → Unit → Detail",
          "Persistent breadcrumb showing current location at all times",
          "Color-code status consistently across all levels (green/amber/red)",
          "Allow one-click navigation from alarm to the relevant unit",
          "Show context preview before drill-down (key value + status)",
          "Support keyboard navigation for accessibility",
          "Maintain scroll position when returning to a parent level",
          "Show aggregate status at higher levels (worst-case propagation)",
        ]}
        dontList={[
          "Don't require more than 3 clicks to reach any detail from overview",
          "Don't change color meanings between levels",
          "Don't hide the back button or breadcrumb during alarms",
          "Don't auto-navigate operators away from their current view",
          "Don't use deep menu trees — flatten the hierarchy",
          "Don't show raw data at overview level — use meaningful aggregations",
        ]}
        securityNotes="Navigation context must be preserved during authentication events (session timeout, role switch). ISA-101.01 §6.3 requires that operators can return to their pre-authentication view. IEC 62443-3-3 SR 2.8 requires audit logging of navigation to safety-critical views."
        accessibilityNotes="All levels must be keyboard-navigable. Breadcrumb uses nav landmark with aria-label='Breadcrumb'. Status colors are paired with text labels (never color-only). Level transitions announce the new context to screen readers via aria-live region."
      />
    </>
  );
}