import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout, useCurrentToken } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';

const ProtectedRoute = ({ children, role }) => {
  const token = useSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  const dispatch = useDispatch();

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
