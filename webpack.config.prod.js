const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "production",
  optimization: {
    minimizer: [new CssMinimizerPlugin(), '...'],
  },
});