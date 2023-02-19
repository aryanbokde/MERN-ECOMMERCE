import React from 'react';
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  
  return (
      isAuthenticated === true ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default ProtectedRoutes

