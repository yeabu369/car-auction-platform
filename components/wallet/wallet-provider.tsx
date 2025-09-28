"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface WalletContextType {
  isConnected: boolean
  address: string | null
  balance: string | null
  chainId: number | null
  connectWallet: (walletType: string) => Promise<void>
  disconnectWallet: () => void
  switchNetwork: (chainId: number) => Promise<void>
  isConnecting: boolean
  error: string | null
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

interface WalletProviderProps {
  children: ReactNode
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Simulate wallet connection for demo purposes
  const connectWallet = async (walletType: string) => {
    setIsConnecting(true)
    setError(null)

    try {
      // Simulate connection delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock wallet data based on wallet type
      const mockWallets = {
        metamask: {
          address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
          balance: "12.5847",
          chainId: 1,
        },
        walletconnect: {
          address: "0x8ba1f109551bD432803012645Hac189451b934",
          balance: "8.2341",
          chainId: 1,
        },
        coinbase: {
          address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
          balance: "25.7892",
          chainId: 1,
        },
      }

      const walletData = mockWallets[walletType as keyof typeof mockWallets] || mockWallets.metamask

      setAddress(walletData.address)
      setBalance(walletData.balance)
      setChainId(walletData.chainId)
      setIsConnected(true)

      // Store in localStorage for persistence
      localStorage.setItem("wallet_connected", "true")
      localStorage.setItem("wallet_address", walletData.address)
      localStorage.setItem("wallet_type", walletType)
    } catch (err) {
      setError("Failed to connect wallet. Please try again.")
      console.error("Wallet connection error:", err)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setAddress(null)
    setBalance(null)
    setChainId(null)
    setError(null)

    // Clear localStorage
    localStorage.removeItem("wallet_connected")
    localStorage.removeItem("wallet_address")
    localStorage.removeItem("wallet_type")
  }

  const switchNetwork = async (targetChainId: number) => {
    setError(null)
    try {
      // Simulate network switch
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setChainId(targetChainId)
    } catch (err) {
      setError("Failed to switch network")
    }
  }

  // Check for existing connection on mount
  useEffect(() => {
    const isWalletConnected = localStorage.getItem("wallet_connected")
    const walletAddress = localStorage.getItem("wallet_address")
    const walletType = localStorage.getItem("wallet_type")

    if (isWalletConnected && walletAddress) {
      setIsConnected(true)
      setAddress(walletAddress)
      setBalance("12.5847") // Mock balance
      setChainId(1)
    }
  }, [])

  const value: WalletContextType = {
    isConnected,
    address,
    balance,
    chainId,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    isConnecting,
    error,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}
