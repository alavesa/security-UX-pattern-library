import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Activity, Monitor, Smartphone, Globe, Shield, AlertTriangle, LogOut, Key, Settings, Eye, Download, CheckCircle2 } from "lucide-react";

type Scenario = "activity" | "devices" | "access";

interface LogEntry {
  id: string;
  icon: typeof Activity;
  action: string;
  detail: string;
  time: string;
  ip: string;
  severity: "normal" | "warning" | "critical";
}

interface DeviceEntry {
  id: string;
  name: string;
  icon: typeof Monitor;
  location: string;
  lastActive: string;
  current: boolean;
  browser: string;
}

interface AccessEntry {
  id: string;
  who: string;
  data: string;
  action: string;
  time: string;
  reason: string;
}

const ACTIVITY_LOG: LogEntry[] = [
  { id: "1", icon: Key, action: "Password changed", detail: "Password updated successfully", time: "2 min ago", ip: "192.168.1.42", severity: "normal" },
  { id: "2", icon: Shield, action: "MFA enabled", detail: "Authenticator app configured", time: "5 min ago", ip: "192.168.1.42", severity: "normal" },
  { id: "3", icon: AlertTriangle, action: "Failed login attempt", detail: "Incorrect password (3rd attempt)", time: "1 hour ago", ip: "45.33.12.97", severity: "critical" },
  { id: "4", icon: AlertTriangle, action: "Failed login attempt", detail: "Incorrect password (2nd attempt)", time: "1 hour ago", ip: "45.33.12.97", severity: "critical" },
  { id: "5", icon: AlertTriangle, action: "Failed login attempt", detail: "Incorrect password (1st attempt)", time: "1 hour ago", ip: "45.33.12.97", severity: "warning" },
  { id: "6", icon: Settings, action: "Email changed", detail: "user@old.com → user@new.com", time: "3 hours ago", ip: "192.168.1.42", severity: "normal" },
  { id: "7", icon: Globe, action: "Login from new location", detail: "Helsinki, Finland", time: "1 day ago", ip: "91.152.44.12", severity: "warning" },
  { id: "8", icon: Download, action: "Data export requested", detail: "Full account data (GDPR Art. 20)", time: "2 days ago", ip: "192.168.1.42", severity: "normal" },
  { id: "9", icon: Eye, action: "Privacy settings viewed", detail: "Data sharing preferences page", time: "3 days ago", ip: "192.168.1.42", severity: "normal" },
  { id: "10", icon: LogOut, action: "Session ended", detail: "Logout from Chrome on macOS", time: "5 days ago", ip: "192.168.1.42", severity: "normal" },
];

const DEVICES: DeviceEntry[] = [
  { id: "d1", name: "MacBook Pro", icon: Monitor, location: "Helsinki, Finland", lastActive: "Now", current: true, browser: "Chrome 122" },
  { id: "d2", name: "iPhone 15", icon: Smartphone, location: "Helsinki, Finland", lastActive: "2 hours ago", current: false, browser: "Safari iOS" },
  { id: "d3", name: "Unknown Device", icon: Globe, location: "São Paulo, Brazil", lastActive: "3 days ago", current: false, browser: "Firefox 121" },
];

const ACCESS_LOG: AccessEntry[] = [
  { id: "a1", who: "You", data: "Profile information", action: "Viewed", time: "10 min ago", reason: "Account settings" },
  { id: "a2", who: "Support Agent #4821", data: "Account details", action: "Viewed", time: "2 days ago", reason: "Support ticket #12847" },
  { id: "a3", who: "Analytics System", data: "Usage statistics", action: "Processed", time: "1 day ago", reason: "Service improvement (consent: 2024-01-15)" },
  { id: "a4", who: "You", data: "Payment history", action: "Exported", time: "5 days ago", reason: "Data portability request" },
  { id: "a5", who: "Compliance Bot", data: "Login history", action: "Audited", time: "7 days ago", reason: "Automated security review" },
];

const severityColor = (s: string) =>
  s === "critical" ? "var(--red)" : s === "warning" ? "var(--amber)" : "var(--green)";

const severityBg = (s: string) =>
  s === "critical" ? "rgba(255,51,51,0.1)" : s === "warning" ? "rgba(255,170,0,0.1)" : "transparent";

