import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null

export async function POST(req: Request) {
  const { message } = await req.json()

  if (genAI) {
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
    } catch (e) {
      console.error("Gemini Error:", e)
    }
  }

  return NextResponse.json({
    reply: "I am a demo AI. Set GEMINI_API_KEY to make me real. You said: " + message
  })
}
