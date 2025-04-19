import React from "react";
import { Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "presentation/routes/RootStackParamList";
import { RoutePaths } from "@/routes/RoutePaths";
import { AppLayout } from "@/components/template/AppLayout/Component";

type HomePageNavigationProp = StackNavigationProp<
  RootStackParamList,
  RoutePaths.Home
>;

type Props = {
  navigation: HomePageNavigationProp;
};

export function HomePage({ navigation }: Props) {
  return (
    <AppLayout>
      <Button
        title="Abrir Scanner"
        onPress={() => navigation.navigate(RoutePaths.Scanner)}
      />
      <Button
        title="Comércios"
        onPress={() => navigation.navigate(RoutePaths.RetailerList)}
      />
      <Button
        title="Produtos"
        onPress={() => navigation.navigate(RoutePaths.ProductList)}
      />
      <Button
        title="Compras"
        onPress={() => navigation.navigate(RoutePaths.PurchaseList)}
      />
    </AppLayout>
  );
}
