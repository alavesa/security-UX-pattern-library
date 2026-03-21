import { useState, useMemo } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { CheckCircle2, XCircle, AlertTriangle, Eye, EyeOff, ShieldAlert, ShieldCheck } from "lucide-react";

// NOTE: This is a placeholder list for demo purposes only. In production, replace with a real breach-check
// API call (e.g., Have I Been Pwned k-anonymity API: https://api.pwnedpasswords.com/range/{first5hash}).
// Never log or transmit the plaintext password; only the first 5 hex chars of SHA-1 are sent to HIBP.
const BREACHED_PASSWORDS = ["password123", "letmein2024", "qwerty123456", "admin12345", "iloveyou123"];

function evaluatePassword(pw: string) {
  const breached = BREACHED_PASSWORDS.includes(pw.toLowerCase());
  const checks = [
    { label: "At least 12 characters", pass: pw.length >= 12 },
    { label: "Contains uppercase letter", pass: /[A-Z]/.test(pw) },
    { label: "Contains lowercase letter", pass: /[a-z]/.test(pw) },
    { label: "Contains a number", pass: /\d/.test(pw) },
    { label: "Contains special character", pass: /[^A-Za-z0-9]/.test(pw) },
    { label: "Not a common password", pass: pw.length > 0 && !breached && !["password", "123456789012", "qwertyuiop12"].includes(pw.toLowerCase()) },
  ];

  const passed = checks.filter(c => c.pass).length;
  const score = pw.length === 0 ? 0 : breached ? 0 : passed <= 2 ? 1 : passed <= 4 ? 2 : passed <= 5 ? 3 : 4;
  const labels = ["", "Weak", "Fair", "Strong", "Very Strong"];
  const colors = ["", "bg-red-500", "bg-orange-500", "bg-blue-500", "bg-green-500"];

  return { checks, score, label: breached ? "Breached" : labels[score], color: breached ? "bg-red-500" : colors[score], breached };
}

