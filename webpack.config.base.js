const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  target: ["web", "es5"],
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'docs'),
    filename: '[fullhash].bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "src", "index.html")
  }), new MiniCssExtractPlugin()],
}