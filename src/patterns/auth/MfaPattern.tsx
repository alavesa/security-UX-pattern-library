import { useState, useRef, useEffect, useCallback } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Smartphone, Shield, Loader2, CheckCircle2, KeyRound, RefreshCw } from "lucide-react";

function MfaDemo() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [status, setStatus] = useState<"input" | "loading" | "success" | "error">("input");
  const [method, setMethod] = useState<"totp" | "sms" | "backup">("totp");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const [backupCode, setBackupCode] = useState("");
  const [failCount, setFailCount] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (method !== "backup") inputRefs.current[0]?.focus();
  }, [method]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleInput = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    setStatus("input");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCode.every(d => d !== "")) {
      submitCode(newCode.join(""));
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      const digits = pasted.split("");
      setCode(digits);
      submitCode(pasted);
    }
  };

  const submitCode = useCallback((codeStr: string) => {
    setStatus("loading");
    setTimeout(() => {
      if (codeStr === "123456") {
        setStatus("success");
      } else {
        setStatus("error");
        setFailCount(c => c + 1);
        setTimeout(() => {
          setCode(["", "", "", "", "", ""]);
          setStatus("input");
          inputRefs.current[0]?.focus();
        }, 1500);
      }
    }, 1200);
  }, []);

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    setResendCount(c => c + 1);
    // Progressive cooldown: 30s, 60s, 120s
    const cooldowns = [30, 60, 120];
    setResendCooldown(cooldowns[Math.min(resendCount, cooldowns.length - 1)]);
  };

  const handleBackupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      if (backupCode.toLowerCase() === "abcd-efgh-1234") {
        setStatus("success");
      } else {
        setStatus("error");
        setTimeout(() => {
          setStatus("input");
          setBackupCode("");
        }, 1500);
      }
    }, 1200);
  };

  const reset = () => {
    setCode(["", "", "", "", "", ""]);
    setStatus("input");
    setFailCount(0);
    setResendCooldown(0);
    setResendCount(0);
    setBackupCode("");
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
        {status === "success" ? (
          <>
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Verified!</h2>
            <p className="text-sm text-gray-500 mb-4">Two-factor authentication complete. Redirecting to your account...</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-left">
              <p className="text-xs text-blue-800">
                <strong>Security note:</strong> After MFA success, log the verification method and timestamp for audit trails. If a backup code was used, remind the user to generate new ones.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {method === "totp" ? <Shield className="w-6 h-6 text-blue-600" /> :
               method === "sms" ? <Smartphone className="w-6 h-6 text-blue-600" /> :
               <KeyRound className="w-6 h-6 text-blue-600" />}
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-1">Two-factor authentication</h2>
            <p className="text-sm text-gray-500 mb-6">
              {method === "totp" ? "Enter the 6-digit code from your authenticator app" :
               method === "sms" ? "Enter the code sent to +358 •••• ••42" :
               "Enter one of your backup codes"}
            </p>

            {/* Method toggle */}
            <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1">
              {(["totp", "sms", "backup"] as const).map(m => (
                <button
                  key={m}
                  onClick={() => { setMethod(m); reset(); }}
                  className={`flex-1 text-xs py-1.5 rounded-md transition-colors border-none cursor-pointer ${
                    method === m ? "bg-white shadow-sm text-gray-900 font-medium" : "text-gray-500 bg-transparent"
                  }`}
                >
                  {m === "totp" ? "Auth App" : m === "sms" ? "SMS" : "Backup"}
                </button>
              ))}
            </div>

            {/* Backup code input */}
            {method === "backup" ? (
              <form onSubmit={handleBackupSubmit}>
                <input
                  type="text"
                  value={backupCode}
                  onChange={e => setBackupCode(e.target.value)}
                  placeholder="XXXX-XXXX-XXXX"
                  className="w-full px-3 py-3 text-center font-mono text-lg border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={status === "loading"}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={status === "loading" || !backupCode}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                  {status === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</> : "Use backup code"}
                </button>
                <p className="text-xs text-amber-600 mt-3">
                  Each backup code can only be used once. You have 7 remaining.
                </p>
              </form>
            ) : (
              <>
                {/* 6-digit code input */}
                <div className="flex gap-1.5 sm:gap-2 justify-center mb-4" role="group" aria-label="Verification code" onPaste={handlePaste}>
                  {code.map((digit, i) => (
                    <input
                      key={i}
                      ref={el => { inputRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleInput(i, e.target.value)}
                      onKeyDown={e => handleKeyDown(i, e)}
                      disabled={status === "loading"}
                      className={`w-9 h-11 sm:w-11 sm:h-13 text-center text-base sm:text-lg font-mono border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        status === "error" ? "border-red-300 focus:ring-red-500 bg-red-50" : "border-gray-300 focus:ring-blue-500"
                      }`}
                      aria-label={`Digit ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Status messages */}
                {status === "loading" && (
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
                  </div>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-600" role="alert">
                    Invalid code. {failCount >= 3 ? "Too many attempts. Try a backup code." : "Please try again."}
                  </p>
                )}

                {/* Resend (SMS only) */}
                {method === "sms" && status === "input" && (
                  <button
                    onClick={handleResend}
                    disabled={resendCooldown > 0}
                    className="flex items-center gap-1.5 text-sm mx-auto mt-4 bg-transparent border-none cursor-pointer disabled:cursor-not-allowed transition-colors"
                    style={{ color: resendCooldown > 0 ? "#999" : "#2563eb" }}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
                  </button>
                )}
              </>
            )}

            {/* Fail count hint */}
            {failCount >= 2 && method !== "backup" && (
              <p className="text-xs text-amber-600 mt-3">
                Having trouble? Try using a <button onClick={() => setMethod("backup")} className="underline bg-transparent border-none cursor-pointer text-amber-600">backup code</button> instead.
              </p>
            )}
          </>
        )}
      </div>

      {/* Demo hints */}
      <div className="mt-4 p-3 rounded-lg text-xs space-y-1" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <p style={{ color: "var(--green)" }}>Try these scenarios:</p>
        <p style={{ color: "var(--text)" }}>
          Code <span className="font-mono" style={{ color: "var(--cyan)" }}>123456</span> → success
        </p>
        <p style={{ color: "var(--text)" }}>
          Backup <span className="font-mono" style={{ color: "var(--cyan)" }}>abcd-efgh-1234</span> → success
        </p>
        <p style={{ color: "var(--text)" }}>Wrong code 3x → suggests backup codes</p>
        <p style={{ color: "var(--text)" }}>SMS tab → resend with progressive cooldown</p>
        <p style={{ color: "var(--text)" }}>Paste a 6-digit code → auto-fills all fields</p>
      </div>

      <button onClick={reset} className="mt-2 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer" style={{ color: "var(--text)" }}>
        Reset demo
      </button>
    </div>
  );
}

export function MfaPattern() {
  return (
    <div>
      <PatternHeader
        title="Multi-Factor Authentication"
        description="Second-factor verification with TOTP, SMS, and backup codes. Auto-advancing inputs, paste support, progressive cooldown on resend, and graceful fallback to backup codes after repeated failures."
        severity="critical"
        tags={["Authentication", "OWASP A07", "CWE-308"]}
      />

      <DemoContainer>
        <MfaDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Auto-advance focus to the next input field after each digit",
          "Auto-submit when all digits are entered — don't require a button click",
          "Support paste — users copy codes from authenticator apps and SMS",
          "Show which method is active and offer alternatives (TOTP, SMS, backup)",
          "Mask the phone number in SMS mode — show only last 2 digits",
          "Provide clear feedback during verification (loading → success/error)",
          "Implement progressive resend cooldown (30s → 60s → 120s) to prevent abuse",
          "Suggest backup codes after 2-3 failed attempts",
          "Show remaining backup code count so users know to generate more",
          "Log the MFA method used for security audit trails",
        ]}
        donts={[
          "Don't accept codes older than 30 seconds (TOTP window) on the server",
          "Don't allow unlimited verification attempts — lock after 5 failures",
          "Don't send codes via SMS as the only option — offer TOTP as primary",
          "Don't auto-fill SMS codes without user confirmation (phishing risk)",
          "Don't clear the code silently on error — show the error first, then clear",
          "Don't use 4-digit codes — 6 digits is the minimum for TOTP (RFC 6238)",
          "Don't allow immediate resend — enforce cooldown to prevent SMS bombing",
          "Don't let backup codes be reused — invalidate immediately after use",
        ]}
        securityRationale="MFA prevents 99.9% of automated account compromise attacks (Microsoft, 2023). TOTP (Time-based One-Time Password) is preferred over SMS because SMS is vulnerable to SIM swapping and SS7 interception. Backup codes provide a critical recovery path when the primary device is lost — without them, users get permanently locked out, which leads to insecure recovery processes. The progressive resend cooldown prevents SMS bombing attacks while still allowing legitimate retries."
        accessibilityNotes={[
          "Input group uses role='group' with aria-label for screen readers",
          "Each input has aria-label='Digit N' for navigation",
          "Status messages use role='alert' for automatic announcement",
          "inputMode='numeric' shows the number keyboard on mobile",
          "Backspace navigates to the previous field for easy correction",
          "Paste support means users don't need to type digit-by-digit",
          "Backup code input accepts flexible formatting (with or without dashes)",
        ]}
      />
    </div>
  );
}
