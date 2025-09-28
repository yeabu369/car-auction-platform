"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye, Heart, Gavel, MoreHorizontal } from "lucide-react"

const marketplaceCars = [
  {
    id: 1,
    name: "1967 Ferrari 275 GTB/4",
    year: 1967,
    make: "Ferrari",
    model: "275 GTB/4",
    currentBid: "2.4",
    currency: "SOL",
    usdValue: "$4,800,000",
    timeLeft: "2d 14h 32m",
    image: "/1967-ferrari-275-gtb-4-red-classic-car.jpg",
    views: 1247,
    likes: 89,
    bids: 47,
    isLive: true,
    rarity: "Ultra Rare",
    condition: "Excellent",
    seller: "classiccarking",
    verified: true,
  },
  {
    id: 2,
    name: "1955 Mercedes-Benz 300SL Gullwing",
    year: 1955,
    make: "Mercedes-Benz",
    model: "300SL Gullwing",
    currentBid: "1.8",
    currency: "SOL",
    usdValue: "$3,600,000",
    timeLeft: "1d 8h 15m",
    image: "/1955-mercedes-benz-300sl-gullwing-silver-classic-c.jpg",
    views: 892,
    likes: 67,
    bids: 32,
    isLive: true,
    rarity: "Legendary",
    condition: "Very Good",
    seller: "luxuryautohaus",
    verified: true,
  },
  {
    id: 3,
    name: "1970 Porsche 917K",
    year: 1970,
    make: "Porsche",
    model: "917K",
    currentBid: "3.2",
    currency: "SOL",
    usdValue: "$6,400,000",
    timeLeft: "4d 2h 45m",
    image: "/1970-porsche-917k-blue-racing-car.jpg",
    views: 2156,
    likes: 134,
    bids: 78,
    isLive: true,
    rarity: "One of One",
    condition: "Excellent",
    seller: "speedster_mike",
    verified: true,
  },
  {
    id: 4,
    name: "1963 Aston Martin DB5",
    year: 1963,
    make: "Aston Martin",
    model: "DB5",
    currentBid: "1.2",
    currency: "SOL",
    usdValue: "$2,400,000",
    timeLeft: "1h 32m",
    image: "/1963-aston-martin-db5-silver-classic-car.jpg",
    views: 567,
    likes: 45,
    bids: 23,
    isLive: true,
    rarity: "Ultra Rare",
    condition: "Very Good",
    seller: "carbaron",
    verified: true,
  },
  {
    id: 5,
    name: "1969 Dodge Charger R/T",
    year: 1969,
    make: "Dodge",
    model: "Charger R/T",
    currentBid: "0.8",
    currency: "SOL",
    usdValue: "$160,000",
    timeLeft: "2h 15m",
    image: "/1969-dodge-charger-rt-black-muscle-car.jpg",
    views: 423,
    likes: 28,
    bids: 18,
    isLive: true,
    rarity: "Rare",
    condition: "Good",
    seller: "classiccarking",
    verified: true,
  },
  {
    id: 6,
    name: "1973 Porsche Carrera RS",
    year: 1973,
    make: "Porsche",
    model: "Carrera RS",
    currentBid: "2.1",
    currency: "SOL",
    usdValue: "$4,200,000",
    timeLeft: "30m",
    image: "/1973-porsche-carrera-rs-white-classic-car.jpg",
    views: 789,
    likes: 56,
    bids: 31,
    isLive: true,
    rarity: "Legendary",
    condition: "Excellent",
    seller: "speedster_mike",
    verified: true,
  },
]

export function MarketplaceGrid() {
  const [likedCars, setLikedCars] = useState<number[]>([])

  const toggleLike = (carId: number) => {
    setLikedCars((prev) => (prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]))
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "One of One":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "Legendary":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Ultra Rare":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "Rare":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">2,847 Cars Available</h2>
          <p className="text-sm text-muted-foreground">Showing all results</p>
        </div>
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {marketplaceCars.map((car) => (
          <Card
            key={car.id}
            className="car-card-hover bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden group cursor-pointer"
          >
            <div className="relative">
              <img
                src={car.image || "/placeholder.svg"}
                alt={car.name}
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {car.isLive && (
                  <Badge className="bg-red-500/90 text-white">
                    <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
                    LIVE
                  </Badge>
                )}
                <Badge variant="secondary" className={getRarityColor(car.rarity)}>
                  {car.rarity}
                </Badge>
              </div>

              {/* Stats Overlay */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white">
                  <Eye className="w-3 h-3" />
                  {car.views}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleLike(car.id)
                  }}
                  className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white hover:bg-black/70 transition-colors"
                >
                  <Heart className={`w-3 h-3 ${likedCars.includes(car.id) ? "fill-red-500 text-red-500" : ""}`} />
                  {car.likes + (likedCars.includes(car.id) ? 1 : 0)}
                </button>
              </div>

              {/* Quick Actions */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-black/50 backdrop-blur-sm text-white border-white/20"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-1 text-balance">{car.name}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    {car.year} • {car.condition}
                  </span>
                  <span className="flex items-center gap-1">
                    <Gavel className="w-3 h-3" />
                    {car.bids} bids
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Current Bid</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-primary">
                      {car.currentBid} {car.currency}
                    </span>
                    <span className="text-xs text-muted-foreground">{car.usdValue}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Time Left</p>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Clock className="w-3 h-3" />
                    {car.timeLeft}
                  </div>
                </div>
              </div>

              {/* Seller Info */}
              <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
                <span>Seller: @{car.seller}</span>
                {car.verified && (
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 text-xs">
                    Verified
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 auction-glow">Place Bid</Button>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-8">
        <Button variant="outline" size="lg">
          Load More Cars
        </Button>
      </div>
    </div>
  )
}
