'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Session, User, AuthError } from '@supabase/supabase-js'
import { SupabaseAuthService } from '@/infrastructure/services/supabase-auth.service'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
const authService = new SupabaseAuthService()

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    authService.getSession().then((session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })
    .catch((error) => {
      setError(error instanceof Error ? error.message : 'Session error occurred')
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        if (event === 'SIGNED_IN') {
          window.location.reload()
        } else if (event === 'SIGNED_OUT') {
          window.location.href = '/admin/login'
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    setError(null)
    setLoading(true)
    try {
      const { user, session } = await authService.login(email, password)
      setUser(user)
      setSession(session)
    } catch (error) {
      const message = error instanceof AuthError 
        ? error.message 
        : 'Failed to login'
      setError(message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setError(null)
    try {
      await authService.logout()
      setUser(null)
      setSession(null)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Logout failed')
    }
  }

  const clearError = () => setError(null)

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      error,
      login, 
      logout,
      clearError 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 