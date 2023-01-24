import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { checkAuth } from '../api/auth';
import Loading from '../components/Loading';

type TUser = {
  __v: number;
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  exp: number;
  ait: number;
  createdAt: string;
  updatedAt: string;
};
interface ContextType {
  user: TUser | null;
  loading: boolean;
  dispatch: React.Dispatch<TAction>;
}

const AuthContext = createContext<ContextType | null>(null);

interface IState {
  user: TUser | null;
  loading: boolean;
}

type TAction =
  | { type: 'LOGIN'; payload: TUser }
  | { type: 'LOGOUT' }
  | { type: 'LOADING_FALSE' };

function AuthReducer(state: IState, action: TAction) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'LOADING_FALSE':
      return { ...state, loading: false };

    default:
      return state;
  }
}

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: null,
    loading: true,
  });

  useEffect(() => {
    async function checkLogged() {
      const res = await checkAuth();
      if (res.status === 'success') {
        dispatch({ type: 'LOGIN', payload: res.data });
      }
      dispatch({ type: 'LOADING_FALSE' });
    }

    checkLogged();
  }, []);

  const ProviderValue = useMemo(() => ({ ...state, dispatch }), [state]);

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
