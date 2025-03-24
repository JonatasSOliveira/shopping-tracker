import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import StackRoutes from "./src/presentation/routes/StackRoutes";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <StackRoutes />
    </NavigationContainer>
  );
}
