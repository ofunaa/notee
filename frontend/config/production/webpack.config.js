module.exports = {
  entry: {
    application: './src/javascripts/index.js',
  },
  output: {
    path: '../app/assets/javascripts/notee',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=react,presets[]=es2015,presets[]=stage-2'
      }
    ]
  }
}
