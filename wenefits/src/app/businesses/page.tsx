import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Sample business data
const businesses = [
  {
    id: 1,
    name: "Tech Solutions Inc",
    description: "Providing innovative tech solutions for small businesses",
    category: "Technology",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Green Grocers",
    description: "Fresh organic produce delivered to your doorstep",
    category: "Food & Grocery",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Craft Workshop",
    description: "Handmade crafts and DIY supplies",
    category: "Arts & Crafts",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Fitness First",
    description: "Personal training and fitness equipment",
    category: "Health & Fitness",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    name: "Home Essentials",
    description: "Everything you need for your home",
    category: "Home Goods",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    name: "Pet Paradise",
    description: "Premium pet supplies and accessories",
    category: "Pets",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function BusinessesPage() {
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
              <Button variant="outline" className="w-full">
                Visit Store
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
