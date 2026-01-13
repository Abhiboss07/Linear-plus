'use client'
import { useEffect, useState } from 'react'
import { Plus, Command, MoreHorizontal, CheckCircle2, Circle } from 'lucide-react'
import AISidebar from '../../../components/AISidebar'

import { supabase } from '@/utils/supabase'

export default function Project({ params }: any) {
  const [issues, setIssues] = useState<any[]>([])
  const [text, setText] = useState('')
  const [project, setProject] = useState<any>(null)

  useEffect(() => {
    if (!supabase) return

    async function loadData() {
      if (!supabase) return
      // 1. Get Project ID from Slug
      const { data: p } = await supabase.from('projects').select('*').eq('slug', params.projectId).single()
      if (p) {
        setProject(p)
        // 2. Get Issues for Project
        const { data: i } = await supabase.from('issues').select('*').eq('project_id', p.id).order('created_at', { ascending: false })
        if (i) setIssues(i)
      }
    }
    loadData()
  }, [params.projectId])

  async function createWithAI() {
    if (!text) return

    // Optimistic UI could go here, but let's wait for AI for now
    const res = await fetch('/api/ai/enhance-issue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
    const aiData = await res.json()

    if (supabase && project) {
      // Save to Supabase
      const { data: savedIssue, error } = await supabase.from('issues').insert({
        title: aiData.title,
        description: aiData.description,
        priority: aiData.priority,
        project_id: project.id,
        status: 'Backlog'
      }).select().single()

      if (savedIssue) {
        setIssues(prev => [savedIssue, ...prev])
      } else if (error) {
        console.error(error)
        alert('Failed to save issue')
      }
    } else {
      // Fallback Local State
      setIssues(prev => [aiData, ...prev])
    }
    setText('')
  }

  // Handle standard "Enter" to create
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      createWithAI()
    }
  }

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="px-8 py-4 border-b border-[#262729] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-indigo-500 rounded text-[10px] font-bold flex items-center justify-center text-white">
              P
            </div>
            <h1 className="font-medium">{params.projectId}</h1>
            <span className="text-[#8A8F98]">/</span>
            <span className="text-[#8A8F98] text-sm">Active Issues</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-[#1E1F21] rounded text-[#8A8F98] transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* AI Input */}
          <div className="mb-8 relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8F98]">
              <Plus size={16} />
            </div>
            <input
              className="w-full bg-[#121314] border border-[#262729] rounded-lg py-3 pl-10 pr-4 text-sm text-[#F2F3F5] placeholder-[#50545C] focus:outline-none focus:border-[#5E6AD2] focus:ring-1 focus:ring-[#5E6AD2] transition-all"
              placeholder="Create new issue with AI..."
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              <span className="text-[10px] bg-[#1E1F21] border border-[#262729] text-[#8A8F98] px-1.5 py-0.5 rounded">↵</span>
            </div>
          </div>

          {/* List */}
          <div className="space-y-1">
            {issues.length === 0 && (
              <div className="text-center py-20 text-[#8A8F98] text-sm">
                No issues yet. Create one above.
              </div>
            )}
            {issues.map((i, idx) => (
              <div key={idx} className="group flex items-center gap-3 px-3 py-2 -mx-3 rounded hover:bg-[#1E1F21] cursor-default border border-transparent hover:border-[#262729] transition-colors">
                <div className="pt-0.5 text-[#5E6AD2]">
                  <Circle size={14} strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">{i.title}</h4>
                  <p className="text-xs text-[#8A8F98] truncate">{i.description}</p>
                </div>
                <div className="text-[10px] font-medium uppercase tracking-wider text-[#8A8F98] px-1.5 py-0.5 rounded border border-[#262729]">
                  {i.priority || 'No Priority'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AISidebar />
    </div>
  )
}
