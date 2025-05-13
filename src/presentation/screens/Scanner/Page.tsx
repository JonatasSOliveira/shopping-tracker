import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View, Alert } from "react-native";

const ScannerPage = () => {
  const [canScan, setCanScan] = useState(true);
  const [lastCodes, setLastCodes] = useState<string[]>([]);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission || !canScan) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function getProductByBarcode(scanningResult: BarcodeScanningResult) {
    const scannedCode = scanningResult.data;
    const codesQtd = lastCodes.length;

    if (codesQtd < 1) {
      lastCodes.push(scannedCode);
      setLastCodes(lastCodes);
      return;
    }

    if (codesQtd < 5) {
      const lastCode = lastCodes[codesQtd - 1];

      if (lastCode !== scannedCode) {
        setLastCodes([scannedCode]);
      } else {
        lastCodes.push(scannedCode);
        setLastCodes(lastCodes);
      }

      return;
    }

    setCanScan(false);
    Alert.alert("Codigo de Barras:", scannedCode, [
      {
        text: "Ok",
        onPress: () => setCanScan(true),
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["ean13"],
        }}
        onBarcodeScanned={getProductByBarcode}
      ></CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default ScannerPage;
