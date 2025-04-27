import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Dashboard } from "@/components/dashboard"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Dashboard />
      </main>
      <Footer />
    </div>
  )
}
