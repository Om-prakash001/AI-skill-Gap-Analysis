import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

import DashboardNav    from "../components/dashboard/DashboardNav.jsx";
import MatchScoreCard  from "../components/dashboard/MatchScoreCard.jsx";
import SkillsPieCard   from "../components/dashboard/SkillsPieCard.jsx";
import PriorityChart   from "../components/dashboard/PriorityChart.jsx";
import SkillsComparison from "../components/dashboard/SkillsComparison.jsx";
import Roadmap         from "../components/dashboard/Roadmap.jsx";

export default function Dashboard() {
  const { state } = useLocation();
  const navigate  = useNavigate();
  const { user, logout } = useAuth();
  const result = state?.result;

  const [dark, setDark] = useState(false);

  if (!result) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-4">No analysis data found.</p>
          <button
            onClick={() => navigate("/upload")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            Analyze a resume
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? "bg-zinc-950" : "bg-slate-50"}`}>
      <DashboardNav
        user={user}
        logout={logout}
        navigate={navigate}
        dark={dark}
        setDark={setDark}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-6">

        {/* Page header */}
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-1">
            Analysis Results
          </p>
          <h1 className={`text-3xl font-bold tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>
            {result.targetRole}
          </h1>
          <p className={`mt-2 text-sm max-w-2xl leading-relaxed ${dark ? "text-zinc-400" : "text-slate-500"}`}>
            {result.summary}
          </p>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <MatchScoreCard pct={result.matchPercentage} dark={dark} />
            <SkillsPieCard
              existing={result.existingSkills.length}
              missing={result.missingSkills.length}
              dark={dark}
            />
          </div>
          <div className="lg:col-span-1">
            <PriorityChart missingSkills={result.missingSkills} dark={dark} />
          </div>
        </div>

        {/* Skills comparison */}
        <SkillsComparison
          existingSkills={result.existingSkills}
          missingSkills={result.missingSkills}
        />

        {/* Roadmap */}
        <Roadmap steps={result.roadmap} />

      </div>
    </div>
  );
}