function PasswordDemo() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { checks, score, label, color, breached } = useMemo(() => evaluatePassword(password), [password]);
  const passwordsMatch = password === confirm && confirm.length > 0;
  const canSubmit = score >= 3 && passwordsMatch && !breached;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border p-8 text-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold mb-1">Password set!</h2>
          <p className="text-sm mb-4">Your new password is strong and secure.</p>
          <div className="border rounded-lg p-3 text-left mb-4">
            <p className="text-xs">
              <strong>Behind the scenes:</strong> Password hashed with bcrypt (cost factor 12). Previous hash removed. All sessions invalidated. Confirmation email sent.
            </p>
          </div>
          <button onClick={() => { setSubmitted(false); setPassword(""); setConfirm(""); }} className="text-sm hover: bg-transparent border-none cursor-pointer">
            Try another password
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-2xl border p-8">
        <h2 className="text-xl font-bold mb-1">Create password</h2>
        <p className="text-sm mb-6">Choose a strong password for your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password field */}
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium mb-1">New password</label>
            <div className="relative">
              <input
                id="new-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Minimum 12 characters"
                className="w-full px-3 py-2 pr-10 border rounded-lg text-sm focus:outline-none focus:ring-2"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 hover: bg-transparent border-none cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Strength meter */}
          {password.length > 0 && (
            <div aria-live="polite" aria-atomic="false">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-all ${i <= (breached ? 1 : score) ? color : ""}`}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-xs font-medium ${breached || score <= 1 ? "" : score <= 2 ? "text-orange-600" : score <= 3 ? "" : ""}`}>
                  {label}
                </span>
                {score <= 1 && !breached && (
                  <span className="text-xs flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Easily guessable
                  </span>
                )}
              </div>

              {/* Breach warning */}
              {breached && (
                <div className="flex items-start gap-2 text-sm p-3 rounded-lg border" role="alert">
                  <ShieldAlert className="w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-xs">Password found in data breach!</strong>
                    <span className="text-xs">This password appeared in known breaches and should never be used. Attackers try these first.</span>
                  </div>
                </div>
              )}

              {/* Checklist */}
              <div className="space-y-1.5 border-t pt-3">
                {checks.map(({ label, pass }) => (
                  <div key={label} className="flex items-center gap-2 text-sm">
                    {pass
                      ? <CheckCircle2 className="w-4 h-4 shrink-0" />
                      : <XCircle className="w-4 h-4 shrink-0" />
                    }
                    <span className={pass ? "" : ""}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Confirm password */}
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">Confirm password</label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="Re-enter your password"
                className={`w-full px-3 py-2 pr-10 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                  confirm.length > 0
                    ? passwordsMatch
                      ? " "
                      : " "
                    : " "
                }`}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-2 top-1/2 -translate-y-1/2 hover: bg-transparent border-none cursor-pointer"
                aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirm.length > 0 && !passwordsMatch && (
              <p className="text-xs mt-1">Passwords don't match</p>
            )}
            {passwordsMatch && (
              <p className="text-xs mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Passwords match
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full text-white py-2.5 rounded-lg font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Set password
          </button>
        </form>
      </div>

      {/* Demo hints */}
      <div className="mt-4 p-3 rounded-lg text-xs space-y-1" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <p style={{ color: "var(--green)" }}>Try these scenarios:</p>
        <p style={{ color: "var(--text)" }}>
          <span className="font-mono" style={{ color: "var(--cyan)" }}>password123</span> → breach warning
        </p>
        <p style={{ color: "var(--text)" }}>Short password → watch checklist update in real-time</p>
        <p style={{ color: "var(--text)" }}>Strong password + matching confirm → submit enabled</p>
        <p style={{ color: "var(--text)" }}><strong>Note:</strong> Breach list is a demo placeholder — replace with Have I Been Pwned API in production.</p>
      </div>
    </div>
  );
}

export function PasswordStrengthPattern() {
  return (
    <div>
      <PatternHeader
        title="Password Strength"
        description="Real-time password strength feedback with visual meter, requirement checklist, breach detection, and confirmation field. Guides users toward strong passwords without frustrating them."
        severity="high"
        tags={["Authentication", "OWASP A07", "CWE-521"]}
      />

      <DemoContainer>
        <PasswordDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Show real-time feedback as the user types — don't wait for submission",
          "Use a multi-factor strength meter (length + complexity + dictionary check)",
          "Require minimum 12 characters — NIST SP 800-63B recommends 8 minimum but 12+ is current best practice",
          "Check against known breached passwords (Have I Been Pwned API)",
          "Show a clear checklist of requirements with pass/fail indicators",
          "Allow the submit button only when minimum strength is reached",
          "Provide a show/hide toggle on both password and confirm fields",
          "Show real-time match/mismatch feedback on the confirm field",
          "Display a clear breach warning with context about why it matters",
        ]}
        donts={[
          "Don't enforce maximum password length below 64 characters",
          "Don't require periodic password rotation — NIST removed this recommendation in 2017",
          "Don't disallow paste in password fields — it breaks password managers",
          "Don't use only color to indicate strength — add text labels and icons",
          "Don't reject passwords based on composition rules alone — focus on length and dictionary checks",
          "Don't show password requirements only after submission fails",
          "Don't hash passwords with MD5 or SHA1 — use bcrypt, scrypt, or Argon2",
          "Don't store the breached password check result — only check, never log the password",
        ]}
        securityRationale="Weak passwords remain the #1 cause of account compromise. NIST SP 800-63B (2017, updated 2024) shifted from complexity rules to length + dictionary checks. Real-time feedback steers users toward strong passwords without creating the frustration that leads to password reuse. Checking against breach databases (CWE-521) catches passwords that are technically complex but already compromised. The breach warning is critical — if a password appears in a breach database, it will be tried by attackers within hours."
        accessibilityNotes={[
          "Strength meter uses both color AND text labels — never color alone",
          "Checklist items use semantic icons (check/x) with sufficient contrast",
          "Breach warning includes an icon and bold text, not just color",
          "The submit button's disabled state is communicated via opacity + cursor",
          "Real-time validation avoids form submission errors that frustrate screen reader users",
          "Show/hide toggles have aria-labels that describe the current state",
          "Confirm field border color changes are accompanied by text messages",
        ]}
      />
    </div>
  );
}
