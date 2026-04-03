import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB} from "./utils/db.js";
import analyzeRouter from "./routes/analyze.js";
import authRouter from "./routes/auth.js";

const app = express();
// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth", authRouter);      // register, login, me
app.use("/api", analyzeRouter);        // analyze-resume, results, history

// Health check
app.get("/", (req, res) => res.json({ status: "Skill Gap API is running 🚀" }));

// ── Database + Server Start ───────────────────────────────────────────────────


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});




