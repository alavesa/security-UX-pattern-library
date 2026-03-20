import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Shield, ChevronRight, CheckCircle2, Circle, ArrowRight, Target } from "lucide-react";

interface MaturityQuestion {
  id: string;
  question: string;
  area: string;
  levels: [string, string, string, string]; // what each level looks like
}

const QUESTIONS: MaturityQuestion[] = [
  {
    id: "auth",
    question: "How does your app handle authentication?",
    area: "Authentication",
    levels: [
      "Username + password only, no strength requirements",
      "Password strength meter, rate limiting on login",
      "MFA available, breach detection, session management",
      "Adaptive MFA, passkeys, risk-based authentication",
    ],
  },
  {
    id: "errors",
    question: "What do users see when login fails?",
    area: "Error Handling",
    levels: [
      "'Incorrect password' (reveals which field is wrong)",
      "'Invalid email or password' (generic message)",
      "Generic message + rate limiting + lockout warning",
      "Generic message + behavioral analysis + silent logging + anomaly detection",
    ],
  },
  {
    id: "data",
    question: "How is user data protected?",
    area: "Data Protection",
    levels: [
      "HTTPS only, no encryption at rest",
      "HTTPS + encrypted at rest, basic access controls",
      "E2E encryption, data export, GDPR deletion support",
      "Zero-knowledge architecture, user-controlled encryption keys, automated data lifecycle",
    ],
  },
  {
    id: "monitoring",
    question: "How do you detect security incidents?",
    area: "Monitoring",
    levels: [
      "Manual log review, no alerts",
      "Basic alerts on failures, periodic log review",
      "Real-time monitoring, anomaly detection, user alerts for suspicious activity",
      "ML-based threat detection, automated response, per-user behavioral baselines",
    ],
  },
  {
    id: "consent",
    question: "How does your app handle consent & privacy?",
    area: "Privacy & Consent",
    levels: [
      "Basic cookie banner, pre-checked boxes",
      "GDPR-compliant consent with equal Accept/Reject",
      "Granular privacy controls, transparent data usage, easy deletion",
      "Privacy by design, minimal data collection, user-owned data, zero dark patterns",
    ],
  },
  {
    id: "response",
    question: "What happens when there's a breach?",
    area: "Incident Response",
    levels: [
      "No plan, ad-hoc response",
      "Basic plan exists, manual notification",
      "Documented process, multi-channel notification within 72 hours, action checklist",
      "Automated detection + response, real-time user notification, post-incident transparency report",
    ],
  },
  {
    id: "access",
    question: "How do you manage access control?",
    area: "Access Control",
    levels: [
      "Everyone has the same access level",
      "Basic roles (admin/user), manual assignment",
      "Granular RBAC, least privilege, visible permissions in UI",
      "Attribute-based access, automated provisioning, real-time audit trails, just-in-time access",
    ],
  },
  {
    id: "ux",
    question: "How does your team approach security UX?",
    area: "Security UX Culture",
    levels: [
      "Security is an afterthought, bolted on at the end",
      "Security considered during design, basic guidelines exist",
      "Security UX patterns adopted, regular audits, designer-security collaboration",
      "Security UX embedded in design system, continuous testing, user research on security flows",
    ],
  },
  {
    id: "ai",
    question: "How does your product handle AI transparency?",
    area: "AI Transparency",
    levels: [
      "No AI disclosure — chatbots presented as human or no labeling",
      "Basic 'powered by AI' label, no content marking",
      "AI interactions labeled, content marked, decision explanations available",
      "Full EU AI Act compliance — disclosure, C2PA watermarks, human appeal for all AI decisions",
    ],
  },
  {
    id: "industrial",
    question: "How mature is your industrial/OT security UX? (Skip if not applicable)",
    area: "Industrial OT",
    levels: [
      "Standard IT auth on operator workstations, no alarm management",
      "Badge-based auth, basic alarm prioritization",
      "Glove-friendly auth, safety overrides with approval, ISA-18.2 alarm management",
      "Adaptive biometrics, graduated safety authorization, AI-powered alarm grouping with root cause",
    ],
  },
];

