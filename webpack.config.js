var webpack = require("webpack");
// to extract css files from js files
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// depenedent for css-loder and style-loader
require('es6-promise').polyfill();
module.exports = {
    entry: {
        reserve_home: "./home/reserve_manifest.js"
    },
    output: {
        filename: 'public/javascripts/[name].min.js'
    },
    module: {
        loaders: [
            // Extract css files
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }
        ]
    },
    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [
        new ExtractTextPlugin("public/stylesheets/[name].min.css"),
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};