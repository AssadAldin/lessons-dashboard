import apiClient from "@/apiClient";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import toast from "react-hot-toast";

// Define the AuthContext type
interface AuthContextType {
  user: any | null;
  token: string | null;
  login: (userData: any, tokenData: string) => void;
  logout: () => Promise<void>;
}

// Define the props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Use effect to check for user and token in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  // Login function
  const login = (userData: any, tokenData: string) => {
    setUser(userData);
    setToken(tokenData);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
  };

  // Logout function
  const logout = async () => {
    try {
      const logoutPromise = apiClient.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.promise(
        logoutPromise,
        {
          loading: "Logging out...",
          success: "Logout successful!",
          error: (err) =>
            `Login failed: ${err?.response?.data?.message || "Unknown error"}`,
        },
        {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        },
      );

      await logoutPromise;

      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/auth/signin");
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle error appropriately, such as displaying an error message
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
