import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { ProductFormDTO } from "@/dtos/product/request/Form";
import { Form } from "@/components/organism/Form/Component";
import { ServiceFacadeProvider } from "@/application/ServiceFacadeProvider";
import { RootStackParamList } from "@/routes/RootStackParamList";
import { RoutePaths } from "@/routes/RoutePaths";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ProductMapper } from "domain/mappers/Product";
import { AppLayout } from "@/components/template/AppLayout/Component";

type ProductFormPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  RoutePaths.ProductForm
>;

type ProductFormPageProps = {
  navigation: ProductFormPageNavigationProp;
};

const productService = ServiceFacadeProvider.getLocal().getProductService();

export function ProductFormPage({ navigation }: ProductFormPageProps) {
  const route =
    useRoute<RouteProp<RootStackParamList, RoutePaths.ProductForm>>();
  const [formData, setFormData] = useState<ProductFormDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(!!route.params?.id);

  const id = route.params?.id;

  useEffect(() => {
    if (id) {
      productService.findById(id).then((product) => {
        setFormData(new ProductMapper().toDTO(product));
        setLoading(false);
      });
    } else {
      setFormData(new ProductFormDTO());
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (data: ProductFormDTO) => {
    if (id) {
      await productService.update(data, id);
    } else {
      await productService.create(data);
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
}
