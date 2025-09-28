"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Wallet, AlertCircle } from "lucide-react"
import { useWallet } from "./wallet-provider"

interface WalletConnectModalProps {
  isOpen: boolean
  onClose: () => void
}

const walletOptions = [
  {
    id: "metamask",
    name: "MetaMask",
    description: "Connect using browser extension",
    icon: "🦊",
    popular: true,
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    description: "Connect using mobile wallet",
    icon: "📱",
    popular: true,
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    description: "Connect using Coinbase",
    icon: "🔵",
    popular: false,
  },
  {
    id: "trust",
    name: "Trust Wallet",
    description: "Connect using Trust Wallet",
    icon: "🛡️",
    popular: false,
  },
]

export function WalletConnectModal({ isOpen, onClose }: WalletConnectModalProps) {
  const { connectWallet, isConnecting, error } = useWallet()
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  const handleConnect = async (walletId: string) => {
    setSelectedWallet(walletId)
    try {
      await connectWallet(walletId)
      onClose()
    } catch (err) {
      // Error is handled by the wallet provider
    }
    setSelectedWallet(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Connect Your Wallet
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            {walletOptions.map((wallet) => (
              <Button
                key={wallet.id}
                variant="outline"
                className="w-full justify-start h-auto p-4 bg-transparent hover:bg-accent/50"
                onClick={() => handleConnect(wallet.id)}
                disabled={isConnecting}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="text-2xl">{wallet.icon}</div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{wallet.name}</span>
                      {wallet.popular && (
                        <Badge variant="secondary" className="text-xs bg-primary/20 text-primary">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{wallet.description}</p>
                  </div>
                  {isConnecting && selectedWallet === wallet.id && <Loader2 className="w-4 h-4 animate-spin" />}
                </div>
              </Button>
            ))}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>By connecting a wallet, you agree to our Terms of Service</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
