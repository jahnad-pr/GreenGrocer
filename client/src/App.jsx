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
import Navigator from './components/parts/Main/Navigator'
import ProtectedRoute from "./components/pages/User/Authentication/ProtectedUser"
import SignDetails from "./components/pages/User/Authentication/signDetails"




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

        <Route path="/auth/user/signup" element={<ProtectedRoute sign={true} ><Signup /></ProtectedRoute>} />
        <Route path="/user/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/user/sign" element={<ProtectedRoute><SignDetails /></ProtectedRoute>} />


      </Routes>
      </div>
    </>
  );
}
