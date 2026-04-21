module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".tsx", ".ts", ".js", ".json"],
          alias: {
            "@": "./", 
          },
        },
      ],
      // REMOVE "react-native-worklets/plugin"
      // Reanimated's plugin handles workletization for both libraries
      "react-native-reanimated/plugin", 
    ],
  };
};