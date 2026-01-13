'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase'

export default function Login() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleLogin() {
        if (!email) return
        setLoading(true)

        if (supabase) {
            const { error } = await supabase.auth.signInWithOtp({ email })
            if (error) {
                alert(error.message)
            } else {
                alert('Check your email for the login link!')
            }
        } else {
            // Mock login
            setTimeout(() => {
                router.push('/dashboard')
            }, 1000)
        }
        setLoading(false)
    }

    return (
        <div className="flex h-screen items-center justify-center bg-[#08090A] text-[#F2F3F5]">
            <div className="w-full max-w-sm p-8 bg-[#121314] rounded-xl border border-[#262729] shadow-2xl">
                <div className="mb-8 text-center">
                    <div className="w-10 h-10 bg-indigo-500 rounded mx-auto mb-4 flex items-center justify-center font-bold text-xl">L</div>
                    <h2 className="text-xl font-medium">Log in to Linear+</h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <input
                            className="w-full bg-[#1E1F21] border border-[#262729] rounded-md px-3 py-2 text-sm placeholder-[#50545C] focus:border-indigo-500 focus:outline-none transition-colors"
                            placeholder="name@work-email.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-md py-2 text-sm font-medium transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Continue with Email'}
                    </button>
                </div>

                <p className="mt-6 text-center text-xs text-[#8A8F98]">
                    If Supabase is not configured, this will simulate a login.
                </p>
            </div>
        </div>
    )
}
