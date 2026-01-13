import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

export async function POST(req: Request) {
  const { text } = await req.json()

  if (openai) {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a project manager. Enhance the following issue description to be more professional, providing a concise Title, a detailed Description, a Priority (Low, Medium, High), and suggested Labels." },
          { role: "user", content: text }
        ],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
        // Note: For older models without json_object, we'd prompt differently. 
        // Assuming user might use newer keys. If not, text parsing is needed. 
        // For robustness, let's ask for JSON in prompt.
      });

      // Simple mock-like parsing if JSON mode isn't perfect or needed for simple prompt
      // But for "Real AI", let's assume we get a text we can parse or just return the text as description.
      // Better: Return a structured JSON.

      const content = completion.choices[0].message.content
      // This is a simplified example. In production, use Zod or robust JSON parsing.
      // For this demo, let's try to parse it if valid JSON, else raw.

      try {
        const parsed = JSON.parse(content || '{}')
        return NextResponse.json(parsed)
      } catch (e) {
        // Fallback if AI didn't return valid JSON
        return NextResponse.json({
          title: text.slice(0, 50),
          description: content || "Enhanced description",
          priority: "Medium",
          labels: ["ai-generated"]
        })
      }
    } catch (e) {
      console.error("OpenAI Error:", e)
      // Fallback
    }
  }

  // Fallback / Mock
  return NextResponse.json({
    title: text.length > 20 ? text.slice(0, 20) + "..." : text,
    description: "AI enhancement requires OPENAI_API_KEY. \n\nOriginal: " + text,
    priority: "Medium",
    labels: ["mock", "demo"]
  })
}
