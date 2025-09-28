import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Clock, Users, Zap } from "lucide-react"

export function MarketplaceStats() {
  const stats = [
    {
      label: "Total Volume",
      value: "$2.4B",
      change: "+12.5%",
      icon: TrendingUp,
      color: "text-green-400",
    },
    {
      label: "Active Auctions",
      value: "247",
      change: "+8.2%",
      icon: Clock,
      color: "text-blue-400",
    },
    {
      label: "Active Bidders",
      value: "12.3K",
      change: "+15.7%",
      icon: Users,
      color: "text-purple-400",
    },
    {
      label: "Avg. Sale Time",
      value: "3.2 days",
      change: "-2.1%",
      icon: Zap,
      color: "text-yellow-400",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className={`text-sm ${stat.color}`}>{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg bg-background/50`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
