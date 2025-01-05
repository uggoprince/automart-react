// context/AuthContext.tsx
import {
  createContext,
  useRef,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { getAuth } from "../utilities/storage";

// Define the context type
interface AuthContextType {
  setAuthUser: (user: any) => void;
  getAuthUser: () => any | null;
}

// Create the AuthContext with the type, defaulting to null
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

// Provide the AuthContext to the entire app
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  let storedUser: any = getAuth();
  const [auth, setAuth] = useState(storedUser);
  // const storedUser = getAuth();
  // useRef to hold the auth token
  useEffect(() => {
    storedUser = getAuth();
    setAuth(storedUser);
  }, []);
  const authRef = useRef<any | null>(auth);

  const setAuthUser = (user: any) => {
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
