import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('vitalink_user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch { localStorage.removeItem('vitalink_user') }
    }
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('vitalink_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('vitalink_user')
  }

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('vitalink_users') || '[]')
    const exists = users.find(u => u.email === userData.email && u.type === userData.type)
    if (exists) return { success: false, error: 'An account with this email already exists.' }
    users.push(userData)
    localStorage.setItem('vitalink_users', JSON.stringify(users))
    login(userData)
    return { success: true }
  }

  const loginWithCredentials = (email, password, type) => {
    const users = JSON.parse(localStorage.getItem('vitalink_users') || '[]')
    const found = users.find(u => u.email === email && u.password === password && u.type === type)
    if (found) {
      login(found)
      return { success: true }
    }
    return { success: false, error: 'Invalid email or password.' }
  }

  return (
    <AuthContext.Provider value={{ user, logout, register, loginWithCredentials }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
