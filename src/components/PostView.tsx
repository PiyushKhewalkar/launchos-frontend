import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import redditIcon from "../assets/reddit-icon.svg"
import { Button } from "./ui/button"
import { getCampaign, type Campaign, type LaunchScript } from "../utils/api"
import { 
    Breadcrumb, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbList, 
    BreadcrumbPage, 
    BreadcrumbSeparator 
} from "./ui/breadcrumb"
import { ArrowLeft, Copy } from "lucide-react"

const PostView = () => {
    const { campaignId, postId } = useParams<{ campaignId: string; postId: string }>()
    const navigate = useNavigate()
    const [campaign, setCampaign] = useState<Campaign | null>(null)
    const [currentPost, setCurrentPost] = useState<LaunchScript | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [copiedTitle, setCopiedTitle] = useState(false)
    const [copiedBody, setCopiedBody] = useState(false)

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
                
                // Find the specific post
                if (postId) {
                    let foundPost: LaunchScript | null = null
                    for (const channelScript of campaignData.launchScripts) {
                        const post = channelScript.scripts.find((script: LaunchScript) => script._id === postId)
                        if (post) {
                            foundPost = post
                            break
                        }
                    }
                    setCurrentPost(foundPost)
                    
                    if (!foundPost) {
                        setError("Post not found")
                    }
                }
            } catch (error) {
                console.error("Error fetching campaign:", error)
                setError("Failed to load campaign")
            } finally {
                setLoading(false)
            }
        }

        fetchCampaign()
    }, [campaignId, postId])

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp)
        return date.toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const copyToClipboard = async (text: string, type: 'title' | 'body') => {
        try {
            await navigator.clipboard.writeText(text)
            if (type === 'title') {
                setCopiedTitle(true)
                setTimeout(() => setCopiedTitle(false), 2000)
            } else {
                setCopiedBody(true)
                setTimeout(() => setCopiedBody(false), 2000)
            }
        } catch (error) {
            console.error('Failed to copy text: ', error)
        }
    }

    if (loading) {
        return (
            <div className="space-y-8 mb-10">
                <div className="flex items-center justify-center h-64">
                    <p className="text-muted-foreground">Loading post...</p>
                </div>
            </div>
        )
    }

    if (error || !campaign || !currentPost) {
        return (
            <div className="space-y-8 mb-10">
                <div className="flex items-center justify-center h-64">
                    <p className="text-red-500">{error || "Post not found"}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4 sm:space-y-6 mb-10">
            <Breadcrumb>
                <BreadcrumbList className="flex-wrap">
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/campaigns">campaigns</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/campaigns/${campaignId}`} className="truncate max-w-[120px] sm:max-w-none">
                            {campaign.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Post</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Button 
                variant="ghost" 
                onClick={() => navigate(`/campaigns/${campaignId}`)}
                className="flex items-center gap-2 text-sm sm:text-base"
            >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Campaign</span>
                <span className="sm:hidden">Back</span>
            </Button>

            <div className="bg-primary-foreground border border-border rounded-md p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3">
                    <div className="bg-white rounded-full">
                        <img src={redditIcon} alt="Reddit" className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">r/indie-hackers</p>
                        <p className="text-xs text-muted-foreground">{formatDate(currentPost.publishDate)}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <h1 className="text-lg sm:text-2xl font-semibold leading-tight text-foreground flex-1">
                            {currentPost.copy.title}
                        </h1>
                        <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => copyToClipboard(currentPost.copy.title, 'title')}
                            className="p-2 h-auto"
                        >
                            <Copy className="h-4 w-4" />
                        </Button>
                        {copiedTitle && (
                            <span className="text-xs text-muted-foreground font-medium">Copied!</span>
                        )}
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">Post Body</p>
                            <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => copyToClipboard(currentPost.copy.body, 'body')}
                                className="p-2 h-auto"
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                            {copiedBody && (
                                <span className="text-xs text-muted-foreground font-medium">Copied!</span>
                            )}
                        </div>
                        <div className="">
                            <p className="text-foreground leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                                {currentPost.copy.body}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostView
