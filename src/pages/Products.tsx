import UniversalHeader from "../components/UniversalHeader"
import SearchBar from "../components/SearchBar"
import { Button } from "../components/ui/button"

// Function to limit description to 2 lines
const truncateDescription = (description: string, maxLength: number = 60) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
};

// Smart product examples - expanded list for the full page
const products = [
    {
        id: 1,
        name: "LaunchOS",
        description: "LaunchOS helps you craft winning product launch campaigns for 100+ channels",
        campaigns: 5,
        status: "active"
    },
    {
        id: 2,
        name: "RedditOS",
        description: "RedditOS revolutionizes community building with AI-powered moderation and engagement tools. Trusted by 1000+ communities worldwide.",
        campaigns: 3,
        status: "active"
    },
    {
        id: 3,
        name: "ProductHunt Clone",
        description: "A modern ProductHunt alternative with better discovery algorithms and founder-friendly features. Launched successfully with 200+ products.",
        campaigns: 2,
        status: "completed"
    },
    {
        id: 4,
        name: "SocialFlow Pro",
        description: "Automated social media management platform that schedules and optimizes posts across all major platforms. Increased engagement by 300% for clients.",
        campaigns: 8,
        status: "active"
    },
    {
        id: 5,
        name: "EmailMaster Suite",
        description: "AI-powered email marketing tool that personalizes content and optimizes send times. Achieved 45% open rate improvement.",
        campaigns: 4,
        status: "completed"
    },
    {
        id: 6,
        name: "InfluencerHub",
        description: "Platform connecting brands with micro-influencers for authentic marketing campaigns. Facilitated 500+ successful partnerships.",
        campaigns: 6,
        status: "active"
    },
    {
        id: 7,
        name: "ViralTracker Analytics",
        description: "Real-time viral content tracking and analysis tool. Helps creators understand what makes content go viral across platforms.",
        campaigns: 3,
        status: "active"
    },
    {
        id: 8,
        name: "BrandVoice AI",
        description: "AI-powered brand voice consistency tool that maintains tone across all marketing materials and communications.",
        campaigns: 2,
        status: "completed"
    }
];

const Products = () => {
    return (
        <div className="space-y-6 pb-20">
            <div className="space-y-5">
                <UniversalHeader 
                    heading="All Products" 
                    subheading="Complete overview of all your products and their campaigns" 
                    buttonLabel="+ Add New" 
                />
                <SearchBar placeholder="Search products"/>
            </div>

            <div className="space-y-4">
                {products.map((product) => (
                    <div key={product.id} className="p-3 rounded-md bg-primary-foreground">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-medium">{product.name}</h3>
                                <div className="">...</div>
                            </div>
                            <p className="text-muted-foreground">{truncateDescription(product.description)}</p>
                        </div>
                        <p className="text-muted-foreground text-sm my-5">{product.campaigns} campaigns</p>
                        <div className="flex justify-between items-center">
                            <Button variant={"outline"} className="w-[30%]">View</Button>
                            <Button className="w-[65%]">Create Campaign</Button>
                        </div>
                    </div>
                ))}
            </div>

            {products.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No products found. Add your first product to get started!</p>
                </div>
            )}
        </div>
    )
}

export default Products
