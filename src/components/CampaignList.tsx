import UniversalHeader from "./UniversalHeader"
import SearchBar from "./SearchBar"
import { Button } from "./ui/button"
import redditIcon from "../assets/reddit-icon.svg"

// Function to limit description to 2 lines
const truncateDescription = (description: string, maxLength: number = 60) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
};

// Smart campaign examples
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
    }
];

const CampaignList = () => {
    return (
        <div className="space-y-5">
            <div className="space-y-5">
            <UniversalHeader heading="Your Campaigns" subheading="These are your past battles. Some won hearts, some got roasted" buttonLabel="+ Create New" />
            <SearchBar placeholder="Search campaign"/>
            </div>

            <div className="flex space-x-5 overflow-x-scroll scrollbar-hide">
                {campaigns.map((campaign) => (
                    <div key={campaign.id} className="p-3 rounded-md bg-primary-foreground min-w-[90%]">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-medium">{campaign.name}</h3>
                                
                                    <img src={redditIcon} alt="Reddit" className="h-6 w-6" />
                        
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

            <div className="flex justify-center">
            <Button variant={"ghost"} className="">view all campaigns</Button>
            </div>
        </div>
    )
}

export default CampaignList