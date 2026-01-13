'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LayoutGrid, Folder, Settings, Search } from 'lucide-react'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Projects', href: '/project/demo', icon: Folder },
    { name: 'Issues', href: '/issues', icon: LayoutGrid }, // Future route
    { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="w-64 h-screen border-r border-[#262729] bg-[#121314] flex flex-col text-[#F2F3F5]">
            {/* Header / Workspace */}
            <div className="p-4 flex items-center gap-2 border-b border-[#262729]">
                <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center text-xs font-bold">
                    L
                </div>
                <span className="text-sm font-medium">Linear+</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-4 space-y-0.5">
                <div className="px-2 mb-2">
                    <div className="flex items-center gap-2 bg-[#1E1F21] px-2 py-1.5 rounded text-[#8A8F98] text-sm hover:text-white transition-colors cursor-pointer border border-transparent hover:border-[#262729]">
                        <Search size={14} />
                        <span>Search...</span>
                    </div>
                </div>

                {navigation.map((item) => {
                    const isActive = pathname.startsWith(item.href)
                    const Icon = item.icon
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`
                flex items-center gap-3 px-2 py-1.5 rounded-md text-sm font-medium transition-colors
                ${isActive
                                    ? 'bg-[#1E1F21] text-white'
                                    : 'text-[#8A8F98] hover:bg-[#1E1F21] hover:text-[#d0d3d8]'
                                }
              `}
                        >
                            <Icon size={16} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer / User */}
            <div className="p-4 border-t border-[#262729]">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-green-400 to-blue-500" />
                    <span className="text-sm font-medium">User</span>
                </div>
            </div>
        </div>
    )
}
