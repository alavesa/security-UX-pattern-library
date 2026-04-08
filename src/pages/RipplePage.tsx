import { useState } from "react";
import { Link } from "react-router-dom";
import { Waves, Copy, CheckCheck, Sparkles, Shield, Brain, Layers, ArrowRight } from "lucide-react";
import { buildRipplePrompt, EXAMPLE_HEADLINES, matchPatternsToHeadline } from "../data/ripplePrompt";
import { type PatternInfo } from "../data/patterns";

export function RipplePage() {
  const [headline, setHeadline] = useState("");
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const [matchedPatterns, setMatchedPatterns] = useState<PatternInfo[]>([]);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    if (!headline.trim()) return;
    setPrompt(buildRipplePrompt(headline.trim()));
    setMatchedPatterns(matchPatternsToHeadline(headline.trim()));
    setAnalyzed(true);
  };

  const handleCopy = () => {
    if (!prompt) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(prompt).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }
  };

  const handleExample = (text: string) => {
    setHeadline(text);
    setAnalyzed(false);
    setPrompt("");
    setMatchedPatterns([]);
  };

  const handleReset = () => {
    setHeadline("");
    setPrompt("");
    setMatchedPatterns([]);
    setAnalyzed(false);
    setCopied(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <Waves className="w-5 h-5" style={{ color: "var(--cyan)" }} />
          <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "var(--cyan-glow)", color: "var(--cyan)", border: "1px solid var(--cyan-border)" }}>
            live
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-mono mb-3" style={{ color: "var(--cyan)", textShadow: "0 0 20px var(--cyan-glow)" }}>
          $ live --ripple
        </h1>
        <p className="text-base" style={{ color: "var(--text-bright)" }}>
          Paste any headline. Trace the ripple through UX, security, and compliance.
        </p>
        <p className="text-sm mt-2" style={{ color: "var(--text)" }}>
          Ripple generates a structured analysis prompt powered by the{" "}
          <Link to="/" className="no-underline" style={{ color: "var(--cyan)" }}>34 uxsec.dev patterns</Link>
          {" "}— copy it into{" "}
          <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: "var(--cyan)" }}>Claude</a> or ChatGPT.
        </p>
      </div>

      {/* How Ripple works */}
      <div className="rounded-2xl p-4 sm:p-6 mb-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <h2 className="text-sm font-mono font-bold mb-4" style={{ color: "var(--text-bright)" }}>How Ripple works</h2>

        {/* Steps */}
        <div className="grid sm:grid-cols-3 gap-3 mb-5">
          {[
            { step: "01", label: "Paste a headline", desc: "Any news event, breach report, or regulation update" },
            { step: "02", label: "Copy the prompt", desc: "Ripple builds a structured prompt with all 34 patterns as context" },
            { step: "03", label: "Paste into an LLM", desc: "Claude or ChatGPT analyzes through three lenses" },
          ].map(({ step, label, desc }) => (
            <div key={step} className="flex gap-3">
              <span className="font-mono font-bold text-lg shrink-0" style={{ color: "var(--cyan)" }}>{step}</span>
              <div>
                <p className="text-sm font-mono font-bold" style={{ color: "var(--text-bright)" }}>{label}</p>
                <p className="text-xs font-mono mt-1" style={{ color: "var(--text)" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t my-4" style={{ borderColor: "var(--border)" }} />

        {/* Three lenses */}
        <p className="text-xs font-mono mb-3" style={{ color: "var(--text)" }}>Three lenses — each surfaces a different class of second-order effects:</p>
        <div className="space-y-2 text-xs font-mono mb-4">
          <p><span style={{ color: "var(--cyan)" }}>UX & Design Systems</span> — how the event changes what interfaces need to do</p>
          <p><span style={{ color: "var(--green)" }}>Security & Compliance</span> — cybersecurity implications and the most relevant regulatory frameworks</p>
          <p><span style={{ color: "var(--ai-color)" }}>AI & Emerging Risk</span> — AI governance, generative UI, supply chain trust</p>
        </div>

        <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>
          Ripple is a prompt generator — no API keys, no accounts, no data sent anywhere. You choose the LLM.
        </p>
      </div>

      {/* Input section */}
      <div className="rounded-2xl p-4 sm:p-6 mb-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <label htmlFor="headline-input" className="block text-xs font-mono font-bold mb-2" style={{ color: "var(--cyan)" }}>
          $ input --headline
        </label>
        <textarea
          id="headline-input"
          value={headline}
          onChange={(e) => { setHeadline(e.target.value); if (analyzed) setAnalyzed(false); }}
          placeholder="Paste a news headline or describe a security event..."
          rows={3}
          className="w-full rounded-lg p-3 font-mono text-sm resize-none border"
          style={{ background: "var(--bg)", color: "var(--text-bright)", borderColor: "var(--border)", outline: "none" }}
          onFocus={(e) => { e.target.style.borderColor = "var(--cyan)"; }}
          onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
          onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); handleAnalyze(); } }}
        />

        {/* Example chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>try:</span>
          {EXAMPLE_HEADLINES.map(({ label, headline: h }) => (
            <button
              key={label}
              onClick={() => handleExample(h)}
              className="text-xs font-mono px-2.5 py-1 rounded-md border-none cursor-pointer transition-colors"
              style={{ background: "var(--bg-elevated)", color: "var(--text)", border: "1px solid var(--border)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--cyan-border)"; e.currentTarget.style.color = "var(--cyan)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleAnalyze}
            disabled={!headline.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm border-none cursor-pointer transition-opacity"
            style={{
              background: headline.trim() ? "var(--cyan)" : "var(--bg-elevated)",
              color: headline.trim() ? "var(--bg)" : "var(--text-dim)",
              opacity: headline.trim() ? 1 : 0.5,
              cursor: headline.trim() ? "pointer" : "not-allowed",
            }}
          >
            <Waves className="w-4 h-4" /> Generate prompt
          </button>
          {analyzed && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-sm cursor-pointer"
              style={{ background: "transparent", color: "var(--text)", border: "1px solid var(--border)" }}
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Output section */}
      {analyzed && prompt && (
        <>
          {/* Three lenses preview */}
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { icon: Layers, label: "UX & Design Systems", color: "var(--cyan)", desc: "Design tokens, component libraries, interface patterns" },
              { icon: Shield, label: "Security & Compliance", color: "var(--green)", desc: "Cybersecurity implications, relevant regulatory frameworks" },
              { icon: Brain, label: "AI & Emerging Risk", color: "var(--ai-color)", desc: "AI governance, generative UI, supply chain trust" },
            ].map(({ icon: Icon, label, color, desc }) => (
              <div
                key={label}
                className="rounded-xl p-4"
                style={{ background: "var(--bg-card)", border: `1px solid color-mix(in srgb, ${color} 30%, transparent)` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4" style={{ color }} />
                  <span className="text-xs font-mono font-bold" style={{ color }}>{label}</span>
                </div>
                <p className="text-xs font-mono" style={{ color: "var(--text)" }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Prompt output */}
          <div className="rounded-2xl p-4 sm:p-6 mb-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-mono font-bold flex items-center gap-2" style={{ color: "var(--cyan)" }}>
                $ output --prompt
              </h2>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs border-none cursor-pointer"
                style={{ background: copied ? "var(--green)" : "var(--cyan)", color: "var(--bg)" }}
              >
                {copied ? <><CheckCheck className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy prompt</>}
              </button>
            </div>
            <p className="text-xs font-mono mb-3" style={{ color: "var(--text)" }}>
              Paste this into{" "}
              <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: "var(--cyan)" }}>Claude</a>
              {" "}or ChatGPT for a full three-lens analysis.
            </p>
            <pre
              className="rounded-lg p-4 text-xs font-mono overflow-x-auto max-h-80 overflow-y-auto whitespace-pre-wrap"
              style={{ background: "var(--bg)", color: "var(--text-bright)", border: "1px solid var(--border)" }}
            >
              {prompt}
            </pre>
          </div>

          {/* Related patterns */}
          {matchedPatterns.length > 0 && (
            <div className="rounded-2xl p-4 sm:p-6 mb-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <h2 className="text-xs font-mono font-bold mb-3 flex items-center gap-2" style={{ color: "var(--cyan)" }}>
                <Sparkles className="w-3.5 h-3.5" /> Related patterns
              </h2>
              <p className="text-xs font-mono mb-4" style={{ color: "var(--text)" }}>
                Keyword-matched against pattern tags and categories. The LLM will make deeper connections — these are a starting point.
              </p>
              <div className="space-y-2">
                {matchedPatterns.map((p) => (
                  <Link
                    key={p.path}
                    to={p.path}
                    className="flex items-center justify-between p-2.5 rounded-lg no-underline transition-colors"
                    style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = p.categoryColor; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
                        style={{ background: `color-mix(in srgb, ${p.categoryColor} 15%, transparent)`, color: p.categoryColor }}
                      >
                        {p.category}
                      </span>
                      <span className="text-sm font-mono" style={{ color: "var(--text-bright)" }}>{p.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5" style={{ color: "var(--text-dim)" }} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Sources & inspiration */}
      <div className="rounded-2xl p-4 sm:p-6 mt-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <h2 className="text-sm font-mono font-bold mb-2" style={{ color: "var(--text-bright)" }}>Sources & inspiration</h2>
        <p className="text-xs font-mono mb-3" style={{ color: "var(--text)" }}>
          The three-lens model is informed by how second-order effects propagate through interconnected systems — a news event triggers regulatory responses, which create design requirements, which surface security trade-offs. This thinking is rooted in systems theory and the regulatory feedback loops documented across EU digital policy.
        </p>
        <p className="text-xs font-mono mb-4" style={{ color: "var(--text-dim)" }}>
          The pattern taxonomy draws from OWASP (web security), IEC 62443 (industrial security), ENISA threat landscape reports (EU threat intelligence), EU AI Act / NIS2 directive texts, and ISO/IEC 42001 (AI management systems). Prompt engineering approach inspired by chain-of-thought reasoning and domain-specific knowledge injection techniques.
        </p>
        <div className="flex flex-wrap gap-1.5 text-xs font-mono">
          {[
            { label: "NIS2 Directive", url: "https://eur-lex.europa.eu/eli/dir/2022/2555" },
            { label: "EU AI Act", url: "https://artificialintelligenceact.eu/" },
            { label: "ISO/IEC 42001", url: "https://www.iso.org/standard/42001" },
            { label: "GDPR", url: "https://gdpr-info.eu/" },
            { label: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" },
            { label: "IEC 62443", url: "https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series" },
            { label: "ENISA Threat Landscape", url: "https://www.enisa.europa.eu/publications/enisa-threat-landscape-2024" },
            { label: "Cyber Resilience Act", url: "https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act" },
            { label: "DORA", url: "https://eur-lex.europa.eu/eli/reg/2022/2554" },
          ].map(({ label, url }) => (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="px-2 py-1 rounded no-underline hover:underline" style={{ background: "var(--bg)", color: "var(--cyan)", border: "1px solid var(--border)" }}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
