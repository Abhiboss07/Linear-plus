'use client'
import { Settings as SettingsIcon } from 'lucide-react'

export default function Settings() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 text-[#8A8F98]">
            <div className="w-12 h-12 bg-[#1E1F21] rounded-xl flex items-center justify-center mb-4 text-[#5E6AD2]">
                <SettingsIcon size={24} />
            </div>
            <h2 className="text-lg font-medium text-[#F2F3F5] mb-2">Workspace Settings</h2>
            <p className="max-w-xs">Manage your workspace preferences, team members, and integrations.</p>
            <div className="mt-6 px-3 py-1 bg-[#1E1F21] rounded-full text-xs font-mono border border-[#262729]">
                Coming Soon
            </div>
        </div>
    )
}
