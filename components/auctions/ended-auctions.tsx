"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Trophy, TrendingUp, Eye } from "lucide-react"

interface EndedAuction {
  id: string
  title: string
  make: string
  model: string
  year: number
  finalBid: number
  winner: string
  endDate: string
  totalBids: number
  image: string
  soldAboveReserve: boolean
  viewCount: number
}

const mockEndedAuctions: EndedAuction[] = [
  {
    id: "1",
    title: "1965 Aston Martin DB5",
    make: "Aston Martin",
    model: "DB5",
    year: 1965,
    finalBid: 1250000,
    winner: "ClassicCollector",
    endDate: "Dec 20, 2024",
    totalBids: 89,
    image: "/1965-aston-martin-db5-silver-classic-car.jpg",
    soldAboveReserve: true,
    viewCount: 1234,
  },
  {
    id: "2",
    title: "1970 Plymouth 'Cuda",
    make: "Plymouth",
    model: "'Cuda",
    year: 1970,
    finalBid: 185000,
    winner: "MuscleCarFan",
    endDate: "Dec 18, 2024",
    totalBids: 45,
    image: "/1970-plymouth-cuda-yellow-muscle-car.jpg",
    soldAboveReserve: true,
    viewCount: 567,
  },
  {
    id: "3",
    title: "1958 Chevrolet Corvette",
    make: "Chevrolet",
    model: "Corvette",
    year: 1958,
    finalBid: 95000,
    winner: "VintageVette",
    endDate: "Dec 15, 2024",
    totalBids: 32,
    image: "/1958-chevrolet-corvette-red-classic-car.jpg",
    soldAboveReserve: false,
    viewCount: 445,
  },
]

export function EndedAuctions() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Recently Ended</h2>
        <Badge variant="secondary" className="bg-gray-500/20 text-gray-400">
          {mockEndedAuctions.length} Completed
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEndedAuctions.map((auction) => (
          <Card
            key={auction.id}
            className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group opacity-90"
          >
            <div className="relative overflow-hidden">
              <img
                src={auction.image || "/placeholder.svg"}
                alt={auction.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 grayscale-[20%]"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-gray-500/90 text-white">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Sold
                </Badge>
              </div>
              {auction.soldAboveReserve && (
                <div className="absolute bottom-3 left-3">
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                    <Trophy className="w-3 h-3 mr-1" />
                    Above Reserve
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
                  <p className="text-sm text-muted-foreground">Final Bid</p>
                  <p className="text-xl font-bold text-primary">{auction.finalBid.toLocaleString()} SOL</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Bids</p>
                  <p className="text-lg font-semibold">{auction.totalBids}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Winner:</span>
                  <span className="font-medium">{auction.winner}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ended:</span>
                  <span>{auction.endDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {auction.viewCount} views
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Completed
                </span>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  View Details
                </Button>
                <Button variant="outline" className="bg-transparent">
                  Similar Cars
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
