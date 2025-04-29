import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "hooks/useAuth";
import { ActivityIndicator } from "react-native";
import { GeneralStackRoutes } from "./PrivateStackRoutes";
import { PublicStackRoutes } from "./PublicStackRoutes";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        {user ? <GeneralStackRoutes /> : <PublicStackRoutes />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
