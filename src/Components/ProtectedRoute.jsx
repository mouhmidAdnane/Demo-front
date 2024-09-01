import React from 'react';
import { Route, Navigate, Outlet , useLocation} from 'react-router-dom';
import { useAuthContext } from '../Context/AuthProvider';

const ProtectedRoute = ({ element: Element, requiredRole, ...rest }) => {
  const { user } = useAuthContext();
  const location = useLocation();

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && !user.roles.includes(requiredRole)) {
    // Redirect to unauthorized page if the user does not have the required role
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return Element;
};

export default ProtectedRoute;
