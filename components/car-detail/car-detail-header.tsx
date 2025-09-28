"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Share, Heart, Flag } from "lucide-react"
import { useRouter } from "next/navigation"

export function CarDetailHeader() {
  const router = useRouter()

  return (
    <div className="bg-card/50 border-b border-border sticky top-0 z-40 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold">1967 Ferrari 275 GTB/4</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Auction #FER-275-001</span>
                <Badge className="bg-red-500/90 text-white">
                  <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
                  LIVE
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Flag className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
