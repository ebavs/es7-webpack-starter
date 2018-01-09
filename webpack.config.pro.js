const conf = require('./dirs.conf.js');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: [
      "babel-polyfill",
        conf.src + '/index.js'
  ],
  module: {
    rules: [
        {
            test: /\.js$/,
            include: conf.src,
            loader: 'babel-loader'
        },
        {
            test: /\.(scss|css)$/,
            use: ExtractTextPlugin.extract({
                use: [
                    'css-loader',
                    'sass-loader'
                ],
                fallback: 'style-loader'
            }),
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
                'html-loader'
            ]
        }
    ]
  },
  output: {
    filename: 'index.[chunkhash].js',
    path: conf.dist
  },
    plugins: [
        new HtmlWebpackPlugin({
            template: conf.assets + '/index.html',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(conf.dist),
        new ExtractTextPlugin('styles.[contentHash].css', {
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'), // calls to compress processor
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true // remove comments
                }
            },
            canPrint: true
        }),
        new UglifyJSPlugin({
            // sourceMap: true, // only if you want source map, not recomended for production
            uglifyOptions: {
                output: {
                    comments: false
                }
            }
        }),
        /*new CopyWebpackPlugin([
            { from: conf.src }
        ])*/
    ]
};
