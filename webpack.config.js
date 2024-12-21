const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/js/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    optimization: {
      minimize: isProduction,
      minimizer: isProduction ? [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
        new CssMinimizerPlugin(),
      ] : [],
    },
    module: {
      rules: [
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
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
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
      ...(isProduction ? [] : [new webpack.HotModuleReplacementPlugin()]),
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
      ...(isProduction ? [new WebpackObfuscator({
        rotateStringArray: true,
        stringArray: true,
        stringArrayThreshold: 0.75,
      }, ['excluded_file.js'])] : []),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      hot: !isProduction,
      open: true,
      watchFiles: ['src/*.html', 'src/styles/*.scss'],
    },
  };
};