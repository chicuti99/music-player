import { Navigate, Outlet } from 'react-router-dom';
import { IsPrivate } from '../../utils/interfaces';

function PrivateRoute({ isPrivate }:IsPrivate) {
  const isAuthenticated = !!localStorage.getItem('isAuthorized'); 

  if (isPrivate && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
