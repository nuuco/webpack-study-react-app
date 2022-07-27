const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: "development",
  devServer: {
    port: 3001,
    hot: true,
  },
  plugins: [new ReactRefreshPlugin()]
});