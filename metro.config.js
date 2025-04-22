const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
config.resolver.extraNodeModules = {
  "reflect-metadata": require.resolve("reflect-metadata"),
};
config.resolver.sourceExts.push("cjs");

module.exports = config;
