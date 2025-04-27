import Link from "next/link"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="border-b bg-background ">
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-red-500" />
          <span className="font-bold text-2xl">AI Safety Monitor</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 mr-56">
          <Link href="/" className="text-xl font-medium hover:text-primary">
            Dashboard
          </Link>
          <Link href="#report" className="text-xl font-medium hover:text-primary">
            New incident
          </Link>
          <Link href="#incident-list" className="text-xl font-medium hover:text-primary">
            Incidents
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          
        </div>
      </div>
    </header>
  )
}
