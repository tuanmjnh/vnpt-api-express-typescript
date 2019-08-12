const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  devtool: 'sourcemap',
  externals: [nodeExternals()], // Need this to avoid error when // nodeModules,
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'] // '.tsx',
  },
  plugins: [
    new webpack.ProgressPlugin(),
    // new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: './public/', to: './' },
      { from: './src/public/', to: './public/' },
      { from: '.env', to: './' }
    ])
    // new HtmlWebPackPlugin({
    //   template: "./public/index.html",
    //   filename: "./index.html",
    //   excludeChunks: ['server']
    // })
  ],
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
    fs: 'empty'
  }
};