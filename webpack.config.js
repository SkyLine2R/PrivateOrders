const path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval-cheap-source-map",
  stats: { colors: true, reasons: true },
  entry: { main: path.resolve(__dirname, "./client-react/src/index.js") },
  //entry: { main: path.resolve(__dirname, "./client/script.js") },

  output: {
    path: path.resolve(__dirname, "./public/js"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      { test: /\.js?$/, exclude: /(node_modules)/, loader: "babel-loader" },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
