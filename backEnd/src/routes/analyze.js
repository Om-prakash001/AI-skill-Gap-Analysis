import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

import upload from "../config/multer.js";
import { buildPrompt } from "../config/prompt.js";
import SkillGap from "../models/SkillGap.js";
import protect from "../middleware/authMiddleware.js";
// import { createRequire } from "module";

// const require = createRequire(import.meta.url);
// const pdfParse = require("pdf-parse");
import { PDFParse } from "pdf-parse";

const router = express.Router();

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * POST /api/analyze-resume
 * Protected — requires Bearer token
 *
 * Expects multipart/form-data with:
 *   - resume  : PDF file
 *   - role    : string (e.g. "Full Stack Developer")
 */
router.post("/analyze-resume", protect, upload.single("resume"), async (req, res) => {
  try {
    // ── 1. Validate inputs ──────────────────────────────────────────────
    if (!req.file) {
      return res.status(400).json({ error: "No PDF file uploaded." });
    }

    const targetRole = req.body.role?.trim();
    if (!targetRole) {
      return res.status(400).json({ error: "Target role is required." });
    }

    // ── 2. Extract text from PDF buffer ─────────────────────────────────
    // Initialize the parser class with your buffer data
    const parser = new PDFParse({ data: req.file.buffer });
    
    // getText() returns the TextResult object. We just need the .text part!
    const pdfData = await parser.getText();
    // Extract the text using the new getText() method
    const resumeText = pdfData.text.trim();
    
    if (!resumeText || resumeText.length < 50) {
      return res.status(422).json({
        error: "Could not extract readable text from the PDF. Try a text-based PDF.",
      });
    }

    // ── 3. Call Gemini ───────────────────────────────────────────────────
    const prompt = buildPrompt(resumeText, targetRole);
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    // ── 4. Parse Gemini's JSON response ──────────────────────────────────
    let aiData;
    try {
      const cleaned = rawText.replace(/```json|```/g, "").trim();
      aiData = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("Gemini returned non-JSON:\n", rawText);
      return res.status(502).json({
        error: "AI returned an unexpected format. Please try again.",
      });
    }

    // ── 5. Save to MongoDB (userId from JWT, not body) ───────────────────
    const doc = new SkillGap({
      userId: req.user._id,        // ← comes from authMiddleware
      targetRole,
      resumeText,
      matchPercentage: aiData.matchPercentage,
      summary: aiData.summary,
      existingSkills: aiData.existingSkills || [],
      missingSkills: aiData.missingSkills || [],
      roadmap: aiData.roadmap || [],
    });

    const saved = await doc.save();

    // ── 6. Send response ─────────────────────────────────────────────────
    return res.status(201).json({
      success: true,
      data: saved,
    });

  } catch (err) {
    console.error("Unexpected error in /analyze-resume:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

/**
 * GET /api/results/:id
 * Protected — user can only fetch their own result
 */
router.get("/results/:id", protect, async (req, res) => {
  try {
    const doc = await SkillGap.findOne({
      _id: req.params.id,
      userId: req.user._id,   // ← ensures users can't access each other's data
    });

    if (!doc) return res.status(404).json({ error: "Result not found." });
    return res.json({ success: true, data: doc });
  } catch (err) {
    return res.status(500).json({ error: "Invalid ID or server error." });
  }
});

/**
 * GET /api/history
 * Protected — returns all analyses for the logged-in user
 */
router.get("/history", protect, async (req, res) => {
  try {
    const docs = await SkillGap.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select("-resumeText"); // exclude raw text to keep response light

    return res.json({ success: true, count: docs.length, data: docs });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error." });
  }
});

export default router;