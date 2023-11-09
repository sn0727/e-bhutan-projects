import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
const ProtectedRoute = () => {
    const auth = sessionStorage.getItem("token");
    return auth ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute
