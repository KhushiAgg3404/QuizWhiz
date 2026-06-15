const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
console.log("Generating quiz...");

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);
console.log("Quiz generated successfully");
// 👇 ADD HERE
async function listModels() {
    try {
        console.log(
            "Using package version:",
            require("@google/generative-ai/package.json").version
        );
    } catch (e) { }

    console.log("API key loaded:", !!process.env.GEMINI_API_KEY);
}

listModels();

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.post("/generate-quiz", async (req, res) => {
    try {
        const { topic, difficulty, count } = req.body;

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });

        const prompt = `
Generate ${count} MCQ questions on ${topic}.

Difficulty: ${difficulty}

Return ONLY valid JSON.

[
 {
  "id":1,
  "question":"Question",
  "options":["A","B","C","D"],
  "correctAnswer":0,
  "explanation":"Explanation"
 }
]
`;

        let result;

        for (let i = 0; i < 5; i++) {
            try {
                result = await model.generateContent(prompt);
                break;
            } catch (err) {
                console.log("Retry", i + 1);

                if (i === 4) throw err;

                await new Promise(resolve =>
                    setTimeout(resolve, 5000)
                );
            }
        }

        const text = result.response.text();

        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const questions = JSON.parse(cleaned);

        res.json(questions);

    } catch (error) {
        console.error("Gemini Error:", error);

        res.status(500).json({
            message: error.message,
        });
    }
});

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});