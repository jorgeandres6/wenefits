"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MapPin, Phone, Mail, Globe, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentModal } from "@/components/payment-modal"

// Sample business data - in a real app, this would come from a database
const businesses = [
  {
    id: "1",
    name: "Tech Solutions Inc",
    description: "Providing innovative tech solutions for small businesses",
    longDescription:
      "Tech Solutions Inc. is a leading provider of technology solutions for small and medium-sized businesses. We offer a wide range of services including web development, app development, IT consulting, and digital marketing. Our team of experts is dedicated to helping your business grow through technology.",
    category: "Technology",
    image: "/placeholder.svg?height=400&width=800",
    location: "123 Tech Street, San Francisco, CA",
    phone: "(555) 123-4567",
    email: "contact@techsolutions.example",
    website: "www.techsolutions.example",
    hours: "Mon-Fri: 9am-5pm",
    products: [
      { name: "Web Development", price: "$1000+", image: "/placeholder.svg?height=100&width=100" },
      { name: "Mobile App Development", price: "$2500+", image: "/placeholder.svg?height=100&width=100" },
      { name: "IT Consulting", price: "$150/hr", image: "/placeholder.svg?height=100&width=100" },
      { name: "Digital Marketing", price: "$500/mo", image: "/placeholder.svg?height=100&width=100" },
    ],
  },
  {
    id: "2",
    name: "Green Grocers",
    description: "Fresh organic produce delivered to your doorstep",
    longDescription:
      "Green Grocers is committed to providing the freshest organic produce directly to your home. We source our products from local farms and ensure that everything is sustainably grown. Our delivery service makes healthy eating convenient for busy families.",
    category: "Food & Grocery",
    image: "/placeholder.svg?height=400&width=800",
    location: "456 Organic Lane, Portland, OR",
    phone: "(555) 987-6543",
    email: "hello@greengrocers.example",
    website: "www.greengrocers.example",
    hours: "Mon-Sat: 8am-8pm, Sun: 10am-6pm",
    products: [
      { name: "Weekly Produce Box", price: "$35", image: "/placeholder.svg?height=100&width=100" },
      { name: "Organic Fruits", price: "Varies", image: "/placeholder.svg?height=100&width=100" },
      { name: "Farm Fresh Eggs", price: "$6/dozen", image: "/placeholder.svg?height=100&width=100" },
      { name: "Artisanal Bread", price: "$5", image: "/placeholder.svg?height=100&width=100" },
    ],
  },
  // Add more businesses as needed with the same structure
]

export default function BusinessPage({ params }: { params: { id: string } }) {
  // Find the business with the matching ID
  const business = businesses.find((b) => b.id === params.id) || businesses[0]
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  return (
    <main className="container mx-auto pb-12">
      {/* Hero section with image */}
      <div className="relative h-64 w-full sm:h-80 md:h-96">
        <Image src={business.image || "/placeholder.svg"} alt={business.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h1 className="text-2xl font-bold sm:text-3xl">{business.name}</h1>
            <p className="text-sm opacity-90">{business.category}</p>
          </div>
        </div>
        <Link
          href="/businesses"
          className="absolute left-4 top-4 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </div>

      {/* Business details */}
      <div className="p-4">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>About {business.name}</CardTitle>
                <CardDescription>{business.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{business.longDescription}</p>

                <div className="mt-6 flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{business.hours}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Products & Services</CardTitle>
                <CardDescription>What {business.name} offers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {business.products.map((product, index) => (
                    <div key={index} className="flex items-center gap-3 rounded-lg border p-3">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Get in touch with {business.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{business.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{business.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{business.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>{business.website}</span>
                </div>

                <Button className="mt-4 w-full" onClick={() => setIsPaymentModalOpen(true)}>
                  Contact Now
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        businessName={business.name}
        onPaymentComplete={() => {
          setIsPaymentModalOpen(false)
          // You could add additional logic here, like showing a success message
        }}
      />
    </main>
  )
}
