import { useState, useEffect, useRef } from "react"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"
import { Check } from "lucide-react"
import type { Product, Campaign } from "@/utils/api"

interface OnboardingProps {
  products: Product[]
  campaigns: Campaign[]
}

const Onboarding = ({ products, campaigns }: OnboardingProps) => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [timelineHeight, setTimelineHeight] = useState(0)
  const [stepPositions, setStepPositions] = useState<number[]>([])
  const stepsContainerRef = useRef<HTMLDivElement>(null)

  // Determine current step based on data
  useEffect(() => {
    console.log("Onboarding - products.length:", products.length, "campaigns.length:", campaigns.length)
    console.log("Onboarding - products:", products)
    console.log("Onboarding - campaigns:", campaigns)
    
    // Only set step if we have actual data (not initial empty state)
    if (products.length === 0 && campaigns.length === 0) {
      console.log("Setting currentStep to 1 - no products or campaigns")
      setCurrentStep(1)
    } else if (products.length > 0 && campaigns.length === 0) {
      console.log("Setting currentStep to 2 - has products but no campaigns")
      setCurrentStep(2)
    } else if (products.length > 0 && campaigns.length > 0) {
      console.log("Setting currentStep to 3 - has both products and campaigns")
      setCurrentStep(3)
    }
  }, [products.length, campaigns.length])

  // Calculate timeline height and step positions based on steps container
  useEffect(() => {
    const calculatePositions = () => {
      if (stepsContainerRef.current) {
        const containerHeight = stepsContainerRef.current.offsetHeight
        setTimelineHeight(containerHeight)
        
        // Calculate step positions based on actual card heights
        const stepElements = stepsContainerRef.current.children
        const positions: number[] = []
        let currentTop = 0
        
        for (let i = 0; i < stepElements.length; i++) {
          const element = stepElements[i] as HTMLElement
          const elementHeight = element.offsetHeight
          positions.push(currentTop + elementHeight / 2) // Center of each card
          currentTop += elementHeight + 24 // 24px is the space-y-6 gap
        }
        
        setStepPositions(positions)
      }
    }

    // Calculate immediately
    calculatePositions()
    
    // Also calculate after a small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(calculatePositions, 100)
    
    // Set up ResizeObserver to handle dynamic height changes
    let resizeObserver: ResizeObserver | null = null
    if (stepsContainerRef.current) {
      resizeObserver = new ResizeObserver(calculatePositions)
      resizeObserver.observe(stepsContainerRef.current)
    }
    
    return () => {
      clearTimeout(timeoutId)
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [currentStep, products, campaigns])

  console.log("Onboarding - currentStep:", currentStep)
  console.log("Onboarding - products.length:", products.length, "campaigns.length:", campaigns.length)
  console.log("Onboarding - should hide:", currentStep === 3 || (campaigns.length > 0 && products.length === 0))

  // Don't show onboarding if all steps are completed or if campaigns exist but no products
  if (currentStep === 3 || (campaigns.length > 0 && products.length === 0)) {
    console.log("Onboarding - hiding component")
    return null
  }

  const steps = [
    {
      id: 1,
      title: "Add your product",
      description: "Drop in your product details (name, problem it solves, features). The more context you give, the smarter your launch campaigns will be.",
      buttonLabel: "Add Product",
      route: "/product-form",
      timeEstimate: "<5 mins"
    },
    {
      id: 2,
      title: "Plan your Campaign",
      description: "Pick your campaign type, add must-use keywords, and let redditOS craft scroll-stopping posts for you",
      buttonLabel: "Plan Campaign",
      route: `/campaigns/create/${products.length > 0 ? products[0]._id : ''}`,
      timeEstimate: "<2 mins"
    },
    {
      id: 3,
      title: "Launch and start making mrr",
      description: "Copy, paste, and post on Reddit. Watch your launch turn into paying users.",
      timeEstimate: null
    }
  ]

  const handleStepClick = (step: typeof steps[0]) => {
    if (step.route) {
      navigate(step.route)
    }
  }

  return (

    <div>
        <h1 className="text-[22px] text-center font-semibold mb-6">Launch your campaign in 3 steps</h1>
        <div className="flex justify-center items-start space-x-6 mb-20">
      {/* Vertical Timeline */}
      <div className="relative">
        <div 
          className="w-[2px] relative" 
          style={{ height: `${timelineHeight}px` }}
        >
          {/* Background bar */}
          <div className="absolute inset-0 bg-muted-foreground/20"></div>
          
          {/* Progress gradient - higher opacity for completed steps, lower for future */}
          <div 
            className="absolute inset-0 transition-all duration-500"
            style={{ 
              background: `linear-gradient(to bottom, 
                hsl(var(--primary) / 0.8) 0%, 
                hsl(var(--primary) / 0.6) ${currentStep > 1 ? 33 : 0}%, 
                hsl(var(--primary) / 0.4) ${currentStep > 2 ? 66 : 0}%, 
                hsl(var(--primary) / 0.2) 100%)`,
              height: `${timelineHeight}px`
            }}
          ></div>
        </div>
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`absolute left-1/2 transform -translate-x-1/2 rounded-full flex justify-center items-center transition-all duration-300 ${
              step.id === currentStep
                ? "h-6 w-6 border-2 border-primary" // Current step: outlined with pulse
                : step.id < currentStep
                ? "h-5 w-5 bg-primary text-primary-foreground" // Completed steps: filled with checkmark
                : "h-4 w-4 border-2 border-muted-foreground/30" // Future steps: outlined, muted
            }`}
            style={{ top: `${stepPositions[index] || index * 180}px` }}
          >
            {step.id < currentStep ? (
              <Check className="h-3 w-3" />
            ) : step.id === currentStep ? (
              <div className="relative">
                <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* Step Cards */}
      <div ref={stepsContainerRef} className="space-y-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-card border border-border p-5 rounded-lg space-y-4 max-w-md"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  {step.title}
                </h2>
                {step.timeEstimate && (
                  <span className="text-sm text-muted-foreground">
                    {step.timeEstimate}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
            
            {/* Show button only for current step */}
            {step.id === currentStep && step.buttonLabel && (
              <Button 
                className="w-full font-medium" 
                onClick={() => handleStepClick(step)}
              >
                {step.buttonLabel}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
        </div>
    
  )
}

export default Onboarding