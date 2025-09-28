"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Grid3X3, List, SortAsc } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function MarketplaceHeader() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("ending_soon")

  return (
    <div className="bg-card/50 border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-4">
          {/* Title and Badge */}
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">Marketplace</h1>
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              2,847 Cars Available
            </Badge>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search by make, model, year..." className="pl-10 bg-background/50" />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* <Button variant="outline" size="sm">
                    <SortAsc className="w-4 h-4 mr-2" />
                    Sort
                  </Button> */}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("ending_soon")}>Ending Soon</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price_low")}>Price: Low to High</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price_high")}>Price: High to Low</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest First</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("most_bids")}>Most Bids</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* View Mode Toggle */}
              {/* <div className="flex border border-border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div> */}

              {/* Filter Toggle
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
