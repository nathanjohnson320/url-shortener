const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, options) => {
  const devMode = options.mode !== 'production';

  return {
    optimization: {
      minimizer: [
        new TerserPlugin({ parallel: true }),
        new CssMinimizerPlugin(),
      ],
    },
    entry: {
      app: glob.sync('./vendor/**/*.js').concat(['./js/app.js']),
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../priv/static/js'),
      publicPath: '/js/',
    },
    devtool: devMode ? 'eval-cheap-module-source-map' : undefined,
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
          resolve: {
            extensions: ['*', '.js', '.jsx'],
            alias: {
              '@components': path.resolve(__dirname, 'js/react/components/'),
              '@pages': path.resolve(__dirname, 'js/react/pages/'),
              '@utility': path.resolve(__dirname, 'js/utility'),
              '@http': path.resolve(__dirname, 'js/http'),
              '@api': path.resolve(__dirname, 'js/api'),
              '@features': path.resolve(__dirname, 'js/store/features/'),
            },
          },
        },
        {
          test: /\.[s]?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ],
        },
      ],
    },
    plugins: [
      new ESLintPlugin({
        files: [
          'js/**/*.js',
          'js/**/*.jsx',
        ],
      }),
      new MiniCssExtractPlugin({ filename: '../css/app.css' }),
      new CopyWebpackPlugin({
        patterns: [{ from: 'static/', to: '../' }],
      }),
    ],
  };
};
