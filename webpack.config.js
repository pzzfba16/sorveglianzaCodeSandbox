var path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    home: './public/src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'public/dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: ['file-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/dist'),
    compress: true,
    port: 9000
  }
};
