import HomePage from "@/screens/Home/Page";
import LoginPage from "@/screens/Login/Page";
import RetailerPage from "@/screens/Retailer/Page";
import ScannerPage from "@/screens/Scanner/Page";

export const Routes = [
  {
    path: "Home",
    component: HomePage,
    args: undefined,
    initial: true,
  },
  {
    path: "Scanner",
    component: ScannerPage,
    args: undefined,
    initial: false,
  },
  {
    path: "Login",
    component: LoginPage,
    args: undefined,
    initial: false,
  },
  {
    path: "Retailer",
    component: RetailerPage,
    args: undefined,
    initial: false,
  },
] as const;
