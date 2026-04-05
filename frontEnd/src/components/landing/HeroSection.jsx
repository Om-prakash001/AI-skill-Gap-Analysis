import { Link } from "react-router-dom";

export default function HeroSection({ onAnalyzeClick }) {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left — copy */}
        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
            Powered by Google Gemini AI
          </div>

          <h1 className="text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
            Know exactly what's<br />
            <span className="text-indigo-600">holding you back</span>
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-md">
            Upload your resume, enter your dream role. Get a precise skill gap analysis, match score, and a week-by-week learning roadmap — in seconds.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button onClick={onAnalyzeClick}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-all hover:shadow-md text-sm flex items-center gap-2">
              Try resume analysis
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <a href="#how-it-works" className="text-sm text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1.5">
              See how it works
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          <div className="flex items-center gap-6 mt-10 pt-10 border-t border-slate-100">
            {[["Free to use", "No credit card"], ["AI-powered", "Gemini 1.5 Flash"], ["Instant results", "Under 10 seconds"]].map(([a, b]) => (
              <div key={a}>
                <p className="text-sm font-medium text-slate-800">{a}</p>
                <p className="text-xs text-slate-400">{b}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — mock result card */}
        <div className="relative hidden lg:block">
          <div className="absolute -top-4 -right-4 w-48 h-48 opacity-20"
            style={{ backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

          <div className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Analyzing for</p>
                <p className="text-sm font-semibold text-slate-800">Full Stack Developer</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-indigo-600">72%</p>
                <p className="text-xs text-slate-400">match score</p>
              </div>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-1.5 mb-5">
              <div className="h-1.5 rounded-full bg-indigo-500" style={{ width: "72%" }} />
            </div>

            <p className="text-xs text-slate-400 mb-2">Skills found</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {["React", "CSS", "Git", "JavaScript", "Node.js"].map(s => (
                <span key={s} className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">✓ {s}</span>
              ))}
            </div>

            <p className="text-xs text-slate-400 mb-2">Top gaps</p>
            <div className="space-y-2 mb-4">
              {[["TypeScript", "High"], ["Docker", "Medium"], ["System Design", "High"]].map(([s, p]) => (
                <div key={s} className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2">
                  <span className="text-xs font-medium text-slate-700">{s}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p === "High" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}>{p}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 mb-2">Next step</p>
              <div className="flex items-center gap-2 bg-indigo-50 rounded-lg px-3 py-2">
                <div className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <p className="text-xs font-medium text-indigo-900">Learn TypeScript basics</p>
                  <p className="text-xs text-indigo-500">Week 1–2 · Official TypeScript Docs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}