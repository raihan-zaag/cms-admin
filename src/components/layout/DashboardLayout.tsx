import { Outlet, Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth'
import { LogOut, Home, FileText, Image, Settings, FolderOpen } from 'lucide-react'

export function DashboardLayout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                CMS Admin
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.name || user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-70px)] overflow-hidden">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm h-screen border-r">
          <div className="p-4">
            <div className="space-y-2">
              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              
              <Link
                to="/pages"
                className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
              >
                <FileText className="h-4 w-4" />
                Pages
              </Link>
              
              <Link
                to="/editor"
                className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Settings className="h-4 w-4" />
                Page Builder
              </Link>
              
              <Link
                to="/layouts"
                className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
              >
                <FolderOpen className="h-4 w-4" />
                Saved Layouts
              </Link>
              
              <Link
                to="/media"
                className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Image className="h-4 w-4" />
                Media Library
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
