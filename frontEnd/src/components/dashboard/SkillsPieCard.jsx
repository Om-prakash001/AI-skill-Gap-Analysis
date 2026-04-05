import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function SkillsPieCard({ existing, missing, dark }) {
  const COLORS = ["#6366f1", dark ? "#27272a" : "#e2e8f0"];
  const data = [
    { name: "You have", value: existing },
    { name: "Gaps",     value: missing  },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm">
      <p className="text-sm font-medium text-slate-500 mb-2">Skills Breakdown</p>

      <div className="relative">
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={52} outerRadius={78}
              dataKey="value" paddingAngle={3}>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-slate-900">{existing}</span>
          <span className="text-xs text-slate-400">of {existing + missing}</span>
        </div>
      </div>

      <div className="flex gap-5 mt-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-1.5 text-sm">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
            <span className="text-slate-500">{d.name}</span>
            <span className="font-bold text-slate-800">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}