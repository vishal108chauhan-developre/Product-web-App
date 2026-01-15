import React from 'react'
import Nav from './Nav'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Product from './Screen/Product'
import AddProduct from './Screen/AddProduct'
import UpdateProduct from './Screen/UpdateProduct'
import LogOut from './Screen/LogOut'
import Profile from './Screen/Profile'
import Fotter from './Component/Fotter'
import SignUp from './Screen/SignUp'
import PrivateComponent from './Component/PrivateComponent'
import Login from './Screen/Login'
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<PrivateComponent />} >
            <Route path="/" element={<Product />} />
            <Route path="/Add" element={<AddProduct />} />
            <Route path="/Update/:id" element={<UpdateProduct />} />
            <Route path="/LogOut" element={<LogOut />} />
            <Route path="/Profile" element={<Profile />} />
          </Route>


          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Fotter />

    </div>
  )
}

export default App