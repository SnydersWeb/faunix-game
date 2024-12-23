const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production', // Set to 'development' for development builds
  entry: './src/index.js', // Your main JavaScript file
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: './', // Use relative path for public assets
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html' // Path to your HTML template
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    port: 3000, // Port for the development server
    historyApiFallback: true // Enable history API fallback for React Router
  }
};