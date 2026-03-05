import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import './index.css'

import Navbar from './Navbar.jsx'
import Login from './Login.jsx'
import User from './User.jsx'
import Product from './Product.jsx'
import Order from './Order.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<User />} />
        <Route path="/products" element={<Product />} />
        <Route path="/orders" element={<Order />} />
      </Routes>

    </BrowserRouter>
  </StrictMode>
)