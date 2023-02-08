const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: { main: path.resolve(__dirname, "./client/app.jsx") },

  mode: "development",
  stats: { colors: true, reasons: true },
  output: {
    path: path.resolve(__dirname, "./public/js"),
    filename: "[name].bundle.js",
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  //devtool: "#sourcemap", //возможно убрать

  module: {
    rules: [
      { test: /\.css$/, use: "style-loader, css-loader" },
      {
        test: /\.js|\.jsx$/,
        exclude: /(node_modules)/,
        use: ["react-hot-loader/babel"],
      },
    ],
  },

  // применять изменения только при горячей перезагрузке
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
