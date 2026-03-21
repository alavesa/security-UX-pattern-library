import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { ShieldAlert, Lock, Users, Eye, CheckCircle2 } from "lucide-react";

type Role = "viewer" | "editor" | "admin";

const PERMISSIONS: Record<Role, { canView: boolean; canEdit: boolean; canDelete: boolean; canManageUsers: boolean }> = {
  viewer: { canView: true, canEdit: false, canDelete: false, canManageUsers: false },
  editor: { canView: true, canEdit: true, canDelete: false, canManageUsers: false },
  admin: { canView: true, canEdit: true, canDelete: true, canManageUsers: true },
};

function BrokenAccessControlDemo() {
  const [scenario, setScenario] = useState<"rbac" | "idor" | "elevation">("rbac");
  const [currentRole, setCurrentRole] = useState<Role>("viewer");
  const [idorId, setIdorId] = useState("12345");
  const [elevationAttempted, setElevationAttempted] = useState(false);
  const [idorSubmitted, setIdorSubmitted] = useState(false);

  const perms = PERMISSIONS[currentRole];

  const reset = () => {
    setCurrentRole("viewer");
    setIdorId("12345");
    setElevationAttempted(false);
    setIdorSubmitted(false);
  };

  return (
    <div className="w-full max-w-lg">
      {/* Scenario toggle */}
      <div role="tablist" className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {(["rbac", "idor", "elevation"] as const).map(s => (
          <button key={s} role="tab" aria-selected={scenario === s} aria-controls={`panel-${s}`} onClick={() => { setScenario(s); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: scenario === s ? "var(--amber-glow)" : "transparent", color: scenario === s ? "var(--amber)" : "var(--text)" }}>
            {s === "rbac" ? "Role-Based UI" : s === "idor" ? "IDOR Prevention" : "Privilege Escalation"}
          </button>
        ))}
      </div>

      {/* RBAC demo */}
      {scenario === "rbac" && (
        <div role="tabpanel" id="panel-rbac" className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold font-mono text-sm" style={{ color: "var(--text-bright)" }}>Document: Q4 Report</h3>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" style={{ color: "var(--text)" }} />
              <select
                value={currentRole}
                onChange={e => setCurrentRole(e.target.value as Role)}
                className="text-xs font-mono rounded px-2 py-1"
                style={{ background: "var(--bg)", color: "var(--text-bright)", border: "1px solid var(--border)" }}
              >
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Permission indicators */}
          <div className="rounded-lg p-4 mb-4" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
            <p className="text-xs font-medium font-mono mb-3" style={{ color: "var(--text)" }}>Your permissions as <strong style={{ color: "var(--amber)" }}>{currentRole}</strong>:</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "View document", allowed: perms.canView },
                { label: "Edit document", allowed: perms.canEdit },
                { label: "Delete document", allowed: perms.canDelete },
                { label: "Manage users", allowed: perms.canManageUsers },
              ].map(({ label, allowed }) => (
                <div key={label} className="flex items-center gap-2 text-xs font-mono">
                  {allowed
                    ? <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "var(--green)" }} />
                    : <Lock className="w-3.5 h-3.5" style={{ color: "var(--text-dim)" }} />
                  }
                  <span style={{ color: allowed ? "var(--green)" : "var(--text-dim)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2">
            <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium font-mono border-none cursor-pointer" style={{ background: "var(--amber)", color: "var(--bg)" }}>
              <Eye className="w-4 h-4" /> View Document
            </button>
            <button
              aria-disabled={!perms.canEdit}
              aria-label={!perms.canEdit ? 'Edit Document — requires Editor role or above' : undefined}
              onClick={e => { if (!perms.canEdit) { e.preventDefault(); return; } }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium font-mono cursor-pointer aria-disabled:opacity-40 aria-disabled:cursor-not-allowed"
              style={{ background: "transparent", color: perms.canEdit ? "var(--text-bright)" : "var(--text-dim)", border: "1px solid var(--border)" }}
            >
              Edit Document {!perms.canEdit && <Lock className="w-3 h-3" />}
            </button>
            <button
              aria-disabled={!perms.canDelete}
              aria-label={!perms.canDelete ? 'Delete Document — requires Admin role' : undefined}
              onClick={e => { if (!perms.canDelete) { e.preventDefault(); return; } }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium font-mono cursor-pointer aria-disabled:opacity-40 aria-disabled:cursor-not-allowed"
              style={{ background: "transparent", color: perms.canDelete ? "var(--red)" : "var(--text-dim)", border: "1px solid var(--border)" }}
            >
              Delete Document {!perms.canDelete && <Lock className="w-3 h-3" />}
            </button>
          </div>

          <div className="rounded-lg p-3 mt-4 text-xs font-mono" style={{ background: "var(--amber-glow)", border: "1px solid var(--amber-border)", color: "var(--amber)" }}>
            <strong>Pattern:</strong> <span style={{ color: "var(--text)" }}>Disabled buttons with lock icons show what exists but isn't allowed. Users understand the system's capabilities without being able to misuse them. Switch roles to see how the UI adapts.</span>
          </div>
        </div>
      )}

      {/* IDOR prevention */}
      {scenario === "idor" && (
        <div role="tabpanel" id="panel-idor" className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <h3 className="font-bold font-mono text-sm mb-4" style={{ color: "var(--text-bright)" }}>Access user profile</h3>

          <div className="mb-4">
            <label className="block text-xs font-medium font-mono mb-1" style={{ color: "var(--text-bright)" }}>User ID</label>
            <div className="flex gap-2">
              <input
                value={idorId}
                onChange={e => { setIdorId(e.target.value); setIdorSubmitted(false); }}
                className="flex-1 px-3 py-2 rounded-lg text-sm font-mono"
                placeholder="Enter user ID"
                style={{ background: "var(--bg)", color: "var(--text-bright)", border: "1px solid var(--border)" }}
              />
              <button
                onClick={() => setIdorSubmitted(true)}
                className="px-4 py-2 rounded-lg text-sm font-medium font-mono border-none cursor-pointer"
                style={{ background: "var(--amber)", color: "var(--bg)" }}
              >
                View
              </button>
            </div>
          </div>

          {idorSubmitted && idorId === "12345" && (
            <div className="rounded-lg p-4" style={{ background: "rgba(0,255,65,0.05)", border: "1px solid var(--green-border)" }}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4" style={{ color: "var(--green)" }} />
                <span className="text-sm font-medium font-mono" style={{ color: "var(--green)" }}>Access granted</span>
              </div>
              <p className="text-xs font-mono" style={{ color: "var(--text)" }}>User ID 12345 — this is your profile.</p>
            </div>
          )}

          {idorSubmitted && idorId !== "12345" && idorId.length > 0 && (
            <div role="alert" className="rounded-lg p-4" style={{ background: "rgba(255,51,51,0.08)", border: "1px solid rgba(255,51,51,0.25)" }}>
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="w-4 h-4" style={{ color: "var(--red)" }} />
                <span className="text-sm font-medium font-mono" style={{ color: "var(--red)" }}>Access denied</span>
              </div>
              <p className="text-xs font-mono mb-2" style={{ color: "var(--text)" }}>You don't have permission to view user {idorId}'s profile.</p>
              <p className="text-xs font-mono" style={{ color: "var(--amber)" }}>This attempt has been logged.</p>
            </div>
          )}

          <div className="rounded-lg p-3 mt-4 text-xs font-mono" style={{ background: "var(--amber-glow)", border: "1px solid var(--amber-border)", color: "var(--amber)" }}>
            <strong>IDOR (Insecure Direct Object Reference):</strong> <span style={{ color: "var(--text)" }}>Changing the user ID in the URL shouldn't give access to other users' data. The server must verify authorization on every request — the UI should show a clear "Access denied" with a logged warning, not just return empty data.</span>
          </div>

          <p className="text-xs font-mono mt-3" style={{ color: "var(--text-dim)" }}>Try changing the ID to any other number to see the IDOR prevention.</p>
        </div>
      )}

      {/* Privilege escalation */}
      {scenario === "elevation" && (
        <div role="tabpanel" id="panel-elevation" className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <h3 className="font-bold font-mono text-sm mb-2" style={{ color: "var(--text-bright)" }}>Account settings</h3>
          <p className="text-xs font-mono mb-4" style={{ color: "var(--text)" }}>Current role: <strong style={{ color: "var(--amber)" }}>Editor</strong></p>

          <div className="space-y-3 mb-4">
            {[
              { label: "Change display name", status: "Allowed", allowed: true },
              { label: "Change email", status: "Allowed", allowed: true },
              { label: "Change password", status: "Allowed", allowed: true },
            ].map(({ label, status }) => (
              <div key={label} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid var(--border)" }}>
                <span className="text-sm font-mono" style={{ color: "var(--text-bright)" }}>{label}</span>
                <span className="text-xs font-mono" style={{ color: "var(--green)" }}>{status}</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="text-sm font-mono" style={{ color: "var(--text-bright)" }}>Change role to Admin</span>
              <span className="text-xs font-mono flex items-center gap-1" style={{ color: "var(--text-dim)" }}><Lock className="w-3 h-3" /> Admin only</span>
            </div>
          </div>

          {!elevationAttempted ? (
            <button
              onClick={() => setElevationAttempted(true)}
              className="w-full py-2.5 rounded-lg text-sm font-medium font-mono cursor-pointer"
              style={{ background: "transparent", color: "var(--amber)", border: "1px solid var(--amber-border)" }}
            >
              Simulate: try to change role via API manipulation
            </button>
          ) : (
            <div role="alert" className="rounded-lg p-4" style={{ background: "rgba(255,51,51,0.08)", border: "2px solid rgba(255,51,51,0.3)" }}>
              <div className="flex items-start gap-2 mb-3">
                <ShieldAlert className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "var(--red)" }} />
                <div>
                  <p className="text-sm font-bold font-mono" style={{ color: "var(--red)" }}>Privilege escalation blocked</p>
                  <p className="text-xs font-mono mt-1" style={{ color: "var(--text)" }}>
                    Attempted role change from "editor" to "admin" was blocked by server-side authorization.
                  </p>
                </div>
              </div>

              <div className="rounded p-3 font-mono text-xs space-y-1" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                <div><span style={{ color: "var(--red)" }}>POST</span> <span style={{ color: "var(--text)" }}>/api/users/12345/role</span></div>
                <div><span style={{ color: "var(--amber)" }}>Body:</span> <span style={{ color: "var(--text)" }}>{"{"} "role": "admin" {"}"}</span></div>
                <div><span style={{ color: "var(--red)" }}>Response:</span> <span style={{ color: "var(--red)" }}>403 Forbidden</span></div>
                <div><span style={{ color: "var(--amber)" }}>Log:</span> <span style={{ color: "var(--text)" }}>PRIVILEGE_ESCALATION_ATTEMPT user=12345</span></div>
              </div>

              <div className="rounded-lg p-3 mt-3 text-xs font-mono" style={{ background: "var(--amber-glow)", border: "1px solid var(--amber-border)", color: "var(--amber)" }}>
                <strong>Pattern:</strong> <span style={{ color: "var(--text)" }}>Even if a user manipulates the API request, the server blocks it AND logs the attempt. The UI shows what happened transparently — security through visibility.</span>
              </div>
            </div>
          )}
        </div>
      )}

      <button onClick={reset} className="mt-4 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer" style={{ color: "var(--text)" }}>
        Reset demo
      </button>
    </div>
  );
}

export function BrokenAccessControlPattern() {
  return (
    <div>
      <PatternHeader
        title="A01: Broken Access Control"
        description="The #1 OWASP vulnerability. How to design role-based UI, prevent IDOR attacks, and block privilege escalation — with server-side enforcement the user can see."
        severity="critical"
        tags={["OWASP A01", "CWE-284", "CWE-639"]}
      />

      <DemoContainer label="access control (3 variants)">
        <BrokenAccessControlDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Show permission levels clearly — users should understand what they can and can't do",
          "Use lock icons on disabled actions to indicate 'exists but not allowed'",
          "Verify authorization server-side on EVERY request — never trust the UI alone",
          "Show 'Access denied' with context when authorization fails",
          "Log all access control failures for security monitoring",
          "Use opaque identifiers (UUIDs) instead of sequential IDs to prevent guessing",
          "Show the user's current role prominently in the UI",
          "Implement principle of least privilege — default to minimum access",
        ]}
        donts={[
          "Don't hide features by only removing UI elements — attackers bypass the UI entirely",
          "Don't use sequential/predictable IDs in URLs (user/1, user/2, user/3)",
          "Don't check permissions only on the frontend — always enforce server-side",
          "Don't silently fail on access control violations — log them",
          "Don't allow role changes without additional verification (re-authentication)",
          "Don't return data in API responses that the user shouldn't see, even if the UI hides it",
          "Don't cache authorization decisions — re-check on every request",
        ]}
        securityRationale="Broken Access Control is OWASP #1 for a reason — it's found in 94% of tested applications. CWE-284 (Improper Access Control) and CWE-639 (IDOR) are the most exploited web vulnerabilities. The UX challenge: making the access control visible to legitimate users (so they understand the system) while making it impossible for attackers to bypass. The key principle: the UI is a convenience layer, not a security boundary. Every action must be authorized server-side."
        accessibilityNotes={[
          "Disabled buttons must have aria-disabled and explain why via aria-label or tooltip",
          "Role/permission information should be available to screen readers",
          "'Access denied' messages use role='alert' for immediate announcement",
          "Lock icons have descriptive alt text ('Requires admin role')",
          "Don't remove unauthorized options from the DOM entirely — disabled is more informative",
        ]}
      />
    </div>
  );
}
