"use client"

import type React from "react"

import { useState } from "react"
import type { Incident } from "@/components/dashboard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ReportFormProps {
  onSubmit: (incident: Omit<Incident, "id" | "reported_at">) => void
}

export function ReportForm({ onSubmit }: ReportFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [severity, setSeverity] = useState<"Low" | "Medium" | "High">("Medium")
  const [errors, setErrors] = useState<{ title?: string; description?: string }>()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors: { title?: string; description?: string } = {}

    if (!title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!description.trim()) {
      newErrors.description = "Description is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Submit form
    onSubmit({
      title,
      description,
      severity,
    })

    // Reset form
    setTitle("")
    setDescription("")
    setSeverity("Medium")
    setErrors({})
    setIsSubmitted(true)

    // Clear success message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <Card id="report">
      <CardHeader>
        <CardTitle>Report New AI Safety Incident</CardTitle>
        <CardDescription>Submit details about a new AI safety incident you've observed or experienced</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {isSubmitted && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Incident reported successfully! It has been added to the dashboard.</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Incident Title</Label>
            <Input
              id="title"
              placeholder="Brief title describing the incident"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors?.title ? "border-red-500" : ""}
            />
            {errors?.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Detailed description of what happened, potential impacts, and any mitigations"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={errors?.description ? "border-red-500" : ""}
            />
            {errors?.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          <div className="space-y-2">
            <Label>Severity Level</Label>
            <RadioGroup
              value={severity}
              onValueChange={(value) => setSeverity(value as "Low" | "Medium" | "High")}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Low" id="severity-low" />
                <Label htmlFor="severity-low" className="font-normal">
                  Low - Minor issues with limited impact
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Medium" id="severity-medium" />
                <Label htmlFor="severity-medium" className="font-normal">
                  Medium - Significant issues affecting system reliability
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="High" id="severity-high" />
                <Label htmlFor="severity-high" className="font-normal">
                  High - Critical issues with potential for harm
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full sm:w-auto">
            Submit Incident
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
