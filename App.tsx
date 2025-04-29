import "reflect-metadata";
import "react-native-get-random-values";
import { useAppInit } from "hooks/useAppInit";
import { ActivityIndicator, Text, View } from "react-native";
import RootNavigator from "@/routes/RootNavigator";
import { AuthProvider } from "hooks/useAuth";

export default function App() {
  const isReady = useAppInit();

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Inicializando banco de dados...</Text>
      </View>
    );
  }

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
