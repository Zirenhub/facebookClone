import { Navigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const auth = useAuthContext();
  return auth.user ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
