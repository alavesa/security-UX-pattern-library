import type { ReactNode } from "react";

export function PatternPage({ children }: { children: ReactNode }) {
  return <div className="max-w-4xl">{children}</div>;
}
