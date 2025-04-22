import { HomePage } from "@/screens/Home/Page";
import LoginPage from "@/screens/Login/Page";
import { RetailerFormPage } from "@/screens/Retailer/Form/Page";
import ScannerPage from "@/screens/Scanner/Page";
import { RoutePaths } from "./RoutePaths";
import { RetailerListPage } from "@/screens/Retailer/List/Page";
import { ProductListPage } from "@/screens/Product/List/Page";
import { ProductFormPage } from "@/screens/Product/Form/Page";
import { PurchaseListPage } from "@/screens/Purchase/List/Page";

export const Routes = [
  {
    path: RoutePaths.Home,
    component: HomePage,
  },
  {
    path: RoutePaths.Scanner,
    component: ScannerPage,
  },
  {
    path: RoutePaths.Login,
    component: LoginPage,
  },
  {
    path: RoutePaths.RetailerForm,
    component: RetailerFormPage,
  },
  {
    path: RoutePaths.RetailerList,
    component: RetailerListPage,
  },
  {
    path: RoutePaths.ProductList,
    component: ProductListPage,
  },
  {
    path: RoutePaths.ProductForm,
    component: ProductFormPage,
  },
  {
    path: RoutePaths.PurchaseList,
    component: PurchaseListPage,
  },
] as const;
