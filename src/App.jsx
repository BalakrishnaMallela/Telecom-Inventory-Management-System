import { useState } from 'react'

import './App.css'

import { BrowserRouter,Routes,Route } from 'react-router-dom'

import LoginPage from './components/Login'
import Error from './components/Error'
import Landing from './components/Landing'
import About from './components/About'
import ContactUs from './components/Contact'
// import ContactHub from "./components/Contact"
import RealTimeInventory from './components/RealTimeInventory'
import SuppliersListComponent from "./components/Supplier"
import ProductsSection from "./components/Products"
import DashboardSection from './components/Dashboard'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        
        
        <Route path="/login" element={<LoginPage />} />
       
       <Route path="/about" element={<About/>}/>
       <Route path="/products" element={<ProductsSection/>}/>
       
       <Route path="/error"  element={<Error/>}/>
        <Route path="/" element={<RealTimeInventory />} />
        <Route path="/suppliers" element={<SuppliersListComponent/>}/>
       
       <Route path="/contact" element={<ContactUs/>}/>
       <Route path="/dashboards" element={<DashboardSection/>}/>
       
      
      </Routes>
    </BrowserRouter>
  )
}

export default App
