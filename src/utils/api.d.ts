declare module "@/utils/api.js" {
  export interface ProductInfo {
    brandName: string;
    problemItSolves: string;
    features: string;
    audience: string;
  }

  export const createProduct: (params: { productInfo: ProductInfo }) => Promise<any>;
} 