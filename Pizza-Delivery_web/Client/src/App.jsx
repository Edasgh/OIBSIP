import {
  createBrowserRouter,
  /*This is the recommended router for all React Router web projects. It uses the DOM(Document Object Model) History API to update the URL and manage the history stack.
It also enables the v6.4 data APIs like loaders, actions, fetchers and more. */
  RouterProvider,
  /*All data router objects are passed to this component to render your app and enable the rest of the data APIs. */
  Outlet,
  /* An '<Outlet>' should be used in parent route elements to render their child route elements. This allows nested UI to show up when child routes are rendered. If the parent route matched exactly, it will render a child index route or nothing if there is no index route. */
  // Route ,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import AddProduct from "./components/Dashboard/AddProduct/AddProduct";
import Login from "./components/Auth/Login/Login";
import SignUp from "./components/Auth/SignUp/SignUp";
import ProfileNav from "./components/Dashboard/ProfileNav/ProfileNav";
import Profile from "./components/Dashboard/Profile/Profile";
import Cart from "./components/Dashboard/Cart/Cart";
import Orders from "./components/Dashboard/Orders/Orders";


const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

const DashboardLayOut=()=>{
  return(
    <>
    <div className="profile-div flex-container">
      <ProfileNav/>
        <div className="profile-div-content">
          <Outlet/>
        </div>
      </div>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    //the Layout function is passed here as an element (that function is created to return a layout )
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/product",
        element: <Product />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/profile_dashboard",
        element: <DashboardLayOut/> ,
        children:[
          {
            path:"",
            element:<Profile/>
          },
          {
            path:"/profile_dashboard/cart",
            element:<Cart/>
          },
          {
            path:"/profile_dashboard/orders",
            element:<Orders/>
          },
          {
            path:"/profile_dashboard/add_product",
            element:<AddProduct/>
          }
        ]
      }
    ],
  },
]);


const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
