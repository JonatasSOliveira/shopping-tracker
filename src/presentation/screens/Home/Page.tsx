import React from "react";
import { View, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "presentation/routes/RootStackParamList";
import { RoutePaths } from "@/routes/Routes";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomePage({ navigation }: Props) {
  return (
    <View>
      <Button
        title="Abrir Scanner"
        onPress={() => navigation.navigate(RoutePaths.Scanner)}
      />
      <Button
        title="Abrir tela de Comércios"
        onPress={() => navigation.navigate(RoutePaths.Retailer)}
      />
    </View>
  );
}
