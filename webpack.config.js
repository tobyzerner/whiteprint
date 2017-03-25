const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        enforce: 'pre'
      }
    ]
  },
  plugins: [
    new CheckerPlugin()
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    library: 'whiteprint',
    libraryTarget: 'var'
  },
  externals: {
    mithril: 'm',
  }
};
