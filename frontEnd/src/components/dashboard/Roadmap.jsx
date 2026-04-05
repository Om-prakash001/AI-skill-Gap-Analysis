import { useState } from "react";

export default function Roadmap({ steps }) {
  const [completed, setCompleted] = useState([]);
  const [expanded, setExpanded] = useState(null);

  const progress = steps.length > 0 ? Math.round((completed.length / steps.length) * 100) : 0;

  const toggleDone = (i) =>
    setCompleted((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500" />
          <h3 className="font-semibold text-slate-900">Learning Roadmap</h3>
        </div>
        <span className="text-sm font-semibold text-indigo-600">
          {completed.length}/{steps.length} complete
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 bg-slate-100 rounded-full h-2">
          <div className="h-2 rounded-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${progress}%` }} />
        </div>
        <span className="text-xs font-semibold text-indigo-500 w-8 text-right">{progress}%</span>
      </div>

      {/* Steps */}
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-100" />
        <div className="space-y-2">
          {steps.map((step, i) => {
            const done = completed.includes(i);
            const open = expanded === i;
            return (
              <div key={i}
                onClick={() => setExpanded(open ? null : i)}
                className={`relative flex gap-4 rounded-xl p-3 cursor-pointer select-none transition-all ${
                  open
                    ? "bg-indigo-50 border border-indigo-100"
                    : "hover:bg-slate-50 border border-transparent"
                }`}
              >
                {/* Circle button */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleDone(i); }}
                  className={`shrink-0 z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    done
                      ? "bg-indigo-600 border-indigo-600"
                      : "bg-white border-slate-200 hover:border-indigo-400"
                  }`}
                >
                  {done ? (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-xs font-bold text-slate-400">{i + 1}</span>
                  )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm font-semibold transition-all ${done ? "line-through text-slate-400" : "text-slate-800"}`}>
                      {step.topic}
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        {step.week}
                      </span>
                      <svg
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Expanded content */}
                  {open && (
                    <div className="mt-3 pt-3 border-t border-indigo-100 flex flex-wrap items-center gap-2">
                      <a
                        href={step.resourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {step.resource}
                      </a>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleDone(i); }}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-colors ${
                          done
                            ? "border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100"
                            : "border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                        }`}
                      >
                        {done ? "↩ Mark incomplete" : "✓ Mark complete"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion banner */}
      {completed.length === steps.length && steps.length > 0 && (
        <div className="mt-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
          <p className="text-emerald-700 font-semibold text-sm">
            🎉 Roadmap complete! You're ready for the role.
          </p>
        </div>
      )}
    </div>
  );
}