"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    organizationName: "",
    responsiblePerson: "",
    email: "",
    phone: "",
    type: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }))
    if (errors.type) {
      setErrors((prev) => ({ ...prev, type: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = "El nombre de la organizacion es obligatorio"
    }

    if (!formData.responsiblePerson.trim()) {
      newErrors.responsiblePerson = "El nombre del responsable es obligatorio"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Correo invalido"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El numero de contacto es obligatorio"
    }

    if (!formData.type) {
      newErrors.type = "Por favor, si es un comercio o una causa"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success state
      setIsSuccess(true)

      // Reset form
      setFormData({
        organizationName: "",
        responsiblePerson: "",
        email: "",
        phone: "",
        type: "",
      })

      // Redirect to home after a delay
      setTimeout(() => {
        router.push("/")
      }, 3000)
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Registro completado!</CardTitle>
            <CardDescription>
              Gracias por registrar su organización. Revisaremos su información y lo contactaremos pronto.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">Redireccionando a la pagina de inicio</p>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Atras
          </Button>
        </Link>
        <h1 className="ml-2 text-2xl font-bold">Registra tu organización</h1>
      </div>

      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Registro de organización</CardTitle>
            <CardDescription>Por favor, complete el siguiente formulario.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="organizationName">Nombre de la organización/causa</Label>
                <Input
                  id="organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  placeholder="Enter your organization name"
                  className={errors.organizationName ? "border-red-500" : ""}
                />
                {errors.organizationName && <p className="text-xs text-red-500">{errors.organizationName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsiblePerson">Persona responsable</Label>
                <Input
                  id="responsiblePerson"
                  name="responsiblePerson"
                  value={formData.responsiblePerson}
                  onChange={handleChange}
                  placeholder="Enter the name of the responsible person"
                  className={errors.responsiblePerson ? "border-red-500" : ""}
                />
                {errors.responsiblePerson && <p className="text-xs text-red-500">{errors.responsiblePerson}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Número de teléfono</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Es una causa o un comercio?</Label>
                <Select onValueChange={handleSelectChange} value={formData.type}>
                  <SelectTrigger id="type" className={errors.type ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business">Comercio</SelectItem>
                    <SelectItem value="cause">Causa</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-xs text-red-500">{errors.type}</p>}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/")}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
