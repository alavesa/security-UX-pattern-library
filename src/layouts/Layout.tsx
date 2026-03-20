import { Outlet, Link, useLocation } from "react-router-dom";
import { Shield, Lock, KeyRound, Timer, UserCheck, LogIn } from "lucide-react";

const AUTH_PATTERNS = [
  { path: "/patterns/auth/login", label: "Login Flow", icon: LogIn },
  { path: "/patterns/auth/mfa", label: "Multi-Factor Auth", icon: Shield },
  { path: "/patterns/auth/password-strength", label: "Password Strength", icon: KeyRound },
  { path: "/patterns/auth/session-timeout", label: "Session Timeout", icon: Timer },
  { path: "/patterns/auth/account-recovery", label: "Account Recovery", icon: UserCheck },
];

export function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-900 no-underline">
            <Lock className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-lg">Security UX Patterns</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/" className="text-gray-600 hover:text-gray-900 no-underline">Home</Link>
            <a href="https://github.com/alavesa/security-UX-pattern-library" target="_blank" rel="noopener" className="text-gray-600 hover:text-gray-900 no-underline">GitHub</a>
            <span className="text-xs text-gray-400">by Piia Alavesa</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        {!isHome && (
          <aside className="w-64 shrink-0 border-r border-gray-200 min-h-[calc(100vh-4rem)] p-6 hidden lg:block">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Authentication</h3>
            <nav className="space-y-1">
              {AUTH_PATTERNS.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm no-underline transition-colors ${
                    location.pathname === path
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
            </nav>

            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-8 mb-4">Coming Soon</h3>
            <nav className="space-y-1">
              {["Permissions & Access", "Threat Response", "Data Protection", "Privacy Controls"].map(label => (
                <span key={label} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300">
                  <Lock className="w-4 h-4" />
                  {label}
                </span>
              ))}
            </nav>
          </aside>
        )}

        {/* Main content */}
        <main className={`flex-1 ${isHome ? "" : "p-8"}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
