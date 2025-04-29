import { ServiceFacadeProvider } from "@/application/ServiceFacadeProvider";
import { UserSessionDTO } from "@/dtos/user/Session";
import { AuthPortIn } from "@/ports/in/Auth";
import React, { createContext, useContext, useEffect, useState } from "react";

const sessionService: AuthPortIn =
  ServiceFacadeProvider.getCloud().getAuthService();

type AuthContextData = {
  user: UserSessionDTO | null;
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextData>({
  user: null,
  loading: true,
  error: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserSessionDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await sessionService.getSession();
        setUser(session);
      } catch (error) {
        console.error("Erro ao obter sessão:", error);
        setUser(null);
        setError("Não foi possível recuperar a sessão. Tente novamente.");
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
