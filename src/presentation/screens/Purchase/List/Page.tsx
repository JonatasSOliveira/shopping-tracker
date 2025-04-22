import { RoutePaths } from "@/routes/RoutePaths";
import { RootStackParamList } from "@/routes/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import { ListPageTemplate } from "@/components/template/ListPageTemplate/Component";
import { ServiceFacadeProvider } from "@/application/ServiceFacadeProvider";
import { Purchase } from "@/models/Purchase";

type PurchaseListPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  RoutePaths.PurchaseList
>;

type Props = {
  navigation: PurchaseListPageNavigationProp;
};

const purchaseService = ServiceFacadeProvider.getCloud().getPurchaseService();

export const PurchaseListPage = ({ navigation }: Props) => {
  return (
    <ListPageTemplate<Purchase>
      title="Lista de Compras"
      fetchItems={() => purchaseService.listAll()}
      onPressAdd={() => navigation.navigate(RoutePaths.PurchaseForm)}
      addButtonLabel="Nova Compra"
      getItemTitle={(item) =>
        `${item.getDate().toLocaleDateString()} - R$ ${item
          .getTotal()
          .toFixed(2)}`
      }
      onPressItem={(item) =>
        navigation.navigate(RoutePaths.PurchaseForm, { id: item.getId() })
      }
    />
  );
};
