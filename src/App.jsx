// Bismillah
import React from "react"
import {Routes, Route } from "react-router-dom"
import Signup from "./components/pages/User/Authentication/Signup";
import Home from "./components/pages/User/main/Home";
import Navigator from "./components/parts/Main/Navigator";
import Products from "./components/pages/User/main/Products";
import ProductsAll from "./components/pages/User/main/Subs/ProductsAll";
import Bookmark from "./components/pages/User/main/Bookmark";
import Cart from "./components/pages/User/main/Cart";
import Main from "./components/pages/User/Profile/Main";
import ResetPassword from "./components/pages/User/Profile/ResetPassword";
import Settings from "./components/pages/User/Profile/Settings";
import Wallet from "./components/pages/User/Profile/Wallet";
import About from "./components/pages/User/Profile/About";
import Logout from "./components/pages/User/Profile/Logout";
import Profiler from "./components/pages/User/Profile/Profiler";
import ProductPage from "./components/pages/User/main/Subs/ProductPage";
import ProductReview from "./components/pages/User/main/Subs/ProductReview";
import OrderSummary from "./components/pages/User/main/Subs/OrderSummary";
import OrderSuccess from "./components/pages/User/main/Subs/OrderSuccess";
import OrderPayment from "./components/pages/User/main/Subs/OrderPayment";
import OrderList from "./components/pages/User/Profile/OrderList";
import CouponsList from "./components/pages/User/Profile/CouponsList";




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
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/about" element={<About />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profiler" element={<Profiler />} />
        <Route path="/profilepage" element={<ProductPage />} />
        <Route path="/ProductReview" element={<ProductReview />} />
        <Route path="/order" element={<OrderSummary />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/payment" element={<OrderPayment />} />
        <Route path="/list" element={<CouponsList />} />


      </Routes>
      </div>
    </>
  );
}
