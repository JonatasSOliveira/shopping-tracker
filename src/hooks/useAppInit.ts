import { ServiceFacadeProvider } from "@/application/ServiceFacadeProvider";
import { useEffect, useState } from "react";
import Constants from "expo-constants";

export function useAppInit() {
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    const isStandaloneApp = Constants.appOwnership === "standalone";

    const promises = [
      ServiceFacadeProvider.getLocal().getSyncLocalData().syncData(),
    ];

    if (isStandaloneApp) {
      try {
        const mobileAds = require("react-native-google-mobile-ads").default;
        promises.push(mobileAds().initialize());
      } catch (err) {
        console.warn("MobileAds não pôde ser carregado:", err);
      }
    }

    Promise.all(promises).finally(() => {
      setReady(true);
    });
  }, []);

  return isReady;
}