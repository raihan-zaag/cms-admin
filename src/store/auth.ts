import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  tenantId: string
  name?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (token: string, user: User) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: (token: string, user: User) => {
        localStorage.setItem('auth-token', token)
        set({ 
          token, 
          user, 
          isAuthenticated: true 
        })
      },
      
      logout: () => {
        localStorage.removeItem('auth-token')
        set({ 
          token: null, 
          user: null, 
          isAuthenticated: false 
        })
      },
      
      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user
        if (currentUser) {
          set({ 
            user: { ...currentUser, ...userData } 
          })
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        token: state.token, 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
)
