import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

// CampaignCard Component
interface CampaignCardProps {
  state: "active" | "in-progress" | "incomplete" | "empty"
  progress?: number
  headline: string
  microcopy: string
  primaryAction: {
    text: string
    onClick: () => void
  }
  secondaryAction?: {
    text: string
    onClick?: () => void
    href?: string
  }
}

const CampaignCard = ({ 
  state, 
  progress, 
  headline, 
  microcopy, 
  primaryAction, 
  secondaryAction 
}: CampaignCardProps) => {
  const getStateStyles = () => {
    switch (state) {
      case "active":
        return {
          card: "border-green-200 bg-green-50/50 hover:shadow-lg transition-all duration-300",
          progress: "bg-green-100",
          progressBar: "bg-green-500"
        }
      case "in-progress":
        return {
          card: "border-blue-200 bg-blue-50/50 hover:shadow-lg transition-all duration-300",
          progress: "bg-blue-100",
          progressBar: "bg-blue-500"
        }
      case "incomplete":
        return {
          card: "border-orange-200 bg-orange-50/50 hover:shadow-lg transition-all duration-300",
          progress: "bg-orange-100",
          progressBar: "bg-orange-500"
        }
      case "empty":
        return {
          card: "border-gray-200 bg-gray-50/50 hover:shadow-lg transition-all duration-300",
          progress: "bg-gray-100",
          progressBar: "bg-gray-500"
        }
    }
  }

  const styles = getStateStyles()

  return (
    <Card className={cn("h-full flex flex-col", styles.card)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900">
          {headline}
        </CardTitle>
        {progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Setup Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress 
              value={progress} 
              className={cn("h-2", styles.progress)}
            />
          </div>
        )}
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-sm text-gray-600 leading-relaxed">
          {microcopy}
        </p>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-3 pt-4">
        <Button 
          onClick={primaryAction.onClick}
          className="w-full rounded-xl font-medium h-11 text-sm"
          size="lg"
        >
          {primaryAction.text}
        </Button>
        
        {secondaryAction && (
          <Button
            variant="ghost"
            onClick={secondaryAction.onClick}
            className="w-full text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            size="sm"
          >
            {secondaryAction.text}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

// Main CampaignDashboard Component
const CampaignDashboard = () => {
  const navigate = useNavigate()

  const handleCreateCampaign = () => {
    navigate("/campaignform")
  }

  const handleViewCampaigns = () => {
    navigate("/campaigns")
  }

  const handleFinishSetup = () => {
    navigate("/setup")
  }

  const handleHelpClick = () => {
    // Open help documentation
    window.open("/docs", "_blank")
  }

  const campaignData = [
    {
      state: "active" as const,
      headline: "Active Campaigns",
      microcopy: "Manage and optimize your campaigns anytime.",
      primaryAction: {
        text: "Create New Campaign",
        onClick: handleCreateCampaign
      },
      secondaryAction: {
        text: "View All Campaigns",
        onClick: handleViewCampaigns
      }
    },
    {
      state: "in-progress" as const,
      headline: "Ready to Launch",
      microcopy: "No campaigns yet. Get started in minutes.",
      primaryAction: {
        text: "Launch First Campaign",
        onClick: handleCreateCampaign
      },
      secondaryAction: {
        text: "Need help?",
        onClick: handleHelpClick
      }
    },
    {
      state: "incomplete" as const,
      progress: 67,
      headline: "Setup Incomplete",
      microcopy: "Just 2 steps left to start creating campaigns.",
      primaryAction: {
        text: "Continue Setup (Step 2 of 3)",
        onClick: handleFinishSetup
      },
      secondaryAction: {
        text: "Skip for now",
        onClick: () => navigate("/productform")
      }
    },
    {
      state: "empty" as const,
      headline: "Welcome to LaunchOS",
      microcopy: "You haven't created any campaigns yet. Get started in minutes.",
      primaryAction: {
        text: "Create Your First Campaign",
        onClick: handleCreateCampaign
      }
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Campaign Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your product campaigns and track their performance
          </p>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {campaignData.map((data, index) => (
            <CampaignCard
              key={index}
              state={data.state}
              progress={data.progress}
              headline={data.headline}
              microcopy={data.microcopy}
              primaryAction={data.primaryAction}
              secondaryAction={data.secondaryAction}
            />
          ))}
        </div>

        {/* Section Dividers */}
        <div className="mt-12 space-y-8">
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => navigate("/productform")}
                variant="outline"
                className="rounded-xl"
              >
                + Add Product
              </Button>
              <Button
                onClick={() => navigate("/campaignform")}
                variant="outline"
                className="rounded-xl"
              >
                + New Campaign
              </Button>
              <Button
                onClick={() => navigate("/analytics")}
                variant="outline"
                className="rounded-xl"
              >
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Home = () => {
  return <CampaignDashboard />
}

export default Home