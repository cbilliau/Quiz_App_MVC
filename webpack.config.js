module.exports = {
    entry: "./js/mvc.js",
    output: {
        path: __dirname +"/js",
        filename: "app.js"
    },
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
