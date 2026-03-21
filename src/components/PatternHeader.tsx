import React from 'react';

interface PatternHeaderProps {
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  tags: string[];
}

const SEVERITY_STYLES: Record<'critical' | 'high' | 'medium' | 'low', React.CSSProperties> = {
  critical: { background: 'rgba(255,51,51,0.15)', color: '#ff3333', border: '1px solid rgba(255,51,51,0.3)' },
  high: { background: 'rgba(255,170,0,0.15)', color: '#ffaa00', border: '1px solid rgba(255,170,0,0.3)' },
  medium: { background: 'rgba(0,229,255,0.15)', color: '#00e5ff', border: '1px solid rgba(0,229,255,0.3)' },
  low: { background: 'rgba(0,255,65,0.15)', color: '#00ff41', border: '1px solid rgba(0,255,65,0.3)' },
};

export function PatternHeader({ title, description, severity, tags }: PatternHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <span
          className="text-xs font-mono font-semibold px-2.5 py-1 rounded tracking-wide"
          style={SEVERITY_STYLES[severity]}
          aria-label={`Severity: ${severity}`}
        >
          {severity.toUpperCase()}
        </span>
        {tags.map((tag) => (
          <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded" style={{ background: "var(--bg-elevated)", color: "var(--text)" }}>
            {tag}
          </span>
        ))}
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold font-mono mb-3 glow-text">{title}</h1>
      <p className="text-base leading-relaxed" style={{ color: "var(--text-bright)" }}>{description}</p>
    </div>
  );
}
