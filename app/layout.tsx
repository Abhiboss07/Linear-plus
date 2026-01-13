import './globals.css'
import Sidebar from '../components/Sidebar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="flex min-h-screen bg-[#08090A] text-[#F2F3F5] antialiased">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-auto">
          {children}
        </main>
      </body>
    </html>
  )
}

