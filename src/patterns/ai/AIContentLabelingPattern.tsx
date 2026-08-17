import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Bot, CheckCircle2, AlertTriangle, Info, Sparkles } from "lucide-react";
import aiBasicBlack from "../../assets/eu-icons/ai-basic-black.svg";
import aiBasicBlackT from "../../assets/eu-icons/ai-basic-black-transparent.svg";
import aiBasicWhite from "../../assets/eu-icons/ai-basic-white.svg";
import aiBasicWhiteT from "../../assets/eu-icons/ai-basic-white-transparent.svg";
import aiGeneratedBlack from "../../assets/eu-icons/ai-generated-black.svg";
import aiGeneratedBlackT from "../../assets/eu-icons/ai-generated-black-transparent.svg";
import aiGeneratedWhite from "../../assets/eu-icons/ai-generated-white.svg";
import aiGeneratedWhiteT from "../../assets/eu-icons/ai-generated-white-transparent.svg";
import aiModifiedBlack from "../../assets/eu-icons/ai-modified-black.svg";
import aiModifiedBlackT from "../../assets/eu-icons/ai-modified-black-transparent.svg";
import aiModifiedWhite from "../../assets/eu-icons/ai-modified-white.svg";
import aiModifiedWhiteT from "../../assets/eu-icons/ai-modified-white-transparent.svg";

const EU_ICONS = [
  {
    name: "AI (basic icon)",
    use: "AI involvement in deepfakes or published text — or alongside a custom label of your own",
    tall: true,
    variants: { black: aiBasicBlack, blackT: aiBasicBlackT, white: aiBasicWhite, whiteT: aiBasicWhiteT },
  },
  {
    name: "AI GENERATED",
    use: "Content entirely created by AI, with no human-made elements beyond prompting",
    tall: false,
    variants: { black: aiGeneratedBlack, blackT: aiGeneratedBlackT, white: aiGeneratedWhite, whiteT: aiGeneratedWhiteT },
  },
  {
    name: "AI MODIFIED",
    use: "Pre-existing human content partially altered with AI (edits, background swaps, voice cloning)",
    tall: false,
    variants: { black: aiModifiedBlack, blackT: aiModifiedBlackT, white: aiModifiedWhite, whiteT: aiModifiedWhiteT },
  },
];

