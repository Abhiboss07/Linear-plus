'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Folder, Plus } from 'lucide-react'
import { supabase } from '@/utils/supabase'

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([
    { name: 'Demo Project', slug: 'demo' }
  ])

  useEffect(() => {
    if (!supabase) return
    async function load() {
      const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
      if (data && data.length > 0) setProjects(data)
    }
    load()
  }, [])

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <button className="flex items-center gap-2 text-sm text-[#8A8F98] hover:text-[#F2F3F5] transition-colors">
          <Plus size={16} />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/project/${p.slug}`}
            className="group block p-4 rounded-lg bg-[#121314] border border-[#262729] hover:border-[#4d4f54] transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded bg-[#1E1F21] text-indigo-400 group-hover:text-indigo-300">
                <Folder size={18} />
              </div>
              <span className="font-medium text-sm">{p.name}</span>
            </div>
            <p className="text-[#8A8F98] text-xs">Linear-style issue tracking powered by AI.</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
