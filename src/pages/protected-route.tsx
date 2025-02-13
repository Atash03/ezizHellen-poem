import { useAuthStore } from '@/store/useAuthStore';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return accessToken ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
