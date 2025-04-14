import { RetailerFormPageParams } from "@/screens/Retailer/Form/Params";
import { RoutePaths } from "./RoutePaths";

export type RootStackParamList = {
  [RoutePaths.Home]: undefined;
  [RoutePaths.Scanner]: undefined;
  [RoutePaths.Login]: undefined;
  [RoutePaths.RetailerForm]?: RetailerFormPageParams;
  [RoutePaths.RetailerList]: undefined;
};
