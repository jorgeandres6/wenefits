"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { PaymentModal } from "@/components/payment-modal"
import { MiniKit, VerifyCommandInput, VerificationLevel, ISuccessResult, tokenToDecimals, Tokens, PayCommandInput } from '@worldcoin/minikit-js'

// Sample business data
const businesses = [
  {
    id: 1,
    name: "Veterinaria solidaria",
    description: "Dale confort a tus mascotas",
    category: "Mascotas",
    image: "/img/vetSol.png",
  },
  {
    id: 2,
    name: "Tech Solutions Inc",
    description: "Computadores y compuestos electronicos",
    category: "Tecnologia",
    image: "/img/apple_store.png",
  }
]

export default function BusinessesPage() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null)

  return (
    <main className="container mx-auto p-4">
      <div className="mb-6 flex items-center">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="ml-2 text-2xl font-bold">Business Marketplace</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {businesses.map((business) => (
          <Card key={business.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image src={business.image || "/placeholder.svg"} alt={business.name} fill className="object-cover" />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">{business.name}</CardTitle>
              <CardDescription>{business.category}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">{business.description}</p>
            </CardContent>
            <CardFooter className="p-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedBusiness(business)
                  setIsPaymentModalOpen(true)
                }}
              >
                Visitar comercio
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {selectedBusiness && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          businessName={selectedBusiness.name}
          onPaymentComplete={() => {
              //setIsPaid(false)
                //handleVerify();
              //handleVerify().finally(() => sendPayment());
            setIsPaymentModalOpen(false)
            // You could redirect to the business page after payment
            // router.push(`/businesses/${selectedBusiness.id}`)
          }}
        />
      )}
    </main>
  )
}
