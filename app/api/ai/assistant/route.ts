import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  const { message } = await req.json()

  if (apiKey) {
    const genAI = new GoogleGenerativeAI(apiKey);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `
        System: You are 'Linear+', an advanced AI Product Manager assistant. Your goal is to help users prioritize work, break down complex tasks, and spot duplicate issues. Be concise, professional, and data-driven. Use bullet points for clarity.
        
        User: ${message}
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return NextResponse.json({
        reply: text
      })
    } catch (e: any) {
      console.error("Gemini Error:", e)
      return NextResponse.json({
        reply: `Error: ${e.message || "Unknown error occurred with Gemini API"}`
      })
    }
  }

  return NextResponse.json({
    reply: `Msg: ${message}. Debug: Key present? ${!!apiKey}`
  })
}
