const { merge } = require('lodash')
const common = require('./default.json')

module.exports = (_on, config) => {
  return merge(config, common)
}
