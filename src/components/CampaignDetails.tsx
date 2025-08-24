import redditIcon from "../assets/reddit-icon.svg"
import { Button } from "./ui/button"
import { 
    Breadcrumb, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbList, 
    BreadcrumbPage, 
    BreadcrumbSeparator 
} from "./ui/breadcrumb"

// JSON compatible data structure
const campaignData = {
    title: "LaunchOS Big Bang launch",
    type: "Hard-launch",
    product: "LaunchOS",
    posts: [
        {
            id: 1,
            title: "Post 1",
            day: "day 0",
            platform: "r/indie-hackers",
            platformIcon: redditIcon,
            postTitle: "I never expected this will work this well... but strangers are using it",
            description: "I've been obsessed with [pain point] for years. Last year, I left my [job/school] to build something around it. The journey has been incredible and I'm amazed at how well it's working. Strangers are actually using what I built and giving me feedback. It's surreal to see something I created being used by people I don't know.",
            url: "#"
        }
    ]
}

const CampaignDetails = () => {
    const truncateText = (text: string, maxLines: number = 3) => {
        const lineLength = 33 // Approximate characters per line
        const maxChars = lineLength * maxLines
        
        if (text.length <= maxChars) {
            return text
        }
        
        return text.substring(0, maxChars).trim() + '...'
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
                        <BreadcrumbPage>{campaignData.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            
            <div className="space-y-2">
                <h1 className="text-2xl font-medium text-wrap">{campaignData.title}</h1>
                <div className="flex justify-between items-center">
                    <p className="text-muted-foreground text-left text-sm">{campaignData.type}</p>
                    <p className="text-muted-foreground text-right text-sm">Product: {campaignData.product}</p>
                </div>
            </div>
            </div>

            <div>
                {campaignData.posts.map((post) => (
                    <div key={post.id} className="p-3 rounded-md bg-primary-foreground space-y-2 mb-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm">{post.title}</span>
                            <span className="text-sm">{post.day}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <div className="bg-white rounded-full">
                                <img src={post.platformIcon} alt="Platform" className="h-6 w-6" />
                            </div>
                            <span className="text-xs font-thin">{post.platform}</span>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-xl font-medium leading-tight">
                                {post.postTitle.length > 60 
                                    ? post.postTitle.substring(0, 60).trim() + '...' 
                                    : post.postTitle
                                }
                            </h1>
                            <div className="space-y-2">
                                <p className="text-[#A1A1A1] leading-relaxed">
                                    {truncateText(post.description, 3)}
                                    {post.description.length > 180 && (
                                        <Button 
                                            variant="ghost" 
                                            className="text-sm text-muted-foreground hover:text-foreground p-0 h-auto ml-2"
                                        >
                                            read more
                                        </Button>
                                    )}
                                </p>
                            </div>
                            <Button variant="ghost" className="w-full">view post</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CampaignDetails