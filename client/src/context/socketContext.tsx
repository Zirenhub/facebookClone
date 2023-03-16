import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import useAuthContext from '../hooks/useAuthContext';

const SocketContext = createContext<Socket | null>(null);

function SocketContextProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);

  const auth = useAuthContext();

  useEffect(() => {
    const newSocket = io(`http://localhost:${__PORT__}`, {
      autoConnect: false,
      auth: { id: auth.user?._id },
      withCredentials: true,
    });
    newSocket.connect();

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
      newSocket.off();
    };
  }, [auth]);

  const ProviderValue = useMemo(() => socket, [socket]);

  return (
    <SocketContext.Provider value={ProviderValue}>
      {children}
    </SocketContext.Provider>
  );
}

export { SocketContextProvider, SocketContext };
