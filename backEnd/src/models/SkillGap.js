import mongoose from "mongoose";

// Sub-schema for each item in the learning roadmap
const roadmapStepSchema = new mongoose.Schema({
  week: { type: String, required: true },       // e.g. "Week 1-2"
  topic: { type: String, required: true },      // e.g. "Learn React Hooks"
  resource: { type: String, required: true },   // e.g. "Official React Docs"
  resourceUrl: { type: String, default: "" },   // e.g. "https://react.dev"
});

// Sub-schema for missing skills with priority info
const missingSkillSchema = new mongoose.Schema({
  skill: { type: String, required: true },      // e.g. "TypeScript"
  priority: {                                   // how critical this skill is
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
  reason: { type: String, default: "" },        // why it matters for the role
});

// Main schema — one document per analysis run
const skillGapSchema = new mongoose.Schema(
  {
    // Who ran the analysis (optional for now, wire up auth later)
    userId: { type: String, default: "guest" },

    // Input data
    targetRole: { type: String, required: true },   // e.g. "Full Stack Developer"
    resumeText: { type: String, required: true },   // raw extracted text

    // AI output
    matchPercentage: { type: Number, min: 0, max: 100, required: true },
    summary: { type: String, required: true },      // 2-3 sentence overview
    existingSkills: [{ type: String }],             // skills already on resume
    missingSkills: [missingSkillSchema],            // gaps identified by AI
    roadmap: [roadmapStepSchema],                   // week-by-week plan
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

export default mongoose.model("SkillGap", skillGapSchema);
