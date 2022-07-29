import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import RequireRole from "./features/auth/RequireRole";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import RequireAuth from "./features/auth/RequireAuth";

import EditProduct from "./features/products/EditProduct";
import Cart from "./features/cart/Cart";
import { MyProfile } from "./features/auth/MyProfile";
import Sidenav from "./components/Sidenav";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Auth />} />
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route element={<RequireAuth />}>
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          {/* protected routes for admin oonly  */}
          <Route element={<RequireRole />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product/:id" element={<EditProduct />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
