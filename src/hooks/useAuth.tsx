import React, { createContext, useContext, useState, useEffect } from "react";
import { UserSessionDTO } from "@/dtos/user/Session";
import { ServiceFacadeProvider } from "@/application/ServiceFacadeProvider";

const sessionService = ServiceFacadeProvider.getCloud().getAuthService();

type AuthContextData = {
  user: UserSessionDTO | null;
  loading: boolean;
  error: string | null;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({
  user: null,
  loading: true,
  error: null,
  refreshSession: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserSessionDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSession = async () => {
    try {
      const session = await sessionService.getSession();
      setUser(session);
      setError(null);
    } catch (error) {
      console.error("Error fetching session:", error);
      setUser(null);
      setError("Could not retrieve the session. Try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const refreshSession = async () => {
    setLoading(true);
    await fetchSession();
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
