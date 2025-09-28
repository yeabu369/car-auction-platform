"use client"

import { Suspense, useRef, useState } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls, Environment, Html, useProgress } from "@react-three/drei"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Maximize2, Eye, EyeOff, Palette } from "lucide-react"
import * as THREE from "three"

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4 text-white">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <div className="text-sm">Loading 3D Model... {Math.round(progress)}%</div>
      </div>
    </Html>
  )
}

function CarModel({ modelPath, color = "#ff0000" }: { modelPath: string; color?: string }) {
  const meshRef = useRef<THREE.Group>(null)
  const gltf = useLoader(GLTFLoader, modelPath)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  // Apply color to car materials
  if (gltf.scene) {
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => {
            if (mat.name?.includes("paint") || mat.name?.includes("body")) {
              mat.color = new THREE.Color(color)
            }
          })
        } else {
          if (child.material.name?.includes("paint") || child.material.name?.includes("body")) {
            child.material.color = new THREE.Color(color)
          }
        }
      }
    })
  }

  return (
    <group ref={meshRef}>
      <primitive object={gltf.scene} scale={[2, 2, 2]} position={[0, -1, 0]} />
    </group>
  )
}

interface Car3DViewerProps {
  carModel?: string
  carName: string
  className?: string
}

export function Car3DViewer({ carModel = "/assets/3d/duck.glb", carName, className }: Car3DViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [selectedColor, setSelectedColor] = useState("#ff0000")
  const [autoRotate, setAutoRotate] = useState(true)

  const colors = [
    { name: "Ferrari Red", value: "#ff0000" },
    { name: "Midnight Black", value: "#1a1a1a" },
    { name: "Pearl White", value: "#f8f8ff" },
    { name: "Racing Blue", value: "#0066cc" },
    { name: "Silver Metallic", value: "#c0c0c0" },
    { name: "British Green", value: "#355e3b" },
  ]

  const resetView = () => {
    // This would reset the camera position in a real implementation
    setAutoRotate(true)
  }

  return (
    <div className={`relative ${className}`}>
      <Card className="bg-black/90 backdrop-blur-sm border-border/50 overflow-hidden">
        <div className={`relative ${isFullscreen ? "fixed inset-0 z-50" : "h-96"}`}>
          {/* 3D Canvas */}
          <Canvas
            camera={{ position: [5, 2, 5], fov: 50 }}
            className="w-full h-full"
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={<Loader />}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />

              <CarModel modelPath={carModel} color={selectedColor} />

              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                autoRotate={autoRotate}
                autoRotateSpeed={1}
                minDistance={3}
                maxDistance={15}
              />

              <Environment preset="studio" />
            </Suspense>
          </Canvas>

          {/* Controls Overlay */}
          {showControls && (
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <Badge variant="secondary" className="bg-black/80 text-white">
                  {carName} - 3D View
                </Badge>

                {/* Color Picker */}
                <div className="flex gap-1 bg-black/80 p-2 rounded-lg">
                  <Palette className="w-4 h-4 text-white mr-1" />
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-6 h-6 rounded-full border-2 ${
                        selectedColor === color.value ? "border-white" : "border-gray-600"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowControls(!showControls)}
                  className="bg-black/80 hover:bg-black/90"
                >
                  {showControls ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button variant="secondary" size="sm" onClick={resetView} className="bg-black/80 hover:bg-black/90">
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="bg-black/80 hover:bg-black/90"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-black/80 text-white text-xs p-3 rounded-lg">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-semibold">Rotate</div>
                  <div className="text-gray-400">Click & Drag</div>
                </div>
                <div>
                  <div className="font-semibold">Zoom</div>
                  <div className="text-gray-400">Mouse Wheel</div>
                </div>
                <div>
                  <div className="font-semibold">Pan</div>
                  <div className="text-gray-400">Right Click & Drag</div>
                </div>
              </div>
            </div>
          </div>

          {/* Auto-rotate toggle */}
          <div className="absolute bottom-4 right-4">
            <Button
              variant={autoRotate ? "default" : "secondary"}
              size="sm"
              onClick={() => setAutoRotate(!autoRotate)}
              className="bg-black/80 hover:bg-black/90"
            >
              Auto Rotate
            </Button>
          </div>
        </div>
      </Card>

      {/* 3D View Features */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        <Badge variant="outline" className="justify-center py-2">
          360° View
        </Badge>
        <Badge variant="outline" className="justify-center py-2">
          Color Options
        </Badge>
        <Badge variant="outline" className="justify-center py-2">
          Zoom & Pan
        </Badge>
        <Badge variant="outline" className="justify-center py-2">
          Fullscreen
        </Badge>
      </div>
    </div>
  )
}
