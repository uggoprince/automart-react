// context/AuthContext.tsx
import {
  createContext,
  useRef,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { getAuth } from '../utilities/storage';
import { JSONObject } from '../utilities/types';

// Define the context type
interface AuthContextType {
  setAuthUser: (user: JSONObject | null) => void;
  getAuthUser: () => JSONObject | null;
}

// Create the AuthContext with the type, defaulting to null
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

// Provide the AuthContext to the entire app
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<JSONObject | null>(
    getAuth() as JSONObject | null
  );
  // useRef to hold the auth token
  useEffect(() => {
    const storedUser = getAuth();
    setAuth(storedUser as JSONObject | null);
  }, []);
  const authRef = useRef<JSONObject | null>(auth);

  const setAuthUser = (user: JSONObject | null) => {
    authRef.current = user;
  };

  const getAuthUser = () => authRef.current;

  return (
    <AuthContext.Provider value={{ setAuthUser, getAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
