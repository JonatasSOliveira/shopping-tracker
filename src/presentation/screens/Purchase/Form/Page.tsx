import { ServiceFacadeProvider } from "@/application/ServiceFacadeProvider";
import { AppLayout } from "@/components/template/AppLayout/Component";
import { ProductFields } from "@/models/Product";
import { PurchaseProductFields } from "@/models/PurchaseProduct";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import React, { useState } from "react";
import { Button, View } from "react-native";

const productService = ServiceFacadeProvider.getCloud().getProductService();

type ProductPurchasePresentation = Required<Pick<ProductFields, "name">> &
  Required<Pick<PurchaseProductFields, "quantity" | "unitPrice" | "isOnSale">>;

const PurchaseFormPage = () => {
  const [permission, requestPermission] = useCameraPermissions();

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isSearchProduct, setIsSearchProduct] = useState(false);
  const [product, setProduct] = useState<ProductPurchasePresentation | null>(
    null,
  );

  const findProductByBarcode = async (barcode: string) => {
    setIsSearchProduct(true);
    const product = await productService.findByBarCode(barcode);

    if (product) {
      setProduct({
        name: product.getName(),
        isOnSale: false,
        quantity: 1,
        unitPrice: 0,
      });
      setIsScannerOpen(false);
    } else {
      // TODO: Abrir modal de cadastrar produto
    }

    setIsSearchProduct(false);
  };

  const openScanner = async () => {
    if (!permission || !permission.granted) {
      const { granted } = await requestPermission();

      if (!granted) {
        return;
      }
    }

    setIsScannerOpen(true);
  };

  const scanBarcodeHandler = async (scanningResult: BarcodeScanningResult) => {
    if (isSearchProduct) return;

    const scannedCode = scanningResult.data;
    await findProductByBarcode(scannedCode);
  };

  if (isScannerOpen) {
    return (
      <View style={{ flex: 1 }}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["ean13"],
          }}
          onBarcodeScanned={scanBarcodeHandler}
        ></CameraView>
      </View>
    );
  }

  return (
    <AppLayout>
      <View>
        <Button title="Escanear código de barras" onPress={openScanner} />
      </View>
    </AppLayout>
  );
};

export default PurchaseFormPage;
