import { ServiceFacadeProvider } from "@/application/ServiceFacadeProvider";
import { AppLayout } from "@/components/AppLayout/Component";
import { Retailer } from "@/models/Retailer";
import { RootStackParamList } from "@/routes/RootStackParamList";
import { RoutePaths } from "@/routes/RoutePaths";
import { useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";

type RetailerListPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  RoutePaths.RetailerList
>;

type RetailerListPageProps = {
  navigation: RetailerListPageNavigationProp;
};

const retailerService = ServiceFacadeProvider.getLocal().getRetailerService();

export const RetailerListPage = ({ navigation }: RetailerListPageProps) => {
  const [retailers, setRetailers] = useState<Retailer[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchRetailers = async () => {
        const result = await retailerService.listAll();
        setRetailers(result);
      };

      fetchRetailers();
    }, []),
  );

  return (
    <AppLayout>
      <Text>Lista de Comércios</Text>
      <View style={{ flex: 1 }}>
        {retailers.map((retailer) => (
          <TouchableOpacity
            key={retailer.getId()}
            onPress={() =>
              navigation.navigate(RoutePaths.RetailerForm, {
                id: retailer.getId(),
              })
            }
          >
            <Text>{retailer.getName()}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button
        title="Novo Comércio"
        onPress={() => navigation.navigate(RoutePaths.RetailerForm)}
      />
    </AppLayout>
  );
};
