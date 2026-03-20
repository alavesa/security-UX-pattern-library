import { useState, useRef, useEffect } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Smartphone, Shield, Loader2, CheckCircle2 } from "lucide-react";

function MfaDemo() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [status, setStatus] = useState<"input" | "loading" | "success" | "error">("input");
  const [method, setMethod] = useState<"totp" | "sms">("totp");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, [method]);

  const handleInput = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    setStatus("input");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all filled
    if (newCode.every(d => d !== "")) {
      setStatus("loading");
      setTimeout(() => {
        if (newCode.join("") === "123456") {
          setStatus("success");
        } else {
          setStatus("error");
          setTimeout(() => {
            setCode(["", "", "", "", "", ""]);
            setStatus("input");
            inputRefs.current[0]?.focus();
          }, 1500);
        }
      }, 1200);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const reset = () => {
    setCode(["", "", "", "", "", ""]);
    setStatus("input");
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          {method === "totp" ? <Shield className="w-6 h-6 text-blue-600" /> : <Smartphone className="w-6 h-6 text-blue-600" />}
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-1">Two-factor authentication</h2>
        <p className="text-sm text-gray-500 mb-6">
          {method === "totp"
            ? "Enter the 6-digit code from your authenticator app"
            : "Enter the code sent to +358 •••• ••42"}
        </p>

        {/* Method toggle */}
        <div className="flex gap-2 mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => { setMethod("totp"); reset(); }}
            className={`flex-1 text-xs py-1.5 rounded-md transition-colors border-none cursor-pointer ${method === "totp" ? "bg-white shadow-sm text-gray-900 font-medium" : "text-gray-500 bg-transparent"}`}
          >
            Authenticator App
          </button>
          <button
            onClick={() => { setMethod("sms"); reset(); }}
            className={`flex-1 text-xs py-1.5 rounded-md transition-colors border-none cursor-pointer ${method === "sms" ? "bg-white shadow-sm text-gray-900 font-medium" : "text-gray-500 bg-transparent"}`}
          >
            SMS Code
          </button>
        </div>

        {/* Code input */}
        <div className="flex gap-2 justify-center mb-4" role="group" aria-label="Verification code">
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
              disabled={status === "loading" || status === "success"}
              className={`w-11 h-13 text-center text-lg font-mono border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                status === "error"
                  ? "border-red-300 focus:ring-red-500 bg-red-50"
                  : status === "success"
                  ? "border-green-300 bg-green-50"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>

        {/* Status */}
        {status === "loading" && (
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
          </div>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600" role="alert">Invalid code. Please try again.</p>
        )}
        {status === "success" && (
          <div className="flex items-center justify-center gap-2 text-sm text-green-600" role="alert">
            <CheckCircle2 className="w-4 h-4" /> Verified! Redirecting...
          </div>
        )}

        <p className="text-xs text-gray-400 mt-6">
          Try <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded">123456</span> to see success
        </p>
      </div>

      <button onClick={reset} className="mt-4 text-xs text-gray-400 hover:text-gray-600 mx-auto block bg-transparent border-none cursor-pointer">
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
        description="Second-factor verification with TOTP and SMS code entry. Auto-advancing input fields, clear method switching, and helpful error recovery."
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
          "Show which method is active and offer alternatives",
          "Mask the phone number in SMS mode — show only last 2 digits",
          "Provide clear feedback during verification (loading → success/error)",
        ]}
        donts={[
          "Don't accept codes older than 30 seconds (TOTP window) on the server",
          "Don't allow unlimited verification attempts — lock after 5 failures",
          "Don't send codes via SMS as the only option — offer TOTP as primary",
          "Don't auto-fill SMS codes without user confirmation (phishing risk)",
          "Don't clear the code silently on error — show the error first, then clear",
          "Don't use 4-digit codes — 6 digits is the minimum for TOTP (RFC 6238)",
        ]}
        securityRationale="MFA prevents 99.9% of automated account compromise attacks (Microsoft, 2023). TOTP (Time-based One-Time Password) is preferred over SMS because SMS is vulnerable to SIM swapping and SS7 interception. The UX must make TOTP the easy default while keeping SMS as a fallback — if MFA is too annoying, users disable it."
        accessibilityNotes={[
          "Input group uses role='group' with aria-label for screen readers",
          "Each input has aria-label='Digit N' for navigation",
          "Status messages use role='alert' for automatic announcement",
          "inputMode='numeric' shows the number keyboard on mobile",
          "Backspace navigates to the previous field for easy correction",
        ]}
      />
    </div>
  );
}
