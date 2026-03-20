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
        <div className="border border-green-200 bg-green-50/50 rounded-xl p-5">
          <h3 className="flex items-center gap-2 font-semibold text-green-800 mb-3">
            <CheckCircle2 className="w-5 h-5" />
            Do
          </h3>
          <ul className="space-y-2">
            {dos.map((item, i) => (
              <li key={i} className="text-sm text-green-900 flex items-start gap-2">
                <span className="text-green-500 mt-0.5">+</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-red-200 bg-red-50/50 rounded-xl p-5">
          <h3 className="flex items-center gap-2 font-semibold text-red-800 mb-3">
            <XCircle className="w-5 h-5" />
            Don't
          </h3>
          <ul className="space-y-2">
            {donts.map((item, i) => (
              <li key={i} className="text-sm text-red-900 flex items-start gap-2">
                <span className="text-red-500 mt-0.5">-</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Security Rationale */}
      <div className="border border-blue-200 bg-blue-50/50 rounded-xl p-5">
        <h3 className="flex items-center gap-2 font-semibold text-blue-800 mb-2">
          <Shield className="w-5 h-5" />
          Security Rationale
        </h3>
        <p className="text-sm text-blue-900 leading-relaxed">{securityRationale}</p>
      </div>

      {/* Accessibility */}
      {accessibilityNotes && accessibilityNotes.length > 0 && (
        <div className="border border-purple-200 bg-purple-50/50 rounded-xl p-5">
          <h3 className="flex items-center gap-2 font-semibold text-purple-800 mb-3">
            <AlertTriangle className="w-5 h-5" />
            Accessibility Notes
          </h3>
          <ul className="space-y-2">
            {accessibilityNotes.map((note, i) => (
              <li key={i} className="text-sm text-purple-900">{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
