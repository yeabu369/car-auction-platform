"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, RotateCcw, Filter } from "lucide-react"

export function AuctionFilters() {
  const [priceRange, setPriceRange] = useState([0, 10000000])
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])
  const [selectedTimeframe, setSelectedTimeframe] = useState("")

  const auctionStatuses = [
    { name: "Live Now", count: 24, color: "text-red-400" },
    { name: "Ending Soon", count: 8, color: "text-orange-400" },
    { name: "Starting Soon", count: 45, color: "text-blue-400" },
    { name: "Reserve Met", count: 12, color: "text-green-400" },
  ]

  const timeframes = ["Next Hour", "Next 6 Hours", "Next 24 Hours", "Next 3 Days", "Next Week", "Next Month"]

  const toggleStatus = (status: string) => {
    setSelectedStatus((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  const clearAllFilters = () => {
    setSelectedStatus([])
    setSelectedTimeframe("")
    setPriceRange([0, 10000000])
  }

  const activeFiltersCount = selectedStatus.length + (selectedTimeframe ? 1 : 0)

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Active Filters
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                <RotateCcw className="w-3 h-3 mr-1" />
                Clear
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {selectedStatus.map((status) => (
                <Badge key={status} variant="secondary" className="bg-primary/20 text-primary">
                  {status}
                  <button onClick={() => toggleStatus(status)} className="ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              {selectedTimeframe && (
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  {selectedTimeframe}
                  <button onClick={() => setSelectedTimeframe("")} className="ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Auction Status */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-sm">Auction Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {auctionStatuses.map((status) => (
            <div key={status.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={status.name}
                  checked={selectedStatus.includes(status.name)}
                  onCheckedChange={() => toggleStatus(status.name)}
                />
                <Label htmlFor={status.name} className="text-sm cursor-pointer">
                  {status.name}
                </Label>
              </div>
              <span className={`text-xs ${status.color}`}>{status.count}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Time Frame */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-sm">Ending Timeframe</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              {timeframes.map((timeframe) => (
                <SelectItem key={timeframe} value={timeframe}>
                  {timeframe}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Current Bid Range */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-sm">Current Bid Range (SOL)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="px-2">
            <Slider value={priceRange} onValueChange={setPriceRange} max={10000000} step={100000} className="w-full" />
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
              className="text-xs"
            />
            <span className="text-muted-foreground">to</span>
            <Input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 10000000])}
              className="text-xs"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Filters */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-sm">Quick Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
            No Reserve Auctions
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
            Featured Auctions
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
            Verified Sellers Only
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
            Buy It Now Available
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
