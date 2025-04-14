import "reflect-metadata";
import "react-native-get-random-values";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import StackRoutes from "@/routes/StackRoutes";
import { useAppInit } from "hooks/useAppInit";
import { ActivityIndicator, Text, View } from "react-native";

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
    <NavigationContainer>
      <StatusBar style="auto" />
      <StackRoutes />
    </NavigationContainer>
  );
}
