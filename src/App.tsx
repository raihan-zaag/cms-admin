import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LoginForm } from '@/components/auth/LoginForm'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Dashboard } from '@/pages/Dashboard'
import { PageEditor } from '@/pages/PageEditor'
import { PagesList } from '@/pages/PagesList'
import { MediaManager } from '@/pages/MediaManager'
import { useAuthStore } from '@/store/auth'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterForm />} 
        />
        
        {/* Protected routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pages" element={<PagesList />} />
          <Route path="editor" element={<PageEditor />} />
          <Route path="media" element={<MediaManager />} />
          <Route path="" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* Unauthorized route */}
        <Route 
          path="/unauthorized" 
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
                <p className="text-gray-600">You don't have permission to access this resource.</p>
              </div>
            </div>
          } 
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
