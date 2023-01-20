const path    = require("path")
const vue =  require('./loaders/vue');
var webpack = require('webpack');
const dotenv = require('dotenv');

const dotenvFiles = [
  `.env.${process.env.RAILS_ENV}`,
]
dotenvFiles.forEach((dotenvFile) => {;
  dotenv.config({ path: dotenvFile, silent: true });
});




module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: {
    application: "./app/javascript/application.js"
  },
  module: {
    rules: [
       {
         test: /\.(js)$/,
         exclude: /node_modules/,
         use: ['babel-loader'],
       },
       vue,
    ],
  },
  output: {
    filename: "[name].js",
    sourceMapFilename: "[file].map",
    path: path.resolve(__dirname, "app/assets/builds"),
  },
  plugins: [
    new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(process.env))), 

    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}
