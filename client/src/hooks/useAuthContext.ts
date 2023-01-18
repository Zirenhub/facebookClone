import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Auth Context error');
  }

  return context;
}

export default useAuthContext;
