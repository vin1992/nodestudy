const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./app/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: "babel-loader",
        exclude: "/node_module/",
        query: {
          presets: ["es2015", "react"]
        }
      }
    ]
  }
};
