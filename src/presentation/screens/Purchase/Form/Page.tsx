import { ServiceFacadeProvider } from "@/application/ServiceFacadeProvider";
import { AppLayout } from "@/components/template/AppLayout/Component";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ProductModal, { ProductModalRef } from "./ProductModal";
import { ProductPurchasePresentationDTO } from "./dtos/ProductPurchasePresentationDTO";
import { ScrollView } from "react-native-gesture-handler";
import { formatCurrency } from "@devjonatas/devkit/utils";
import { Logger, LogLevel } from "@/services/Logger";
import RetailerModal, { RetailerModalRef } from "./RetailerModal";

const productService = ServiceFacadeProvider.getCloud().getProductService();

const PurchaseFormPage = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const productModalRef = useRef<ProductModalRef>(null);
  const retailerModalRef = useRef<RetailerModalRef>(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isSearchProduct, setIsSearchProduct] = useState(false);
  const [products, setProducts] = useState<ProductPurchasePresentationDTO[]>(
    [],
  );
  const [totalPrice, setTotalPrice] = useState("R$ 0,00");

  const findProductByBarcode = async (barcode: string) => {
    setIsSearchProduct(true);
    const product = await productService.findByBarCode(barcode);

    if (product) {
      productModalRef.current?.openModalAddMode(product); // Ref vai funcionar se modal estiver sempre renderizado
    }

    setIsScannerOpen(false);
    setIsSearchProduct(false);
  };

  const openScanner = async () => {
    if (!permission || !permission.granted) {
      const { granted } = await requestPermission();
      if (!granted) return;
    }
    setIsScannerOpen(true);
  };

  const scanBarcodeHandler = async (scanningResult: BarcodeScanningResult) => {
    if (isSearchProduct) return;
    const scannedCode = scanningResult.data;
    await findProductByBarcode(scannedCode);
  };

  const handlerEditProduct = (
    product: ProductPurchasePresentationDTO,
    index: number,
  ) => {
    productModalRef.current?.openModalEditMode(product, index);
  };

  const handlerUpdateProductList = (
    product: ProductPurchasePresentationDTO,
    index?: number,
  ) => {
    try {
      const newProductsList = [...products];

      if (index !== undefined) {
        newProductsList[index] = product;
      } else {
        newProductsList.push(product);
      }

      const total = newProductsList.reduce(
        (sum, p) => sum + p.getTotalPrice(),
        0,
      );

      setProducts(newProductsList);
      setTotalPrice(formatCurrency(total));
    } catch (error) {
      Logger.log(LogLevel.ERROR, "Error updating product list", error);
    }
  };

  const handlerSearchProduct = () => {};

  const handlerSavePurchase = () => {};

  return (
    <>
      <ProductModal
        ref={productModalRef}
        onConfirm={handlerUpdateProductList}
      />

      <RetailerModal ref={retailerModalRef} />

      {isScannerOpen ? (
        <View style={{ flex: 1 }}>
          <CameraView
            style={{ flex: 1 }}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: ["ean13"] }}
            onBarcodeScanned={scanBarcodeHandler}
          />
        </View>
      ) : (
        <AppLayout>
          <Text className="text-2xl font-bold mt-4">Lista de produtos</Text>
          <ScrollView className="flex flex-col gap-4 w-full px-4">
            {products.map((product, index) => (
              <TouchableOpacity
                key={index}
                className="p-4 bg-gray-200 rounded-md"
                onPress={() => handlerEditProduct(product, index)}
              >
                <View className="flex flex-row justify-between items-center">
                  <Text className="font-bold text-lg">{product.name}</Text>
                  <FontAwesome name="edit" size={24} color="black" />
                </View>
                <View className="flex justify-between flex-row">
                  <Text className="text-lg">Qtd: {product.quantity}</Text>
                  <Text className="text-lg">
                    {product.getFormatedUnitPrice()} (unid.)
                  </Text>
                  <Text className="text-lg">
                    {product.getFormatedTotalPrice()} (total)
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View className="flex flex-col  justify-start items-start w-full h-[15%] px-4">
            <Text className="text-2xl font-bold">Total: {totalPrice}</Text>
          </View>
          <View className="flex flex-row justify-between w-full bg-gray-300 py-4 px-2">
            <TouchableOpacity
              onPress={handlerSearchProduct}
              className="bg-blue-600 p-6 rounded-2xl flex flex-row gap-2"
            >
              <FontAwesome name="search" size={24} color="white" />
              <Text className="color-white font-bold text-md">Pesquisar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlerSavePurchase}
              className="bg-green-600 p-6 rounded-2xl flex flex-row gap-2"
            >
              <FontAwesome name="save" size={24} color="white" />
              <Text className="color-white font-bold text-md">Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openScanner}
              className="bg-blue-600 p-6 rounded-2xl flex flex-row gap-2"
            >
              <FontAwesome name="barcode" size={24} color="white" />
              <Text className="color-white font-bold text-md">Escanear</Text>
            </TouchableOpacity>
          </View>
        </AppLayout>
      )}
    </>
  );
};

export default PurchaseFormPage;
