import type { ReactNode } from "react";

interface PatternHeaderProps {
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  tags: string[];
  children?: ReactNode;
}

const SEVERITY_STYLES = {
  critical: "bg-red-50 text-red-700 border-red-200",
  high: "bg-orange-50 text-orange-700 border-orange-200",
  medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
  low: "bg-green-50 text-green-700 border-green-200",
};

export function PatternHeader({ title, description, severity, tags }: PatternHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${SEVERITY_STYLES[severity]}`}>
          {severity.toUpperCase()} SECURITY IMPACT
        </span>
        {tags.map(tag => (
          <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
      <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
