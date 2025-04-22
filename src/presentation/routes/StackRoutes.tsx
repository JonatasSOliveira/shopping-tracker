import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "./Routes";
import { RoutePaths } from "./RoutePaths";

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName={RoutePaths.Login}>
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
