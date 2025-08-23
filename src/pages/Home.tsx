import { useNavigate } from "react-router-dom";
import Greeting from "@/components/Greeting";
import CampaignList from "@/components/CampaignList";
import ProductList from "@/components/ProductList";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Greeting />
      <CampaignList />
      <div className="h-[1px] bg-muted my-5 w-[30%] mx-auto"></div>
      <ProductList />
    </div>

    // navbar

    // greeting
    // subtitle

    // Campaigns Heading and new campaign button
    // campaigns subheading
    // campaigb search bar
    // campaign horizontal cards

    // product heading // new product button
    // product subheading
    // product search bar
    // product horizontal cards

    // for new user -> 3 step process showing add product - create a campaign - done

    // for partial user -> Show product layout, below step 2

    // tray: Home, campaigns, New Campaign, products, user profile
  );
};

export default Home;
