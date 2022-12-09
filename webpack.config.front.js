// @ts-check
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path')

const resolve = path.resolve.bind(null, __dirname)
const isDev = process.env.NODE_ENV === 'development'
const modeEnv = isDev ? 'development' : 'production'


/** @type {import('webpack').Configuration} */
const baseConfig = isDev ? {
  devServer: {
    static: {
      directory: resolve('public'),
    },
    compress: true,
    port: 1234,
    historyApiFallback: true,
  }
} : {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  }
}


/** @type {import('webpack').Configuration} */
const webConfig = {
  ...baseConfig,

  mode: modeEnv,
  dependencies: [],
  entry: {
    index: resolve('src/index.ts'),
    'check-cookie': resolve('src/check-cookie.ts'),
  },
  output: {
    path: resolve('dist/frontend'),
    filename: '[name].bundle.js',
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.bundle.css',
    }),
    new CopyPlugin({
      patterns: [
        resolve('public')
      ]
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.hbs', '.less', '.css', '.svg', '.jpg'],
    plugins: [new TsconfigPathsPlugin()],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: resolve('tsconfig.json'),
              onlyCompileBundledFiles: true,
              transpileOnly: !isDev,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.hbs$/,
        loader: resolve('lib/hbs-precompile-loader.js'),
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
}

module.exports = webConfig
