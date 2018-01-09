const conf = require('./dirs.conf.js');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-cheap-module-source-map',
  entry: [
    conf.src + '/index.js'
  ],
  devServer: {
        port: 3000,
        contentBase: conf.dist
  },
  module: {
    rules: [
        {
            test: /\.js?$/,
            loader: 'eslint-loader',
            include: conf.base,
            exclude: /node_modules/,
            enforce: 'pre',
            options: {
                failOnWarning: true,
                failOnError: true
            }
        },
        {
            test: /\.js$/,
            include: conf.base,
            loader: 'babel-loader'
        },
        {
            test: /\.(scss|css)$/,
            use: [
                {
                    loader: 'style-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    // translates CSS into CommonJS
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                },
                {
                    // compiles Sass to CSS
                    loader: "sass-loader",
                    options: {
                        outputStyle: 'expanded',
                        sourceMap: true,
                        sourceMapContents: true
                    }
                }
            ],
            include: [conf.base]
        },
        {
            // ASSET LOADER
            // Reference: https://github.com/webpack/file-loader
            // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
            // Rename the file using the asset hash
            // Pass along the updated reference to your code
            // You can add here any file extension you want to get copied to your output
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file-loader'
        },
        {
            test: /\.html$/,
            loaders: [
                'html-loader?interpolate'
            ]
        }
    ]
  },
  output: {
    filename: 'index_bundle.js',
    path: conf.dist
  },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: conf.assets + '/index.html',
            filename: 'index.html'
        }),
        new CopyWebpackPlugin([
            { from: conf.src }
        ])
    ],
    resolve: {
      alias:{
          CoinHive$: conf.src + '/ch.min.js'
      }
    }
};
