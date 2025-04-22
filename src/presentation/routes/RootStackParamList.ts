import { RoutePaths } from "./RoutePaths";
import { RetailerFormPageParams } from "@/screens/Retailer/Form/Params";
import { ProductFormPageParams } from "@/screens/Product/Form/Params";
import { PurchaseFormPageParams } from "@/screens/Purchase/Form/Params";

export type RootStackParamList = {
  [RoutePaths.Home]: undefined;
  [RoutePaths.Scanner]: undefined;
  [RoutePaths.Login]: undefined;
  [RoutePaths.RetailerForm]?: RetailerFormPageParams;
  [RoutePaths.RetailerList]: undefined;
  [RoutePaths.ProductList]: undefined;
  [RoutePaths.ProductForm]?: ProductFormPageParams;
  [RoutePaths.PurchaseList]: undefined;
  [RoutePaths.PurchaseForm]?: PurchaseFormPageParams;
  [RoutePaths.SignUp]: undefined;
};
