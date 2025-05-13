import { RoutePaths } from "./RoutePaths";
import HomePage from "@/screens/Home/Page";
import LoginPage from "@/screens/Login/Page";
import RetailerFormPage from "@/screens/Retailer/Form/Page";
import ScannerPage from "@/screens/Scanner/Page";
import RetailerListPage from "@/screens/Retailer/List/Page";
import ProductListPage from "@/screens/Product/List/Page";
import ProductFormPage from "@/screens/Product/Form/Page";
import PurchaseListPage from "@/screens/Purchase/List/Page";
import SignUpPage from "@/screens/SignUp/Page";
import PurchaseFormPage from "@/screens/Purchase/Form/Page";

type Route = {
  path: string;
  component: (props: any) => JSX.Element;
  isPublic?: boolean;
};

export const Routes: Route[] = [
  {
    path: RoutePaths.Login,
    component: LoginPage,
    isPublic: true,
  },
  {
    path: RoutePaths.SignUp,
    component: SignUpPage,
    isPublic: true,
  },
  {
    path: RoutePaths.Home,
    component: HomePage,
  },
  {
    path: RoutePaths.Scanner,
    component: ScannerPage,
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
  {
    path: RoutePaths.PurchaseForm,
    component: PurchaseFormPage,
  },
];
