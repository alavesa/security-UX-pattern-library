import { useState, useEffect, useRef } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Activity, AlertTriangle, Shield, ShieldAlert, Clock, Eye, Filter } from "lucide-react";

interface LogEntry {
  id: number;
  time: string;
  type: "info" | "warning" | "critical";
  event: string;
  user: string;
  ip: string;
  detail: string;
}

const MOCK_LOGS: LogEntry[] = [
  { id: 1, time: "14:32:01", type: "info", event: "LOGIN_SUCCESS", user: "piia@example.com", ip: "85.130.xxx.xxx", detail: "Chrome on macOS, Helsinki FI" },
  { id: 2, time: "14:32:45", type: "info", event: "FILE_DOWNLOAD", user: "piia@example.com", ip: "85.130.xxx.xxx", detail: "Q4-report.pdf (2.3 MB)" },
  { id: 3, time: "14:33:12", type: "warning", event: "LOGIN_FAILED", user: "admin@example.com", ip: "197.210.xxx.xxx", detail: "Invalid password, Lagos NG" },
  { id: 4, time: "14:33:14", type: "warning", event: "LOGIN_FAILED", user: "admin@example.com", ip: "197.210.xxx.xxx", detail: "Invalid password, Lagos NG" },
  { id: 5, time: "14:33:15", type: "warning", event: "LOGIN_FAILED", user: "admin@example.com", ip: "197.210.xxx.xxx", detail: "Invalid password, Lagos NG" },
  { id: 6, time: "14:33:16", type: "critical", event: "ACCOUNT_LOCKED", user: "admin@example.com", ip: "197.210.xxx.xxx", detail: "3 failed attempts, 15min lockout" },
  { id: 7, time: "14:34:02", type: "critical", event: "PRIVILEGE_ESCALATION", user: "user42@example.com", ip: "95.173.xxx.xxx", detail: "Attempted role change editor→admin, BLOCKED" },
  { id: 8, time: "14:35:11", type: "info", event: "PASSWORD_CHANGED", user: "piia@example.com", ip: "85.130.xxx.xxx", detail: "Password updated successfully" },
  { id: 9, time: "14:36:00", type: "warning", event: "SUSPICIOUS_LOCATION", user: "alex@example.com", ip: "45.33.xxx.xxx", detail: "Login from new country: Brazil (usual: Germany)" },
  { id: 10, time: "14:37:22", type: "critical", event: "DATA_EXPORT_BULK", user: "user42@example.com", ip: "95.173.xxx.xxx", detail: "Exported 15,000 user records in 2 minutes" },
];

