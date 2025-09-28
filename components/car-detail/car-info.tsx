import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Info, Shield, Award, FileText } from "lucide-react"

export function CarInfo() {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          Vehicle Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Description */}
        <div>
          <h3 className="font-semibold mb-3">Description</h3>
          <p className="text-muted-foreground leading-relaxed">
            This stunning 1967 Ferrari 275 GTB/4 represents the pinnacle of 1960s Italian automotive engineering. With
            its matching numbers V12 engine and 5-speed manual transmission, this example has been meticulously
            maintained and recently underwent a comprehensive restoration by Ferrari Classiche. The car retains its
            original Rosso Corsa paint and black leather interior, making it a true collector's dream.
          </p>
        </div>

        {/* Key Features */}
        <div>
          <h3 className="font-semibold mb-3">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm">Matching Numbers Engine</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">Ferrari Classiche Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Complete Documentation</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm">Recent Restoration</span>
            </div>
          </div>
        </div>

        {/* Condition & Authenticity */}
        <div>
          <h3 className="font-semibold mb-3">Condition & Authenticity</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
              Excellent Condition
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
              Original Paint
            </Badge>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
              Matching Numbers
            </Badge>
            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
              Ferrari Certified
            </Badge>
          </div>
        </div>

        {/* Provenance */}
        <div>
          <h3 className="font-semibold mb-3">Provenance</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>1967 - 1985</span>
              <span>Original Owner (Italy)</span>
            </div>
            <div className="flex justify-between">
              <span>1985 - 2010</span>
              <span>Private Collection (Switzerland)</span>
            </div>
            <div className="flex justify-between">
              <span>2010 - 2020</span>
              <span>Museum Display (Monaco)</span>
            </div>
            <div className="flex justify-between">
              <span>2020 - Present</span>
              <span>Current Owner (USA)</span>
            </div>
          </div>
        </div>

        {/* Documentation */}
        <div>
          <h3 className="font-semibold mb-3">Available Documentation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span>Original Build Sheet</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span>Service Records</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span>Ferrari Classiche Certificate</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span>Restoration Photos</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span>Original Toolkit</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span>Owner's Manual</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
