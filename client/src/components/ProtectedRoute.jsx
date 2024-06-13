// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.user.user);
  
  if (!currentUser) {
    return <Navigate to="/sign-in" />;
  }
  
  return children;
};

export default ProtectedRoute;
