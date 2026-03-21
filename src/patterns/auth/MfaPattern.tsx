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
  const verifyTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const clearTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const backupInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (method !== "backup") inputRefs.current[0]?.focus();
  }, [method]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Clear pending verification timers on unmount
  useEffect(() => {
    return () => {
      clearTimeout(verifyTimerRef.current);
      clearTimeout(clearTimerRef.current);
    };
  }, []);

  const submitCode = useCallback((codeStr: string) => {
    setStatus("loading");
    verifyTimerRef.current = setTimeout(() => {
      if (codeStr === "123456") {
        setStatus("success");
      } else {
        setStatus("error");
        setFailCount(c => c + 1);
        clearTimerRef.current = setTimeout(() => {
          setCode(["", "", "", "", "", ""]);
          setStatus("input");
          inputRefs.current[0]?.focus();
        }, 1500);
      }
    }, 1200);
  }, []);

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
    verifyTimerRef.current = setTimeout(() => {
      if (backupCode.toLowerCase() === "abcd-efgh-1234") {
        setStatus("success");
      } else {
        setStatus("error");
        setFailCount(c => c + 1);
        clearTimerRef.current = setTimeout(() => {
          setStatus("input");
          setBackupCode("");
          backupInputRef.current?.focus();
        }, 1500);
      }
    }, 1200);
  };

  const reset = () => {
    clearTimeout(verifyTimerRef.current);
    clearTimeout(clearTimerRef.current);
    setCode(["", "", "", "", "", ""]);
    setStatus("input");
    setFailCount(0);
    setResendCooldown(0);
    setResendCount(0);
    setBackupCode("");
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-2xl p-8 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {status === "success" ? (
          <>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(0,255,65,0.1)" }}>
              <CheckCircle2 className="w-7 h-7" style={{ color: "var(--green)" }} />
            </div>
            <h2 className="text-xl font-bold font-mono mb-1" style={{ color: "var(--green)" }}>Verified!</h2>
            <p className="text-sm font-mono mb-4" style={{ color: "var(--text)" }}>Two-factor authentication complete. Redirecting to your account...</p>
            <div className="rounded-lg p-3 text-left" style={{ background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.2)" }}>
              <p className="text-xs font-mono" style={{ color: "var(--text)" }}>
                <strong style={{ color: "var(--cyan)" }}>Security note:</strong> After MFA success, log the verification method and timestamp for audit trails. If a backup code was used, remind the user to generate new ones.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(0,255,65,0.1)" }}>
              {method === "totp" ? <Shield className="w-6 h-6" style={{ color: "var(--green)" }} /> :
               method === "sms" ? <Smartphone className="w-6 h-6" style={{ color: "var(--green)" }} /> :
               <KeyRound className="w-6 h-6" style={{ color: "var(--green)" }} />}
            </div>

            <h2 className="text-xl font-bold font-mono mb-1" style={{ color: "var(--text-bright)" }}>Two-factor authentication</h2>
            <p className="text-sm font-mono mb-6" style={{ color: "var(--text)" }}>
              {method === "totp" ? "Enter the 6-digit code from your authenticator app" :
               method === "sms" ? "Enter the code sent to +358 •••• ••42" :
               "Enter one of your backup codes"}
            </p>

            {/* Method toggle */}
            <div className="flex gap-1 mb-6 rounded-lg p-1" style={{ background: "var(--bg)" }}>
              {(["totp", "sms", "backup"] as const).map(m => (
                <button
                  key={m}
                  onClick={() => { setMethod(m); reset(); }}
                  className="flex-1 text-xs font-mono py-1.5 rounded-md transition-colors border-none cursor-pointer"
                  style={{ background: method === m ? "var(--green-glow)" : "transparent", color: method === m ? "var(--green)" : "var(--text)", fontWeight: method === m ? 600 : 400 }}
                >
                  {m === "totp" ? "Auth App" : m === "sms" ? "SMS" : "Backup"}
                </button>
              ))}
            </div>

            {/* Backup code input */}
            {method === "backup" ? (
              <form onSubmit={handleBackupSubmit}>
                <input
                  ref={backupInputRef}
                  type="text"
                  value={backupCode}
                  onChange={e => setBackupCode(e.target.value)}
                  placeholder="XXXX-XXXX-XXXX"
                  className="w-full px-3 py-3 text-center font-mono text-lg rounded-lg mb-4 focus:outline-none"
                  style={{ background: "var(--bg)", color: "var(--text-bright)", border: "1px solid var(--border)" }}
                  disabled={status === "loading"}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={status === "loading" || !backupCode}
                  className="w-full py-2.5 rounded-lg font-medium font-mono text-sm disabled:opacity-50 transition-colors flex items-center justify-center gap-2 border-none cursor-pointer"
                  style={{ background: "var(--green)", color: "var(--bg)" }}
                >
                  {status === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</> : "Use backup code"}
                </button>
                <p className="text-xs font-mono mt-3" style={{ color: "var(--text-dim)" }}>
                  {/* TODO: fetch remaining count from server — never hardcode this value */}
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
                      autoComplete="one-time-code"
                      disabled={status === "loading"}
                      className="w-9 h-11 sm:w-11 sm:h-14 text-center text-base sm:text-lg font-mono rounded-lg focus:outline-none transition-colors"
                      style={{ background: "var(--bg)", color: "var(--text-bright)", border: `1px solid ${status === "error" ? "var(--red)" : "var(--border)"}` }}
                      aria-label={`Digit ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Status messages */}
                {status === "loading" && (
                  <div className="flex items-center justify-center gap-2 text-sm font-mono" style={{ color: "var(--text)" }}>
                    <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
                  </div>
                )}
                {status === "error" && (
                  <p className="text-sm font-mono" role="alert" style={{ color: "var(--red)" }}>
                    Invalid code. {failCount >= 3 ? "Too many attempts. Try a backup code." : "Please try again."}
                  </p>
                )}

                {/* Resend (SMS only) */}
                {method === "sms" && status === "input" && (
                  <button
                    onClick={handleResend}
                    disabled={resendCooldown > 0}
                    className="flex items-center gap-1.5 text-sm font-mono mx-auto mt-4 bg-transparent border-none cursor-pointer disabled:cursor-not-allowed transition-colors"
                    style={{ color: resendCooldown > 0 ? "var(--text-dim)" : "var(--green)" }}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
                  </button>
                )}
              </>
            )}

            {/* Fail count hint */}
            {failCount >= 2 && method !== "backup" && (
              <p className="text-xs font-mono mt-3" style={{ color: "var(--text)" }}>
                Having trouble? Try using a <button onClick={() => setMethod("backup")} className="underline bg-transparent border-none cursor-pointer font-mono" style={{ color: "var(--green)" }}>backup code</button> instead.
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
