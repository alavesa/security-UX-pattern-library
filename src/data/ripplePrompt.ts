import { ALL_PATTERNS, type Category } from "./patterns";

export interface ExampleHeadline {
  label: string;
  headline: string;
}

export const EXAMPLE_HEADLINES: ExampleHeadline[] = [
  { label: "supply chain attack", headline: "Axios npm package compromised in supply chain attack via stolen maintainer credentials" },
  { label: "AI regulation", headline: "EU AI Act enforcement begins with first fines for non-compliant high-risk AI systems" },
  { label: "critical infrastructure", headline: "Hospital ransomware attack shuts down emergency systems for 72 hours" },
  { label: "data breach", headline: "Social platform exposes 200 million user records through misconfigured API endpoint" },
];

const CATEGORY_LABELS: Record<Category, string> = {
  auth: "Authentication",
  threat: "Threat Response",
  dark: "Dark Patterns",
  data: "Data Protection",
  owasp: "OWASP Top 10",
  ai: "AI Transparency",
  industrial: "Industrial Security",
  governance: "Governance",
};

export function buildRipplePrompt(headline: string): string {
  const grouped = new Map<Category, typeof ALL_PATTERNS>();
  for (const p of ALL_PATTERNS) {
    const list = grouped.get(p.category) || [];
    list.push(p);
    grouped.set(p.category, list);
  }

  let patternSection = "";
  for (const [cat, patterns] of grouped) {
    patternSection += `\n### ${CATEGORY_LABELS[cat]} (${patterns.length} patterns)\n`;
    for (const p of patterns) {
      patternSection += `- ${p.label} (uxsec.dev${p.path}) — ${p.tags.join(", ")}\n`;
    }
  }

  return `You are Ripple, an analysis engine from uxsec.dev — the Security UX Pattern Library.

Given a news headline or event, analyze it through exactly three lenses.
For each lens, reference 2-5 specific patterns from the uxsec.dev library listed below.
Include the pattern name and its URL so the reader can explore further.

## uxsec.dev Pattern Library (${ALL_PATTERNS.length} patterns)
${patternSection}
## Analysis Lenses

### 1. UX & Design Systems
How does this event change what interfaces need to do? Which design tokens, component behaviors, or interaction patterns become insufficient or need rethinking? What user-facing flows are affected?
Reference specific uxsec.dev patterns that become more critical.

### 2. Security & Compliance
What are the cybersecurity implications? Which regulatory frameworks are most relevant — pick from NIS2, GDPR, DORA, PCI DSS, IEC 62443, Cyber Resilience Act, or others as appropriate. Don't force NIS2 if another framework fits better.
Reference specific uxsec.dev patterns that address these concerns.

### 3. AI & Emerging Risk
What are the implications for AI governance, automated decision-making, generative UI, or supply chain trust? Consider the EU AI Act where relevant, but also broader emerging risks: AI-generated content, model supply chain integrity, agentic AI access patterns, or dark patterns enabled by AI.
Reference specific uxsec.dev patterns where applicable. If the headline has no AI angle, say so briefly.

## Rules
- Keep each lens to 3-5 sentences. Be specific and opinionated, not generic.
- Always cite patterns by name with their full URL (e.g., "Login Flow — uxsec.dev/patterns/auth/login").
- If a lens has no strong connection to the headline, say so briefly rather than forcing weak links.
- Write in a professional but direct tone. No filler.

## Headline to analyze:
"${headline}"`;
}

export function matchPatternsToHeadline(headline: string): typeof ALL_PATTERNS {
  const lower = headline.toLowerCase();

  const scored = ALL_PATTERNS.map((p) => {
    let score = 0;
    for (const tag of p.tags) {
      if (lower.includes(tag.toLowerCase())) score += 2;
    }
    if (lower.includes(p.label.toLowerCase())) score += 3;
    const catKeywords: Record<Category, string[]> = {
      auth: ["login", "password", "authentication", "credential", "mfa", "passkey", "oauth", "session"],
      threat: ["breach", "phishing", "attack", "hack", "incident", "ransomware", "malware"],
      dark: ["dark pattern", "consent", "unsubscribe", "manipulat", "deceptive", "bait"],
      data: ["encrypt", "upload", "delet", "audit", "log", "data"],
      owasp: ["access control", "misconfigur", "monitor", "logging", "vulnerability"],
      ai: ["ai", "artificial intelligence", "chatbot", "deepfake", "machine learning", "llm", "generative"],
      industrial: ["industrial", "operator", "safety", "alarm", "scada", "ot ", "control system", "hmi"],
      governance: ["compliance", "audit", "review", "change management", "regulation", "nis2", "gdpr", "dora"],
    };
    for (const kw of catKeywords[p.category] || []) {
      if (lower.includes(kw)) score += 1;
    }
    return { pattern: p, score };
  });

  const matches = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((s) => s.pattern);

  if (matches.length < 3) {
    const categoryScores = new Map<Category, number>();
    for (const { pattern, score } of scored) {
      categoryScores.set(pattern.category, (categoryScores.get(pattern.category) || 0) + score);
    }
    const topCat = [...categoryScores.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
    if (topCat) {
      for (const p of ALL_PATTERNS.filter((p) => p.category === topCat)) {
        if (!matches.includes(p) && matches.length < 5) matches.push(p);
      }
    }
  }

  return matches;
}
