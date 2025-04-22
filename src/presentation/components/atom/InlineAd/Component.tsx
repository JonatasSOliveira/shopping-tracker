import React, { useState } from "react";
import { View } from "react-native";
import Constants from "expo-constants";

let BannerAd, BannerAdSize, TestIds;

const isStandaloneApp = Constants.appOwnership === "standalone";

if (isStandaloneApp) {
  const ads = require("react-native-google-mobile-ads");
  BannerAd = ads.BannerAd;
  BannerAdSize = ads.BannerAdSize;
  TestIds = ads.TestIds;
}

const InlineAd = () => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);

  if (!isStandaloneApp) return null;

  return (
    <View style={{ height: isAdLoaded ? "auto" : 0 }}>
      <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          setIsAdLoaded(true);
        }}
      />
    </View>
  );
};

export default InlineAd;
