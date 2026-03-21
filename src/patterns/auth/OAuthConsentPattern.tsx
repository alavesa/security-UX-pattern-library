import { useState, useMemo } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Shield, ShieldOff, CheckCircle2, XCircle, ExternalLink, AlertTriangle, Eye } from "lucide-react";

const REQUIRED_PERMISSIONS = ['profile', 'email'] as const;

function OAuthConsentDemo() {
  const [view, setView] = useState<"dark" | "ethical">("dark");
  const [darkChoice, setDarkChoice] = useState<string | null>(null);
  const [optionalPermissions, setOptionalPermissions] = useState({ repos: false, gists: false });
  const [ethicalChoice, setEthicalChoice] = useState<string | null>(null);

  const reset = () => {
    setDarkChoice(null);
    setEthicalChoice(null);
    setOptionalPermissions({ repos: false, gists: false });
  };

  const grantedCount = useMemo(() => REQUIRED_PERMISSIONS.length + Object.values(optionalPermissions).filter(Boolean).length, [optionalPermissions]);

  return (
    <div className="w-full max-w-md">
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <button onClick={() => { setView("dark"); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: view === "dark" ? "rgba(255,51,51,0.15)" : "transparent", color: view === "dark" ? "var(--red)" : "var(--text)" }}>
          <ShieldOff className="w-3.5 h-3.5 inline mr-1" /> Over-Permissioned
        </button>
        <button onClick={() => { setView("ethical"); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: view === "ethical" ? "var(--green-glow)" : "transparent", color: view === "ethical" ? "var(--green)" : "var(--text)" }}>
          <Shield className="w-3.5 h-3.5 inline mr-1" /> Least Privilege
        </button>
      </div>

      {/* Dark: over-permissioned */}
      {view === "dark" && darkChoice === null && (
        <div className="rounded-2xl border-2 p-6">
          <div className="text-right mb-2">
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded font-mono">OVER-PERMISSIONED</span>
          </div>

          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📊</span>
            </div>
            <h2 className="text-lg font-bold">Analytics Pro</h2>
            <p className="text-xs">wants to access your GitHub account</p>
          </div>

          <div className="border rounded-lg p-4 mb-4">
            <h3 className="text-sm font-semibold mb-3">This app will be able to:</h3>
            <div className="space-y-2">
              {[
                { label: "Read your profile information", icon: "👤", risky: false },
                { label: "Read your email addresses", icon: "📧", risky: false },
                { label: "Read and write all repositories", icon: "📁", risky: true },
                { label: "Read and write gists", icon: "📝", risky: true },
                { label: "Manage your organizations", icon: "🏢", risky: true },
                { label: "Delete repositories", icon: "🗑️", risky: true },
                { label: "Manage deploy keys", icon: "🔑", risky: true },
                { label: "Manage webhooks", icon: "🔗", risky: true },
              ].map(({ label, icon, risky }) => (
                <div key={label} className="flex items-center gap-2 text-sm">
                  <span aria-hidden="true">{icon}</span>
                  <span className={risky ? "" : ""}>{label}</span>
                  {risky && <span className="text-xs px-1 rounded ml-auto">excessive</span>}
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => setDarkChoice("authorized")} className="w-full text-white py-2.5 rounded-lg font-medium text-sm border-none cursor-pointer">
            Authorize Analytics Pro
          </button>
          <button onClick={() => setDarkChoice("denied")} className="w-full mt-2 text-sm bg-transparent border-none cursor-pointer py-2">
            Cancel
          </button>
        </div>
      )}

      {view === "dark" && darkChoice !== null && (
        <div className="rounded-2xl border-2 p-6">
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-2">What's wrong:</h3>
            <ul className="text-xs space-y-1.5">
              <li><strong>8 permissions</strong> — an analytics app only needs profile + repos (read-only)</li>
              <li><strong>"Delete repositories"</strong> — why would an analytics tool need this?</li>
              <li><strong>"Manage organizations"</strong> — far beyond what's needed</li>
              <li><strong>All-or-nothing</strong> — user can't deselect individual permissions</li>
              <li><strong>No explanation</strong> — doesn't say WHY each permission is needed</li>
              <li><strong>"Authorize" is green</strong> — implies safety when granting dangerous permissions</li>
              <li>This violates the <strong>principle of least privilege</strong> — request only what's needed</li>
            </ul>
          </div>
        </div>
      )}

      {/* Ethical: least privilege with granular control */}
      {view === "ethical" && ethicalChoice === null && (
        <div className="rounded-2xl border-2 p-6">
          <div className="text-right mb-2">
            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded font-mono">LEAST PRIVILEGE</span>
          </div>

          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📊</span>
            </div>
            <h2 className="text-lg font-bold">Analytics Pro</h2>
            <p className="text-xs">wants to access your GitHub account</p>
          </div>

          <div className="border rounded-lg p-4 mb-4">
            <h3 id="perm-group-label" className="text-sm font-semibold mb-1">Permissions requested</h3>
            <p className="text-xs mb-3">Required permissions can't be deselected. Optional ones are your choice.</p>

            <div role="group" aria-labelledby="perm-group-label" className="space-y-3">
              {[
                { key: "profile" as const, label: "Read your profile", why: "To display your name in dashboards", required: true },
                { key: "email" as const, label: "Read your email", why: "To send weekly reports", required: true },
                { key: "repos" as const, label: "Read repositories (read-only)", why: "To analyze code frequency and languages", required: false },
                { key: "gists" as const, label: "Read gists (read-only)", why: "To include gist activity in reports", required: false },
              ].map(({ key, label, why, required }) => (
                <div key={key} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {required ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <input
                        type="checkbox"
                        id={`perm-${key}`}
                        aria-label={label}
                        aria-describedby={`perm-desc-${key}`}
                        checked={optionalPermissions[key as keyof typeof optionalPermissions]}
                        onChange={e => setOptionalPermissions(p => ({ ...p, [key]: e.target.checked }))}
                        className="w-4 h-4 rounded"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{label}</span>
                      {required && <span className="text-xs px-1.5 py-0.5 rounded">Required</span>}
                      {!required && <span className="text-xs px-1.5 py-0.5 rounded">Optional</span>}
                    </div>
                    <p id={`perm-desc-${key}`} className="text-xs mt-0.5">{why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border rounded-lg p-3 mb-4 flex items-start gap-2">
            <Eye className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <p className="text-xs">
              Analytics Pro will have <strong>read-only</strong> access. It cannot modify, delete, or create content. You can revoke access anytime in Settings → Applications.
            </p>
          </div>

          <button
            onClick={() => setEthicalChoice("authorized")}
            className="w-full text-white py-2.5 rounded-lg font-medium text-sm border-none cursor-pointer"
          >
            Authorize with {grantedCount} permissions
          </button>
          <button onClick={() => setEthicalChoice("denied")} className="w-full mt-2 border py-2 rounded-lg text-sm cursor-pointer hover:">
            Deny access
          </button>
        </div>
      )}

      {view === "ethical" && ethicalChoice !== null && (
        <div className="rounded-2xl border-2 p-6">
          {ethicalChoice === "authorized" ? (
            <>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold">Access granted</span>
              </div>
              <p className="text-sm mb-3">Analytics Pro can now access {grantedCount} items.</p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5" />
                <span className="font-semibold">Access denied</span>
              </div>
              <p className="text-sm mb-3">No data was shared with Analytics Pro.</p>
            </>
          )}
          <div className="border rounded-lg p-4">
            <h4 className="text-xs font-semibold mb-2">What's right:</h4>
            <ul className="text-xs space-y-1.5">
              <li><strong>Only 4 permissions</strong> — minimum needed for the app to function</li>
              <li><strong>Read-only</strong> — explicitly stated, no write/delete access</li>
              <li><strong>Required vs optional</strong> — user controls optional permissions</li>
              <li><strong>Each permission explained</strong> — says WHY it's needed</li>
              <li><strong>Revocation info shown upfront</strong> — user knows they can undo this</li>
              <li><strong>Button shows count</strong> — "Authorize with 3 permissions" is informed consent</li>
              <li><strong>Deny is equally visible</strong> — not hidden or guilt-tripping</li>
            </ul>
          </div>
        </div>
      )}

      <button onClick={() => { reset(); setView("dark"); }} className="mt-4 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer" style={{ color: "var(--text)" }}>Reset demo</button>
    </div>
  );
}

export function OAuthConsentPattern() {
  return (
    <div>
      <PatternHeader
        title="OAuth Consent Screen"
        description="When a third-party app asks 'Allow access to your account?' — the consent screen is the last line of defense. Compare an over-permissioned request with the least-privilege approach."
        severity="high"
        tags={["Authentication", "OAuth 2.0", "Least Privilege", "CWE-250"]}
      />

      <DemoContainer label="OAuth consent (over-permissioned vs least privilege)">
        <OAuthConsentDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Request only the minimum permissions needed — principle of least privilege (CWE-250)",
          "Separate required and optional permissions — let users deselect optional ones",
          "Explain WHY each permission is needed in plain language",
          "Show read-only vs read-write explicitly — 'Read repositories' not 'Access repositories'",
          "Show how to revoke access before the user authorizes",
          "Update the button text to reflect the actual permissions being granted",
          "Make 'Deny' equally prominent as 'Authorize'",
          "Show the app's verified status and when it was created",
        ]}
        donts={[
          "Don't request permissions you don't need — 'Delete repositories' for an analytics tool is a red flag",
          "Don't bundle unrelated permissions — request them separately as features need them",
          "Don't use all-or-nothing consent — let users control granular permissions",
          "Don't hide dangerous permissions in a long list — highlight elevated access",
          "Don't use 'Authorize' with a green button for over-permissioned requests — green implies safe",
          "Don't request write access when read-only is sufficient",
          "Don't auto-expand permissions on re-authorization — ask again for new scopes",
          "Don't make denial harder than authorization",
        ]}
        securityRationale="OAuth consent screens are the primary defense against third-party app abuse. CWE-250 (Execution with Unnecessary Privileges) is the underlying issue. The 2024 GitHub OAuth attack exploited over-permissioned tokens to steal code from thousands of repositories. The UX insight: users click 'Authorize' without reading the permission list — especially on mobile. Making the list short (least privilege), separating required from optional, and explaining each permission in plain language makes informed consent possible."
        accessibilityNotes={[
          "Permission checkboxes must be keyboard accessible",
          "Required vs optional is conveyed with both text labels and visual treatment",
          "'Deny' button must have equal keyboard focus order to 'Authorize'",
          "Permission descriptions must be associated with their checkboxes (aria-describedby)",
          "The app identity (name, icon) must be readable before the permission list",
        ]}
      />
    </div>
  );
}
