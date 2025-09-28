import { MarketplaceHeader } from "@/components/marketplace/marketplace-header"
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters"
import { MarketplaceGrid } from "@/components/marketplace/marketplace-grid"
import { MarketplaceStats } from "@/components/marketplace/marketplace-stats"

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketplaceHeader />
      <main className="container mx-auto px-4 py-8">
        <MarketplaceStats />
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80">
            <MarketplaceFilters />
          </aside>
          <div className="flex-1">
            <MarketplaceGrid />
          </div>
        </div>
      </main>
    </div>
  )
}
