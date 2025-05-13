import { RoutePaths } from "@/routes/RoutePaths";
import { RootStackParamList } from "@/routes/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import { ListPageTemplate } from "@/components/template/ListPageTemplate/Component";
import { ServiceFacadeProvider } from "@/application/ServiceFacadeProvider";
import { Retailer } from "@/models/Retailer";

type RetailerListPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  RoutePaths.RetailerList
>;

type Props = {
  navigation: RetailerListPageNavigationProp;
};

const retailerService = ServiceFacadeProvider.getCloud().getRetailerService();

const RetailerListPage = ({ navigation }: Props) => {
  return (
    <ListPageTemplate<Retailer>
      title="Lista de Comércios"
      fetchItems={() => retailerService.listAll()}
      onPressAdd={() => navigation.navigate(RoutePaths.RetailerForm)}
      addButtonLabel="Novo Comércio"
      getItemTitle={(item) => item.getName()}
      onPressItem={(item) =>
        navigation.navigate(RoutePaths.RetailerForm, { id: item.getId() })
      }
    />
  );
};

export default RetailerListPage;
