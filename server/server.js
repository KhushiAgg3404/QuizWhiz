const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/generate-quiz", async (req, res) => {
  try {
    const { topic, difficulty, count } = req.body;

    if (!topic) {
      return res.status(400).json({
        message: "Topic is required",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Generate ${count} MCQ questions on ${topic}.

Difficulty: ${difficulty}

Return ONLY valid JSON.

[
  {
    "id": 1,
    "question": "Question",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": 0,
    "explanation": "Explanation"
  }
]
`;

    let result;

    for (let i = 0; i < 3; i++) {
      try {
        result = await model.generateContent(prompt);
        break;
      } catch (err) {
        console.log(`Retry attempt ${i + 1}`);

        const isQuotaError =
          err.message?.includes("429") ||
          err.message?.includes("quota") ||
          err.message?.includes("Quota exceeded");

        if (isQuotaError) {
          throw err;
        }

        if (i === 2) {
          throw err;
        }

        await new Promise((resolve) =>
          setTimeout(resolve, 3000)
        );
      }
    }

    const text = result.response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let questions;

    try {
      questions = JSON.parse(cleaned);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);

      return res.status(500).json({
        message:
          "AI returned an invalid quiz format. Please try again.",
      });
    }

    res.json(questions);

  } catch (error) {
    console.error("Gemini Error:", error);

    const isQuotaError =
      error.message?.includes("429") ||
      error.message?.includes("quota") ||
      error.message?.includes("Quota exceeded");

    if (isQuotaError) {
      return res.status(429).json({
        message:
          "AI quiz limit reached. Please try again in a few minutes.",
      });
    }

    res.status(500).json({
      message:
        "Failed to generate quiz. Please try again later.",
    });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});