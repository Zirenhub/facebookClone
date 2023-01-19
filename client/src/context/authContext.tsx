import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

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
  dispatch: React.Dispatch<TAction>;
}

const AuthContext = createContext<ContextType | null>(null);

interface IState {
  user: TUser | null;
}

type TAction = { type: 'LOGIN'; payload: TUser } | { type: 'LOGOUT' };

function AuthReducer(state: IState, action: TAction) {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };

    default:
      return state;
  }
}

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(AuthReducer, { user: null });

  const ProviderValue = useMemo(() => ({ ...state, dispatch }), [state]);

  useEffect(() => {
    async function checkLogIn() {
      const res = await fetch('/api/v1/auth/me');
      const resData = await res.json();
      if (resData.status === 'success') {
        dispatch({ type: 'LOGIN', payload: resData.data });
      }
    }

    checkLogIn();
  }, []);

  return (
    <AuthContext.Provider value={ProviderValue}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider, AuthContext };
