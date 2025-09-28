"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useWallet } from "../wallet/wallet-provider"

interface User {
  id: string
  address: string
  username: string
  email?: string
  avatar?: string
  verified: boolean
  joinedAt: string
  totalBids: number
  totalWins: number
  reputation: number
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signInWithWallet: () => Promise<void>
  signOut: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { isConnected, address } = useWallet()

  const signInWithWallet = async () => {
    if (!address) return

    setIsLoading(true)
    try {
      // Simulate API call to authenticate with wallet
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data based on wallet address
      const mockUser: User = {
        id: `user_${address.slice(-8)}`,
        address,
        username: `Collector${address.slice(-4)}`,
        verified: Math.random() > 0.5,
        joinedAt: "2024-01-15",
        totalBids: Math.floor(Math.random() * 50) + 1,
        totalWins: Math.floor(Math.random() * 10) + 1,
        reputation: Math.floor(Math.random() * 100) + 50,
        avatar: `/placeholder.svg?height=40&width=40&query=user avatar`,
      }

      setUser(mockUser)
      localStorage.setItem("auth_user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Authentication failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("auth_user")
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...data }
    setUser(updatedUser)
    localStorage.setItem("auth_user", JSON.stringify(updatedUser))
  }

  // Auto-authenticate when wallet connects
  useEffect(() => {
    if (isConnected && address && !user) {
      signInWithWallet()
    } else if (!isConnected && user) {
      signOut()
    }
  }, [isConnected, address])

  // Check for existing auth on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user")
    if (savedUser && isConnected) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [isConnected])

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signInWithWallet,
    signOut,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
