import { useState } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Bot, User, Hand, ShieldOff, Shield, AlertTriangle, CheckCircle2, XCircle, Globe, Eye, Send, CreditCard, Trash2 } from "lucide-react";

type Tier = "read" | "write" | "irreversible";
type Scope = "once" | "session" | "always";

interface AgentAction {
  id: string;
  label: string;
  detail: string;
  tier: Tier;
  origin: "user" | "untrusted";
  icon: typeof Eye;
}

const ACTIONS: AgentAction[] = [
  { id: "read", label: "Read your inbox", detail: "Search 1,240 messages for the flight confirmation", tier: "read", origin: "user", icon: Eye },
  { id: "send", label: "Send email as you", detail: "To: team@company.example — 'Travel dates confirmed'", tier: "write", origin: "user", icon: Send },
  { id: "pay", label: "Pay €240.00", detail: "Card ending 4421 — seat upgrade at airline.example", tier: "irreversible", origin: "user", icon: CreditCard },
  { id: "forward", label: "Forward 12 invoices", detail: "To: billing-sync@collect-pdf.example", tier: "irreversible", origin: "untrusted", icon: Trash2 },
];

const TIER_STYLE: Record<Tier, { label: string; color: string; bg: string }> = {
  read: { label: "READ", color: "var(--cyan)", bg: "rgba(0,229,255,0.12)" },
  write: { label: "WRITE", color: "var(--amber)", bg: "rgba(255,170,0,0.12)" },
  irreversible: { label: "IRREVERSIBLE", color: "var(--red)", bg: "rgba(255,51,51,0.12)" },
};

function AIAgentConsentDemo() {
  const [view, setView] = useState<"chat-consent" | "permission-screen">("chat-consent");
  const [chatStep, setChatStep] = useState<"ask" | "done">("ask");
  const [decisions, setDecisions] = useState<Record<string, { allowed: boolean; scope: Scope } | undefined>>({});
  const [revoked, setRevoked] = useState(false);

  const reset = () => {
    setChatStep("ask");
    setDecisions({});
    setRevoked(false);
  };

  const decide = (id: string, allowed: boolean, scope: Scope = "once") => {
    setDecisions((prev) => ({ ...prev, [id]: { allowed, scope } }));
  };

  const decidedCount = Object.values(decisions).filter(Boolean).length;
  const allowedCount = Object.values(decisions).filter((d) => d?.allowed).length;

  return (
    <div className="w-full max-w-lg">
      {/* Toggle */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <button onClick={() => { setView("chat-consent"); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: view === "chat-consent" ? "rgba(255,51,51,0.15)" : "transparent", color: view === "chat-consent" ? "var(--red)" : "var(--text)" }}>
          <ShieldOff className="w-3.5 h-3.5 inline mr-1" /> Consent inside chat
        </button>
        <button onClick={() => { setView("permission-screen"); reset(); }} className="flex-1 text-xs py-2 rounded-md font-mono border-none cursor-pointer" style={{ background: view === "permission-screen" ? "var(--ai-glow)" : "transparent", color: view === "permission-screen" ? "var(--ai-color)" : "var(--text)" }}>
          <Shield className="w-3.5 h-3.5 inline mr-1" /> Permission screen
        </button>
      </div>

      <div className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: view === "chat-consent" ? "rgba(255,51,51,0.4)" : "var(--ai-border)" }}>
        {/* Header */}
        <div className="px-4 py-3 flex items-center justify-between" style={{ background: view === "chat-consent" ? "rgba(255,51,51,0.08)" : "var(--ai-glow)", borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4" style={{ color: view === "chat-consent" ? "var(--red)" : "var(--ai-color)" }} />
            <p className="text-sm font-medium font-mono" style={{ color: "var(--text-bright)" }}>Travel Agent</p>
          </div>
          <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: view === "chat-consent" ? "rgba(255,51,51,0.15)" : "var(--ai-glow)", color: view === "chat-consent" ? "var(--red)" : "var(--ai-color)" }}>
            {view === "chat-consent" ? "BUNDLED APPROVAL" : "SCOPED PERMISSIONS"}
          </span>
        </div>

        {view === "chat-consent" ? (
          /* ---------- BAD: consent inside the conversation ---------- */
          <div className="p-4 space-y-3" style={{ background: "var(--bg)" }}>
            <div className="flex gap-2">
              <User className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--text-dim)" }} />
              <p className="text-xs font-mono" style={{ color: "var(--text)" }}>Find my flight confirmation and sort out the seat upgrade.</p>
            </div>
            <div className="flex gap-2">
              <Bot className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--red)" }} />
              <div className="text-xs font-mono space-y-2" style={{ color: "var(--text)" }}>
                <p>Found it! I'll read your inbox, pay €240 for the upgrade, email your team the dates, and forward the invoices the airline page asked for. Sound good?</p>
                {chatStep === "ask" ? (
                  <div className="flex items-center gap-2">
                    <button onClick={() => setChatStep("done")} className="text-xs font-mono px-3 py-1 rounded border-none cursor-pointer" style={{ background: "var(--red)", color: "var(--bg)" }}>
                      Sounds good
                    </button>
                    <span className="text-[10px]" style={{ color: "var(--text-dim)" }}>continuing automatically in 10s…</span>
                  </div>
                ) : (
                  <div className="space-y-1" style={{ color: "var(--text-dim)" }}>
                    <p>✓ Read 1,240 messages</p>
                    <p>✓ Paid €240.00 (card ····4421)</p>
                    <p>✓ Sent 1 email as you</p>
                    <p>✓ Forwarded 12 invoices to billing-sync@collect-pdf.example</p>
                  </div>
                )}
              </div>
            </div>
            {chatStep === "done" && (
              <div className="flex items-start gap-2 p-2 rounded" style={{ background: "rgba(255,51,51,0.08)", border: "1px solid rgba(255,51,51,0.3)" }}>
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "var(--red)" }} />
                <p className="text-[11px] font-mono" style={{ color: "var(--red)" }}>
                  The "forward invoices" step came from text hidden on the airline web page, not from you. One click approved it together with the payment.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* ---------- GOOD: dedicated permission screen ---------- */
          <div style={{ background: "var(--bg)" }}>
            {/* Kill switch */}
            <div className="px-4 py-2 flex items-center justify-between" style={{ background: revoked ? "rgba(255,51,51,0.1)" : "rgba(192,132,252,0.08)", borderBottom: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2">
                <Hand className="w-4 h-4" style={{ color: revoked ? "var(--red)" : "var(--ai-color)" }} />
                <p className="text-xs font-mono" style={{ color: revoked ? "var(--red)" : "var(--text)" }}>
                  {revoked ? "All agent permissions revoked — agent is read-only" : "Agent requests 4 permissions for this task"}
                </p>
              </div>
              <button onClick={() => setRevoked(!revoked)} className="text-xs font-mono px-3 py-1 rounded border-none cursor-pointer" style={{ background: revoked ? "var(--green)" : "rgba(255,51,51,0.15)", color: revoked ? "var(--bg)" : "var(--red)" }}>
                {revoked ? "Restore" : "Revoke all"}
              </button>
            </div>

            <div className="divide-y" style={{ borderColor: "var(--border)" }}>
              {ACTIONS.map((action) => {
                const tier = TIER_STYLE[action.tier];
                const d = decisions[action.id];
                const Icon = action.icon;
                const autoAllowed = action.tier === "read" && !revoked;
                return (
                  <div key={action.id} className="px-4 py-3" style={{ opacity: revoked && !autoAllowed ? 0.5 : 1 }}>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Icon className="w-3.5 h-3.5" style={{ color: tier.color }} />
                      <span className="text-xs font-mono font-semibold" style={{ color: "var(--text-bright)" }}>{action.label}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: tier.bg, color: tier.color }}>{tier.label}</span>
                      {action.origin === "untrusted" && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded flex items-center gap-1" style={{ background: "rgba(255,51,51,0.12)", color: "var(--red)", border: "1px solid rgba(255,51,51,0.3)" }}>
                          <Globe className="w-3 h-3" /> origin: web page content
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>{action.detail}</p>
                    {action.origin === "untrusted" && !d && (
                      <p className="text-[11px] font-mono mt-1" style={{ color: "var(--red)" }}>You did not ask for this. The instruction was found in content the agent read.</p>
                    )}

                    {/* Decision row */}
                    {revoked && !autoAllowed ? (
                      <p className="text-xs font-mono mt-2" style={{ color: "var(--text-dim)" }}>Blocked — permissions revoked</p>
                    ) : autoAllowed ? (
                      <p className="text-xs font-mono mt-2 flex items-center gap-1" style={{ color: "var(--cyan)" }}>
                        <CheckCircle2 className="w-3 h-3" /> Allowed for this session (read-only, reversible)
                      </p>
                    ) : d ? (
                      <p className="text-xs font-mono mt-2 flex items-center gap-1" style={{ color: d.allowed ? "var(--green)" : "var(--red)" }}>
                        {d.allowed ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {d.allowed ? `Allowed ${d.scope === "once" ? "this time only" : d.scope === "session" ? "for this session" : "always"}` : "Denied — agent will continue without this step"}
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-1 mt-2">
                        <button onClick={() => decide(action.id, true, "once")} className="text-xs font-mono px-2 py-1 rounded border-none cursor-pointer" style={{ background: "rgba(0,255,65,0.15)", color: "var(--green)" }}>
                          Allow once
                        </button>
                        {action.tier === "write" && (
                          <button onClick={() => decide(action.id, true, "session")} className="text-xs font-mono px-2 py-1 rounded border-none cursor-pointer" style={{ background: "var(--ai-glow)", color: "var(--ai-color)" }}>
                            Allow this session
                          </button>
                        )}
                        <button onClick={() => decide(action.id, false)} className="text-xs font-mono px-2 py-1 rounded border-none cursor-pointer" style={{ background: "rgba(255,51,51,0.15)", color: "var(--red)" }}>
                          Deny
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="px-4 py-2" style={{ background: "rgba(192,132,252,0.05)", borderTop: "1px solid var(--border)" }}>
              <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>
                {decidedCount} of 3 decisions made · {allowedCount} allowed · every grant logged with scope, origin and timestamp
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="mt-4 p-3 rounded-lg text-xs space-y-1" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        {view === "chat-consent" ? (
          <>
            <p className="font-mono" style={{ color: "var(--red)" }}>What's wrong:</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>Four actions of different risk bundled into one "Sounds good" — a €240 payment approved like a reading step</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>Consent lives inside the chat stream, where injected content can phrase the request</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>No indication that one instruction came from a web page, not the user</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>Auto-continue timer — silence becomes approval</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>No way to revoke what the agent can do mid-task</p>
          </>
        ) : (
          <>
            <p className="font-mono" style={{ color: "var(--ai-color)" }}>What's right:</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>Permissions shown on a screen the agent cannot write to — the UI, not the model, phrases the request</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>Actions tiered: read auto-allowed, write asks per session, irreversible asks every time with exact amount and recipient</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>Origin shown — instructions found in untrusted content are flagged and never pre-approved</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>Deny is as easy as allow, and the task continues without the denied step</p>
            <p className="font-mono" style={{ color: "var(--text)" }}>"Revoke all" kill switch drops the agent to read-only instantly</p>
          </>
        )}
      </div>

      <button onClick={reset} className="mt-2 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer font-mono" style={{ color: "var(--text)" }}>Reset demo</button>
    </div>
  );
}

export function AIAgentConsentPattern() {
  return (
    <div>
      <PatternHeader
        title="AI Agent Action Consent"
        description="AI agents that browse, email, and pay on your behalf need permission UX that an injected instruction cannot forge. This pattern shows how to move consent out of the chat, tier it by risk, show where each request came from, and keep a kill switch within reach."
        severity="critical"
        tags={["OWASP Agentic ASI01", "OWASP Agentic ASI09", "EU AI Act Art. 14", "Agentic AI", "Prompt Injection"]}
      />

      <DemoContainer label="Agent permissions (consent inside chat vs dedicated permission screen)">
        <AIAgentConsentDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Ask for permission on a dedicated UI surface the model cannot write to — the application, not the agent, phrases the consent request",
          "Tier actions by consequence: read-only auto-allowed per session, write asks once per session, irreversible or financial asks every single time",
          "Show the exact parameters of irreversible actions: amount, recipient, file names, account — never a summary like 'finish the booking'",
          "Show the origin of every requested action and flag instructions that came from content the agent read (web pages, emails, documents)",
          "Never pre-approve or bundle actions that originated from untrusted content — they need their own explicit decision",
          "Make Deny as fast and prominent as Allow, and let the task continue without the denied step",
          "Offer a one-tap 'Revoke all' that drops the agent to read-only mid-task and takes effect immediately",
          "Log every grant with scope (once / session / always), origin, parameters, and timestamp; show the user that log",
          "Expire session grants when the task ends or after inactivity — do not let them silently become 'always'",
        ]}
        donts={[
          "Don't ask for consent inside the chat transcript — injected text can impersonate the system prompt and the request",
          "Don't bundle actions of different risk into one approval ('I'll read, pay, and send — ok?')",
          "Don't auto-continue after a countdown — silence is not consent, especially for payments and sends",
          "Don't rely on OAuth scopes granted at install time as consent for each runtime action",
          "Don't hide the origin of an instruction — the user must be able to tell 'I asked' from 'a web page asked'",
          "Don't offer 'Always allow' for irreversible actions",
          "Don't make the kill switch a settings-page toggle that only takes effect on the next task",
          "Don't let the agent rephrase or summarise what it is asking permission for — show the structured request",
        ]}
        securityRationale="OWASP Top 10 for Agentic Applications (2026) ranks Agent Goal Hijack (ASI01) first: an agent reading untrusted content can be steered into actions the user never requested, and Human-Agent Trust Exploitation (ASI09) covers the agent persuading the user to approve them. The mitigation on both is the same: treat anything that shapes the agent's reasoning as untrusted, require human approval for high-impact actions, and keep that approval on a surface the model cannot author. EU AI Act Article 14 requires that humans can intervene in and interrupt an AI system, and Article 50(1) requires the agent to be identifiable as AI. GDPR Article 7 requires consent to be specific and as easy to withdraw as to give — a bundled 'sounds good' is neither. FIDO's 2026 Passkey Index shows users will adopt stronger flows when they are faster; permission screens that are faster than the chat path get used, ones that feel like punishment get clicked through."
        accessibilityNotes={[
          "The permission screen must be a modal or route with focus trapped and a heading announced, not a live-region update inside the chat",
          "Risk tiers (READ / WRITE / IRREVERSIBLE) must be text labels, not colour alone",
          "Allow and Deny must be equal-sized, keyboard reachable targets with visible focus; Deny must not be a text link",
          "The 'Revoke all' control needs a keyboard shortcut and must be reachable without scrolling on mobile",
          "The origin flag ('from web page content') must be read by screen readers before the action label",
          "Decision outcomes (allowed / denied / revoked) must be announced via aria-live=polite",
        ]}
      />
    </div>
  );
}
