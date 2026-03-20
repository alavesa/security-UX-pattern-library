import type { ReactNode } from "react";

export function DemoContainer({ children, label = "Interactive Demo" }: { children: ReactNode; label?: string }) {
  return (
    <div className="mb-8">
      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">{label}</div>
      <div className="bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-200 rounded-xl p-8 flex items-center justify-center min-h-[300px]">
        {children}
      </div>
    </div>
  );
}
