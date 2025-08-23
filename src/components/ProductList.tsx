import UniversalHeader from "./UniversalHeader"
import SearchBar from "./SearchBar"
import { Button } from "./ui/button"

// Function to limit description to 2 lines
const truncateDescription = (description: string, maxLength: number = 60) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
};

// Smart product examples
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
    }
];

const ProductList = () => {
    return (
        <div className="space-y-5">
            <div className="space-y-5">
            <UniversalHeader heading="Your Products" subheading="View and manage your products" buttonLabel="+ Add New" />
            <SearchBar placeholder="Search product"/>
            </div>

            <div className="flex space-x-5 overflow-x-scroll scrollbar-hide">
                {products.map((product) => (
                    <div key={product.id} className="p-3 rounded-md bg-primary-foreground min-w-[90%]">
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

            <div className="flex justify-center">
            <Button variant={"ghost"} className="">view all products</Button>
            </div>
        </div>
    )
}

export default ProductList