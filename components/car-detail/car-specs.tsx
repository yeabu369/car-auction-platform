import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Gauge, Fuel, Calendar } from "lucide-react"

export function CarSpecs() {
  const specs = [
    { label: "Year", value: "1967", icon: Calendar },
    { label: "Make", value: "Ferrari" },
    { label: "Model", value: "275 GTB/4" },
    { label: "VIN", value: "09437" },
    { label: "Engine", value: "V12 3.3L", icon: Settings },
    { label: "Power", value: "300 HP @ 8,000 RPM", icon: Gauge },
    { label: "Transmission", value: "5-Speed Manual" },
    { label: "Drivetrain", value: "Rear-Wheel Drive" },
    { label: "Fuel Type", value: "Gasoline", icon: Fuel },
    { label: "Mileage", value: "45,000 miles" },
    { label: "Exterior Color", value: "Rosso Corsa Red" },
    { label: "Interior Color", value: "Black Leather" },
    { label: "Top Speed", value: "165 mph" },
    { label: "0-60 mph", value: "6.7 seconds" },
    { label: "Weight", value: "2,600 lbs" },
    { label: "Production", value: "280 units" },
  ]

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          Technical Specifications
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specs.map((spec, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
              <div className="flex items-center gap-2">
                {spec.icon && <spec.icon className="w-4 h-4 text-muted-foreground" />}
                <span className="text-sm text-muted-foreground">{spec.label}</span>
              </div>
              <span className="font-medium">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Performance Highlights */}
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="font-semibold mb-4">Performance Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">300</div>
              <div className="text-sm text-muted-foreground">Horsepower</div>
            </div>
            <div className="p-4 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">165</div>
              <div className="text-sm text-muted-foreground">Top Speed (mph)</div>
            </div>
            <div className="p-4 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">6.7</div>
              <div className="text-sm text-muted-foreground">0-60 mph (sec)</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
