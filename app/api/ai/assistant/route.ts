import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

export async function POST(req: Request) {
  const { message } = await req.json()

  if (openai) {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a Linear-like issue tracking assistant. Be concise, professional, and helpful." },
          { role: "user", content: message }
        ],
        model: "gpt-3.5-turbo",
      });
      return NextResponse.json({
        reply: completion.choices[0].message.content
      })
    } catch (e) {
      console.error(e)
    }
  }

  return NextResponse.json({
    reply: "I am a demo AI. Set OPENAI_API_KEY to make me real. You said: " + message
  })
}
