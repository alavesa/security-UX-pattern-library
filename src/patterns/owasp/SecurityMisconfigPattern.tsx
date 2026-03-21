import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { ShieldAlert, CheckCircle2, XCircle, AlertTriangle, Settings, RefreshCw } from "lucide-react";

interface SecurityCheck {
  id: string;
  label: string;
  status: "pass" | "fail" | "warn";
  detail: string;
  fix: string;
}

const SECURITY_CHECKS: SecurityCheck[] = [
  { id: "https", label: "HTTPS enforced", status: "pass", detail: "All traffic redirected to HTTPS", fix: "" },
  { id: "hsts", label: "HSTS header", status: "pass", detail: "Strict-Transport-Security: max-age=31536000", fix: "" },
  { id: "csp", label: "Content Security Policy", status: "fail", detail: "No CSP header found", fix: "Add Content-Security-Policy header to prevent XSS" },
  { id: "cors", label: "CORS configuration", status: "warn", detail: "Access-Control-Allow-Origin: * (too permissive)", fix: "Restrict to specific trusted domains" },
  { id: "xframe", label: "X-Frame-Options", status: "pass", detail: "X-Frame-Options: DENY", fix: "" },
  { id: "debug", label: "Debug mode", status: "fail", detail: "Stack traces visible in error responses", fix: "Disable debug mode and use generic error pages in production" },
  { id: "defaults", label: "Default credentials", status: "fail", detail: "Admin account using default password 'admin123'", fix: "Force password change on first login" },
  { id: "versions", label: "Server version headers", status: "warn", detail: "Server: nginx/1.24.0 (version exposed)", fix: "Remove version from Server header" },
  { id: "cookies", label: "Cookie security flags", status: "warn", detail: "Session cookie missing SameSite=Strict", fix: "Add Secure, HttpOnly, and SameSite=Strict to session cookies" },
  { id: "referrer", label: "Referrer Policy", status: "pass", detail: "Referrer-Policy: strict-origin-when-cross-origin", fix: "" },
];

