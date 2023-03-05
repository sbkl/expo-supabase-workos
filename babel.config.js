module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
      require.resolve("expo-router/babel"),
      "nativewind/babel",
    ],
    presets: ["babel-preset-expo"],
  };
};
