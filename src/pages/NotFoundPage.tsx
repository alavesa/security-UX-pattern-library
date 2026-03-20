import { Link } from "react-router-dom";
import { Terminal } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="max-w-lg mx-auto px-6 py-24 text-center">
      <Terminal className="w-12 h-12 mx-auto mb-6" style={{ color: "var(--red)" }} />

      <div className="font-mono text-left p-6 rounded-xl mb-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <div style={{ color: "#444" }}>$ cd /patterns/unknown</div>
        <div style={{ color: "var(--red)" }}>bash: cd: /patterns/unknown: No such file or directory</div>
        <div className="mt-2" style={{ color: "#444" }}>$ find . -name "page"</div>
        <div style={{ color: "var(--amber)" }}>0 results found</div>
        <div className="mt-2" style={{ color: "#444" }}>$ echo $?</div>
        <div style={{ color: "var(--red)" }}>404</div>
        <div className="cursor-blink mt-2" style={{ color: "#444" }}>$</div>
      </div>

      <h1 className="text-2xl font-mono font-bold mb-2" style={{ color: "var(--text-bright)" }}>Page not found</h1>
      <p className="text-sm mb-6" style={{ color: "var(--text)" }}>The pattern you're looking for doesn't exist yet.</p>

      <div className="flex gap-3 justify-center">
        <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm no-underline" style={{ background: "var(--green)", color: "var(--bg)" }}>
          ~/home
        </Link>
        <Link to="/score" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm no-underline border" style={{ borderColor: "var(--border)", color: "var(--text-bright)" }}>
          score
        </Link>
      </div>
    </div>
  );
}
