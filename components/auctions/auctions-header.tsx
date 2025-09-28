"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Calendar, Archive, Plus } from "lucide-react"

export function AuctionsHeader() {
  const [activeTab, setActiveTab] = useState("live")

  return (
    <div className="bg-card/50 border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Auctions</h1>
              <p className="text-muted-foreground">Discover and bid on exceptional vehicles</p>
            </div>
            <Button className="auction-glow">
              <Plus className="w-4 h-4 mr-2" />
              List Your Car
            </Button>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
              <TabsTrigger value="live" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Live Auctions
                <Badge variant="secondary" className="bg-red-500/20 text-red-400">
                  24
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Upcoming
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                  156
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="ended" className="flex items-center gap-2">
                <Archive className="w-4 h-4" />
                Ended
                <Badge variant="secondary" className="bg-gray-500/20 text-gray-400">
                  2,847
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
