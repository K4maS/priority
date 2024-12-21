const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackObfuscator = require('webpack-obfuscator');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: './src/index.js', 

  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'dist'), 
    clean: true,
  },
  mode: 'development',

  module: {
   
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader',
          'sass-loader', 
          
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
       
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',  
        generator: {
          filename: 'img/[name].[hash][ext]',  
        },
      },
    
    ],

  },
  
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackObfuscator({
      rotateStringArray: true,
      stringArray: true,
      stringArrayThreshold: 0.75,
    }, ['excluded_file.js']),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/img', to: 'img' },
      ],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), 
    },
    hot: true, 
    open: true, 
    watchFiles: ['src/*.html', 'src/styles/*.scss'],
  },

};