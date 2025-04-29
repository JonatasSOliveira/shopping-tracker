import React, { ReactNode, useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, Button } from "react-native";
import { RootStackParamList } from "@/routes/RootStackParamList";
import { useAuth } from "hooks/useAuth";
import { RoutePaths } from "@/routes/RoutePaths";

interface ProtectedRouteProps {
  children: ReactNode;
  navigation: StackNavigationProp<RootStackParamList>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  navigation,
}) => {
  const { user, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      setError("Você precisa estar logado para acessar esta página.");

      navigation.navigate(RoutePaths.Login);
    }
  }, [user, loading, navigation]);

  if (loading) return <Text>Carregando...</Text>;

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
        <Button
          title="Ir para o Login"
          onPress={() => navigation.navigate(RoutePaths.Login)}
        />
      </View>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
