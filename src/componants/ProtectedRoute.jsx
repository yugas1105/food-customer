import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    let { isLogin } = useSelector((state) => state.user)

    if (!isLogin) {
        return <Navigate to="/login" replace />
    }
    return children
}

export default ProtectedRoute