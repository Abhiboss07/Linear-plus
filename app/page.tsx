import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#08090A] text-[#F2F3F5]">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Linear<span className="text-indigo-500">+</span></h1>
        <p className="text-[#8A8F98]">AI-powered issue tracking for high-performance teams.</p>
        <Link
          href="/dashboard"
          className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-full font-medium transition-all hover:scale-105"
        >
          Enter Dashboard
        </Link>
      </div>
    </div>
  )
}
