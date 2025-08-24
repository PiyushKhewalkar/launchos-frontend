import './App.css'
import Home from './pages/Home.tsx'
import ProductForm from './pages/ProductForm.tsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductQnA from './pages/ProductQnA.tsx';
import CampaignForm from './pages/CampaignForm.tsx';
import Nav from './components/Nav.tsx';
import Tray from './components/Tray.tsx';
import Campaigns from './pages/Campaigns.tsx';
import Products from './pages/Products.tsx';
import CampaignDetails from './components/CampaignDetails.tsx';


const router = createBrowserRouter([
  {
    path: "/home",
    element: (
      <>
      <div className='mx-5'>
        <Nav />
        <Home />
      </div>
      <Tray />
      </>
    )
  },
  {
    path: "/campaigns",
    element: (
      <>
      <div className='mx-5'>
        <Nav />
        <Campaigns />
      </div>
      <Tray />
      </>
    )
  },

  {
    path: "/campaigns/:campaignId",
    element: (
      <>
      <div className='mx-5'>
        <Nav />
        <CampaignDetails />
      </div>
      <Tray />
      </>
    )
  },
  {
    path: "/products",
    element: (
      <>
      <div className='mx-5'>
        <Nav />
        <Products />
      </div>
      <Tray />
      </>
    )
  },
  {
    path: "/productform",
    element: (
      <>
      <div>
        <ProductForm />
      </div>
      </>
    )
  },
  {
    path: "/chat/:productId",
    element: (
      <>
      <div>
        <ProductQnA />
      </div>
      </>
    )
  },
  {
    path: "/campaigns/create/:productId",
    element: (
      <>
      <div>
        <CampaignForm />
      </div>
      </>
    )
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
