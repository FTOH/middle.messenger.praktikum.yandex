// @ts-check
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')

const resolve = path.resolve.bind(null, __dirname)
const isDev = process.env.NODE_ENV === 'development'
const modeEnv = isDev ? 'development' : 'production'

/** @type {import('webpack').Configuration} */
const baseConfig = isDev ? {} : {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  }
}

/** @type {import('webpack').Configuration} */
const serverConfig = {
  ...baseConfig,

  target: 'node',
  mode: modeEnv,
  entry: resolve('server.ts'),
  output: {
    path: resolve('dist/backend'),
    filename: 'server.js',
    libraryTarget: 'this',
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
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
            },
          },
        ],
        exclude: /node_modules/,
      }
    ]
  },
}

module.exports = serverConfig