function SecurityMisconfigDemo() {
  const [scenario, setScenario] = useState<"dashboard" | "debug" | "defaults">("dashboard");
  const [showFixes, setShowFixes] = useState(false);
  const [setupStarted, setSetupStarted] = useState(false);
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());

  const toggleItem = (label: string) => {
    setCompletedItems(prev => {
      const next = new Set(prev);
      if (next.has(label)) { next.delete(label); } else { next.add(label); }
      return next;
    });
  };

  const passCount = SECURITY_CHECKS.filter(c => c.status === "pass").length;
  const warnCount = SECURITY_CHECKS.filter(c => c.status === "warn").length;
  const failCount = SECURITY_CHECKS.filter(c => c.status === "fail").length;

  return (
    <div className="w-full max-w-lg">
      <div role="tablist" className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {(["dashboard", "debug", "defaults"] as const).map(s => (
          <button key={s} role="tab" aria-selected={scenario === s} onClick={() => setScenario(s)} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: scenario === s ? "var(--green-glow)" : "transparent", color: scenario === s ? "var(--green)" : "var(--text)" }}>
            {s === "dashboard" ? "Security Headers" : s === "debug" ? "Debug Mode" : "Default Creds"}
          </button>
        ))}
      </div>

      {/* Security headers dashboard */}
      {scenario === "dashboard" && (
        <div className="rounded-2xl border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Settings className="w-4 h-4" /> Security Configuration
            </h3>
            <button onClick={() => setShowFixes(!showFixes)} className="text-xs bg-transparent border-none cursor-pointer hover:underline">
              {showFixes ? "Hide fixes" : "Show fixes"}
            </button>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="rounded-lg p-3 text-center">
              <p className="text-xl font-bold">{passCount}</p>
              <p className="text-xs">Passed</p>
            </div>
            <div className="rounded-lg p-3 text-center">
              <p className="text-xl font-bold">{warnCount}</p>
              <p className="text-xs">Warnings</p>
            </div>
            <div className="rounded-lg p-3 text-center">
              <p className="text-xl font-bold">{failCount}</p>
              <p className="text-xs">Failed</p>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-2">
            {SECURITY_CHECKS.map(check => (
              <div key={check.id} className={`flex items-start gap-3 p-3 rounded-lg border ${
                check.status === "pass" ? "border-green-100 /50" :
                check.status === "warn" ? "border-amber-100 /50" :
                "border-red-100 /50"
              }`}>
                {check.status === "pass" ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> :
                 check.status === "warn" ? <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" /> :
                 <XCircle className="w-4 h-4 mt-0.5 shrink-0" />}
                <div className="flex-1">
                  <p className="text-sm font-medium">{check.label}</p>
                  <p className="text-xs">{check.detail}</p>
                  {showFixes && check.fix && (
                    <p className="text-xs mt-1 px-2 py-1 rounded">Fix: {check.fix}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Debug mode exposure */}
      {scenario === "debug" && (
        <div className="rounded-2xl border overflow-hidden">
          <div className="text-white px-4 py-2 flex items-center gap-2 text-xs font-mono">
            <ShieldAlert className="w-4 h-4" /> SECURITY RISK: Debug mode detected
          </div>

          <div className="p-6">
            <h3 className="font-bold text-sm mb-3">What users see when debug mode is on:</h3>

            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs space-y-1 mb-4 overflow-x-auto">
              <div >// Error response with stack trace exposed</div>
              <div>Error: SQLITE_CONSTRAINT: UNIQUE constraint failed</div>
              <div >    at Database.exec (/app/node_modules/better-sqlite3/lib/methods/exec.js:7:14)</div>
              <div >    at UserService.createUser (/app/src/services/user.ts:42:8)</div>
              <div >    at POST /api/users (routes/users.ts:15:3)</div>
              <div className="text-yellow-400 mt-2">DB: sqlite:///app/data/production.db</div>
              <div className="text-yellow-400">ENV: NODE_ENV=development</div>
              <div className="text-yellow-400">SECRET: jwt_secret=••••••••••</div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="text-xs font-semibold mb-2">What this exposes to attackers:</h4>
              <ul className="text-xs space-y-1">
                <li>Database type and file path</li>
                <li>Internal file structure (/app/src/services/...)</li>
                <li>Environment variables including secrets</li>
                <li>Framework and dependency versions</li>
                <li>SQL table structure from error messages</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4 mt-3">
              <h4 className="text-xs font-semibold mb-2">What users should see instead:</h4>
              <div className="border rounded-lg p-4 text-center">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Something went wrong</p>
                <p className="text-xs mt-1">Please try again. If the problem persists, contact support.</p>
                <p className="text-xs mt-2 font-mono">Error reference: ERR-2026-0320-4821</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Default credentials */}
      {scenario === "defaults" && (
        <div className="rounded-2xl border p-6">
          <h3 className="font-bold text-sm mb-4">First-time setup</h3>

          <div className="border-2 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2">
              <ShieldAlert className="w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-bold">Default credentials detected</p>
                <p className="text-xs mt-1">
                  Your admin account is using the factory default password. This is the #1 way systems get compromised.
                </p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 mb-4">
            <h4 className="text-xs font-semibold mb-3">Security setup checklist:</h4>
            <div className="space-y-2">
              {[
                { label: "Change admin password", critical: true },
                { label: "Set up MFA for admin account", critical: true },
                { label: "Review default CORS settings", critical: false },
                { label: "Disable debug mode", critical: true },
                { label: "Set security headers", critical: false },
              ].map(({ label, critical }) => {
                const isDone = completedItems.has(label);
                return (
                  <div key={label} className={`flex items-center justify-between py-1 ${setupStarted ? "cursor-pointer" : ""}`} onClick={() => setupStarted && toggleItem(label)}>
                    <span className={`text-sm ${isDone ? "line-through " : ""}`}>{label}</span>
                    <div className="flex items-center gap-2">
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : critical && <span className="text-xs px-1.5 py-0.5 rounded">Required</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button onClick={() => setSetupStarted(true)} className="w-full text-white py-2.5 rounded-lg font-medium text-sm border-none cursor-pointer flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4" /> Start security setup
          </button>

          <div className="border rounded-lg p-3 mt-4 text-xs">
            <strong>Pattern:</strong> Block access to the full application until critical security items are resolved. Don't let users skip the password change — a default password on a production system is an open door.
          </div>
        </div>
      )}
    </div>
  );
}

export function SecurityMisconfigPattern() {
  return (
    <div>
      <PatternHeader
        title="A05: Security Misconfiguration"
        description="How to surface misconfigurations to administrators — security header dashboards, debug mode detection, and forced password change on default credentials."
        severity="critical"
        tags={["OWASP A05", "CWE-16", "CWE-209"]}
      />

      <DemoContainer label="security misconfiguration (3 variants)">
        <SecurityMisconfigDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Run automated security header checks and show results in a dashboard",
          "Block application access until critical security setup is complete",
          "Force password change on default/factory credentials before first use",
          "Show generic error pages in production — never expose stack traces",
          "Include an error reference ID that maps to detailed logs server-side",
          "Check for common misconfigurations: CSP, CORS, cookie flags, HSTS",
          "Provide specific fix instructions for each misconfiguration found",
        ]}
        donts={[
          "Don't ship with debug mode enabled in production",
          "Don't expose server version, framework, or dependency information",
          "Don't include stack traces, SQL queries, or internal paths in error messages",
          "Don't use default credentials — ever, even temporarily",
          "Don't allow wildcard CORS (*) on APIs that handle authenticated requests",
          "Don't skip security headers because 'it works without them'",
          "Don't let users skip the initial security setup wizard",
        ]}
        securityRationale="Security misconfiguration (OWASP A05) is found in 90% of tested applications. CWE-16 (Configuration) and CWE-209 (Error Message Information Leak) are among the most common findings. The UX challenge: administrators need to understand what's misconfigured AND how to fix it. A dashboard that shows pass/warn/fail with specific remediation steps turns a security audit into an actionable checklist. Forcing the initial security setup prevents the all-too-common scenario of 'we'll secure it later' turning into 'we got breached.'"
        accessibilityNotes={[
          "Dashboard uses icons + color + text for pass/warn/fail status",
          "Error pages are readable and provide clear next steps",
          "Security checklist items are keyboard-navigable",
          "Critical items are marked with both color and 'Required' label",
          "Stack trace examples use code formatting for readability",
        ]}
      />
    </div>
  );
}
