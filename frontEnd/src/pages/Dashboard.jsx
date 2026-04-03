import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import {
  RadialBarChart, RadialBar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell,
} from "recharts";

const PRIORITY = {
  High:   { badge: "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400" },
  Medium: { badge: "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" },
  Low:    { badge: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" },
};

function Navbar({ user, logout, navigate }) {
  const { dark, toggle } = useTheme();
  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/90 backdrop-blur px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <span className="font-bold text-slate-900 dark:text-white tracking-tight">SkillGap<span className="text-indigo-500">.ai</span></span>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={toggle} className="w-9 h-9 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors">
          {dark ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          )}
        </button>
        <button onClick={() => navigate("/upload")} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">New Analysis</button>
        <span className="text-slate-500 dark:text-zinc-500 text-sm hidden sm:block">{user?.name}</span>
        <button onClick={logout} className="text-slate-400 dark:text-zinc-600 hover:text-slate-600 dark:hover:text-zinc-400 text-sm transition-colors">Logout</button>
      </div>
    </nav>
  );
}

function MatchScoreCard({ pct }) {
  const { dark } = useTheme();
  const color = pct >= 70 ? "#10b981" : pct >= 40 ? "#f59e0b" : "#ef4444";
  const label = pct >= 70 ? "Strong Match" : pct >= 40 ? "Moderate Match" : "Needs Work";
  return (
    <div className="card flex flex-col items-center justify-center py-8">
      <p className="text-sm font-medium text-slate-500 dark:text-zinc-500 mb-4">Overall Match</p>
      <div className="relative w-44 h-44">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ value: pct, fill: color }]} startAngle={90} endAngle={-270}>
            <RadialBar dataKey="value" cornerRadius={8} background={{ fill: dark ? "#27272a" : "#e2e8f0" }} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl font-bold text-slate-900 dark:text-white">{pct}%</span>
          <span className="text-xs font-semibold mt-1" style={{ color }}>{label}</span>
        </div>
      </div>
      <div className="mt-5 w-full space-y-1.5">
        <div className="flex justify-between text-xs text-slate-400 dark:text-zinc-600"><span>Match score</span><span style={{ color }}>{pct}%</span></div>
        <div className="w-full bg-slate-100 dark:bg-zinc-800 rounded-full h-1.5">
          <div className="h-1.5 rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
        </div>
        <div className="flex justify-between text-xs text-slate-300 dark:text-zinc-700"><span>0%</span><span>100%</span></div>
      </div>
    </div>
  );
}

