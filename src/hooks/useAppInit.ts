import { ServiceFacade } from "@/application/ServiceFacade";
import { useEffect, useState } from "react";

export function useAppInit() {
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    ServiceFacade.getSyncLocalData()
      .syncData()
      .finally(() => {
        setReady(true);
      });
  }, []);

  return isReady;
}
