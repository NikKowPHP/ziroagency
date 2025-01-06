import { redirect } from 'next/navigation'
import { getSession } from '@/lib/supabase'
import { ProtectedRoute } from '@/components/protected-route'
import { AuthProvider } from '@/contexts/auth-context'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
    
  if (!session) {
    redirect('/admin/login')
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">Admin CMS</h1>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-4">
                {session.user.email}
              </span>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
} 