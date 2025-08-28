import { BrowserRouter as Router, Routes, Route, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Checkout from "./components/Checkout";
import { createBrowserRouter } from "react-router-dom";
import Header from "./pages/Header";
// import Products from "./pages/products.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.js";

const router=createBrowserRouter(
  [
    {
      path:'/',
      element:
      <div>
        <Home/>
      </div>
      
    },
     {
      path:'/about',
      element:<div>
        <Header/>
        <About/>
      </div>
    },
    {
      path:'/products',
      element:<div>
        <Header/>
        <Products/>
      </div>

    },
    {
      path:'/product/:id',
      element:<div>
        <Header/>
        <ProductDetail/>
      </div>
    },
    
     {
      path:'/contact',
      element:<div>
        <Header/>
        <Contact/>
      </div>
    },
     {
    path: "/cart",   // <-- Cart route
    element: <div>
      <Header/>
      <Cart/>
    </div>
  },
     {
      path:'/checkout',
      element:<div>
        <Header/>
        <Checkout/>
      </div>
    }
    

  ]
)

function App() {
  return (
   <RouterProvider router={router}/>
  );
}

export default App;