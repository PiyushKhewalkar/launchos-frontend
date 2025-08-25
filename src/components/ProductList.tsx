import UniversalHeader from "./UniversalHeader"
import SearchBar from "./SearchBar"
import { Button } from "./ui/button"
import { deleteProduct } from "../utils/api"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import type { Product } from "@/utils/api"
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

interface ProductListProps {
    products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
    const [localProducts, setLocalProducts] = useState<Product[]>(products.slice(0, 3));
    const navigate = useNavigate();

    // Update local products when props change
    useEffect(() => {
        setLocalProducts(products.slice(0, 3));
    }, [products]);

    const handleDeleteProduct = async (product: Product) => {
        try {
            await deleteProduct(product._id);
            // Remove the deleted product from the local state
            setLocalProducts(prevProducts => prevProducts.filter(p => p._id !== product._id));
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product. Please try again.");
        }
    };

    const handleAddNewProduct = () => {
        navigate('/products/add');
    };

    return (
        <div className="space-y-5">
            <div className="space-y-5">
            <UniversalHeader 
                heading="Your Products" 
                subheading="View and manage your products" 
                buttonLabel="+ Add New" 
                onButtonClick={handleAddNewProduct}
            />
            <SearchBar placeholder="Search product"/>
            </div>

            <div className="flex space-x-5 overflow-x-scroll scrollbar-hide">
                {Array.isArray(localProducts) && localProducts.map((product) => (
                    <div key={product._id} className="p-3 rounded-md bg-primary-foreground min-w-[90%]">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-medium">{product.rawData.name}</h3>
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
                                                        onClick={() => handleDeleteProduct(product)}
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
                                            <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to delete "{product.rawData.name}"? This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction 
                                                onClick={() => handleDeleteProduct(product)}
                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                            >
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
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

            <div className="flex justify-center">
            <Button variant={"ghost"} className="">view all products</Button>
            </div>
        </div>
    )
}

export default ProductList