"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Eye, Heart, Bell } from "lucide-react"

interface UpcomingAuction {
  id: string
  title: string
  make: string
  model: string
  year: number
  estimatedValue: string
  startDate: string
  startTime: string
  image: string
  watchers: number
  isNotified: boolean
}

const mockUpcomingAuctions: UpcomingAuction[] = [
  {
    id: "1",
    title: "1955 Mercedes-Benz 300SL Gullwing",
    make: "Mercedes-Benz",
    model: "300SL",
    year: 1955,
    estimatedValue: "1.2M - 1.5M",
    startDate: "Dec 28, 2024",
    startTime: "2:00 PM EST",
    image: "/1955-mercedes-300sl-gullwing-silver-classic-car.jpg",
    watchers: 567,
    isNotified: false,
  },
  {
    id: "2",
    title: "1969 Dodge Charger R/T",
    make: "Dodge",
    model: "Charger R/T",
    year: 1969,
    estimatedValue: "180K - 220K",
    startDate: "Dec 29, 2024",
    startTime: "10:00 AM EST",
    image: "/1969-dodge-charger-rt-orange-muscle-car.jpg",
    watchers: 234,
    isNotified: true,
  },
  {
    id: "3",
    title: "1973 Porsche 911 Carrera RS",
    make: "Porsche",
    model: "911 Carrera RS",
    year: 1973,
    estimatedValue: "800K - 950K",
    startDate: "Dec 30, 2024",
    startTime: "4:00 PM EST",
    image: "/1973-porsche-911-carrera-rs-white-classic-car.jpg",
    watchers: 445,
    isNotified: false,
  },
]

export function UpcomingAuctions() {
  const [watchedItems, setWatchedItems] = useState<Set<string>>(new Set())
  const [notifications, setNotifications] = useState<Set<string>>(new Set(["2"]))

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

  const toggleNotification = (auctionId: string) => {
    setNotifications((prev) => {
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
        <h2 className="text-2xl font-bold">Upcoming Auctions</h2>
        <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
          {mockUpcomingAuctions.length} Scheduled
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockUpcomingAuctions.map((auction) => (
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
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                  <Calendar className="w-3 h-3 mr-1" />
                  Upcoming
                </Badge>
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleNotification(auction.id)}
                  className="bg-black/50 hover:bg-black/70 text-white"
                >
                  <Bell
                    className={`w-4 h-4 ${notifications.has(auction.id) ? "fill-yellow-500 text-yellow-500" : ""}`}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleWatch(auction.id)}
                  className="bg-black/50 hover:bg-black/70 text-white"
                >
                  <Heart className={`w-4 h-4 ${watchedItems.has(auction.id) ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{auction.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {auction.year} {auction.make} {auction.model}
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Value</p>
                  <p className="text-lg font-bold text-primary">{auction.estimatedValue} SOL</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span>
                    {auction.startDate} at {auction.startTime}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {auction.watchers} interested
                </span>
                {notifications.has(auction.id) && (
                  <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 text-xs">
                    Notified
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  Set Reminder
                </Button>
                <Button variant="outline" className="bg-transparent">
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
