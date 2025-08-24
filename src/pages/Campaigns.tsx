import UniversalHeader from "../components/UniversalHeader"
import SearchBar from "../components/SearchBar"
import { Button } from "../components/ui/button"
import redditIcon from "../assets/reddit-icon.svg"

// Function to limit description to 2 lines
const truncateDescription = (description: string, maxLength: number = 60) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
};

// Smart campaign examples - expanded list for the full page
const campaigns = [
    {
        id: 1,
        name: "LaunchOS",
        description: "LaunchOS helps you craft winning product launch campaigns for 100+ channels",
        product: "LaunchOS",
        status: "active"
    },
    {
        id: 2,
        name: "RedditOS",
        description: "RedditOS revolutionizes community building with AI-powered moderation and engagement tools. Trusted by 1000+ communities worldwide.",
        product: "RedditOS",
        status: "active"
    },
    {
        id: 3,
        name: "ProductHunt Clone",
        description: "A modern ProductHunt alternative with better discovery algorithms and founder-friendly features. Launched successfully with 200+ products.",
        product: "ProductHunt Clone",
        status: "completed"
    },
    {
        id: 4,
        name: "SocialFlow",
        description: "Automated social media management platform that schedules and optimizes posts across all major platforms. Increased engagement by 300% for clients.",
        product: "SocialFlow Pro",
        status: "active"
    },
    {
        id: 5,
        name: "EmailMaster",
        description: "AI-powered email marketing tool that personalizes content and optimizes send times. Achieved 45% open rate improvement.",
        product: "EmailMaster Suite",
        status: "completed"
    },
    {
        id: 6,
        name: "InfluencerHub",
        description: "Platform connecting brands with micro-influencers for authentic marketing campaigns. Facilitated 500+ successful partnerships.",
        product: "InfluencerHub",
        status: "active"
    },
    {
        id: 7,
        name: "ViralTracker",
        description: "Real-time viral content tracking and analysis tool. Helps creators understand what makes content go viral across platforms.",
        product: "ViralTracker Analytics",
        status: "active"
    },
    {
        id: 8,
        name: "BrandVoice",
        description: "AI-powered brand voice consistency tool that maintains tone across all marketing materials and communications.",
        product: "BrandVoice AI",
        status: "completed"
    }
];

const Campaigns = () => {
    return (
        <div className="space-y-6 pb-20">
            <div className="space-y-5">
                <UniversalHeader 
                    heading="All Campaigns" 
                    subheading="Complete overview of all your marketing campaigns and their performance" 
                    buttonLabel="+ Create New" 
                />
                <SearchBar placeholder="Search campaigns"/>
            </div>

            <div className="space-y-4">
                {campaigns.map((campaign) => (
                    <div key={campaign.id} className="p-3 rounded-md bg-primary-foreground">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-medium">{campaign.name}</h3>
                                
                                    <div className="bg-white rounded-full">
                                    <img src={redditIcon} alt="Reddit" className="h-6 w-6" />
                                    </div>
                        
                            </div>
                            <p className="text-muted-foreground">{truncateDescription(campaign.description)}</p>
                        </div>
                        <p className="text-muted-foreground text-sm my-5 flex items-center gap-2">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            Product: {campaign.product}
                        </p>
                        <Button variant={"outline"} className="w-full">View Campaign</Button>
                    </div>
                ))}
            </div>

            {campaigns.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No campaigns found. Create your first campaign to get started!</p>
                </div>
            )}
        </div>
    )
}

export default Campaigns
