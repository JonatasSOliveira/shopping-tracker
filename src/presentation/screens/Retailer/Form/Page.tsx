import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { RetailerFormDTO } from "@/dtos/retailer/request/Form";
import { Form } from "@/components/organism/Form/Component";
import { ServiceFacadeProvider } from "@/application/ServiceFacadeProvider";
import { RootStackParamList } from "@/routes/RootStackParamList";
import { RoutePaths } from "@/routes/RoutePaths";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RetailerMapper } from "domain/mappers/Retailer";
import { AppLayout } from "@/components/template/AppLayout/Component";

type RetailerFormPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  RoutePaths.RetailerForm
>;

type RetailerFormPageProps = {
  navigation: RetailerFormPageNavigationProp;
};

const retailerService = ServiceFacadeProvider.getCloud().getRetailerService();

const RetailerFormPage = ({ navigation }: RetailerFormPageProps) => {
  const route =
    useRoute<RouteProp<RootStackParamList, RoutePaths.RetailerForm>>();
  const [formData, setFormData] = useState<RetailerFormDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(!!route.params?.id);

  const id = route.params?.id;

  useEffect(() => {
    if (id) {
      retailerService.findById(id).then((retailer) => {
        setFormData(new RetailerMapper().toDTO(retailer));
        setLoading(false);
      });
    } else {
      setFormData(new RetailerFormDTO());
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (data: RetailerFormDTO) => {
    if (id) {
      await retailerService.update(data, id);
    } else {
      await retailerService.create(data);
    }
    navigation.goBack();
  };

  if (loading || !formData) {
    return (
      <AppLayout>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Form data={formData} onSubmit={handleSubmit} />
    </AppLayout>
  );
};

export default RetailerFormPage;
