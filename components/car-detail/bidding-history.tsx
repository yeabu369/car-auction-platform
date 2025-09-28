"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrendingUp, Crown, Zap } from "lucide-react"

const biddingHistory = [
  {
    id: 1,
    bidder: "carbaron",
    avatar: "/avatar-1.jpg",
    amount: 2.4,
    timestamp: "2 minutes ago",
    isWinning: true,
    verified: true,
    bidNumber: 47,
  },
  {
    id: 2,
    bidder: "luxuryautohaus",
    avatar: "/avatar-2.jpg",
    amount: 2.1,
    timestamp: "8 minutes ago",
    isWinning: false,
    verified: true,
    bidNumber: 46,
  },
  {
    id: 3,
    bidder: "speedster_mike",
    avatar: "/avatar-3.jpg",
    amount: 1.8,
    timestamp: "15 minutes ago",
    isWinning: false,
    verified: false,
    bidNumber: 45,
  },
  {
    id: 4,
    bidder: "classiccarking",
    avatar: "/avatar-4.jpg",
    amount: 1.5,
    timestamp: "23 minutes ago",
    isWinning: false,
    verified: true,
    bidNumber: 44,
  },
  {
    id: 5,
    bidder: "carbaron",
    avatar: "/avatar-1.jpg",
    amount: 1.2,
    timestamp: "35 minutes ago",
    isWinning: false,
    verified: true,
    bidNumber: 43,
  },
  {
    id: 6,
    bidder: "luxuryautohaus",
    avatar: "/avatar-2.jpg",
    amount: 1.0,
    timestamp: "1 hour ago",
    isWinning: false,
    verified: true,
    bidNumber: 42,
  },
]

export function BiddingHistory() {
  const [showAll, setShowAll] = useState(false)
  const displayedBids = showAll ? biddingHistory : biddingHistory.slice(0, 5)

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Bidding History
          <Badge variant="secondary" className="bg-primary/20 text-primary">
            {biddingHistory.length} bids
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {displayedBids.map((bid, index) => (
            <div
              key={bid.id}
              className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                bid.isWinning ? "bg-primary/10 border border-primary/20" : "bg-background/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={bid.avatar || "/placeholder.svg"} alt={bid.bidder} />
                    <AvatarFallback>{bid.bidder.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {bid.isWinning && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Crown className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">@{bid.bidder}</span>
                    {bid.verified && (
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400 text-xs">
                        Verified
                      </Badge>
                    )}
                    {bid.isWinning && (
                      <Badge className="bg-primary text-primary-foreground text-xs">
                        <Crown className="w-3 h-3 mr-1" />
                        Winning
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Bid #{bid.bidNumber} • {bid.timestamp}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-primary">{bid.amount.toFixed(1)} SOL</div>
                <div className="text-sm text-muted-foreground">${(bid.amount * 2000).toLocaleString()}</div>
              </div>
            </div>
          ))}

          {!showAll && biddingHistory.length > 5 && (
            <Button variant="outline" onClick={() => setShowAll(true)} className="w-full">
              Show All {biddingHistory.length} Bids
            </Button>
          )}

          {showAll && (
            <Button variant="outline" onClick={() => setShowAll(false)} className="w-full">
              Show Less
            </Button>
          )}
        </div>

        {/* Bidding Stats */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-primary">2.4 SOL</div>
              <div className="text-xs text-muted-foreground">Highest Bid</div>
            </div>
            <div>
              <div className="text-lg font-bold">0.3 SOL</div>
              <div className="text-xs text-muted-foreground">Avg. Increment</div>
            </div>
            <div>
              <div className="text-lg font-bold flex items-center justify-center gap-1">
                <Zap className="w-4 h-4" />
                23
              </div>
              <div className="text-xs text-muted-foreground">Unique Bidders</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
