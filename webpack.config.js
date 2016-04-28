module.exports.getConfig = function (type) {

  var isDev = type === 'development';

  var config = {
    entry: './app/js/app.js',
    output: {
      path: __dirname,
      filename: 'app.js'
    },
    debug : isDev,
    module: {
      loaders: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }]
    }
  };

  if (isDev) {
    config.devtool = 'eval';
  }

  return config;

}
