import type { ReactNode } from "react";

export function DemoContainer({ children, label = "Interactive Demo" }: { children: ReactNode; label?: string }) {
  return (
    <div className="mb-8">
      <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "#444" }}>
        $ run {label.toLowerCase().replace(/ /g, "_")}
      </div>
      <div
        className="border rounded-xl p-8 flex items-center justify-center min-h-[300px]"
        style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
      >
        {children}
      </div>
    </div>
  );
}
