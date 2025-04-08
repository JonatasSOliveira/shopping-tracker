import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "./Routes";

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName={Routes.find((r) => r.initial)?.path}>
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
