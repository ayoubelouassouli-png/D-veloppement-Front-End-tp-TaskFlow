import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode
} from "react";

import {
  authReducer,
  initialState,
  type AuthState,
  type AuthAction
} from "./authReducer";

import { setAuthToken } from "../../api/axios";

interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    setAuthToken(state.token);
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

/*
ANCIEN HOOK*/
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
