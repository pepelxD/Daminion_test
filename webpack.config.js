const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const developmentEnv = process.env.NODE_ENV === 'development';

module.exports = {
  mode: developmentEnv ? 'development' : 'production',
  entry: {
    main: './dev/main.js'
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    path: path.join(__dirname, 'app'),
    publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'app'),
    publicPath: 'http://localhost:8080/',
    hot: true,
    inline: true,
    compress: true 
  },
  module: {
    rules: [
      {
        test: /\.(ttf|otf|woff2|woff)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/font/[name].[ext]'
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {modules: false}]]
          }
        }
      },
      {
        test: /\.css$/,
        use: [  'style-loader', 'css-loader', 'postcss-loader' ]
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
            pretty: true
        }
    }
      
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./dev/index.pug`
    })
  ]

};