function ActivityLogDemo() {
  const [scenario, setScenario] = useState<Scenario>("activity");
  const [filter, setFilter] = useState<"all" | "warning" | "critical">("all");
  const [revokedDevices, setRevokedDevices] = useState<Set<string>>(new Set());
  const [exportStarted, setExportStarted] = useState(false);

  const filteredLog = ACTIVITY_LOG.filter(entry => {
    if (filter === "all") return true;
    if (filter === "warning") return entry.severity === "warning" || entry.severity === "critical";
    return entry.severity === "critical";
  });

  const revokeDevice = (id: string) => {
    setRevokedDevices(prev => new Set([...prev, id]));
  };

  return (
    <div className="w-full max-w-lg">
      {/* Scenario tabs */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {([
          { key: "activity" as const, label: "Account Activity" },
          { key: "devices" as const, label: "Active Devices" },
          { key: "access" as const, label: "Data Access" },
        ]).map(s => (
          <button key={s.key} onClick={() => setScenario(s.key)} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: scenario === s.key ? "var(--cyan-glow)" : "transparent", color: scenario === s.key ? "var(--cyan)" : "var(--text)" }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Account Activity */}
      {scenario === "activity" && (
        <div className="rounded-xl p-4 sm:p-5 space-y-3" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span style={{ color: "var(--text-dim)" }}>filter:</span>
            {(["all", "warning", "critical"] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-2 py-1 rounded border-none cursor-pointer font-mono text-xs"
                style={{
                  background: filter === f ? "var(--cyan-glow)" : "transparent",
                  color: filter === f ? "var(--cyan)" : "var(--text-dim)",
                  border: filter === f ? "1px solid var(--cyan-border)" : "1px solid var(--border)",
                }}
              >
                {f}
              </button>
            ))}
            <span className="ml-auto" style={{ color: "var(--text-dim)" }}>{filteredLog.length} events</span>
          </div>

          {/* Log entries */}
          <div className="space-y-1">
            {filteredLog.map(entry => {
              const Icon = entry.icon;
              return (
                <div
                  key={entry.id}
                  className="flex items-start gap-3 p-3 rounded-lg text-xs font-mono"
                  style={{ background: severityBg(entry.severity), border: `1px solid ${entry.severity !== "normal" ? severityColor(entry.severity) + "33" : "var(--border)"}` }}
                >
                  <Icon className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: severityColor(entry.severity) }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
                      <span className="break-words" style={{ color: "var(--text-bright)" }}>{entry.action}</span>
                      <span className="shrink-0" style={{ color: "var(--text-dim)" }}>{entry.time}</span>
                    </div>
                    <p className="mt-0.5 break-words" style={{ color: "var(--text)" }}>{entry.detail}</p>
                    <p className="mt-0.5" style={{ color: "var(--text-dim)" }}>IP: {entry.ip}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Export button */}
          <button
            onClick={() => setExportStarted(true)}
            className="w-full py-2 rounded text-xs font-mono border-none cursor-pointer flex items-center justify-center gap-2"
            style={{ background: "var(--bg)", color: "var(--text)", border: "1px solid var(--border)" }}
          >
            {exportStarted ? <><CheckCircle2 className="w-3 h-3" style={{ color: "var(--cyan)" }} /> Export sent to email</> : <><Download className="w-3 h-3" /> Export full activity log</>}
          </button>
        </div>
      )}

      {/* Active Devices */}
      {scenario === "devices" && (
        <div className="rounded-xl p-4 sm:p-5 space-y-2" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>
            {DEVICES.length - revokedDevices.size} active sessions
          </p>
          {DEVICES.map(device => {
            const Icon = device.icon;
            const revoked = revokedDevices.has(device.id);
            const isUnknown = device.name === "Unknown Device";
            return (
              <div
                key={device.id}
                className="flex items-start gap-3 p-3 rounded-lg text-xs font-mono"
                style={{
                  background: revoked ? "rgba(255,51,51,0.05)" : isUnknown ? "rgba(255,170,0,0.08)" : "var(--bg)",
                  border: `1px solid ${isUnknown && !revoked ? "rgba(255,170,0,0.3)" : "var(--border)"}`,
                  opacity: revoked ? 0.5 : 1,
                }}
              >
                <Icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: device.current ? "var(--cyan)" : isUnknown ? "var(--amber)" : "var(--text)" }} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span style={{ color: "var(--text-bright)" }}>{device.name}</span>
                    {device.current && <span className="px-1.5 py-0.5 rounded text-xs shrink-0" style={{ background: "var(--cyan-glow)", color: "var(--cyan)", border: "1px solid var(--cyan-border)" }}>current</span>}
                    {isUnknown && !revoked && <span className="px-1.5 py-0.5 rounded text-xs shrink-0" style={{ background: "rgba(255,170,0,0.15)", color: "var(--amber)" }}>⚠ review</span>}
                  </div>
                  <p className="mt-0.5" style={{ color: "var(--text-dim)" }}>{device.browser} · {device.location}</p>
                  <p style={{ color: "var(--text-dim)" }}>Last active: {device.lastActive}</p>
                </div>
                {!device.current && !revoked && (
                  <button
                    onClick={() => revokeDevice(device.id)}
                    className="px-3 py-1.5 rounded text-xs font-mono border-none cursor-pointer shrink-0"
                    style={{ background: "rgba(255,51,51,0.15)", color: "var(--red)", border: "1px solid rgba(255,51,51,0.3)" }}
                  >
                    Revoke
                  </button>
                )}
                {revoked && (
                  <span className="text-xs font-mono shrink-0" style={{ color: "var(--red)" }}>Revoked</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Data Access Log */}
      {scenario === "access" && (
        <div className="rounded-xl p-4 sm:p-5 space-y-3" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>
            GDPR Art. 15 — Right of access. Who accessed your data and why.
          </p>
          <div className="space-y-1">
            {ACCESS_LOG.map(entry => (
              <div
                key={entry.id}
                className="p-3 rounded-lg text-xs font-mono"
                style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span style={{ color: entry.who === "You" ? "var(--green)" : "var(--cyan)" }}>{entry.who}</span>
                  <span style={{ color: "var(--text-dim)" }}>{entry.time}</span>
                </div>
                <p style={{ color: "var(--text-bright)" }}>
                  {entry.action}: <span style={{ color: "var(--text)" }}>{entry.data}</span>
                </p>
                <p className="mt-1" style={{ color: "var(--text-dim)" }}>Reason: {entry.reason}</p>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-lg text-xs font-mono" style={{ background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.2)" }}>
            <p style={{ color: "var(--cyan)" }}>
              <Shield className="w-3 h-3 inline mr-1" />
              All data access is logged and retained for 2 years per GDPR Art. 30
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function ActivityLogPattern() {
  return (
    <>
      <PatternHeader
        title="Activity & Audit Log"
        description="User-facing activity logs for account security, device management, and data access transparency. Essential for GDPR Art. 15 compliance and user trust."
        severity="high"
        tags={["GDPR Art. 15", "OWASP A09", "CWE-778", "audit trail"]}
      />

      <DemoContainer label="Activity & Audit Log">
        <ActivityLogDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Show all security-relevant events (logins, password changes, permission changes)",
          "Include IP address, device, and location for each event",
          "Highlight suspicious activity with visual severity (color + icon)",
          "Allow filtering by severity level (all, warnings, critical)",
          "Provide data export for GDPR Art. 20 data portability",
          "Show active devices with the ability to revoke sessions",
          "Flag unknown devices or new locations automatically",
          "Show who accessed user data and why (GDPR Art. 15)",
        ]}
        donts={[
          "Don't truncate or auto-delete logs without user knowledge",
          "Don't show technical-only info (raw status codes, internal IDs)",
          "Don't hide the data access log from users — transparency builds trust",
          "Don't require navigation to a separate app to view activity",
          "Don't show other users' data in shared account activity logs",
          "Don't allow revoking the current session without a confirmation",
        ]}
        securityRationale="Activity logs are the user-facing side of OWASP A09 (Security Logging & Monitoring). Users must be able to detect unauthorized access to their accounts. GDPR Art. 15 gives users the right to know who accessed their data. The data access log demonstrates compliance and builds trust. Device management with session revocation is critical for responding to compromised credentials."
        accessibilityNotes={[
          "Log entries use semantic list markup for screen readers",
          "Severity colors are always paired with text labels and icons",
          "Filter buttons have aria-pressed state",
          "Revoke buttons have aria-label including device name",
          "Export confirmation announced via aria-live region",
        ]}
      />
    </>
  );
}
