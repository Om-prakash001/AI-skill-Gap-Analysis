const steps = [
  { num: "01", title: "Upload your resume",    desc: "Drop your PDF — we extract all your skills and experience instantly." },
  { num: "02", title: "Enter your target role", desc: "Tell us where you want to go — Full Stack Developer, Data Scientist, DevOps Engineer, anything." },
  { num: "03", title: "AI analyzes the gap",    desc: "Gemini compares your profile against industry expectations and returns a structured report in seconds." },
  { num: "04", title: "Follow your roadmap",   desc: "Work through the personalized plan, mark steps complete, and track your progress to job-ready." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-medium text-indigo-600 uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">From resume to roadmap in 4 steps</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={s.num} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-5 left-[calc(50%+28px)] w-[calc(100%-56px)] h-px bg-slate-200" />
              )}
              <div className="relative z-10">
                <div className="text-4xl font-bold text-slate-100 mb-3 leading-none">{s.num}</div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}