"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Copy, ExternalLink, LogOut, Settings, Wallet, TrendingUp } from "lucide-react"
import { useWallet } from "./wallet-provider"

export function WalletInfo() {
  const { address, balance, chainId, disconnectWallet } = useWallet()
  const [copied, setCopied] = useState(false)

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const getNetworkName = (id: number) => {
    const networks: { [key: number]: string } = {
      1: "Ethereum",
      137: "Polygon",
      56: "BSC",
    }
    return networks[id] || "Unknown"
  }

  if (!address) return null

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Wallet Connected
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Address */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Address</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                {chainId && getNetworkName(chainId)}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <code className="text-sm bg-muted px-2 py-1 rounded">{formatAddress(address)}</code>
            <Button variant="ghost" size="sm" onClick={copyAddress} className="h-8 w-8 p-0">
              <Copy className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>
          {copied && <p className="text-xs text-green-400">Address copied!</p>}
        </div>

        <Separator />

        {/* Balance */}
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">Balance</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{balance} SOL</span>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-xs text-muted-foreground">
            ≈ ${(Number.parseFloat(balance || "0") * 2340).toLocaleString()} USD
          </p>
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={disconnectWallet}
            className="flex-1 bg-transparent hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
