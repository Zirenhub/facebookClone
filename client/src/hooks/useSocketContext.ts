import { useContext } from 'react';
import { logOutUser } from '../api/auth';
import { SocketContext } from '../context/socketContext';
import useAuthContext from './useAuthContext';

function useSocketContext() {
  const auth = useAuthContext();
  const context = useContext(SocketContext);

  async function logOut() {
    const res = await logOutUser();
    if (res.status === 'success') {
      auth.dispatch({ type: 'LOGOUT' });
    }
  }

  if (context === null || context.socket === null) {
    logOut();
    throw new Error('Socket Context error');
  }

  return context;
}

export default useSocketContext;
