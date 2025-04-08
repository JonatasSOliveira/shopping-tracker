import { ServiceFacadeProvider } from "@/application/ServiceFacadeProvider";
import { AppLayout } from "@/components/AppLayout/Component";
import { Retailer } from "@/models/Retailer";
import { RootStackParamList } from "@/routes/RootStackParamList";
import { RoutePaths } from "@/routes/RoutePaths";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

type RetailerListPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  RoutePaths.RetailerList
>;

type Props = {
  navigation: RetailerListPageNavigationProp;
};

const retailerService = ServiceFacadeProvider.getLocal().getRetailerService();

export const RetailerListPage = ({ navigation }: Props) => {
  const [retailers, setRetailers] = useState<Retailer[]>([]);

  useEffect(() => {
    retailerService.listAll().then((retailers) => {
      setRetailers(retailers);
    });
  }, []);

  return (
    <AppLayout>
      <Text>Lista de Comércios</Text>
      <View style={{ flex: 1 }}>
        {retailers.map((retailer) => (
          <View key={retailer.getId()}>
            <Text>{retailer.getName()}</Text>
          </View>
        ))}
      </View>
      <Button
        title="Novo Comércio"
        onPress={() => navigation.navigate(RoutePaths.RetailerForm)}
      />
    </AppLayout>
  );
};
