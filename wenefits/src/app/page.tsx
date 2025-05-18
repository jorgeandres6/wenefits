import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="w-full max-w-md space-y-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Bienvenido a Wenefits</h1>
          <p className="mt-3 text-muted-foreground">Connect with businesses, support causes, or register your own</p>
        </div>

        <div className="mt-10 space-y-4">
          <Link href="/businesses" className="block w-full">
            <Button variant="default" size="lg" className="w-full h-16 text-lg">
              Comercios
            </Button>
          </Link>

          <Link href="/causes" className="block w-full">
            <Button variant="default" size="lg" className="w-full h-16 text-lg">
              Causas
            </Button>
          </Link>

          <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer" className="block w-full">
            <Button variant="outline" size="lg" className="w-full h-16 text-lg group">
              Registra tu negocio o causa
              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
        </div>
      </div>
    </main>
  )
}
