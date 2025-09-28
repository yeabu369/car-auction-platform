import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedAuctions } from "@/components/featured-auctions"
import { LiveAuctions } from "@/components/live-auctions"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedAuctions />
        <LiveAuctions />
      </main>
      <Footer />
    </div>
  )
}
