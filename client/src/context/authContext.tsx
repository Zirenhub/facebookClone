import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import Loading from '../components/Loading';

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
interface AuthContextType {
  user: TUser | null;
  loading: boolean;
  dispatch: React.Dispatch<TAction>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface IState {
  user: TUser | null;
  loading: boolean;
}

type TAction =
  | { type: 'LOGIN'; payload: TUser }
  | { type: 'LOGOUT' }
  | { type: 'LOADING_FALSE' };

type Res = {
  status: 'success' | 'error';
  data: TUser;
};

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
    async function init() {
      async function checkLogged() {
        const res = await fetch('/api/v1/auth/me');
        const { data, status }: Res = await res.json();
        if (status === 'success') {
          dispatch({ type: 'LOGIN', payload: data });
          return data.exp;
        }
        return null;
      }
      try {
        const exp = await checkLogged();
        if (exp) {
          const expDate = new Date(exp * 1000);
          const difference = expDate.getTime() - new Date().getTime();

          setTimeout(() => {
            dispatch({ type: 'LOGOUT' });
          }, difference);
        }
        dispatch({ type: 'LOADING_FALSE' });
      } catch (err) {
        console.log(err);
      }
    }

    init();
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
