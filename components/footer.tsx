import { Shield } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-red-500" />
              <span className="font-bold text-3xl">AI Safety Monitor</span>
            </div>
            <p className="text-base text-muted-foreground">
              Tracking and improving AI safety through transparency and collaboration.
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}
