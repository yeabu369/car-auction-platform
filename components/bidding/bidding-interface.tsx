"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Gavel, TrendingUp, Clock, Users, AlertTriangle, CheckCircle, Zap, Plus, Minus } from "lucide-react"
import { useAuth } from "../auth/auth-provider"
import { useWallet } from "../wallet/wallet-provider"

interface Bid {
  id: string
  bidder: string
  amount: number
  timestamp: string
  isWinning: boolean
  avatar?: string
}

interface BiddingInterfaceProps {
  auctionId: string
  currentBid: number
  minimumBid: number
  timeRemaining: string
  totalBids: number
}

export function BiddingInterface({
  auctionId,
  currentBid,
  minimumBid,
  timeRemaining,
  totalBids,
}: BiddingInterfaceProps) {
  const { user, isAuthenticated } = useAuth()
  const { isConnected, balance } = useWallet()
  const [bidAmount, setBidAmount] = useState(minimumBid)
  const [isPlacingBid, setIsPlacingBid] = useState(false)
  const [bidHistory, setBidHistory] = useState<Bid[]>([
    {
      id: "1",
      bidder: "Collector1234",
      amount: 850000,
      timestamp: "2 minutes ago",
      isWinning: true,
      avatar: "/diverse-user-avatars.png",
    },
    {
      id: "2",
      bidder: "ClassicCarFan",
      amount: 825000,
      timestamp: "5 minutes ago",
      isWinning: false,
      avatar: "/diverse-user-avatar-set-2.png",
    },
    {
      id: "3",
      bidder: "VintageExpert",
      amount: 800000,
      timestamp: "8 minutes ago",
      isWinning: false,
      avatar: "/diverse-user-avatars-3.png",
    },
  ])
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const quickBidAmounts = [5000, 10000, 25000, 50000]

  const placeBid = async () => {
    if (!isAuthenticated || !isConnected) {
      setError("Please connect your wallet and sign in to place a bid")
      return
    }

    if (bidAmount < minimumBid) {
      setError(`Minimum bid is ${minimumBid.toLocaleString()} SOL`)
      return
    }

    const balanceNum = Number.parseFloat(balance || "0")
    if (bidAmount > balanceNum) {
      setError("Insufficient balance")
      return
    }

    setIsPlacingBid(true)
    setError(null)

    try {
      // Simulate bid placement
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Add new bid to history
      const newBid: Bid = {
        id: Date.now().toString(),
        bidder: user?.username || "You",
        amount: bidAmount,
        timestamp: "Just now",
        isWinning: true,
        avatar: user?.avatar,
      }

      setBidHistory((prev) => [newBid, ...prev.map((bid) => ({ ...bid, isWinning: false }))])
      setSuccess(`Bid placed successfully for ${bidAmount.toLocaleString()} SOL!`)
      setBidAmount(bidAmount + 5000) // Set next minimum bid

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError("Failed to place bid. Please try again.")
    } finally {
      setIsPlacingBid(false)
    }
  }

  const adjustBidAmount = (amount: number) => {
    const newAmount = Math.max(minimumBid, bidAmount + amount)
    setBidAmount(newAmount)
  }

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} SOL`
  }

  return (
    <div className="space-y-6">
      {/* Current Auction Status */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Gavel className="w-5 h-5" />
            Live Auction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Current Bid</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(currentBid)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time Remaining</p>
              <p className="text-lg font-semibold flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {timeRemaining}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {totalBids} bids
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Next bid: {formatCurrency(minimumBid)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Bidding Form */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Place Your Bid</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-500/50 bg-green-500/10">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-400">{success}</AlertDescription>
            </Alert>
          )}

          {!isAuthenticated || !isConnected ? (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>Connect your wallet and sign in to participate in this auction</AlertDescription>
            </Alert>
          ) : (
            <>
              {/* Bid Amount Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Bid Amount (SOL)</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => adjustBidAmount(-5000)}
                    disabled={bidAmount <= minimumBid}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <Input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    className="text-center font-mono text-lg"
                    min={minimumBid}
                  />
                  <Button variant="outline" size="sm" onClick={() => adjustBidAmount(5000)}>
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Quick Bid Buttons */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Quick Bid</label>
                <div className="grid grid-cols-2 gap-2">
                  {quickBidAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setBidAmount(bidAmount + amount)}
                      className="bg-transparent"
                    >
                      +{amount.toLocaleString()}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Wallet Balance */}
              <div className="text-sm text-muted-foreground">Available Balance: {balance} SOL</div>

              {/* Place Bid Button */}
              <Button
                onClick={placeBid}
                disabled={isPlacingBid || bidAmount < minimumBid}
                className="w-full auction-glow"
                size="lg"
              >
                {isPlacingBid ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Placing Bid...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Place Bid - {formatCurrency(bidAmount)}
                  </>
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Bid History */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Bid History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bidHistory.map((bid, index) => (
              <div key={bid.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={bid.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">{bid.bidder.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{bid.bidder}</span>
                        {bid.isWinning && (
                          <Badge variant="secondary" className="bg-primary/20 text-primary text-xs">
                            Winning
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{bid.timestamp}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatCurrency(bid.amount)}</p>
                  </div>
                </div>
                {index < bidHistory.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
