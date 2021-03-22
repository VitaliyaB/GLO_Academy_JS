const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build'),
  },
  devServer: {
    open: true,
    port: 8080,
    hot: false,
    writeToDisk: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        },
        exclude: /node_modules/,
      }
    ]
  }
};
