// Needed in order to call plugin
var webpack = require('webpack');


module.exports = {
    // Defines entry point for webpack to find requriements
    entry: "./js/mvc.js",
    // Where wepack outputs the resulting file
    output: {
        path: __dirname +"/js",
        filename: "app.js"
    },
    // Plugins for webpack
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    // Modules used by webpack
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }
      ]
    }
};
