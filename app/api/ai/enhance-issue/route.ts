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
          {
            role: "system",
            content: `You are an expert Technical Product Manager at a high-growth tech company. 
            Your goal is to take a rough issue description and transform it into a professional, engineering-ready ticket.
            
            Return a JSON object with the following structure:
            {
              "title": "Concise, action-oriented title (e.g., 'Fix login race condition')",
              "description": "Detailed description using Markdown. Include 'Context', 'Problem', and 'Proposed Solution' sections. Be professional and concise.",
              "acceptanceCriteria": ["List of verifyable checks"],
              "priority": "Low" | "Medium" | "High" | "Urgent",
              "labels": ["List", "of", "relevant", "labels"],
              "complexity": "1" | "2" | "3" | "5" | "8" (Fibonacci estimate)
            }`
          },
          { role: "user", content: `Enhance this issue: "${text}"` }
        ],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
        temperature: 0.7,
      });

      const content = completion.choices[0].message.content

      try {
        const parsed = JSON.parse(content || '{}')
        const formattedDescription = `
${parsed.description}

### Acceptance Criteria
${parsed.acceptanceCriteria?.map((c: string) => `- [ ] ${c}`).join('\n') || '- [ ] Verify the fix'}
        `.trim()

        return NextResponse.json({
          ...parsed,
          description: formattedDescription
        })
      } catch (e) {
        console.error("JSON Parse Error", e)
        return NextResponse.json({
          title: text.slice(0, 50),
          description: content || "Enhanced description",
          priority: "Medium",
          labels: ["ai-error"]
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
