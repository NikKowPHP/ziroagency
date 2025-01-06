'use client'




export default function AdminDashboard() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <nav>
        <ul className="space-y-2">
          <li>
            <a 
              href="/admin/case-studies" 
              className="text-blue-600 hover:underline"
            >
              Manage Case Studies
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
} 