import React from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "presentation/routes/RootStackParamList";
import { RoutePaths } from "@/routes/RoutePaths";
import { AppLayout } from "@/components/template/AppLayout/Component";
import { useAuth } from "hooks/useAuth";
import { ServiceFacadeProvider } from "@/application/ServiceFacadeProvider";

type HomePageNavigationProp = StackNavigationProp<
  RootStackParamList,
  RoutePaths.Home
>;

type Props = {
  navigation: HomePageNavigationProp;
};

const authService = ServiceFacadeProvider.getCloud().getAuthService();

const HomePage = ({ navigation }: Props) => {
  const { refreshSession } = useAuth();

  const handleLogout = async () => {
    await authService.signOut();
    await refreshSession();
  };

  return (
    <AppLayout>
      <TouchableOpacity
        className="bg-blue-500 w-[100%] py-4 px-2 flex justify-center items-center rounded-md"
        onPress={() => navigation.navigate(RoutePaths.Scanner)}
      >
        <Text className="font-bold color-white">Abrir Scanner</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-blue-500 w-[100%] py-4 px-2 flex justify-center items-center rounded-md"
        onPress={() => navigation.navigate(RoutePaths.RetailerList)}
      >
        <Text className="font-bold color-white">Comércios</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-blue-500 w-[100%] py-4 px-2 flex justify-center items-center rounded-md"
        onPress={() => navigation.navigate(RoutePaths.ProductList)}
      >
        <Text className="font-bold color-white">Produtos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-blue-500 w-[100%] py-4 px-2 flex justify-center items-center rounded-md"
        onPress={() => navigation.navigate(RoutePaths.PurchaseList)}
      >
        <Text className="font-bold color-white">Compras</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-blue-500 w-[100%] py-4 px-2 flex justify-center items-center rounded-md"
        onPress={handleLogout}
      >
        <Text className="font-bold color-white">Deslogar</Text>
      </TouchableOpacity>
    </AppLayout>
  );
};

export default HomePage;
