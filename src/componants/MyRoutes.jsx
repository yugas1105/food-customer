import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Dishes from './Dishes'
import Cart from './Cart'
import Order from './Order'
import Profile from './Profile'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'

const MyRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dishes' element={<Dishes />} />
        <Route path='/cart' element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path='/order' element={<Order />} />
        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default MyRoutes