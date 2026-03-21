import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Eye, EyeOff, AlertCircle, Loader2, CheckCircle2, Shield } from "lucide-react";

function LoginDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [mfaLoading, setMfaLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [mfaRequired, setMfaRequired] = useState(false);
  const [mfaCode, setMfaCode] = useState(["", "", "", "", "", ""]);
  const [mfaError, setMfaError] = useState("");

  const handleSocialLogin = () => {
    if (locked) return;
    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
      setLoggedIn(true);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (locked) return;

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);

      // Success flow: use "admin@test.com" / "password123"
      if (email === "admin@test.com" && password === "password123") {
        setMfaRequired(true);
        return;
      }

      // Social login simulation
      if (email === "social") {
        setLoggedIn(true);
        return;
      }

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        setLocked(true);
        setError("Account temporarily locked. Too many failed attempts. Try again in 15 minutes.");
      } else {
        setError("Invalid email or password.");
        setPassword(""); // Clear password only, keep email
      }
    }, 1500);
  };

  const handleMfaSubmit = () => {
    const code = mfaCode.join("");
    if (code !== "123456") {
      setMfaError("Invalid code. Try 123456 for the demo.");
      return;
    }
    setMfaError("");
    setMfaLoading(true);
    setTimeout(() => {
      setMfaLoading(false);
      setLoggedIn(true);
    }, 1000);
  };

  const reset = () => {
    setEmail("");
    setPassword("");
    setError("");
    setAttempts(0);
    setLocked(false);
    setLoggedIn(false);
    setMfaRequired(false);
    setMfaCode(["", "", "", "", "", ""]);
    setMfaError("");
    setRememberMe(false);
  };

  // Success state
  if (loggedIn) {
    return (
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-7 h-7 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Welcome back!</h2>
          <p className="text-sm text-gray-500 mb-2">Signed in as <strong>{email || "user"}</strong></p>
          <div className="text-xs text-gray-400 space-y-1 mb-4">
            <p>Session created at {new Date().toLocaleTimeString()}</p>
            <p>IP: 192.168.1.*** (partially masked)</p>
            {rememberMe && <p className="text-amber-500">Remember me: device trusted for 30 days</p>}
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-left mb-4">
            <p className="text-xs text-blue-800">
              <strong>Security UX note:</strong> The success screen shows partial session info for transparency, masks the full IP for privacy, and confirms "remember me" status so users understand the security implications.
            </p>
          </div>
          <button onClick={reset} className="text-sm text-blue-600 hover:text-blue-800 bg-transparent border-none cursor-pointer">
            Try another scenario
          </button>
        </div>
      </div>
    );
  }

  // MFA challenge
  if (mfaRequired) {
    return (
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Verify your identity</h2>
          <p className="text-sm text-gray-500 mb-6">We sent a code to your authenticator app</p>
          <div className="flex gap-2 justify-center mb-4">
            {[0, 1, 2, 3, 4, 5].map(i => (
              <input
                key={i}
                type="text"
                maxLength={1}
                inputMode="numeric"
                autoComplete="one-time-code"
                className="w-10 h-12 text-center text-lg font-mono border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={mfaCode[i]}
                onChange={e => {
                  const newCode = [...mfaCode];
                  newCode[i] = e.target.value.replace(/\D/g, "").slice(0, 1);
                  setMfaCode(newCode);
                }}
              />
            ))}
          </div>
          {mfaError && (
            <div className="flex items-start gap-2 text-sm p-3 rounded-lg bg-red-50 text-red-700 mb-4" role="alert">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{mfaError}</span>
            </div>
          )}
          <button
            onClick={handleMfaSubmit}
            disabled={mfaLoading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            {mfaLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</> : "Verify"}
          </button>
          <p className="text-xs text-gray-400 mt-4">
            This step appears because the account has MFA enabled — a critical security measure.
          </p>
        </div>
        <button onClick={reset} className="mt-4 text-xs text-gray-400 hover:text-gray-600 mx-auto block bg-transparent border-none cursor-pointer">
          Reset demo
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 text-center mb-1">Welcome back</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Sign in to your account</p>

        {/* Social login */}
        <div className="space-y-2 mb-5">
          <button
            onClick={handleSocialLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors bg-white cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors bg-white cursor-pointer">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            Continue with GitHub
          </button>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
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
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <button type="button" onClick={() => {}} className="text-xs text-blue-600 hover:text-blue-800 bg-transparent border-none cursor-pointer p-0">
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                id="password"
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

          {/* Remember me */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">Remember this device</span>
            <span className="text-xs text-gray-400">(30 days)</span>
          </label>

          {error && (
            <div className={`flex items-start gap-2 text-sm p-3 rounded-lg ${locked ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`} role="alert">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loginLoading || locked}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loginLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : "Sign in"}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          Don't have an account? <a href="#" onClick={e => e.preventDefault()} className="text-blue-600 hover:text-blue-800">Sign up</a>
        </p>

        {locked && (
          <p className="text-xs text-gray-400 text-center mt-2">
            Account locked
          </p>
        )}
      </div>

      {/* Demo hints */}
      <div className="mt-4 p-3 rounded-lg text-xs space-y-1" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <p style={{ color: "var(--green)" }}>Try these scenarios:</p>
        <p style={{ color: "var(--text)" }}>
          <span className="font-mono" style={{ color: "var(--cyan)" }}>admin@test.com</span> / <span className="font-mono" style={{ color: "var(--cyan)" }}>password123</span> → success + MFA
        </p>
        <p style={{ color: "var(--text)" }}>Wrong credentials 3x → account lockout</p>
        <p style={{ color: "var(--text)" }}>Google/GitHub buttons → social login flow</p>
      </div>

      {attempts > 0 && (
        <button onClick={reset} className="mt-2 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer" style={{ color: "var(--text)" }}>
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
        description="A complete login form with social login, rate limiting, MFA challenge, and success flow. Demonstrates how to balance security requirements with a frictionless user experience."
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
          "Offer social login as a faster, phishing-resistant alternative",
          "Show 'Remember this device' with clear duration and security implications",
          "Clear only the password on failure — keep the email to reduce friction",
          "Display session info on success — builds trust through transparency",
        ]}
        donts={[
          "Never reveal whether the email exists — this enables account enumeration (CWE-204)",
          "Don't show remaining attempts count to attackers — use it internally only",
          "Don't disable the submit button before any input — it confuses users",
          "Don't clear the email field on failed login — only clear the password",
          "Don't use client-side-only rate limiting — always enforce on the server",
          "Don't log passwords, even failed ones",
          "Don't auto-check 'Remember me' — it's a security decision the user should make",
          "Don't skip MFA after social login if the account has it enabled",
        ]}
        securityRationale="Login forms are the #1 target for credential stuffing and brute force attacks (OWASP A07: Identification and Authentication Failures). Generic error messages prevent account enumeration. Rate limiting with exponential backoff makes automated attacks impractical. Social login delegates authentication to providers with dedicated security teams (Google, GitHub), reducing your attack surface. The 'Remember this device' option trades session duration for convenience — always show the duration so users understand the tradeoff."
        accessibilityNotes={[
          "Error messages use role='alert' for screen reader announcement",
          "Password toggle has descriptive aria-label that changes with state",
          "Form inputs have associated labels, not just placeholders",
          "Loading state disables the button and shows visual + text indicator",
          "Color is never the sole indicator — icons accompany all status messages",
          "Social login buttons have clear text labels, not just icons",
          "Remember me checkbox is a proper label+input pair for clickability",
        ]}
      />
    </div>
  );
}
