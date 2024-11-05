// Bismillah
import React from "react"
import {Routes, Route, useLocation } from "react-router-dom"
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
import ProtectedRoute from "./components/pages/User/Authentication/ProtectedUser"
import SignDetails from "./components/pages/User/Authentication/signDetails"
import Collections from "./components/pages/Admin/Config/Collections"
import CollectionManage from "./components/pages/Admin/Config/CollectionManage"
import Product from "./components/parts/Cards/Product"
import Products from "./components/pages/User/main/Products"
import ProductManage from "./components/pages/Admin/Config/PrductManage"
import Productes from "./components/pages/Admin/Config/Product"




export default function App() {

  const location = useLocation()

  return (
    <>
      <div className="w-screen h-screen flex overflow-hidden">
        { location.pathname.startsWith('/user/') &&  <Navigator />  }
        { location.pathname.startsWith('/admin/') &&  <Header />  }
        { location.pathname.startsWith('/admin/') &&  <AdminNav />  }
      <Routes>

        <Route path="/auth/admin/login" element={<Login />} />
        <Route path="/admin/home" element={<DashHome />} />
        <Route path="/admin/Customers" element={<Users />} />
        <Route path="/admin/Customers/manage" element={<UserManage />} />
        <Route path="/admin/Category" element={<Categories />} />
        <Route path="/admin/Category/manage" element={<CategoryManage />} />
        <Route path="/admin/Collection" element={<Collections />} />
        <Route path="/admin/Collection/manage" element={<CollectionManage />} />
        <Route path="/admin/Products" element={<Productes />} />
        <Route path="/admin/Products/manage" element={<ProductManage />} />


        <Route path="/auth/user/signup" element={<ProtectedRoute sign={true} ><Signup /></ProtectedRoute>} />
        <Route path="/user/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/user/sign" element={<ProtectedRoute><SignDetails /></ProtectedRoute>} />
        <Route path="/user/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />


      </Routes>
      </div>
    </>
  );
}
