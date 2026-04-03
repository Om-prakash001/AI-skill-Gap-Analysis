/**
 * Builds the prompt sent to Gemini.
 * Returns a string that instructs the model to output strict JSON.
 */
function buildPrompt(resumeText, targetRole) {
  return `
You are an expert technical recruiter and career coach.

Analyze the resume below against the target job role: "${targetRole}".

Resume Text:
---
${resumeText}
---

Return ONLY a valid JSON object — no markdown, no explanation, no backticks.
The JSON must match this exact structure:

{
  "matchPercentage": <number 0-100>,
  "summary": "<2-3 sentence overview of the candidate's fit>",
  "existingSkills": ["<skill>", "..."],
  "missingSkills": [
    {
      "skill": "<skill name>",
      "priority": "<High | Medium | Low>",
      "reason": "<one sentence: why this skill matters for the role>"
    }
  ],
  "roadmap": [
    {
      "week": "<e.g. Week 1-2>",
      "topic": "<what to learn>",
      "resource": "<best free resource name>",
      "resourceUrl": "<direct URL to that resource>"
    }
  ]
}

Rules:
- existingSkills: list only technical skills actually found in the resume.
- missingSkills: list the top 5-8 most important gaps for this role.
- roadmap: provide 6-10 steps to bridge the skill gap, ordered by priority.
- resourceUrl: use real, publicly accessible URLs (MDN, official docs, freeCodeCamp, Coursera, etc.).
- matchPercentage: be honest and calibrated — do not inflate.
`.trim();
}

export { buildPrompt };
