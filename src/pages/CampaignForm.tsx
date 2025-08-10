import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { FaRedditAlien, FaProductHunt, FaTwitter, FaLinkedin, FaEnvelope, FaListUl } from "react-icons/fa"
import { TbUsersGroup } from "react-icons/tb"

// Channels
const channelsList = [
  { id: "producthunt", name: "Product Hunt", icon: <FaProductHunt size={28} /> },
  { id: "x", name: "X (Twitter)", icon: <FaTwitter size={28} /> },
  { id: "reddit", name: "Reddit", icon: <FaRedditAlien size={28} /> },
  { id: "linkedin", name: "LinkedIn", icon: <FaLinkedin size={28} /> },
  { id: "betalist", name: "Betalist", icon: <FaEnvelope size={28} /> },
  { id: "indiehackers", name: "Indie Hackers", icon: <TbUsersGroup size={28} /> },
  { id: "email", name: "Email (existing list)", icon: <FaEnvelope size={28} /> },
  { id: "other", name: "Other (manual entry)", icon: <FaListUl size={28} /> },
]

const launchTypes = [
  "Big Bang (one-day, all-channels push)",
  "Soft Launch (gradual rollout, test feedback)",
  "Teaser → Launch → Follow-up (3-stage)",
  "Continuous Promotion (weekly drip posts for a month)",
]

const tones = [
    {
      "id": "professional",
      "name": "Professional",
      "example": "Ex. We’re excited to announce the launch of our new product. Available starting today on our website."
    },
    {
      "id": "casual",
      "name": "Casual",
      "example": "Ex. Guess what? Our new product is live! Check it out now."
    },
    {
      "id": "witty",
      "name": "Witty",
      "example": "Ex. Fresh out of the lab and ready to impress – meet your new favorite gadget."
    },
    {
      "id": "hype",
      "name": "Hype",
      "example": "Ex. 🚀 It’s here! The product everyone’s been waiting for just dropped. Don’t miss out!"
    }
  ]

export default function CampaignForm() {
  const [step, setStep] = useState(0) // 0: Channels, 1: Launch Type, 2: Extras (Tone), 2.5: Extras (Keywords)
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])
  const [launchType, setLaunchType] = useState("")
  const [tone, setTone] = useState("")
  const [keywords, setKeywords] = useState("")
  const [error, setError] = useState("")

  const toggleChannel = (id: string) => {
    setSelectedChannels((prev) =>
      prev.includes(id) ? prev.filter((ch) => ch !== id) : [...prev, id]
    )
    setError("")
  }

  const handleNext = () => {
    if (step === 0 && selectedChannels.length === 0) {
      setError("Please select at least one channel.")
      return
    }
    if (step === 1 && !launchType) {
      setError("Please select a launch type.")
      return
    }
    if (step === 2 && !tone) {
      setError("Please select a preferred tone.")
      return
    }
    if (step === 0 || step === 1) {
      setStep(step + 1)
    } else if (step === 2) {
      setStep(2.5) // keywords screen
    } else if (step === 2.5) {
      console.log({
        selectedChannels,
        launchType,
        tone,
        keywords
      })
    }
    setError("")
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
              i <= Math.min(step, 2) ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Step Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Step 0 — Channels */}
        {step === 0 && (
          <>
            <h1 className="text-2xl font-semibold mb-6">Select channels</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              {channelsList.map((channel) => (
                <div
                  key={channel.id}
                  className={cn(
                    "cursor-pointer border transition-colors rounded-md text-center",
                    selectedChannels.includes(channel.id)
                      ? "border-primary bg-primary/5"
                      : "border-muted"
                  )}
                  onClick={() => toggleChannel(channel.id)}
                >
                  <div className="flex flex-col items-center justify-center p-3 gap-2">
                    {channel.icon}
                    <span className="text-xs font-medium">{channel.name}</span>
                  </div>
                </div>
              ))}
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </>
        )}

        {/* Step 1 — Launch Type */}
        {step === 1 && (
          <>
            <h1 className="text-2xl font-semibold mb-6">Select launch type</h1>
            <div className="space-y-3">
              {launchTypes.map((type) => (
                <div
                  key={type}
                  className={cn(
                    "p-3 border rounded-md cursor-pointer transition-colors",
                    launchType === type
                      ? "border-primary bg-primary/5"
                      : "border-muted"
                  )}
                  onClick={() => {
                    setLaunchType(type)
                    setError("")
                  }}
                >
                  {type}
                </div>
              ))}
            </div>
            {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
          </>
        )}

        {/* Step 2 — Preferred Tone */}
        {step === 2 && (
          <>
            <h1 className="text-2xl font-semibold mb-6">Preferred tone</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tones.map((t) => (
                <div
                  key={t.id}
                  className={cn(
                    "p-4 border rounded-md cursor-pointer transition-colors",
                    tone === t.id ? "border-primary bg-primary/5" : "border-muted"
                  )}
                  onClick={() => {
                    setTone(t.id)
                    setError("")
                  }}
                >
                  <h2 className="font-semibold">{t.name}</h2>
                  <p className="text-sm text-muted-foreground">{t.example}</p>
                </div>
              ))}
            </div>
            {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
          </>
        )}

        {/* Step 3 (part of 2) — Keywords */}
        {step === 2.5 && (
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
          </>
        )}
      </div>

      {/* Sticky button */}
      <div className="p-4 border-t bg-background sticky bottom-0">
        <Button onClick={handleNext} className="w-full">
          {step < 2.5 ? "Next" : "Finish"}
        </Button>
      </div>
    </div>
  )
}
