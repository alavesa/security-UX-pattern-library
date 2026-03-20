import type { ReactNode } from "react";
import { PatternNav } from "../components/PatternNav";

export function PatternPage({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-4xl">
      {children}
      <PatternNav />
    </div>
  );
}
