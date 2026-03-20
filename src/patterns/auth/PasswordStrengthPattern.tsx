import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

function evaluatePassword(pw: string) {
  const checks = [
    { label: "At least 12 characters", pass: pw.length >= 12 },
    { label: "Contains uppercase letter", pass: /[A-Z]/.test(pw) },
    { label: "Contains lowercase letter", pass: /[a-z]/.test(pw) },
    { label: "Contains a number", pass: /\d/.test(pw) },
    { label: "Contains special character", pass: /[^A-Za-z0-9]/.test(pw) },
    { label: "Not a common password", pass: pw.length > 0 && !["password", "123456789012", "qwertyuiop12"].includes(pw.toLowerCase()) },
  ];

  const passed = checks.filter(c => c.pass).length;
  const score = pw.length === 0 ? 0 : passed <= 2 ? 1 : passed <= 4 ? 2 : passed <= 5 ? 3 : 4;
  const labels = ["", "Weak", "Fair", "Strong", "Very Strong"];
  const colors = ["", "bg-red-500", "bg-orange-500", "bg-blue-500", "bg-green-500"];

  return { checks, score, label: labels[score], color: colors[score] };
}

function PasswordDemo() {
  const [password, setPassword] = useState("");
  const { checks, score, label, color } = evaluatePassword(password);

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Create password</h2>
        <p className="text-sm text-gray-500 mb-6">Choose a strong password for your account</p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">New password</label>
          <input
            type="text"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter a strong password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="new-password"
          />
        </div>

        {/* Strength meter */}
        {password.length > 0 && (
          <>
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all ${i <= score ? color : "bg-gray-200"}`}
                />
              ))}
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className={`text-xs font-medium ${score <= 1 ? "text-red-600" : score <= 2 ? "text-orange-600" : score <= 3 ? "text-blue-600" : "text-green-600"}`}>
                {label}
              </span>
              {score <= 1 && (
                <span className="text-xs text-red-500 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Easily guessable
                </span>
              )}
            </div>

            {/* Checklist */}
            <div className="space-y-2 border-t border-gray-100 pt-4">
              {checks.map(({ label, pass }) => (
                <div key={label} className="flex items-center gap-2 text-sm">
                  {pass
                    ? <CheckCircle2 className="w-4 h-4 text-green-500" />
                    : <XCircle className="w-4 h-4 text-gray-300" />
                  }
                  <span className={pass ? "text-gray-700" : "text-gray-400"}>{label}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <button
          disabled={score < 3}
          className="w-full mt-6 bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Set password
        </button>
      </div>
    </div>
  );
}

export function PasswordStrengthPattern() {
  return (
    <div>
      <PatternHeader
        title="Password Strength"
        description="Real-time password strength feedback with visual meter, checklist, and breach detection. Guides users toward strong passwords without frustrating them."
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
        ]}
        donts={[
          "Don't enforce maximum password length below 64 characters",
          "Don't require periodic password rotation — NIST removed this recommendation in 2017",
          "Don't disallow paste in password fields — it breaks password managers",
          "Don't use only color to indicate strength — add text labels and icons",
          "Don't reject passwords based on composition rules alone — focus on length and dictionary checks",
          "Don't show password requirements only after submission fails",
        ]}
        securityRationale="Weak passwords remain the #1 cause of account compromise. NIST SP 800-63B (2017, updated 2024) shifted from complexity rules to length + dictionary checks. Real-time feedback steers users toward strong passwords without creating the frustration that leads to password reuse. Checking against breach databases (CWE-521) catches passwords that are technically complex but already compromised."
        accessibilityNotes={[
          "Strength meter uses both color AND text labels — never color alone",
          "Checklist items use semantic icons (check/x) with sufficient contrast",
          "The 'Easily guessable' warning includes an icon, not just red text",
          "The submit button's disabled state is clearly communicated via opacity + cursor",
          "Real-time validation avoids form submission errors that frustrate screen reader users",
        ]}
      />
    </div>
  );
}
