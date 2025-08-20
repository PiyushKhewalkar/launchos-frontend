import axios from "axios"

const BASE_URL = "https://launchos-backend.onrender.com"

export const createProduct = async({productInfo}) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/products`, {productInfo})
        return response.data
    } catch (error) {
        console.error("Error creating product", error)
        throw error
    }
}