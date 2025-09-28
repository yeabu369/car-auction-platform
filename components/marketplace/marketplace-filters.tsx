"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X, RotateCcw } from "lucide-react"

export function MarketplaceFilters() {
  const [priceRange, setPriceRange] = useState([0, 10000000])
  const [selectedMakes, setSelectedMakes] = useState<string[]>([])
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [selectedRarity, setSelectedRarity] = useState<string[]>([])

  const makes = [
    { name: "Ferrari", count: 45 },
    { name: "Porsche", count: 78 },
    { name: "Mercedes-Benz", count: 56 },
    { name: "Aston Martin", count: 34 },
    { name: "Lamborghini", count: 29 },
    { name: "McLaren", count: 23 },
    { name: "Jaguar", count: 41 },
    { name: "BMW", count: 67 },
  ]

  const conditions = [
    { name: "Excellent", count: 234 },
    { name: "Very Good", count: 456 },
    { name: "Good", count: 789 },
    { name: "Fair", count: 123 },
  ]

  const rarityLevels = [
    { name: "One of One", count: 12 },
    { name: "Legendary", count: 34 },
    { name: "Ultra Rare", count: 89 },
    { name: "Rare", count: 234 },
    { name: "Common", count: 567 },
  ]

  const toggleMake = (make: string) => {
    setSelectedMakes((prev) => (prev.includes(make) ? prev.filter((m) => m !== make) : [...prev, make]))
  }

  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition) ? prev.filter((c) => c !== condition) : [...prev, condition],
    )
  }

  const toggleRarity = (rarity: string) => {
    setSelectedRarity((prev) => (prev.includes(rarity) ? prev.filter((r) => r !== rarity) : [...prev, rarity]))
  }

  const clearAllFilters = () => {
    setSelectedMakes([])
    setSelectedConditions([])
    setSelectedRarity([])
    setPriceRange([0, 10000000])
  }

  const activeFiltersCount = selectedMakes.length + selectedConditions.length + selectedRarity.length

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Active Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                <RotateCcw className="w-3 h-3 mr-1" />
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {selectedMakes.map((make) => (
                <Badge key={make} variant="secondary" className="bg-primary/20 text-primary">
                  {make}
                  <button onClick={() => toggleMake(make)} className="ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              {selectedConditions.map((condition) => (
                <Badge key={condition} variant="secondary" className="bg-primary/20 text-primary">
                  {condition}
                  <button onClick={() => toggleCondition(condition)} className="ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              {selectedRarity.map((rarity) => (
                <Badge key={rarity} variant="secondary" className="bg-primary/20 text-primary">
                  {rarity}
                  <button onClick={() => toggleRarity(rarity)} className="ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Range
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-sm">Price Range (SOL)</CardTitle>
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
      </Card> */}

      {/* Make */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-sm">Make</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {makes.map((make) => (
            <div key={make.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={make.name}
                  checked={selectedMakes.includes(make.name)}
                  onCheckedChange={() => toggleMake(make.name)}
                />
                <Label htmlFor={make.name} className="text-sm cursor-pointer">
                  {make.name}
                </Label>
              </div>
              <span className="text-xs text-muted-foreground">{make.count}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Condition */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-sm">Condition</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {conditions.map((condition) => (
            <div key={condition.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={condition.name}
                  checked={selectedConditions.includes(condition.name)}
                  onCheckedChange={() => toggleCondition(condition.name)}
                />
                <Label htmlFor={condition.name} className="text-sm cursor-pointer">
                  {condition.name}
                </Label>
              </div>
              <span className="text-xs text-muted-foreground">{condition.count}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rarity */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-sm">Rarity Level</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {rarityLevels.map((rarity) => (
            <div key={rarity.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={rarity.name}
                  checked={selectedRarity.includes(rarity.name)}
                  onCheckedChange={() => toggleRarity(rarity.name)}
                />
                <Label htmlFor={rarity.name} className="text-sm cursor-pointer">
                  {rarity.name}
                </Label>
              </div>
              <span className="text-xs text-muted-foreground">{rarity.count}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
