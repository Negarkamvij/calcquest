// app/api/generate/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const topic = body.topic || "derivatives";

    console.log("📘 Generating questions for:", topic);

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
    });

    const prompt = `
      Generate 3 calculus exam questions about ${topic}.
      Each question must have a 'question' and a 'solution' field.
      The solution should be the correct short answer, using LaTeX formatting (e.g., \\frac, \\cos) enclosed in dollar signs ($...$).
      Return ONLY the final JSON object, using an object with a 'questions' key.
      Do not include any extra text, explanations, or markdown formatting outside of the JSON.
    `;

    // Correct syntax: prompt and config as separate arguments
    const result = await model.generateContent(
      prompt,
      {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            questions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  question: { type: "string" },
                  solution: { type: "string" },
                },
                required: ["question", "solution"],
              },
            },
          },
          required: ["questions"],
        },
      }
    );

    const rawText = result.response.text().trim(); 
    
    // 1. Clean the text by stripping markdown backticks
    const cleanedText = rawText.replace(/```json|```/g, "").trim();

    // 2. FINAL FIX: Escape backslashes for JSON safety.
    // The model uses a single backslash (\) for LaTeX. JSON requires a double backslash (\\).
    // The .replace(/\\/g, '\\\\') converts a single literal '\' into a literal '\\' for JSON.
    const escapedText = cleanedText.replace(/\\/g, '\\\\');

    console.log("🧠 Gemini raw output:", rawText);
    console.log("🧼 Cleaned JSON (before final escape):", cleanedText);
    console.log("🔒 Escaped JSON (ready to parse):", escapedText); 
    
    let data = { questions: [] };

    if (escapedText) {
      try {
        data = JSON.parse(escapedText); 
      } catch (e) {
        console.error("❌ FINAL JSON parsing failed:", e.message);
      }
    }
    
    return NextResponse.json(data); 
    
  } catch (error) {
    console.error("🔥 Gemini API Error:", error);
    
    return NextResponse.json(
      { 
        questions: [], 
        error: "Failed to generate questions.", 
        message: error.message 
      },
      { status: 500 }
    );
  }
}