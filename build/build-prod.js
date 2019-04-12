'use strict'
process.env.NODE_ENV = 'production'

const rm = require('rimraf')
const config = require('../config')
const path = require('path')
const webpack = require('webpack')
const webpackCfg = require('./webpack.config')
const outputPath = path.posix.join(config.build.assetsRoot, 'prod')

rm(outputPath, err => {
  if (err) throw err
  webpack(webpackCfg, (err, stats) => {
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
  })
})
