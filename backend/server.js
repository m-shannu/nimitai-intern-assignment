require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

app.post("/analyse", async (req, res) => {
  try {
    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({
        message: "Transcript is required",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an expert B2B sales coach.

Analyze the transcript and identify signals.

Rules:

1. buying_interest:
   - asks for pricing
   - asks for a demo
   - asks for documentation
   - asks for next steps
   - requests follow-up

2. objection:
   - price concerns
   - competitor comparisons
   - budget concerns
   - negative reactions

3. confusion:
   - does not understand
   - asks for clarification
   - uncertain about product

Return ONLY valid JSON.

Format:

{
  "signals": [
    {
      "type": "buying_interest",
      "quote": "exact quote",
      "tip": "one line coaching tip"
    }
  ]
}

Transcript:
${transcript}
`;

    const result = await model.generateContent(prompt);

    let responseText = result.response.text();

    responseText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const jsonResponse = JSON.parse(responseText);

    res.status(200).json(jsonResponse);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Analysis failed",
      error: error.message,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});