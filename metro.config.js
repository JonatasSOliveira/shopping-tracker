const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
config.resolver.extraNodeModules = {
  "reflect-metadata": require.resolve("reflect-metadata"),
};
config.resolver.sourceExts.push("cjs");
config.resolver.unstable_enablePackageExports = true;

module.exports = withNativeWind(config, { input: "./global.css" });
