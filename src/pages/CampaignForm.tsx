import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
// import { FaRedditAlien, FaProductHunt, FaTwitter, FaLinkedin, FaEnvelope, FaListUl } from "react-icons/fa"
// import { TbUsersGroup } from "react-icons/tb"
import { getProducts, generateCampaign, type Product } from "@/utils/api"
import { useNavigate } from "react-router-dom"

// Channels
// const channelsList = [
//   { id: "producthunt", name: "Product Hunt", icon: <FaProductHunt size={28} /> },
//   { id: "x", name: "X (Twitter)", icon: <FaTwitter size={28} /> },
//   { id: "reddit", name: "Reddit", icon: <FaRedditAlien size={28} /> },
//   { id: "linkedin", name: "LinkedIn", icon: <FaLinkedin size={28} /> },
//   { id: "betalist", name: "Betalist", icon: <FaEnvelope size={28} /> },
//   { id: "indiehackers", name: "Indie Hackers", icon: <TbUsersGroup size={28} /> },
//   { id: "email", name: "Email (existing list)", icon: <FaEnvelope size={28} /> },
//   { id: "other", name: "Other (manual entry)", icon: <FaListUl size={28} /> },
// ]

const launchTypes = [
  { label: "Big Bang (one-day, all-channels push)", value: "big-bang" },
  { label: "Soft Launch (gradual rollout, test feedback)", value: "soft-launch" },
  { label: "Teaser → Launch → Follow-up (3-stage)", value: "teaser-launch-followup" },
  { label: "Continuous Promotion (weekly drip posts for a month)", value: "continuous-promotion" },
  { label: "Rolling launch", value: "rolling-launch" }
]

// const tones = [
//     {
//       "id": "professional",
//       "name": "Professional",
//       "example": "Ex. We’re excited to announce the launch of our new product. Available starting today on our website."
//     },
//     {
//       "id": "casual",
//       "name": "Casual",
//       "example": "Ex. Guess what? Our new product is live! Check it out now."
//     },
//     {
//       "id": "witty",
//       "name": "Witty",
//       "example": "Ex. Fresh out of the lab and ready to impress – meet your new favorite gadget."
//     },
//     {
//       "id": "hype",
//       "name": "Hype",
//       "example": "Ex. 🚀 It’s here! The product everyone’s been waiting for just dropped. Don’t miss out!"
//     }
//   ]

export default function CampaignForm() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0) // 0: Product Selection, 1: Launch Type, 2: Keywords
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [launchType, setLaunchType] = useState("")
  const [keywords, setKeywords] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts()
        // Filter to only show completed products
        const completedProducts = response.products.filter(product => product.status === 'completed')
        setProducts(completedProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
        setError("Failed to load products. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleNext = async () => {
    if (step === 0 && !selectedProduct) {
      setError("Please select a product.")
      return
    }
    if (step === 1 && !launchType) {
      setError("Please select a launch type.")
      return
    }
    if (step === 2 && !keywords.trim()) {
      setError("Please enter keywords.")
      return
    }
    if (step < 2) {
      setStep(step + 1)
    } else {
      // Generate campaign
      setIsSubmitting(true)
      setError("")
      
      try {
        // Split keywords by comma and trim whitespace
        const keywordsArray = keywords.split(',').map(k => k.trim()).filter(k => k.length > 0)
        
        const campaign = await generateCampaign(
          ["reddit"], // selectedChannels - empty array since we removed channel selection
          selectedProduct!._id,
          launchType,
          keywordsArray.join(', ')
        )
        
        // Redirect to campaigns page
        navigate(`/campaigns/${campaign._id}`)
      } catch (error) {
        console.error("Error generating campaign:", error)
        setError("Failed to generate campaign. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    }
    setError("")
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
      setError("")
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Progress bar */}
      <div className="flex justify-center gap-2 p-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "h-2 flex-1 rounded-full transition-colors",
              i <= step ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Step Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Step 0 — Product Selection */}
        {step === 0 && (
          <>
            <h1 className="text-2xl font-semibold mb-6">Select Product</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className={cn(
                    "cursor-pointer border transition-colors rounded-md p-4 hover:border-primary/50",
                    selectedProduct?._id === product._id
                      ? "border-primary bg-primary/5"
                      : "border-muted"
                  )}
                  onClick={() => {
                    setSelectedProduct(product)
                    setError("")
                  }}
                >
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">{product.rawData.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.enhancedData.problemItSolves[0] || product.rawData.description || "No description available"}
                    </p>
                    <div className="flex items-center gap-2">
                    
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
          </>
        )}

        {/* Step 1 — Launch Type */}
        {step === 1 && (
          <>
            <h1 className="text-2xl font-semibold mb-6">Select launch type</h1>
            <div className="space-y-3">
              {launchTypes.map((type) => (
                <div
                  key={type.value}
                  className={cn(
                    "p-3 border rounded-md cursor-pointer transition-colors",
                    launchType === type.value
                      ? "border-primary bg-primary/5"
                      : "border-muted"
                  )}
                  onClick={() => {
                    setLaunchType(type.value)
                    setError("")
                  }}
                >
                  {type.label}
                </div>
              ))}
            </div>
            {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
          </>
        )}

        {/* Step 2 — Keywords */}
        {step === 2 && (
          <>
            <h1 className="text-2xl font-semibold mb-4">Keywords</h1>
            <p className="text-sm text-muted-foreground mb-4">
              Add words or short phrases to guide AI-generated posts (comma separated).
            </p>
            <Input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g. SaaS, product launch, AI marketing"
            />
            {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
          </>
        )}
      </div>

      {/* Sticky button */}
      <div className="p-4 border-t bg-background sticky bottom-0">
        <div className="flex gap-3">
          {step > 0 && (
            <Button variant="outline" onClick={handleBack} className="flex-1" disabled={isSubmitting}>
              Back
            </Button>
          )}
          <Button onClick={handleNext} className="flex-1" disabled={isSubmitting}>
            {isSubmitting ? "Generating..." : (step < 2 ? "Next" : "Generate Campaign")}
          </Button>
        </div>
      </div>
    </div>
  )
}
