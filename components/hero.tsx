import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-background to-muted py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center p-2 bg-red-100 rounded-full mb-4">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-sm font-medium text-red-700">AI Safety First</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">AI Safety Incident Dashboard</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Track, report, and analyze AI safety incidents to improve transparency and accountability in AI systems. Help
          us build safer AI for everyone.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* <Button size="lg">Report New Incident</Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button> */}
        </div>
      </div>
    </section>
  )
}
