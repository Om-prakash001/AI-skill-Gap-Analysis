import { Link } from "react-router-dom";

export default function CtaFooter({ user, onAnalyzeClick }) {
  return (
    <>
      {/* CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">
            Ready to close your skill gap?
          </h2>
          <p className="text-slate-500 mb-8">
            Analyze your resume in seconds and get a personalized roadmap to your dream role.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {user ? (
              <button onClick={onAnalyzeClick}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-xl transition-all hover:shadow-md text-sm">
                Analyze my resume
              </button>
            ) : (
              <>
                <Link to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-xl transition-all hover:shadow-md text-sm">
                  Create free account
                </Link>
                <Link to="/login" className="text-sm text-slate-500 hover:text-slate-800 transition-colors">
                  Already have an account →
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-slate-700">
              SkillGap<span className="text-indigo-600">.ai</span>
            </span>
          </div>
          <p className="text-xs text-slate-400">
            B.Tech final year project · React · Node.js · MongoDB · Gemini AI
          </p>
        </div>
      </footer>
    </>
  );
}