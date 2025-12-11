import React from 'react';
import { Navigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoadingAuth } = useData();

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-eko-black text-white flex items-center justify-center">
        <div className="text-xl animate-pulse">Verifying Access...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
