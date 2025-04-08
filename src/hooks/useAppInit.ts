import { ServiceFacadeProvider } from "@/application/ServiceFacadeProvider";
import { useEffect, useState } from "react";
import MobileAds from "react-native-google-mobile-ads";

export function useAppInit() {
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    Promise.all([
      ServiceFacadeProvider.getLocal().getSyncLocalData().syncData(),
      MobileAds().initialize(),
    ]).finally(() => {
      setReady(true);
    });
  }, []);

  return isReady;
}
