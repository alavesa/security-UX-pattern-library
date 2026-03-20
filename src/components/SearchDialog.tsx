import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { ALL_PATTERNS, type PatternInfo } from "../data/patterns";

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = query.length > 0
    ? ALL_PATTERNS.filter(p =>
        p.label.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_PATTERNS;

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const go = (pattern: PatternInfo) => {
    navigate(pattern.path);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      go(results[selectedIndex]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative w-full max-w-lg rounded-xl overflow-hidden shadow-2xl"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
          <Search className="w-4 h-4 shrink-0" style={{ color: "var(--green)" }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search patterns, OWASP, GDPR, CWE..."
            className="flex-1 bg-transparent border-none outline-none font-mono text-sm"
            style={{ color: "var(--text-bright)" }}
          />
          <button onClick={onClose} className="bg-transparent border-none cursor-pointer p-0.5" style={{ color: "#555" }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto py-2">
          {results.length === 0 && (
            <p className="text-center text-xs font-mono py-8" style={{ color: "#555" }}>No patterns found for "{query}"</p>
          )}
          {results.map((pattern, i) => (
            <button
              key={pattern.path}
              onClick={() => go(pattern)}
              className="w-full flex items-center justify-between px-4 py-2.5 text-left bg-transparent border-none cursor-pointer transition-colors"
              style={{
                background: i === selectedIndex ? "var(--green-glow)" : "transparent",
              }}
              onMouseEnter={() => setSelectedIndex(i)}
            >
              <div>
                <p className="font-mono text-sm" style={{ color: i === selectedIndex ? "var(--text-bright)" : "var(--text)" }}>
                  {pattern.label}
                </p>
                <p className="text-xs" style={{ color: "#555" }}>
                  {pattern.category}/
                </p>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${pattern.categoryColor}15`, color: pattern.categoryColor }}>
                {pattern.category}
              </span>
            </button>
          ))}
        </div>

        {/* Footer hint */}
        <div className="border-t px-4 py-2 flex items-center gap-4 text-xs font-mono" style={{ borderColor: "var(--border)", color: "#444" }}>
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
