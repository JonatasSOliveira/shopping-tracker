import React from "react";
import { View, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "presentation/routes/RootStackParamList";
import { RoutePaths } from "@/routes/RoutePaths";
import InlineAd from "@/components/InlineAd/Component";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomePage({ navigation }: Props) {
  return (
    <View>
      <InlineAd />
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
