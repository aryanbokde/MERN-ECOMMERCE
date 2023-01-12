
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  return (
        !loading && isAuthenticated ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default ProtectedRoutes