const LEVELS = [
  { level: 1, name: "Basic", description: "Security exists but is reactive and minimal", color: "#ff3333", icon: "🔴" },
  { level: 2, name: "Standard", description: "Core security practices in place, some gaps", color: "#ffaa00", icon: "🟡" },
  { level: 3, name: "Advanced", description: "Proactive security UX, user-centric design", color: "#00e5ff", icon: "🔵" },
  { level: 4, name: "Leading", description: "Security UX is a competitive advantage", color: "#00ff41", icon: "🟢" },
];

export function MaturityPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  const avgLevel = useMemo(() => {
    if (!allAnswered) return 0;
    const sum = Object.values(answers).reduce((a, b) => a + b, 0);
    return sum / QUESTIONS.length;
  }, [answers, allAnswered]);

  const currentLevel = Math.round(avgLevel) || 1;
  const levelData = LEVELS[currentLevel - 1];
  const nextLevel = currentLevel < 4 ? LEVELS[currentLevel] : null;

  const weakestAreas = useMemo(() => {
    return QUESTIONS
      .filter(q => answers[q.id] !== undefined)
      .sort((a, b) => (answers[a.id] ?? 0) - (answers[b.id] ?? 0))
      .slice(0, 3);
  }, [answers]);

  const patternRecommendations = useMemo((): { path: string; label: string; reason: string }[] => {
    const recs: { path: string; label: string; reason: string }[] = [];
    if ((answers.auth ?? 0) < 3) recs.push({ path: "/patterns/auth/mfa", label: "Multi-Factor Auth", reason: "Upgrade from password-only to MFA" });
    if ((answers.auth ?? 0) < 2) recs.push({ path: "/patterns/auth/password-strength", label: "Password Strength", reason: "Add real-time strength feedback" });
    if ((answers.errors ?? 0) < 2) recs.push({ path: "/patterns/auth/login", label: "Login Flow", reason: "Implement generic error messages" });
    if ((answers.data ?? 0) < 3) recs.push({ path: "/patterns/data/encryption", label: "Encryption Indicators", reason: "Show users what's encrypted" });
    if ((answers.data ?? 0) < 3) recs.push({ path: "/patterns/data/deletion", label: "Data Deletion", reason: "Add GDPR-compliant deletion flow" });
    if ((answers.monitoring ?? 0) < 3) recs.push({ path: "/patterns/owasp/logging-monitoring", label: "Logging & Monitoring", reason: "Build security event dashboard" });
    if ((answers.consent ?? 0) < 2) recs.push({ path: "/patterns/dark/cookie-consent", label: "Cookie Consent", reason: "Fix consent flow to be GDPR compliant" });
    if ((answers.response ?? 0) < 3) recs.push({ path: "/patterns/threat/breach-notification", label: "Breach Notification", reason: "Create breach communication plan" });
    if ((answers.access ?? 0) < 3) recs.push({ path: "/patterns/owasp/broken-access-control", label: "Access Control", reason: "Implement visible RBAC in the UI" });
    if ((answers.ux ?? 0) < 3) recs.push({ path: "/score", label: "Security UX Score", reason: "Audit your current security UX" });
    if ((answers.ai ?? 0) < 3) recs.push({ path: "/patterns/ai/disclosure", label: "AI Disclosure", reason: "Label AI interactions — EU AI Act deadline Aug 2026" });
    if ((answers.industrial ?? 0) < 3 && (answers.industrial ?? 0) > 0) recs.push({ path: "/patterns/industrial/operator-auth", label: "Operator Auth", reason: "Implement glove-friendly authentication for operators" });
    if ((answers.industrial ?? 0) < 3 && (answers.industrial ?? 0) > 0) recs.push({ path: "/patterns/industrial/alarm-fatigue", label: "Alarm Management", reason: "Implement ISA-18.2 alarm grouping and shelving" });
    return recs.slice(0, 6);
  }, [answers]);

  const reset = () => {
    setAnswers({});
    setShowResults(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-mono mb-3 glow-text">Security UX Maturity</h1>
        <p className="text-base" style={{ color: "var(--text-bright)" }}>
          Assess where your product is today. Get a roadmap to the next level.
        </p>
      </div>

      {/* Maturity levels overview */}
      <div className="grid grid-cols-4 gap-3 mb-12">
        {LEVELS.map(({ level, name, description, color, icon }) => (
          <div
            key={level}
            className="border rounded-xl p-4 text-center transition-all"
            style={{
              borderColor: allAnswered && currentLevel === level ? color : "var(--border)",
              background: allAnswered && currentLevel === level ? `${color}15` : "var(--bg-card)",
              boxShadow: allAnswered && currentLevel === level ? `0 0 20px ${color}30` : "none",
            }}
          >
            <div className="text-2xl mb-1">{icon}</div>
            <div className="font-mono font-bold text-sm" style={{ color: allAnswered && currentLevel === level ? color : "var(--text-bright)" }}>
              Level {level}
            </div>
            <div className="font-mono text-xs" style={{ color }}>{name}</div>
            <p className="text-xs mt-1" style={{ color: "var(--text)" }}>{description}</p>
          </div>
        ))}
      </div>

      {!showResults ? (
        <>
          {/* Assessment questions */}
          <div className="space-y-6 mb-8">
            {QUESTIONS.map((q, qi) => (
              <div key={q.id} className="border rounded-xl p-6" style={{ borderColor: answers[q.id] !== undefined ? "var(--green-border)" : "var(--border)", background: "var(--bg-card)" }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono" style={{ color: "var(--text)" }}>{qi + 1}/{QUESTIONS.length}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "var(--bg-elevated)", color: "var(--text)" }}>{q.area}</span>
                </div>
                <h3 className="font-mono text-sm font-semibold mb-4" style={{ color: "var(--text-bright)" }}>{q.question}</h3>

                <div className="space-y-2">
                  {q.levels.map((desc, li) => (
                    <button
                      key={li}
                      onClick={() => setAnswers(prev => ({ ...prev, [q.id]: li + 1 }))}
                      className="w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all border-none cursor-pointer"
                      style={{
                        background: answers[q.id] === li + 1 ? `${LEVELS[li].color}15` : "var(--bg-elevated)",
                        outline: answers[q.id] === li + 1 ? `2px solid ${LEVELS[li].color}` : "none",
                      }}
                    >
                      <div className="shrink-0 mt-0.5">
                        {answers[q.id] === li + 1
                          ? <CheckCircle2 className="w-4 h-4" style={{ color: LEVELS[li].color }} />
                          : <Circle className="w-4 h-4" style={{ color: "#333" }} />
                        }
                      </div>
                      <div>
                        <span className="text-xs font-mono" style={{ color: LEVELS[li].color }}>Level {li + 1}</span>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-bright)" }}>{desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowResults(true)}
            disabled={!allAnswered}
            className="w-full py-4 rounded-xl font-mono font-bold text-sm border-none cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: allAnswered ? "var(--green)" : "#333", color: allAnswered ? "var(--bg)" : "#666" }}
          >
            {allAnswered ? "$ generate --maturity-report" : `Answer all questions (${Object.keys(answers).length}/${QUESTIONS.length})`}
          </button>
        </>
      ) : (
        <>
          {/* Results */}
          <div className="border rounded-2xl p-8 mb-8 text-center" style={{ borderColor: levelData.color, background: `${levelData.color}10` }}>
            <div className="text-6xl mb-3">{levelData.icon}</div>
            <div className="text-3xl font-mono font-bold mb-1" style={{ color: levelData.color }}>Level {currentLevel}: {levelData.name}</div>
            <p className="text-sm" style={{ color: "var(--text-bright)" }}>{levelData.description}</p>
            <p className="text-xs mt-2" style={{ color: "var(--text)" }}>Average score: {avgLevel.toFixed(1)} / 4.0</p>

            {/* Per-area breakdown */}
            <div className="grid grid-cols-5 gap-2 mt-6">
              {QUESTIONS.map(q => {
                const level = answers[q.id] ?? 1;
                const lvl = LEVELS[level - 1];
                return (
                  <div key={q.id} className="text-center">
                    <div className="text-lg">{lvl.icon}</div>
                    <p className="text-xs font-mono" style={{ color: lvl.color }}>{level}</p>
                    <p className="text-xs" style={{ color: "var(--text)" }}>{q.area}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weakest areas */}
          <div className="border rounded-xl p-6 mb-6" style={{ borderColor: "rgba(255,170,0,0.3)", background: "rgba(255,170,0,0.05)" }}>
            <h3 className="font-mono text-sm font-semibold mb-3" style={{ color: "var(--amber)" }}>
              <Target className="w-4 h-4 inline mr-2" />
              Priority areas for improvement
            </h3>
            <div className="space-y-2">
              {weakestAreas.map(q => (
                <div key={q.id} className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: "var(--text-bright)" }}>{q.area}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono" style={{ color: LEVELS[(answers[q.id] ?? 1) - 1].color }}>
                      Level {answers[q.id]}
                    </span>
                    <ArrowRight className="w-3 h-3" style={{ color: "var(--text)" }} />
                    <span className="text-xs font-mono" style={{ color: LEVELS[Math.min((answers[q.id] ?? 1), 3)].color }}>
                      Level {Math.min((answers[q.id] ?? 1) + 1, 4)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended patterns */}
          {patternRecommendations.length > 0 && (
            <div className="border rounded-xl p-6 mb-6" style={{ borderColor: "var(--green-border)", background: "var(--green-glow)" }}>
              <h3 className="font-mono text-sm font-semibold mb-3" style={{ color: "var(--green)" }}>
                <Shield className="w-4 h-4 inline mr-2" />
                Recommended patterns to implement next
              </h3>
              <div className="space-y-2">
                {patternRecommendations.map(rec => (
                  <Link
                    key={rec.path}
                    to={rec.path}
                    className="flex items-center justify-between p-3 rounded-lg no-underline transition-all"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                  >
                    <div>
                      <p className="font-mono text-sm" style={{ color: "var(--text-bright)" }}>{rec.label}</p>
                      <p className="text-xs" style={{ color: "var(--text)" }}>{rec.reason}</p>
                    </div>
                    <ChevronRight className="w-4 h-4" style={{ color: "var(--green)" }} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Next level roadmap */}
          {nextLevel && (
            <div className="border rounded-xl p-6 mb-6" style={{ borderColor: `${nextLevel.color}40`, background: `${nextLevel.color}08` }}>
              <h3 className="font-mono text-sm font-semibold mb-3" style={{ color: nextLevel.color }}>
                Roadmap to Level {nextLevel.level}: {nextLevel.name}
              </h3>
              <div className="space-y-2">
                {QUESTIONS.filter(q => (answers[q.id] ?? 1) < nextLevel.level).map(q => (
                  <div key={q.id} className="flex items-start gap-2 text-xs">
                    <Circle className="w-3 h-3 mt-0.5 shrink-0" style={{ color: nextLevel.color }} />
                    <div>
                      <span style={{ color: "var(--text-bright)" }}>{q.area}:</span>{" "}
                      <span style={{ color: "var(--text)" }}>{q.levels[nextLevel.level - 1]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button onClick={reset} className="w-full py-3 rounded-xl font-mono text-sm border cursor-pointer" style={{ borderColor: "var(--border)", color: "var(--text)", background: "var(--bg-card)" }}>
            Retake assessment
          </button>
        </>
      )}
    </div>
  );
}
