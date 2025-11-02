import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai_key = process.env.GEMINI_API_KEY!;

export async function POST(req:NextRequest) {
  try {
    // Expect fields at the root, not wrapped in `userInfo`
    const userInfo = await req.json();

    if (!ai_key) throw new Error("Gemini API Key missing");

    const ai = new GoogleGenAI({ apiKey: ai_key });

    // Compose the prompt with fields from userInfo
    const prompt = `
      You are an AI fitness coach. Generate a day-wise workout and sample diet plan for:
      Name: ${userInfo.name}
      Age: ${userInfo.age}
      Gender: ${userInfo.gender}
      Height: ${userInfo.height}
      Weight: ${userInfo.weight}
      Goal: ${userInfo.goal}
      Fitness Level: ${userInfo.level}
      Workout Location: ${userInfo.location}
      Diet: ${userInfo.diet}
      Output ONLY in JSON format with days, exercises, meals.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    let plan;
    try {
      // Attempt to parse Gemini's response; fallback if not valid JSON
      plan = JSON.parse(response.text || "{}");
    } catch (e) {
      plan = { error: "JSON parse error", raw: response.text };
    }

    return NextResponse.json(plan, { status: 200 });
  } catch (error) {
  
    return NextResponse.json(
      { message: "server error", error: error?.message || error },
      { status: 500 }
    );
  }
}
