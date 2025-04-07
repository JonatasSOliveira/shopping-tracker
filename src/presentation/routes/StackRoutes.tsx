import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RoutePaths, Routes } from "./Routes";

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName={RoutePaths.Home}>
      {Routes.map((route) => (
        <Stack.Screen
          key={route.path}
          name={route.path}
          component={route.component}
        />
      ))}
    </Stack.Navigator>
  );
}
