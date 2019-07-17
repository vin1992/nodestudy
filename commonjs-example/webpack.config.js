const path = require("path");
const webapck = require("webpack");

module.exports = {
  entry: "./index.js",
  output: {
    path: __dirname,
    filename: "dist/bundle.js"
  }
};
