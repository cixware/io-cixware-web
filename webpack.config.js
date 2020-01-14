const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractPlugin = require('mini-css-extract-plugin');
const env = process.env.NODE_ENV;

module.exports = {
  mode: env,
  entry: ['./src/js/main.js', './src/sass/style.scss'],
  output: {
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new HTMLPlugin({
      filename: 'index.html',
      template: './src/static/index.html',
    }),
    new ExtractPlugin({
      filename: '[name].css',
    }),
    new CopyPlugin([{
      from: './src/assets',
      to: 'assets',
    }, {
      from: './src/static',
    },
    ]),
  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.scss$/,
      use: [
        ExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          },
        },
        'postcss-loader',
        'sass-loader',
      ],
    },
    {
      test: /\.(woff|woff2|otf|eot|ttf)$/,
      loader: 'file-loader',
      options: {
        outputPath: 'assets/fonts',
      },
    },
    {
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        outputPath: 'assets/icons',
      },
    },
    ],
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
      '~': path.join(__dirname, './src'),
    },
    extensions: ['*', '.js', '.ts', '.jsx', '.vue', '.json', '.scss'],
  },
};
