import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'admin' | 'editor' | 'viewer'
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user?.role) {
    const roleHierarchy = {
      admin: 3,
      editor: 2,
      viewer: 1,
    }

    const userLevel = roleHierarchy[user.role]
    const requiredLevel = roleHierarchy[requiredRole]

    if (userLevel < requiredLevel) {
      return <Navigate to="/unauthorized" replace />
    }
  }

  return <>{children}</>
}
