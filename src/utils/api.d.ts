declare module "@/utils/api.js" {
  export interface ProductInfo {
    name: string;
    problemItSolves: string;
    features: string;
    targetAudience: string;
    reviews: string;
    faqs: string;
  }

  export const createProduct: (params: { productInfo: ProductInfo }) => Promise<any>;
  export const getProduct: (productId: string) => Promise<any>;
  export const sendMessage: (productId: string, userInput: string) => Promise<any>;
} 