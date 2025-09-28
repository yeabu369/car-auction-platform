"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Gavel, TrendingUp, Eye, Heart } from "lucide-react"

interface LiveAuction {
  id: string
  title: string
  make: string
  model: string
  year: number
  currentBid: number
  timeRemaining: string
  totalBids: number
  image: string
  isReserveMet: boolean
  watchers: number
}

const mockLiveAuctions: LiveAuction[] = [
  {
    id: "1",
    title: "1963 Ferrari 275 GTB/4",
    make: "Ferrari",
    model: "275 GTB/4",
    year: 1963,
    currentBid: 850000,
    timeRemaining: "2h 15m",
    totalBids: 47,
    image: "/1963-ferrari-275-gtb-red-classic-car.jpg",
    isReserveMet: true,
    watchers: 234,
  },
  {
    id: "2",
    title: "1970 Porsche 911S",
    make: "Porsche",
    model: "911S",
    year: 1970,
    currentBid: 425000,
    timeRemaining: "5h 42m",
    totalBids: 32,
    image: "/1970-porsche-911s-blue-classic-car.jpg",
    isReserveMet: true,
    watchers: 156,
  },
  {
    id: "3",
    title: "1967 Shelby GT500",
    make: "Shelby",
    model: "GT500",
    year: 1967,
    currentBid: 320000,
    timeRemaining: "1d 3h",
    totalBids: 28,
    image: "/1967-shelby-gt500-white-muscle-car.jpg",
    isReserveMet: false,
    watchers: 189,
  },
]

export function LiveAuctionsList() {
  const [watchedItems, setWatchedItems] = useState<Set<string>>(new Set())

  const toggleWatch = (auctionId: string) => {
    setWatchedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(auctionId)) {
        newSet.delete(auctionId)
      } else {
        newSet.add(auctionId)
      }
      return newSet
    })
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Live Auctions</h2>
        <Badge className="bg-red-500/90 text-white">
          <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
          {mockLiveAuctions.length} LIVE
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockLiveAuctions.map((auction) => (
          <Card
            key={auction.id}
            className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group"
          >
            <div className="relative overflow-hidden">
              <img
                src={auction.image || "/placeholder.svg"}
                alt={auction.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-red-500/90 text-white">
                  <Clock className="w-3 h-3 mr-1" />
                  {auction.timeRemaining}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleWatch(auction.id)}
                  className="bg-black/50 hover:bg-black/70 text-white"
                >
                  <Heart className={`w-4 h-4 ${watchedItems.has(auction.id) ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>
              {auction.isReserveMet && (
                <div className="absolute bottom-3 left-3">
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                    Reserve Met
                  </Badge>
                </div>
              )}
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{auction.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {auction.year} {auction.make} {auction.model}
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Bid</p>
                  <p className="text-xl font-bold text-primary">{auction.currentBid.toLocaleString()} SOL</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Bids</p>
                  <p className="text-lg font-semibold">{auction.totalBids}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {auction.watchers} watching
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Active
                </span>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 auction-glow">
                  <Gavel className="w-4 h-4 mr-2" />
                  Bid Now
                </Button>
                <Button variant="outline" className="bg-transparent">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
