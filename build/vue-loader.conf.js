var utils = require('./utils')
var config = require('../config')
var isProduction = false
var config_detail = null

if (process.env.npm_lifecycle_event == 'bint') {
  isProduction=true
  config_detail = config.build_int
} else if (process.env.npm_lifecycle_event == 'bdev') {
  isProduction=true
  config_detail = config.build_dev
} else if (process.env.npm_lifecycle_event == 'int') {
  config_detail = config.int
} else if (process.env.npm_lifecycle_event == 'dev') {
  config_detail = config.dev
} else if (process.env.npm_lifecycle_event == 'vip') {
  config_detail = config.vip
} else {
  isProduction=true
  config_detail = config.build
}

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config_detail.productionSourceMap
      : config_detail.cssSourceMap,
    extract: isProduction
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
