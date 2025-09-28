"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Gavel, Users, TrendingUp, Clock } from "lucide-react"

const liveAuctions = [
  {
    id: 1,
    name: "1963 Aston Martin DB5",
    currentBid: 1.2,
    nextBid: 1.3,
    currency: "SOL",
    bidders: 23,
    timeLeft: 3600, // seconds
    progress: 75,
    image: "/1963-aston-martin-db5-silver-classic-car.jpg",
  },
  {
    id: 2,
    name: "1969 Dodge Charger R/T",
    currentBid: 0.8,
    nextBid: 0.9,
    currency: "SOL",
    bidders: 18,
    timeLeft: 7200,
    progress: 60,
    image: "/1969-dodge-charger-rt-black-muscle-car.jpg",
  },
  {
    id: 3,
    name: "1973 Porsche Carrera RS",
    currentBid: 2.1,
    nextBid: 2.2,
    currency: "SOL",
    bidders: 31,
    timeLeft: 1800,
    progress: 90,
    image: "/1973-porsche-carrera-rs-white-classic-car.jpg",
  },
]

export function LiveAuctions() {
  const [auctions, setAuctions] = useState(liveAuctions)

  // Simulate live bidding updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAuctions((prev) =>
        prev.map((auction) => ({
          ...auction,
          timeLeft: Math.max(0, auction.timeLeft - 1),
          // Randomly update bids
          currentBid: Math.random() > 0.95 ? auction.currentBid + 0.1 : auction.currentBid,
          bidders: Math.random() > 0.98 ? auction.bidders + 1 : auction.bidders,
        })),
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}h ${minutes}m ${secs}s`
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-red-500/20 text-red-400 border-red-500/30">
            <div className="w-2 h-2 bg-red-400 rounded-full mr-1 animate-pulse" />
            Live Now
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Live Auctions</span> in Progress
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join the excitement of real-time bidding on exceptional vehicles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {auctions.map((auction) => (
            <Card key={auction.id} className="bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden">
              <div className="relative">
                <img
                  src={auction.image || "/placeholder.svg"}
                  alt={auction.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-500/90 text-white">
                    <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
                    LIVE
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-balance">{auction.name}</CardTitle>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {auction.bidders} bidders
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTime(auction.timeLeft)}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="mb-4">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Current Bid</span>
                    <div className="flex items-center gap-1 text-green-400">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs">+12%</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">
                    {auction.currentBid.toFixed(1)} {auction.currency}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Next bid: {auction.nextBid.toFixed(1)} {auction.currency}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Auction Progress</span>
                    <span>{auction.progress}%</span>
                  </div>
                  <Progress value={auction.progress} className="h-2" />
                </div>

                <Button className="w-full auction-glow">
                  <Gavel className="w-4 h-4 mr-2" />
                  Place Bid
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Live Auctions
          </Button>
        </div>
      </div>
    </section>
  )
}
