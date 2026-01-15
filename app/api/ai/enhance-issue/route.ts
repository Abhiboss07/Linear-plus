import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  const { text } = await req.json()

  if (apiKey) {
    const genAI = new GoogleGenerativeAI(apiKey);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `
        You are an expert Technical Product Manager at a high-growth tech company. 
        Your goal is to take a rough issue description and transform it into a professional, engineering-ready ticket.
        
        Input Issue: "${text}"

        Return a valid JSON object (no markdown formatting, just raw JSON) with the following structure:
        {
          "title": "Concise, action-oriented title",
          "description": "Detailed description using Markdown. Include 'Context', 'Problem', and 'Proposed Solution' sections.",
          "acceptanceCriteria": ["List of verifyable checks"],
          "priority": "Low" | "Medium" | "High" | "Urgent",
          "labels": ["List", "of", "relevant", "labels"],
          "complexity": "1" | "2" | "3" | "5" | "8"
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let textResponse = response.text();

      // Clean up markdown code blocks if Gemini includes them
      textResponse = textResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');

      try {
        const parsed = JSON.parse(textResponse || '{}')
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
        console.log("Raw Response:", textResponse)
        return NextResponse.json({
          title: text.slice(0, 50),
          description: textResponse || "Enhanced description",
          priority: "Medium",
          labels: ["ai-error"]
        })
      }
    } catch (e) {
      console.error("Gemini Error:", e)
    }
  }

  // Fallback / Mock
  return NextResponse.json({
    title: text.length > 20 ? text.slice(0, 20) + "..." : text,
    description: "AI enhancement requires GEMINI_API_KEY. \n\nOriginal: " + text,
    priority: "Medium",
    labels: ["mock", "demo"]
  })
}