function LoggingMonitoringDemo() {
  const [scenario, setScenario] = useState<"log" | "anomaly" | "audit">("log");
  const [filter, setFilter] = useState<"all" | "warning" | "critical">("all");
  const [visibleLogs, setVisibleLogs] = useState<LogEntry[]>([]);
  const [done, setDone] = useState(false);
  const idxRef = useRef(0);

  // Streaming log effect
  useEffect(() => {
    if (scenario !== "log") return;
    setVisibleLogs([]);
    setDone(false);
    idxRef.current = 0;

    const filteredLogs = filter === "all" ? MOCK_LOGS :
      MOCK_LOGS.filter(l => filter === "critical" ? l.type === "critical" : l.type === "warning" || l.type === "critical");

    const timer = setInterval(() => {
      const i = idxRef.current;
      if (i < filteredLogs.length) {
        idxRef.current++;
        setVisibleLogs(prev => [...prev, filteredLogs[i]]);
      } else {
        clearInterval(timer);
        setDone(true);
      }
    }, 600);

    return () => clearInterval(timer);
  }, [scenario, filter]);

  return (
    <div className="w-full max-w-lg">
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {(["log", "anomaly", "audit"] as const).map(s => (
          <button key={s} onClick={() => setScenario(s)} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: scenario === s ? "var(--green-glow)" : "transparent", color: scenario === s ? "var(--green)" : "var(--text)" }}>
            {s === "log" ? "Live Log Stream" : s === "anomaly" ? "Anomaly Detection" : "Audit Trail"}
          </button>
        ))}
      </div>

      {/* Live log stream */}
      {scenario === "log" && (
        <div className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
            <span className="text-xs font-mono flex items-center gap-2">
              <Activity className="w-3.5 h-3.5" /> Security Event Log
            </span>
            <div className="flex gap-1">
              {(["all", "warning", "critical"] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)} className="text-xs px-2 py-0.5 rounded font-mono border-none cursor-pointer" style={{ background: filter === f ? "rgba(0,255,65,0.2)" : "transparent", color: filter === f ? "#00ff41" : "#666" }}>
                  {f === "warning" ? "≥ warning" : f}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 font-mono text-xs space-y-1 max-h-[350px] overflow-y-auto">
            {visibleLogs.map(log => (
              <div key={log.id} className={`flex items-start gap-2 py-1 px-2 rounded ${
                log.type === "critical" ? "bg-red-900/30" : log.type === "warning" ? "bg-amber-900/20" : ""
              }`}>
                <span className="shrink-0">{log.time}</span>
                <span className={`shrink-0 w-2 h-2 rounded-full mt-1 ${
                  log.type === "critical" ? "bg-red-500" : log.type === "warning" ? "bg-amber-500" : "bg-green-500"
                }`} />
                <span className={`shrink-0 ${
                  log.type === "critical" ? "" : log.type === "warning" ? "" : ""
                }`}>
                  {log.event}
                </span>
                <span className="truncate">{log.user} — {log.detail}</span>
              </div>
            ))}
            {!done && (
              <div className="animate-pulse">▊</div>
            )}
          </div>
        </div>
      )}

      {/* Anomaly detection */}
      {scenario === "anomaly" && (
        <div className="rounded-2xl border p-6">
          <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" /> Anomalies detected
          </h3>

          <div className="space-y-3">
            <div role="alert" className="border-2 rounded-lg p-4">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Bulk data export</p>
                  <p className="text-xs">user42 exported 15,000 records in 2 minutes — normal is &lt;100/day</p>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => { /* dispatch(securityAction('block-user')) */ }} className="text-xs text-white px-3 py-1 rounded border-none cursor-pointer">Block user</button>
                <button onClick={() => { /* dispatch(securityAction('investigate')) */ }} className="text-xs border px-3 py-1 rounded cursor-pointer">Investigate</button>
              </div>
            </div>

            <div role="alert" className="border-2 rounded-lg p-4">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Brute force attack</p>
                  <p className="text-xs">3 failed login attempts for admin@example.com from Lagos, NG in 4 seconds</p>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => { /* dispatch(securityAction('block-ip')) */ }} className="text-xs text-white px-3 py-1 rounded border-none cursor-pointer">Block IP</button>
                <button onClick={() => { /* dispatch(securityAction('view-logs')) */ }} className="text-xs border px-3 py-1 rounded cursor-pointer">View logs</button>
              </div>
            </div>

            <div role="status" aria-live="polite" className="border rounded-lg p-4">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Unusual login location</p>
                  <p className="text-xs">alex@example.com signed in from Brazil — usually signs in from Germany</p>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => { /* dispatch(securityAction('notify-user')) */ }} className="text-xs border px-3 py-1 rounded cursor-pointer">Notify user</button>
                <button onClick={() => { /* dispatch(securityAction('mark-safe')) */ }} className="text-xs border px-3 py-1 rounded cursor-pointer">Mark as safe</button>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-3 mt-4 text-xs">
            <strong>Pattern:</strong> Anomalies are ranked by severity with immediate action buttons. Each shows: what happened, why it's unusual (compared to baseline), and what to do about it. Admins can act without leaving the alert.
          </div>
        </div>
      )}

      {/* Audit trail */}
      {scenario === "audit" && (
        <div className="rounded-2xl border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Eye className="w-4 h-4" /> Audit Trail
            </h3>
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5" />
              <span className="text-xs">user42@example.com</span>
            </div>
          </div>

          <div className="border-l-2 ml-3 space-y-4">
            {[
              { id: 1, time: "14:37:22", event: "Exported 15,000 user records", severity: "critical", icon: ShieldAlert },
              { id: 2, time: "14:34:02", event: "Attempted role change to admin (BLOCKED)", severity: "critical", icon: ShieldAlert },
              { id: 3, time: "14:30:15", event: "Accessed admin panel", severity: "warning", icon: AlertTriangle },
              { id: 4, time: "14:28:00", event: "Logged in from 95.173.xxx.xxx (Moscow, RU)", severity: "warning", icon: AlertTriangle },
              { id: 5, time: "14:00:00", event: "Account created via API", severity: "info", icon: Shield },
            ].map(({ id, time, event, severity, icon: Icon }) => (
              <div key={id} className="flex items-start gap-3 pl-4 relative">
                <div className={`absolute -left-[9px] w-4 h-4 rounded-full border-2 border-white ${
                  severity === "critical" ? "bg-red-500" : severity === "warning" ? "bg-amber-500" : "bg-gray-300"
                }`} />
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs font-mono">{time}</span>
                  </div>
                  <p className={`text-sm flex items-center gap-1 ${severity === "critical" ? " font-medium" : severity === "warning" ? "" : ""}`}>
                    <Icon className="w-4 h-4 shrink-0" />
                    {event}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border rounded-lg p-3 mt-4 text-xs">
            <strong>Analysis:</strong> This user created an account via API, immediately accessed the admin panel, attempted privilege escalation, and then bulk-exported user data. This is a textbook data exfiltration pattern.
          </div>
        </div>
      )}
    </div>
  );
}

export function LoggingMonitoringPattern() {
  return (
    <div>
      <PatternHeader
        title="A09: Security Logging & Monitoring"
        description="How to design security dashboards for administrators — live event logs, anomaly detection, and user audit trails. Making invisible threats visible in real-time."
        severity="high"
        tags={["OWASP A09", "CWE-778", "CWE-223"]}
      />

      <DemoContainer label="logging & monitoring (3 variants)">
        <LoggingMonitoringDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Log all security-relevant events: login success/failure, access control failures, data exports",
          "Show live log streams with real-time filtering (all/warning/critical)",
          "Detect anomalies automatically: unusual volume, location, time, behavior patterns",
          "Provide immediate action buttons on anomaly alerts (block user, block IP, investigate)",
          "Build per-user audit trails that show the full sequence of actions",
          "Include context in every log entry: who, what, when, where (IP + location), result",
          "Set up automated alerts for critical patterns (brute force, bulk export, privilege escalation)",
          "Retain logs for a compliance-appropriate period (GDPR: document retention policy)",
        ]}
        donts={[
          "Don't log sensitive data (passwords, tokens, PII) in plaintext",
          "Don't allow log tampering — use append-only or external log storage",
          "Don't ignore repeated failed events — 3 failed logins in 4 seconds is an attack",
          "Don't show raw log files to admins — parse and present them meaningfully",
          "Don't alert on every event — use baseline comparison to reduce noise",
          "Don't store logs on the same server as the application (if compromised, logs are lost)",
          "Don't forget to monitor the monitoring system itself",
        ]}
        securityRationale="OWASP A09 (Security Logging & Monitoring Failures) enables all other attacks to succeed undetected. The average time to detect a breach is 204 days (IBM, 2023). CWE-778 (Insufficient Logging) and CWE-223 (Omission of Security-relevant Information) mean that even after a breach is discovered, there's no audit trail to investigate. The UX challenge for security admins: log everything but surface only what matters. The anomaly detection pattern — comparing current behavior to baseline — is the bridge between 'too many logs' and 'missed the attack.'"
        accessibilityNotes={[
          "Log entries use both color AND dot indicators for severity",
          "Filter controls are keyboard accessible",
          "Anomaly alerts use role='alert' for screen reader announcement",
          "Audit trail timeline uses semantic markup for navigation",
          "Action buttons have descriptive labels ('Block user' not just 'Block')",
          "Live log stream doesn't auto-scroll in a way that disrupts focus",
        ]}
      />
    </div>
  );
}
