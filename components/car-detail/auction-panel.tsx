"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BiddingInterface } from "../bidding/bidding-interface"
import { Gavel, TrendingUp, AlertTriangle } from "lucide-react"

export function AuctionPanel() {
  const [timeLeft, setTimeLeft] = useState(93720) // seconds
  const [currentBid, setCurrentBid] = useState(850000) // in SOL (wei equivalent)
  const [totalBids, setTotalBids] = useState(47)

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Simulate bid updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.98) {
        setCurrentBid((prev) => prev + 5000)
        setTotalBids((prev) => prev + 1)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`
    }
    return `${hours}h ${minutes}m ${secs}s`
  }

  const minimumBid = currentBid + 5000
  const progress = Math.min((currentBid / 1000000) * 100, 100)
  const reservePrice = 800000

  return (
    <div className="space-y-6">
      {/* Auction Status Card */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50 sticky top-24">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Gavel className="w-5 h-5 text-primary" />
              Live Auction
            </CardTitle>
            <Badge className="bg-red-500/90 text-white">
              <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
              LIVE
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Current Bid Display */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Current Bid</p>
            <div className="text-3xl font-bold text-primary mb-1">{currentBid.toLocaleString()} SOL</div>
            <p className="text-sm text-muted-foreground">≈ ${(currentBid * 2.34).toLocaleString()} USD</p>
            <div className="flex items-center justify-center gap-1 text-green-400 text-sm mt-2">
              <TrendingUp className="w-3 h-3" />
              <span>+{(((currentBid - reservePrice) / reservePrice) * 100).toFixed(1)}% from reserve</span>
            </div>
          </div>

          {/* Auction Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Reserve Met</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-xs text-muted-foreground mt-1">Reserve price: {reservePrice.toLocaleString()} SOL</p>
          </div>

          {/* Time Warning */}
          {timeLeft < 3600 && (
            <div className="flex items-center justify-center gap-1 text-red-400 text-sm p-2 bg-red-500/10 rounded-lg">
              <AlertTriangle className="w-3 h-3" />
              <span>Auction ending soon!</span>
            </div>
          )}
        </CardContent>
      </Card>

      <BiddingInterface
        auctionId="ferrari-275-gtb-4"
        currentBid={currentBid}
        minimumBid={minimumBid}
        timeRemaining={formatTime(timeLeft)}
        totalBids={totalBids}
      />
    </div>
  )
}
