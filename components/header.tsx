"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Wallet, Menu, X, Car, User, ChevronDown } from "lucide-react"
import { useWallet } from "./wallet/wallet-provider"
import { useAuth } from "./auth/auth-provider"
import { WalletConnectModal } from "./wallet/wallet-connect-modal"
import { UserProfileModal } from "./auth/user-profile-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const { isConnected, address, balance, disconnectWallet } = useWallet()
  const { user, isAuthenticated, signOut } = useAuth()

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const handleDisconnect = () => {
    disconnectWallet()
    signOut()
  }

  return (
    <>
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold gradient-text">BasedCars</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/auctions" className="text-foreground hover:text-primary transition-colors">
                Live Auctions
              </a>
              <a href="/marketplace" className="text-foreground hover:text-primary transition-colors">
                Marketplace
              </a>
              <a href="#collection" className="text-foreground hover:text-primary transition-colors">
                My Collection
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">
                About
              </a>
            </nav>

            {/* Wallet & User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {isConnected && isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-transparent">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <div className="text-sm font-medium">{user.username}</div>
                          <div className="text-xs text-muted-foreground">{balance} SOL</div>
                        </div>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => setShowProfileModal(true)}>
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wallet className="w-4 h-4 mr-2" />
                      Wallet Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleDisconnect} className="text-destructive">
                      <X className="w-4 h-4 mr-2" />
                      Disconnect
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => setShowWalletModal(true)} className="auction-glow">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
              <nav className="flex flex-col space-y-4">
                <a href="/auctions" className="text-foreground hover:text-primary transition-colors">
                  Live Auctions
                </a>
                <a href="/marketplace" className="text-foreground hover:text-primary transition-colors">
                  Marketplace
                </a>
                <a href="#collection" className="text-foreground hover:text-primary transition-colors">
                  My Collection
                </a>
                <a href="#about" className="text-foreground hover:text-primary transition-colors">
                  About
                </a>
                <div className="pt-4 border-t border-border">
                  {isConnected && isAuthenticated && user ? (
                    <div className="flex flex-col space-y-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm text-muted-foreground">Balance: {balance} SOL</div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent"
                          onClick={() => setShowProfileModal(true)}
                        >
                          <User className="w-4 h-4 mr-2" />
                          Profile
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDisconnect}
                          className="bg-transparent text-destructive hover:bg-destructive/10"
                        >
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button onClick={() => setShowWalletModal(true)} className="auction-glow w-fit">
                      <Wallet className="w-4 h-4 mr-2" />
                      Connect Wallet
                    </Button>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <WalletConnectModal isOpen={showWalletModal} onClose={() => setShowWalletModal(false)} />
      <UserProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
    </>
  )
}
