import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import redditIcon from "../assets/reddit-icon.svg"
import { Button } from "./ui/button"
import { getCampaign, type Campaign, type ChannelScript, type LaunchScript } from "../utils/api"
import { 
    Breadcrumb, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbList, 
    BreadcrumbPage, 
    BreadcrumbSeparator 
} from "./ui/breadcrumb"

const CampaignDetails = () => {
    const { campaignId } = useParams<{ campaignId: string }>()
    const navigate = useNavigate()
    const [campaign, setCampaign] = useState<Campaign | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchCampaign = async () => {
            if (!campaignId) {
                setError("Campaign ID not found")
                setLoading(false)
                return
            }

            try {
                const campaignData = await getCampaign({ campaignId })
                setCampaign(campaignData)
            } catch (error) {
                console.error("Error fetching campaign:", error)
                setError("Failed to load campaign")
            } finally {
                setLoading(false)
            }
        }

        fetchCampaign()
    }, [campaignId])

    const truncateText = (text: string, maxLines: number = 3) => {
        const lineLength = 33 // Approximate characters per line
        const maxChars = lineLength * maxLines
        
        if (text.length <= maxChars) {
            return text
        }
        
        return text.substring(0, maxChars).trim() + '...'
    }

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp)
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (loading) {
        return (
            <div className="space-y-8 mb-10">
                <div className="flex items-center justify-center h-64">
                    <p className="text-muted-foreground">Loading campaign...</p>
                </div>
            </div>
        )
    }

    if (error || !campaign) {
        return (
            <div className="space-y-8 mb-10">
                <div className="flex items-center justify-center h-64">
                    <p className="text-red-500">{error || "Campaign not found"}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8 mb-10">
            <div className="space-y-2">
                <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/campaigns">campaigns</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{campaign.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            
            <div className="space-y-2">
                <h1 className="text-2xl font-medium text-wrap">{campaign.name}</h1>
                <div className="flex justify-between items-center">
                    <p className="text-muted-foreground text-left text-sm capitalize">{campaign.launchType.replace('-', ' ')}</p>
                    <p className="text-muted-foreground text-right text-sm">Status: {campaign.status}</p>
                </div>
                <p className="text-muted-foreground text-sm">{campaign.description}</p>
            </div>
            </div>

            <div>
                {campaign.launchScripts.map((channelScript: ChannelScript, channelIndex: number) => (
                    channelScript.scripts.map((script: LaunchScript, scriptIndex: number) => (
                        <div key={`${channelIndex}-${scriptIndex}`} className="p-3 rounded-md bg-primary-foreground space-y-2 mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Script {scriptIndex + 1}</span>
                                <span className="text-sm">{formatDate(script.publishDate)}</span>
                            </div>

                            <div className="flex items-center space-x-2">
                                <div className="bg-white rounded-full">
                                    <img src={redditIcon} alt="Platform" className="h-6 w-6" />
                                </div>
                                <span className="text-xs font-thin">r/indie-hackers</span>
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-xl font-medium leading-tight">
                                    {script.copy.title.length > 60 
                                        ? script.copy.title.substring(0, 60).trim() + '...' 
                                        : script.copy.title
                                    }
                                </h1>
                                <div className="space-y-2">
                                    <p className="text-[#A1A1A1] leading-relaxed">
                                        {truncateText(script.copy.body, 3)}
                                        {script.copy.body.length > 180 && (
                                            <Button 
                                                variant="ghost" 
                                                className="text-sm text-muted-foreground hover:text-foreground p-0 h-auto ml-2"
                                            >
                                                read more
                                            </Button>
                                        )}
                                    </p>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    className="w-full"
                                    onClick={() => navigate(`/campaigns/${campaignId}/${script._id}`)}
                                >
                                    view post
                                </Button>
                            </div>
                        </div>
                    ))
                ))}
            </div>
        </div>
    )
}

export default CampaignDetails