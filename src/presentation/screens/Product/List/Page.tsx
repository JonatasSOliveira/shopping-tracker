import { RoutePaths } from "@/routes/RoutePaths";
import { RootStackParamList } from "@/routes/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import { ListPageTemplate } from "@/components/template/ListPageTemplate/Component";
import { ServiceFacadeProvider } from "@/application/ServiceFacadeProvider";
import { Product } from "@/models/Product";

type ProductListPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  RoutePaths.ProductList
>;

type Props = {
  navigation: ProductListPageNavigationProp;
};

const productService = ServiceFacadeProvider.getLocal().getProductService();

export const ProductListPage = ({ navigation }: Props) => {
  return (
    <ListPageTemplate<Product>
      title="Lista de Produtos"
      fetchItems={() => productService.listAll()}
      onPressAdd={() => navigation.navigate(RoutePaths.ProductForm)}
      addButtonLabel="Novo Produto"
      getItemTitle={(item) => item.getName()}
      onPressItem={(item) =>
        navigation.navigate(RoutePaths.ProductForm, { id: item.getId() })
      }
    />
  );
};
