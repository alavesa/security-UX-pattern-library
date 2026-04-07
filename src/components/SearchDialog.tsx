import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { ALL_PATTERNS, type PatternInfo } from "../data/patterns";

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const resultRefs = useRef<(HTMLDivElement | null)[]>([]);
  const triggerRef = useRef<HTMLElement | null>(null);
  const isKeyboardNav = useRef(false);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.toLowerCase();
    return query.length > 0
      ? ALL_PATTERNS.filter(p =>
          p.label.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
        )
      : ALL_PATTERNS;
  }, [query]);

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement;
      setQuery("");
      setSelectedIndex(0);
      const id = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    resultRefs.current[selectedIndex]?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const handleClose = () => {
    triggerRef.current?.focus();
    onClose();
  };

  const go = (pattern: PatternInfo) => {
    navigate(pattern.path);
    handleClose();
  };

  const handleDialogKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Tab") {
      const focusable = dialogRef.current
        ? Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, input, [tabindex]:not([tabindex="-1"])'))
        : [];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      isKeyboardNav.current = true;
      setSelectedIndex(i => results.length === 0 ? 0 : Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      isKeyboardNav.current = true;
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      go(results[selectedIndex]);
    } else if (e.key === "Escape") {
      handleClose();
    }
  };

  if (!open) return null;

  resultRefs.current = resultRefs.current.slice(0, results.length);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={handleClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search patterns"
        className="relative w-full max-w-lg rounded-xl overflow-hidden shadow-2xl"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        onClick={e => e.stopPropagation()}
        onKeyDown={handleDialogKeyDown}
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
            role="combobox"
            aria-expanded={true}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            aria-controls="search-results-list"
            aria-activedescendant={results[selectedIndex] ? `search-result-${selectedIndex}` : undefined}
            aria-label="Search patterns"
          />
          <button type="button" onClick={handleClose} aria-label="Close search" className="bg-transparent border-none cursor-pointer p-0.5" style={{ color: "var(--text-dim)" }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {results.length} result{results.length !== 1 ? "s" : ""} found
        </div>
        <div id="search-results-list" role="listbox" className="max-h-[50vh] overflow-y-auto py-2">
          {results.length === 0 && (
            <p className="text-center text-xs font-mono py-8" style={{ color: "var(--text-dim)" }}>No patterns found for "{query}"</p>
          )}
          {results.map((pattern, i) => (
            <div
              key={pattern.path}
              ref={el => { resultRefs.current[i] = el; }}
              id={`search-result-${i}`}
              role="option"
              aria-selected={i === selectedIndex}
              onClick={() => go(pattern)}
              className="w-full flex items-center justify-between px-4 py-2.5 text-left bg-transparent border-none cursor-pointer transition-colors"
              style={{
                background: i === selectedIndex ? "var(--green-glow)" : "transparent",
              }}
              onMouseMove={() => { if (!isKeyboardNav.current) { setSelectedIndex(i); } isKeyboardNav.current = false; }}
            >
              <div>
                <span className="block font-mono text-sm" style={{ color: i === selectedIndex ? "var(--text-bright)" : "var(--text)" }}>
                  {pattern.label}
                </span>
                <span className="block text-xs" style={{ color: "var(--text-dim)" }}>
                  {pattern.category}/
                </span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${pattern.categoryColor}15`, color: pattern.categoryColor }}>
                {pattern.category}
              </span>
            </div>
          ))}
        </div>

        {/* Footer hint */}
        <div className="border-t px-4 py-2 flex items-center gap-4 text-xs font-mono" style={{ borderColor: "var(--border)", color: "var(--text-dim)" }}>
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
