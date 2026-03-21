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
          <button key={s} role="tab" aria-selected={scenario === s} aria-controls={`panel-${s}`} onClick={() => { setScenario(s); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: scenario === s ? "var(--green-glow)" : "transparent", color: scenario === s ? "var(--green)" : "var(--text)" }}>
            {s === "rbac" ? "Role-Based UI" : s === "idor" ? "IDOR Prevention" : "Privilege Escalation"}
          </button>
        ))}
      </div>

      {/* RBAC demo */}
      {scenario === "rbac" && (
        <div role="tabpanel" id="panel-rbac" className="rounded-2xl border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm">Document: Q4 Report</h3>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <select
                value={currentRole}
                onChange={e => setCurrentRole(e.target.value as Role)}
                className="text-xs border rounded px-2 py-1"
              >
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Permission indicators */}
          <div className="rounded-lg p-4 mb-4">
            <p className="text-xs font-medium mb-3">Your permissions as <strong >{currentRole}</strong>:</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "View document", allowed: perms.canView },
                { label: "Edit document", allowed: perms.canEdit },
                { label: "Delete document", allowed: perms.canDelete },
                { label: "Manage users", allowed: perms.canManageUsers },
              ].map(({ label, allowed }) => (
                <div key={label} className="flex items-center gap-2 text-xs">
                  {allowed
                    ? <CheckCircle2 className="w-3.5 h-3.5" />
                    : <Lock className="w-3.5 h-3.5" />
                  }
                  <span className={allowed ? "" : ""}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2">
            <button className="w-full flex items-center justify-center gap-2 text-white py-2 rounded-lg text-sm font-medium border-none cursor-pointer">
              <Eye className="w-4 h-4" /> View Document
            </button>
            <button
              aria-disabled={!perms.canEdit}
              aria-label={!perms.canEdit ? 'Edit Document — requires Editor role or above' : undefined}
              onClick={e => { if (!perms.canEdit) { e.preventDefault(); return; } }}
              className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg text-sm font-medium cursor-pointer aria-disabled:opacity-40 aria-disabled:cursor-not-allowed"
            >
              Edit Document {!perms.canEdit && <Lock className="w-3 h-3" />}
            </button>
            <button
              aria-disabled={!perms.canDelete}
              aria-label={!perms.canDelete ? 'Delete Document — requires Admin role' : undefined}
              onClick={e => { if (!perms.canDelete) { e.preventDefault(); return; } }}
              className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg text-sm font-medium cursor-pointer aria-disabled:opacity-40 aria-disabled:cursor-not-allowed"
            >
              Delete Document {!perms.canDelete && <Lock className="w-3 h-3" />}
            </button>
          </div>

          <div className="border rounded-lg p-3 mt-4 text-xs">
            <strong>Pattern:</strong> Disabled buttons with lock icons show what exists but isn't allowed. Users understand the system's capabilities without being able to misuse them. Switch roles to see how the UI adapts.
          </div>
        </div>
      )}

      {/* IDOR prevention */}
      {scenario === "idor" && (
        <div role="tabpanel" id="panel-idor" className="rounded-2xl border p-6">
          <h3 className="font-bold text-sm mb-4">Access user profile</h3>

          <div className="mb-4">
            <label className="block text-xs font-medium mb-1">User ID</label>
            <div className="flex gap-2">
              <input
                value={idorId}
                onChange={e => { setIdorId(e.target.value); setIdorSubmitted(false); }}
                className="flex-1 px-3 py-2 border rounded-lg text-sm font-mono"
                placeholder="Enter user ID"
              />
              <button
                onClick={() => setIdorSubmitted(true)}
                className="px-4 py-2 text-white rounded-lg text-sm font-medium border-none cursor-pointer"
              >
                View
              </button>
            </div>
          </div>

          {idorSubmitted && idorId === "12345" && (
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm font-medium">Access granted</span>
              </div>
              <p className="text-xs">User ID 12345 — this is your profile.</p>
            </div>
          )}

          {idorSubmitted && idorId !== "12345" && idorId.length > 0 && (
            <div role="alert" className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="w-4 h-4" />
                <span className="text-sm font-medium">Access denied</span>
              </div>
              <p className="text-xs mb-2">You don't have permission to view user {idorId}'s profile.</p>
              <p className="text-xs">This attempt has been logged.</p>
            </div>
          )}

          <div className="border rounded-lg p-3 mt-4 text-xs">
            <strong>IDOR (Insecure Direct Object Reference):</strong> Changing the user ID in the URL shouldn't give access to other users' data. The server must verify authorization on every request — the UI should show a clear "Access denied" with a logged warning, not just return empty data.
          </div>

          <p className="text-xs mt-3">Try changing the ID to any other number to see the IDOR prevention.</p>
        </div>
      )}

      {/* Privilege escalation */}
      {scenario === "elevation" && (
        <div role="tabpanel" id="panel-elevation" className="rounded-2xl border p-6">
          <h3 className="font-bold text-sm mb-2">Account settings</h3>
          <p className="text-xs mb-4">Current role: <strong>Editor</strong></p>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm">Change display name</span>
              <span className="text-xs">Allowed</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm">Change email</span>
              <span className="text-xs">Allowed</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm">Change password</span>
              <span className="text-xs">Allowed</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm">Change role to Admin</span>
              <span className="text-xs flex items-center gap-1"><Lock className="w-3 h-3" /> Admin only</span>
            </div>
          </div>

          {!elevationAttempted ? (
            <button
              onClick={() => setElevationAttempted(true)}
              className="w-full border py-2.5 rounded-lg text-sm font-medium cursor-pointer"
            >
              Simulate: try to change role via API manipulation
            </button>
          ) : (
            <div role="alert" className="border-2 rounded-lg p-4">
              <div className="flex items-start gap-2 mb-3">
                <ShieldAlert className="w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Privilege escalation blocked</p>
                  <p className="text-xs mt-1">
                    Attempted role change from "editor" to "admin" was blocked by server-side authorization.
                  </p>
                </div>
              </div>

              <div className="border rounded p-3 font-mono text-xs space-y-1">
                <div><span >POST</span> /api/users/12345/role</div>
                <div><span >Body:</span> {"{"} "role": "admin" {"}"}</div>
                <div><span >Response:</span> 403 Forbidden</div>
                <div><span >Log:</span> PRIVILEGE_ESCALATION_ATTEMPT user=12345</div>
              </div>

              <div className="border rounded-lg p-3 mt-3 text-xs">
                <strong>Pattern:</strong> Even if a user manipulates the API request, the server blocks it AND logs the attempt. The UI shows what happened transparently — security through visibility.
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
