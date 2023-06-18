const path = require("path");

// Удалить зависимость из проекта, если будет нормально работать без полифилов
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  mode: "development",
  /* resolve: {
    extensions: [".js", ".jsx"],
    preferRelative: true,
    fallback: {
      fs: false,
    },
  }, */
  /*   plugins: [new NodePolyfillPlugin()], */
  devtool: "source-map",
  stats: { colors: true, reasons: true },
  entry: { main: path.resolve(__dirname, "./client-react/src/index.js") },
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

/*  resolve: {
    extensions: [".js", ".jsx"],
    preferRelative: true,
         fallback: {
      timers: false,
      util: false,
      tty: false,
      crypto: false,
      "path-browserify": false,
      "stream-browserify": false,
      "os-browserify": false,
      assert: false,
      stream: false,
      os: false,
      path: false,
      fs: false,
      url: false,
    }, 
  }, */
