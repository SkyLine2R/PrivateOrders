const path = require("path");

module.exports = {
  mode: "development",
  stats: { colors: true, reasons: true },
  entry: { main: path.resolve(__dirname, "./client/script.js") },

  output: {
    path: path.resolve(__dirname, "./public/js"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /(node_modules)/, loader: "babel-loader" },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
