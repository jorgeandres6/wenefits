"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PaymentModal } from "@/components/payment-modal"

// Sample causes data
const causes = [
  {
    id: 1,
    title: "Ayuda a los Scouts",
    description: "Dona para crear un mundo mejor",
    category: "Voluntariado",
    image: "/img/scouts.png",
    raised: 12500,
    goal: 25000,
  },
  {
    id: 2,
    title: "Refugio Patitas Callejeras",
    description: "Ayudanos a construir nuestra nueva casita",
    category: "Mascotas",
    image: "/img/shelter.png",
    raised: 8700,
    goal: 15000,
  }
]

export default function CausesPage() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedCause, setSelectedCause] = useState<any>(null)

  const handleDonateClick = (cause: any) => {
    setSelectedCause(cause)
    setIsPaymentModalOpen(true)
  }

  const handlePaymentComplete = () => {
    // In a real app, you would update the cause's raised amount
    // and possibly show a success message
    setIsPaymentModalOpen(false)
  }

  return (
    <main className="container mx-auto p-4">
      <div className="mb-6 flex items-center">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="ml-2 text-2xl font-bold">Wenefits Causas</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {causes.map((cause) => (
          <Card key={cause.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image src={cause.image || "/placeholder.svg"} alt={cause.title} fill className="object-cover" />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">{cause.title}</CardTitle>
              <CardDescription>{cause.category}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 p-4 pt-0">
              <p className="text-sm text-muted-foreground">{cause.description}</p>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>${cause.raised.toLocaleString()} Donado</span>
                  <span>${cause.goal.toLocaleString()} Meta</span>
                </div>
                <Progress value={(cause.raised / cause.goal) * 100} />
              </div>
            </CardContent>
            <CardFooter className="p-4">
              <Button className="w-full" onClick={() => handleDonateClick(cause)}>
                Dona ahora
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedCause && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          businessName={selectedCause.title} // Using the cause title instead of business name
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </main>
  )
}
