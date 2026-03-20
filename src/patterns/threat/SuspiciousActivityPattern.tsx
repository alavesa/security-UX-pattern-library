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
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Suspicious sign-in attempt</h2>
              <p className="text-sm text-gray-500">Someone tried to access your account from an unusual location.</p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-red-400">Location</span>
                <p className="text-red-800 font-medium flex items-center gap-1"><MapPin className="w-3 h-3" /> Moscow, Russia</p>
              </div>
              <div>
                <span className="text-red-400">Device</span>
                <p className="text-red-800 font-medium flex items-center gap-1"><Monitor className="w-3 h-3" /> Unknown browser</p>
              </div>
              <div>
                <span className="text-red-400">Time</span>
                <p className="text-red-800 font-medium">5 hours ago</p>
              </div>
              <div>
                <span className="text-red-400">IP Address</span>
                <p className="text-red-800 font-mono font-medium">95.173.xxx.xxx</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
            <p className="text-xs text-amber-800">
              <strong>Why this looks suspicious:</strong> This location is 2,400 km from your usual sign-in location (Helsinki, FI). The device and browser don't match any of your known devices.
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setSecured(true)}
              className="w-full bg-red-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-red-700 transition-colors border-none cursor-pointer flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" /> This wasn't me — secure my account
            </button>
            <button
              onClick={() => setSecured(true)}
              className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors bg-white cursor-pointer"
            >
              Yes, this was me
            </button>
          </div>
        </div>
      )}

      {scenario === "alert" && secured && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 text-center">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-7 h-7 text-green-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Account secured</h2>
          <div className="text-sm text-gray-600 space-y-1 text-left bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Suspicious session terminated</p>
            <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> All other sessions signed out</p>
            <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Password reset required on next login</p>
            <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Security team notified</p>
          </div>
          <p className="text-xs text-gray-400">You'll receive an email confirming these actions.</p>
        </div>
      )}

      {/* Active sessions */}
      {scenario === "sessions" && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Active sessions</h2>
          <p className="text-sm text-gray-500 mb-4">Devices currently signed into your account.</p>

          <div className="space-y-3">
            {ACTIVITIES.filter(a => a.type === "login").map(activity => (
              <div
                key={activity.id}
                className={`border rounded-lg p-4 ${
                  revokedSessions.has(activity.id)
                    ? "border-gray-200 opacity-50"
                    : activity.suspicious
                    ? "border-red-200 bg-red-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.suspicious ? "bg-red-100" : "bg-gray-100"}`}>
                      {activity.device.includes("iPhone") ? <Smartphone className="w-4 h-4 text-gray-600" /> : <Monitor className="w-4 h-4 text-gray-600" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        {activity.device}
                        {activity.current && <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Current</span>}
                        {activity.suspicious && <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">Suspicious</span>}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {activity.location} • {activity.time}
                      </p>
                      <p className="text-xs text-gray-400 font-mono">{activity.ip}</p>
                    </div>
                  </div>
                  {!activity.current && !revokedSessions.has(activity.id) && (
                    <button
                      onClick={() => setRevokedSessions(s => new Set([...s, activity.id]))}
                      className="text-xs text-red-600 hover:text-red-800 bg-transparent border-none cursor-pointer"
                    >
                      Revoke
                    </button>
                  )}
                  {revokedSessions.has(activity.id) && (
                    <span className="text-xs text-gray-400">Revoked</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 border border-red-200 text-red-600 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors bg-white cursor-pointer">
            Sign out all other sessions
          </button>
        </div>
      )}

      {/* New device approval */}
      {scenario === "newdevice" && deviceApproved === null && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">New device sign-in</h2>
              <p className="text-sm text-gray-500">Confirm this sign-in from a new device.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-blue-400">Device</span>
                <p className="text-blue-800 font-medium">Safari on iPad</p>
              </div>
              <div>
                <span className="text-blue-400">Location</span>
                <p className="text-blue-800 font-medium">Helsinki, Finland</p>
              </div>
              <div>
                <span className="text-blue-400">Time</span>
                <p className="text-blue-800 font-medium">Just now</p>
              </div>
              <div>
                <span className="text-blue-400">Near</span>
                <p className="text-blue-800 font-medium">Your usual location</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setDeviceApproved(true)}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors border-none cursor-pointer"
            >
              Yes, approve this device
            </button>
            <button
              onClick={() => setDeviceApproved(false)}
              className="w-full border border-red-200 text-red-600 py-2.5 rounded-lg font-medium text-sm hover:bg-red-50 transition-colors bg-white cursor-pointer"
            >
              No, block this device
            </button>
          </div>
        </div>
      )}

      {scenario === "newdevice" && deviceApproved !== null && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 text-center">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${deviceApproved ? "bg-green-100" : "bg-red-100"}`}>
            {deviceApproved ? <CheckCircle2 className="w-7 h-7 text-green-600" /> : <XCircle className="w-7 h-7 text-red-600" />}
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">{deviceApproved ? "Device approved" : "Device blocked"}</h2>
          <p className="text-sm text-gray-500">
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
