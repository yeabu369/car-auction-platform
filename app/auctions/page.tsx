import { AuctionsHeader } from "@/components/auctions/auctions-header"
import { AuctionFilters } from "@/components/auctions/auction-filters"
import { LiveAuctionsList } from "@/components/auctions/live-auctions-list"
import { UpcomingAuctions } from "@/components/auctions/upcoming-auctions"
import { EndedAuctions } from "@/components/auctions/ended-auctions"

export default function AuctionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AuctionsHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80">
            <AuctionFilters />
          </aside>
          <div className="flex-1 space-y-8">
            <LiveAuctionsList />
            <UpcomingAuctions />
            <EndedAuctions />
          </div>
        </div>
      </main>
    </div>
  )
}
