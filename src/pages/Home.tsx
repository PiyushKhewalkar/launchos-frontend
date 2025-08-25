import { useState, useEffect } from "react";
import Greeting from "@/components/Greeting";
import CampaignList from "@/components/CampaignList";
import ProductList from "@/components/ProductList";
import Onboarding from "@/components/Onboarding";
import { getProducts, getCampaigns } from "@/utils/api";
import type { Product, Campaign } from "@/utils/api";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, campaignsData] = await Promise.all([
          getProducts(),
          getCampaigns()
        ]);
        console.log("Home - productsData:", productsData);
        console.log("Home - campaignsData:", campaignsData);
        console.log("Home - productsData type:", typeof productsData);
        console.log("Home - campaignsData type:", typeof campaignsData);
        console.log("Home - productsData isArray:", Array.isArray(productsData));
        console.log("Home - campaignsData isArray:", Array.isArray(campaignsData));
        
        // Handle different response formats
        const processedProducts = productsData?.products && Array.isArray(productsData.products) 
          ? productsData.products 
          : Array.isArray(productsData) 
            ? productsData 
            : [];
        const processedCampaigns = Array.isArray(campaignsData) ? campaignsData : [];
        
        console.log("Home - processedProducts.length:", processedProducts.length);
        console.log("Home - processedCampaigns.length:", processedCampaigns.length);
        
        setProducts(processedProducts);
        setCampaigns(processedCampaigns);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("Home - products.length:", products.length, "campaigns.length:", campaigns.length);

  if (loading) {
    return (
      <div className="pb-20">
        <Greeting />
        <div className="flex justify-center items-center h-64">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pb-20">
        <Greeting />
        <div className="flex justify-center items-center h-64">
          <div className="text-destructive">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <Greeting />
      
      {/* Show onboarding for new users or users with products but no campaigns */}
      {((products.length === 0 && campaigns.length === 0) || (products.length > 0 && campaigns.length === 0)) && (
        <Onboarding products={products} campaigns={campaigns} />
      )}

      {/* Show full interface when campaigns exist (with or without products) */}
      {campaigns.length > 0 && (
        <>
          <CampaignList campaigns={campaigns} />
          <div className="h-[1px] bg-muted my-5 w-[30%] mx-auto"></div>
          <ProductList products={products} />
        </>
      )}
    </div>
  );
};

export default Home;
