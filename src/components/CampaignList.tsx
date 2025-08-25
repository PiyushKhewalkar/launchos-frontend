import UniversalHeader from "./UniversalHeader"
import SearchBar from "./SearchBar"
import { Button } from "./ui/button"
import redditIcon from "../assets/reddit-icon.svg"
import { deleteCampaign } from "../utils/api"
import type { Campaign } from "@/utils/api"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog"

// Function to limit description to 2 lines
const truncateDescription = (description: string | undefined, maxLength: number = 60) => {
    if (!description) return "No description available";
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
};

interface CampaignListProps {
    campaigns: Campaign[];
}

const CampaignList = ({ campaigns }: CampaignListProps) => {
    const [localCampaigns, setLocalCampaigns] = useState<Campaign[]>(campaigns.slice(0, 3));
    const navigate = useNavigate();

    // Update local campaigns when props change
    useEffect(() => {
        setLocalCampaigns(campaigns.slice(0, 3));
    }, [campaigns]);

    const handleDeleteCampaign = async (campaign: Campaign) => {
        try {
            await deleteCampaign(campaign._id);
            // Remove the deleted campaign from the local state
            setLocalCampaigns(prevCampaigns => prevCampaigns.filter(c => c._id !== campaign._id));
        } catch (error) {
            console.error("Error deleting campaign:", error);
            alert("Failed to delete campaign. Please try again.");
        }
    };

    const handleCreateNewCampaign = () => {
        navigate('/campaigns/create');
    };

    return (
        <div className="space-y-5">
            <div className="space-y-5">
            <UniversalHeader 
                heading="Your Campaigns" 
                subheading="These are your past battles. Some won hearts, some got roasted" 
                buttonLabel="+ Create New" 
                onButtonClick={handleCreateNewCampaign}
            />
            <SearchBar placeholder="Search campaign"/>
            </div>

            <div className="flex space-x-5 overflow-x-scroll scrollbar-hide">
                {localCampaigns.map((campaign) => (
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

                            <AlertDialog>
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
                                        <DropdownMenuItem variant="destructive" asChild>
                                            <AlertDialogTrigger asChild>
                                                <button 
                                                    className="flex w-full items-center px-2 py-1.5 text-sm text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                                    onClick={() => handleDeleteCampaign(campaign)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </button>
                                            </AlertDialogTrigger>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Campaign</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete "{campaign.name}"? This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction 
                                            onClick={() => handleDeleteCampaign(campaign)}
                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
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
                        <Button variant={"outline"} className="w-full" onClick={() => navigate(`/campaigns/${campaign._id}`)}>View Campaign</Button>
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