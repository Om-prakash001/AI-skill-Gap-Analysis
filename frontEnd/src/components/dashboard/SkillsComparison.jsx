const PRIORITY_BADGE = {
  High:   "bg-red-50 text-red-600 border border-red-100",
  Medium: "bg-amber-50 text-amber-600 border border-amber-100",
  Low:    "bg-emerald-50 text-emerald-600 border border-emerald-100",
};

export default function SkillsComparison({ existingSkills, missingSkills }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">

        {/* Left — skills you have */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <h3 className="font-semibold text-slate-900">Skills you have</h3>
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
              {existingSkills.length} matched
            </span>
          </div>
          <div className="space-y-3">
            {existingSkills.map((s, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className="shrink-0 w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center transition-transform group-hover:scale-110">
                  <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-slate-700 font-medium">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — skill gaps */}
        <div className="p-6 bg-slate-50/40">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <h3 className="font-semibold text-slate-900">Skill gaps</h3>
            </div>
            <span className="text-xs font-medium text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full">
              {missingSkills.length} missing
            </span>
          </div>
          <div className="space-y-4">
            {missingSkills.map((s, i) => (
              <div key={i} className="flex items-start justify-between gap-3 group">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-indigo-500 transition-colors" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{s.skill}</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed max-w-xs">{s.reason}</p>
                  </div>
                </div>
                <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-md ${PRIORITY_BADGE[s.priority] || ""}`}>
                  {s.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}