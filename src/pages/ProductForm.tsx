"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { createProduct } from "@/utils/api.js"

const questions = [
  { id: "brandName", label: "What's your brand/product name?", placeholder: "e.g. LaunchBot", type: "text", required: true },
  { id: "problem it solves", label: "What problem does it solve?", placeholder: "Crafting winning product launch campaigns without hours of research, writing and thousands of budget", type: "textarea", required: true },
  { id: "features", label: "Top 3 features (one per line)", placeholder: "e.g.\nAutomated social posts\nLaunch tracking\nCommunity engagement", type: "textarea", required: true },
  { id: "audience", label: "Who is your target audience?", placeholder: "e.g. SaaS founders", type: "text", required: true },
]

export default function ProductForm() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentQ = questions[step]
  const totalSteps = questions.length

  const handleChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }))
    setError("")
  }

  const handleNext = async () => {
    if (currentQ.required && !answers[currentQ.id]?.trim()) {
      setError("This field is required.")
      return
    }
    
    if (step < totalSteps - 1) {
      setStep((prev) => prev + 1)
    } else {
      // Submit the form
      await handleSubmit()
    }
  }

  const handleSubmit = async () => {
    if (isSubmitting) return
    
    setIsSubmitting(true)
    setError("")
    
    try {
      // Prepare the product info object
      const productInfo = {
        brandName: answers["brandName"],
        problemItSolves: answers["problem it solves"],
        features: answers["features"],
        audience: answers["audience"]
      }
      
      // Call the createProduct API
      await createProduct({ productInfo })
      
      console.log("Product created successfully:", productInfo)
      navigate("/chat")
    } catch (error) {
      console.error("Error creating product:", error)
      setError("Failed to create product. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Enter key handler
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Enter" && currentQ.type !== "textarea") {
        e.preventDefault()
        handleNext()
      }
    }
    window.addEventListener("keydown", listener)
    return () => window.removeEventListener("keydown", listener)
  }, [step, answers])

  return (
    <div className="flex flex-col h-screen">
      {/* Stepped progress bar */}
      <div className="flex justify-center gap-2 p-4">
        {questions.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 flex-1 rounded-full transition-colors",
              i <= step ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Center card */}
      <div className="flex-1 flex justify-center items-center px-4">
        <div className="w-full max-w-lg space-y-4">
          <h2 className="text-lg font-medium">{currentQ.label}</h2>

          {currentQ.type === "text" && (
            <Input
              value={answers[currentQ.id] || ""}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={currentQ.placeholder}
            />
          )}

          {currentQ.type === "textarea" && (
            <Textarea
              value={answers[currentQ.id] || ""}
              onChange={(e) => handleChange(e.target.value)}
              rows={3}
              placeholder={currentQ.placeholder}
            />
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </div>

      {/* Next button fixed at bottom on mobile */}
      <div className="p-4 border-t bg-background sticky bottom-0">
        <Button 
          onClick={handleNext} 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting 
            ? "Creating..." 
            : step < totalSteps - 1 
              ? "Next" 
              : "Create Product"
          }
        </Button>
      </div>
    </div>
  )
}
