import UniversalHeader from "../components/UniversalHeader"
import SearchBar from "../components/SearchBar"
import { Button } from "../components/ui/button"
import { getProducts } from "../utils/api"
import { useEffect, useState } from "react"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

// Function to limit description to 2 lines
const truncateDescription = (description: string | undefined, maxLength: number = 60) => {
    if (!description) return "No description available";
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
};

// Product interface based on API response
interface Product {
    _id: string;
    rawData: {
        name: string;
    };
    enhancedData: {
        problemItSolves: string[];
    };
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await getProducts();
                console.log("Products API response:", response);
                if (response && response.products && Array.isArray(response.products)) {
                    setProducts(response.products);
                } else if (response && Array.isArray(response)) {
                    setProducts(response);
                } else if (response && response.data && Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    console.error("Unexpected response format:", response);
                    setProducts([]);
                }
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
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
                <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading products...</p>
                </div>
            </div>
        );
    }

    if (error) {
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
                <div className="text-center py-12">
                    <p className="text-muted-foreground">{error}</p>
                </div>
            </div>
        );
    }

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
                {Array.isArray(products) && products.map((product) => (
                    <div key={product._id} className="p-3 rounded-md bg-primary-foreground">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-medium">{product.rawData.name}</h3>
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
                            <p className="text-muted-foreground">{truncateDescription(product.enhancedData.problemItSolves[0])}</p>
                        </div>
                        <p className="text-muted-foreground text-sm my-5">0 campaigns</p>
                        <div className="flex justify-between items-center">
                            <Button variant={"outline"} className="w-[30%]">View</Button>
                            <Button className="w-[65%]">Create Campaign</Button>
                        </div>
                    </div>
                ))}
            </div>

            {(!products || !Array.isArray(products) || products.length === 0) && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No products found. Add your first product to get started!</p>
                </div>
            )}
        </div>
    )
}

export default Products
