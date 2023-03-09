const HtmlWebpackPlugin = require('html-webpack-plugin');
const { watch } = require('fs');
const path = require('path');

module.exports = {
  entry: {
    navigation: './src/js/navigation.js',
    homePage: './src/js/homePage.js',
    authHomePage: './src/js/authHomePage.js',
    login: './src/js/login.js',
    register: './src/js/register.js',
    stockPage: './src/js/stockPage.js',
    style: './style.css',
    authStockPage: './src/js/authStockPage.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs'),
    chunkFilename: '[id].[chunkhash].js'
  },
  experiments: {
    topLevelAwait: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', // Creates `style` nodes from JS strings
          'css-loader' // Translates CSS into CommonJS
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: './src/img/[name].[ext]',
              outputPath: 'images'
            }
          }
        ]
      },
    ]
  },
  mode: 'production',
  watch: true,
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      chunks: ['homePage','navigation','authHomePage','login','register','style']
    }),
    new HtmlWebpackPlugin({
      filename: 'stock.html',
      template: 'stock.html',
      chunks: ['stockPage','navigation','authStockPage','style']
    })
  ],
};