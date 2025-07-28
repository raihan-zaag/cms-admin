// React Router
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Authentication Components
import { LoginForm } from '@/components/auth/LoginForm'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

// Layout Components
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

// Page Components
import { Dashboard } from '@/pages/Dashboard'
import { PageEditor } from '@/pages/PageEditor'
import { PagesList } from '@/pages/PagesList'
import { MediaManager } from '@/pages/MediaManager'
import { PagePreview } from '@/pages/PagePreview'
import { DesignTokensDemo } from '@/pages/DesignTokensDemo'

// Editor Components
import SavedLayoutsList from '@/components/editor/SavedLayoutsList'

// Store
import { useAuthStore } from '@/store/auth'

/**
 * Main Application Component
 * 
 * Handles routing for the CMS admin application with the following routes:
 * - Public routes: /login, /register
 * - Protected routes: /dashboard, /pages, /editor, /media, /layouts
 * - Special routes: /design-tokens-demo, /preview/:pageId, /unauthorized
 * 
 * @returns {JSX.Element} The main app component with all routes configured
 */
function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <ThemeProvider>
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
          
          {/* Design Tokens Demo - accessible without layout */}
          <Route 
            path="/design-tokens-demo" 
            element={
              <ProtectedRoute>
                <DesignTokensDemo />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected routes with dashboard layout */}
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
            <Route path="layouts" element={<SavedLayoutsList />} />
            <Route path="" element={<Navigate to="/dashboard" replace />} />
          </Route>

          {/* Preview route - outside of protected layout */}
          <Route 
            path="/preview/:pageId" 
            element={
              <ProtectedRoute>
                <PagePreview />
              </ProtectedRoute>
            } 
          />

          {/* Unauthorized route */}
          <Route 
            path="/unauthorized" 
            element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">401</h1>
                  <p className="text-gray-600 mb-4">You are not authorized to access this page.</p>
                  <Navigate to="/login" replace />
                </div>
              </div>
            } 
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
