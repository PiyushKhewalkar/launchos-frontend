import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const Home = () => {

    const navigate = useNavigate()

    const handleAddProductClick = () => {
            navigate("/productform")
    }

    return (

        <>
        <div className="flex justify-center items-center h-screen">
        <Button onClick={handleAddProductClick}>+ Add Product</Button>
        </div>
        </>
    )
}

export default Home