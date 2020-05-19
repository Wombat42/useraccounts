const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?overlay=false&reload=true',
    'src/index.jsx',
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-transform-arrow-functions',
              '@babel/plugin-transform-destructuring',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-async-to-generator',
              '@babel/plugin-transform-react-jsx',
              '@babel/plugin-proposal-export-default-from',
              'react-hot-loader/babel',
            ],
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
    ],
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
      src: path.resolve(__dirname, './src'),
    },
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    libraryTarget: 'umd',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist',
    filename: 'user_accounts.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
