import { CheckCircle2, XCircle, AlertTriangle, Shield } from "lucide-react";

interface GuidelineSectionProps {
  dos: string[];
  donts: string[];
  securityRationale: string;
  accessibilityNotes?: string[];
}

export function GuidelineSection({ dos, donts, securityRationale, accessibilityNotes }: GuidelineSectionProps) {
  return (
    <div className="space-y-6">
      {/* Do / Don't */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border rounded-xl p-5" style={{ borderColor: "rgba(0,255,65,0.2)", background: "rgba(0,255,65,0.05)" }}>
          <h3 className="flex items-center gap-2 font-mono font-semibold text-sm mb-3" style={{ color: "var(--green)" }}>
            <CheckCircle2 className="w-4 h-4" />
            // DO
          </h3>
          <ul className="space-y-2">
            {dos.map((item, i) => (
              <li key={i} className="text-sm flex items-start gap-2" style={{ color: "var(--text-bright)" }}>
                <span style={{ color: "var(--green)" }} className="mt-0.5 font-mono">+</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="border rounded-xl p-5" style={{ borderColor: "rgba(255,51,51,0.2)", background: "rgba(255,51,51,0.05)" }}>
          <h3 className="flex items-center gap-2 font-mono font-semibold text-sm mb-3" style={{ color: "var(--red)" }}>
            <XCircle className="w-4 h-4" />
            // DON'T
          </h3>
          <ul className="space-y-2">
            {donts.map((item, i) => (
              <li key={i} className="text-sm flex items-start gap-2" style={{ color: "var(--text-bright)" }}>
                <span style={{ color: "var(--red)" }} className="mt-0.5 font-mono">-</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Security Rationale */}
      <div className="border rounded-xl p-5" style={{ borderColor: "rgba(0,229,255,0.2)", background: "rgba(0,229,255,0.05)" }}>
        <h3 className="flex items-center gap-2 font-mono font-semibold text-sm mb-2" style={{ color: "var(--cyan)" }}>
          <Shield className="w-4 h-4" />
          // SECURITY_RATIONALE
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-bright)" }}>{securityRationale}</p>
      </div>

      {/* Accessibility */}
      {accessibilityNotes && accessibilityNotes.length > 0 && (
        <div className="border rounded-xl p-5" style={{ borderColor: "rgba(255,170,0,0.2)", background: "rgba(255,170,0,0.05)" }}>
          <h3 className="flex items-center gap-2 font-mono font-semibold text-sm mb-3" style={{ color: "var(--amber)" }}>
            <AlertTriangle className="w-4 h-4" />
            // ACCESSIBILITY
          </h3>
          <ul className="space-y-2">
            {accessibilityNotes.map((note, i) => (
              <li key={i} className="text-sm" style={{ color: "var(--text-bright)" }}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
