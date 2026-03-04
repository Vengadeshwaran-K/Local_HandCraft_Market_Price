import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import User from './User.jsx'
import Product from './Product.jsx'
import Login from './Login.jsx'
import Order from './Order.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login/>
    {/* <User/> */}
    {/* <Product /> */}
    {/* <Order /> */}
  </StrictMode>,
)
