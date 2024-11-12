// Bismillah
import React, { useEffect } from "react"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import Login from './components/pages/Admin/Authentication/Login'
import Header from './components/parts/Main/Header'
import AdminNav from './components/parts/Main/AdminNav'
import DashHome from './components/pages/Admin/Main/DashHome'
import Users from './components/pages/Admin/Config/Users'
import UserManage from './components/pages/Admin/Config/UserManage'
import Signup from './components/pages/User/Authentication/Signup'
import Home from './components/pages/User/main/Home'
import Categories from './components/pages/Admin/Config/Categories'
import CategoryManage from './components/pages/Admin/Config/CategoryManage'
import Navigator from './components/parts/Main/Navigator'
import UserProtecter from "./components/pages/User/Authentication/UserProtecter"
import SignDetails from "./components/pages/User/Authentication/signDetails"
import Collections from "./components/pages/Admin/Config/Collections"
import CollectionManage from "./components/pages/Admin/Config/CollectionManage"
import Product from "./components/parts/Cards/Product"
import Products from "./components/pages/User/main/Products"
import ProductManage from "./components/pages/Admin/Config/PrductManage"
import Productes from "./components/pages/Admin/Config/Product"
import ProductPage from './components/pages/User/main/Subs/ProductPage'
import AdminProtucter from "./components/pages/Admin/Authentication/AdminProtucter"
import ResetPassword from "./components/pages/User/Profile/ResetPassword"
import Logout from "./components/pages/User/Profile/Logout"
import ProductReview from "./components/pages/User/main/Subs/ProductReview"
import ProductsAll from "./components/pages/User/main/Subs/ProductsAll"




export default function App() {

  
  const location = useLocation()
  const navigator = useNavigate()
  
  useEffect(()=>{
    if(location.pathname==='/'||location.pathname==='/user'){
      navigator('/user/home')
    }
  },[location])

  return (
    <>

      <div className="w-screen h-screen flex overflow-hidden">
        {location.pathname.startsWith('/user/') && <UserProtecter><Navigator /></UserProtecter>}
        {location.pathname.startsWith('/admin/') && <Header />}
        {location.pathname.startsWith('/admin/') && <AdminNav />}

          <Routes>
            <Route path="/auth/admin/login" element={<AdminProtucter><Login /></AdminProtucter>} />
            <Route path="/admin/home" element={<AdminProtucter><DashHome /></AdminProtucter>} />
            <Route path="/admin/Customers" element={<AdminProtucter><Users /></AdminProtucter>} />
            <Route path="/admin/Customers/manage" element={<AdminProtucter><UserManage /></AdminProtucter>} />
            <Route path="/admin/Category" element={<AdminProtucter><Categories /></AdminProtucter>} />
            <Route path="/admin/Category/manage" element={<AdminProtucter><CategoryManage /></AdminProtucter>} />
            <Route path="/admin/Collection" element={<AdminProtucter><Collections /></AdminProtucter>} />
            <Route path="/admin/Collection/manage" element={<AdminProtucter><CollectionManage /></AdminProtucter>} />
            <Route path="/admin/Products" element={<AdminProtucter><Productes /></AdminProtucter>} />
            <Route path="/admin/Products/manage" element={<AdminProtucter><ProductManage /></AdminProtucter>} />
          </Routes>

        <Routes>
          <Route path="/auth/user/signup" element={ <UserProtecter><Signup /></UserProtecter> } />
          <Route path="/user/home" element={ <UserProtecter><Home /></UserProtecter> } />
          <Route path="/user/products" element={ <UserProtecter><Products /></UserProtecter> } />
          <Route path="/user/productpage" element={ <UserProtecter><ProductPage /></UserProtecter> } />
          <Route path="/user/collection/:name/products" element={ <UserProtecter><ProductsAll /></UserProtecter> } />
          <Route path="/user/productpage/:id/reviews" element={ <UserProtecter><ProductReview /></UserProtecter> } />
          <Route path="/user/profile/:id/logout" element={ <UserProtecter><Logout /></UserProtecter> } />
        </Routes>

      </div>

    </>
  );
}
