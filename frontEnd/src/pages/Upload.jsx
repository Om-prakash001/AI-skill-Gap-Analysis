import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/axios.js";

export default function Upload() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [file, setFile] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (f) => {
    if (f && f.type === "application/pdf") {
      setFile(f);
      setError("");
    } else {
      setError("Please upload a PDF file.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please upload your resume.");
    if (!role.trim()) return setError("Please enter a target role.");

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("role", role);

      const res = await api.post("/analyze-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Pass result to dashboard via navigation state
      navigate("/dashboard", { state: { result: res.data.data } });
    } catch (err) {
      setError(err.response?.data?.error || "Analysis failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Navbar */}
      <nav className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <span className="text-white font-bold tracking-tight">SkillGap<span className="text-indigo-400">.ai</span></span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-zinc-500 text-sm">Hey, <span className="text-zinc-300">{user?.name}</span></span>
          <button onClick={logout} className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors">
            Logout
          </button>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">
            Analyze Your Resume
          </h1>
          <p className="text-zinc-500">
            Upload your resume and tell us your target role. Our AI will identify your skill gaps and build a personalized roadmap.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          {error && (
            <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PDF Drop Zone */}
            <div>
              <label className="block text-zinc-400 text-sm mb-2">Resume (PDF)</label>
              <div
                onClick={() => fileRef.current.click()}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                className={`relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
                  dragOver
                    ? "border-indigo-500 bg-indigo-500/5"
                    : file
                    ? "border-emerald-500/50 bg-emerald-500/5"
                    : "border-zinc-700 hover:border-zinc-500 bg-zinc-800/50"
                }`}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files[0])}
                />

                {file ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-emerald-400 font-medium text-sm">{file.name}</p>
                    <p className="text-zinc-600 text-xs">{(file.size / 1024).toFixed(1)} KB · Click to change</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center">
                      <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-zinc-400 text-sm">Drop your PDF here or <span className="text-indigo-400">browse</span></p>
                    <p className="text-zinc-600 text-xs">Max 5MB · PDF only</p>
                  </div>
                )}
              </div>
            </div>

            {/* Target Role */}
            <div>
              <label className="block text-zinc-400 text-sm mb-2">Target Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Full Stack Developer, Data Scientist, DevOps Engineer"
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Analyzing with AI...
                </>
              ) : (
                "Analyze My Resume →"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}