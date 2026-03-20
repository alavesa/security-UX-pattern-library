import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Mail, ArrowRight, CheckCircle2, Shield } from "lucide-react";

function AccountRecoveryDemo() {
  const [step, setStep] = useState<"email" | "sent" | "verify" | "reset" | "done">("email");
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Always show success — never reveal if email exists
    setStep("sent");
  };

  const handleVerify = () => setStep("reset");
  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("done");
  };

  const reset = () => {
    setStep("email");
    setEmail("");
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        {step === "email" && (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Reset your password</h2>
            <p className="text-sm text-gray-500 mb-6">Enter your email and we'll send you a reset link.</p>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoComplete="email"
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                Send reset link <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </>
        )}

        {step === "sent" && (
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Check your email</h2>
            <p className="text-sm text-gray-500 mb-2">
              If an account exists for <strong className="text-gray-700">{email}</strong>, you'll receive a password reset link.
            </p>
            <p className="text-xs text-gray-400 mb-6">The link expires in 30 minutes.</p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-left mb-4">
              <p className="text-xs text-amber-800">
                <strong>Security note:</strong> We always show this message, even if no account exists for this email. This prevents attackers from discovering which emails are registered.
              </p>
            </div>

            <button onClick={handleVerify} className="text-sm text-blue-600 hover:text-blue-800 bg-transparent border-none cursor-pointer">
              Simulate clicking the email link →
            </button>
          </div>
        )}

        {step === "verify" && (
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Identity verified</h2>
            <p className="text-sm text-gray-500 mb-4">Your reset link was valid. You can now set a new password.</p>
            <p className="text-xs text-gray-400 mb-6">
              Token: <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded">a7f3...x9k2</span> (one-time use, expires in 28 min)
            </p>
            <button onClick={() => setStep("reset")} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors border-none cursor-pointer">
              Set new password
            </button>
          </div>
        )}

        {step === "reset" && (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Set new password</h2>
            <p className="text-sm text-gray-500 mb-6">Choose a strong password you haven't used before.</p>
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New password</label>
                <input type="password" placeholder="Minimum 12 characters" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
                <input type="password" placeholder="Re-enter your password" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors">
                Update password
              </button>
            </form>
          </>
        )}

        {step === "done" && (
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Password updated</h2>
            <p className="text-sm text-gray-500 mb-2">Your password has been changed successfully.</p>
            <p className="text-xs text-gray-400 mb-6">All other active sessions have been signed out for security.</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-left">
              <p className="text-xs text-blue-800">
                <strong>What happened behind the scenes:</strong> Reset token invalidated. Previous password hash removed. All sessions revoked. Notification email sent to confirm the change.
              </p>
            </div>
          </div>
        )}
      </div>

      {step !== "email" && (
        <button onClick={reset} className="mt-4 text-xs text-gray-400 hover:text-gray-600 mx-auto block bg-transparent border-none cursor-pointer">
          Reset demo
        </button>
      )}
    </div>
  );
}

export function AccountRecoveryPattern() {
  return (
    <div>
      <PatternHeader
        title="Account Recovery"
        description="Secure password reset flow with email verification, one-time tokens, and session invalidation. Designed to prevent account takeover while keeping the recovery process simple."
        severity="critical"
        tags={["Authentication", "OWASP A07", "CWE-640"]}
      />

      <DemoContainer>
        <AccountRecoveryDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Always show 'Check your email' regardless of whether the account exists (anti-enumeration)",
          "Use one-time, time-limited tokens (30 minutes max)",
          "Invalidate all active sessions after password reset",
          "Send a confirmation email after the password is changed",
          "Show the token expiration time so users know how long they have",
          "Require the new password to be different from the previous one",
        ]}
        donts={[
          "Never reveal whether an email is registered — 'No account found' enables enumeration (CWE-204)",
          "Don't send the new password via email — always use a reset link",
          "Don't allow token reuse — invalidate immediately after use",
          "Don't use security questions as sole verification — they're guessable",
          "Don't keep old sessions alive after a password reset — this defeats the purpose",
          "Don't let the reset link work indefinitely — enforce expiration",
        ]}
        securityRationale="Account recovery is the most attacked authentication flow because it bypasses the password entirely. CWE-640 (Weak Password Recovery Mechanism) is a critical vulnerability. The identical response for existing and non-existing emails prevents account enumeration. One-time tokens prevent replay attacks. Session invalidation ensures an attacker who compromised a session is locked out after the legitimate user resets their password."
        accessibilityNotes={[
          "Multi-step flow shows clear progress — user always knows which step they're on",
          "Security notes are in visible callout boxes, not hidden tooltips",
          "Form inputs have proper labels and autocomplete attributes",
          "Success/error states use icons + text + color — never color alone",
          "The 'Simulate clicking email link' button is clearly marked as a demo action",
        ]}
      />
    </div>
  );
}
