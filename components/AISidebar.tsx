'use client'
import { useState, useRef, useEffect } from 'react'
import { Sparkles, X, Send } from 'lucide-react'

export default function AISidebar() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  async function send() {
    if (!input.trim()) return
    const userMsg = input
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])

    // Optimistic UI updates or loading state could go here
    const res = await fetch('/api/ai/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMsg })
    })
    const data = await res.json()
    setMessages(prev => [...prev, { role: 'ai', content: data.reply }])
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed right-6 bottom-6 w-12 h-12 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 z-50"
        >
          <Sparkles size={20} />
        </button>
      )}

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <div className={`fixed top-0 right-0 h-full w-[400px] bg-[#121314] border-l border-[#262729] shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#262729]">
          <div className="flex items-center gap-2 text-[#F2F3F5]">
            <Sparkles size={16} className="text-indigo-500" />
            <span className="font-medium text-sm">Linear Assistant</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-[#8A8F98] hover:text-[#F2F3F5] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
          {messages.length === 0 && (
            <div className="text-center mt-20 text-[#8A8F98] text-sm px-8">
              <p>Ask me to draft issues, summarize projects, or find duplicate tickets.</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`
                        max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed
                        ${m.role === 'user'
                  ? 'bg-[#1E1F21] text-[#F2F3F5] border border-[#262729]'
                  : 'bg-indigo-500/10 text-indigo-200 border border-indigo-500/20'
                }
                    `}>
                {m.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[#262729] bg-[#121314]">
          <div className="relative">
            <input
              className="w-full bg-[#1E1F21] border border-[#262729] rounded-md py-2.5 pl-3 pr-10 text-sm text-[#F2F3F5] placeholder-[#50545C] focus:outline-none focus:border-[#5E6AD2] focus:ring-1 focus:ring-[#5E6AD2] transition-all"
              placeholder="Ask AI..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
            />
            <button
              onClick={send}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#8A8F98] hover:text-indigo-400 transition-colors"
            >
              <Send size={14} />
            </button>
          </div>
        </div>

      </div>
    </>
  )
}
