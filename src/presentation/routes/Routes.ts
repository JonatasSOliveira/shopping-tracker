import HomePage from "@/screens/Home/Page";
import LoginPage from "@/screens/Login/Page";
import RetailerPage from "@/screens/Retailer/Page";
import ScannerPage from "@/screens/Scanner/Page";

export const Routes = [
  {
    path: "Home",
    component: HomePage,
    args: undefined,
  },
  {
    path: "Scanner",
    component: ScannerPage,
    args: undefined,
  },
  {
    path: "Login",
    component: LoginPage,
    args: undefined,
  },
  {
    path: "Retailer",
    component: RetailerPage,
    args: undefined,
  },
] as const;

export type RoutePath = (typeof Routes)[number]["path"];

export const RoutePaths: Record<RoutePath, RoutePath> = Object.fromEntries(
  Routes.map((route) => [route.path, route.path]),
) as Record<RoutePath, RoutePath>;