function SkillsPieCard({ existing, missing }) {
  const { dark } = useTheme();
  const COLORS = ["#6366f1", dark ? "#27272a" : "#e2e8f0"];
  const data = [{ name: "You have", value: existing }, { name: "Gaps", value: missing }];
  return (
    <div className="card flex flex-col items-center justify-center py-8">
      <p className="text-sm font-medium text-slate-500 dark:text-zinc-500 mb-2">Skills Breakdown</p>
      <div className="relative">
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={52} outerRadius={78} dataKey="value" paddingAngle={3}>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-slate-900 dark:text-white">{existing}</span>
          <span className="text-xs text-slate-400 dark:text-zinc-600">of {existing + missing}</span>
        </div>
      </div>
      <div className="flex gap-5 mt-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-1.5 text-sm">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
            <span className="text-slate-500 dark:text-zinc-500">{d.name}</span>
            <span className="font-bold text-slate-800 dark:text-white">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PriorityChart({ missingSkills }) {
  const { dark } = useTheme();
  const counts = missingSkills.reduce((acc, s) => { acc[s.priority] = (acc[s.priority] || 0) + 1; return acc; }, {});
  const data = [
    { name: "High", count: counts.High || 0, fill: "#ef4444" },
    { name: "Medium", count: counts.Medium || 0, fill: "#f59e0b" },
    { name: "Low", count: counts.Low || 0, fill: "#10b981" },
  ];
  return (
    <div className="card h-full flex flex-col">
      <p className="text-sm font-medium text-slate-500 dark:text-zinc-500 mb-4">Gap Priority</p>
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={40}>
            <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#27272a" : "#f1f5f9"} vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: dark ? "#71717a" : "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: dark ? "#71717a" : "#94a3b8" }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip contentStyle={{ background: dark ? "#18181b" : "#fff", border: `1px solid ${dark ? "#27272a" : "#e2e8f0"}`, borderRadius: 8, fontSize: 12, color: dark ? "#fff" : "#0f172a" }} cursor={{ fill: dark ? "#27272a" : "#f8fafc" }} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>{data.map((d, i) => <Cell key={i} fill={d.fill} />)}</Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SkillsComparison({ existingSkills, missingSkills }) {
  return (
    <div className="card p-0 overflow-hidden">
      {/* Using a single grid for both sections ensures they are naturally 
        the exact same height. The divider creates a clean separation.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-zinc-800/50">
        
        {/* Left Side: Skills You Have */}
        <div className="p-6 bg-white dark:bg-zinc-900/30">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <h3 className="font-semibold text-slate-900 dark:text-white">Skills You Have</h3>
            </div>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full">
              {existingSkills.length} matches
            </span>
          </div>
          <div className="space-y-4">
            {existingSkills.map((s, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className="shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center transition-transform group-hover:scale-110">
                  <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-zinc-300">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Skill Gaps */}
        <div className="p-6 bg-slate-50/50 dark:bg-zinc-900/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <h3 className="font-semibold text-slate-900 dark:text-white">Skill Gaps</h3>
            </div>
            <span className="text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-2.5 py-1 rounded-full">
              {missingSkills.length} missing
            </span>
          </div>
          <div className="space-y-5">
            {missingSkills.map((s, i) => (
              <div key={i} className="flex items-start justify-between gap-4 group">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5 w-2 h-2 rounded-full bg-slate-300 dark:bg-zinc-700 group-hover:bg-indigo-500 transition-colors" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">{s.skill}</p>
                    <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1 max-w-[250px] leading-relaxed">{s.reason}</p>
                  </div>
                </div>
                <span className={`shrink-0 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${PRIORITY[s.priority]?.badge}`}>
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

function Roadmap({ steps }) {
  const [completed, setCompleted] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const progress = Math.round((completed.length / steps.length) * 100);
  const toggleDone = (i) => setCompleted((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500" />
          <h3 className="font-semibold text-slate-900 dark:text-white">Learning Roadmap</h3>
        </div>
        <span className="text-sm font-semibold text-indigo-500">{completed.length}/{steps.length} complete</span>
      </div>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 bg-slate-100 dark:bg-zinc-800 rounded-full h-2">
          <div className="h-2 rounded-full bg-indigo-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-xs font-semibold text-indigo-500 w-8 text-right">{progress}%</span>
      </div>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200 dark:bg-zinc-800" />
        <div className="space-y-2">
          {steps.map((step, i) => {
            const done = completed.includes(i);
            const open = expanded === i;
            return (
              <div key={i} onClick={() => setExpanded(open ? null : i)}
                className={`relative flex gap-4 rounded-xl p-3 transition-all cursor-pointer select-none ${open ? "bg-indigo-50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/20" : "hover:bg-slate-50 dark:hover:bg-zinc-800/40"}`}>
                <button onClick={(e) => { e.stopPropagation(); toggleDone(i); }}
                  className={`shrink-0 z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${done ? "bg-indigo-500 border-indigo-500" : "bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 hover:border-indigo-400"}`}>
                  {done ? (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <span className="text-xs font-bold text-slate-400 dark:text-zinc-600">{i + 1}</span>
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm font-semibold transition-all ${done ? "line-through text-slate-400 dark:text-zinc-600" : "text-slate-800 dark:text-white"}`}>{step.topic}</p>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-slate-400 dark:text-zinc-600 bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">{step.week}</span>
                      <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                  {open && (
                    <div className="mt-3 pt-3 border-t border-indigo-100 dark:border-indigo-500/20 flex flex-wrap items-center gap-2">
                      <a href={step.resourceUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        {step.resource}
                      </a>
                      <button onClick={(e) => { e.stopPropagation(); toggleDone(i); }}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${done ? "bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400" : "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"}`}>
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
      {completed.length === steps.length && steps.length > 0 && (
        <div className="mt-5 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-center">
          <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">🎉 Roadmap complete! You're ready for the role.</p>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const result = state?.result;

  if (!result) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 dark:text-zinc-500 mb-4">No analysis data found.</p>
          <button onClick={() => navigate("/upload")} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium">Analyze a Resume</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
      <Navbar user={user} logout={logout} navigate={navigate} />
      
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
        {/* Top Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <p className="text-xs font-medium text-slate-400 dark:text-zinc-600 uppercase tracking-widest mb-1">Analysis Results</p>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{result.targetRole}</h1>
              <p className="text-slate-500 dark:text-zinc-400 mt-2 text-sm max-w-2xl leading-relaxed">{result.summary}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <MatchScoreCard pct={result.matchPercentage} />
              <SkillsPieCard existing={result.existingSkills.length} missing={result.missingSkills.length} />
            </div>
          </div>

          <div className="lg:col-span-1 pt-0 lg:pt-0">
            <PriorityChart missingSkills={result.missingSkills} />
          </div>
        </div>

        {/* Unified Skills Comparison Block */}
        <SkillsComparison existingSkills={result.existingSkills} missingSkills={result.missingSkills} />

        {/* Roadmap */}
        <Roadmap steps={result.roadmap} />
      </div>
    </div>
  );
}