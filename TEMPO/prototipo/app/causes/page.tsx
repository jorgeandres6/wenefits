import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Sample causes data
const causes = [
  {
    id: 1,
    title: "Clean Water Initiative",
    description: "Providing clean water to communities in need",
    category: "Environment",
    image: "/placeholder.svg?height=200&width=300",
    raised: 12500,
    goal: 25000,
  },
  {
    id: 2,
    title: "Education for All",
    description: "Supporting education in underprivileged areas",
    category: "Education",
    image: "/placeholder.svg?height=200&width=300",
    raised: 8700,
    goal: 15000,
  },
  {
    id: 3,
    title: "Animal Shelter Support",
    description: "Help us care for abandoned animals",
    category: "Animals",
    image: "/placeholder.svg?height=200&width=300",
    raised: 5300,
    goal: 10000,
  },
  {
    id: 4,
    title: "Medical Relief Fund",
    description: "Supporting families with medical expenses",
    category: "Healthcare",
    image: "/placeholder.svg?height=200&width=300",
    raised: 32000,
    goal: 50000,
  },
  {
    id: 5,
    title: "Disaster Relief",
    description: "Providing aid to areas affected by natural disasters",
    category: "Emergency",
    image: "/placeholder.svg?height=200&width=300",
    raised: 45000,
    goal: 100000,
  },
  {
    id: 6,
    title: "Community Garden Project",
    description: "Creating green spaces in urban neighborhoods",
    category: "Community",
    image: "/placeholder.svg?height=200&width=300",
    raised: 3500,
    goal: 7500,
  },
]

export default function CausesPage() {
  return (
    <main className="container mx-auto p-4">
      <div className="mb-6 flex items-center">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="ml-2 text-2xl font-bold">Causes Marketplace</h1>
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
                  <span>${cause.raised.toLocaleString()} raised</span>
                  <span>${cause.goal.toLocaleString()} goal</span>
                </div>
                <Progress value={(cause.raised / cause.goal) * 100} />
              </div>
            </CardContent>
            <CardFooter className="p-4">
              <Button className="w-full">Donate Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
