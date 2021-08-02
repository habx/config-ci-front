const { merge, remove } = require('lodash')
const webpack = require('webpack')

const helpers = require('../helpers')
const customConfig = require('./webpack.config')

module.exports = (defaultConfig) => {
  let config = merge({}, defaultConfig, customConfig)

  config.plugins.unshift(new webpack.DefinePlugin({
    __DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
  }))

  if (helpers.exists(
    'circular-dependency-plugin',
    'install the package to enable circular dependencies detection.'
  )) {
    const CircularDependencyPlugin = require('circular-dependency-plugin')

    config.plugins.push(
      new CircularDependencyPlugin({
        onDetected({ paths, compilation }) {
          compilation.errors.push(new Error(paths.join(' -> ')))
        },
        exclude: /node_modules/,
      })
    )
  }

  if (
    helpers.exists(
      'webpack-bundle-analyzer',
      'install the package to enable bundle size analysis.'
    ) && process.env.ANALYZE === '1'
  ) {
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

    config.plugins.push(new BundleAnalyzerPlugin())
  }

  if (process.env.BUNDLEWATCH) {
    config.output.filename = 'main.js'
    config.output.chunkFilename = '[name].[id].js'
  }

  if (process.env.IGNORE_LINT) {
    remove(config.plugins, (plugin) => plugin.constructor.name === 'ESLintWebpackPlugin')
  }

  if (helpers.exists(
    'terser-webpack-plugin',
    'install the package to enable minification.'
  )) {
    const TerserPlugin = require('terser-webpack-plugin')

    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          keep_fnames: /Float32Array/, // Fix for GLTF DRACOLoader on older Safari versions
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            drop_console: true,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: 2,
        cache: true,
        sourceMap: true,
        extractComments: false,
      }),
    ]
  }

  return config
}
