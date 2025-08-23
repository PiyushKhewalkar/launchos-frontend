import './App.css'
import Home from './pages/Home.tsx'
import ProductForm from './pages/ProductForm.tsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductQnA from './pages/ProductQnA.tsx';
import CampaignForm from './pages/CampaignForm.tsx';
import Nav from './components/Nav.tsx';
import Tray from './components/Tray.tsx';


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
    path: "/campaign/:productId",
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
