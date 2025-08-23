import UniversalHeader from "./UniversalHeader"
import SearchBar from "./SearchBar"
import { Button } from "./ui/button"

const ProductList = () => {
    return (
        <div className="space-y-5">
            <div className="space-y-5">
            <UniversalHeader heading="Your Products" subheading="View and manage your products" buttonLabel="+ Add New" />
            <SearchBar placeholder="Search product"/>
            </div>

            <div className="flex space-x-5 overflow-x-scroll">
                {/* card */}
            <div className="p-3 rounded-md bg-primary-foreground min-w-[90%]">
            <div className="space-y-2">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">LaunchOS</h3>
                <div className="">...</div>
            </div>
            <p className="text-muted-foreground">Launch os is the best product int he towlrd iwht over 500 users and 500...</p>
            </div>
            <p className="text-muted-foreground text-sm my-5">5 campaigns</p>
            <div className="flex justify-between items-center">
            <Button variant={"outline"} className="w-[30%]">View</Button>
            <Button className="w-[65%]">Create Campaign</Button>
            </div>
            </div>

            <div className="p-3 rounded-md bg-primary-foreground min-w-[90%]">
            <div className="space-y-2">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">LaunchOS</h3>
                <div className="">...</div>
            </div>
            <p className="text-muted-foreground">Launch os is the best product int he towlrd iwht over 500 users and 500...</p>
            </div>
            <p className="text-muted-foreground text-sm my-5">5 campaigns</p>
            <div className="flex justify-between items-center">
            <Button variant={"outline"} className="w-[30%]">View</Button>
            <Button className="w-[65%]">Create Campaign</Button>
            </div>
            </div>

            <div className="p-3 rounded-md bg-primary-foreground min-w-[90%]">
            <div className="space-y-2">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">LaunchOS</h3>
                <div className="">...</div>
            </div>
            <p className="text-muted-foreground">Launch os is the best product int he towlrd iwht over 500 users and 500...</p>
            </div>
            <p className="text-muted-foreground text-sm my-5">5 campaigns</p>
            <div className="flex justify-between items-center">
            <Button variant={"outline"} className="w-[30%]">View</Button>
            <Button className="w-[65%]">Create Campaign</Button>
            </div>
            </div>

            
            </div>

            <div className="flex justify-center">
            <Button variant={"ghost"} className="">view all products</Button>
            </div>
        </div>
    )
}

export default ProductList