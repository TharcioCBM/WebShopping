'use client'
import { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  user: Record<string, unknown> | null
  username: string | null
  login: (token: string, userData: any) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<Record<string, unknown> | null>(null)
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUsername = localStorage.getItem('username')
    const savedUser = localStorage.getItem('user')
    
    if (token && savedUsername && savedUser) {
      setIsAuthenticated(true)
      setUsername(savedUsername)
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (token: string, data: { request_data: { username: string } }) => {
    localStorage.setItem('token', token)
    localStorage.setItem('username', data.request_data.username)
    localStorage.setItem('user', JSON.stringify(data))
    
    setIsAuthenticated(true)
    setUsername(data.request_data.username)
    setUser(data)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    setUsername(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
