import { Link } from "react-router-dom";

export default function LandingNav({ user, logout, onAnalyzeClick }) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <span className="font-semibold text-slate-900 text-lg tracking-tight">
            SkillGap<span className="text-indigo-600">.ai</span>
          </span>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm text-slate-500 hover:text-slate:900 transition-colors">How it works</a>
          <button onClick={onAnalyzeClick} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
            Analyze resume
          </button>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-slate-500 hidden sm:block">Hey, <span className="text-slate-800 font-medium">{user.name}</span></span>
              <button onClick={onAnalyzeClick}
                className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                Dashboard
              </button>
              <button onClick={logout} className="text-sm text-slate-400 hover:text-red-500 transition-colors">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-slate-600 hover:text-slate-900 transition-colors px-4 py-2">
                Sign in
              </Link>
              <Link to="/register"
                className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}