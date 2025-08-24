import axios from "axios"

const BASE_URL = "https://launchos-backend.onrender.com"

// TypeScript interfaces
export interface Campaign {
    _id: string;
    name: string;
    description: string;
    status: string;
    channels: string[];
    launchType: string;
    keywords: string[];
    productId: string;
    launchScripts: any[];
    createdAt: string;
    updatedAt: string;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    // Add other product properties as needed
}

// get campaigns
export const getCampaigns = async(): Promise<Campaign[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/api/campaigns`)
        console.log(response)
        return response.data
    } catch (error: any) {
        console.error("Error getting campaigns", error)
        throw error
    }
}

// get campaign
export const getCampaign = async({campaignId}: {campaignId: string}): Promise<any> => {
    try {
        const response = await axios.get(`${BASE_URL}/api/campaigns/${campaignId}`)
        return response.data
    } catch (error: any) {
        console.error("Error getting campaign", error)
        throw error
    }
}

// get products
export const getProducts = async(): Promise<any> => {
    try {
        const response = await axios.get(`${BASE_URL}/api/products`)
        return response.data
    } catch (error: any) {
        console.error("Error getting products", error)
        throw error
    }
}

// get product
export const getProduct = async(productId: string): Promise<any> => {
    try {
        console.log("Getting product")
        
        // Change from POST to GET
        const response = await axios.get(`${BASE_URL}/api/products/${productId}`)
        return response.data
    } catch (error: any) {
        console.error("Error getting product", error)
        throw error
    }
}

export const createProduct = async({productInfo}: {productInfo: any}): Promise<any> => {
    try {
        console.log("Sending payload:", productInfo)
        const response = await axios.post(`${BASE_URL}/api/products`, productInfo)
        return response.data
    } catch (error: any) {
        console.error("Error creating product", error)
        if (error.response) {
            console.error("Error response data:", error.response.data)
            console.error("Error response status:", error.response.status)
            console.error("Error response headers:", error.response.headers)
        }
        throw error
    }
}

export const sendMessage = async(productId: string, userInput: string): Promise<any> => {
    try {
        console.log("Sending message to product:", productId)
        
        const response = await axios.post(`${BASE_URL}/api/products/chat/${productId}`, {
            userInput: userInput
        })
        return response.data
    } catch (error: any) {
        console.error("Error sending message", error)
        throw error
    }
}

export const skipChat = async(productId: string): Promise<any> => {
    try {
        const response = await axios.get(`${BASE_URL}/api/products/chat/skip/${productId}`)
        return response.data
    } catch (error: any) {
        console.error("Error skipping chat", error)
        throw error
    }
}