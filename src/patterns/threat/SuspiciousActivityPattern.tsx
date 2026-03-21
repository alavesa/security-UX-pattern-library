import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { AlertTriangle, MapPin, Monitor, Smartphone, CheckCircle2, XCircle, Shield } from "lucide-react";

const ACTIVITIES = [
  { id: 1, type: "login", device: "Chrome on Windows", location: "Helsinki, FI", time: "2 min ago", ip: "85.130.xxx.xxx", current: true, suspicious: false },
  { id: 2, type: "login", device: "Safari on iPhone", location: "Helsinki, FI", time: "1 hour ago", ip: "85.130.xxx.xxx", current: false, suspicious: false },
  { id: 3, type: "login", device: "Firefox on Linux", location: "Lagos, NG", time: "3 hours ago", ip: "197.210.xxx.xxx", current: false, suspicious: true },
  { id: 4, type: "password_change", device: "Unknown browser", location: "Moscow, RU", time: "5 hours ago", ip: "95.173.xxx.xxx", current: false, suspicious: true },
];

function SuspiciousActivityDemo() {
  const [scenario, setScenario] = useState<"alert" | "sessions" | "newdevice">("alert");
  const [secured, setSecured] = useState(false);
  const [revokedSessions, setRevokedSessions] = useState<Set<number>>(new Set());
  const [deviceApproved, setDeviceApproved] = useState<boolean | null>(null);

  const reset = () => {
    setSecured(false);
    setRevokedSessions(new Set());
    setDeviceApproved(null);
  };

  return (
    <div className="w-full max-w-lg">
      {/* Scenario toggle */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {(["alert", "sessions", "newdevice"] as const).map(s => (
          <button
            key={s}
            onClick={() => { setScenario(s); reset(); }}
            className={`flex-1 text-xs py-2 rounded-md font-mono transition-colors border-none cursor-pointer ${scenario === s ? "font-medium" : ""}`}
            style={{
              background: scenario === s ? "var(--green-glow)" : "transparent",
              color: scenario === s ? "var(--green)" : "var(--text)",
            }}
          >
            {s === "alert" ? "Security Alert" : s === "sessions" ? "Active Sessions" : "New Device"}
          </button>
        ))}
      </div>

      {/* Security alert */}
      {scenario === "alert" && !secured && (
        <div className="rounded-2xl p-4 sm:p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(255,51,51,0.15)" }}>
              <AlertTriangle className="w-5 h-5" style={{ color: "var(--red)" }} />
            </div>
            <div>
              <h2 className="text-lg font-bold font-mono" style={{ color: "var(--text-bright)" }}>Suspicious sign-in attempt</h2>
              <p className="text-sm font-mono" style={{ color: "var(--text)" }}>Someone tried to access your account from an unusual location.</p>
            </div>
          </div>

          <div className="rounded-lg p-4 mb-4" style={{ background: "rgba(255,51,51,0.08)", border: "1px solid rgba(255,51,51,0.2)" }}>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <span style={{ color: "var(--text-dim)" }}>Location</span>
                <p className="font-medium flex items-center gap-1" style={{ color: "var(--red)" }}><MapPin className="w-3 h-3" /> Moscow, Russia</p>
              </div>
              <div>
                <span style={{ color: "var(--text-dim)" }}>Device</span>
                <p className="font-medium flex items-center gap-1" style={{ color: "var(--red)" }}><Monitor className="w-3 h-3" /> Unknown browser</p>
              </div>
              <div>
                <span style={{ color: "var(--text-dim)" }}>Time</span>
                <p className="font-medium" style={{ color: "var(--red)" }}>5 hours ago</p>
              </div>
              <div>
                <span style={{ color: "var(--text-dim)" }}>IP Address</span>
                <p className="font-mono font-medium" style={{ color: "var(--red)" }}>95.173.xxx.xxx</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-3 mb-4" style={{ background: "rgba(255,170,0,0.08)", border: "1px solid rgba(255,170,0,0.2)" }}>
            <p className="text-xs font-mono" style={{ color: "var(--amber)" }}>
              <strong>Why this looks suspicious:</strong> This location is 2,400 km from your usual sign-in location (Helsinki, FI). The device and browser don't match any of your known devices.
            </p>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setSecured(true)}
              className="w-full py-2.5 rounded-lg font-medium font-mono text-sm border-none cursor-pointer flex items-center justify-center gap-2"
              style={{ background: "var(--red)", color: "white" }}
            >
              <Shield className="w-4 h-4 shrink-0" /> <span>This wasn't me — secure account</span>
            </button>
            <button
              type="button"
              onClick={() => setSecured(true)}
              className="w-full py-2.5 rounded-lg font-medium font-mono text-sm cursor-pointer"
              style={{ background: "transparent", color: "var(--text)", border: "1px solid var(--border)" }}
            >
              Yes, this was me
            </button>
          </div>
        </div>
      )}

      {scenario === "alert" && secured && (
        <div className="rounded-2xl p-4 sm:p-6 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(0,255,65,0.15)" }}>
            <CheckCircle2 className="w-7 h-7" style={{ color: "var(--green)" }} />
          </div>
          <h2 className="text-lg font-bold font-mono mb-2" style={{ color: "var(--green)" }}>Account secured</h2>
          <div className="text-sm font-mono space-y-1 text-left rounded-lg p-4 mb-4" style={{ background: "rgba(0,255,65,0.05)", border: "1px solid var(--green-border)", color: "var(--text)" }}>
            <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--green)" }} /> Suspicious session terminated</p>
            <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--green)" }} /> All other sessions signed out</p>
            <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--green)" }} /> Password reset required on next login</p>
            <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--green)" }} /> Security team notified</p>
          </div>
          <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>You'll receive an email confirming these actions.</p>
        </div>
      )}

      {/* Active sessions */}
      {scenario === "sessions" && (
        <div className="rounded-2xl p-4 sm:p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <h2 className="text-lg font-bold font-mono mb-1" style={{ color: "var(--text-bright)" }}>Active sessions</h2>
          <p className="text-sm font-mono mb-4" style={{ color: "var(--text)" }}>Devices currently signed into your account.</p>

          <div className="space-y-3">
            {ACTIVITIES.filter(a => a.type === "login").map(activity => (
              <div
                key={activity.id}
                className="rounded-lg p-3 sm:p-4"
                style={{
                  opacity: revokedSessions.has(activity.id) ? 0.5 : 1,
                  background: activity.suspicious && !revokedSessions.has(activity.id) ? "rgba(255,51,51,0.08)" : "var(--bg)",
                  border: `1px solid ${activity.suspicious && !revokedSessions.has(activity.id) ? "rgba(255,51,51,0.2)" : "var(--border)"}`,
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: activity.suspicious ? "rgba(255,51,51,0.15)" : "var(--bg-elevated)" }}>
                      {activity.device.includes("iPhone") ? <Smartphone className="w-4 h-4" style={{ color: "var(--text)" }} /> : <Monitor className="w-4 h-4" style={{ color: "var(--text)" }} />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium font-mono flex flex-wrap items-center gap-2" style={{ color: "var(--text-bright)" }}>
                        {activity.device}
                        {activity.current && <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(0,255,65,0.15)", color: "var(--green)" }}>Current</span>}
                        {activity.suspicious && <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(255,51,51,0.15)", color: "var(--red)" }}>Suspicious</span>}
                      </p>
                      <p className="text-xs font-mono flex items-center gap-1" style={{ color: "var(--text)" }}>
                        <MapPin className="w-3 h-3 shrink-0" /> {activity.location} · {activity.time}
                      </p>
                      <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>{activity.ip}</p>
                    </div>
                  </div>
                  {!activity.current && !revokedSessions.has(activity.id) && (
                    <button
                      type="button"
                      onClick={() => setRevokedSessions(s => new Set([...s, activity.id]))}
                      className="text-xs font-mono bg-transparent border-none cursor-pointer shrink-0"
                      style={{ color: "var(--red)" }}
                    >
                      Revoke
                    </button>
                  )}
                  {revokedSessions.has(activity.id) && (
                    <span className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>Revoked</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button type="button" className="w-full mt-4 py-2 rounded-lg text-sm font-medium font-mono cursor-pointer border-none" style={{ background: "rgba(255,51,51,0.15)", color: "var(--red)", border: "1px solid rgba(255,51,51,0.3)" }}>
            Sign out all other sessions
          </button>
        </div>
      )}

      {/* New device approval */}
      {scenario === "newdevice" && deviceApproved === null && (
        <div className="rounded-2xl p-4 sm:p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(0,229,255,0.15)" }}>
              <Smartphone className="w-5 h-5" style={{ color: "var(--cyan)" }} />
            </div>
            <div>
              <h2 className="text-lg font-bold font-mono" style={{ color: "var(--text-bright)" }}>New device sign-in</h2>
              <p className="text-sm font-mono" style={{ color: "var(--text)" }}>Confirm this sign-in from a new device.</p>
            </div>
          </div>

          <div className="rounded-lg p-4 mb-4" style={{ background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.2)" }}>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <span style={{ color: "var(--text-dim)" }}>Device</span>
                <p className="font-medium" style={{ color: "var(--cyan)" }}>Safari on iPad</p>
              </div>
              <div>
                <span style={{ color: "var(--text-dim)" }}>Location</span>
                <p className="font-medium" style={{ color: "var(--cyan)" }}>Helsinki, Finland</p>
              </div>
              <div>
                <span style={{ color: "var(--text-dim)" }}>Time</span>
                <p className="font-medium" style={{ color: "var(--cyan)" }}>Just now</p>
              </div>
              <div>
                <span style={{ color: "var(--text-dim)" }}>Near</span>
                <p className="font-medium" style={{ color: "var(--green)" }}>Your usual location</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setDeviceApproved(true)}
              className="w-full py-2.5 rounded-lg font-medium font-mono text-sm border-none cursor-pointer"
              style={{ background: "var(--green)", color: "var(--bg)" }}
            >
              Yes, approve this device
            </button>
            <button
              type="button"
              onClick={() => setDeviceApproved(false)}
              className="w-full py-2.5 rounded-lg font-medium font-mono text-sm cursor-pointer"
              style={{ background: "rgba(255,51,51,0.15)", color: "var(--red)", border: "1px solid rgba(255,51,51,0.3)" }}
            >
              No, block this device
            </button>
          </div>
        </div>
      )}

      {scenario === "newdevice" && deviceApproved !== null && (
        <div className="rounded-2xl p-4 sm:p-6 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: deviceApproved ? "rgba(0,255,65,0.15)" : "rgba(255,51,51,0.15)" }}>
            {deviceApproved ? <CheckCircle2 className="w-7 h-7" style={{ color: "var(--green)" }} /> : <XCircle className="w-7 h-7" style={{ color: "var(--red)" }} />}
          </div>
          <h2 className="text-lg font-bold font-mono mb-1" style={{ color: deviceApproved ? "var(--green)" : "var(--red)" }}>{deviceApproved ? "Device approved" : "Device blocked"}</h2>
          <p className="text-sm font-mono" style={{ color: "var(--text)" }}>
            {deviceApproved
              ? "Safari on iPad is now a trusted device."
              : "The sign-in attempt was blocked and the session was terminated."}
          </p>
        </div>
      )}

      <button onClick={reset} className="mt-4 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer" style={{ color: "var(--text)" }}>
        Reset demo
      </button>
    </div>
  );
}

export function SuspiciousActivityPattern() {
  return (
    <div>
      <PatternHeader
        title="Suspicious Activity"
        description="How to alert users about suspicious account activity — sign-in alerts with geolocation context, active session management, and new device approval flows."
        severity="high"
        tags={["Threat Response", "OWASP A07", "CWE-778"]}
      />

      <DemoContainer label="suspicious activity (3 variants)">
        <SuspiciousActivityDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Show geographic context — where the sign-in happened vs where the user usually signs in",
          "Display device info — browser, OS, device type — so users can recognize their own devices",
          "Partially mask IP addresses for privacy while still being useful for identification",
          "Explain WHY something looks suspicious — distance, unknown device, unusual time",
          "Provide clear binary actions: 'This was me' / 'This wasn't me'",
          "When securing the account: show every action taken (session terminated, password reset required)",
          "Allow users to review and revoke individual sessions",
          "Implement new device approval for high-security accounts",
          "Send confirmation emails for all security actions taken",
        ]}
        donts={[
          "Don't show full IP addresses — partially mask them for privacy",
          "Don't require users to guess which session is suspicious — highlight it for them",
          "Don't make 'This was me' the primary/highlighted action — security-first means 'Secure my account' is primary",
          "Don't send suspicious activity alerts for every login — use risk-based detection to avoid alert fatigue",
          "Don't show only the IP — most users don't understand IP addresses. Show location and device instead",
          "Don't auto-terminate sessions without asking — the user might be on a VPN or traveling",
          "Don't forget to log the user's response for forensic purposes",
        ]}
        securityRationale="Suspicious activity detection is the runtime defense against credential compromise. Even with strong passwords and MFA, accounts get compromised through session hijacking, token theft, and social engineering. Risk-based authentication (CWE-778) compares each sign-in against the user's behavioral profile — location, device, time of day, IP reputation. The UX challenge: alerting on real threats without crying wolf. Each false positive erodes the user's attention to real alerts."
        accessibilityNotes={[
          "Alert uses contrasting colors and icons — not just color",
          "Location data includes both city name and country code",
          "Session list items have clear labels for 'Current' and 'Suspicious'",
          "Revoke buttons have sufficient click targets",
          "Device approval uses clear binary language — 'Yes, approve' / 'No, block'",
          "Confirmation screens list all actions taken so users with screen readers know what happened",
        ]}
      />
    </div>
  );
}