function AIContentLabelingDemo() {
  const [scenario, setScenario] = useState<"social" | "article" | "image" | "euicons">("social");

  return (
    <div className="w-full max-w-lg">
      <div role="tablist" className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {(["social", "article", "image", "euicons"] as const).map(s => (
          <button type="button" role="tab" aria-selected={scenario === s} aria-controls={`tabpanel-${s}`} id={`tab-${s}`} key={s} onClick={() => setScenario(s)} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: scenario === s ? "var(--ai-glow)" : "transparent", color: scenario === s ? "var(--ai-color)" : "var(--text)" }}>
            {s === "social" ? "Social Feed" : s === "article" ? "Article" : s === "image" ? "Image/Media" : "EU Icons"}
          </button>
        ))}
      </div>

      {/* Social media feed with AI labels */}
      {scenario === "social" && (
        <div role="tabpanel" id="tabpanel-social" aria-labelledby="tab-social" className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
            <h3 className="text-sm font-semibold font-mono" style={{ color: "var(--text-bright)" }}>Your Feed</h3>
          </div>

          {/* Human post */}
          <div className="p-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs" style={{ background: "var(--bg-elevated)", color: "var(--text-bright)" }}>JD</div>
              <div>
                <p className="text-sm font-medium font-mono" style={{ color: "var(--text-bright)" }}>Jane Doe</p>
                <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>2 hours ago</p>
              </div>
            </div>
            <p className="text-sm font-mono" style={{ color: "var(--text-bright)" }}>Just finished hiking Mt. Rainier! The view from the summit was incredible.</p>
            <div className="mt-2 rounded-lg h-32 flex items-center justify-center text-xs font-mono" style={{ background: "var(--bg-elevated)", color: "var(--text-dim)" }}>
              [Photo]
            </div>
          </div>

          {/* AI-generated post */}
          <div className="p-4" style={{ background: "rgba(192,132,252,0.05)", borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(192,132,252,0.15)" }}>
                <Sparkles className="w-4 h-4" style={{ color: "#c084fc" }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium font-mono" style={{ color: "var(--text-bright)" }}>Travel Weekly</p>
                  <span className="text-xs px-1.5 py-0.5 rounded flex items-center gap-1 font-mono" style={{ background: "rgba(192,132,252,0.15)", color: "#c084fc" }}>
                    <Bot className="w-3 h-3" /> AI Generated
                  </span>
                </div>
                <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>Sponsored · 1 hour ago</p>
              </div>
            </div>
            <p className="text-sm font-mono" style={{ color: "var(--text-bright)" }}>10 hidden hiking gems near Seattle that locals don't want you to know about! Number 7 will blow your mind.</p>
            <div className="mt-2 rounded-lg h-32 flex items-center justify-center relative" style={{ background: "var(--bg-elevated)" }}>
              <span className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>[AI-Generated Image]</span>
              <span className="absolute bottom-2 right-2 text-xs text-white px-2 py-0.5 rounded flex items-center gap-1 font-mono" style={{ background: "rgba(192,132,252,0.8)" }}>
                <Sparkles className="w-3 h-3" /> AI Generated
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs font-mono" style={{ color: "#c084fc" }}>
              <Info className="w-3 h-3" />
              This post and image were generated by AI. <a href="#" onClick={e => e.preventDefault()} className="underline" style={{ color: "#c084fc" }}>Why am I seeing this?</a>
            </div>
          </div>

          {/* AI-assisted post */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs" style={{ background: "var(--bg-elevated)", color: "var(--text-bright)" }}>MK</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium font-mono" style={{ color: "var(--text-bright)" }}>Mark Kim</p>
                  <span className="text-xs px-1.5 py-0.5 rounded flex items-center gap-1 font-mono" style={{ background: "rgba(192,132,252,0.1)", color: "var(--ai-color)" }}>
                    <Sparkles className="w-3 h-3" /> AI Assisted
                  </span>
                </div>
                <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>30 min ago</p>
              </div>
            </div>
            <p className="text-sm font-mono" style={{ color: "var(--text-bright)" }}>Here's my summary of the Q4 earnings call...</p>
            <div className="mt-2 rounded-lg p-3 text-xs font-mono" style={{ background: "rgba(192,132,252,0.05)", border: "1px solid rgba(192,132,252,0.15)", color: "var(--text)" }}>
              <strong style={{ color: "var(--ai-color)" }}>AI-assisted content:</strong> This post was written by a human with AI writing assistance. The ideas are the author's; the wording was refined by AI.
            </div>
          </div>
        </div>
      )}

      {/* Article with AI labeling */}
      {scenario === "article" && (
        <div role="tabpanel" id="tabpanel-article" aria-labelledby="tab-article" className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          {/* AI-generated article */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded-full flex items-center gap-1 font-medium font-mono" style={{ background: "rgba(192,132,252,0.15)", color: "#c084fc" }}>
                <Bot className="w-3.5 h-3.5" /> AI-Generated Article
              </span>
            </div>
            <h2 className="text-lg font-bold font-mono mb-2" style={{ color: "var(--text-bright)" }}>The Future of Remote Work: 5 Trends for 2026</h2>
            <p className="text-sm font-mono mb-3" style={{ color: "var(--text)" }}>This article was generated by an AI language model and reviewed by an editor.</p>
            <div className="space-y-2 text-sm font-mono" style={{ color: "var(--text-bright)" }}>
              <p>The landscape of remote work continues to evolve...</p>
              <p>[Article content...]</p>
            </div>

            <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
              <div className="rounded-lg p-3" style={{ background: "rgba(192,132,252,0.08)", border: "1px solid rgba(192,132,252,0.2)" }}>
                <h4 className="text-xs font-semibold font-mono mb-2 flex items-center gap-1" style={{ color: "#c084fc" }}>
                  <Info className="w-3.5 h-3.5" /> Transparency notice
                </h4>
                <ul className="text-xs font-mono space-y-1" style={{ color: "var(--text)" }}>
                  <li><strong style={{ color: "var(--text-bright)" }}>Generated by:</strong> Large language model (AI)</li>
                  <li><strong style={{ color: "var(--text-bright)" }}>Reviewed by:</strong> Human editor (fact-checked key claims)</li>
                  <li><strong style={{ color: "var(--text-bright)" }}>Training data:</strong> Web content up to January 2026</li>
                  <li><strong style={{ color: "var(--text-bright)" }}>Limitations:</strong> May contain inaccuracies or outdated information</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-3 text-xs font-mono" style={{ background: "var(--ai-glow)", border: "1px solid var(--ai-border)", color: "var(--ai-color)" }}>
            <strong>EU AI Act Art. 50(4):</strong> <span style={{ color: "var(--text)" }}>AI-generated text published to inform the public on matters of public interest must be labeled as AI-generated, unless the content has been subjected to human review and a natural person holds editorial responsibility.</span>
          </div>
        </div>
      )}

      {/* AI-generated image labeling */}
      {scenario === "image" && (
        <div role="tabpanel" id="tabpanel-image" aria-labelledby="tab-image" className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <h3 className="font-bold font-mono text-sm mb-4" style={{ color: "var(--text-bright)" }}>Content authenticity signals</h3>

          <div className="space-y-4">
            {/* Real photo */}
            <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--green-border)" }}>
              <div className="h-32 flex items-center justify-center text-xs font-mono relative" style={{ background: "rgba(0,255,65,0.05)", color: "var(--text-dim)" }}>
                [Real photograph]
                <span className="absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded flex items-center gap-1 font-mono" style={{ background: "rgba(0,255,65,0.8)", color: "var(--bg)" }}>
                  <CheckCircle2 className="w-3 h-3" /> Authentic
                </span>
              </div>
              <div className="p-3">
                <p className="text-xs font-mono flex items-center gap-1" style={{ color: "var(--green)" }}><CheckCircle2 className="w-3.5 h-3.5" /> Original photograph — camera metadata verified</p>
                <p className="text-xs font-mono mt-1" style={{ color: "var(--text-dim)" }}>Canon EOS R5 · ISO 200 · f/8 · 1/250s · No AI modifications detected</p>
              </div>
            </div>

            {/* AI-generated image */}
            <div className="rounded-lg overflow-hidden" style={{ border: "1px solid rgba(192,132,252,0.3)" }}>
              <div className="h-32 flex items-center justify-center text-xs font-mono relative" style={{ background: "rgba(192,132,252,0.1)", color: "var(--text-dim)" }}>
                [AI-generated image]
                <span className="absolute bottom-2 left-2 text-xs text-white px-2 py-0.5 rounded flex items-center gap-1 font-mono" style={{ background: "rgba(192,132,252,0.8)" }}>
                  <Sparkles className="w-3 h-3" /> AI Generated
                </span>
              </div>
              <div className="p-3">
                <p className="text-xs font-mono flex items-center gap-1" style={{ color: "#c084fc" }}><Sparkles className="w-3.5 h-3.5" /> AI-generated image</p>
                <p className="text-xs font-mono mt-1" style={{ color: "var(--text-dim)" }}>Model: DALL-E 3 · C2PA watermark embedded · Generated March 2026</p>
              </div>
            </div>

            {/* AI-modified image */}
            <div className="rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,170,0,0.3)" }}>
              <div className="h-32 flex items-center justify-center text-xs font-mono relative" style={{ background: "rgba(255,170,0,0.1)", color: "var(--text-dim)" }}>
                [AI-modified photograph]
                <span className="absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded flex items-center gap-1 font-mono" style={{ background: "var(--amber)", color: "var(--bg)" }}>
                  <AlertTriangle className="w-3 h-3" /> AI Modified
                </span>
              </div>
              <div className="p-3">
                <p className="text-xs font-mono flex items-center gap-1" style={{ color: "var(--amber)" }}><AlertTriangle className="w-3.5 h-3.5" /> Original photo with AI modifications</p>
                <p className="text-xs font-mono mt-1" style={{ color: "var(--text-dim)" }}>Background replaced by AI · Subject face untouched · Modification map available</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-3 mt-4 text-xs font-mono" style={{ background: "var(--ai-glow)", border: "1px solid var(--ai-border)", color: "var(--ai-color)" }}>
            <strong>C2PA Standard:</strong> <span style={{ color: "var(--text)" }}>The Coalition for Content Provenance and Authenticity provides machine-readable metadata for content authenticity. EU AI Act Art. 50(2) requires AI-generated content to be marked in machine-readable format.</span>
          </div>
        </div>
      )}

      {/* Official EU labelling icons */}
      {scenario === "euicons" && (
        <div role="tabpanel" id="tabpanel-euicons" aria-labelledby="tab-euicons" className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <h3 className="font-bold font-mono text-sm mb-2" style={{ color: "var(--text-bright)" }}>Official EU labelling icons</h3>
          <p className="text-xs font-mono mb-4" style={{ color: "var(--text)" }}>
            Published by the EU AI Office with the Code of Practice on transparency of AI-generated content. Free to use (SVG/PNG, no attribution). Voluntary — the icons alone don't establish Art. 50 compliance, but they give users one recognisable visual language across platforms.
          </p>

          <div className="space-y-4">
            {EU_ICONS.map(({ name, use, tall, variants }) => (
              <div key={name} className="rounded-lg p-3" style={{ background: "var(--bg)", border: "1px solid var(--ai-border)" }}>
                <p className="text-xs font-mono font-semibold mb-1" style={{ color: "var(--ai-color)" }}>{name}</p>
                <p className="text-xs font-mono mb-3" style={{ color: "var(--text)" }}>{use}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { src: variants.black, label: "black", light: true },
                    { src: variants.blackT, label: "black 50%", light: true },
                    { src: variants.white, label: "white", light: false },
                    { src: variants.whiteT, label: "white 50%", light: false },
                  ].map(({ src, label, light }) => (
                    <div key={label}>
                      <div
                        className="rounded flex items-center justify-center p-2"
                        style={{ background: light ? "linear-gradient(135deg, #cfcfcf, #f2f2f2)" : "linear-gradient(135deg, #14141c, #3d3d4d)", border: "1px solid var(--border)" }}
                      >
                        <img src={src} alt={`Official EU icon: ${name}, ${label} variant`} className={tall ? "h-12 w-auto" : "h-10 w-auto max-w-full"} />
                      </div>
                      <p className="text-[10px] font-mono text-center mt-1" style={{ color: "var(--text-dim)" }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-[10px] font-mono mt-2" style={{ color: "var(--text-dim)" }}>
            Official artwork by the EU AI Office — free to use in SVG/PNG without attribution. Source:{" "}
            <a href="https://digital-strategy.ec.europa.eu/en/policies/eu-icons-labelling-ai-generated-content" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--ai-color)" }}>European Commission</a>.
          </p>

          <div className="mt-4">
            <h4 className="text-xs font-semibold font-mono mb-2" style={{ color: "var(--text-bright)" }}>Icons in context</h4>
            <div className="space-y-3">
              {/* Fully AI-generated image */}
              <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <div className="h-28 relative flex items-center justify-center text-xs font-mono" style={{ background: "linear-gradient(135deg, #1c1430, #3a2a5a)", color: "var(--text-dim)" }}>
                  [AI-generated image]
                  <img src={aiGeneratedWhite} alt="AI GENERATED — official EU label embedded in the image" className="absolute bottom-2 left-2 h-7 w-auto" />
                </div>
                <p className="px-3 py-2 text-[10px] font-mono" style={{ background: "var(--bg)", color: "var(--text-dim)" }}>
                  Fully AI-generated image — solid white icon embedded in a corner, visible at first exposure and preserved when the file is reshared
                </p>
              </div>

              {/* AI-modified photo with transparent variant */}
              <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <div className="h-28 relative flex items-center justify-center text-xs font-mono" style={{ background: "linear-gradient(135deg, #2a3320, #4d5a3a)", color: "var(--text-dim)" }}>
                  [AI-modified photograph]
                  <img src={aiModifiedWhiteT} alt="AI MODIFIED — official EU label, 50% transparency variant" className="absolute bottom-2 left-2 h-7 w-auto" />
                </div>
                <p className="px-3 py-2 text-[10px] font-mono" style={{ background: "var(--bg)", color: "var(--text-dim)" }}>
                  AI-modified photo — the 50%-transparency variant keeps the label legible without covering the underlying content
                </p>
              </div>

              {/* Black variant on light content */}
              <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <div className="h-28 relative flex items-center justify-center text-xs font-mono" style={{ background: "linear-gradient(135deg, #e9e5da, #f8f5ee)", color: "#8a8578" }}>
                  [Bright AI-generated image]
                  <img src={aiGeneratedBlack} alt="AI GENERATED — official EU label, black variant on light content" className="absolute bottom-2 left-2 h-7 w-auto" />
                </div>
                <p className="px-3 py-2 text-[10px] font-mono" style={{ background: "var(--bg)", color: "var(--text-dim)" }}>
                  Light content — use the black variant for contrast; pick the variant by background, not by brand palette
                </p>
              </div>

              {/* Published AI-generated text */}
              <div className="rounded-lg p-3" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                <div className="flex items-center gap-2 mb-1">
                  <img src={aiBasicWhite} alt="AI — official EU basic icon" className="h-6 w-6 shrink-0" />
                  <p className="text-xs font-mono font-semibold" style={{ color: "var(--text-bright)" }}>Local election results: what changed overnight</p>
                </div>
                <p className="text-[11px] font-mono" style={{ color: "var(--text)" }}>This article was generated by AI to inform the public on a matter of public interest…</p>
                <p className="text-[10px] font-mono mt-2" style={{ color: "var(--text-dim)" }}>
                  Published text (Art. 50(4)) — the basic icon sits at the start of the text, paired with a plain-language disclosure line
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-3 mt-4" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
            <h4 className="text-xs font-semibold font-mono mb-2 flex items-center gap-1" style={{ color: "var(--text-bright)" }}>
              <Info className="w-3.5 h-3.5" style={{ color: "var(--ai-color)" }} /> Placement rules (Code of Practice)
            </h4>
            <ul className="text-xs font-mono space-y-1" style={{ color: "var(--text)" }}>
              <li>— Perceivable at the latest at first exposure to the content</li>
              <li>— Embedded directly into the deepfake or published text, not just nearby UI</li>
              <li>— Must survive resharing and downloading of the content</li>
              <li>— Pair with a plain-language text label for accessibility</li>
            </ul>
          </div>

          <div className="rounded-lg p-3 mt-4 text-xs font-mono" style={{ background: "var(--ai-glow)", border: "1px solid var(--ai-border)", color: "var(--ai-color)" }}>
            <strong>Status:</strong> <span style={{ color: "var(--text)" }}>Art. 50 transparency obligations are in force since Aug 2, 2026 and enforceable by national market surveillance authorities — fines up to €15M or 3% of worldwide turnover. Icons published Jun 10, 2026; final icon set updated Aug 10, 2026.</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function AIContentLabelingPattern() {
  return (
    <div>
      <PatternHeader
        title="AI Content Labeling"
        description="How to label AI-generated and AI-modified content — social media feeds, articles, images. Covers EU AI Act Article 50 requirements including machine-readable watermarking."
        severity="critical"
        tags={["EU AI Act Art. 50", "EU Icons", "C2PA", "Content Authenticity"]}
      />

      <DemoContainer label="AI content labeling (4 variants)">
        <AIContentLabelingDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Label AI-generated content with a visible badge (text + icon) at the point of display",
          "Distinguish between: fully AI-generated, AI-assisted, and AI-modified content",
          "Embed machine-readable watermarks (C2PA standard) for programmatic detection",
          "Show content provenance: what model, when generated, whether human-reviewed",
          "Provide a 'Why am I seeing this?' link for AI-generated content in feeds",
          "Label AI-generated images both visually (overlay badge) and in metadata",
          "Show a transparency notice on AI-generated articles with limitations stated",
          "Prefer the official EU icons (Basic / Fully AI-Generated / Partially AI-Modified) — free, recognisable, and aligned with the Code of Practice",
        ]}
        donts={[
          "Don't publish AI-generated text on public interest topics without disclosure (Art. 50(4))",
          "Don't use AI-generated images without visible and machine-readable labeling (Art. 50(2))",
          "Don't remove AI watermarks or metadata from content you redistribute",
          "Don't label AI-assisted content the same as fully AI-generated content — there's a difference",
          "Don't hide AI labels behind clicks or tooltips — they must be immediately visible",
          "Don't present AI-generated content as photojournalism without explicit disclosure",
          "Don't use AI deepfakes without disclosure — this is specifically called out in Art. 50(3)",
        ]}
        securityRationale="EU AI Act Article 50(2)-(4) requires providers to mark AI-generated content in machine-readable format and ensure detectable watermarking. Article 50(4) specifically addresses AI-generated text published to inform the public — it must be labeled unless human-reviewed. Core Art. 50 transparency and disclosure obligations are in force since August 2, 2026 (fines up to €15M or 3% of worldwide turnover); the Art. 50(2) machine-readable watermarking deadline is December 2, 2026 (postponed from August 2026 by the April 2026 simplification amendments). The EU AI Office published official labelling icons (June 10, 2026, final set August 10, 2026) — voluntary, but a common visual language across platforms. The C2PA (Coalition for Content Provenance and Authenticity) standard, backed by Adobe, Microsoft, and BBC, provides the machine-readable technical framework."
        accessibilityNotes={[
          "AI labels must be in text, not just icons — screen readers can't interpret icon-only labels",
          "Overlay badges on images need sufficient contrast against varied backgrounds",
          "Provenance information should be available in alt text or longdesc",
          "Machine-readable metadata (C2PA) supplements but doesn't replace visible labels",
          "Color coding (purple for AI, green for authentic) must be paired with text labels",
        ]}
      />
    </div>
  );
}
