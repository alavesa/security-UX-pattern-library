import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Fingerprint, Smartphone, Shield, CheckCircle2, Loader2, Key, Monitor, AlertTriangle } from "lucide-react";

function PasskeysDemo() {
  const [scenario, setScenario] = useState<"register" | "login" | "manage">("register");
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const simulateAuth = (nextStep: number) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(nextStep);
    }, 1500);
  };

  const reset = () => {
    setStep(0);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {(["register", "login", "manage"] as const).map(s => (
          <button key={s} onClick={() => { setScenario(s); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: scenario === s ? "var(--green-glow)" : "transparent", color: scenario === s ? "var(--green)" : "var(--text)" }}>
            {s === "register" ? "Create Passkey" : s === "login" ? "Sign In" : "Manage Keys"}
          </button>
        ))}
      </div>

      {/* Register passkey */}
      {scenario === "register" && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {step === 0 && (
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Key className="w-7 h-7 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Create a passkey</h2>
              <p className="text-sm text-gray-500 mb-2">Sign in faster and more securely — no password needed.</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-left mb-6">
                <h4 className="text-xs font-semibold text-blue-800 mb-2">What is a passkey?</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>Uses your fingerprint, face, or screen lock instead of a password</li>
                  <li>Can't be phished — the key never leaves your device</li>
                  <li>Syncs across your devices via iCloud/Google</li>
                </ul>
              </div>
              <button onClick={() => simulateAuth(1)} disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-sm border-none cursor-pointer hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</> : <><Fingerprint className="w-4 h-4" /> Create passkey</>}
              </button>
              <button className="w-full mt-2 text-sm text-gray-500 bg-transparent border-none cursor-pointer py-2">
                Maybe later
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="text-center">
              <div className="border-2 border-blue-200 rounded-2xl p-6 mb-4 bg-blue-50/50">
                <Fingerprint className="w-16 h-16 text-blue-500 mx-auto mb-3" style={{ animation: "pulse 2s infinite" }} />
                <p className="text-sm font-medium text-gray-900">Verify your identity</p>
                <p className="text-xs text-gray-500 mt-1">Use Touch ID, Face ID, or your screen lock</p>
              </div>
              <button onClick={() => simulateAuth(2)} disabled={loading} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm border-none cursor-pointer flex items-center justify-center gap-2">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</> : "Simulate biometric verification"}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Passkey created!</h2>
              <p className="text-sm text-gray-500 mb-4">You can now sign in with your fingerprint or face.</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Device</span>
                  <span className="text-gray-900">MacBook Pro</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Method</span>
                  <span className="text-gray-900">Touch ID</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Synced to</span>
                  <span className="text-gray-900">iCloud Keychain</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Phishing protection</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-left mt-4">
                <p className="text-xs text-green-800"><strong>Security upgrade:</strong> Passkeys are phishing-resistant by design. Unlike passwords, the private key never leaves your device and is bound to this specific website — it can't be tricked into working on a fake site.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Login with passkey */}
      {scenario === "login" && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {step === 0 && (
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Welcome back</h2>
              <p className="text-sm text-gray-500 mb-6">Sign in with your passkey</p>

              <button onClick={() => simulateAuth(1)} disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-sm border-none cursor-pointer hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 mb-3">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Authenticating...</> : <><Fingerprint className="w-5 h-5" /> Sign in with passkey</>}
              </button>

              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <button className="w-full border border-gray-300 text-gray-600 py-2.5 rounded-lg text-sm bg-white cursor-pointer hover:bg-gray-50">
                Use password instead
              </button>

              <p className="text-xs text-gray-400 mt-4">Passkey is the default — password is the fallback. Not the other way around.</p>
            </div>
          )}

          {step === 1 && (
            <div className="text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Signed in!</h2>
              <p className="text-sm text-gray-500 mb-4">Authenticated via Touch ID in 0.8 seconds.</p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-left text-xs text-green-800 space-y-1">
                <p><strong>No password entered</strong> — nothing to phish</p>
                <p><strong>No SMS code</strong> — nothing to intercept</p>
                <p><strong>Device-bound key</strong> — can't be stolen remotely</p>
                <p><strong>Domain-locked</strong> — won't work on lookalike sites</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Manage passkeys */}
      {scenario === "manage" && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Your passkeys</h2>
          <p className="text-sm text-gray-500 mb-4">Devices registered for passwordless sign-in.</p>

          <div className="space-y-3 mb-4">
            {[
              { device: "MacBook Pro", method: "Touch ID", synced: "iCloud Keychain", created: "Mar 15, 2026", icon: Monitor, active: true },
              { device: "iPhone 16", method: "Face ID", synced: "iCloud Keychain", created: "Mar 15, 2026", icon: Smartphone, active: true },
              { device: "Windows PC (work)", method: "Windows Hello", synced: "Not synced", created: "Mar 18, 2026", icon: Monitor, active: true },
            ].map(({ device, method, synced, created, icon: Icon, active }) => (
              <div key={device} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                <Icon className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{device}</p>
                    <span className="text-xs text-green-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Active</span>
                  </div>
                  <p className="text-xs text-gray-500">{method} · {synced} · Created {created}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
            <p className="text-xs text-amber-800 flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span><strong>Keep a backup method:</strong> If you lose all devices with passkeys, you'll need your password or recovery codes. Don't disable password login until you have passkeys on multiple devices.</span>
            </p>
          </div>

          <button className="w-full border border-blue-300 text-blue-700 py-2.5 rounded-lg text-sm font-medium bg-blue-50 cursor-pointer hover:bg-blue-100 flex items-center justify-center gap-2">
            <Key className="w-4 h-4" /> Add passkey on another device
          </button>
        </div>
      )}

      <button onClick={reset} className="mt-4 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer" style={{ color: "var(--text)" }}>Reset demo</button>
    </div>
  );
}

export function PasskeysPattern() {
  return (
    <div>
      <PatternHeader
        title="Passkeys / WebAuthn"
        description="The future of authentication — passwordless sign-in using biometrics. Phishing-resistant by design. Covers passkey creation, sign-in flow, and key management across devices."
        severity="critical"
        tags={["Authentication", "WebAuthn", "FIDO2", "Phishing-Resistant"]}
      />

      <DemoContainer label="passkeys (3 variants)">
        <PasskeysDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Make passkey the PRIMARY sign-in option — bigger button, top of the page",
          "Explain what a passkey is in simple terms before asking users to create one",
          "Show which devices have passkeys and their sync status",
          "Warn users to keep a backup method until they have passkeys on multiple devices",
          "Show the security benefits after creation — phishing resistance, no password to steal",
          "Support cross-device authentication (QR code from phone to desktop)",
          "Let users name their passkeys for identification ('Work laptop', 'Phone')",
          "Provide a 'Use password instead' fallback — don't force passkeys on everyone",
        ]}
        donts={[
          "Don't hide passkeys behind settings — promote them during login and account setup",
          "Don't require a password after passkey auth — that defeats the purpose",
          "Don't auto-delete passkeys without user confirmation",
          "Don't call them 'security keys' or 'FIDO2 credentials' — use 'passkeys' (the standard term)",
          "Don't force users to create a passkey — offer it as an upgrade path",
          "Don't remove password login before the user has passkeys on multiple devices",
          "Don't show technical errors ('PublicKeyCredential failed') — show human-readable messages",
        ]}
        securityRationale="Passkeys (WebAuthn/FIDO2) are phishing-resistant by design: the private key never leaves the device and is bound to the specific origin (domain). Even if a user visits a perfect phishing site, the passkey won't work because the domain doesn't match. Google reported a 50% reduction in sign-in time and near-zero account takeover for passkey users. Apple, Google, and Microsoft all support passkey sync across devices. The UX challenge: users don't understand public key cryptography — they understand 'use your fingerprint instead of a password.' Lead with the benefit."
        accessibilityNotes={[
          "Passkey creation must explain the concept before requiring biometric input",
          "Biometric prompts should have a fallback (PIN, pattern) for users who can't use biometrics",
          "Device list must be screen reader navigable with clear labels",
          "Loading states during authentication show both spinner and text",
          "The 'Use password instead' fallback ensures no one is locked out",
        ]}
      />
    </div>
  );
}
