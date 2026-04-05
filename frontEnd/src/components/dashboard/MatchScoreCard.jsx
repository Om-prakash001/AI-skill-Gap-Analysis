import { ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";

export default function MatchScoreCard({ pct, dark }) {
  const color = pct >= 70 ? "#10b981" : pct >= 40 ? "#f59e0b" : "#ef4444";
  const label = pct >= 70 ? "Strong match" : pct >= 40 ? "Moderate match" : "Needs work";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm">
      <p className="text-sm font-medium text-slate-500 mb-4">Overall Match</p>

      <div className="relative w-44 h-44">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="70%" outerRadius="100%"
            data={[{ value: pct, fill: color }]}
            startAngle={90} endAngle={-270}
          >
            <RadialBar dataKey="value" cornerRadius={8}
              background={{ fill: dark ? "#27272a" : "#f1f5f9" }} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl font-bold text-slate-900">{pct}%</span>
          <span className="text-xs font-semibold mt-1" style={{ color }}>{label}</span>
        </div>
      </div>

      <div className="mt-5 w-full space-y-1.5">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Match score</span>
          <span style={{ color }}>{pct}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5">
          <div className="h-1.5 rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, backgroundColor: color }} />
        </div>
        <div className="flex justify-between text-xs text-slate-300">
          <span>0%</span><span>100%</span>
        </div>
      </div>
    </div>
  );
}