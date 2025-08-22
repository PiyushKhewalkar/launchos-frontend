import axios from "axios"

const BASE_URL = "https://launchos-backend.onrender.com"

export const createProduct = async({productInfo}) => {
    try {
        console.log("Sending payload:", productInfo)
        const response = await axios.post(`${BASE_URL}/api/products`, productInfo)
        return response.data
    } catch (error) {
        console.error("Error creating product", error)
        if (error.response) {
            console.error("Error response data:", error.response.data)
            console.error("Error response status:", error.response.status)
            console.error("Error response headers:", error.response.headers)
        }
        throw error
    }
}

export const getProduct = async(productId) => {
    try {
        console.log("Getting product")
        
        // Change from POST to GET
        const response = await axios.get(`${BASE_URL}/api/products/${productId}`)
        return response.data
        
    } catch (error) {
        console.error("Error getting product", error)
        throw error
    }
}

export const sendMessage = async(productId, userInput) => {
    try {
        console.log("Sending message to product:", productId)
        
        const response = await axios.post(`${BASE_URL}/api/products/chat/${productId}`, {
            userInput: userInput
        })
        return response.data
        
    } catch (error) {
        console.error("Error sending message", error)
        throw error
    }
}