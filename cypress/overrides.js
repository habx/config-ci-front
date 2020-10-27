const { merge } = require('lodash')
const defaultConfig = require('./default.json')

module.exports = (config) => merge(config, defaultConfig)
