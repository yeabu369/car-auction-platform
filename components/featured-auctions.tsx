"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye, Heart, Zap, ArrowRight } from "lucide-react"

const featuredCars = [
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
    isLive: true,
    rarity: "Ultra Rare",
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
    isLive: true,
    rarity: "Legendary",
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
    isLive: true,
    rarity: "One of One",
  },
]

export function FeaturedAuctions() {
  const [likedCars, setLikedCars] = useState<number[]>([])

  const toggleLike = (carId: number) => {
    setLikedCars((prev) => (prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]))
  }

  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary">
            <Zap className="w-3 h-3 mr-1" />
            Featured Auctions
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Exceptional <span className="gradient-text">Automotive Art</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover the world's most coveted classic and exotic cars, authenticated and ready for auction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <Card
              key={car.id}
              className="car-card-hover bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={car.image || "/placeholder.svg"}
                  alt={car.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {car.isLive && (
                    <Badge className="bg-red-500/90 text-white">
                      <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
                      LIVE
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
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
                    onClick={() => toggleLike(car.id)}
                    className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white hover:bg-black/70 transition-colors"
                  >
                    <Heart className={`w-3 h-3 ${likedCars.includes(car.id) ? "fill-red-500 text-red-500" : ""}`} />
                    {car.likes + (likedCars.includes(car.id) ? 1 : 0)}
                  </button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2 text-balance">{car.name}</h3>
                  <p className="text-muted-foreground">
                    {car.year} • {car.make} {car.model}
                  </p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Bid</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {car.currentBid} {car.currency}
                      </span>
                      <span className="text-sm text-muted-foreground">{car.usdValue}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Time Left</p>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Clock className="w-3 h-3" />
                      {car.timeLeft}
                    </div>
                  </div>
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

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Auctions
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
