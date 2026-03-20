import { Link } from "react-router-dom";
import { Shield, Lock, LogIn, KeyRound, Timer, UserCheck } from "lucide-react";

const AUTH_PATTERNS = [
  {
    path: "/patterns/auth/login",
    label: "Login Flow",
    icon: LogIn,
    description: "Secure login with rate limiting, error handling, and progressive disclosure",
  },
  {
    path: "/patterns/auth/mfa",
    label: "Multi-Factor Authentication",
    icon: Shield,
    description: "TOTP, SMS, and hardware key flows with clear user guidance",
  },
  {
    path: "/patterns/auth/password-strength",
    label: "Password Strength",
    icon: KeyRound,
    description: "Real-time feedback, zxcvbn-style scoring, and breach detection",
  },
  {
    path: "/patterns/auth/session-timeout",
    label: "Session Timeout",
    icon: Timer,
    description: "Graceful timeout warnings, auto-save, and secure re-authentication",
  },
  {
    path: "/patterns/auth/account-recovery",
    label: "Account Recovery",
    icon: UserCheck,
    description: "Secure recovery flows that balance usability with identity verification",
  },
];

export function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="px-6 py-24 text-center border-b border-gray-200">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Lock className="w-4 h-4" />
            Open Source Pattern Library
          </div>
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-6">
            Security UX Patterns
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Interactive patterns for designing secure user experiences.
            Built from 20 years of UX design leadership and a double M.Sc. in
            Cyber Security and Information Systems.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/patterns/auth/login"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors no-underline"
            >
              Explore Patterns
            </Link>
            <a
              href="https://github.com/alavesa/security-UX-pattern-library"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors no-underline"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Pattern Categories */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Patterns</h2>
        <p className="text-gray-600 mb-8">How to design auth flows that are both secure and usable.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AUTH_PATTERNS.map(({ path, label, icon: Icon, description }) => (
            <Link
              key={path}
              to={path}
              className="group border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-sm transition-all no-underline"
            >
              <Icon className="w-8 h-8 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-900 mb-2">{label}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            </Link>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
          <p className="text-gray-600 mb-8">More pattern categories in development.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: "Permissions & Access Control", desc: "Role-based access, consent flows, admin controls" },
              { label: "Threat Response", desc: "Breach notifications, phishing warnings, incident response" },
              { label: "Data Protection", desc: "Encryption indicators, secure sharing, privacy controls" },
            ].map(({ label, desc }) => (
              <div key={label} className="border border-dashed border-gray-200 rounded-xl p-6 opacity-50">
                <Lock className="w-8 h-8 text-gray-300 mb-4" />
                <h3 className="font-semibold text-gray-400 mb-2">{label}</h3>
                <p className="text-sm text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-8 text-center text-sm text-gray-400">
        <p>Built by <a href="https://www.neversay.no" className="text-gray-600 hover:text-gray-900">Piia Alavesa</a> — Senior UX Design Leader</p>
        <p className="mt-1">M.Sc. Cyber Security + M.Sc. Information Systems</p>
      </footer>
    </div>
  );
}
