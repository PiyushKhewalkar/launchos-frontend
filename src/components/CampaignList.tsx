import UniversalHeader from "./UniversalHeader"
import SearchBar from "./SearchBar"
import { Button } from "./ui/button"
import redditIcon from "../assets/reddit-icon.svg"
import { getCampaigns } from "../utils/api"
import { useEffect, useState } from "react"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"

// Function to limit description to 2 lines
const truncateDescription = (description: string | undefined, maxLength: number = 60) => {
    if (!description) return "No description available";
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
};

// Campaign interface based on API response
interface Campaign {
    _id: string;
    name: string;
    description?: string;
    status: string;
    channels: string[];
    launchType: string;
    keywords: string[];
    launchScripts: any[];
    createdAt: string;
    updatedAt: string;
}

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                setLoading(true);
                const response = await getCampaigns();
                if (response) {
                    // Show only first 3 campaigns for the list view
                    setCampaigns(response.slice(0, 3));
                }
            } catch (err) {
                console.error("Error fetching campaigns:", err);
                setError("Failed to fetch campaigns");
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    if (loading) {
        return (
            <div className="space-y-5">
                <div className="space-y-5">
                    <UniversalHeader heading="Your Campaigns" subheading="These are your past battles. Some won hearts, some got roasted" buttonLabel="+ Create New" />
                    <SearchBar placeholder="Search campaign"/>
                </div>
                <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading campaigns...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-5">
                <div className="space-y-5">
                    <UniversalHeader heading="Your Campaigns" subheading="These are your past battles. Some won hearts, some got roasted" buttonLabel="+ Create New" />
                    <SearchBar placeholder="Search campaign"/>
                </div>
                <div className="text-center py-12">
                    <p className="text-muted-foreground">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            <div className="space-y-5">
            <UniversalHeader heading="Your Campaigns" subheading="These are your past battles. Some won hearts, some got roasted" buttonLabel="+ Create New" />
            <SearchBar placeholder="Search campaign"/>
            </div>

            <div className="flex space-x-5 overflow-x-scroll scrollbar-hide">
                {campaigns.map((campaign) => (
                    <div key={campaign._id} className="p-3 rounded-md bg-primary-foreground min-w-[90%]">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                            <div className="flex justify-start space-x-2 items-center">
                            {campaign.channels.includes('reddit') && (
                                    <div className="bg-white rounded-full">
                                        <img src={redditIcon} alt="Reddit" className="h-6 w-6" />
                                    </div>
                                )}
                                <h3 className="text-xl font-medium">{campaign.name || "untitled"}</h3>
                            </div>

                            <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem variant="destructive">
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <p className="text-muted-foreground">{truncateDescription(campaign.description)}</p>
                        </div>
                        <div className="space-y-2 my-3">
                            <p className="text-muted-foreground text-sm flex items-center gap-2">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                Status: {campaign.status}
                            </p>
                            <p className="text-muted-foreground text-sm flex items-center gap-2">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Launch Type: {campaign.launchType}
                            </p>
                        </div>
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