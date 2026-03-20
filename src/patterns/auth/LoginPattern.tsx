import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";

function LoginDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (locked) return;

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        setLocked(true);
        setError("Account temporarily locked. Too many failed attempts. Try again in 15 minutes.");
      } else {
        // Generic error — never reveal which field is wrong
        setError("Invalid email or password.");
      }
    }, 1500);
  };

  const reset = () => {
    setEmail("");
    setPassword("");
    setError("");
    setAttempts(0);
    setLocked(false);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 text-center mb-1">Welcome back</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={locked}
              autoComplete="email"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <a href="#" className="text-xs text-blue-600 hover:text-blue-800" onClick={e => e.preventDefault()}>
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={locked}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className={`flex items-start gap-2 text-sm p-3 rounded-lg ${locked ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`} role="alert">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || locked}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : "Sign in"}
          </button>
        </form>

        {attempts > 0 && (
          <p className="text-xs text-gray-400 text-center mt-4">
            {locked ? "Account locked" : `Attempt ${attempts}/3`}
          </p>
        )}
      </div>

      {(attempts > 0) && (
        <button onClick={reset} className="mt-4 text-xs text-gray-400 hover:text-gray-600 mx-auto block bg-transparent border-none cursor-pointer">
          Reset demo
        </button>
      )}
    </div>
  );
}

export function LoginPattern() {
  return (
    <div>
      <PatternHeader
        title="Login Flow"
        description="A secure login form with rate limiting, generic error messages, and progressive security feedback. Balances security requirements with a frictionless user experience."
        severity="critical"
        tags={["Authentication", "OWASP A07", "CWE-307"]}
      />

      <DemoContainer>
        <LoginDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Use generic error messages — 'Invalid email or password' not 'Password incorrect'",
          "Implement rate limiting with progressive lockout (3 attempts → 15 min lock)",
          "Show a password visibility toggle for accessibility",
          "Use autocomplete attributes (email, current-password) for password managers",
          "Add a loading state to prevent double-submission",
          "Provide a 'Forgot password' link before the user fails",
        ]}
        donts={[
          "Never reveal whether the email exists — this enables account enumeration (CWE-204)",
          "Don't show remaining attempts count to attackers — use it internally only",
          "Don't disable the submit button before any input — it confuses users",
          "Don't clear the email field on failed login — only clear the password",
          "Don't use client-side-only rate limiting — always enforce on the server",
          "Don't log passwords, even failed ones",
        ]}
        securityRationale="Login forms are the #1 target for credential stuffing and brute force attacks (OWASP A07: Identification and Authentication Failures). Generic error messages prevent account enumeration. Rate limiting with exponential backoff makes automated attacks impractical. The UX challenge is making these security measures invisible to legitimate users while effectively blocking attackers."
        accessibilityNotes={[
          "Error messages use role='alert' for screen reader announcement",
          "Password toggle has descriptive aria-label that changes with state",
          "Form inputs have associated labels, not just placeholders",
          "Loading state disables the button and shows visual + text indicator",
          "Color is never the sole indicator — icons accompany all status messages",
        ]}
      />
    </div>
  );
}
