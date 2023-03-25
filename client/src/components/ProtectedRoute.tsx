import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const context = useContext(AuthContext);

  if (context && context.user) {
    return children;
  }

  return <Navigate to="/" replace />;
}

export default ProtectedRoute;
