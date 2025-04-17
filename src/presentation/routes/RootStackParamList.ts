import { RetailerFormPageParams } from "@/screens/Retailer/Form/Params";
import { RoutePaths } from "./RoutePaths";
import { ProductFormPageParams } from "@/screens/Product/Form/Params";

export type RootStackParamList = {
  [RoutePaths.Home]: undefined;
  [RoutePaths.Scanner]: undefined;
  [RoutePaths.Login]: undefined;
  [RoutePaths.RetailerForm]?: RetailerFormPageParams;
  [RoutePaths.RetailerList]: undefined;
  [RoutePaths.ProductList]: undefined;
  [RoutePaths.ProductForm]?: ProductFormPageParams;
};
