import './App.css'
import Home from './pages/Home.tsx'
import ProductForm from './pages/ProductForm.tsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductQnA from './pages/ProductQnA.tsx';
import CampaignForm from './pages/CampaignForm.tsx';


const router = createBrowserRouter([
  {
    path: "/home",
    element: (
      <>
      <div>
        <Home />
      </div>
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
    path: "/chat",
    element: (
      <>
      <div>
        <ProductQnA />
      </div>
      </>
    )
  },
  {
    path: "/campaign",
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
