// Bismillah
import React from "react"
import {Routes, Route } from "react-router-dom"
import Signup from "./components/pages/Authentication/Signup";
import Home from "./components/pages/main/Home";
import Navigator from "./components/parts/Main/Navigator";
import Products from "./components/pages/main/Products";
import ProductsAll from "./components/pages/main/Subs/ProductsAll";
import Bookmark from "./components/pages/main/Bookmark";
import Cart from "./components/pages/main/Cart";
import Main from "./components/pages/Profile/Main";
import ResetPassword from "./components/pages/Profile/ResetPassword";
import Settings from "./components/pages/Profile/Settings";


export default function App() {
  return (
    <>
      <div className="w-screen h-screen flex overflow-hidden">
        <Navigator />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/all" element={<ProductsAll />} />
        <Route path="/bookmarks" element={<Bookmark />} />
        <Route path="/carts" element={<Cart />} />
        <Route path="/profile" element={<Main />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      </div>
    </>
  );
}
