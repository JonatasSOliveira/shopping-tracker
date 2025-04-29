import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "./Routes";
import { RoutePaths } from "./RoutePaths";

const Stack = createStackNavigator();
const publicRoutes = Routes.filter((route) => route.isPublic);

export function PublicStackRoutes() {
  return (
    <Stack.Navigator initialRouteName={RoutePaths.Login}>
      {publicRoutes.map((route) => (
        <Stack.Screen
          key={route.path}
          name={route.path}
          component={route.component}
        />
      ))}
    </Stack.Navigator>
  );
}
