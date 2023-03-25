import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Navigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import GetOnlineFriends from '../types/SocketIo';
import { AuthContext } from './authContext';

type SocketContextT = {
  socket: Socket | null;
  getOnlineFriends: (callback: (data: string[]) => void) => void;
};

const SocketContext = createContext<SocketContextT | null>(null);

function SocketContextProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);

  const auth = useContext(AuthContext);
  if (!auth || !auth.user) {
    <Navigate to="/" replace />;
  }

  const getOnlineFriends = useMemo(() => {
    return (callback: (data: string[]) => void) => {
      socket?.emit(
        'get-online-friends',
        ({ status, data }: GetOnlineFriends) => {
          if (status === 'OK' && Array.isArray(data)) {
            callback(data);
          } else if (typeof data === 'string') {
            // handle error
          }
        }
      );
    };
  }, [socket]);

  useEffect(() => {
    function connect(id: string | undefined) {
      if (id) {
        const newSocket = io(`http://localhost:${__PORT__}`, {
          auth: { id },
          withCredentials: true,
        });
        return newSocket;
      }
      return null;
    }

    const connectedSocket = connect(auth?.user?._id);
    if (connectedSocket) {
      setSocket(connectedSocket);
    }

    return () => {
      connectedSocket?.disconnect();
      connectedSocket?.off();
    };
  }, [auth]);

  const ProviderValue = useMemo(
    () => ({ socket, getOnlineFriends }),
    [socket, getOnlineFriends]
  );

  return (
    <SocketContext.Provider value={ProviderValue}>
      {children}
    </SocketContext.Provider>
  );
}

export { SocketContextProvider, SocketContext };
