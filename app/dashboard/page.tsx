import Link from 'next/link'
import { Folder } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/project/demo"
          className="group block p-4 rounded-lg bg-[#121314] border border-[#262729] hover:border-[#4d4f54] transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded bg-[#1E1F21] text-indigo-400 group-hover:text-indigo-300">
              <Folder size={18} />
            </div>
            <span className="font-medium text-sm">Demo Project</span>
          </div>
          <p className="text-[#8A8F98] text-xs">Linear-style issue tracking powered by AI.</p>
        </Link>
      </div>
    </div>
  )
}
