import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Star, MessageCircle, Shield, Award } from "lucide-react"

export function SellerInfo() {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Seller Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Seller Profile */}
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/seller-avatar.jpg" alt="Seller" />
            <AvatarFallback>CK</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold">@classiccarking</h3>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>4.9 (127 reviews)</span>
              </div>
              <div>Member since 2019</div>
            </div>

            <p className="text-sm text-muted-foreground">
              Passionate collector of vintage European sports cars with 20+ years of experience in the classic car
              market.
            </p>
          </div>
        </div>

        {/* Seller Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="text-xl font-bold text-primary">47</div>
            <div className="text-xs text-muted-foreground">Cars Sold</div>
          </div>
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="text-xl font-bold text-primary">$12.4M</div>
            <div className="text-xs text-muted-foreground">Total Sales</div>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h4 className="font-medium mb-3">Achievements</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>Top Seller 2024</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Identity Verified</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star className="w-4 h-4 text-blue-400" />
              <span>Premium Member</span>
            </div>
          </div>
        </div>

        {/* Contact Actions */}
        <div className="space-y-2">
          <Button variant="outline" className="w-full bg-transparent">
            <MessageCircle className="w-4 h-4 mr-2" />
            Contact Seller
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            View Other Listings
          </Button>
        </div>

        {/* Trust & Safety */}
        <div className="p-4 bg-background/50 rounded-lg">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-400" />
            Trust & Safety
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Identity verified by BasedCars</li>
            <li>• All transactions secured by smart contracts</li>
            <li>• 7-day inspection period included</li>
            <li>• Escrow service available</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
