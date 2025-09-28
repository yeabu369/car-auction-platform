"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Maximize, Play, Cable as Cube } from "lucide-react"
import { Car3DViewer } from "./car-3d-viewer"

const images = [
  "/1967-ferrari-275-gtb-4-red-classic-car.jpg",
  "/ferrari-275-gtb-4-interior.jpg",
  "/ferrari-275-gtb-4-engine-bay.jpg",
  "/ferrari-275-gtb-4-rear-view.jpg",
  "/ferrari-275-gtb-4-side-profile.jpg",
]

export function CarImageGallery() {
  const [currentImage, setCurrentImage] = useState(0)
  const [show3DView, setShow3DView] = useState(false)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {show3DView ? (
        <Car3DViewer carName="1967 Ferrari 275 GTB/4" className="aspect-[4/3]" />
      ) : (
        <>
          {/* Main Image */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-card">
            <img
              src={images[currentImage] || "/placeholder.svg"}
              alt="Car image"
              className="w-full h-full object-cover"
            />

            {/* Navigation Arrows */}
            <Button
              variant="secondary"
              size="sm"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white border-white/20"
              onClick={prevImage}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white border-white/20"
              onClick={nextImage}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                Ultra Rare
              </Badge>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                Verified
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button size="sm" variant="secondary" className="bg-black/50 backdrop-blur-sm text-white border-white/20">
                <Maximize className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="secondary" className="bg-black/50 backdrop-blur-sm text-white border-white/20">
                <Play className="w-4 h-4" />
              </Button>
              <Button size="sm" className="auction-glow" onClick={() => setShow3DView(true)}>
                <Cube className="w-4 h-4 mr-2" />
                3D View
              </Button>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
              {currentImage + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  currentImage === index ? "border-primary" : "border-border"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </>
      )}

      <div className="flex gap-2 justify-center">
        <Button
          variant={!show3DView ? "default" : "outline"}
          size="sm"
          onClick={() => setShow3DView(false)}
          className="flex-1"
        >
          Photo Gallery
        </Button>
        <Button
          variant={show3DView ? "default" : "outline"}
          size="sm"
          onClick={() => setShow3DView(true)}
          className="flex-1"
        >
          <Cube className="w-4 h-4 mr-2" />
          3D View
        </Button>
      </div>
    </div>
  )
}
