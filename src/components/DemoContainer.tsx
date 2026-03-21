import type { ReactNode } from "react";

export function DemoContainer({ children, label = "Interactive Demo" }: { children: ReactNode; label?: string }) {
  return (
    <div className="mb-8">
      <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-dim)" }}>
        $ run {label.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")}
      </div>
      <div
        className="border rounded-xl p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[250px] sm:min-h-[300px] overflow-x-auto"
        style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
        role="region"
        aria-label={label}
      >
        {children}
      </div>
    </div>
  );
}
