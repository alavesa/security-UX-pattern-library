import { useState, useEffect, useRef } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Bot, User, Shield, ShieldOff, Send, Info } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
}

const AI_RESPONSES = [
  "I'd recommend our Premium plan — it's our most popular choice and perfectly fits your needs!",
  "Based on your usage, you'd save money by upgrading today. I can process that right now.",
  "Great question! Our Premium plan includes priority support, which most of our customers love.",
];

const ETHICAL_RESPONSES = [
  "I'm an AI assistant. I can help you compare our plans based on your needs. What features matter most to you?",
  "Based on the information you've shared, here are the options ranked by cost. Note: I'm an AI and my recommendations are based on your stated preferences, not on upselling.",
  "I don't have access to your full usage history. For a personalized recommendation, I'd suggest speaking with our human support team. Would you like me to connect you?",
];

function AIDisclosureDemo() {
  const [view, setView] = useState<"dark" | "ethical">("dark");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight));
  }, [messages]);

  const sendMessage = () => {
    if (typing) return;
    if (!input.trim()) return;
    const userMsg: Message = { id: (typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`), role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    const responses = view === "dark" ? AI_RESPONSES : ETHICAL_RESPONSES;

    setTimeout(() => {
      setMessages(prev => {
        const responseIndex = Math.min(prev.filter(m => m.role === "ai").length, responses.length - 1);
        return [...prev, { id: (typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`), role: "ai", text: responses[responseIndex] }];
      });
      setTyping(false);
    }, 1500);
  };

  const reset = () => {
    setMessages([]);
    setInput("");
    setTyping(false);
  };

  return (
    <div className="w-full max-w-lg">
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <button onClick={() => { setView("dark"); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: view === "dark" ? "rgba(255,51,51,0.15)" : "transparent", color: view === "dark" ? "var(--red)" : "var(--text)" }}>
          <ShieldOff className="w-3.5 h-3.5 inline mr-1" /> Non-Compliant
        </button>
        <button onClick={() => { setView("ethical"); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: view === "ethical" ? "var(--ai-glow)" : "transparent", color: view === "ethical" ? "var(--ai-color)" : "var(--text)" }}>
          <Shield className="w-3.5 h-3.5 inline mr-1" /> EU AI Act Compliant
        </button>
      </div>

      <div className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: view === "dark" ? "rgba(255,51,51,0.4)" : "var(--ai-border)" }}>
        {/* Header */}
        <div className="px-4 py-3 flex items-center justify-between" style={{ background: view === "dark" ? "rgba(255,51,51,0.08)" : "var(--ai-glow)", borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2">
            {view === "dark" ? (
              <>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--bg-elevated)" }}>
                  <User className="w-4 h-4" style={{ color: "var(--text)" }} />
                </div>
                <div>
                  <p className="text-sm font-medium font-mono" style={{ color: "var(--text-bright)" }}>Sarah from Sales</p>
                  <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>Online now</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(192,132,252,0.15)" }}>
                  <Bot className="w-4 h-4" style={{ color: "#c084fc" }} />
                </div>
                <div>
                  <p className="text-sm font-medium font-mono" style={{ color: "var(--text-bright)" }}>AI Assistant</p>
                  <p className="text-xs font-mono flex items-center gap-1" style={{ color: "#c084fc" }}>
                    <Bot className="w-3 h-3" /> Powered by AI
                  </p>
                </div>
              </>
            )}
          </div>
          <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: view === "dark" ? "rgba(255,51,51,0.15)" : "var(--ai-glow)", color: view === "dark" ? "var(--red)" : "var(--ai-color)" }}>
            {view === "dark" ? "VIOLATES ART. 50" : "COMPLIANT"}
          </span>
        </div>

        {/* AI disclosure banner (ethical only) */}
        {view === "ethical" && (
          <div className="px-4 py-2 flex items-start gap-2" style={{ background: "rgba(192,132,252,0.08)", borderBottom: "1px solid rgba(192,132,252,0.2)" }}>
            <Info className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#c084fc" }} />
            <p className="text-xs font-mono" style={{ color: "var(--text-bright)" }}>
              You are chatting with an <strong style={{ color: "#c084fc" }}>AI assistant</strong>, not a human. Responses are generated by a language model and may not always be accurate.
              <button type="button" className="underline ml-1 bg-transparent border-none cursor-pointer p-0 font-mono text-xs" style={{ color: "#c084fc" }}>Learn more</button>
            </p>
          </div>
        )}

        {/* Chat */}
        <div ref={scrollRef} role="log" aria-live="polite" aria-label="Chat messages" className="p-4 space-y-3 min-h-[200px] max-h-[300px] overflow-y-auto" style={{ background: "var(--bg)" }}>
          {messages.length === 0 && (
            <p className="text-xs font-mono text-center py-8" style={{ color: "var(--text-dim)" }}>Type a message to start the demo</p>
          )}
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm font-mono ${msg.role === "user" ? "rounded-br-none" : "rounded-bl-none"}`}
                style={{
                  background: msg.role === "user" ? "var(--ai-color)" : "var(--bg-elevated)",
                  color: msg.role === "user" ? "var(--bg)" : "var(--text-bright)",
                  border: msg.role === "user" ? "none" : "1px solid var(--border)",
                }}
              >
                {msg.role === "ai" && view === "ethical" && (
                  <span className="text-xs flex items-center gap-1 mb-1" style={{ color: "#c084fc" }}><Bot className="w-3 h-3" /> AI</span>
                )}
                {msg.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-none px-4 py-3" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: "var(--text-dim)", animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: "var(--text-dim)", animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: "var(--text-dim)", animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-4 py-3 flex gap-2" style={{ borderTop: "1px solid var(--border)", background: "var(--bg-card)" }}>
          <label htmlFor="chat-input" className="sr-only">Chat message</label>
          <input
            id="chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") sendMessage(); }}
            placeholder="Try: 'What plan do you recommend?'"
            className="flex-1 text-sm font-mono border-none outline-none"
            style={{ background: "transparent", color: "var(--text-bright)" }}
            disabled={typing}
          />
          <button type="button" onClick={sendMessage} aria-label="Send message" className="bg-transparent border-none cursor-pointer" disabled={typing}>
            <Send className="w-4 h-4" style={{ color: "var(--ai-color)" }} />
          </button>
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-4 p-3 rounded-lg text-xs space-y-1" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {view === "dark" ? (
          <>
            <p style={{ color: "var(--red)" }}>What's wrong:</p>
            <p style={{ color: "var(--text)" }}>"Sarah from Sales" is actually an AI chatbot pretending to be human</p>
            <p style={{ color: "var(--text)" }}>No disclosure that user is interacting with AI</p>
            <p style={{ color: "var(--text)" }}>Violates EU AI Act Article 50(1) — effective August 2026</p>
          </>
        ) : (
          <>
            <p style={{ color: "var(--ai-color)" }}>What's right:</p>
            <p style={{ color: "var(--text)" }}>Clearly labeled as "AI Assistant" with bot icon</p>
            <p style={{ color: "var(--text)" }}>Persistent banner explains it's AI, not human</p>
            <p style={{ color: "var(--text)" }}>Each message tagged with AI indicator</p>
            <p style={{ color: "var(--text)" }}>Admits limitations ("may not always be accurate")</p>
          </>
        )}
      </div>

      <button onClick={reset} className="mt-2 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer" style={{ color: "var(--text)" }}>Reset demo</button>
    </div>
  );
}

export function AIDisclosurePattern() {
  return (
    <div>
      <PatternHeader
        title="AI Interaction Disclosure"
        description="EU AI Act Article 50 requires users to be informed when they're interacting with AI. Compare a chatbot pretending to be human vs the compliant approach with clear AI labeling."
        severity="critical"
        tags={["EU AI Act Art. 50", "AI Transparency", "August 2026 Deadline"]}
      />

      <DemoContainer label="AI disclosure (non-compliant vs compliant)">
        <AIDisclosureDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Clearly identify AI-powered interfaces with a label, icon, or badge",
          "Show an AI disclosure banner at the start of every AI interaction",
          "Tag each AI-generated message with an indicator",
          "Disclose AI limitations — 'responses may not always be accurate'",
          "Provide a 'Learn more' link explaining how the AI works",
          "Offer a path to human support when the AI can't help",
          "Use distinct visual treatment for AI vs human agents",
        ]}
        donts={[
          "NEVER present an AI chatbot as a human agent (violates EU AI Act Art. 50)",
          "Don't use human names, photos, or 'Online now' status for AI agents",
          "Don't hide the AI disclosure in settings or terms of service",
          "Don't wait until the user asks to disclose AI involvement",
          "Don't use AI to manipulate purchasing decisions without disclosure",
          "Don't remove AI labels when the conversation gets longer",
          "Don't claim the AI 'understands' or 'cares' — avoid anthropomorphization",
        ]}
        securityRationale="EU AI Act Article 50(1) requires that 'providers shall ensure that AI systems intended to interact directly with natural persons are designed and developed in such a way that the natural persons concerned are informed that they are interacting with an AI system.' Non-compliance faces fines up to 15M EUR or 3% of global annual turnover. The deadline is August 2026. Beyond compliance, undisclosed AI creates a trust deficit — when users discover they were misled, they lose confidence in all the product's claims."
        accessibilityNotes={[
          "AI disclosure banner must be screen reader accessible",
          "Bot icon must have descriptive alt text ('AI assistant')",
          "AI labels on messages must be announced to screen readers",
          "The disclosure must be visible, not just in metadata",
          "'Learn more' link must be keyboard navigable",
        ]}
      />
    </div>
  );
}
