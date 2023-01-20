const path    = require("path")
const vue =  require('./loaders/vue');
var webpack = require('webpack');
const dotenv = require('dotenv');
const { VueLoaderPlugin } = require('vue-loader')

const dotenvFiles = [
  `.env.${process.env.RAILS_ENV}`,
]
dotenvFiles.forEach((dotenvFile) => {;
  dotenv.config({ path: dotenvFile, silent: false });
});

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');


let mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
mode = 'development' // TODO: check which env it is

module.exports = {
  mode,
  optimization: {
        moduleIds: 'deterministic',
  },
  entry: {
    application: [
      './app/javascript/packs/main.js',
    ],
    custom: './app/javascript/packs/stylesheets.scss',  },
  module: {
    rules: [
       {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      },
         {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
          // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader'
        ]
      },
       // Add CSS/SASS/SCSS rule with loaders
       {
        test: /\.(?:sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  
  },
  resolve: {
    // Add additional file types
    extensions: ['.js', '.jsx', '.scss', '.css', '.vue'],
  },
  output: {
    filename: "[name].js",
    sourceMapFilename: "[file].map",
    path: path.resolve(__dirname, "../../app/assets/builds"),
  },
  plugins: [
    new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(process.env))), 

    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),    
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      
    }),
    new VueLoaderPlugin(),

  ]
}

