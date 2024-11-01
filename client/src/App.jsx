// Bismillah
import React from "react"
import {Routes, Route, useLocation } from "react-router-dom"




export default function App() {

  const location = useLocation()

  return (
    <>
      <div className="w-screen h-screen flex overflow-hidden">
        { location.pathname.startsWith('/user') &&  <Navigator />  }
        { location.pathname.startsWith('/admin/') &&  <Header />  }
        { location.pathname.startsWith('/admin/') &&  <AdminNav />  }
      <Routes>

        <Route path="/admin/products" element={<Categories />} />

      </Routes>
      </div>
    </>
  );
}
