import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPrevNext } from "../data/patterns";

export function PatternNav() {
  const location = useLocation();
  const { prev, next } = getPrevNext(location.pathname);

  if (!prev && !next) return null;

  return (
    <div className="flex items-center justify-between mt-12 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
      {prev ? (
        <Link to={prev.path} className="flex items-center gap-2 no-underline group" style={{ color: "var(--text)" }}>
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <div>
            <p className="text-xs" style={{ color: "#555" }}>Previous</p>
            <p className="text-sm font-mono group-hover:underline" style={{ color: prev.categoryColor }}>{prev.label}</p>
          </div>
        </Link>
      ) : <div />}

      {next ? (
        <Link to={next.path} className="flex items-center gap-2 no-underline group text-right" style={{ color: "var(--text)" }}>
          <div>
            <p className="text-xs" style={{ color: "#555" }}>Next</p>
            <p className="text-sm font-mono group-hover:underline" style={{ color: next.categoryColor }}>{next.label}</p>
          </div>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      ) : <div />}
    </div>
  );
}
