import React, { createContext, useCallback, useMemo, useReducer } from 'react';

interface AuthContextProps {
  state: { user: object | null };
  dispatch: React.Dispatch<any>;
}

const AuthContext = createContext<AuthContextProps>({
  state: { user: null },
  dispatch: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const initialState = { user: null };

  const authReducer = (state: typeof initialState, action: any) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, user: action.payload };
      case 'LOGOUT':
        return { ...state, user: null };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback((username: string, password: string) => {
    // dispatch({ type: "LOGIN", payload: loggedInUser });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  const value = useMemo(() => {
    return { state, dispatch: login, logout };
  }, [state, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
