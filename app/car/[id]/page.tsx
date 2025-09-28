import { CarDetailHeader } from "@/components/car-detail/car-detail-header"
import { CarImageGallery } from "@/components/car-detail/car-image-gallery"
import { CarInfo } from "@/components/car-detail/car-info"
import { AuctionPanel } from "@/components/car-detail/auction-panel"
import { CarSpecs } from "@/components/car-detail/car-specs"
import { BiddingHistory } from "@/components/car-detail/bidding-history"
import { SellerInfo } from "@/components/car-detail/seller-info"

export default function CarDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <CarDetailHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Info */}
          <div className="lg:col-span-2 space-y-8">
            <CarImageGallery />
            <CarInfo />
            <CarSpecs />
            <BiddingHistory />
          </div>

          {/* Right Column - Auction Panel */}
          <div className="space-y-6">
            <AuctionPanel />
            <SellerInfo />
          </div>
        </div>
      </main>
    </div>
  )
}
