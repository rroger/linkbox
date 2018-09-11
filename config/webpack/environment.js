const { environment } = require('@rails/webpacker');
const webpack = require('webpack');
const dotenv = require('dotenv');
const vue =  require('./loaders/vue');

const dotenvFiles = [
  `.env.${process.env.RAILS_ENV}`,
]
dotenvFiles.forEach((dotenvFile) => {;
  dotenv.config({ path: dotenvFile, silent: true });
});

environment.plugins.prepend('Environment', new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(process.env))));
environment.loaders.append('vue', vue)

environment.plugins.append('Provide', new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
}));

module.exports = environment
