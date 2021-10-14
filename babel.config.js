module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "@/assets": ["./src/assets"],
            "@/utils": ["./src/utils"],
            "@/views": ["./src/views"],
            "@/components": "./src/components",
            "@/navigation": "./src/navigation",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
