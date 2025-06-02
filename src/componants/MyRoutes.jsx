import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Dishes from './Dishes'
import Cart from './Cart'
import Order from './Order'
import Profile from './Profile'
import Login from './Login'
import Register from './Register'

const MyRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/dishes' element={<Dishes/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/order' element={<Order/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
        </Routes>
    </>
  )
}

export default MyRoutes