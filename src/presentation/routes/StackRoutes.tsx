import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "@screens/Login/Page";
import HomePage from "@screens/Home/Page";
import ScannerPage from "@screens/Scanner/Page";

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Scanner" component={ScannerPage} />
    </Stack.Navigator>
  );
}
