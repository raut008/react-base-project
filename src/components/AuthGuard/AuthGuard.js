import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { isUserAuthenticated } from '../../utils/authUtils';

export const AuthGuard = ({ element, isProtected }) => {
  const isAuthenticated = isUserAuthenticated();
  const location = useLocation();

  if (isProtected && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (isAuthenticated && location.pathname === '/login') {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return element;
};
