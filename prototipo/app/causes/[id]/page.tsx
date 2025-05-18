"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, User, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { PaymentModal } from "@/components/payment-modal"

// Sample causes data - in a real app, this would come from a database
const causes = [
  {
    id: "1",
    title: "Clean Water Initiative",
    description: "Providing clean water to communities in need",
    fullStory:
      "Access to clean water is a fundamental human right, yet millions around the world still lack this basic necessity. Our Clean Water Initiative aims to bring sustainable water solutions to communities facing water scarcity and contamination issues. Through the installation of wells, water filtration systems, and educational programs on water conservation, we're working to ensure that everyone has access to safe, clean water. Your donation will directly fund these efforts and help us reach more communities in need.",
    category: "Environment",
    image: "/placeholder.svg?height=400&width=800",
    raised: 12500,
    goal: 25000,
    donationOptions: [10, 25, 50, 100, 250],
    organizer: "Environmental Action Network",
    startDate: "January 15, 2023",
    updates: [
      {
        date: "April 10, 2023",
        title: "First well completed!",
        content:
          "Thanks to your generous donations, we've completed our first well in the village of Mwanzo, providing clean water to over 200 people.",
      },
      {
        date: "February 28, 2023",
        title: "Project kickoff",
        content:
          "We've begun the planning phase for our first three water projects. Engineers are surveying the sites and working with local communities.",
      },
    ],
    supporters: 187,
  },
  {
    id: "2",
    title: "Education for All",
    description: "Supporting education in underprivileged areas",
    fullStory:
      "Education is the key to breaking the cycle of poverty, yet many children around the world lack access to quality education. Our Education for All initiative focuses on building schools, providing educational materials, and training teachers in underserved communities. We believe that every child deserves the opportunity to learn and grow, regardless of their economic background. Your support helps us create brighter futures for children who would otherwise be denied the chance to receive an education.",
    category: "Education",
    image: "/placeholder.svg?height=400&width=800",
    raised: 8700,
    goal: 15000,
    donationOptions: [15, 30, 60, 120, 300],
    organizer: "Global Education Fund",
    startDate: "March 1, 2023",
    updates: [
      {
        date: "May 15, 2023",
        title: "School supplies delivered",
        content:
          "We've delivered textbooks, notebooks, and other essential supplies to three schools, benefiting over 500 students.",
      },
      {
        date: "April 2, 2023",
        title: "Teacher training program",
        content:
          "Our first teacher training workshop was a success, with 25 teachers learning new teaching methodologies.",
      },
    ],
    supporters: 142,
  },
  // Add more causes as needed with the same structure
]

export default function CausePage({ params }: { params: { id: string } }) {
  // Find the cause with the matching ID
  const cause = causes.find((c) => c.id === params.id) || causes[0]

  // Calculate percentage funded
  const percentFunded = Math.min(Math.round((cause.raised / cause.goal) * 100), 100)

  // State for donation amount and payment modal
  const [donationAmount, setDonationAmount] = useState(cause.donationOptions[1].toString())
  const [customAmount, setCustomAmount] = useState("")
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [finalDonationAmount, setFinalDonationAmount] = useState("")

  const handleDonateClick = (e: React.FormEvent) => {
    e.preventDefault()
    // Use custom amount if provided, otherwise use selected donation amount
    const amount = customAmount || donationAmount
    setFinalDonationAmount(amount)
    setIsPaymentModalOpen(true)
  }

  const handlePaymentComplete = () => {
    // In a real app, you would update the cause's raised amount
    // and possibly show a success message
    setIsPaymentModalOpen(false)
  }

  return (
    <main className="container mx-auto pb-12">
      {/* Hero section with image */}
      <div className="relative h-64 w-full sm:h-80 md:h-96">
        <Image src={cause.image || "/placeholder.svg"} alt={cause.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h1 className="text-2xl font-bold sm:text-3xl">{cause.title}</h1>
            <p className="text-sm opacity-90">{cause.category}</p>
          </div>
        </div>
        <Link
          href="/causes"
          className="absolute left-4 top-4 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </div>

      {/* Funding progress */}
      <div className="border-b p-4">
        <div className="flex justify-between text-sm font-medium">
          <span>${cause.raised.toLocaleString()} raised</span>
          <span>${cause.goal.toLocaleString()} goal</span>
        </div>
        <Progress value={percentFunded} className="mt-2 h-2" />
        <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>{percentFunded}% funded</span>
          <span>{cause.supporters} supporters</span>
        </div>
      </div>

      {/* Cause details */}
      <div className="p-4">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
            <TabsTrigger value="donate">Donate</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>About this cause</CardTitle>
                <CardDescription>{cause.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{cause.fullStory}</p>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Organized by {cause.organizer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Started on {cause.startDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="updates" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Updates</CardTitle>
                <CardDescription>Follow our progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {cause.updates.map((update, index) => (
                    <div key={index} className="relative border-l pl-4">
                      <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-primary" />
                      <h3 className="font-medium">{update.title}</h3>
                      <p className="text-xs text-muted-foreground">{update.date}</p>
                      <p className="mt-2 text-sm">{update.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donate" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Make a Donation</CardTitle>
                <CardDescription>Support this important cause</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDonateClick} className="space-y-6">
                  <div className="space-y-2">
                    <Label>Choose an amount</Label>
                    <RadioGroup
                      defaultValue={cause.donationOptions[1].toString()}
                      className="grid grid-cols-3 gap-2"
                      onValueChange={setDonationAmount}
                    >
                      {cause.donationOptions.map((amount) => (
                        <div key={amount} className="flex items-center space-x-2">
                          <RadioGroupItem value={amount.toString()} id={`amount-${amount}`} className="sr-only" />
                          <Label
                            htmlFor={`amount-${amount}`}
                            className="flex w-full cursor-pointer items-center justify-center rounded-md border border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                          >
                            ${amount}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-amount">Or enter a custom amount</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">$</span>
                      <Input
                        id="custom-amount"
                        type="number"
                        placeholder="Other amount"
                        className="pl-8"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        min="1"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    <Heart className="mr-2 h-4 w-4" />
                    Donate Now
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        businessName={cause.title} // Using the cause title instead of business name
        onPaymentComplete={handlePaymentComplete}
        initialAmount={finalDonationAmount} // Pass the selected donation amount
      />
    </main>
  )
}
