import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { WalletProvider } from "@/components/wallet/wallet-provider"
import { AuthProvider } from "@/components/auth/auth-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "BasedCars - Premium Car Marketplace",
  description: "High-end car auction platform with crypto integration and 3D visualization",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <WalletProvider>
          <AuthProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </AuthProvider>
        </WalletProvider>
        <Analytics />
      </body>
    </html>
  )
}
