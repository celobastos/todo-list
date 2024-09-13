import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  // Se não houver token, redireciona para o login
  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
