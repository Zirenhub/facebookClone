import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { logInUser, logOutUser, signUpUser } from '../api/auth';
import Loading from '../components/Loading';
import { UserSignUp } from '../types/UserSignUp';

type TUser = {
  __v: number;
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: string;
  birthday: string;
  exp: number;
  ait: number;
  createdAt: string;
  updatedAt: string;
};

interface IState {
  user: TUser | null;
  socket: Socket | null;
  loading: boolean;
}
interface AuthContextType extends IState {
  dispatch: React.Dispatch<TAction>;
  logOut: () => Promise<
    | {
        status: string;
        message: null;
      }
    | {
        status: string;
        message: string;
      }
  >;
  logIn: (
    email: string,
    password: string
  ) => Promise<
    | {
        status: string;
        message: null;
      }
    | {
        status: string;
        message: string;
      }
  >;
  register: (userInfo: UserSignUp) => Promise<
    | {
        status: string;
        message: null;
      }
    | {
        status: string;
        message: string;
      }
  >;
}

type TAction =
  | { type: 'LOGIN'; payload: { user: TUser; socket: Socket } }
  | { type: 'LOGOUT' }
  | { type: 'LOADING_FALSE' };

type Res = {
  status: 'success' | 'error';
  data: TUser;
};

const AuthContext = createContext<AuthContextType | null>(null);

function AuthReducer(state: IState, action: TAction) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        socket: action.payload.socket,
      };
    case 'LOGOUT':
      return { ...state, user: null, socket: null };

    case 'LOADING_FALSE':
      return { ...state, loading: false };

    default:
      return state;
  }
}

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: null,
    socket: null,
    loading: true,
  });

  function connect(id: string) {
    const newSocket = io(`http://localhost:${__PORT__}`, {
      auth: { id },
      withCredentials: true,
    });
    return newSocket;
  }

  async function checkLogged() {
    const res = await fetch('/api/v1/auth/me');
    const { data, status }: Res = await res.json();
    if (status === 'success') {
      return data;
    }
    return null;
  }

  const init = useCallback(async () => {
    const user = await checkLogged();
    if (user) {
      const socket = connect(user._id);
      dispatch({ type: 'LOGIN', payload: { user, socket } });
      const expDate = new Date(user.exp * 1000);
      const difference = expDate.getTime() - new Date().getTime();

      setTimeout(() => {
        dispatch({ type: 'LOGOUT' });
      }, difference);
    }
    dispatch({ type: 'LOADING_FALSE' });
    return null;
  }, []);

  const logOut = useCallback(async () => {
    try {
      await logOutUser();
      state.socket?.disconnect();
      state.socket?.off();
      dispatch({ type: 'LOGOUT' });
      return { status: 'ok', message: null };
    } catch (err) {
      if (err instanceof Error) {
        return { status: 'error', message: err.message };
      }
      return { status: 'error', message: null };
    }
  }, [state.socket]);

  const logIn = useCallback(
    async (email: string, password: string) => {
      try {
        await logInUser(email, password);
        await init();
        return { status: 'ok', message: null };
      } catch (err) {
        if (err instanceof Error) {
          return { status: 'error', message: err.message };
        }
        return { status: 'error', message: null };
      }
    },
    [init]
  );

  const register = useCallback(
    async (userInfo: UserSignUp) => {
      try {
        await signUpUser(userInfo);
        return await logIn(userInfo.email, userInfo.password);
      } catch (err) {
        if (err instanceof Error) {
          return { status: 'error', message: err.message };
        }
        return { status: 'error', message: null };
      }
    },
    [logIn]
  );

  useEffect(() => {
    init();
  }, [init]);

  const ProviderValue = useMemo(
    () => ({ ...state, dispatch, logOut, logIn, register }),
    [state, logOut, logIn, register]
  );

  if (state.loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={ProviderValue}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider, AuthContext };
